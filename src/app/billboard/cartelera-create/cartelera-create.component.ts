import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';
import 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-cartelera-create',
  templateUrl: './cartelera-create.component.html',
  styleUrls: ['./cartelera-create.component.scss']
})
export class CarteleraCreateComponent implements OnInit {
  nombreDia: any;
  movie: any;
  location: any;
  cartelera: any;
  ticketList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {

    this.reactiveForm();

  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      location_id: ['', [Validators.required]],
      movie_id: ['', [Validators.required]],
      current_date: ['', [Validators.required]],
      date: ['', [Validators.required]],
      available: ['', [Validators.required]],
      number_space: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      visible: ['', [Validators.required]],
      tickets: this.fb.array([]),
      tickets_id: this.fb.array([]),

    });
    this.getLocalizacion();
    this.getTickets();
    this.getPeliculas();
  }

  ngOnInit(): void {

    this.fecha();
  }
  dia() {
    let dias = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    var x = ((document.getElementById("fecha") as HTMLInputElement));
    let date = new Date(x.value);
    console.log(date);

    this.formCreate.get('date').setValue(dias[date.getDay()]);

  }
  fecha() {
    let fecha_minimo = new Date().toISOString().split("T")[0];
    document.getElementById("fecha").setAttribute("min", fecha_minimo);
  }
  getPeliculas() {
    this.gService
      .list('carteleras/peliculas')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.movie = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
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
    return this.gService.list('carteleras/tiquetes').subscribe(
      (respuesta: any) => {
        (this.ticketList = respuesta), this.checkboxTickets();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
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
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;
      console.log(i);
      this.tickets_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.tickets_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    console.log(this.formCreate.value);

    if (this.formCreate.valid) {
      this.gService.create('carteleras/create', this.formCreate.value).subscribe(
        (respuesta: any) => {
          this.cartelera = respuesta;
          this.router.navigate(['mantenimiento/carteleras/listado'], {
            queryParams: { register: 'true' },
          });
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Cartelera registrada!',
            showConfirmButton: false,
            timer: 1000
          })
        },
        (error) => {
          this.error = error;
          console.log(this.error);
          Swal.fire({
            icon: 'error',
            title: '¡Error de registro!',
          })

        }
      );
    } else {
      console.log(this.error);
      Swal.fire({
        icon: 'error',
        title: '¡Ingrese TODOS los datos!',
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
  }
}
