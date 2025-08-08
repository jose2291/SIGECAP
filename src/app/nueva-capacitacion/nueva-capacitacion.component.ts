import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Capacitacion {
  nombre: string;
  modalidad: string;
  institucion: string;
  facilitador: string;
  coordinador: string;
  fechaHora: string;  // ISO string de datetime-local
  duracion: number;   // horas
  salon: string;
  participantes: number;
  observaciones: string;
}

@Component({
  selector: 'app-nueva-capacitacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-capacitacion.component.html',
  styleUrls: ['./nueva-capacitacion.component.css']
})
export class NuevaCapacitacionComponent {
  mostrarFormulario = false;

  capacitacion: Capacitacion = {
    nombre: '',
    modalidad: '',
    institucion: '',
    facilitador: '',
    coordinador: '',
    fechaHora: '',
    duracion: 1,
    salon: '',
    participantes: 0,
    observaciones: ''
  };

  capacitaciones: Capacitacion[] = [];

  modalidades = ['Presencial', 'Virtual', 'Mixta'];
  salones = ['Salón 1', 'Salón 2', 'Salón 3', 'Salón 4', 'Salón 5', 'Salón 6'];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/menu']);
  }

  mostrarSubpagina(): void {
    this.mostrarFormulario = true;
  }

  cerrarSubpagina(): void {
    this.mostrarFormulario = false;
    this.capacitacion = {
      nombre : '',
      modalidad: '',
      institucion: '',
      facilitador: '',
      coordinador: '',
      fechaHora: '',
      duracion: 1,
      salon: '',
      participantes: 0,
      observaciones: ''
    };
  }

  guardarCapacitacion(): void {
    // Opcional: validación rápida
    // if (!this.capacitacion.nombre || !this.capacitacion.modalidad || !this.capacitacion.facilitador) return;

    this.capacitaciones.push({ ...this.capacitacion });
    this.cerrarSubpagina();
  }
}
