package io.social.ficha_social_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_ingresos")
public class FichaIngresos {

    @Id
    private Long idFicha;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_ficha")
    private FichaSocial fichaSocial;

    private BigDecimal ingresoLiquidoAnual;

    @Column(name = "ingreso_aporte_grupo_familiar")
    private BigDecimal ingresoAporteGrupoFamiliar;

    @Column(name = "ingreso_complementario")
    private BigDecimal ingresoComplementario;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}