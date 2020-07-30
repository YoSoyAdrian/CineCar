import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieRoutingModule } from './movie-routing.module';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';
import { PeliculasCreateComponent } from './peliculas-create/peliculas-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeliculasIndexComponent } from './peliculas-index/peliculas-index.component';


@NgModule({
  declarations: [PeliculasComponent, CarouselComponent, PeliculasShowComponent, PeliculasCreateComponent, PeliculasIndexComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  exports: [PeliculasComponent, CarouselComponent, PeliculasShowComponent,]
})
export class MovieModule { }
