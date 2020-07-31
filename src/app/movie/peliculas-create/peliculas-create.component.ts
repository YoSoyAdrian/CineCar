import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-peliculas-create',
  templateUrl: './peliculas-create.component.html',
  styleUrls: ['./peliculas-create.component.scss']
})
export class PeliculasCreateComponent implements OnInit {
  $: any;
  pelicula: any;
  generoList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      premiere_date: ['', [Validators.required]],
      active: ['', [Validators.required]],
      classification_movie: ['', [Validators.required]],
      gener_movie: this.fb.array([]),
      gener_movie_id: this.fb.array([]),
    });
    this.uploadImages();
  }

  ngOnInit(): void { }

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
  get generos(): FormArray {
    return this.formCreate.get('gener_movie') as FormArray;
  }
  get genero_id(): FormArray {
    return this.formCreate.get('gener_movie_id') as FormArray;
  }
  private checkboxPeliculas() {
    this.generoList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.generos as FormArray).push(control);
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.genero_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.genero_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.genero_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    console.log(this.formCreate.value);
    this.gService.create('peliculas/create', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.pelicula = respuesta;
        this.router.navigate(['/peliculas'], {
          queryParams: { register: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/peliculas/registrar']);
  }
  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };

  uploadImages() {
    $(function () {
      $('#file-input').change(function (e) {
        addImage(e);
      });

      function addImage(e) {
        var file = e.target.files[0],
          imageType = /image.*/;

        if (!file.type.match(imageType))
          return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
      }

      function fileOnload(e) {
        var result = e.target.result;
        $('#imgSalida').attr("src", result);
      }

      $('input[type=file]').change(function () {
        var filename = $(this).val().split('\\').pop();
        var idname = $(this).attr('id');
        $('span.' + idname).next().find('span').html(filename);

      });
      $('#file-input1').change(function (e) {
        addBanner(e);
      });

      function addBanner(e) {
        var file = e.target.files[0],
          imageType = /image.*/;

        if (!file.type.match(imageType))
          return;

        var reader = new FileReader();
        reader.onload= fileOnloadBanner;
        reader.readAsDataURL(file);
      }

      function fileOnloadBanner(e) {
        var result = e.target.result;
        $('#imgSalida1').attr("src", result);
      }

      $('input[type=file]').change(function () {
        var filename = $(this).val().split('\\').pop();
        var idname = $(this).attr('id');
        $('span.' + idname).next().find('span').html(filename);

      });


    });



  }
}
