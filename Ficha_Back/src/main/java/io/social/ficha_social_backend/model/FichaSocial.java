package io.social.ficha_social_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "ficha_social")
public class FichaSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ficha")
    private Long idFicha;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pers_cod", referencedColumnName = "pers_cod", unique = true)
    private PersonaRef persona; // Ahora sí debería reconocerlo sin errores

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

    @OneToOne(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private FichaDatosComplementarios datosComplementarios;

    @OneToMany(mappedBy = "fichaSocial", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FichaGrupoFamiliarMiembro> grupoFamiliar;
}