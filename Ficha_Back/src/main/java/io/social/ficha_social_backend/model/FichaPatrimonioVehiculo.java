package io.social.ficha_social_backend.model;

import io.social.ficha_social_backend.model.catalogos.CatVehiculoMarca;
import io.social.ficha_social_backend.model.catalogos.CatVehiculoModelo;
import io.social.ficha_social_backend.model.catalogos.CatVehiculoTipo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ficha_patrimonio_vehiculo")
public class FichaPatrimonioVehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_patrimonio_vehiculo")
    private Long idVehiculo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ficha")
    @JsonIgnore
    private FichaSocial fichaSocial;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_vehiculo_tipo")
    private CatVehiculoTipo tipoVehiculo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_vehiculo_marca")
    private CatVehiculoMarca marca;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_vehiculo_modelo")
    private CatVehiculoModelo modelo;

    @Column(name = "anio")
    private Integer anio;

    @Column(name = "patente")
    private String patente;

    @Column(name = "pagado")
    private Boolean pagado;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
