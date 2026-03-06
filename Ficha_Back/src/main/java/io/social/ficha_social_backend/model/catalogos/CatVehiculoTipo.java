package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehiculo_tipo")
public class CatVehiculoTipo {

    @Id
    @Column(name = "id_vehiculo_tipo")
    private Integer id;

    @Column(name = "descripcion")
    private String descripcion;
}
