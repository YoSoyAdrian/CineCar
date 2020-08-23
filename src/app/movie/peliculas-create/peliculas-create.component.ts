import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';




@Component({
  selector: 'app-peliculas-create',
  templateUrl: './peliculas-create.component.html',
  styleUrls: ['./peliculas-create.component.scss']
})
export class PeliculasCreateComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

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
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      premiere_date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      image: null,
      banner: [],
      active: ['', [Validators.required]],
      classification_movie_id: ['', [Validators.required]],
      gener_movies: this.fb.array([]),
      gener_movie_id: this.fb.array([]),

    });


    this.getGeneros();
    this.getClasificaciones();
  }

  ngOnInit(): void {

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
        (this.generoList = respuesta), this.checkboxPeliculas();
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
  private checkboxPeliculas() {
    this.generoList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.gener_movies as FormArray).push(control);
    });
  }
  onCheckChange(idCheck: number, event) {
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
      console.log(i);
      this.gener_movie_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array

          (this.formCreate.controls.gener_movie_id as FormArray).removeAt(i);

          console.log("Gener_movie_id", (this.formCreate.controls.gener_movie_id as FormArray).value);
          console.log("Gener_movies", (this.formCreate.controls.gener_movies as FormArray).value);
          console.log("IDCheck", idCheck);

          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    var formData: any = new FormData();
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
      this.gService.create('peliculas/create', formData).subscribe(
        (respuesta: any) => {
          this.pelicula = respuesta;
          this.router.navigate(['mantenimiento/peliculas/activas'], {
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

    }

  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/mantenimiento/peliculas/registrar']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }

}
