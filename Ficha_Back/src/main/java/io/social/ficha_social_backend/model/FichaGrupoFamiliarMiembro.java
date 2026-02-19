package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatParentesco;
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
    @JoinColumn(name = "id_ficha")
    private FichaSocial fichaSocial;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "integrante_pers_cod")
    private PersonaRef persona;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_parentesco")
    private CatParentesco parentesco;

    private boolean esCarga;
    private boolean viveEnDomicilio;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}