import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import {
  Validators, FormGroup, FormBuilder,
} from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  formUpdate: FormGroup;
  id: any;
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private http: HttpClient) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.obtenerProducto(this.id);

  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  countStar(star) {
    this.selectedValue = star;
    this.submitForm();
  }

  reactiveForm() {


    if (this.datos) {

      this.formUpdate = this.fb.group({
        id: [this.datos.id, [Validators.required]],
        like_count: [this.datos.like_count, [Validators.required]],
      });
    }
  }
  submitForm() {
    console.log(this.formUpdate.value);
    this.http.patch("http://127.0.0.1:8000/api/cinecar/likes/update/" + this.datos.id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json'),

    }, {
      params: new HttpParams().append("cantidad", JSON.stringify(this.selectedValue))
    }).subscribe(
      (respuesta: any) => {
        this.datos = respuesta;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '¡Voto registrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.obtenerProducto(this.id);
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  obtenerProducto(id: any) {
    this.gService.get("productos", id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.datos = data;
      this.reactiveForm();
    },
      (error: any) => {
        this.notificacion.mensaje(error.mensaje, error.name, 'error');
      });
  }

}
