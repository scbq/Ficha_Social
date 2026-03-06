package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehiculo_marca")
public class CatVehiculoMarca {

    @Id
    @Column(name = "id_vehiculo_marca")
    private Integer id;

    @Column(name = "descripcion")
    private String descripcion;
}
