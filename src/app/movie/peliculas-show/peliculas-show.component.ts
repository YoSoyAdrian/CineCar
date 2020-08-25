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
  selector: 'app-peliculas-show',
  templateUrl: './peliculas-show.component.html',
  styleUrls: ['./peliculas-show.component.scss']
})
export class PeliculasShowComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  formUpdate: FormGroup;
  id = 0;
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.obtenerPelicula(this.id);

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

    //Si hay información del videojuego
    if (this.datos) {
      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
        id: [this.datos.id, [Validators.required]],
        vote_count: [this.datos.vote_count, [Validators.required]],
      });
    }
  }
  submitForm() {
    console.log(this.formUpdate.value);
    this.http.patch("http://127.0.0.1:8000/api/cinecar/votos/update/" + this.datos.id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json'),

    }, {
      params: new HttpParams().append("cantidad", JSON.stringify(this.selectedValue))
    }).subscribe(
      (respuesta: any) => {
        this.datos = respuesta;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Voto registrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.obtenerPelicula(this.id);
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  obtenerPelicula(id: any) {
    this.gService.get("peliculas", id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.datos = data;
      this.reactiveForm();
    },
      (error: any) => {
        this.notificacion.mensaje(error.mensaje, error.name, 'error');
      });
  }
  calcularRanking() {

  }
}
