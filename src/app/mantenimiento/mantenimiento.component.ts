import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent {
  constructor(private router: Router) {}

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
