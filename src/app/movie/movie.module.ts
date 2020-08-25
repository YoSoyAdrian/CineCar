import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieRoutingModule } from './movie-routing.module';
import { PeliculasComponent } from './peliculas/peliculas.component';

import { CarouselComponent } from './carousel/carousel.component';
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';
import { PeliculasCreateComponent } from './peliculas-create/peliculas-create.component';
import { ReactiveFormsModule, } from '@angular/forms';
import { PeliculasIndexComponent } from './peliculas-index/peliculas-index.component';
import { PeliculasListComponent } from './peliculas-list/peliculas-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PeliculasDesactivadasComponent } from './peliculas-desactivadas/peliculas-desactivadas.component';
import { PeliculasUpdateComponent } from './peliculas-update/peliculas-update.component';



@NgModule({
  declarations: [PeliculasComponent, CarouselComponent, PeliculasShowComponent, PeliculasCreateComponent, PeliculasIndexComponent, PeliculasListComponent, PeliculasDesactivadasComponent, PeliculasUpdateComponent,],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [PeliculasComponent, CarouselComponent, PeliculasShowComponent,]
})
export class MovieModule { }
