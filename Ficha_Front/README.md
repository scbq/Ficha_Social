# cw-viviendas-fiscales-19

<!--
Estructura modular proyecto
📁 src/
    📁 app/
        📁 auth/ → Contiene servicios globales como AuthService, HttpInterceptor, etc.
            📁 login/
            📁 services/
            📁 models/
            📜 auth.module.ts
        📁 shared/ → Componentes reutilizables como botones, modales, pipes y directivas.
        📁 core/ → Módulos por funcionalidad, por ejemplo:
            📁 mi-fach/
                📁 components/
                📁 services/
                📁 models/
                📜 mi-fach.module.ts
            📁 mi-oficina/
                📁 components/
                📁 services/
                📁 models/
                📜 mi-oficina.module.ts
        📜 app.module.ts
        📜 app.component.ts
📁 assets/ → Archivos estáticos
📁 environments/ → Configuraciones por entorno (dev, prod,test)
📜 main.ts → Punto de entrada
📜 index.html → HTML principal
📜 styles.scss → Estilos globales
-->
