package io.social.ficha_social_backend.repository;

import io.social.ficha_social_backend.model.catalogos.CatSistemaSalud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatSistemaSaludRepository extends JpaRepository<CatSistemaSalud, Short> {
}