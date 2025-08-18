import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Departamento, DepartamentoService } from '../services/departamento.service';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  nuevoDepartamento: Departamento = { nombre: '' };
  editando = false;
  cargando = false; // ⏳ indicador de carga

  constructor(private router: Router, private depService: DepartamentoService) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  // 🔹 Cargar todos los departamentos
  cargarDepartamentos(): void {
    this.cargando = true;
    this.depService.obtenerDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar departamentos:', err);
        this.cargando = false;
        alert('⚠️ Error al cargar departamentos');
      }
    });
  }

  // 🔹 Guardar o actualizar un departamento
  guardar(): void {
    if (!this.nuevoDepartamento.nombre.trim()) {
      alert('⚠️ El nombre del departamento es obligatorio');
      return;
    }

    if (this.editando && this.nuevoDepartamento.id) {
      // ✏️ Actualizar
      this.depService.actualizarDepartamento(this.nuevoDepartamento.id, this.nuevoDepartamento).subscribe({
        next: () => {
          this.cargarDepartamentos();
          this.limpiar();
          alert('✏️ Departamento actualizado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          alert('⚠️ Error al actualizar el departamento');
        }
      });
    } else {
      // ✅ Crear
      this.depService.crearDepartamento(this.nuevoDepartamento).subscribe({
        next: (depGuardado) => {
          this.departamentos.push(depGuardado);
          this.limpiar();
          alert('✅ Departamento guardado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al guardar:', err);
          alert('⚠️ Error al guardar el departamento');
        }
      });
    }
  }

  // 🔹 Cargar departamento en modo edición
  editar(dep: Departamento): void {
    this.nuevoDepartamento = { ...dep };
    this.editando = true;
  }

  // 🔹 Eliminar departamento
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este departamento?')) {
      this.depService.eliminarDepartamento(id).subscribe({
        next: () => {
          this.departamentos = this.departamentos.filter((d) => d.id !== id);
          alert('🗑️ Departamento eliminado correctamente');
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          alert('⚠️ Error al eliminar el departamento');
        }
      });
    }
  }

  // 🔹 Limpiar formulario
  limpiar(): void {
    this.nuevoDepartamento = { nombre: '' };
    this.editando = false;
  }

  // 🔹 Volver al menú principal
  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
