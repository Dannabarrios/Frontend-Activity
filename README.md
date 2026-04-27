## Hospital Frontend

Interfaz web para el sistema de gestión hospitalaria, desarrollada con HTML, CSS y JavaScript.

##  Backlog del proyecto
 [Ver Trello](https://trello.com/invite/b/69ed815871e87e484e520905/ATTId50722e7fa3749051150f88bc54ee799D57C8E9F/frontend)

##  Tecnologías
- HTML5
- CSS3
- JavaScript
- Axios (consumo de API)

##  Estructura del proyecto
```
hospital-frontend/
├── index.html          → Página principal
├── css/
│   └── styles.css      → Estilos globales
├── js/
│   ├── config.js       → URL base del backend por ambiente
│   ├── patients.js     → Lógica de pacientes
│   ├── doctors.js      → Lógica de médicos
│   └── appointments.js → Lógica de citas
└── pages/
├── patients.html   → Gestión de pacientes
├── doctors.html    → Gestión de médicos
└── appointments.html → Gestión de citas
```

##  Funcionalidades
-  Crear, consultar, actualizar y eliminar pacientes
-  Crear, consultar, actualizar y eliminar médicos
-  Crear, consultar, actualizar y eliminar citas médicas
-  Consultar por ID

##  Ramas
```
| Rama | Descripción |
|------|-------------|
| `main` | Producción, nunca se toca directo |
| `release` | Versión lista para entregar |
| `qa` | Ambiente de pruebas |
| `develop` | Integración del trabajo |
| `feature/HU-XX` | Una rama por historia de usuario |
```

##  Ambientes

```
| Ambiente | URL Backend |
|----------|------------|
| Desarrollo | http://localhost:8080 |
| QA | http://localhost:8080 |
| Producción | http://localhost:8080 |
```

##  Cómo ejecutar
Abre el archivo `index.html` en tu navegador o usa Live Server en VS Code.

##  Repositorios relacionados
- [Backend](https://github.com/Dannabarrios/Backend-Activity/)
- [Base de Datos](https://github.com/Dannabarrios/Bd-Activity/)