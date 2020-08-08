import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraListComponent } from './cartelera-list/cartelera-list.component';


const routes: Routes = [

  { path: 'cartelera', component: CarteleraComponent },

  {
    path: 'mantenimiento/carteleras', component: CarteleraIndexComponent,
    children: [
      { path: 'registrar', component: CarteleraCreateComponent },
      { path: 'listado', component: CarteleraListComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillboardRoutingModule { }
