import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  sistemasPrevisionales: any[] = [];
  tiposPropiedad: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly catalogService: CatalogService,
    private readonly fichaService: FichaService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Estructura completa del Formulario Reactivo
    this.fichaForm = this.fb.group({
      persona: this.fb.group({
        rut: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: [''],
        sexo: [''],
        fechaNacimiento: [''],
        grado: [''],
        categoria: [''],
        domicilio: [''],
        idRegion: [''],
        idComuna: [''],
        idEstadoCivil: [''],
        idSistemaSalud: [''],
        idSistemaPrev: ['']
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
        domicilioTexto: [''],
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
        bienesInmuebles: this.fb.array([]),
        vehiculos: this.fb.array([])
      })
    });
  }

  // --- GETTERS PARA ACCEDER A LOS FORM-ARRAYS DESDE EL HTML ---
  get grupoFamiliar(): FormArray {
    return this.fichaForm.get('grupoFamiliar') as FormArray;
  }

  get bienesInmuebles(): FormArray {
    return this.fichaForm.get('patrimonio.bienesInmuebles') as FormArray;
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
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      fechaNacimiento: [''],
      idParentesco: [''],
      idSistemaSalud: [''],
      idNivelEducacional: [''],
      idRangoAporte: [''],
      idRangoSeguroComp: [''],
      esCarga: [false],
      viveEnDomicilio: [true],
      poseeSeguroComp: [false],
      enfermedadDiscapacidad: [false],
      aportaHogar: [false],
      montoAporte: [0]
    });
    this.grupoFamiliar.push(miembro);
  }

  addBienInmueble(): void {
    const bien = this.fb.group({
      idTipoVivienda: [''],
      idRegion: [''],
      idComuna: [''],
      direccion: ['', Validators.required],
      idEstadoPropiedad: [''],
      comunasRow: [[]]
    });
    this.bienesInmuebles.push(bien);
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
    this.catalogService.getSistemasPrevisionales().subscribe((data: any[]) => this.sistemasPrevisionales = data);
    this.catalogService.getTiposPropiedad().subscribe((data: any[]) => this.tiposPropiedad = data);
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

  onRegionChangeRow(index: number): void {
    const row = this.bienesInmuebles.at(index);
    const regionId = Number(row.get('idRegion')?.value);
    if (regionId) {
      this.catalogService.getComunas(regionId).subscribe(data => {
        (row.get('comunasRow') as any)?.setValue(data);
      });
    } else {
      (row.get('comunasRow') as any)?.setValue([]);
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
    const ficha = JSON.parse(JSON.stringify(formValue));

    // Transformar Datos Complementarios
    if (ficha.datosComplementarios) {
      const dc = ficha.datosComplementarios;

      if (dc.idRangoPagoPension) dc.rangoPagoPension = { idRangoPago: Number(dc.idRangoPagoPension) };
      delete dc.idRangoPagoPension;

      if (dc.idRangoSeguroSalud) dc.rangoSeguroSalud = { idRangoPago: Number(dc.idRangoSeguroSalud) };
      delete dc.idRangoSeguroSalud;

      if (dc.idRangoPagoEducacion) dc.rangoPagoEducacion = { idRangoPago: Number(dc.idRangoPagoEducacion) };
      delete dc.idRangoPagoEducacion;

      if (dc.idNivelEducacional) dc.nivelEducacional = { idNivelEducacional: Number(dc.idNivelEducacional) };
      delete dc.idNivelEducacional;

      if (dc.idEstadoEconomico) dc.estadoEconomico = { idEstadoEconomico: Number(dc.idEstadoEconomico) };
      delete dc.idEstadoEconomico;
    }

    // Transformar Persona
    if (ficha.persona) {
      const p = ficha.persona;
      if (p.idRegion) p.region = { idRegion: Number(p.idRegion) };
      if (p.idComuna) p.comuna = { idComuna: Number(p.idComuna) };
      if (p.idEstadoCivil) p.estadoCivil = { idEstadoCivil: Number(p.idEstadoCivil) };
      if (p.idSistemaSalud) p.sistemaSalud = { idSistemaSalud: Number(p.idSistemaSalud) };
      if (p.idSistemaPrev) p.sistemaPrevisional = { idSistemaPrev: Number(p.idSistemaPrev) };

      delete p.idRegion;
      delete p.idComuna;
      delete p.idEstadoCivil;
      delete p.idSistemaSalud;
      delete p.idSistemaPrev;
    }

    // Transformar Grupo Familiar
    if (ficha.grupoFamiliar && Array.isArray(ficha.grupoFamiliar)) {
      ficha.grupoFamiliar = ficha.grupoFamiliar.map((m: any) => {
        if (m.idParentesco) m.parentesco = { idParentesco: Number(m.idParentesco) };
        delete m.idParentesco;

        if (m.idSistemaSalud) m.sistemaSalud = { idSistemaSalud: Number(m.idSistemaSalud) };
        delete m.idSistemaSalud;

        if (m.idNivelEducacional) m.nivelEducacional = { idNivelEducacional: Number(m.idNivelEducacional) };
        delete m.idNivelEducacional;

        if (m.idRangoAporte) m.rangoAporte = { idRangoPago: Number(m.idRangoAporte) };
        delete m.idRangoAporte;

        if (m.idRangoSeguroComp) m.rangoSeguroComp = { idRangoPago: Number(m.idRangoSeguroComp) };
        delete m.idRangoSeguroComp;

        return m;
      });
    }

    // Transformar Bienes Inmuebles
    if (ficha.patrimonio && ficha.patrimonio.bienesInmuebles) {
      ficha.bienesInmuebles = ficha.patrimonio.bienesInmuebles.map((i: any) => {
        const item = { ...i };
        if (item.idTipoVivienda) item.tipoVivienda = { idTipoPropiedad: Number(item.idTipoVivienda) };
        if (item.idRegion) item.region = { idRegion: Number(item.idRegion) };
        if (item.idComuna) item.comuna = { idComuna: Number(item.idComuna) };
        if (item.idEstadoPropiedad) item.estadoPropiedad = { idEstadoPropiedad: Number(item.idEstadoPropiedad) };
        if (item.direccion) item.direccion = item.direccion.toUpperCase();

        delete item.idTipoVivienda;
        delete item.idRegion;
        delete item.idComuna;
        delete item.idEstadoPropiedad;
        delete item.comunasRow;
        return item;
      });
      delete ficha.patrimonio.bienesInmuebles;
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

  personaData: any = null;

  buscarPersona(): void {
    const rut = this.fichaForm.get('persona.rut')?.value;
    if (rut && rut.length > 7) {
      this.fichaService.getPersonaByRut(rut).subscribe({
        next: (persona) => {
          this.personaData = persona;
          this.fichaForm.get('persona')?.patchValue({
            rut: persona.rut,
            nombres: persona.nombres,
            apellidoPaterno: persona.apellidoPaterno,
            apellidoMaterno: persona.apellidoMaterno,
            sexo: persona.sexo,
            fechaNacimiento: persona.fechaNacimiento,
            domicilio: persona.domicilio,
            grado: persona.grado || '',
            categoria: persona.categoria || '',
            idRegion: persona.region?.idRegion,
            idComuna: persona.comuna?.idComuna,
            idEstadoCivil: persona.estadoCivil?.idEstadoCivil,
            idSistemaSalud: persona.sistemaSalud?.idSistemaSalud,
            idSistemaPrev: persona.sistemaPrevisional?.idSistemaPrev || persona.sistemaPrevisional?.idSistemaPrevisional
          });

          this.fichaForm.get('vivienda')?.patchValue({
            domicilioTexto: persona.domicilio
          });

          if (persona.region?.idRegion) {
            this.cargarComunasPorRegion(persona.region.idRegion);
          }

          this.cargarFichaCompleta(rut);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.personaData = null;
          this.cdr.detectChanges();
        }
      });
    }
  }

  private cargarComunasPorRegion(regionId: number): void {
    this.catalogService.getComunas(regionId).subscribe(data => this.comunas = data);
  }

  private cargarFichaCompleta(rut: string): void {
    this.fichaService.getFichaByPersonaRut(rut).subscribe({
      next: (ficha) => {
        if (ficha.grupoFamiliar && Array.isArray(ficha.grupoFamiliar)) {
          this.grupoFamiliar.clear();
          ficha.grupoFamiliar.forEach((m: any) => {
            const miembroGroup = this.fb.group({
              rut: [m.rut],
              nombres: [m.nombres],
              apellidoPaterno: [m.apellidoPaterno],
              apellidoMaterno: [m.apellidoMaterno],
              sexo: [m.sexo],
              fechaNacimiento: [m.fechaNacimiento],
              idParentesco: [m.parentesco?.idParentesco],
              parentescoName: [m.parentesco?.nombre || this.parentescoRepoName(m.parentesco?.idParentesco)],
              idSistemaSalud: [m.sistemaSalud?.idSistemaSalud],
              sistemaSaludName: [m.sistemaSalud?.nombre || this.saludRepoName(m.sistemaSalud?.idSistemaSalud)],
              idNivelEducacional: [m.nivelEducacional?.idNivelEducacional],
              idRangoAporte: [m.rangoAporte?.idRangoPago],
              idRangoSeguroComp: [m.rangoSeguroComp?.idRangoPago],
              esCarga: [m.esCarga || false],
              viveEnDomicilio: [m.viveEnDomicilio || false],
              poseeSeguroComp: [m.poseeSeguroComp || false],
              enfermedadDiscapacidad: [m.enfermedadDiscapacidad || false],
              aportaHogar: [m.aportaHogar || false],
              montoAporte: [m.montoAporte || 0]
            });
            this.grupoFamiliar.push(miembroGroup);
          });
        }

        if (ficha.datosComplementarios) {
          const dc = ficha.datosComplementarios;
          this.fichaForm.get('datosComplementarios')?.patchValue({
            puebloOriginario: dc.puebloOriginario,
            enfermedadBase: dc.enfermedadBase,
            cursaEstudiosParticulares: dc.cursaEstudiosParticulares,
            discapacidad: dc.discapacidad,
            pagaPensionAlimentos: dc.pagaPensionAlimentos,
            idRangoPagoPension: dc.rangoPagoPension?.idRangoPago,
            tieneSeguroSalud: dc.tieneSeguroSalud,
            idRangoSeguroSalud: dc.rangoSeguroSalud?.idRangoPago,
            pagoEnEducacion: dc.pagoEnEducacion,
            idRangoPagoEducacion: dc.rangoPagoEducacion?.idRangoPago,
            idNivelEducacional: dc.nivelEducacional?.idNivelEducacional,
            idEstadoEconomico: dc.estadoEconomico?.idEstadoEconomico
          });
        }

        if (ficha.vivienda) {
          this.fichaForm.get('vivienda')?.patchValue({
            domicilioTexto: ficha.vivienda.domicilioTexto,
            nHabitantes: ficha.vivienda.nHabitantes,
            nBanos: ficha.vivienda.nBanos,
            nHabitaciones: ficha.vivienda.nHabitaciones,
            mt2Construidos: ficha.vivienda.mt2Construidos
          });
        }

        if (ficha.bienesInmuebles && Array.isArray(ficha.bienesInmuebles)) {
          this.bienesInmuebles.clear();
          ficha.bienesInmuebles.forEach((i: any) => {
            const row = this.fb.group({
              idTipoVivienda: [i.tipoVivienda?.idTipoPropiedad],
              idRegion: [i.region?.idRegion],
              idComuna: [i.comuna?.idComuna],
              direccion: [i.direccion],
              idEstadoPropiedad: [i.estadoPropiedad?.idEstadoEconomico],
              comunasRow: [[]]
            });
            this.bienesInmuebles.push(row);
            if (i.region?.idRegion) {
              this.catalogService.getComunas(i.region.idRegion).subscribe(data => {
                (row.get('comunasRow') as any)?.setValue(data);
              });
            }
          });
        }
      }
    });
  }

  private parentescoRepoName(id: any): string {
    if (!id) return '---';
    const names: any = { 1: 'Padre/Madre', 2: 'Cónyuge', 3: 'Hijo/a', 4: 'Otro' };
    return names[id] || '---';
  }

  private saludRepoName(id: any): string {
    if (!id) return '---';
    const s = this.sistemasSalud.find(x => x.idSistemaSalud == id);
    return s ? s.nombre : '---';
  }

  onRutInput(event: any): void {
    let value = event.target.value.replace(/\./g, '').replace(/-/g, '');
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 1) {
      const cuerpo = value.slice(0, -1);
      const dv = value.slice(-1).toUpperCase();
      let formatted = '';
      for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
        formatted = cuerpo.charAt(i) + (j > 0 && j % 3 === 0 ? '.' : '') + formatted;
      }
      value = formatted + '-' + dv;
    }
    this.fichaForm.get('persona.rut')?.setValue(value, { emitEvent: false });
  }
}