import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent {
  departamento: string = '';
  guardado: boolean = false;

  constructor(private router: Router) {}

  guardar(): void {
    this.guardado = true;
    alert(`✅ Departamento guardado: ${this.departamento}`);
  }

  limpiar(): void {
    this.departamento = '';
    this.guardado = false;
  }

  volver(): void {
    this.router.navigate(['/mantenimiento']);
  }
}
