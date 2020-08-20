import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }
  canActivate(): boolean {
    if (!this.auth.currentUserValue) {
      this.router.navigate(['/usuario/login/'], {
        queryParams: { auth: 'true' },
      });
      return false;
    }
    return true;
  }
}
