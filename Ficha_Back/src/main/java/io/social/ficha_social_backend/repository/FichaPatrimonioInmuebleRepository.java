package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.FichaPatrimonioInmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaPatrimonioInmuebleRepository extends JpaRepository<FichaPatrimonioInmueble, Long> {
}
