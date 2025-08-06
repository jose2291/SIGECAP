import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  numeroEmpleado: string | null = null;
  nombreEmpleado: string = 'Cargando...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 1️⃣ Leer número de empleado de la ruta
    this.numeroEmpleado = this.route.snapshot.paramMap.get('numeroEmpleado');

    // 2️⃣ Intentar obtener el nombre desde state
    const nav = this.router.getCurrentNavigation();
    const nombreDesdeState = nav?.extras.state?.['nombreCompleto'];

    if (nombreDesdeState) {
      this.nombreEmpleado = nombreDesdeState;
    } else if (this.numeroEmpleado) {
      // 3️⃣ Si no hay state, buscar en la API
      this.http.get<any>(`https://localhost:7226/api/persona/buscar?criterio=${this.numeroEmpleado}`)
        .subscribe({
          next: (data) => {
            this.nombreEmpleado = `${data.primerNombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`.trim();
          },
          error: () => {
            this.nombreEmpleado = 'Empleado no encontrado';
          }
        });
    }
  }

  volverAUsuarios(): void {
    this.router.navigate(['/usuarios']);
  }
}
