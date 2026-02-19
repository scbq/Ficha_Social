package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_sistema_salud")
public class CatSistemaSalud {
    @Id
    private Short idSistemaSalud;
    private String nombre;
}