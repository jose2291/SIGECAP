import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Direccion, DireccionService } from '../services/direccion.service';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  direcciones: Direccion[] = [];
  nuevaDireccion: Direccion = { descripcion: '' };
  editando: boolean = false;

  constructor(private router: Router, private direccionService: DireccionService) {}

  ngOnInit(): void {
    this.cargarDirecciones();
  }

  cargarDirecciones(): void {
    this.direccionService.obtenerDirecciones().subscribe({
      next: (data) => (this.direcciones = data),
      error: (err) => console.error('❌ Error al cargar direcciones:', err)
    });
  }

  guardar(): void {
    if (this.editando && this.nuevaDireccion.id) {
      // Actualizar dirección
      this.direccionService.actualizarDireccion(this.nuevaDireccion.id, this.nuevaDireccion).subscribe({
        next: () => {
          this.cargarDirecciones();
          this.limpiar();
          alert('✏️ Dirección actualizada');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      // Crear dirección
      this.direccionService.crearDireccion(this.nuevaDireccion).subscribe({
        next: (direccionGuardada) => {
          this.direcciones.push(direccionGuardada);
          this.limpiar();
          alert('✅ Dirección guardada');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  editar(direccion: Direccion): void {
    this.nuevaDireccion = { ...direccion };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta dirección?')) {
      this.direccionService.eliminarDireccion(id).subscribe({
        next: () => {
          this.direcciones = this.direcciones.filter((d) => d.id !== id);
          alert('🗑️ Dirección eliminada');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {
    this.nuevaDireccion = { descripcion: '' };
    this.editando = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
