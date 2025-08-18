import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo, CargoService } from '../services/cargo.service';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  cargos: Cargo[] = [];
  nuevoCargo: Cargo = { descripcion: '' }; // 👉 corregido: usamos descripcion
  editando: boolean = false;

  constructor(private router: Router, private cargoService: CargoService) {}

  ngOnInit(): void {
    this.cargarCargos();
  }

  // Cargar lista de cargos
  cargarCargos(): void {
    this.cargoService.obtenerCargos().subscribe({
      next: (data) => (this.cargos = data),
      error: (err) => console.error('❌ Error al cargar cargos:', err)
    });
  }

  // Guardar o actualizar
  guardar(): void {
    if (this.editando && this.nuevoCargo.id) {
      this.cargoService.actualizarCargo(this.nuevoCargo.id, this.nuevoCargo).subscribe({
        next: () => {
          this.cargarCargos();
          this.limpiar();
          alert('✏️ Cargo actualizado');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      this.cargoService.crearCargo(this.nuevoCargo).subscribe({
        next: (cargoGuardado) => {
          this.cargos.push(cargoGuardado);
          this.limpiar();
          alert('✅ Cargo guardado');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  // Editar un cargo
  editar(cargo: Cargo): void {
    this.nuevoCargo = { ...cargo };
    this.editando = true;
  }

  // Eliminar un cargo
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este cargo?')) {
      this.cargoService.eliminarCargo(id).subscribe({
        next: () => {
          this.cargos = this.cargos.filter((c) => c.id !== id);
          alert('🗑️ Cargo eliminado');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  // Limpiar formulario
  limpiar(): void {
    this.nuevoCargo = { descripcion: '' }; // 👉 corregido
    this.editando = false;
  }

  // Volver al menú mantenimiento
  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
