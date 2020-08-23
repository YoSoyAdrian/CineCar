import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  usuario: any;
  loading: any = false;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveFormCreate();
  }

  reactiveFormCreate() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });

  }
  ngOnInit(): void { }
  submitFormCreate() {
    this.loading = true;
    if (this.formCreate.valid) {
      this.authService.createUser(this.formCreate.value).subscribe(
        (respuesta: any) => {

          (this.usuario = respuesta), this.router.navigateByUrl('/usuario/login', { skipLocationChange: true }).then(() => {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: '¡Registro éxitoso!',
              showConfirmButton: false,
              timer: 2500
            })
            this.router.navigate(['usuario/login']);

          });
          window.location.reload();
        },
        (error) => {
          this.error = error;
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: '¡Error de registro!',
          })
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Ingrese TODOS los datos!',
      })
    }
  }

  onReset() {
    this.formCreate.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  }
}
