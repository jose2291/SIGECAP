import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService, Persona } from '../services/persona.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro-personas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro-personas.component.html',
  styleUrls: ['./registro-personas.component.css']
})
export class RegistroPersonasComponent {

  persona: Persona = {
    numeroEmpleado: '',
    dni: '',
    genero: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    nivelAcademico: '',
    profesion: '',
    cargo: '',
    direccionPuesto: '',
    departamento: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    fechaIngreso: '',
    estado: 'Activo'
  };

  constructor(
    private router: Router,
    private personaService: PersonaService
  ) {}

  volverAlMenu(): void {
    this.router.navigate(['/personas-registradas']);
  }

  limpiarCampos(): void {
    this.persona = {
      numeroEmpleado: '',
      dni: '',
      genero: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      nivelAcademico: '',
      profesion: '',
      cargo: '',
      direccionPuesto: '',
      departamento: '',
      correo: '',
      telefono: '',
      fechaNacimiento: '',
      fechaIngreso: '',
      estado: 'Activo'
    };
  }

  onSubmit(): void {
    const personaFormateada: Persona = {
      ...this.persona,
      fechaNacimiento: this.formatFecha(this.persona.fechaNacimiento),
      fechaIngreso: this.formatFecha(this.persona.fechaIngreso)
    };

    this.personaService.registrarPersona(personaFormateada).subscribe({
      next: () => {
        alert('✅ Persona registrada correctamente');
        this.router.navigate(['/personas-registradas']); // Redirigir al listado
      },
      error: (err) => {
        console.error('❌ Error al registrar persona:', err);
        alert('❌ Error al registrar persona');
      }
    });
  }

  private formatFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
}
