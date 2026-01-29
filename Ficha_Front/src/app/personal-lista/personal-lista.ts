import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personal } from '../personal'; // ajusta ruta

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  templateUrl: './personal-lista.html',
  styleUrls: ['./personal-lista.css'],
  imports: [CommonModule, FormsModule],
})
export class DatosPersonalesComponent {

  empleado: Personal | null = {
    rut: '13.093.199-5',
    nombre: 'Álvaro',
    apellido: 'Riquelme',
    sexo: 'Masculino',
    fechaNacimiento: '17/04/1976',
    grado: 'SOF',
    categoria: 'PCP',
    estadoCivil: 'Casado',
    sistemaPrevisional: 'Capredena',
    sistemaSalud: 'SISALU',
    domicilio: 'Av. Larraín 555',
    comuna: 'La Reina',
    region: 'RM',
    fotoUrl: 'https://via.placeholder.com/300',
  };

  complementarios = {
    puebloOriginario: true,
    seguroComplementario: '',
    enfermedadBase: false,
    discapacidad: true,
    nivelEducacional: '',
    cursaEstudiosParticulares: true,
    pagoEducacion: '',
    pensionAlimentos: false,
    estadoEconomicoDomicilio: '',
  };

  opcionesSeguro = ['Sí', 'No', 'En trámite'];
  opcionesNivelEducacional = ['Básica', 'Media', 'Técnico', 'Universitaria', 'Postgrado'];
  opcionesPagoEducacion = ['No', 'Sí', 'Beca', 'Crédito'];
  opcionesEstadoEconomico = ['Bajo', 'Medio', 'Alto'];
}
