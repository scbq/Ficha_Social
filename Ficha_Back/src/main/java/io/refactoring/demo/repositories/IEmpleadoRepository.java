package io.refactoring.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Asumiendo que tienes una entidad Empleado en io.refactoring.demo.model
import io.refactoring.demo.model.Empleado;

@Repository // Indica a Spring que esta es una capa de persistencia
public interface IEmpleadoRepository extends JpaRepository<Empleado, Integer> {
    // Spring Data JPA ya incluye el método findAll() automáticamente
	
}
