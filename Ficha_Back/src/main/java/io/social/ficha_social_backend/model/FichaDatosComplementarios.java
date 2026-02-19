package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.*;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_datos_complementarios")
public class FichaDatosComplementarios {

    @Id
    private Long idFicha;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_ficha")
    private FichaSocial fichaSocial;

    private boolean puebloOriginario;
    private boolean enfermedadBase;
    private boolean discapacidad;
    private boolean cursaEstudiosParticulares;
    private boolean pagoEnEducacion;
    private boolean pagaPensionAlimentos;

    // --- SEGURO DE SALUD ---
    private boolean tieneSeguroSalud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_seguro_salud")
    private CatRangoPago rangoSeguroSalud;

    // --- PENSION ALIMENTOS ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_pago_pension")
    private CatRangoPago rangoPagoPension;

    // --- EDUCACION ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_rango_pago_educacion")
    private CatRangoPago rangoPagoEducacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nivel_educacional")
    private CatNivelEducacional nivelEducacional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_estado_economico")
    private CatEstadoEconomico estadoEconomico;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}