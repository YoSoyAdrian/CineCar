import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';
import 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  fileToUpload: FileList;
  $: any;
  type_product: any;
  producto: any;
  productosList: any;
  clasificacionList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private route: ActivatedRoute,

    private notificacion: NotificacionService
  ) {

    //Desde el constructor obtener el identificar de la ruta
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProducto(id);
  }

  reactiveForm() {
    this.getClasificaciones();
    this.getTipoProductos();
    this.getActive();
    if (this.producto) {
      this.formCreate = this.fb.group({
        id: [this.producto.id, [Validators.required]],
        name: [this.producto.name, [Validators.required]],
        description: [this.producto.description, [Validators.required]],
        price: [this.producto.price, [Validators.required]],
        image: [this.producto.image, [Validators.required]],
        active: [this.producto.active, [Validators.required]],
        type_product_id: [this.producto.type_product_id, [Validators.required]],
        classification_products: this.fb.array([]),
        classification_product_id: this.fb.array([]),

      });
    }

  }

  ngOnInit(): void {

  }


  getActive() {
    if (this.producto.active == 1) {
      console.log("Activo: ", this.producto.active);
      $(".inputGroup #radio1").attr("checked");
    } else {
      console.log("Desactivado: ", this.producto.active);
      $("#radio2").attr("checked");
    }
  }
  getProducto(id: number) {
    this.gService.get('productos', id).subscribe(
      (respuesta: any) => {
        this.producto = respuesta;
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
        (this.clasificacionList = respuesta), this.checkboxClasificaciones();
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
  private checkboxClasificaciones() {
    //Recorrer la lista de plataformas y especificar si esta seleccionado
    this.clasificacionList.forEach((o) => {
      let selected = false;
      if (this.producto.classification_products.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formCreate.controls.classification_products as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formCreate.controls.classification_product_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.classification_product_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

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

      this.gService.update('productos/update', this.producto.id, formData).subscribe(
        (respuesta: any) => {
          this.producto = respuesta;
          this.router.navigate(['mantenimiento/productos/activos'], {
            queryParams: { register: 'true' },
          });
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '¡Producto actualizado!',
            showConfirmButton: false,
            timer: 1000
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
    this.router.navigate(['/mantenimiento/productos/registrar']);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }


}
