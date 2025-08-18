import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoReunion {
  Id?: number;
  Descripcion: string; // con D mayúscula
}

@Injectable({
  providedIn: 'root'
})
export class TipoReunionService {
  private apiUrl = 'https://localhost:7226/api/tiporeunion';

  constructor(private http: HttpClient) {}

  obtenerTipos(): Observable<TipoReunion[]> {
    return this.http.get<TipoReunion[]>(this.apiUrl);
  }

  crearTipo(tipo: TipoReunion): Observable<TipoReunion> {
    return this.http.post<TipoReunion>(this.apiUrl, tipo);
  }

  actualizarTipo(id: number, tipo: TipoReunion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tipo);
  }

  eliminarTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
