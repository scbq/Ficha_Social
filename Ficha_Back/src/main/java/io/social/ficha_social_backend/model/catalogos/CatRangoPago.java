package io.social.ficha_social_backend.model.catalogos;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "cat_rango_pago")
public class CatRangoPago {

    @Id
    @Column(name = "id_rango_pago")
    private Long idRangoPago;

    @Column(name = "rango")
    private String rango;

}