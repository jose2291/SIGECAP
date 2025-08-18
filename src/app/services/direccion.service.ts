import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Direccion {
  id?: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'https://localhost:7226/api/direccion'; // 👉 Ajusta al endpoint correcto en tu backend

  constructor(private http: HttpClient) {}

  // Crear nueva dirección
  crearDireccion(direccion: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(`${this.apiUrl}`, direccion);
  }

  // Obtener todas las direcciones
  obtenerDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}`);
  }

  // Obtener dirección por ID
  obtenerDireccionPorId(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(`${this.apiUrl}/${id}`);
  }

  // Actualizar dirección
  actualizarDireccion(id: number, direccion: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(`${this.apiUrl}/${id}`, direccion);
  }

  // Eliminar dirección
  eliminarDireccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
