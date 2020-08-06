import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from "./peliculas/peliculas.component";
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';
import { PeliculasCreateComponent } from './peliculas-create/peliculas-create.component';
import { PeliculasIndexComponent } from './peliculas-index/peliculas-index.component';
import { PeliculasListComponent } from './peliculas-list/peliculas-list.component';


const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  {
    path: 'mantenimiento/peliculas', component: PeliculasIndexComponent,
    children: [
      { path: 'registrar', component: PeliculasCreateComponent },
      { path: 'listado', component: PeliculasListComponent },
    ]
  },
  { path: 'peliculas/:id', component: PeliculasShowComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
