import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductosComponent } from './productos/productos.component';
import { SliderBebidasComponent } from './slider-bebidas/slider-bebidas.component';
import { SliderPlatillosComponent } from './slider-platillos/slider-platillos.component';
import { SliderSnacksComponent } from './slider-snacks/slider-snacks.component';


@NgModule({
  declarations: [ProductCarouselComponent, ProductosComponent, SliderBebidasComponent, SliderPlatillosComponent, SliderSnacksComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
