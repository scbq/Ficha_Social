package io.social.ficha_social_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "ficha_social")
public class FichaSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha")
    @EqualsAndHashCode.Include
    private Long idFicha;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "persona_rut", unique = true)
    private PersonaRef persona;

    @Column(name = "creada_en", updatable = false)
    private LocalDateTime creadaEn;

    @Column(name = "actualizada_en")
    private LocalDateTime actualizadaEn;

    @PrePersist
    protected void onCreate() {
        creadaEn = LocalDateTime.now();
        actualizadaEn = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        actualizadaEn = LocalDateTime.now();
    }

    @OneToOne(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private FichaDatosComplementarios datosComplementarios;

    @OneToMany(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<FichaGrupoFamiliarMiembro> grupoFamiliar;

    @OneToOne(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private FichaVivienda vivienda;

    @OneToMany(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<FichaPatrimonioInmueble> bienesInmuebles;

    @OneToMany(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<FichaPatrimonioVehiculo> vehiculos;

    @OneToOne(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private FichaIngresos ingresos;
}