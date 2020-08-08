import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-cartelera-list',
  templateUrl: './cartelera-list.component.html',
  styleUrls: ['./cartelera-list.component.scss']
})
export class CarteleraListComponent implements OnInit {

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
    $('.button, .close').on('click', function (e) {
      e.preventDefault();
      $('.detail, html, body').toggleClass('open');
    });
    this.listaCarteleras();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
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
  actualizarCartelera(id: number) {
    this.router.navigate(['/carteleras/update', id], {
      relativeTo: this.route,
    });
  }
}
