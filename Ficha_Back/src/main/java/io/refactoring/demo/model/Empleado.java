package io.refactoring.demo.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data

@NoArgsConstructor
@AllArgsConstructor

@ToString
@EqualsAndHashCode

@Entity

@Table(name = "Empleado", schema = "dbo")

public class Empleado {
 
    @Id

    @Column(name = "id", nullable = false, precision = 18, scale = 0)

    private Integer id;   // o BigDecimal si prefieres exactitud total
 
    @Column(name = "nombre", length = 100)

    private String nombre;
 
    @Column(name = "apellido", precision = 18, scale = 0)

    private Integer apellido; // porque en la BD es numeric, no texto

 // Getters y Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Integer getApellido() {
        return apellido;
    }
    public void setApellido(Integer apellido) {
        this.apellido = apellido;
    }

}

 