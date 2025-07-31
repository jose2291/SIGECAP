import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  numeroEmpleado: string;
  dni: string;
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
  private apiUrl = 'https://localhost:7226/api';

  constructor(private http: HttpClient) {}

  registrarEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${this.apiUrl}/empleado`, empleado);
  }

  buscarPersonaPorCriterio(criterio: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/persona/buscar?criterio=${criterio}`);
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/empleado/listar`);
  }
}
