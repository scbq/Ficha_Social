package io.social.ficha_social_backend.component;

import io.social.ficha_social_backend.model.*;
import io.social.ficha_social_backend.model.catalogos.*;
import io.social.ficha_social_backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CatRegionRepository regionRepo;
    private final CatComunaRepository comunaRepo;
    private final CatEstadoCivilRepository estadoCivilRepo;
    private final CatSistemaSaludRepository saludRepo;
    private final CatParentescoRepository parentescoRepo;
    private final CatNivelEducacionalRepository nivelEduRepo;
    private final CatSeguroComplementarioRepository seguroRepo;
    private final CatTipoPropiedadRepository propiedadRepo;
    private final CatEstadoEconomicoRepository estadoEconRepo;
    private final CatRangoPagoRepository rangoRepo;
    private final PersonaRefRepository personaRepo;
    private final FichaSocialRepository fichaSocialRepo;
    private final CatSistemaPrevisionalRepository previsionalRepo;
    private final FichaGrupoFamiliarMiembroRepository grupoFamiliarRepo;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Iniciando carga de catálogos y datos de prueba...");

        initUbicacion();
        initEstadoCivil();
        initSaludYSeguros();
        initEducacionYParentesco();
        initPropiedadYEconomia();
        initSistemaPrevisional();
        initPersonasDePrueba();
        initFichasYGrupoFamiliar();

        log.info("Proceso de inicialización finalizado con éxito.");
    }

    private void initUbicacion() {
        if (regionRepo.count() == 0) {
            CatRegion rm = saveRegion((short) 13, "Metropolitana de Santiago");
            CatRegion valpo = saveRegion((short) 5, "Valparaíso");

            saveComuna(13119, "Maipú", rm);
            saveComuna(13101, "Santiago", rm);
            saveComuna(5101, "Valparaíso", valpo);
            saveComuna(5109, "Viña del Mar", valpo);
            log.info(">> Ubicación cargada.");
        }
    }

    private void initEstadoCivil() {
        if (estadoCivilRepo.count() == 0) {
            String[] estados = { "Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Conviviente Civil" };
            for (short i = 0; i < estados.length; i++) {
                CatEstadoCivil ec = new CatEstadoCivil();
                ec.setIdEstadoCivil((short) (i + 1));
                ec.setNombre(estados[i]);
                estadoCivilRepo.save(ec);
            }
            log.info(">> Estados Civiles cargados.");
        }
    }

    private void initSaludYSeguros() {
        if (saludRepo.count() == 0) {
            String[] sistemas = { "FONASA", "ISAPRE", "DIPRECA", "CAPREDENA", "SINCAL" };
            for (short i = 0; i < sistemas.length; i++) {
                CatSistemaSalud ss = new CatSistemaSalud();
                ss.setIdSistemaSalud((short) (i + 1));
                ss.setNombre(sistemas[i]);
                saludRepo.save(ss);
            }
        }
        if (seguroRepo.count() == 0) {
            saveSeguro((short) 1, "Ninguno");
            saveSeguro((short) 2, "Seguro Dental");
            log.info(">> Salud y Seguros cargados.");
        }
    }

    private void initEducacionYParentesco() {
        if (nivelEduRepo.count() == 0) {
            String[] niveles = { "Básica", "Media", "Técnica", "Universitaria", "Postgrado" };
            for (short i = 0; i < niveles.length; i++) {
                CatNivelEducacional ne = new CatNivelEducacional();
                ne.setIdNivelEducacional((short) (i + 1));
                ne.setNombre(niveles[i]);
                nivelEduRepo.save(ne);
            }
        }
        if (parentescoRepo.count() == 0) {
            String[] par = { "Titular", "Cónyuge", "Hijo/a", "Padre/Madre" };
            for (short i = 0; i < par.length; i++) {
                CatParentesco p = new CatParentesco();
                p.setIdParentesco((short) (i + 1));
                p.setNombre(par[i]);
                parentescoRepo.save(p);
            }
            log.info(">> Educación y Parentesco cargados.");
        }
    }

    private void initPropiedadYEconomia() {
        if (propiedadRepo.count() == 0) {
            savePropiedad((short) 1, "Casa");
            savePropiedad((short) 2, "Departamento");
        }
        if (estadoEconRepo.count() == 0) {
            saveEstadoEcon((short) 1, "Propietario");
            saveEstadoEcon((short) 2, "Arrendatario");
        }
        if (rangoRepo.count() == 0) {
            saveRango(1L, "Tramo A");
            saveRango(2L, "Tramo B");
            log.info(">> Propiedad y Economía cargados.");
        }
    }

    private void initSistemaPrevisional() {
        if (previsionalRepo.count() == 0) {
            String[] sistemas = {
                    "CAPREDENA", "AFP CAPITAL", "AFP CUPRUM", "AFP HABITAT",
                    "AFP MODELO", "AFP PLANVITAL", "AFP PROVIDA", "AFP UNO",
                    "IPS (Ex Cajas de Previsión)"
            };
            for (short i = 0; i < sistemas.length; i++) {
                CatSistemaPrevisional sp = new CatSistemaPrevisional();
                sp.setIdSistemaPrev((short) (i + 1));
                sp.setNombre(sistemas[i]);
                previsionalRepo.save(sp);
            }
            log.info(">> Sistemas Previsionales cargados.");
        }
    }

    private void initPersonasDePrueba() {
        if (personaRepo.count() == 0) {
            // Necesitamos recuperar los objetos de catálogo primero
            CatRegion rm = regionRepo.findById((short) 13).orElse(null);
            CatEstadoCivil casado = estadoCivilRepo.findById((short) 2).orElse(null);
            CatSistemaSalud capredena = saludRepo.findAll().stream()
                    .filter(s -> s.getNombre().equals("CAPREDENA")).findFirst().orElse(null);

            // Caso 1: Álvaro Riquelme
            PersonaRef p1 = new PersonaRef();
            p1.setRut("13.093.199-5");
            p1.setNombres("Álvaro Andrés");
            p1.setApellidoPaterno("Riquelme");
            p1.setApellidoMaterno("Soto");
            p1.setSexo("Masculino");
            p1.setFechaNacimiento(LocalDate.of(1976, 4, 17));
            p1.setGrado("SOF");
            p1.setCategoria("PCP");
            p1.setDomicilio("Av. Larraín 555");

            // ASIGNACIÓN DE RELACIONES
            p1.setRegion(rm);
            p1.setEstadoCivil(casado);
            p1.setSistemaSalud(capredena);

            personaRepo.save(p1);
            log.info(">> Persona de referencia Álvaro Riquelme cargada con éxito.");
        }
    }

    private void initFichasYGrupoFamiliar() {
        if (fichaSocialRepo.count() == 0) {
            // 1. Crear a María José como PersonaRef
            PersonaRef maria = new PersonaRef();
            maria.setRut("15.678.901-2");
            maria.setNombres("María José");
            maria.setApellidoPaterno("González");
            maria.setApellidoMaterno("Tapia");
            maria.setSexo("Femenino");
            maria.setFechaNacimiento(LocalDate.of(1985, 8, 20));
            maria.setRegion(regionRepo.findById((short) 13).orElse(null));
            personaRepo.save(maria);

            // 2. Crear su Ficha Social
            FichaSocial ficha = new FichaSocial();
            ficha.setPersona(maria);
            fichaSocialRepo.save(ficha);

            // 3. Agregar Miembros del Grupo Familiar
            CatParentesco conyuge = parentescoRepo.findById((short) 2).orElse(null);
            CatParentesco hijo = parentescoRepo.findById((short) 3).orElse(null);
            CatParentesco madre = parentescoRepo.findById((short) 4).orElse(null);

            CatSistemaSalud fonasa = saludRepo.findById((short) 1).orElse(null);
            CatSistemaSalud isapre = saludRepo.findById((short) 2).orElse(null);

            CatNivelEducacional basica = nivelEduRepo.findById((short) 1).orElse(null);
            CatNivelEducacional media = nivelEduRepo.findById((short) 2).orElse(null);
            CatNivelEducacional univ = nivelEduRepo.findById((short) 4).orElse(null);

            CatRangoPago tramoB = rangoRepo.findById(2L).orElse(null);

            // Miembro 1: Carlos Andrés Rojas Mery (Cónyuge)
            FichaGrupoFamiliarMiembro m1 = new FichaGrupoFamiliarMiembro();
            m1.setFichaSocial(ficha);
            m1.setRut("10.444.555-K");
            m1.setNombres("Carlos Andrés");
            m1.setApellidoPaterno("Rojas");
            m1.setApellidoMaterno("Mery");
            m1.setFechaNacimiento(LocalDate.of(1982, 5, 12));
            m1.setParentesco(conyuge);
            m1.setSistemaSalud(isapre);
            m1.setNivelEducacional(univ);
            m1.setAportaHogar(true);
            m1.setRangoAporte(tramoB);
            m1.setPoseeSeguroComp(true);
            m1.setViveEnDomicilio(true);
            grupoFamiliarRepo.save(m1);

            // Miembro 2: Sofía Ignacia Rojas González (Hijo/a)
            FichaGrupoFamiliarMiembro m2 = new FichaGrupoFamiliarMiembro();
            m2.setFichaSocial(ficha);
            m2.setRut("24.111.222-3");
            m2.setNombres("Sofía Ignacia");
            m2.setApellidoPaterno("Rojas");
            m2.setApellidoMaterno("González");
            m2.setFechaNacimiento(LocalDate.of(2015, 10, 20));
            m2.setParentesco(hijo);
            m2.setEsCarga(true);
            m2.setSistemaSalud(isapre);
            m2.setNivelEducacional(basica);
            m2.setPoseeSeguroComp(true);
            m2.setViveEnDomicilio(true);
            grupoFamiliarRepo.save(m2);

            // Miembro 3: Rosa Elena Tapia Vargas (Madre)
            FichaGrupoFamiliarMiembro m3 = new FichaGrupoFamiliarMiembro();
            m3.setFichaSocial(ficha);
            m3.setRut("8.333.222-1");
            m3.setNombres("Rosa Elena");
            m3.setApellidoPaterno("Tapia");
            m3.setApellidoMaterno("Vargas");
            m3.setFechaNacimiento(LocalDate.of(1955, 3, 30));
            m3.setParentesco(madre);
            m3.setSistemaSalud(fonasa);
            m3.setNivelEducacional(media);
            m3.setEnfermedadDiscapacidad(true);
            m3.setViveEnDomicilio(true);
            grupoFamiliarRepo.save(m3);

            log.info(">> Ficha Social y Grupo Familiar de María José González cargados.");
        }
    }

    // --- MÉTODOS AUXILIARES DE GUARDADO ---
    private CatRegion saveRegion(short id, String nombre) {
        CatRegion r = new CatRegion();
        r.setIdRegion(id);
        r.setNombre(nombre);
        return regionRepo.save(r);
    }

    private void saveComuna(Integer id, String nombre, CatRegion region) {
        CatComuna c = new CatComuna();
        c.setIdComuna(id);
        c.setNombre(nombre);
        c.setRegion(region);
        comunaRepo.save(c);
    }

    private void saveSeguro(short id, String nombre) {
        CatSeguroComplementario s = new CatSeguroComplementario();
        s.setIdSeguroComp(id);
        s.setNombre(nombre);
        seguroRepo.save(s);
    }

    private void savePropiedad(short id, String nombre) {
        CatTipoPropiedad tp = new CatTipoPropiedad();
        tp.setIdTipoPropiedad(id);
        tp.setNombre(nombre);
        propiedadRepo.save(tp);
    }

    private void saveEstadoEcon(short id, String nombre) {
        CatEstadoEconomico ee = new CatEstadoEconomico();
        ee.setIdEstadoEconomico(id);
        ee.setNombre(nombre);
        estadoEconRepo.save(ee);
    }

    private void saveRango(Long id, String rango) {
        CatRangoPago r = new CatRangoPago();
        r.setIdRangoPago(id);
        r.setRango(rango);
        rangoRepo.save(r);
    }
}