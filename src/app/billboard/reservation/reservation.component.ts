import { Component, OnInit, } from '@angular/core';
import { Subject, } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {

  productosList: Array<{
    id: number;
    cantidad: number;
    nombre: string;
    subtotal: number;
  }> = new Array<{ id: number; cantidad: number; nombre: string; subtotal: number }>();
  tiqueteList: Array<{ id: number; nombre: string; precio: number }> = new Array<{
    id: number;
    nombre: string;
    precio: number;
  }>();
  subTotal = 0;
  totalProductos = 0;
  total = 0;
  precio = 0;
  iva = 0;
  clasificacion = 0;
  TotalTickets = 0;
  cantidad = 0;
  product: any;
  auto: any;
  location: any;
  cartelera: any;
  ticketList: any;
  idProducto = 1;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  productos: any;
  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {

  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      tickets: this.fb.array([]),
      tickets_id: this.fb.array([]),
      clasificacion: ['4', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });


    this.listaProductos();
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerCartelera(id);

    this.reactiveForm();

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  Table(id: number) {
    var id = id;
    console.log("Producto borrado:", this.productosList.splice(id, 1));
    console.log("Producto restantes:", this.productosList);
    this.Calcular();
  }

  calcularClasificacion(event) {
    if (event.target.value != 0) {
      this.clasificacion = parseInt(event.target.value, 10);

      this.precio = parseInt(this.product.price + this.clasificacion);
      $("#cantidad").removeAttr("disabled");
    }
  }
  calcularProducto(event) {

    $("#agregar").removeAttr("disabled");
    $("#eliminar").removeAttr("disabled");
    this.subTotal = 0;

    var cantidad = this.formCreate.get('cantidad').value;
    var nombre = this.product.name;
    this.subTotal = (cantidad * this.precio);

    this.productosList.push({
      id: this.idProducto,
      cantidad: parseInt(cantidad),
      nombre: nombre,
      subtotal: this.subTotal,
    });
    this.idProducto++;
    this.Calcular();
    console.log('Precio', this.product.price);

  }

  Calcular() {
    var p = 0;
    var t = 0;
    var total = 0;
    var iva = 0;
    let i = 0;
    for (var arreglo in this.productosList) {
      for (var elemento in this.productosList[arreglo]) {
        if (i == 3) {
          var a = this.productosList[arreglo][elemento];
          console.log("Precio producto: ", a);
          p += a;
        }
        i++;
      }
      i = 0;
    }
    this.totalProductos = p;

    for (var arreglo in this.tiqueteList) {
      for (var elemento in this.tiqueteList[arreglo]) {
        if (i == 2) {
          var a = this.tiqueteList[arreglo][elemento];

          t += parseInt(a);
        }
        i++;
      }
      i = 0;
    }
    this.TotalTickets = t;
    total = this.totalProductos + this.TotalTickets;
    iva = total * 0.13;
    this.iva = iva;
    this.total = total + iva;

  }
  reservar() {

    this.cantidad = (this.tiqueteList.length);
    console.log("cantidad: ", this.cantidad);

  }

  obtenerCartelera(id: any) {
    this.gService
      .get('carteleras', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.cartelera = data;
          this.getTickets();
        },
        (error: any) => {
          this.notificacion.mensaje(error.mensaje, error.name, 'error');
        }
      );
  }

  listaProductos() {
    this.gService
      .list('productos/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.productos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.mensaje, error.name, 'error');
        }
      );
  }

  obtenerProducto(id: any) {
    $("#cantidad").val("");
    $("#cantidad").attr("disabled", true);
    console.log($("#MyModal option[value='0']").attr("selected", true));
    var p = this.productos.find((x) => x.id == id);
    this.product = p;
    this.precio = this.product.price;
    this.subTotal = 0;
  }

  getLocalizacion() {
    this.gService
      .list('carteleras/localizacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.location = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getTickets() {

    this.ticketList = this.cartelera.tickets;
    this.checkboxTickets();

  }
  get tickets(): FormArray {
    return this.formCreate.get('tickets') as FormArray;
  }
  get tickets_id(): FormArray {
    return this.formCreate.get('tickets_id') as FormArray;
  }

  private checkboxTickets() {
    this.ticketList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.tickets as FormArray).push(control);
    });
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores

      (this.formCreate.controls.tickets_id as FormArray).push(
        new FormControl(event.target.value)
      );
      for (let i = 0; i < this.tickets.length; i++) {
        const valor = this.tickets.value[i];

        if (valor == true && !this.tiqueteList.find(x => x.id == this.ticketList[i].id)) {

          this.tiqueteList.push({ id: this.ticketList[i].id, nombre: this.ticketList[i].name, precio: this.ticketList[i].price });

          console.log("Tiquetes:", this.tiqueteList);
        }

      }
      this.Calcular();
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;
      console.log(i);
      this.tickets_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array

          console.log("Tiquete borrado:", this.tiqueteList.splice(i, 1));

          (this.formCreate.controls.tickets_id as FormArray).removeAt(i);
          //Borrar tiquete
          console.log("Tiquetes restantes:", this.tiqueteList);

          this.Calcular();

          return;
        }

        i++;
      });
    }

  }

  submitForm() {

    if (this.tiqueteList.length != 0) {
      this.http.patch("http://127.0.0.1:8000/api/cinecar/carteleras/update/" + this.cartelera.id, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Accept', 'application/json'),

      }, {
        params: new HttpParams().append("cantidad", JSON.stringify(this.tiqueteList.length))
      })
        .subscribe(

          (respuesta: any) => {
            this.router.navigate(['cartelera'], {
              queryParams: { register: 'true' },
            });
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '¡Reservado con éxito!',
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            this.error = error;
            console.log(this.error);
            Swal.fire({
              icon: 'error',
              title: '¡Error de reservación!',
            })
          }
        );
    } else {

      Swal.fire({
        icon: 'error',
        title: '¡Seleccione un tiquete!',
      })
    }

  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['mantenimiento/carteleras/registrar']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
