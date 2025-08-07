import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent {
  direccion: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Dirección guardada: ${this.direccion}`);
  }

  limpiar(): void {
    this.direccion = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
