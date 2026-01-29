import { Component } from '@angular/core';
import { DatosPersonalesComponent } from './personal-lista/personal-lista';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatosPersonalesComponent],
  template: `<app-datos-personales></app-datos-personales>`,
  styleUrl: './app.css',
})
export class App {}
