import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Departamento {
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'https://localhost:7226/api/departamento';

  constructor(private http: HttpClient) {}

  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data.map(d => ({
          id: d.id ?? d.Id,
          nombre: d.nombre ?? d.Nombre
        }))
      )
    );
  }

  crearDepartamento(dep: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, dep);
  }

  actualizarDepartamento(id: number, dep: Departamento): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dep);
  }

  eliminarDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
