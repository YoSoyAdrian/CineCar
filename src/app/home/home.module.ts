import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { BillboardComponent } from "./billboard/billboard.component";


@NgModule({
  declarations: [InicioComponent, SiderbarComponent, CarrouselComponent, BillboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SlickCarouselModule
  ],
  exports: [InicioComponent, SiderbarComponent, CarrouselComponent, BillboardComponent]
})
export class HomeModule { }
