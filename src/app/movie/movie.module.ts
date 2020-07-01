import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieRoutingModule } from './movie-routing.module';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';



@NgModule({
  declarations: [PeliculasComponent, SiderbarComponent, CarrouselComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule
  ],
  exports: [PeliculasComponent, SiderbarComponent, CarrouselComponent]
})
export class MovieModule { }
