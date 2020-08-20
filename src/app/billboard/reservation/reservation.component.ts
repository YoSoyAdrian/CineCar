import { Component, OnInit, } from '@angular/core';
import { Subject, } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';


declare var $: any;
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  productosList: Array<{
    cantidad: number;
    nombre: string;
    subtotal: number;
  }> = new Array<{ cantidad: number; nombre: string; subtotal: number }>();
  tiqueteList: Array<{ nombre: string; precio: number }> = new Array<{
    nombre: string;
    precio: number;
  }>();
  subTotal = 0;
  totalProductos = 0;
  precio = 0;
  clasificacion = 0;
  TotalTickets = 0;
  product: any;
  auto: any;
  location: any;
  cartelera: any;
  ticketList: any;

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
    private router: Router
  ) { }

  reactiveForm() {
    this.formCreate = this.fb.group({
      location_id: ['', [Validators.required]],
      movie_id: ['', [Validators.required]],
      current_date: ['', [Validators.required]],
      available: ['', [Validators.required]],
      number_space: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      visible: ['', [Validators.required]],
      tickets: this.fb.array([]),
      tickets_id: this.fb.array([]),
      clasificacion: null,
      cantidad: null,
    });


    this.listaProductos();
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerCartelera(id);

    this.reactiveForm();
    this.Table();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  Table() {
    $(function () {
      // Start counting from the third row
      var counter = 3;

      // Remove row when delete btn is clicked
      $('table').on('click', '#deleteRow', function (event) {
        $(this).closest('tr').remove();

        counter -= 1;
      });
    });
  }
  calcularProducto(event) {

    this.clasificacion = this.formCreate.get('clasificacion').value;
    this.product.price = parseInt((this.product.price + this.clasificacion));
    console.log('Precio', this.product.price);

  }
  Calcular() {
    var cantidad = (document.getElementById('cantProducto') as HTMLInputElement).value;
    var nombre = this.product.name;
    this.subTotal = parseInt(cantidad) * this.product.price;
    var t = 0;
    let i = 0;
    this.productosList.push({
      cantidad: parseInt(cantidad),
      nombre: nombre,
      subtotal: this.subTotal,
    });
    for (var arreglo in this.productosList) {
      for (var elemento in this.productosList[arreglo]) {
        if (i == 2) {
          var a = this.productosList[arreglo][elemento];
          t += a;
        }
        i++;
      }
      i = 0;
    }
    this.totalProductos = t;
    console.log("Productos: ", this.productosList);
  }

  obtenerCantidadTickets(nombre: string, precio: number) {
    var cantidad = (document.getElementById(nombre) as HTMLInputElement).value;

    if (cantidad.length != 0) {
      this.tiqueteList.push({ nombre: nombre, precio: precio });
    }
    console.log('Tiquetes: ', this.tiqueteList);
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
    var p = this.productos.find((x) => x.id == id);
    this.product = p;

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

      console.log('tiquete seleccionado');
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;
      console.log(i);
      this.tickets_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.tickets_id as FormArray).removeAt(i);
          //Borrar tiquete

          console.log('tiquete encontrado');
          if ((this.formCreate.controls.tickets_id as FormArray).length == 0) {
          }
          console.log('tiquetes deseleccionado', this.tickets_id.value);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    console.log(this.formCreate.value);

    if (this.formCreate.valid) {
      this.gService
        .create('carteleras/create', this.formCreate.value)
        .subscribe(
          (respuesta: any) => {
            this.cartelera = respuesta;
            this.router.navigate(['mantenimiento/carteleras/listado'], {
              queryParams: { register: 'true' },
            });
          },
          (error) => {
            this.error = error;
            console.log(this.error);
            this.notificacion.msjValidacion(this.error);
          }
        );
    } else {
      console.log(this.error);
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
