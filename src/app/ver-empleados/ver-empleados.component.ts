import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-empleados.component.html',
  styleUrls: ['./ver-empleados.component.css']
})
export class VerEmpleadosComponent {
  empleados = [
    { numeroEmpleado: 'EMP001', nombreCompleto: 'Juan Pérez', cargo: 'Analista' },
    { numeroEmpleado: 'EMP002', nombreCompleto: 'María López', cargo: 'Contadora' },
    { numeroEmpleado: 'EMP003', nombreCompleto: 'Carlos Torres', cargo: 'Supervisor' }
  ];

  constructor(private router: Router) {}

  goToCrearEmpleado(): void {
    this.router.navigate(['/crear-empleado']);
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }
}
