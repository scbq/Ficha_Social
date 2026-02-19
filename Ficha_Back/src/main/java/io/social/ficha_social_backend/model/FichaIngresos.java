package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatRangoPago;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_aporte_grupo_familiar")
    private CatRangoPago rangoAporteGrupoFamiliar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_ingreso_complementario")
    private CatRangoPago rangoIngresoComplementario;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}