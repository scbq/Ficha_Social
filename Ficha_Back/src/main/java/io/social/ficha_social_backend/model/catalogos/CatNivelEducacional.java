package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_nivel_educacional")
public class CatNivelEducacional {
    @Id
    @Column(name = "id_nivel_educacional")
    private Short idNivelEducacional;
    private String nombre;
}