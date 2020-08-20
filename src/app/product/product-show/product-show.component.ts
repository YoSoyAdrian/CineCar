import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import {
  Validators, FormGroup, FormBuilder,
} from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  formUpdate: FormGroup;

  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService) {
    let id = +this.route.snapshot.paramMap.get('id');
    this.obtenerProducto(id);

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
    this.gService.updateVoto('votos', this.datos.id).subscribe(
      (respuesta: any) => {
        this.datos = respuesta;

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
