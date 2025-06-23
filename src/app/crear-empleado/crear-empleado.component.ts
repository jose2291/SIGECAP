import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {
  numeroEmpleado: string = '';
  empleadoEncontrado = false;

  empleado = {
    nombre: '',
    correo: '',
    departamento: '',
    cargo: '',
    activo: true
  };

  constructor(private router: Router) {}

  buscarEmpleado(): void {
    if (this.numeroEmpleado === 'EMP001') {
      this.empleado = {
        nombre: 'Juan Pérez',
        correo: 'juan@ejemplo.com',
        departamento: 'TI',
        cargo: 'Analista',
        activo: true
      };
      this.empleadoEncontrado = true;
    } else {
      this.empleadoEncontrado = false;
      alert('Empleado no encontrado');
    }
  }

  registrarOperario(): void {
    alert('Operario registrado (simulado)');
  }

  volverALista(): void {
    this.router.navigate(['/ver-empleados']);
  }
}
