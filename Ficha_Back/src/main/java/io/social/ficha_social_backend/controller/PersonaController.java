package io.social.ficha_social_backend.controller;

import io.social.ficha_social_backend.model.PersonaRef;
import io.social.ficha_social_backend.repository.PersonaRefRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity; // <--- Esta faltaba
import org.springframework.web.bind.annotation.*;

import java.util.Optional; // <--- Esta faltaba

@RestController
@RequestMapping("/api/personas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {

    private final PersonaRefRepository personaRepo;

    @GetMapping("/rut/{rut}")
    public ResponseEntity<PersonaRef> buscarPorRut(@PathVariable String rut) {
        return personaRepo.findByRutNormalized(rut)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}