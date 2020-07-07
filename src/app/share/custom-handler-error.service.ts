import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
//Está definición puede ser una clase o interfaz
//Establece la estructura general de un error
export interface IError {
  error: {
    message: string;
    errors: { field: string; message: string }[];
  };
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
}
@Injectable({
  providedIn: 'root',
})
export class CustomHandlerErrorService {
  constructor() { }
  //Capturar el error y darle formato, además de personalizar el mensaje cuando sea necesario
  public handleError(error: IError | HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      // Ocurrió un error del lado del cliente o de la red.
      console.error('Error: ', error.message);
    }
    if (error.status === 404) {
      error.error.message = 'Recurso no encontrado';
    }
    if (error.status === 401) {
      error.error.message = 'No autorizado';
    }
    if (error.status === 400) {
      error.error.message = 'Solicitud incorrecta';
    }
    return throwError(error);
  }
}
