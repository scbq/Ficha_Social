import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-badge',
  imports: [CommonModule],
  templateUrl: './rounded-badge.component.html',
  styleUrl: './rounded-badge.component.scss'
})
export class RoundedBadgeComponent {

  @Input() badgeType: string = ''; //los mismos tipos de Bootstrap 5.3
  @Input() badgeEstado: string = '';

}
