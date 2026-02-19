import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { environment } from '../environments/environment';
import { NgIf } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HomeCardComponent } from './shared/cards/home-card/home-card.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, NgIf, HomeCardComponent, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  proyectName: string = environment.nameProyect;
  public token: string = ''
  public gradoCorto: string | undefined
  public nombre: string | undefined

  showNav: boolean = environment.webComponent;
}
