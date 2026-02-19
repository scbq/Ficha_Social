package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_estado_economico_domicilio")
public class CatEstadoEconomico {
    @Id
    @Column(name = "id_estado_economico")
    private Short idEstadoEconomico;
    private String nombre;
}