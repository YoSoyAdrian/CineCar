import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [UserLoginComponent, UserCreateComponent, UsuarioComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  exports: [UserLoginComponent, UserCreateComponent, UsuarioComponent]
})
export class UserModule { }
