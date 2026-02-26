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
    public FichaSocial crearFicha(@org.springframework.web.bind.annotation.RequestBody FichaSocial ficha) {
        // Asegurar que la persona existe si viene con ID (para evitar errores de
        // detached entity)
        if (ficha.getPersona() != null && ficha.getPersona().getRut() != null) {
            personaRepo.findById(ficha.getPersona().getRut())
                    .ifPresent(ficha::setPersona);
        }

        // Vinculación bidireccional manual
        if (ficha.getDatosComplementarios() != null) {
            ficha.getDatosComplementarios().setFichaSocial(ficha);
        }
        if (ficha.getGrupoFamiliar() != null) {
            ficha.getGrupoFamiliar().forEach(m -> m.setFichaSocial(ficha));
        }
        if (ficha.getBienesInmuebles() != null) {
            ficha.getBienesInmuebles().forEach(i -> i.setFichaSocial(ficha));
        }
        return fichaRepo.save(ficha);
    }

    @org.springframework.web.bind.annotation.GetMapping("/persona/{rut}")
    public org.springframework.http.ResponseEntity<FichaSocial> obtenerPorPersona(
            @org.springframework.web.bind.annotation.PathVariable String rut) {
        return fichaRepo.findByPersonaRut(rut)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }
}