import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';


const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  {
    path: 'mantenimiento/productos', component: ProductIndexComponent, canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: '1' },
    children: [
      { path: 'registrar', component: ProductCreateComponent },
      { path: 'listado', component: ProductListComponent },
    ]
  },
  { path: 'productos/:id', component: ProductShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
