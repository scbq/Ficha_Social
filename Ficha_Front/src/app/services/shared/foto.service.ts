import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FotoService {

  constructor(private http: HttpClient) { }
  //DEVUELVE FOTO DEL PROYECTO , NO DEBERIAN HABER MAS
  devuelveFoto(rut: number) {
    const urlFoto = environment.endPointsGlobal.infoUser.devuelveFoto.replace('{rut}', rut.toString());
    return this.http.get(urlFoto).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
