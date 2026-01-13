import { Component, inject, OnInit } from '@angular/core';
import { Personal } from '../personal';
import { PersonalService } from '../personal-service';
// IMPORTANTE: Si usas la nueva sintaxis @for, no necesitas CommonModule, 
// pero si usaras el pipe async, sí necesitarías AsyncPipe aquí.
import { JsonPipe } from '@angular/common'; 

@Component({
  selector: 'app-personal-lista',
  standalone: true,
  imports: [PersonalLista], // Añade JsonPipe solo para pruebas si quieres
  templateUrl: './personal-lista.html',
  styleUrl: './personal-lista.css',
})
export class PersonalLista implements OnInit {
  // Inicializa con un array vacío para evitar errores de "undefined" antes de que llegue la data
  personal: Personal[] = []; 

  private personalServicio = inject(PersonalService);

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  private obtenerPersonal(): void {
    this.personalServicio.obtenerPersonalLista().subscribe({
      next: (data) => {
        // Asegúrate de que 'data' sea el array. 
        // Si el console.log muestra algo como { personas: [...] }, usa data.personas
        this.personal = data;
        console.log('DATA ASIGNADA:', this.personal);
      },
      error: (error) => {
        console.error("Error al obtener datos", error);
      },
    });
  }
}
