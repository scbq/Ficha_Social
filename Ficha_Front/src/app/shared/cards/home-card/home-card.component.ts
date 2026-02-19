import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-home-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {

  @Input() titleCard: string = '';
  @Input() descripcion: string = '';
  @Input() rol: string = ''
  @Input() tipoRol: 'Automático' | 'Genérico' | 'Específico' | 'No aplica' | '' = '';
  @Input() url: string = '';
  @Input() btnText: string = '';
  @Input() disabled: boolean = false;
}
