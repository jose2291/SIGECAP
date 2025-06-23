import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-personas',
  standalone: true,
  imports: [],
  templateUrl: './registro-personas.component.html',
  styleUrl: './registro-personas.component.css'
})
export class RegistroPersonasComponent {
constructor(private router: Router) {}

  volverAlMenu() {
    this.router.navigate(['/personas-registradas']);
  }
}
