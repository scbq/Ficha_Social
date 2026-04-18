package io.social.ficha_social_backend.controller;

import io.social.ficha_social_backend.model.FichaSocial;
import io.social.ficha_social_backend.repository.FichaSocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fichas")
@RequiredArgsConstructor
public class FichaController {

    private final FichaSocialRepository fichaRepo;
    private final io.social.ficha_social_backend.repository.PersonaRefRepository personaRepo;

    @GetMapping
    public List<FichaSocial> obtenerTodas() {
        return fichaRepo.findAll();
    }

    @org.springframework.web.bind.annotation.PostMapping
    @org.springframework.transaction.annotation.Transactional
    public FichaSocial crearFicha(@org.springframework.web.bind.annotation.RequestBody FichaSocial ficha) {
        // Asegurar que la persona existe
        if (ficha.getPersona() != null && ficha.getPersona().getRut() != null) {
            String normalizedRut = ficha.getPersona().getRut().replace(".", "").replace("-", "");
            personaRepo.findByRutNormalized(normalizedRut)
                    .ifPresent(ficha::setPersona);
        }

        // Si ya existe una ficha para esta persona
        if (ficha.getPersona() != null && ficha.getPersona().getRut() != null) {
            String normalizedRut = ficha.getPersona().getRut().replace(".", "").replace("-", "");
            System.out.println("--- INTENTANDO GUARDAR FICHA PARA RUT NORMALIZADO: " + normalizedRut);
            java.util.Optional<FichaSocial> optionalExisting = fichaRepo
                    .findByPersonaRutNormalized(normalizedRut);
            System.out.println("--- ¿FICHA EXISTE EN BD?: " + optionalExisting.isPresent());
            if (optionalExisting.isPresent()) {
                FichaSocial existing = optionalExisting.get();

                // DTO UPSERT REAL: Actualiza la original en vez de borrarla y re-crearla,
                // lo que evade la restricción de validación de PostgreSQL para la Unique Key.

                // 1. Datos escalares
                if (ficha.getDatosComplementarios() != null) {
                    if (existing.getDatosComplementarios() == null) {
                        existing.setDatosComplementarios(
                                new io.social.ficha_social_backend.model.FichaDatosComplementarios());
                    }
                    org.springframework.beans.BeanUtils.copyProperties(ficha.getDatosComplementarios(),
                            existing.getDatosComplementarios(), "idFicha", "fichaSocial");
                    existing.getDatosComplementarios().setFichaSocial(existing);
                    existing.getDatosComplementarios().setIdFicha(existing.getIdFicha());
                } else {
                    existing.setDatosComplementarios(null);
                }

                if (ficha.getVivienda() != null) {
                    if (existing.getVivienda() == null) {
                        existing.setVivienda(new io.social.ficha_social_backend.model.FichaVivienda());
                    }
                    org.springframework.beans.BeanUtils.copyProperties(ficha.getVivienda(), existing.getVivienda(),
                            "idFicha", "fichaSocial");
                    existing.getVivienda().setFichaSocial(existing);
                    existing.getVivienda().setIdFicha(existing.getIdFicha());
                } else {
                    existing.setVivienda(null);
                }

                if (ficha.getIngresos() != null) {
                    if (existing.getIngresos() == null) {
                        existing.setIngresos(new io.social.ficha_social_backend.model.FichaIngresos());
                    }
                    org.springframework.beans.BeanUtils.copyProperties(ficha.getIngresos(), existing.getIngresos(),
                            "idFicha", "fichaSocial");
                    existing.getIngresos().setFichaSocial(existing);
                    existing.getIngresos().setIdFicha(existing.getIdFicha());
                } else {
                    existing.setIngresos(null);
                }

                // 2. Colecciones complejas
                if (existing.getGrupoFamiliar() != null) {
                    existing.getGrupoFamiliar().clear();
                } else {
                    existing.setGrupoFamiliar(new java.util.HashSet<>());
                }
                if (ficha.getGrupoFamiliar() != null) {
                    ficha.getGrupoFamiliar().forEach(m -> m.setFichaSocial(existing));
                    existing.getGrupoFamiliar().addAll(ficha.getGrupoFamiliar());
                }

                if (existing.getBienesInmuebles() != null) {
                    existing.getBienesInmuebles().clear();
                } else {
                    existing.setBienesInmuebles(new java.util.HashSet<>());
                }
                if (ficha.getBienesInmuebles() != null) {
                    ficha.getBienesInmuebles().forEach(i -> i.setFichaSocial(existing));
                    existing.getBienesInmuebles().addAll(ficha.getBienesInmuebles());
                }

                if (existing.getVehiculos() != null) {
                    existing.getVehiculos().clear();
                } else {
                    existing.setVehiculos(new java.util.HashSet<>());
                }
                if (ficha.getVehiculos() != null) {
                    ficha.getVehiculos().forEach(v -> v.setFichaSocial(existing));
                    existing.getVehiculos().addAll(ficha.getVehiculos());
                }

                return fichaRepo.save(existing);
            }
        }

        // 2. Vinculación bidireccional manual a la nueva instancia
        if (ficha.getDatosComplementarios() != null) {
            ficha.getDatosComplementarios().setFichaSocial(ficha);
        }
        if (ficha.getGrupoFamiliar() != null) {
            ficha.getGrupoFamiliar().forEach(m -> m.setFichaSocial(ficha));
        }
        if (ficha.getBienesInmuebles() != null) {
            ficha.getBienesInmuebles().forEach(i -> i.setFichaSocial(ficha));
        }
        if (ficha.getVehiculos() != null) {
            ficha.getVehiculos().forEach(v -> v.setFichaSocial(ficha));
        }
        if (ficha.getVivienda() != null) {
            ficha.getVivienda().setFichaSocial(ficha);
        }
        if (ficha.getIngresos() != null) {
            ficha.getIngresos().setFichaSocial(ficha);
        }

        return fichaRepo.save(ficha);
    }

    @org.springframework.web.bind.annotation.GetMapping("/persona/{rut}")
    public org.springframework.http.ResponseEntity<FichaSocial> obtenerPorPersona(
            @org.springframework.web.bind.annotation.PathVariable String rut) {
        String normalizedRut = rut.replace(".", "").replace("-", "");
        return fichaRepo.findByPersonaRutNormalized(normalizedRut)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }
}