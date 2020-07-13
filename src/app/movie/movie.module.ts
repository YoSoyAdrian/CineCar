import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieRoutingModule } from './movie-routing.module';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';


@NgModule({
  declarations: [PeliculasComponent, CarouselComponent, PeliculasShowComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule
  ],
  exports: [PeliculasComponent, CarouselComponent, PeliculasShowComponent]
})
export class MovieModule { }
