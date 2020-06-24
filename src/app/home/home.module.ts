import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [InicioComponent]
})
export class HomeModule { }
