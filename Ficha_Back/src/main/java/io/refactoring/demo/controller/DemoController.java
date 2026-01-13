package io.refactoring.demo.controller; // La ruta de la carpeta
import java.util.List;
import org.springframework.web.bind.annotation.RestController;

import io.refactoring.demo.model.Empleado;
import io.refactoring.demo.services.IEmpleadoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
 
//Ejemplo de @CrossOrigin en un Controlador Spring Boot
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200") // Angular corre en 4200
public class DemoController {
// ... métodos GET, POST, PUT, DELETE
	
	@Autowired // Esto inyecta el servicio
    private IEmpleadoService empleadoService;
	
	@GetMapping("/{id}")
	public List<Empleado> listarTodos() {
	    return empleadoService.listarClientes();
	}
 
	// @GetMapping("/{id}")
	// public ResponseEntity<Empleado> obtenerPorId(@PathVariable Long id) {
	//     Empleado empleado = empleadoService.findById(id);
	//     return ResponseEntity.ok(empleado);
	// }
 
	// @PostMapping
	// public ResponseEntity<Empleado> guardar(@RequestBody Empleado empleado) {
	//     Empleado nuevoEmpleado = empleadoService.save(empleado);
	//     return new ResponseEntity<>(nuevoEmpleado, HttpStatus.CREATED);
	// }
 
	// @PutMapping("/{id}")
	// public ResponseEntity<Empleado> actualizar(@PathVariable Long id, @RequestBody Empleado detallesEmpleado) {
	//     Empleado empleadoActualizado = empleadoService.update(id, detallesEmpleado);
	//     return ResponseEntity.ok(empleadoActualizado);
	// }
 
	// @DeleteMapping("/{id}")
	// public ResponseEntity<Void> eliminar(@PathVariable Long id) {
	//     empleadoService.delete(id);
	//     return ResponseEntity.noContent().build();
	// }
	
}
 