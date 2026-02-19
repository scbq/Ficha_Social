export interface Persona {
  persCod: string;
  rut: string;
  nombreCompleto: string;
  fotoPerfil?: string;
  fechaNacimiento?: string;
  sexo?: string;
  grado?: string;
  categoria?: string;
  domicilio?: string;
}

export interface FichaSocial {
  idFicha: number;
  persona: Persona;
  creadaEn: string;
  actualizadaEn: string;
  // Agregaremos los demás campos (vivienda, ingresos) a medida que avancemos
}