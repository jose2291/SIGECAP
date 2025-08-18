import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NivelAcademico {
  id?: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class NivelAcademicoService {
  private apiUrl = 'https://localhost:7226/api/nivelacademico'; // 👉 Ajusta a tu puerto/backend

  constructor(private http: HttpClient) {}

  // Crear nuevo nivel académico
  crearNivel(nivel: NivelAcademico): Observable<NivelAcademico> {
    return this.http.post<NivelAcademico>(`${this.apiUrl}`, nivel);
  }

  // Obtener todos los niveles académicos
  obtenerNiveles(): Observable<NivelAcademico[]> {
    return this.http.get<NivelAcademico[]>(`${this.apiUrl}`);
  }

  // Obtener nivel por id
  obtenerNivelPorId(id: number): Observable<NivelAcademico> {
    return this.http.get<NivelAcademico>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un nivel académico
  actualizarNivel(id: number, nivel: NivelAcademico): Observable<NivelAcademico> {
    return this.http.put<NivelAcademico>(`${this.apiUrl}/${id}`, nivel);
  }

  // Eliminar un nivel académico
  eliminarNivel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
