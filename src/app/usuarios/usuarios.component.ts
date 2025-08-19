import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmpleadoService, Empleado } from '../services/empleado.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  empleados: Empleado[] = [];
  cargando = false;

  constructor(private router: Router, private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar empleados:', err);
        this.cargando = false;
        alert('⚠️ No se pudieron cargar los empleados');
      }
    });
  }

  cambiarEstado(empleado: Empleado): void {
    const confirmacion = window.confirm(
      `¿Estás seguro que deseas cambiar el estado de ${empleado.nombreCompleto}?`
    );

    if (confirmacion) {
      const nuevoEstado = !empleado.activo;
      this.empleadoService.cambiarEstado(empleado.numeroEmpleado, nuevoEstado).subscribe({
        next: (resp) => {
          empleado.activo = nuevoEstado;
          empleado.estado = nuevoEstado ? 'Activo' : 'Inactivo';
          alert(resp.mensaje);
        },
        error: (err) => {
          console.error('❌ Error al cambiar estado:', err);
          alert('⚠️ No se pudo cambiar el estado');
        }
      });
    }
  }

  volverAlMenu(): void {
    this.router.navigate(['/menu']);
  }

  irARoles(empleado: Empleado): void {
    this.router.navigate(['/roles', empleado.numeroEmpleado]);
  }
}
