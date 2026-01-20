import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Personal } from '../personal';
import { PersonalService } from '../personal-service';

@Component({
  selector: 'app-personal-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-lista.html',
  styleUrls: ['./personal-lista.css'],
})
export class PersonalLista implements OnInit {
  personal: Personal[] = [];
  usuarioLogueado: Personal | undefined;

  private personalServicio = inject(PersonalService);

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  private obtenerPersonal(): void {
    this.personalServicio.obtenerPersonalLista().subscribe({
      next: (data) => {
        this.personal = data;

        this.usuarioLogueado = this.personal.find(u => u.id==1)!;
        console.log('DATA ASIGNADA:', this.personal.find(u => u.id==1));
      },
      error: (error) => console.error('Error al obtener datos', error),
    });
  }
}
