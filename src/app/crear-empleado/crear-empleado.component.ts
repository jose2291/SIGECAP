import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {
  criterioBusqueda: string = '';
  empleadoEncontrado = false;

  empleado = {
    numeroEmpleado: '',
    nombreCompleto: '',
    correo: '',
    departamento: '',
    cargo: '',
    estado: true // true = Activo
  };

  constructor(private router: Router, private http: HttpClient) {}

  buscarEmpleado(): void {
    if (!this.criterioBusqueda.trim()) {
      alert('⚠️ Debes ingresar un número de empleado o DNI.');
      return;
    }

    const url = `https://localhost:7226/api/persona/buscar?criterio=${this.criterioBusqueda}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.empleado = {
          numeroEmpleado: data.numeroEmpleado,
          nombreCompleto: `${data.primerNombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`.trim(),
          correo: data.correo,
          departamento: data.direccionPuesto,
          cargo: data.cargo,
          estado: data.estado === 'Activo'
        };
        this.empleadoEncontrado = true;
      },
      error: () => {
        this.empleadoEncontrado = false;
        alert('⚠️ Empleado no encontrado.');
      }
    });
  }

  registrarEmpleado(): void {
    if (!this.empleadoEncontrado) {
      alert('⚠️ Debes buscar y seleccionar un empleado antes de registrarlo.');
      return;
    }

    const url = `https://localhost:7226/api/empleado/registrar?criterio=${this.criterioBusqueda}`;

    this.http.post(url, {}).subscribe({
      next: () => {
        alert('✅ Empleado registrado correctamente');

        // Limpiar formulario después del registro
        this.criterioBusqueda = '';
        this.empleadoEncontrado = false;
        this.empleado = {
          numeroEmpleado: '',
          nombreCompleto: '',
          correo: '',
          departamento: '',
          cargo: '',
          estado: true
        };

        // Redirigir a ver empleados
        this.router.navigate(['/ver-empleados']);
      },
      error: (err) => {
        console.error('❌ Error al registrar empleado:', err);
        alert('❌ Error al registrar empleado');
      }
    });
  }

  volverALista(): void {
    this.router.navigate(['/ver-empleados']);
  }
}
