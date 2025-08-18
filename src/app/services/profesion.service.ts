import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profesion {
  id?: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {
  private apiUrl = 'https://localhost:7226/api/profesion'; // Ajusta al puerto de tu backend

  constructor(private http: HttpClient) {}

  crearProfesion(profesion: Profesion): Observable<Profesion> {
    return this.http.post<Profesion>(`${this.apiUrl}`, profesion);
  }

  obtenerProfesiones(): Observable<Profesion[]> {
    return this.http.get<Profesion[]>(`${this.apiUrl}`);
  }

  obtenerProfesionPorId(id: number): Observable<Profesion> {
    return this.http.get<Profesion>(`${this.apiUrl}/${id}`);
  }

  actualizarProfesion(id: number, profesion: Profesion): Observable<Profesion> {
    return this.http.put<Profesion>(`${this.apiUrl}/${id}`, profesion);
  }

  eliminarProfesion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
