import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Importa RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule], // ✅ agrega RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  mensajeError = '';

  private apiUrl = 'https://localhost:7226/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.mensajeError = '⚠️ Debes ingresar correo y contraseña';
      return;
    }

    const body = {
      correo: this.email,
      contrasena: this.password
    };

    this.http.post<any>(this.apiUrl, body).subscribe({
      next: (resp) => {
        alert(resp.mensaje);
        this.router.navigate(['/menu']); // ✅ Redirige al menú principal
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || '❌ Error al iniciar sesión';
      }
    });
  }
}
