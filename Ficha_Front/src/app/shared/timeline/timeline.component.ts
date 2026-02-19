import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  postulacion: any;//CAmbiar tipo Doc
  @Input() titleHito: string = 'Solicitud enviada'; // Nombre del hito del timeline
  @Input() responsable: string = 'COMISION DE SANIDAD'; // responsable de la acción
  @Input() estado: string = 'is-done';  // is-done = verde, is-cancel = rojo, is-pending = gris
  @Input() txtFecha: string = 'Recibida el 15/2/2024 a las 15:05'; // debe traer la la fecha y hora de la acción
  @Input() motivo: string = 'No cumple requisitos'; //si la acción anulación o rechazo, debe traer el motivo de esas acciones
  @Input() fechaPostulacion: Date = new Date('11/11/1111'); //si la acción anulación o rechazo, debe traer el motivo de esas acciones

}
