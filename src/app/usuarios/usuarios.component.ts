import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  empleados: any[] = [];
  private apiUrl = 'https://localhost:7226/api/empleado';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.http.get<any[]>(`${this.apiUrl}/listar`).subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar empleados:', err);
        alert('❌ Error al cargar empleados');
      }
    });
  }

  cambiarEstado(empleado: any): void {
    const nuevoActivo = empleado.estado !== 'Activo';
    const confirmacion = window.confirm(
      `¿Estás seguro que deseas cambiar el estado de ${empleado.nombreCompleto} a ${nuevoActivo ? 'Activo' : 'Inactivo'}?`
    );

    if (!confirmacion) return;

    // Actualización visual inmediata
    const estadoAnterior = empleado.estado;
    empleado.estado = nuevoActivo ? 'Activo' : 'Inactivo';

    // Llamada API para persistir el cambio
    this.http.put(`${this.apiUrl}/cambiar-estado/${empleado.numeroEmpleado}?activo=${nuevoActivo}`, {})
      .subscribe({
        next: () => {
          console.log(`✅ Estado de ${empleado.nombreCompleto} actualizado en BD`);
        },
        error: (err) => {
          console.error('❌ Error al actualizar estado en BD:', err);
          alert('❌ No se pudo actualizar el estado en la base de datos.');
          // Revertir cambio si la API falla
          empleado.estado = estadoAnterior;
        }
      });
  }

  volverAlMenu(): void {
    this.router.navigate(['/menu']);
  }

  irARoles(empleado: any): void {
    this.router.navigate(['/roles', empleado.numeroEmpleado]);
  }

  irAPermisos(empleado: any): void {
    this.router.navigate(['/permisos', empleado.numeroEmpleado]);
  }
}
