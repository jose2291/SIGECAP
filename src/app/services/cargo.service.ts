import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cargo {
  id?: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = 'https://localhost:7226/api/cargo'; // 👉 Ajusta al endpoint de tu backend

  constructor(private http: HttpClient) {}

  // Crear nuevo cargo
  crearCargo(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${this.apiUrl}`, cargo);
  }

  // Obtener todos los cargos
  obtenerCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.apiUrl}`);
  }

  // Obtener cargo por id
  obtenerCargoPorId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un cargo
  actualizarCargo(id: number, cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.apiUrl}/${id}`, cargo);
  }

  // Eliminar un cargo
  eliminarCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
