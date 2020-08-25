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
  selector: 'app-peliculas-update',
  templateUrl: './peliculas-update.component.html',
  styleUrls: ['./peliculas-update.component.scss']
})
export class PeliculasUpdateComponent implements OnInit {

  fileToUpload: File = null;
  $: any;
  classification_movie: any;
  pelicula: any;
  generoList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    //Desde el constructor obtener el identificar de la ruta
    const id = +this.route.snapshot.paramMap.get('id');
    this.getPelicula(id);
  }
  getPelicula(id: number) {
    this.gService.get('peliculas', id).subscribe(
      (respuesta: any) => {
        this.pelicula = respuesta;
        console.log(this.pelicula);
        //se construye el formulario
        this.reactiveForm();

      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.formCreate.patchValue({
      image: file,

    });
    this.formCreate.get('image').updateValueAndValidity()

  }
  uploadFile1(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.formCreate.patchValue({
      banner: file,

    });
    this.formCreate.get('banner').updateValueAndValidity()

  }

  reactiveForm() {
    this.getGeneros();
    this.getClasificaciones();
    //Si hay información del videojuego
    if (this.pelicula) {
      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formCreate = this.fb.group({
        id: [this.pelicula.id, [Validators.required]],
        name: [this.pelicula.name, [Validators.required]],
        synopsis: [this.pelicula.synopsis, [Validators.required]],
        premiere_date: [this.pelicula.premiere_date, [Validators.required]],
        duration: [this.pelicula.duration, [Validators.required]],
        image: [this.pelicula.image, [Validators.required]],
        banner: [this.pelicula.banner, [Validators.required]],
        active: [this.pelicula.active, [Validators.required]],
        classification_movie_id: [this.pelicula.classification_movie_id, [Validators.required]],
        gener_movies: this.fb.array([]),
        gener_movie_id: this.fb.array([]),

      });
    }
  }
  ngOnInit(): void {

  }

  getClasificaciones() {
    this.gService
      .list('peliculas/clasificaciones')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.classification_movie = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getGeneros() {
    return this.gService.list('peliculas/generos').subscribe(
      (respuesta: any) => {
        (this.generoList = respuesta), this.checkboxGeneros();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get gener_movies(): FormArray {
    return this.formCreate.get('gener_movies') as FormArray;
  }
  get gener_movie_id(): FormArray {
    return this.formCreate.get('gener_movie_id') as FormArray;
  }
  private checkboxGeneros() {
    //Recorrer la lista de plataformas y especificar si esta seleccionado
    this.generoList.forEach((o) => {
      let selected = false;
      if (this.pelicula.gener_movies.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formCreate.controls.gener_movies as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formCreate.controls.gener_movie_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.gener_movie_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.gener_movie_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.gener_movie_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("id", this.formCreate.get('id').value);
    formData.append("name", this.formCreate.get('name').value);
    formData.append("synopsis", this.formCreate.get('synopsis').value);
    formData.append("premiere_date", this.formCreate.get('premiere_date').value);
    formData.append("duration", this.formCreate.get('duration').value);
    formData.append("image", this.formCreate.get('image').value);
    formData.append("banner", this.formCreate.get('banner').value);
    formData.append("active", this.formCreate.get('active').value);
    formData.append("classification_movie_id", this.formCreate.get('classification_movie_id').value);


    for (let i = 0; i < this.gener_movies.length; i++) {
      const valor = this.gener_movies.value[i];

      if (valor == true) {

        formData.append("gener_movies[]", this.generoList[i].id);


        console.log(formData.get('gener_movies[]'));
      }

    }

    if (this.formCreate.valid) {
      this.gService.update('peliculas/update', this.pelicula.id, formData).subscribe(
        (respuesta: any) => {
          this.pelicula = respuesta;
          this.router.navigate(['mantenimiento/peliculas/activas'], {
            queryParams: { register: 'true' },
          });
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Película actualizada!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          this.error = error;
          console.log(this.error);
          Swal.fire({
            icon: 'error',
            title: '¡Ingrese los datos!',
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

  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };
}
