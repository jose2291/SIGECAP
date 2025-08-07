import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-reunion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-reunion.component.html',
  styleUrls: ['./tipo-reunion.component.css']
})
export class TipoReunionComponent {
  tipoReunion: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Tipo de reunión guardado: ${this.tipoReunion}`);
  }

  limpiar(): void {
    this.tipoReunion = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
