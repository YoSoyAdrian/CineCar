import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { takeUntil } from 'rxjs/operators';
import { domainToASCII } from 'url';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peliculas-show',
  templateUrl: './peliculas-show.component.html',
  styleUrls: ['./peliculas-show.component.scss']
})
export class PeliculasShowComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerPelicula(id);

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  obtenerPelicula(id: any) {
    this.gService.get("peliculas", id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data);
      this.datos = data;
    },
      (error: any) => {
        this.notificacion.mensaje(error.mensaje, error.name, 'error');
      });
  }

}
