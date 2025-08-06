import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RecaptchaModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  correo = '';
  contrasenaActual = '';
  nuevaContrasena = '';
  captchaValido = false;
  error = '';
  mensaje = '';

  private apiUrl = 'https://localhost:7226/api/contrasena/recuperar';

  constructor(private http: HttpClient) {}

  onCaptchaResolved(response: string | null): void {
    this.captchaValido = !!response;
  }

  validarContrasena(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  }

  onSubmit(): void {
    this.error = '';
    this.mensaje = '';

    if (!this.validarContrasena(this.nuevaContrasena)) {
      this.error = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.';
      return;
    }

  

    const body = {
      correo: this.correo,
      contrasenaActual: this.contrasenaActual,
      nuevaContrasena: this.nuevaContrasena
    };

    this.http.post<any>(this.apiUrl, body).subscribe({
      next: (resp) => {
        this.mensaje = resp.mensaje || '✅ Contraseña actualizada correctamente.';
        this.correo = '';
        this.contrasenaActual = '';
        this.nuevaContrasena = '';
        this.captchaValido = false;
      },
      error: (err) => {
        this.error = err.error?.mensaje || '❌ Error al actualizar la contraseña.';
      }
    });
  }
}
