import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoReunion, TipoReunionService } from '../services/tipo-reunion.service';

@Component({
  selector: 'app-tipo-reunion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-reunion.component.html',
  styleUrls: ['./tipo-reunion.component.css']
})
export class TipoReunionComponent implements OnInit {
  tipos: TipoReunion[] = [];
  nuevoTipo: TipoReunion = { Id: 0, Descripcion: '' };

  editando: boolean = false;

  constructor(private router: Router, private tipoService: TipoReunionService) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos(): void {
    this.tipoService.obtenerTipos().subscribe({
      next: (data) => (this.tipos = data),
      error: (err) => console.error('❌ Error al cargar tipos de reunión:', err)
    });
  }

  guardar(): void {
    if (this.editando && this.nuevoTipo.Id) {
      // Actualizar tipo existente
      this.tipoService.actualizarTipo(this.nuevoTipo.Id, this.nuevoTipo).subscribe({
        next: () => {
          this.cargarTipos();
          this.limpiar();
          alert('✏️ Tipo de reunión actualizado');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      // Crear nuevo tipo
      this.tipoService.crearTipo(this.nuevoTipo).subscribe({
        next: (tipoGuardado) => {
          this.tipos.push(tipoGuardado);
          this.limpiar();
          alert('✅ Tipo de reunión guardado');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  editar(tipo: TipoReunion): void {
    this.nuevoTipo = { ...tipo };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este tipo de reunión?')) {
      this.tipoService.eliminarTipo(id).subscribe({
        next: () => {
          this.tipos = this.tipos.filter((t) => t.Id !== id);
          alert('🗑️ Tipo de reunión eliminado');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {
    this.nuevoTipo = { Descripcion: '' } as TipoReunion;

    this.editando = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
