package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.catalogos.CatComuna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CatComunaRepository extends JpaRepository<CatComuna, Integer> {
    // Spring Data JPA creará la consulta automáticamente por el nombre del método
    List<CatComuna> findByRegionIdRegion(Short idRegion);
}