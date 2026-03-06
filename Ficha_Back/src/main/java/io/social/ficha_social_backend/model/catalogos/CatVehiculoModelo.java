package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehiculo_modelo")
public class CatVehiculoModelo {

    @Id
    @Column(name = "id_vehiculo_modelo")
    private Integer id;

    @Column(name = "descripcion")
    private String descripcion;
}
