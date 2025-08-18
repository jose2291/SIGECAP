import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 📌 Modelo de Salón
export interface Salon {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private apiUrl = 'https://localhost:7226/api/salon'; // 👉 Ajusta al puerto/backend

  constructor(private http: HttpClient) {}

  // Crear un nuevo salón
  crearSalon(salon: Salon): Observable<Salon> {
    return this.http.post<Salon>(this.apiUrl, salon);
  }

  // Obtener todos los salones
  obtenerSalones(): Observable<Salon[]> {
    return this.http.get<Salon[]>(this.apiUrl);
  }

  // Obtener un salón por ID
  obtenerSalonPorId(id: number): Observable<Salon> {
    return this.http.get<Salon>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un salón existente
  actualizarSalon(id: number, salon: Salon): Observable<Salon> {
    return this.http.put<Salon>(`${this.apiUrl}/${id}`, salon);
  }

  // Eliminar un salón
  eliminarSalon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
