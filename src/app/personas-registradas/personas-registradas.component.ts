import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonaService, Persona } from '../services/persona.service';

@Component({
  selector: 'app-personas-registradas',
  standalone: true,
  imports: [CommonModule], // ← ¡IMPORTANTE!
  templateUrl: './personas-registradas.component.html',
  styleUrls: ['./personas-registradas.component.css']
})
export class PersonasRegistradasComponent {
  personas: Persona[] = [];

  constructor(
    private router: Router,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaService.obtenerPersonas().subscribe({
      next: (data) => this.personas = data,
      error: (err) => console.error('Error cargando personas:', err)
    });
  }
formatFechaVista(fecha: string): string {
  if (!fecha) return '';

  // Cortar en la T si viene con hora
  const soloFecha = fecha.split('T')[0];

  const [year, month, day] = soloFecha.split('-');
  return `${day}/${month}/${year}`;
}
  goToRegistro(): void {
    this.router.navigate(['/registro-personas']);
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }
}
