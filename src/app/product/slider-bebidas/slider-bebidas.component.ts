import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-slider-bebidas',
  templateUrl: './slider-bebidas.component.html',
  styleUrls: ['./slider-bebidas.component.scss']
})
export class SliderBebidasComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notificacion: NotificacionService) {
  }
  ngOnInit(): void {
    this.listaProductosTop();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  listaProductosTop() {
    this.gService.list('productos/bebidasTop').pipe(takeUntil(this.destroy$)).
      subscribe((data: any) => {
        this.datos = data;
      },
        (error: any) => {
          this.notificacion.mensaje(error.mensaje, error.name, 'error')
            ;
        }
      );

  }

}
