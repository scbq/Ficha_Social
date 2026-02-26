package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatComuna;
import io.social.ficha_social_backend.model.catalogos.CatRegion;
import io.social.ficha_social_backend.model.catalogos.CatTipoPropiedad;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.social.ficha_social_backend.model.catalogos.CatEstadoEconomico;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_patrimonio_inmueble")
public class FichaPatrimonioInmueble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inmueble")
    private Long idInmueble;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ficha")
    @JsonIgnore
    private FichaSocial fichaSocial;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_vivienda")
    private CatTipoPropiedad tipoVivienda;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_region")
    private CatRegion region;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_comuna")
    private CatComuna comuna;

    private String direccion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_estado_propiedad")
    private CatEstadoEconomico estadoPropiedad;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
