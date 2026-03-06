package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.FichaSocial;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FichaSocialRepository extends JpaRepository<FichaSocial, java.lang.Long> {

    Optional<FichaSocial> findByPersonaRut(String rut);

    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT f FROM FichaSocial f " +
            "LEFT JOIN FETCH f.grupoFamiliar " +
            "LEFT JOIN FETCH f.bienesInmuebles " +
            "LEFT JOIN FETCH f.vehiculos " +
            "WHERE REPLACE(REPLACE(f.persona.rut, '.', ''), '-', '') = :rut")
    Optional<FichaSocial> findByPersonaRutNormalized(String rut);
}