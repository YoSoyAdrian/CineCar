import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomHandlerErrorService } from './custom-handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //Header para afirmar el tipo de contenido JSON
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //URL del API
  ServerUrl = environment.apiURL;
  //Variable observable para gestionar la información del usuario, con características especiales
  private currentUserSubject: BehaviorSubject<any>;
  //Variable observable para gestionar la información del usuario
  public currentUser: Observable<any>;
  //Inyectar cliente HTTP para las solicitudes al API
  // Personalización de errores
  constructor(
    private http: HttpClient,
    private handler: CustomHandlerErrorService
  ) {
    //Obtener los datos del usuario en localStorage, si existe
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    //Establecer un observable para acceder a los datos del usuario
    this.currentUser = this.currentUserSubject.asObservable();
  }
  //Obtener el valor del usuario actual
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  //Crear usuario
  createUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.ServerUrl + 'auth/register', user, this.httpOptions)
      .pipe(catchError(this.handler.handleError.bind(this)));
  }
  //Login
  loginUser(user: any): Observable<any> {
    return this.http
      .post<any>(this.ServerUrl + 'auth/login', user, this.httpOptions)
      .pipe(
        map((user) => {
          // almacene los detalles del usuario y el token jwt
          // en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la pági

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  //Logout de usuario autentificado
  logout() {
    // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
