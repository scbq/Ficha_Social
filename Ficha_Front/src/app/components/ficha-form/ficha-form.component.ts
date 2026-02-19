import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-ficha-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ficha-form.component.html',
  styleUrl: './ficha-form.component.scss'
})
export class FichaFormComponent implements OnInit {
  fichaForm: FormGroup;

  // Listas para los selectores del formulario
  regiones: any[] = [];
  comunas: any[] = [];
  estadosCiviles: any[] = [];
  sistemasSalud: any[] = [];
  nivelesEdu: any[] = [];
  seguros: any[] = [];
  estadosEconomicos: any[] = [];
  rangosPago: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogService: CatalogService,
    private readonly fichaService: FichaService
  ) {
    // Estructura completa del Formulario Reactivo
    this.fichaForm = this.fb.group({
      persona: this.fb.group({
        persCod: [''],
        rut: ['', Validators.required],
        nombreCompleto: ['', Validators.required],
        sexo: [''],
        fechaNacimiento: [''],
        grado: [''],
        categoria: [''],
        domicilio: [''],
        idRegion: [''],
        idComuna: [''],
        idEstadoCivil: [''],
        idSistemaSalud: ['']
      }),
      datosComplementarios: this.fb.group({
        puebloOriginario: [false],
        enfermedadBase: [false],
        cursaEstudiosParticulares: [false],
        discapacidad: [false],

        pagaPensionAlimentos: [false],
        idRangoPagoPension: [''], // Dropdown dependiente

        tieneSeguroSalud: [false], // Checkbox o Switch
        idRangoSeguroSalud: [''], // Dropdown dependiente

        pagoEnEducacion: [false],
        idRangoPagoEducacion: [''], // Dropdown dependiente

        idNivelEducacional: [''],
        idEstadoEconomico: ['']
      }),
      vivienda: this.fb.group({
        nHabitantes: [0],
        nBanos: [0],
        nHabitaciones: [0],
        mt2Construidos: [0]
      }),
      // --- NUEVAS SECCIONES DINÁMICAS ---
      grupoFamiliar: this.fb.array([]),
      patrimonio: this.fb.group({
        ingresoLiquidoAnual: [0],
        idRangoAporteGrupo: [''],
        idRangoIngresoComp: [''],
        participaInversiones: [false],
        participaEmpresas: [false],
        bienesMuebles: this.fb.array([]),
        vehiculos: this.fb.array([])
      })
    });
  }

  // --- GETTERS PARA ACCEDER A LOS FORM-ARRAYS DESDE EL HTML ---
  get grupoFamiliar(): FormArray {
    return this.fichaForm.get('grupoFamiliar') as FormArray;
  }

  get bienesMuebles(): FormArray {
    return this.fichaForm.get('patrimonio.bienesMuebles') as FormArray;
  }

  get vehiculos(): FormArray {
    return this.fichaForm.get('patrimonio.vehiculos') as FormArray;
  }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  // --- MÉTODOS PARA GESTIONAR FILAS DINÁMICAS ---

  addMiembro(): void {
    const miembro = this.fb.group({
      rut: [''],
      nombre: [''],
      idParentesco: [''],
      esCarga: [false],
      idSistemaSalud: [''],
      viveEnDomicilio: [true],
      idEstadoCivil: ['']
    });
    this.grupoFamiliar.push(miembro);
  }

  addBienMueble(): void {
    const bien = this.fb.group({
      idTipoPropiedad: [''],
      idComuna: [''],
      estaPagada: [false]
    });
    this.bienesMuebles.push(bien);
  }

  addVehiculo(): void {
    const vehiculo = this.fb.group({
      marca: [''],
      modelo: [''],
      anio: [''],
      estaPagado: [false]
    });
    this.vehiculos.push(vehiculo);
  }

  removeElement(array: FormArray, index: number): void {
    array.removeAt(index);
  }

  // --- LÓGICA DE CATÁLOGOS ---

  cargarCatalogos(): void {
    this.catalogService.getRegiones().subscribe((data: any[]) => this.regiones = data);
    this.catalogService.getEstadosCiviles().subscribe((data: any[]) => this.estadosCiviles = data);
    this.catalogService.getSistemasSalud().subscribe((data: any[]) => this.sistemasSalud = data);
    this.catalogService.getNiveles().subscribe((data: any[]) => this.nivelesEdu = data);
    this.catalogService.getRangosPago().subscribe((data: any[]) => this.rangosPago = data);
    this.catalogService.getEstadosEconomicos().subscribe((data: any[]) => this.estadosEconomicos = data);
  }

  onRegionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const regionId = Number(target.value);
    if (regionId) {
      this.catalogService.getComunas(regionId).subscribe((data: any[]) => this.comunas = data);
    } else {
      this.comunas = [];
    }
  }

  // --- GUARDADO ---

  guardar(): void {
    if (this.fichaForm.valid) {
      const fichaToSend = this.prepararDatosParaEnvio(this.fichaForm.value);
      console.log('Objeto a enviar:', fichaToSend);

      this.fichaService.saveFicha(fichaToSend).subscribe({
        next: (res: any) => {
          alert('¡Ficha guardada con éxito!');
        },
        error: (err: any) => {
          alert('Error al intentar guardar la ficha.');
          console.error(err);
        }
      });
    } else {
      alert('Por favor, revise los campos obligatorios.');
      this.marcarComoTocados(this.fichaForm);
    }
  }

  private prepararDatosParaEnvio(formValue: any): any {
    const ficha = { ...formValue };

    // Transformar Datos Complementarios
    if (ficha.datosComplementarios) {
      const dc = ficha.datosComplementarios;

      // Mapeo de Rango Pago Pensión
      if (dc.idRangoPagoPension) {
        dc.rangoPagoPension = { idRangoPago: Number(dc.idRangoPagoPension) };
      }
      delete dc.idRangoPagoPension;

      // Mapeo de Rango Seguro Salud
      if (dc.idRangoSeguroSalud) {
        dc.rangoSeguroSalud = { idRangoPago: Number(dc.idRangoSeguroSalud) };
      }
      delete dc.idRangoSeguroSalud;

      // Mapeo de Rango Pago Educación
      if (dc.idRangoPagoEducacion) {
        dc.rangoPagoEducacion = { idRangoPago: Number(dc.idRangoPagoEducacion) };
      }
      delete dc.idRangoPagoEducacion;

      // Mapeo de Nivel Educacional
      if (dc.idNivelEducacional) {
        dc.nivelEducacional = { idNivelEducacional: Number(dc.idNivelEducacional) };
      }
      delete dc.idNivelEducacional;

      // Mapeo de Estado Económico
      if (dc.idEstadoEconomico) {
        dc.estadoEconomico = { idEstadoEconomico: Number(dc.idEstadoEconomico) };
      }
      delete dc.idEstadoEconomico;

      // Limpieza de campo antiguo si existiera
      delete dc.idSeguroComp;
    }

    // Transformar Persona (si fuera necesario, aunque ya lo manejamos como objeto a veces)
    // Pero el formulario usa 'persona' group con campos planos
    if (ficha.persona) {
      const p = ficha.persona;
      if (p.idRegion) p.region = { idRegion: Number(p.idRegion) };
      if (p.idComuna) p.comuna = { idComuna: Number(p.idComuna) };
      if (p.idEstadoCivil) p.estadoCivil = { idEstadoCivil: Number(p.idEstadoCivil) };
      if (p.idSistemaSalud) p.sistemaSalud = { idSistemaSalud: Number(p.idSistemaSalud) };

      // Limpiamos los IDs sueltos si queremos, o el backend los ignora
      delete p.idRegion;
      delete p.idComuna;
      delete p.idEstadoCivil;
      delete p.idSistemaSalud;
    }

    // Transformar Grupo Familiar
    if (ficha.grupoFamiliar && Array.isArray(ficha.grupoFamiliar)) {
      ficha.grupoFamiliar = ficha.grupoFamiliar.map((m: any) => {
        if (m.idParentesco) m.parentesco = { idParentesco: Number(m.idParentesco) }; // Ajustar nombre entidad si es necesario
        // Ojo: CatParentesco backend? Falta revisar nombre exacto entidad.
        // Asumiendo que backend espera 'parentesco' con id.
        delete m.idParentesco;

        if (m.idEstadoCivil) m.estadoCivil = { idEstadoCivil: Number(m.idEstadoCivil) };
        delete m.idEstadoCivil;

        if (m.idSistemaSalud) m.sistemaSalud = { idSistemaSalud: Number(m.idSistemaSalud) };
        delete m.idSistemaSalud;

        return m;
      });
    }

    return ficha;
  }

  private marcarComoTocados(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.marcarComoTocados(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  // Propiedad para almacenar los datos de la persona encontrados
  personaData: any = null;

  buscarPersona(): void {
    const rut = this.fichaForm.get('persona.rut')?.value;

    if (rut && rut.length > 7) {
      this.fichaService.getPersonaByRut(rut).subscribe({
        next: (persona) => {
          this.personaData = persona; // Guardamos la data completa para mostrar en HTML

          // Actualizamos el formulario con los IDs para mantener la validez al guardar
          this.fichaForm.get('persona')?.patchValue({
            persCod: persona.persCod,
            rut: persona.rut, // Aseguramos que el RUT quede seteadp
            nombreCompleto: persona.nombreCompleto,
            sexo: persona.sexo,
            fechaNacimiento: persona.fechaNacimiento,
            grado: persona.grado,
            categoria: persona.categoria,
            domicilio: persona.domicilio,
            idRegion: persona.region?.idRegion, // Accedemos al objeto anidado
            idComuna: persona.comuna?.idComuna, // Asumiendo que viene anidado o null
            idEstadoCivil: persona.estadoCivil?.idEstadoCivil,
            idSistemaSalud: persona.sistemaSalud?.idSistemaSalud
          });

          if (persona.region?.idRegion) {
            this.cargarComunasPorRegion(persona.region.idRegion);
          }

          console.log('Persona encontrada:', this.personaData);
        },
        error: () => {
          console.warn('Persona no encontrada');
          this.personaData = null;
          // Resetear campos si es necesario, pero mantener RUT
        }
      });
    }
  }

  // Método auxiliar para re-usar la carga de comunas
  private cargarComunasPorRegion(regionId: number): void {
    this.catalogService.getComunas(regionId).subscribe(data => this.comunas = data);
  }

}