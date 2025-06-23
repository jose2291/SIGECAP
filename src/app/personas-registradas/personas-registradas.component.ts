import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas-registradas',
  templateUrl: './personas-registradas.component.html',
  styleUrls: ['./personas-registradas.component.css']
})
export class PersonasRegistradasComponent {
  constructor(private router: Router) {}

  goToRegistro(): void {
    this.router.navigate(['/registro-personas']);
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }
}
