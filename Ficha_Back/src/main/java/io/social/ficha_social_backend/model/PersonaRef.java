package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatComuna;
import io.social.ficha_social_backend.model.catalogos.CatEstadoCivil;
import io.social.ficha_social_backend.model.catalogos.CatRegion;
import io.social.ficha_social_backend.model.catalogos.CatSistemaSalud;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "persona_ref")
public class PersonaRef {

    @Id
    @Column(name = "pers_cod", length = 20)
    private String persCod;

    @Column(nullable = false, length = 15)
    private String rut;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    private String sexo;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String fotoPerfil;
    private String grado;
    private String categoria;
    private String domicilio;

    // --- RELACIONES CON CATÁLOGOS ---

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_region")
    private CatRegion region;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_comuna")
    private CatComuna comuna;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado_civil")
    private CatEstadoCivil estadoCivil;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_sistema_salud")
    private CatSistemaSalud sistemaSalud;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PreUpdate
    @PrePersist
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
}