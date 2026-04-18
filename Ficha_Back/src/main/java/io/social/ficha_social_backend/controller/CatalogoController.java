package io.social.ficha_social_backend.controller;

import io.social.ficha_social_backend.model.catalogos.*;
import io.social.ficha_social_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CatalogoController {

    private final CatRegionRepository regionRepo;
    private final CatComunaRepository comunaRepo;
    private final CatEstadoCivilRepository estadoCivilRepo;
    private final CatSistemaSaludRepository saludRepo;
    private final CatNivelEducacionalRepository nivelRepo;
    private final CatRangoPagoRepository rangoPagoRepo;
    private final CatEstadoEconomicoRepository estadoEconomicoRepo;
    private final CatSistemaPrevisionalRepository previsionalRepo;
    private final CatTipoPropiedadRepository tipoPropiedadRepo;
    private final CatVehiculoMarcaRepository marcaRepo;
    private final CatVehiculoModeloRepository modeloRepo;
    private final CatVehiculoTipoRepository tipoVehiculoRepo;

    @GetMapping("/regiones")
    public List<CatRegion> getRegiones() {
        return regionRepo.findAll();
    }

    @GetMapping("/comunas/{regionId}")
    public List<CatComuna> getComunas(@PathVariable Short regionId) {
        return comunaRepo.findByRegionIdRegion(regionId);
    }

    @GetMapping("/estado-civil")
    public List<CatEstadoCivil> getEstadosCiviles() {
        return estadoCivilRepo.findAll();
    }

    @GetMapping("/sistema-salud")
    public List<CatSistemaSalud> getSistemasSalud() {
        return saludRepo.findAll();
    }

    @GetMapping("/nivel-educacional")
    public List<CatNivelEducacional> getNiveles() {
        return nivelRepo.findAll();
    }

    @GetMapping("/rango-pago")
    public List<CatRangoPago> getRangosPago() {
        return rangoPagoRepo.findAll();
    }

    @GetMapping("/estado-economico")
    public List<CatEstadoEconomico> getEstadosEconomicos() {
        return estadoEconomicoRepo.findAll();
    }

    @GetMapping("/sistema-previsional")
    public List<CatSistemaPrevisional> getSistemasPrevisionales() {
        return previsionalRepo.findAll();
    }

    @GetMapping("/tipo-propiedad")
    public List<CatTipoPropiedad> getTiposPropiedad() {
        return tipoPropiedadRepo.findAll();
    }

    @GetMapping("/marcas-vehiculo")
    public List<CatVehiculoMarca> getMarcasVehiculo() {
        return marcaRepo.findAll();
    }

    @GetMapping("/modelos-vehiculo")
    public List<CatVehiculoModelo> getModelosVehiculo() {
        return modeloRepo.findAll();
    }

    @GetMapping("/tipos-vehiculo")
    public List<CatVehiculoTipo> getTiposVehiculo() {
        return tipoVehiculoRepo.findAll();
    }
}