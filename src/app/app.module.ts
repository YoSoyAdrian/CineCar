import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SlickCarouselModule } from 'ngx-slick-carousel';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductModule } from './product/product.module';
import { BillboardModule } from './billboard/billboard.module';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,

    // importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP
    HttpClientModule,
    // importar otras dependencias que sean necesario cargar en el componente principal.
    // importar los módulos creados propios en orden
    CoreModule,
    ShareModule,
    // después los demás módulos
    HomeModule,
    UserModule,
    MovieModule,
    ProductModule,
    BillboardModule,

    NgbModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    

    // al final el gestor de las rutas principal
    AppRoutingModule,





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
