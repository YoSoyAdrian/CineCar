import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  options: IndividualConfig;
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;

    //Habilitar formato HTML dentro de la notificación
    this.options.enableHtml = true;

    /* Top Right, Bottom Right, Bottom Left, Top Left, Top Full Width, Bottom Full Width, Top Center, Bottom Center */
    this.options.positionClass = 'toast-top-full-width';
    //Tiempo que se presenta el mensaje
    // this.options.timeOut = 5000;
    this.options.disableTimeOut = true;
    this.options.closeButton = true;
  }
  /*
Presentar mensaje de notificación
Toast Type: success, info, warning, error
 */
  public mensaje(titulo: string, mensaje: string, tipo: string) {
    this.toastr.show(mensaje, titulo, this.options, 'toast-' + tipo);
  }
  /*
Gestión de mensaje de validación de formularios para presentarlos en una notificación
*/
  msjValidacion(errores: any) {
    let mensaje = '';
    if (errores != null) {
      if (errores.error.errors) {
        for (const item of errores.error.errors) {
          mensaje += item.message + ' <br/>';
        }
      } else {
        if (errores.error.error) {
          mensaje += errores.error.error;
        }
      }
    } else {
      if (errores.error) {
        mensaje += errores.error + ' <br/>';
      }
    }
    this.toastr.show('', mensaje, this.options, 'toast-warning');
  }
}
