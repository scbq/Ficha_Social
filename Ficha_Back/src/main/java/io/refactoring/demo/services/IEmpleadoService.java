package io.refactoring.demo.services;

import io.refactoring.demo.model.Empleado;
import java.util.List;

import java.util.List;

public interface IEmpleadoService {
    public List<Empleado> listarClientes();
    
    public Empleado buscarClientePorId(Integer idEmpleado);
    
    public void guardarEmpleado(Empleado empleado);
    
    public void eliminarCliente(Empleado empleado);
}