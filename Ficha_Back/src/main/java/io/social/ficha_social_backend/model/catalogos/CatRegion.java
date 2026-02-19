package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_region")
public class CatRegion {
    @Id
    @Column(name = "id_region")
    private Short idRegion;
    private String nombre;
}