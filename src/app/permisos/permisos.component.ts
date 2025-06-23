import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent {
  areas = [
    {
      nombre: 'Registro de Personas',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    },
    {
      nombre: 'Reservar Salón',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    },
    {
      nombre: 'Nueva Capacitación',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    },
    {
      nombre: 'Crear Operario',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    },
    {
      nombre: 'Roles y Permisos',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    },
    {
      nombre: 'Usuarios',
      ver: true,
      crear: true,
      editar: true,
      eliminar: true
    }
  ];

  constructor(private router: Router) {}

  guardarPermisos(): void {
    alert('Permisos guardados correctamente.');
  }

  volver(): void {
    this.router.navigate(['/roles']);
  }
}
