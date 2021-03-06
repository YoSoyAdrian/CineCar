import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillboardRoutingModule } from './billboard-routing.module';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarteleraListComponent } from './cartelera-list/cartelera-list.component';
import { ReservationComponent } from './reservation/reservation.component';




@NgModule({
  declarations: [CarteleraComponent, CarteleraCreateComponent, CarteleraIndexComponent, CarteleraListComponent, ReservationComponent],
  imports: [
    CommonModule,
    BillboardRoutingModule,
    ReactiveFormsModule,
   

  ],
  exports: [CarteleraComponent, ReservationComponent]
})
export class BillboardModule { }
