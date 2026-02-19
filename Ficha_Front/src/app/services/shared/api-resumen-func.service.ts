import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import { DevuelveAccesoV2 } from '../../auth/models/get/response/devuelveAccesoV2.model';
import { DevuelveResumenFuncionario } from '../models/devuelveResumenFuncionario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorNumberService } from './error-number.service';


@Injectable({
  providedIn: 'root',
})
export class ApiResumenFuncService {
  $devuelveResumenFuncionario = new Subject<DevuelveResumenFuncionario>();
  $devuelveAcceso = new Subject<DevuelveAccesoV2>();
  acceso: DevuelveAccesoV2 = { rut: '', exp_refresh: new Date(), fecha: new Date(), idSistema: 0, refresh_token: '', token: '', type: '' };

  resumenFuncionario: DevuelveResumenFuncionario = {};

  constructor(private httpClient: HttpClient, private _errorNumber: ErrorNumberService) {
    this.$devuelveResumenFuncionario.subscribe((resumen) => {
      this.resumenFuncionario = resumen;
    });
    this.$devuelveAcceso.subscribe((acceso) => {
      this.acceso = acceso;
    });
  }

  setDevuelveResumenFuncionario(resumen: DevuelveResumenFuncionario) {
    this.$devuelveResumenFuncionario.next(resumen);
  }
  getDevuelveResumenFuncionario(): DevuelveResumenFuncionario {
    return <DevuelveResumenFuncionario>this.resumenFuncionario;
  }
  setDevuelveAcceso(acceso: DevuelveAccesoV2) {
    this.$devuelveAcceso.next(acceso);
  }
  getDevuelveAcceso() {
    return this.acceso;
  }

  devuelveResumenFuncionario(rut: number) {
    return this.httpClient.get<DevuelveResumenFuncionario[]>(environment.endPointsGlobal.infoUser.devuelveResumenFuncionario.replace('{rutFuncionario}', rut.toString())).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => this._errorNumber.getError(error.status, error.message));
    }));;
  }

}
