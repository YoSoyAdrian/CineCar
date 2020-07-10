import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { PeliculasComponent } from './movie/peliculas/peliculas.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { ProductosComponent } from './product/productos/productos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InicioComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'product', component: ProductosComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
