import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from "./peliculas/peliculas.component";
import { PeliculasShowComponent } from './peliculas-show/peliculas-show.component';
import { PeliculasCreateComponent } from './peliculas-create/peliculas-create.component';


const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'peliculas/create', component: PeliculasCreateComponent },
  { path: 'peliculas/:id', component: PeliculasShowComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
