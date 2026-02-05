package io.refactoring.demo.model;

import java.sql.Date;

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

@Table(name = "persona_ref", schema = "public")

public class Empleado {

    @Id

    @Column(name = "pers_cod", nullable = false, precision = 18, scale = 0)

    private String persCod; // o BigDecimal si prefieres exactitud total

    @Column(name = "rut", length = 20)

    private String rut;

    @Column(name = "nombre_completo", length = 100)

    private String nombre;

    @Column(name = "fecha_nacimiento")

    private Date fechaNacimiento;

    @Column(name = "sexo", length = 20)
    private String sexo;

    @Column(name = "grado", length = 20)
    private String grado;

    @Column(name = "categoria", length = 50)
    private String categoria;

    @Column(name = "domicilio", length = 50)
    private String domicilio;

    // @Column(name = "apellido", precision = 18, scale = 0)

    // private String apellido; // porque en la BD es numeric, no texto

    // Getters y Setters
    public String getId() {
        return persCod;
    }

    public void setId(String persCod) {
        this.persCod = persCod;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

}

// public String getApellido() {
// return apellido;
// }

// public void setApellido(String apellido) {
// this.apellido = apellido;
// }
