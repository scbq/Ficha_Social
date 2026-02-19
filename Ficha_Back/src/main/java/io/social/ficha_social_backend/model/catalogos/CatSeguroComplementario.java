package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_seguro_complementario")
public class CatSeguroComplementario {
    @Id
    @Column(name = "id_seguro_comp")
    private Short idSeguroComp;
    private String nombre;
}