import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators,FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-peliculas-create',
  templateUrl: './peliculas-create.component.html',
  styleUrls: ['./peliculas-create.component.scss']
})
export class PeliculasCreateComponent implements OnInit {
  videojuego: any;
  plataformasList: any;
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
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaEstrenoInicial: ['', [Validators.required]],
      plataformas: this.fb.array([]),
      plataforma_id: this.fb.array([]),
    });
    this.getPlataformas();
  }
  ngOnInit(): void { }
  getPlataformas() {
    return this.gService.list('videojuegos/plataformas').subscribe(
      (respuesta: any) => {
        (this.plataformasList = respuesta), this.checkboxPlataformas();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get plataformas(): FormArray {
    return this.formCreate.get('plataformas') as FormArray;
  }
  get plataforma_id(): FormArray {
    return this.formCreate.get('plataforma_id') as FormArray;
  }
  private checkboxPlataformas() {
    this.plataformasList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.plataformas as FormArray).push(control);
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.plataforma_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.plataforma_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.plataforma_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    console.log(this.formCreate.value);
    this.gService.create('videojuegos', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.videojuego = respuesta;
        this.router.navigate(['/videojuego/all'], {
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
    this.router.navigate(['/videojuego/all']);
  }
  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };
}
