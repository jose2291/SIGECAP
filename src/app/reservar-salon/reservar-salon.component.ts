import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservar-salon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-salon.component.html',
  styleUrls: ['./reservar-salon.component.css']
})
export class ReservarSalonComponent implements OnInit, OnDestroy {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  horas: string[] = [
    '07:30', '08:30', '09:30', '10:30', '11:30',
    '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'
  ];
  salones: string[] = ['Salón 1', 'Salón 2', 'Salón 3', 'Salón 4', 'Salón 5', 'Salón 6'];

  mostrarFormulario = false;
  reservas: any[] = [];

  nuevaReserva = {
    salon: '',
    dia: '',
    hora: '',
    tipo: ''
  };

  fechaHoraActual: string = '';
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarFechaHora();
    this.intervalId = setInterval(() => this.actualizarFechaHora(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  actualizarFechaHora(): void {
    const ahora = new Date();
    this.fechaHoraActual = ahora.toLocaleString();
  }

  volver(): void {
    this.router.navigate(['/menu']);
  }

  mostrarSubpaginaReserva(): void {
    this.mostrarFormulario = true;
  }

  cerrarSubpagina(): void {
    this.mostrarFormulario = false;
    this.nuevaReserva = { salon: '', dia: '', hora: '', tipo: '' };
  }

  crearReserva(): void {
    if (this.nuevaReserva.salon && this.nuevaReserva.dia && this.nuevaReserva.hora && this.nuevaReserva.tipo) {
      this.reservas.push({ ...this.nuevaReserva });
      this.cerrarSubpagina();
    }
  }

  obtenerReserva(dia: string, hora: string): string {
    const reserva = this.reservas.find(r => r.dia === dia && r.hora === hora);
    return reserva ? `${reserva.salon}` : '';
  }

  getClaseReserva(dia: string, hora: string): string {
    const reserva = this.reservas.find(r => r.dia === dia && r.hora === hora);
    if (!reserva) return '';
    if (reserva.tipo === 'formacion') return 'formacion';
    if (reserva.tipo === 'reunion') return 'reunion';
    return 'otro';
  }
}
