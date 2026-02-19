package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_parentesco")
public class CatParentesco {
    @Id
    @Column(name = "id_parentesco")
    private Short idParentesco;
    private String nombre;
}