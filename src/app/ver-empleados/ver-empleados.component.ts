import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoService, Empleado } from '../services/empleado.service';

@Component({
  selector: 'app-ver-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './ver-empleados.component.html',
  styleUrls: ['./ver-empleados.component.css']
})
export class VerEmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(private router: Router, private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar empleados:', err);
        alert('❌ Error al cargar empleados');
      }
    });
  }

  goToCrearEmpleado(): void {
    this.router.navigate(['/crear-empleado']);
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }
}
