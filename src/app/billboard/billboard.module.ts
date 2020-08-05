import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillboardRoutingModule } from './billboard-routing.module';
import { CarteleraComponent } from './cartelera/cartelera.component';


@NgModule({
  declarations: [CarteleraComponent],
  imports: [
    CommonModule,
    BillboardRoutingModule
  ],
  exports: [CarteleraComponent]
})
export class BillboardModule { }
