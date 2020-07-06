import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [ProductCarouselComponent, ProductosComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
