export class Personal {

  // Identificador único
  rut!: string;

  // Datos básicos
  nombre!: string;
  apellido!: string;
  sexo!: string;
  fechaNacimiento!: string; // ISO o dd/MM/yyyy
  grado!: string;
  categoria!: string;

  // Estado y sistemas
  estadoCivil!: string;
  sistemaPrevisional!: string;
  sistemaSalud!: string;

  // Dirección
  domicilio!: string;
  comuna!: string;
  region!: string;

  // Foto (opcional)
  fotoUrl?: string;
}
