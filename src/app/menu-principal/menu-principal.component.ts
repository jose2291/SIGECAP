// menu-principal.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- CommonModule habilita ngClass
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
  submenuOpen = false;
  constructor(private router: Router) {}
  toggleSubmenu(){ this.submenuOpen = !this.submenuOpen; }
  navigateTo(p: string){ this.router.navigate([p]); }
  logout(){ this.router.navigate(['/login']); }
}

