import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitucionService } from '../services/institucion.service';

export interface Institucion {
  id?: number;
  nombre: string;
}

@Component({
  selector: 'app-institucion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {
  instituciones: Institucion[] = [];
  nuevaInstitucion: Institucion = { nombre: '' };
  editando = false;
  cargando = false;

  constructor(private router: Router, private instService: InstitucionService) {}

  ngOnInit(): void {
    this.cargarInstituciones();
  }

  // 🔹 Cargar todas
  cargarInstituciones(): void {
    this.cargando = true;
    this.instService.getAll().subscribe({
      next: (data) => {
        this.instituciones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar instituciones:', err);
        this.cargando = false;
        alert('⚠️ Error al cargar instituciones');
      }
    });
  }

  // 🔹 Guardar o actualizar
  guardar(): void {
    if (!this.nuevaInstitucion.nombre.trim()) {
      alert('⚠️ El nombre de la institución es obligatorio');
      return;
    }

    if (this.editando && this.nuevaInstitucion.id) {
      // ✏️ Actualizar
      this.instService.update(this.nuevaInstitucion.id, this.nuevaInstitucion).subscribe({
        next: () => {
          this.cargarInstituciones();
          this.limpiar();
          alert('✏️ Institución actualizada correctamente');
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          alert('⚠️ Error al actualizar la institución');
        }
      });
    } else {
      // ✅ Crear
      this.instService.create(this.nuevaInstitucion).subscribe({
        next: (instGuardada) => {
          this.instituciones.push(instGuardada);
          this.limpiar();
          alert('✅ Institución guardada correctamente');
        },
        error: (err) => {
          console.error('❌ Error al guardar:', err);
          alert('⚠️ Error al guardar la institución');
        }
      });
    }
  }

  // 🔹 Editar
  editar(inst: Institucion): void {
    this.nuevaInstitucion = { ...inst };
    this.editando = true;
  }

  // 🔹 Eliminar
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta institución?')) {
      this.instService.delete(id).subscribe({
        next: () => {
          this.instituciones = this.instituciones.filter((i) => i.id !== id);
          alert('🗑️ Institución eliminada correctamente');
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          alert('⚠️ Error al eliminar la institución');
        }
      });
    }
  }

  // 🔹 Limpiar formulario
  limpiar(): void {
    this.nuevaInstitucion = { nombre: '' };
    this.editando = false;
  }

  // 🔹 Volver al menú
  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
