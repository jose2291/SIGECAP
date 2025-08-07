import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css']
})
export class ProfesionComponent {
  profesion: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Profesión guardada: ${this.profesion}`);
  }

  limpiar(): void {
    this.profesion = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}




