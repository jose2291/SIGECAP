import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-capacitacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-capacitacion.component.html',
  styleUrls: ['./nueva-capacitacion.component.css']
})
export class NuevaCapacitacionComponent {
  mostrarFormulario = false;

  capacitacion = {
    nombre: '',
    modalidad: '',
    facilitador: '',
    fechaHora: '',
    duracion: '',
    salon: '',
    participantes: 0,
    observaciones: ''
  };

  capacitaciones: any[] = [];

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
      nombre: '',
      modalidad: '',
      facilitador: '',
      fechaHora: '',
      duracion: '',
      salon: '',
      participantes: 0,
      observaciones: ''
    };
  }

  guardarCapacitacion(): void {
    this.capacitaciones.push({ ...this.capacitacion });
    this.cerrarSubpagina();
  }
}
