import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) { }

  // Ajusta estas rutas a tus endpoints del backend
  getRegiones(): Observable<any[]> { return this.http.get<any[]>('/api/catalogos/regiones'); }
  getComunas(regionId: number): Observable<any[]> { return this.http.get<any[]>(`/api/catalogos/comunas/${regionId}`); }
  getEstadosCiviles(): Observable<any[]> { return this.http.get<any[]>('/api/catalogos/estado-civil'); }
  getSistemasSalud(): Observable<any[]> { return this.http.get<any[]>('/api/catalogos/sistema-salud'); }

  getNiveles(): Observable<any[]> {
    return this.http.get<any[]>('/api/catalogos/nivel-educacional');
  }

  getRangosPago(): Observable<any[]> {
    return this.http.get<any[]>('/api/catalogos/rango-pago');
  }

  getEstadosEconomicos(): Observable<any[]> {
    return this.http.get<any[]>('/api/catalogos/estado-economico');
  }
}