package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_sistema_previsional")
public class CatSistemaPrevisional {
    @Id
    @Column(name = "id_sistema_prev")
    private Short idSistemaPrev;
    private String nombre;
}
