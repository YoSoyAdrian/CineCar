import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraListComponent } from './cartelera-list/cartelera-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';


const routes: Routes = [

  { path: 'cartelera', component: CarteleraComponent },

  {
    path: 'mantenimiento/carteleras', component: CarteleraIndexComponent, canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: '1' },
    children: [
      { path: 'registrar', component: CarteleraCreateComponent },
      { path: 'listado', component: CarteleraListComponent },
    ]
  }, { path: 'reservacion/:id', component: ReservationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillboardRoutingModule { }
