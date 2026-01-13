import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from './personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private urlBase = "http://localhost:8080/api/v1/id=1";
  private clienteHttp = inject(HttpClient); 

  obtenerPersonalLista(): Observable<Personal[]>{
    return this.clienteHttp.get<Personal[]>(this.urlBase);
  }
 

}
