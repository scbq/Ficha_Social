package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatParentesco;
import io.social.ficha_social_backend.model.catalogos.CatRangoPago;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_grupo_familiar_miembro")
public class FichaGrupoFamiliarMiembro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMiembro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ficha", nullable = false)
    @JsonIgnore
    private FichaSocial fichaSocial;

    @Column(nullable = false, length = 15)
    private String rut;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(name = "apellido_paterno", nullable = false, length = 100)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", length = 100)
    private String apellidoMaterno;

    @Column(name = "fecha_nacimiento")
    private java.time.LocalDate fechaNacimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_parentesco")
    private CatParentesco parentesco;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sistema_salud")
    private io.social.ficha_social_backend.model.catalogos.CatSistemaSalud sistemaSalud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nivel_educacional")
    private io.social.ficha_social_backend.model.catalogos.CatNivelEducacional nivelEducacional;

    @Column(name = "es_carga")
    private boolean esCarga;

    @Column(name = "vive_en_domicilio")
    private boolean viveEnDomicilio;

    @Column(name = "posee_seguro_comp")
    private boolean poseeSeguroComp;

    @Column(name = "enfermedad_discapacidad")
    private boolean enfermedadDiscapacidad;

    @Column(name = "aporta_hogar")
    private boolean aportaHogar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_aporte")
    private CatRangoPago rangoAporte;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_seguro_comp")
    private CatRangoPago rangoSeguroComp;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}