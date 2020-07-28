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


@NgModule({
  declarations: [PeliculasComponent, CarouselComponent, PeliculasShowComponent, PeliculasCreateComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  exports: [PeliculasComponent, CarouselComponent, PeliculasShowComponent,]
})
export class MovieModule { }
