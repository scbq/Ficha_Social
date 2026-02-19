package io.social.ficha_social_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_vivienda")
public class FichaVivienda {

    @Id
    private Long idFicha;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_ficha")
    private FichaSocial fichaSocial;

    private String domicilioTexto;
    private Short nHabitantes;
    private Short nHabitaciones;
    private Short nBanos;
    private Double mt2Construidos;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}