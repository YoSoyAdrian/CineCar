import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  fileToUpload: FileList;
  $: any;
  type_product: any;
  producto: any;
  clasificacionList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,

    private gService: GenericService,

    private notificacion: NotificacionService
  ) {

    this.reactiveForm();
    this.getClasificaciones();
    this.getTipoProductos();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      active: ['', [Validators.required]],
      type_product_id: ['', [Validators.required]],
      classification_products: this.fb.array([]),
      classification_product_id: this.fb.array([]),

    });


  }

  ngOnInit(): void {

  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileToUpload = event.target.files;
    this.formCreate.patchValue({
      image: this.fileToUpload[0],

    });
    this.formCreate.get('image').updateValueAndValidity();

  }

  getTipoProductos() {
    this.gService
      .list('productos/tipoProductos')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.type_product = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
  getClasificaciones() {
    return this.gService.list('productos/clasificaciones').subscribe(
      (respuesta: any) => {
        (this.clasificacionList = respuesta), this.checkboxProductos();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get classification_products(): FormArray {
    return this.formCreate.get('classification_products') as FormArray;
  }
  get classification_product_id(): FormArray {
    return this.formCreate.get('classification_product_id') as FormArray;
  }
  private checkboxProductos() {
    this.clasificacionList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.classification_products as FormArray).push(control);
    });
  }
  onCheckChange(idCheck: number, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.classification_product_id as FormArray).push(
        new FormControl(event.target.value)
      );
      console.log("Agregado", event.target.value);
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;
      console.log(i);
      this.classification_product_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array

          (this.formCreate.controls.classification_product_id as FormArray).removeAt(i);


          return;
        }
        i++;
      });
    }
  }



  submitForm() {

    var formData: FormData = new FormData();
    formData.append("name", this.formCreate.get('name').value);
    formData.append("description", this.formCreate.get('description').value);
    formData.append("price", this.formCreate.get('price').value);
    formData.append("image", this.formCreate.get('image').value);
    formData.append("active", this.formCreate.get('active').value);
    formData.append("type_product_id", this.formCreate.get('type_product_id').value);




    for (let i = 0; i < this.classification_products.length; i++) {
      const valor = this.classification_products.value[i];

      if (valor == true) {
        console.log("valor: ", valor);
        formData.append("classification_products[]", this.clasificacionList[i].id);
      }
    }

    if (this.formCreate.valid) {

      this.gService.create('productos/create', formData).subscribe(
        (respuesta: any) => {
          this.producto = respuesta;
          this.router.navigate(['mantenimiento/productos/activos'], {
            queryParams: { register: 'true' },
          });
        },
        (error) => {
          this.error = error;
          console.log(this.error);
          this.notificacion.msjValidacion(this.error);
        }
      );
    }
  }
  onReset() {
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/carteleras/mantenimiento/registrar']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }


}
