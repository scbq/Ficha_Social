package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.FichaPatrimonioVehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaPatrimonioVehiculoRepository extends JpaRepository<FichaPatrimonioVehiculo, Long> {
}
