import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieRoutingModule } from './movie-routing.module';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SiderbarComponent } from './siderbar/siderbar.component';




@NgModule({
  declarations: [PeliculasComponent, SiderbarComponent,],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SlickCarouselModule
  ],
  exports: [PeliculasComponent, SiderbarComponent, ]
})
export class MovieModule { }
