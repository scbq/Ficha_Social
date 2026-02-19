import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevuelveAccesoV2Params } from '../models/get/params/devuelveAccesoV2Params.model';
import { environment } from '../../../environments/environment';
import { DevuelveAccesoV2 } from '../models/get/response/devuelveAccesoV2.model';
import { catchError, throwError } from 'rxjs';
import { ErrorNumberService } from '../../services/shared/error-number.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  devuelveAccesoV2(devuelveAccesov2: DevuelveAccesoV2Params) {
    devuelveAccesov2.user = btoa(devuelveAccesov2.user)
    return this._http.post<DevuelveAccesoV2>(environment.endPointAuth.post.devuelveAccesoV2, devuelveAccesov2);
  }
}
