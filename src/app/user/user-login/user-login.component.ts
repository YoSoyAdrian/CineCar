import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  infoUsuario: any;
  loading: any = false;
  error: any;
  formulario: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    //Si esta logueado que lo redireccione
    if (authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.reactiveFormLogin();
    this.login();
  }
  /* Definir formulario y la validación */
  reactiveFormLogin() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    $(document.getElementById("panel")).ready(function () {
      $(".login-info-box").fadeOut();
      $(".login-show").addClass("show-log-panel");
    });

    $('.login-reg-panel input[type="radio"]').on("change", function () {
      if ($("#log-login-show").is(":checked")) {
        $(".register-info-box").fadeOut();
        $(".login-info-box").fadeIn();

        $(".white-panel").addClass("right-log");
        $(".register-show").addClass("show-log-panel");
        $(".login-show").removeClass("show-log-panel");
      } else if ($("#log-reg-show").is(":checked")) {
        $(".register-info-box").fadeIn();
        $(".login-info-box").fadeOut();

        $(".white-panel").removeClass("right-log");

        $(".login-show").addClass("show-log-panel");
        $(".register-show").removeClass("show-log-panel");
      }
    });
  }


  // Mensajes
  mensajes() {
    let register = false;

    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notificacion.mensaje(
        'Usuario',
        'Registro de usuario satisfactorio! Por favor especifique las credenciales para ingresar!',
        'success'
      );
    }
  }

  ngOnInit(): void {
    this.mensajes();
  }

  submitFormLogin() {
    this.loading = true;
    //Reglas de validación de Angular inválidas
    if (this.formulario.invalid) {

      return;

    }

    this.authService.loginUser(this.formulario.value).subscribe(
      (respuesta: any) => {
        (this.infoUsuario = respuesta), this.router.navigate(['peliculas/']);
      },
      (error: any) => {
        this.loading = false;
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onReset() {
    this.formulario.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  }
}
