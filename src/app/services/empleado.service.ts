import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  numeroEmpleado: string;
  nombreCompleto: string;
  correo: string;
  departamento: string;
  cargo: string;
  estado: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'https://localhost:7226/api/empleado'; // 👉 ajusta según tu backend

  constructor(private http: HttpClient) {}

  // Obtener empleados
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/listar`);
  }

  // Cambiar estado
  cambiarEstado(numeroEmpleado: string, activo: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiar-estado/${numeroEmpleado}?activo=${activo}`, {});
  }
}
