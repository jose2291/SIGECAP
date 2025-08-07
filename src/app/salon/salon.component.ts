import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent {
  salon: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Salón guardado: ${this.salon}`);
  }

  limpiar(): void {
    this.salon = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
