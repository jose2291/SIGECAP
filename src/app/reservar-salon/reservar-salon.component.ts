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
  salones: string[] = ['Salón 1', 'Salón 2', 'Salón 3', 'Salón 4', 'Salón 5', 'Salón 6'];
  accesoriosDisponibles: string[] = ['Data Show', 'Pizarra', 'Marcadores', 'Papel', 'Micrófono', 'Parlante', 'Lápices', 'Laptop'];

  mostrarFormulario = false;
  mostrarSelectorAccesorios = false;

  reservas: any[] = [];

  nuevaReserva: any = {
    reservadoPor: '',
    recursiva: 'No',
    fechaUnica: '',
    fechaTemporal: '',
    fechas: [],
    horaDesde: '',
    horaHasta: '',
    salon: '',
    tipo: '',
    accesoriosSeleccionados: {}
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
    this.mostrarSelectorAccesorios = false;
    this.nuevaReserva = {
      reservadoPor: '',
      recursiva: 'No',
      fechaUnica: '',
      fechaTemporal: '',
      fechas: [],
      horaDesde: '',
      horaHasta: '',
      salon: '',
      tipo: '',
      accesoriosSeleccionados: {}
    };
  }

  agregarFecha(): void {
    if (this.nuevaReserva.fechaTemporal) {
      this.nuevaReserva.fechas.push(this.nuevaReserva.fechaTemporal);
      this.nuevaReserva.fechaTemporal = '';
    }
  }

  crearReserva(): void {
    const datosReserva = {
      ...this.nuevaReserva,
      accesorios: Object.keys(this.nuevaReserva.accesoriosSeleccionados)
        .filter(k => this.nuevaReserva.accesoriosSeleccionados[k])
    };

    if (datosReserva.salon && (datosReserva.fechaUnica || datosReserva.fechas.length > 0)) {
      this.reservas.push(datosReserva);
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
