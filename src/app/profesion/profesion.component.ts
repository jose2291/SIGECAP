import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesion, ProfesionService } from '../services/profesion.service';

@Component({
  selector: 'app-profesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css']
})
export class ProfesionComponent implements OnInit {
  profesiones: Profesion[] = [];
  nuevaProfesion: Profesion = { descripcion: '' };
  editando: boolean = false;

  constructor(private router: Router, private profesionService: ProfesionService) {}

  ngOnInit(): void {
    this.cargarProfesiones();
  }

  cargarProfesiones(): void {
    this.profesionService.obtenerProfesiones().subscribe({
      next: (data) => (this.profesiones = data),
      error: (err) => console.error('❌ Error al cargar profesiones:', err)
    });
  }

  guardar(): void {
    if (this.editando && this.nuevaProfesion.id) {
      // Actualizar profesión existente
      this.profesionService.actualizarProfesion(this.nuevaProfesion.id, this.nuevaProfesion).subscribe({
        next: () => {
          this.cargarProfesiones();
          this.limpiar();
          alert('✏️ Profesión actualizada');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      // Crear nueva profesión
      this.profesionService.crearProfesion(this.nuevaProfesion).subscribe({
        next: (profesionGuardada) => {
          this.profesiones.push(profesionGuardada);
          this.limpiar();
          alert('✅ Profesión guardada');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  editar(profesion: Profesion): void {
    this.nuevaProfesion = { ...profesion };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta profesión?')) {
      this.profesionService.eliminarProfesion(id).subscribe({
        next: () => {
          this.profesiones = this.profesiones.filter((p) => p.id !== id);
          alert('🗑️ Profesión eliminada');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {
    this.nuevaProfesion = { descripcion: '' };
    this.editando = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
