package io.refactoring.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.refactoring.demo.model.Empleado;
import io.refactoring.demo.services.IEmpleadoService;

@RestController
@RequestMapping("/api") // <-- base
@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoController {

    private final IEmpleadoService empleadoService;

    public EmpleadoController(IEmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping("/empleados")
    public List<Empleado> listarEmpleados() {
        return empleadoService.listarClientes(); // ojo: tu método se llama listarClientes()
    }
}
