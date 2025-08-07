import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  empleados = [
    {
      numeroEmpleado: 'EMP001',
      nombreCompleto: 'Juan Pérez',
      correo: 'juan@ejemplo.com',
      departamento: 'Tecnología',
      cargo: 'Analista',
      estado: 'Activo'
    },
    {
      numeroEmpleado: 'EMP002',
      nombreCompleto: 'María López',
      correo: 'maria@ejemplo.com',
      departamento: 'Finanzas',
      cargo: 'Contadora',
      estado: 'Inactivo'
    },
    {
      numeroEmpleado: 'EMP003',
      nombreCompleto: 'Carlos Torres',
      correo: 'carlos@ejemplo.com',
      departamento: 'RRHH',
      cargo: 'Supervisor',
      estado: 'Activo'
    }
  ];

  constructor(private router: Router) {}

  cambiarEstado(empleado: any): void {
    const confirmacion = window.confirm(
      `¿Estás seguro que deseas cambiar el estado de ${empleado.nombreCompleto}?`
    );

    if (confirmacion) {
      empleado.estado = empleado.estado === 'Activo' ? 'Inactivo' : 'Activo';
    }
  }

  volverAlMenu(): void {
    this.router.navigate(['/menu']);
  }

  irARoles(empleado: any): void {
    this.router.navigate(['/roles', empleado.numeroEmpleado]);
  }
}
