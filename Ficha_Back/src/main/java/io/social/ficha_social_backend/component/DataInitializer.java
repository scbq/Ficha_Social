package io.social.ficha_social_backend.component;

import io.social.ficha_social_backend.model.*;
import io.social.ficha_social_backend.model.catalogos.*;
import io.social.ficha_social_backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Iniciando carga de catálogos y datos de prueba...");

        initUbicacion();
        initEstadoCivil();
        initSaludYSeguros();
        initEducacionYParentesco();
        initPropiedadYEconomia();
        initPersonasDePrueba();

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
            saveRango((short) 1, "Tramo A", 0, 500000);
            saveRango((short) 2, "Tramo B", 500001, 1000000);
            log.info(">> Propiedad y Economía cargados.");
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
            p1.setPersCod("AR001");
            p1.setRut("13.093.199-5");
            p1.setNombreCompleto("Álvaro Riquelme");
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

    private void saveRango(short id, String nombre, long min, long max) {
        CatRangoPago r = new CatRangoPago();
        r.setIdRangoPago(id);
        r.setNombre(nombre);
        r.setMontoMin(BigDecimal.valueOf(min));
        r.setMontoMax(BigDecimal.valueOf(max));
        rangoRepo.save(r);
    }
}