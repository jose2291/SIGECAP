import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel-academico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nivel-academico.component.html',
  styleUrls: ['./nivel-academico.component.css']
})
export class NivelAcademicoComponent {
  nivelAcademico: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Nivel Académico guardado: ${this.nivelAcademico}`);
  }

  limpiar(): void {
    this.nivelAcademico = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/personas-registradas']); // O ruta deseada
  }
}
