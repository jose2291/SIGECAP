import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  cargando = false;

  private apiUrl = 'https://localhost:7226/api/login'; // 👉 Ajusta según tu backend

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      alert('⚠️ Correo y contraseña son obligatorios');
      return;
    }

    this.cargando = true;

    this.http.post<any>(this.apiUrl, {
      correo: this.email,
      contrasena: this.password
    }).subscribe({
      next: (resp) => {
        this.cargando = false;
        alert(resp.mensaje);

        // ✅ Guardar usuario en localStorage (opcional)
        localStorage.setItem('usuario', JSON.stringify(resp));

        // 👉 Redirigir al menú principal
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        this.cargando = false;
        console.error('❌ Error en login:', err);
        if (err.error?.mensaje) {
          alert(err.error.mensaje);
        } else {
          alert('⚠️ Error al intentar iniciar sesión');
        }
      }
    });
  }
}
