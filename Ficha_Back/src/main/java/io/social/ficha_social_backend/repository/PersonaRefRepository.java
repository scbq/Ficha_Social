package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.PersonaRef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonaRefRepository extends JpaRepository<PersonaRef, String> {

    Optional<PersonaRef> findByRut(String rut);

    @org.springframework.data.jpa.repository.Query("SELECT p FROM PersonaRef p WHERE REPLACE(REPLACE(p.rut, '.', ''), '-', '') = :rut")
    Optional<PersonaRef> findByRutNormalized(String rut);
}