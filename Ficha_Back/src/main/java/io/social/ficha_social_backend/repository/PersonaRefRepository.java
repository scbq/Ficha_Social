package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.PersonaRef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonaRefRepository extends JpaRepository<PersonaRef, String> {

    Optional<PersonaRef> findByRut(String rut);
}