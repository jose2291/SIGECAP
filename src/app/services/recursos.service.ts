import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recurso {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = 'https://localhost:7226/api/recurso'; // 👉 Ajusta al endpoint real de tu backend

  constructor(private http: HttpClient) {}

  // Crear nuevo recurso
  crearRecurso(recurso: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(`${this.apiUrl}`, recurso);
  }

  // Obtener todos los recursos
  obtenerRecursos(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(`${this.apiUrl}`);
  }

  // Obtener recurso por ID
  obtenerRecursoPorId(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.apiUrl}/${id}`);
  }

  // Actualizar recurso
  actualizarRecurso(id: number, recurso: Recurso): Observable<Recurso> {
    return this.http.put<Recurso>(`${this.apiUrl}/${id}`, recurso);
  }

  // Eliminar recurso
  eliminarRecurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
