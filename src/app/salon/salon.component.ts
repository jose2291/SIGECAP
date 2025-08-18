import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Salon, SalonService } from '../services/salon.service';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {
  salones: Salon[] = [];
  nuevoSalon: Salon = { nombre: '' };
  editando: boolean = false;

  constructor(private router: Router, private salonService: SalonService) {}

  ngOnInit(): void {
    this.cargarSalones();
  }

  cargarSalones(): void {
    this.salonService.obtenerSalones().subscribe({
      next: (data) => (this.salones = data),
      error: (err) => console.error('❌ Error al cargar salones:', err)
    });
  }

  guardar(): void {
    if (this.editando && this.nuevoSalon.id) {
      // Actualizar salón existente
      this.salonService.actualizarSalon(this.nuevoSalon.id, this.nuevoSalon).subscribe({
        next: () => {
          this.cargarSalones();
          this.limpiar();
          alert('✏️ Salón actualizado');
        },
        error: (err) => console.error('❌ Error al actualizar:', err)
      });
    } else {
      // Crear nuevo salón
      this.salonService.crearSalon(this.nuevoSalon).subscribe({
        next: (salonGuardado) => {
          this.salones.push(salonGuardado);
          this.limpiar();
          alert('✅ Salón guardado');
        },
        error: (err) => console.error('❌ Error al guardar:', err)
      });
    }
  }

  editar(salon: Salon): void {
    this.nuevoSalon = { ...salon };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este salón?')) {
      this.salonService.eliminarSalon(id).subscribe({
        next: () => {
          this.salones = this.salones.filter((s) => s.id !== id);
          alert('🗑️ Salón eliminado');
        },
        error: (err) => console.error('❌ Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {
    this.nuevoSalon = { nombre: '' };
    this.editando = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
