import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';


const routes: Routes = [
  { path: 'cartelera', component: CarteleraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillboardRoutingModule { }
