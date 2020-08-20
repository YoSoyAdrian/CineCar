import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {

  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
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
    this.gService.list('productos/likesTop').pipe(takeUntil(this.destroy$)).
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
