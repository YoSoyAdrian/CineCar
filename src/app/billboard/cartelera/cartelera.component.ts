import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) { }

  ngOnInit(): void {
    this.listaCarteleras();
  }
  listaCarteleras() {
    this.gService
      .list('carteleras/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.datos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.name, error.message, 'error');
        }
      );
  }

}
