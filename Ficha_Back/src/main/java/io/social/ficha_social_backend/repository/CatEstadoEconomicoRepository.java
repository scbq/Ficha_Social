package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.catalogos.CatEstadoEconomico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatEstadoEconomicoRepository extends JpaRepository<CatEstadoEconomico, Short> {
}