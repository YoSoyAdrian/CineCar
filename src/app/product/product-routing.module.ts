import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  {
    path: 'mantenimiento/productos', component: ProductIndexComponent,
    children: [
      { path: 'registrar', component: ProductCreateComponent },
      { path: 'listado', component: ProductListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
