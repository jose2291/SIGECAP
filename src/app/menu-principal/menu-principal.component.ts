import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  submenuOpen = false;

  constructor(private router: Router) {}

  toggleSubmenu(): void {
    this.submenuOpen = !this.submenuOpen;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
