import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { takeUntil } from 'rxjs/operators';
import { domainToASCII } from 'url';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notificacion: NotificacionService) {
  }
  ngOnInit(): void {
    this.listaPeliculasTop();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listaPeliculasTop() {
    this.gService.list('peliculas/votosTop').pipe(takeUntil(this.destroy$)).
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
