import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '../../../../shared/buttons/button/button.component';
import { HomeCardComponent } from '../../../../shared/cards/home-card/home-card.component';
import { environment } from '../../../../../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-index-mi-fach',
  imports: [CommonModule, ButtonComponent, HomeCardComponent, RouterOutlet],
  templateUrl: './index-mi-fach.component.html',
  styleUrl: './index-mi-fach.component.scss'
})
export class IndexMiFachComponent {
  tipo: boolean = environment.webComponent;

}
