package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cat_tipo_propiedad")
public class CatTipoPropiedad {
    @Id
    @Column(name = "id_tipo_propiedad")
    private Short idTipoPropiedad;
    private String nombre; // Casa, Parcela, Depto, etc.
}