import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-firmante-card',
  imports: [CommonModule],
  templateUrl: './firmante-card.component.html',
  styleUrl: './firmante-card.component.scss'
})
export class FirmanteCardComponent {

  @Input() hola: string = '';

}
