package io.refactoring.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.refactoring.demo.model.Empleado;
import io.refactoring.demo.repositories.IEmpleadoRepository;

@Service
public class EmpleadoServicio implements IEmpleadoService{
	
	@Autowired
	private IEmpleadoRepository empleadoRepository;

	@Override
	public List<Empleado> listarClientes() {
		// TODO Auto-generated method stub
		List<Empleado> empleados = empleadoRepository.findAll();
		return empleados;
	}

	@Override
	public Empleado buscarClientePorId(Integer idEmpleado) {
		// TODO Auto-generated method stub
		Empleado empleado = empleadoRepository.findById(idEmpleado).orElse(null);
		return empleado;
	}

	@Override
	public void guardarEmpleado(Empleado empleado) {
		// TODO Auto-generated method stub
		empleadoRepository.save(empleado);
	}

	@Override
	public void eliminarCliente(Empleado empleado) {
		// TODO Auto-generated method stub
		empleadoRepository.delete(empleado);
	}
	

}
