import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-roles.component.html',
  styleUrls: ['./agregar-roles.component.css']
})
export class AgregarRolesComponent {
  empleadoNombre: string = '';
  rolSeleccionado: string = '';
  descripcion: string = '';

  rolesDisponibles = [
    {
      nombre: 'Administrador',
      descripcion: 'Acceso total al sistema: gestión de usuarios, roles, permisos, salones, capacitaciones y reportes.'
    },
    {
      nombre: 'Jefe de Área',
      descripcion: 'Supervisa personal de su área, aprueba capacitaciones, y revisa asistencia del equipo.'
    },
    {
      nombre: 'Usuario Operario',
      descripcion: 'Puede inscribirse en capacitaciones, ver su historial y modificar su perfil.'
    },
    {
      nombre: 'Instructor',
      descripcion: 'Imparte capacitaciones, carga materiales y administra sesiones.'
    },
    {
      nombre: 'Coordinador de Capacitación',
      descripcion: 'Organiza eventos, reserva salones y gestiona instructores y asistentes.'
    },
    {
      nombre: 'Revisor de Asistencia',
      descripcion: 'Revisa y valida listas de asistencia a eventos de capacitación.'
    },
    {
      nombre: 'Gestor de Salones',
      descripcion: 'Administra horarios, disponibilidad y uso de salones.'
    }
  ];

  constructor(private router: Router) {
    const estado = history.state;
    if (estado && estado.empleado && estado.empleado.nombreCompleto) {
      this.empleadoNombre = estado.empleado.nombreCompleto;
    } else {
      this.empleadoNombre = '[Empleado no especificado]';
    }
  }

  onSeleccionRol(): void {
    const rol = this.rolesDisponibles.find(r => r.nombre === this.rolSeleccionado);
    this.descripcion = rol ? rol.descripcion : '';
  }

  guardarRol(): void {
    if (!this.rolSeleccionado) {
      alert('Por favor, selecciona un rol.');
      return;
    }

    alert(`Rol asignado a ${this.empleadoNombre}:\n${this.rolSeleccionado}\n\n${this.descripcion}`);
  }

  irAPermisos(): void {
    this.router.navigate(['/permisos']);
  }

  volverARoles(): void {
    this.router.navigate(['/roles']);
  }
}
