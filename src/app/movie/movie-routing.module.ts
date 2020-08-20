import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from "./peliculas/peliculas.component";
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';
import { PeliculasCreateComponent } from './peliculas-create/peliculas-create.component';
import { PeliculasIndexComponent } from './peliculas-index/peliculas-index.component';
import { PeliculasListComponent } from './peliculas-list/peliculas-list.component';
import { PeliculasDesactivadasComponent } from './peliculas-desactivadas/peliculas-desactivadas.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { PeliculasUpdateComponent } from './peliculas-update/peliculas-update.component';

const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  {
    path: 'mantenimiento/peliculas', component: PeliculasIndexComponent, canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: '1' },
    children: [
      { path: 'registrar', component: PeliculasCreateComponent },
      { path: 'activas', component: PeliculasListComponent },
      { path: 'desactivadas', component: PeliculasDesactivadasComponent },
      { path: 'actualizar/:id', component: PeliculasUpdateComponent },
    ],
  },
  { path: 'peliculas/:id', component: PeliculasShowComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
