package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_estado_civil")
public class CatEstadoCivil {
    @Id
    @Column(name = "id_estado_civil")
    private Short idEstadoCivil;
    private String nombre;
}