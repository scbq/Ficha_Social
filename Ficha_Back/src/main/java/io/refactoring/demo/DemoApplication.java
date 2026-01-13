package io.refactoring.demo;
 
import io.refactoring.demo.model.Empleado;
import io.refactoring.demo.services.IEmpleadoService;
import lombok.Data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
import java.util.List;
import java.util.Scanner;
 
@SpringBootApplication

@Data

public class DemoApplication implements CommandLineRunner {
 
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
 
    @Autowired
    private IEmpleadoService empleadoService;
 
    private final String nl = System.lineSeparator();
 
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
 
    @Override
    public void run(String... args) {
        iniciarMenuConsola();
    }
 
    private void iniciarMenuConsola() {
        boolean salir = false;
 
        try (Scanner consola = new Scanner(System.in)) {
            while (!salir) {
                int opcion = mostrarMenu(consola);
                if (opcion == 0) {
                    continue; // vuelve a mostrar el menú
                }
                salir = ejecutarOpcion(opcion);
            }
        } catch (Exception eeeee) {
            // IMPORTANTE: imprime stacktrace real para depurar
            logger.error("Error fatal en la aplicación", eeeee);
        }
    }
 
    private int mostrarMenu(Scanner consola) {
        logger.info("""
                "*** Aplicación Ficha Social ***"
                1. Listar Empleados
                2. Buscar Empleados
		 		3. Agregar Empleados
		 		4. Modificar Empleados
		 		5. Eliminar Empleados
                6. Salir
                Elige una Opción:\s""");
 
        try {
            String entrada = consola.nextLine();
            if (entrada == null || entrada.trim().isEmpty()) return 0;
            return Integer.parseInt(entrada.trim());
        } catch (Exception e) {
            logger.info("Error: Por favor introduce solo números.");
            return 0;
        }
    }
 
    private boolean ejecutarOpcion(int opcion) {
        return switch (opcion) {
            case 1 -> {
                listarEmpleados();
                yield false;
            }
            case 2 -> true;
            default -> {
                logger.info("Opción inválida.");
                yield false;
            }
        };
    }
 
    private void listarEmpleados() {
        logger.info(nl + "--- Listado de Empleados ---" + nl);
 
        List<Empleado> empleados = empleadoService.listarClientes();
 
        if (empleados == null || empleados.isEmpty()) {
            logger.info("No hay empleados registrados.");
            return;
        }
        
        //empleados.forEach(e -> logger.info(e.toString()));
        	empleados.forEach(e -> logger.info("ID: {}, Nombre: {}, Apellido: {}",
        			e.getId(), e.getNombre(), e.getApellido()));
    }
}