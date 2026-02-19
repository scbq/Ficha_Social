import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FichaSocial } from '../models/ficha.model';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private apiUrl = '/api/fichas'; // Gracias al proxy, esto apunta al backend

  constructor(private http: HttpClient) { }

  getFichas(): Observable<FichaSocial[]> {
    return this.http.get<FichaSocial[]>(this.apiUrl);
  }

  saveFicha(ficha: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ficha);
  }

  getPersonaByRut(rut: string): Observable<any> {
  return this.http.get<any>(`/api/personas/rut/${rut}`);
}
}