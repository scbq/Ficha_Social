import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {

  @Input() text: string = '';
  @Input() iconName: string = '';
  @Input() tipo: string = 'IFA'; // IFA: Icono Librería FontAwesome   IL: Icono Letra creado para portal   ISVG: Icono SVG creado para Portal
  @Input() letraIconIP: string = ''; // Utilizar para iconos sean una letra con Inicial ej: M
  @Input() bgColor: string = ''; // Color de Background para el icono IL e ISVG
  @Input() iconColor: string = ''; // Color para Icono IB o ISVG
  // @Input() align : string = ''; // Color para Icono IB o ISVG
  @Input() typeTooltip: string = '';

  // @Input() alignTooltip : string = this.align;


}
