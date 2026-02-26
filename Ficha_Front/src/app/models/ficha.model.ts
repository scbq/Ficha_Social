export interface Persona {
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  fotoPerfil?: string;
  fechaNacimiento?: string;
  sexo?: string;
  grado?: string;
  categoria?: string;
  domicilio?: string;
}

export interface GrupoFamiliarMiembro {
  idMiembro?: number;
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  fechaNacimiento?: string;
  idParentesco?: number;
  idSistemaSalud?: number;
  idNivelEducacional?: number;
  idRangoAporte?: number;
  sexo?: string;
  esCarga: boolean;
  viveEnDomicilio: boolean;
  poseeSeguroComp: boolean;
  enfermedadDiscapacidad: boolean;
  aportaHogar: boolean;
  montoAporte?: number;
  rangoSeguroComp?: { idRangoPago: number; rango?: string };
}

export interface DatosComplementarios {
  puebloOriginario: boolean;
  enfermedadBase: boolean;
  discapacidad: boolean;
  cursaEstudiosParticulares: boolean;
  pagoEnEducacion: boolean;
  pagaPensionAlimentos: boolean;
  tieneSeguroSalud: boolean;
  nivelEducacional?: { idNivelEducacional: number; nombre?: string };
  estadoEconomico?: { idEstadoEconomico: number; nombre?: string };
  rangoSeguroSalud?: { idRangoPago: number; rango?: string };
  rangoPagoPension?: { idRangoPago: number; rango?: string };
  rangoPagoEducacion?: { idRangoPago: number; rango?: string };
}

export interface FichaVivienda {
  idFicha?: number;
  domicilioTexto: string;
  nHabitantes: number;
  nBanos: number;
  nHabitaciones: number;
  mt2Construidos: number;
}

export interface FichaPatrimonioInmueble {
  idInmueble?: number;
  tipoVivienda?: { idTipoPropiedad: number; nombre?: string };
  region?: { idRegion: number; nombre?: string };
  comuna?: { idComuna: number; nombre?: string };
  direccion: string;
  estadoPropiedad?: { idEstadoPropiedad: number; nombre?: string };
}

export interface FichaSocial {
  idFicha: number;
  persona: Persona;
  creadaEn: string;
  actualizadaEn: string;
  datosComplementarios?: DatosComplementarios;
  grupoFamiliar?: GrupoFamiliarMiembro[];
  vivienda?: FichaVivienda;
  bienesInmuebles?: FichaPatrimonioInmueble[];
}