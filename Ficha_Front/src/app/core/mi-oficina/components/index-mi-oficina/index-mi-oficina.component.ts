import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ButtonComponent } from '../../../../shared/buttons/button/button.component';
import { HomeCardComponent } from '../../../../shared/cards/home-card/home-card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-index-mi-oficina',
  imports: [CommonModule, ButtonComponent, HomeCardComponent],
  templateUrl: './index-mi-oficina.component.html',
  styleUrl: './index-mi-oficina.component.scss'
})
export class IndexMiOficinaComponent {
  tipo: boolean = environment.webComponent;

  showNav: boolean = environment.webComponent;
}
