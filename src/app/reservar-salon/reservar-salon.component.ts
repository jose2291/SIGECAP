import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservarSalonService } from '../services/reservar-salon.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-reservar-salon',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './reservar-salon.component.html',
  styleUrls: ['./reservar-salon.component.css']
})
export class ReservarSalonComponent implements OnInit, OnDestroy {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  salones: string[] = ['Salón 1', 'Salón 2', 'Salón 3', 'Salón 4', 'Salón 5', 'Salón 6'];
  accesoriosDisponibles: string[] = ['Data Show', 'Pizarra', 'Marcadores', 'Papel', 'Micrófono', 'Parlante', 'Lápices', 'Laptop'];

  mostrarFormulario = false;
  mostrarSelectorAccesorios = false;

  fechaHoraActual: string = '';
  intervalId: any;

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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: [],
    locale: 'es',
  buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día'
  }
};

  constructor(private router: Router, private reservaService: ReservarSalonService) {}

  ngOnInit(): void {
    this.actualizarFechaHora();
    this.intervalId = setInterval(() => this.actualizarFechaHora(), 1000);
    this.cargarReservas();
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
    const reservaDTO = {
      reservadoPor: this.nuevaReserva.reservadoPor,
      recursiva: this.nuevaReserva.recursiva === 'Sí',
      fechas: this.nuevaReserva.recursiva === 'Sí' ? this.nuevaReserva.fechas : [this.nuevaReserva.fechaUnica],
      horaDesde: this.nuevaReserva.horaDesde,
      horaHasta: this.nuevaReserva.horaHasta,
      salon: this.nuevaReserva.salon,
      tipo: this.nuevaReserva.tipo,
      accesorios: Object.keys(this.nuevaReserva.accesoriosSeleccionados)
        .filter(k => this.nuevaReserva.accesoriosSeleccionados[k])
    };

    this.reservaService.crearReserva(reservaDTO).subscribe({
      next: () => {
        this.cerrarSubpagina();
        this.cargarReservas(); // Refrescar el calendario
      },
      error: err => console.error('Error al crear la reserva:', err)
    });
  }

 cargarReservas(): void {
  this.reservaService.obtenerReservas().subscribe((reservas: any[]) => {
    this.calendarOptions.events = reservas.flatMap(reserva =>
      reserva.recursiva
        ? reserva.fechas.map((fecha: string) => {
            const fechaLimpia = fecha.split('T')[0]; // ✅ elimina la hora
            return {
              title: `${reserva.tipo} - ${reserva.salon}`,
              start: `${fechaLimpia}T${reserva.horaDesde}`,
              end: `${fechaLimpia}T${reserva.horaHasta}`,
              extendedProps: { reservadoPor: reserva.reservadoPor }
            };
          })
        : reserva.fechaUnica
        ? [{
            title: `${reserva.tipo} - ${reserva.salon}`,
            start: `${reserva.fechaUnica.split('T')[0]}T${reserva.horaDesde}`,
            end: `${reserva.fechaUnica.split('T')[0]}T${reserva.horaHasta}`,
            extendedProps: { reservadoPor: reserva.reservadoPor }
          }]
        : []
    );
  });
}

}
