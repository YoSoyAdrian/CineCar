import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
  {
    path: 'usuario/login', component: UsuarioComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
