# TaskManagerColab

## Descripción

TaskManagerColab es una aplicación web desarrollada con HTML, CSS y JavaScript cuyo propósito es simular la gestión de tareas dentro de un equipo de trabajo. El proyecto permite visualizar tareas predefinidas, asignarlas a usuarios simulados y consultar información general del sistema mediante una interfaz sencilla e intuitiva.

Además de sus funcionalidades básicas, el proyecto tiene como objetivo principal demostrar el uso de herramientas de control de versiones y trabajo colaborativo mediante Git y GitHub.

---

## Objetivos

* Simular un sistema de administración de tareas.
* Aplicar buenas prácticas de organización de proyectos web.
* Implementar un flujo de trabajo colaborativo utilizando Git y GitHub.
* Gestionar ramas, commits, pull requests y procesos de integración.
* Fortalecer las habilidades de desarrollo en equipo.

---

## Funcionalidades

### Página principal

* Presentación general del proyecto.
* Descripción de objetivos y alcance.
* Navegación entre módulos.

### Inicio de sesión (simulado)

* Formulario de autenticación.
* Validación local sin conexión a base de datos.
* Acceso demostrativo para fines académicos.

### Gestión de tareas

* Visualización de tareas precargadas.
* Asignación de usuarios simulados.
* Cambio de estado de tareas.
* Interfaz de seguimiento de actividades.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* Git
* GitHub

---

## Estructura del proyecto

```text
TaskManagerColab
│
├── assets
│
├── scripts
│   ├── index.js
│   ├── login.js
│   └── tasks.js
│
├── styles
│   ├── index.css
│   ├── login.css
│   └── tasks.css
│
├── views
│   ├── index.html
│   ├── login.html
│   └── tasks.html
│
└── README.md
```

---

## Flujo de trabajo Git

El proyecto utiliza una estrategia basada en ramas para facilitar el desarrollo colaborativo.

### Ramas principales

* `main`: versión estable del proyecto.
* `develop`: rama de integración y pruebas.

### Ramas de funcionalidades

* `feature/home`
* `feature/login`
* `feature/tasks`

Cada integrante desarrolla su funcionalidad en una rama independiente y posteriormente realiza un Pull Request para integrar los cambios.

---

## Equipo de desarrollo

| Integrante                 | Responsabilidad                                                             |
| -------------------------- | --------------------------------------------------------------------------- |
| Administrador (Adrián)     | Configuración inicial, documentación, integración y gestión del repositorio |
| Francisco                  | Módulo de inicio de sesión                                                  |
| Jorge                      | Gestión de tareas                                                           |
| María                      | Página principal y navegación                                               |

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/xCorick/TaskManagerColab.git
```

2. Abrir la carpeta del proyecto.

3. Ejecutar el archivo `views/index.html` en un navegador web.

---

## Estado del proyecto

Proyecto académico desarrollado con fines educativos para demostrar el uso de Git, GitHub y metodologías de trabajo colaborativo en equipos de desarrollo.

---

## Licencia

Proyecto de uso académico y educativo.
