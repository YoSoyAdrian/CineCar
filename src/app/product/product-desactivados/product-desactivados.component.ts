import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-product-desactivados',
  templateUrl: './product-desactivados.component.html',
  styleUrls: ['./product-desactivados.component.scss']
})
export class ProductDesactivadosComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.listaProductos();
  }
  ngOnInit(): void {


    $('.button, .close').on('click', function (e) {
      e.preventDefault();
      $('.detail, html, body').toggleClass('open');
    });

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
  listaProductos() {
    this.gService
      .list('productos/all')
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
  actualizarProducto(id: number) {
    this.router.navigate(['/productos/update', id], {
      relativeTo: this.route,
    });
  }
}
