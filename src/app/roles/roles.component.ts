import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  empleados = [
    {
      numeroEmpleado: 'EMP001',
      nombreCompleto: 'Juan Pérez',
      correo: 'juan@ejemplo.com',
      departamento: 'Tecnología',
      cargo: 'Analista'
    },
    {
      numeroEmpleado: 'EMP002',
      nombreCompleto: 'María López',
      correo: 'maria@ejemplo.com',
      departamento: 'Finanzas',
      cargo: 'Contadora'
    },
    {
      numeroEmpleado: 'EMP003',
      nombreCompleto: 'Carlos Torres',
      correo: 'carlos@ejemplo.com',
      departamento: 'RRHH',
      cargo: 'Supervisor'
    }
  ];

  constructor(private router: Router) {}

  agregarRol(empleado: any): void {
    // ✅ Enviamos el empleado a agregar-roles usando history.state
    this.router.navigate(['/agregar-roles'], { state: { empleado } });
  }

  agregarPermiso(empleado: any): void {
    // Si luego quieres enviar el empleado a permisos, se puede hacer igual
    this.router.navigate(['/permisos']);
  }

  volver(): void {
  this.router.navigate(['/menu']);
}

}
