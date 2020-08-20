import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RolGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    //Información usuario actual
    let currentUser: any;
    this.auth.currentUser.subscribe((x) => (currentUser = x));
    //Recibir de la configuración de la ruta, propiedad datos
    const expectedRole = route.data.expectedRole;
    /* 1: administrador
     2: publicador
     3: cliente */
    if (!currentUser || currentUser.user.rol_id != expectedRole) {
      this.router.navigate(['/peliculas/'], {
        queryParams: { auth: 'true' },
      });
      return false;
    }
    return true;
  }
}
