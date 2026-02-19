import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import sha1 from 'sha1';
import Swal from 'sweetalert2';
import { DevuelveAccesoV2Params } from '../models/get/params/devuelveAccesoV2Params.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { DevuelveAccesoV2 } from '../models/get/response/devuelveAccesoV2.model';
import { ApiResumenFuncService } from '../../services/shared/api-resumen-func.service';
import { DevuelveResumenFuncionario } from '../../services/models/devuelveResumenFuncionario.model';
import { log } from 'console';

@Component({
  selector: 'app-login',
  imports: [SharedModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})

export class LoginComponent {
  nameProyect = environment.nameProyect;
  constructor(private router: Router, private _authService: AuthService, private _apiResumenFunc: ApiResumenFuncService) { }

  ngOnInit(): void { }

  validarUsuario(form: NgForm): boolean | void {
    if (form.invalid) {
      return false;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Validando sesión...',
    });
    Swal.showLoading();
    const passwordSha1 = sha1(form.value.password);
    let devuelveAccesoV2: DevuelveAccesoV2Params = { id_sistema: environment.idSistema, user: form.value.usuario, password: passwordSha1 };
    // MS DE LOGIN
    this._authService.devuelveAccesoV2(devuelveAccesoV2).subscribe({
      next: (devuelveAcceso: DevuelveAccesoV2) => {

        sessionStorage.setItem('token', devuelveAcceso.token)
        sessionStorage.setItem('exp_refresh', devuelveAcceso.exp_refresh.toString())
        sessionStorage.setItem('fecha', devuelveAcceso.fecha.toString())
        sessionStorage.setItem('refresh_token', devuelveAcceso.refresh_token)

        this._apiResumenFunc.devuelveResumenFuncionario(Number(devuelveAcceso.rut)).subscribe({
          next: (resumenFun: DevuelveResumenFuncionario[]) => {
            console.log(resumenFun);
            this._apiResumenFunc.setDevuelveResumenFuncionario(resumenFun[0]);
          },
          complete: () => {
            this.router.navigate(['/index']);
            Swal.close();
          }
        })
        console.log(devuelveAcceso)
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: 'Usuario y contraseña no válidos :(',
            });
            break;

          case 409:
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: 'Usuario y contraseña no válidos :(',
            });
            break;

          case 500:
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: 'Error general en el servidor :(',
            });
            break;

          default:
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: 'Algo salió mal :(',
            });
            break;
        }
      },
      complete: () => {
        console.log('IGUALS');

      }
    })
  }
}
