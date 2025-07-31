import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Persona {
  numeroEmpleado: string;
  dni: string;
  genero: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  nivelAcademico: string;
  profesion: string;
  cargo: string;
  direccionPuesto: string;
  departamento: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'https://localhost:7226/api/persona';

  constructor(private http: HttpClient) {}

  registrarPersona(persona: Persona): Observable<any> {
    return this.http.post(this.apiUrl, persona);
  }

  obtenerPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  // ✅ Nuevo método para buscar por número de empleado o DNI
  buscarPorCriterio(criterio: string): Observable<Persona> {
    const url = `${this.apiUrl}/buscar?criterio=${criterio}`;
    return this.http.get<Persona>(url);
  }
}
