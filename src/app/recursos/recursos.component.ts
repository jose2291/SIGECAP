import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recurso, RecursoService } from '../services/recurso.service';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursoComponent implements OnInit {
  recursos: Recurso[] = [];
  nuevoRecurso: Recurso = { nombre: '' };
  editando = false;
  cargando = false; // ⏳ indicador de carga

  constructor(private router: Router, private recService: RecursoService) {}

  ngOnInit(): void {
    this.cargarRecursos();
  }

  // 🔹 Cargar todos los recursos
  cargarRecursos(): void {
    this.cargando = true;
    this.recService.obtenerRecursos().subscribe({
      next: (data) => {
        this.recursos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar recursos:', err);
        this.cargando = false;
        alert('⚠️ Error al cargar recursos');
      }
    });
  }

  // 🔹 Guardar o actualizar un recurso
  guardar(): void {
    if (!this.nuevoRecurso.nombre.trim()) {
      alert('⚠️ El nombre del recurso es obligatorio');
      return;
    }

    if (this.editando && this.nuevoRecurso.id) {
      // ✏️ Actualizar
      this.recService.actualizarRecurso(this.nuevoRecurso.id, this.nuevoRecurso).subscribe({
        next: () => {
          this.cargarRecursos();
          this.limpiar();
          alert('✏️ Recurso actualizado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          alert('⚠️ Error al actualizar el recurso');
        }
      });
    } else {
      // ✅ Crear
      this.recService.crearRecurso(this.nuevoRecurso).subscribe({
        next: (recGuardado) => {
          this.recursos.push(recGuardado);
          this.limpiar();
          alert('✅ Recurso guardado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al guardar:', err);
          alert('⚠️ Error al guardar el recurso');
        }
      });
    }
  }

  // 🔹 Cargar recurso en modo edición
  editar(rec: Recurso): void {
    this.nuevoRecurso = { ...rec };
    this.editando = true;
  }

  // 🔹 Eliminar recurso
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este recurso?')) {
      this.recService.eliminarRecurso(id).subscribe({
        next: () => {
          this.recursos = this.recursos.filter((r) => r.id !== id);
          alert('🗑️ Recurso eliminado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          alert('⚠️ Error al eliminar el recurso');
        }
      });
    }
  }

  // 🔹 Limpiar formulario
  limpiar(): void {
    this.nuevoRecurso = { nombre: '' };
    this.editando = false;
  }

  // 🔹 Volver al menú principal
  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
