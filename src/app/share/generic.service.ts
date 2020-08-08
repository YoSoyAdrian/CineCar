import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomHandlerErrorService } from './custom-handler-error.service';
import { AuthenticationService } from './authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiURL;
  //Información usuario actual
  currentUser: any;
  //Headers a inclur en las solicitudes, opcional, solo cuando es necesario
  headers = new HttpHeaders();
  //Inyectar cliente HTTP para las solicitudes al API
  // Personalización de errores
  //Servicio de autentificación
  constructor(
    private http: HttpClient,
    private handler: CustomHandlerErrorService,
    private authenticationService: AuthenticationService
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    if (this.currentUser) {
      if (this.currentUser.access_token) {
        this.headers = this.headers.append(
          'Authorization',
          'Bearer ' + this.currentUser.access_token
        );
      }
    }
  }
  // Listar
  list(endopoint: string): Observable<any> {
    return this.http
      .get<any>(this.urlAPI + endopoint, { headers: this.headers })
      .pipe(catchError(this.handler.handleError.bind(this)));
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http
      .get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handler.handleError.bind(this)));
  }
  // crear
  create(endopoint: string, objCreate: any | any | File): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate, {
      headers: this.headers,
    });
  }
  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.patch<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate,
      { headers: this.headers }
    );
  }
  postFile(endopoint: string, fileToUpload: File): Observable<boolean> {

    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    return this.http
      .post(this.urlAPI + endopoint, formData, { headers: this.headers })
      .pipe(catchError(this.handler.handleError.bind(this)));
  }
}
