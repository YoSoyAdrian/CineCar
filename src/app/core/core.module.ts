import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent,],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule, // modulo de animaciones requerido
    ToastrModule.forRoot(), // ToastrModule agregado
  ],
  exports: [HeaderComponent, FooterComponent,]
})
export class CoreModule { }
