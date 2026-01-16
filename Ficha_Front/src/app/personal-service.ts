import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from './personal';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private urlBase = 'http://localhost:8080/api/empleados';
  private http = inject(HttpClient);

  obtenerPersonalLista(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.urlBase);
  }
}
