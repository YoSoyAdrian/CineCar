import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  currentUser: any;
  localizaciones: any;
  datos = [];
  fechas = [];
  cartelera: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {


    this.listaCarteleras();
    this.filtrarCarteleras();
    this.listaUbicaciones();
  }
  listaCarteleras() {
    this.gService
      .list('carteleras/index')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.datos = data;
          this.cartelera = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.name, error.message, 'error');
        }
      );
  }
  filtrarCarteleras() {

    this.cartelera = this.datos.filter(x => x.number_space > 0);

  }
  listaUbicaciones() {
    this.gService
      .list('carteleras/localizacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.localizaciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.name, error.message, 'error');
        }
      );
  }
  filtrarUbicaciones(event) {

    const value = event.target.value;
    if (value != 0) {
      this.cartelera = this.datos.filter(x => x.location_id == value && x.number_space > 0);
    } else {
      this.cartelera = this.datos;
    }
  }
  filtrarGeneros(nombre: string) {

    const value = nombre;
    console.log(value);
    if (value != "") {
      this.cartelera = this.datos.filter(x => x.date == value);
    } else {
      this.cartelera = this.datos;
    }
  }

}
