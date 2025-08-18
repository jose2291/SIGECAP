import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NivelAcademico, NivelAcademicoService } from '../services/nivel-academico.service';

@Component({
  selector: 'app-nivel-academico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nivel-academico.component.html',
  styleUrls: ['./nivel-academico.component.css']
})
export class NivelAcademicoComponent implements OnInit {
  niveles: NivelAcademico[] = [];
  nuevoNivel: NivelAcademico = { descripcion: '' };
  editando: boolean = false;

  constructor(private router: Router, private nivelService: NivelAcademicoService) {}

  ngOnInit(): void {
    this.cargarNiveles();
  }

  cargarNiveles(): void {
    this.nivelService.obtenerNiveles().subscribe({
      next: (data) => (this.niveles = data),
      error: (err) => console.error('❌ Error al cargar niveles:', err)
    });
  }

  guardar(): void {
    if (this.editando && this.nuevoNivel.id) {
      // Actualizar nivel existente
      this.nivelService.actualizarNivel(this.nuevoNivel.id, this.nuevoNivel).subscribe({
        next: () => {
          this.cargarNiveles();
          this.limpiar();
          alert('✏️ Nivel Académico actualizado');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      // Crear nuevo nivel
      this.nivelService.crearNivel(this.nuevoNivel).subscribe({
        next: (nivelGuardado) => {
          this.niveles.push(nivelGuardado);
          this.limpiar();
          alert('✅ Nivel Académico guardado');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  editar(nivel: NivelAcademico): void {
    this.nuevoNivel = { ...nivel };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este nivel académico?')) {
      this.nivelService.eliminarNivel(id).subscribe({
        next: () => {
          this.niveles = this.niveles.filter((n) => n.id !== id);
          alert('🗑️ Nivel Académico eliminado');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {
    this.nuevoNivel = { descripcion: '' };
    this.editando = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
