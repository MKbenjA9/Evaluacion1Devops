# devops-wisdom 🖥️

Generador de frases sobre DevOps con estética de terminal retro (monitor de fósforo ámbar). Al presionar el botón (o la tecla `Enter`), muestra una frase aleatoria con una animación de escritura letra por letra (*typewriter effect*), simulando una consola interactiva UNIX clásica.

Sin dependencias externas: sin frameworks, sin CDN, sin gestores de paquetes (`npm install`). Desarrollado exclusivamente en **HTML5**, **CSS3** y **JavaScript puro (Vanilla JS)**.

---

## 🚀 Cómo levantar el proyecto localmente

El proyecto no requiere instalación previa ni procesos de compilación. Puede ejecutarse de las siguientes maneras:

1. **Apertura directa:**
   Hacer doble clic en el archivo `index.html` para abrirlo directamente en cualquier navegador web moderno.

2. **Servidor local estático (opcional):**
   ```bash
   # Utilizando npx serve
   npx serve .

   # O utilizando Python 3
   python -m http.server 8080
   ```

---

## 📁 Estructura del proyecto

```text
devops-wisdom/
├── .github/
│   └── workflows/
│       └── ci.yml      → Pipeline de Integración Continua (GitHub Actions)
├── index.html          → Estructura semántica de la terminal y botones de acción
├── style.css           → Estética retro CRT ámbar, scanlines y animaciones
├── script.js           → Lógica de interacción, efecto de escritura y limpieza de pantalla
├── phrases.js          → Banco de frases y autores sobre cultura DevOps
├── .gitignore          → Exclusión de temporales y dependencias no permitidas
└── README.md           → Documentación técnica y estándares del proyecto
```

---

## 🌳 Estrategia de ramificación: GitFlow

Para la gestión del ciclo de vida del código fuente y el control de versiones, se adoptó formalmente la estrategia **GitFlow**.

### Justificación técnica
A diferencia de *Trunk-Based Development* (que prioriza la integración continua directa en una única rama troncal y requiere una suite de pruebas automatizadas con despliegue continuo extremadamente madura), **GitFlow** proporciona un aislamiento robusto por entornos y un gobierno estricto para equipos colaborativos:

* **Separación de entornos:** Permite mapear directamente el estado del código con los entornos de despliegue (`develop` para *Staging/QA* y `main` para *Producción*).
* **Desarrollo en paralelo y aislado:** Las funcionalidades se construyen en ramas dedicadas sin interferir con el trabajo en progreso ni poner en riesgo la estabilidad de la rama principal.
* **Respuesta ágil a incidentes:** Las ramas de `hotfix` permiten corregir fallos críticos en producción de manera inmediata y sincronizarlos posteriormente tanto a `main` como a `develop`.

### Topología de ramas
* **`main`**: Contiene únicamente código estable, probado y listo para producción. Cada merge en `main` representa un release funcional.
* **`develop`**: Rama de integración continua. Agrupa los cambios listos para el siguiente despliegue y sirve como base para crear nuevas características.
* **`feature/*`**: Ramas de corta/mediana duración originadas a partir de `develop`. Alojan el desarrollo de nuevas funcionalidades (ej. `feature/agregar-boton-clear`).
* **`hotfix/*`**: Ramas de emergencia que nacen directamente de `main` para resolver bugs críticos en producción (ej. `hotfix/corregir-autor-frase-inicial`). Se integran de vuelta tanto en `main` como en `develop`.
* **`release/*`**: Ramas para estabilización de versión previa al paso definitivo a producción.

---

## 📝 Convenciones de commits

El equipo aplica el estándar **Conventional Commits** (v1.0.0) para garantizar mensajes claros, trazabilidad semántica y compatibilidad con generación automática de *changelogs*.

### Formato estándar
```text
<tipo>(<alcance opcional>): <descripción concisa en modo imperativo>

[cuerpo explicativo opcional]

[pie de commit / referencias a tickets o PRs]
```

### Tipos permitidos
* **`feat`**: Incorporación de una nueva funcionalidad visible para el usuario (ej. `feat: agregar boton de limpieza de pantalla`).
* **`fix`**: Corrección de un error o bug (ej. `fix(phrases): corregir autor de la primera frase de sabiduria`).
* **`docs`**: Cambios exclusivos en la documentación (ej. `docs: actualizar README con especificacion de CI/CD`).
* **`style`**: Cambios de formato o estilos visuales que no alteran la lógica (ej. `style: ajustar padding y colores del boton clear`).
* **`refactor`**: Reestructuración del código sin alterar su comportamiento externo (ej. `refactor(script): optimizar selector de elementos en pantalla`).
* **`ci`**: Modificaciones en archivos y configuraciones de CI/CD (ej. `ci: configurar workflow de validacion en github actions`).
* **`chore`**: Tareas de mantenimiento general o configuración de repositorio (ej. `chore: actualizar reglas en .gitignore`).

---

## 🔀 Convenciones de naming de ramas

Las ramas deben crearse con nombres autodescriptivos en minúsculas (*kebab-case*), precedidas por su prefijo de categoría:

| Tipo de Rama | Patrón de Nombres | Ejemplo | Descripción |
| :--- | :--- | :--- | :--- |
| **Feature** | `feature/<descripcion-corta>` | `feature/agregar-boton-clear` | Nueva característica o interacción |
| **Hotfix** | `hotfix/<descripcion-corta>` | `hotfix/corregir-frase-vacia` | Parche crítico urgente sobre `main` |
| **Bugfix** | `bugfix/<descripcion-corta>` | `bugfix/ajustar-animacion-cursor` | Corrección de fallos en etapa de `develop` |
| **Release** | `release/v<version>` | `release/v1.1.0` | Preparación y congelamiento de versión |
| **Documentation** | `docs/<descripcion-corta>` | `docs/guia-de-contribucion` | Actualización documental mayor |

---

## 🔍 Estrategia de revisión (Pull Requests)

Los Pull Requests (PR) actúan como el punto de control de calidad fundamental antes de cualquier fusión hacia `develop` o `main`.

### Criterios de Aceptación para Merge:
1. **Pipeline CI Verde:** El flujo automatizado de GitHub Actions (`CI Pipeline`) debe finalizar con estado exitoso.
2. **Revisión por Pares (Peer Review):** Se exige al menos la aprobación de un miembro del equipo tras inspeccionar la legibilidad, estándares de código y consistencia arquitectónica.
3. **Descripción Clara:** El PR debe incluir un resumen del cambio realizado, contexto del problema y evidencia de prueba local.
4. **Sin Conflictos:** La rama debe estar actualizada respecto a su base (`develop` o `main`) y libre de conflictos de integración.
5. **Estrategia de Integración:** Se utiliza fusión explícita sin avance rápido (`Merge Commit --no-ff`) para preservar la trazabilidad histórica de la bifurcación en el grafo de Git.

---

## ⚙️ Automatización (CI/CD Pipeline)

Se ha implementado un pipeline de Integración Continua (CI) mediante **GitHub Actions** ubicado en `.github/workflows/ci.yml`.

### Disparadores (*Triggers*)
* `push` hacia la rama `develop`: Valida de forma temprana cualquier integración en el entorno de desarrollo (*Shift-Left Testing*).
* `pull_request` con destino a `main` o `develop`: Actúa como puerta de calidad obligatoria (*quality gate*) previa a la aprobación y fusión de código.

### Fases de Validación del Job (`validate`)
1. **Checkout del Repositorio:** Descarga el código fuente en un entorno virtualizado Ubuntu.
2. **Setup de Node.js:** Prepara el runtime de Node.js v20 para las herramientas de análisis.
3. **Verificación de Sintaxis JavaScript (`node --check`):** Valida la integridad sintáctica de `script.js` y `phrases.js` sin ejecutar dependencias ni navegadores.
4. **Política de Cero Dependencias (Vanilla JS Guard):** Verifica y asegura que no se hayan introducido por error archivos como `package.json`, `package-lock.json`, `yarn.lock` o la carpeta `node_modules`.

---

## 🎨 Notas de diseño

* **Paleta de Colores:** Monitor de fósforo ámbar retro (`#FFB000`, `#9C6C00`, `#0B0C0A`).
* **Efectos CRT:** Capa de líneas de exploración (*scanlines*), resplandor sutil (*glow*) y parpadeo de cursor de consola.
* **Accesibilidad:** Detección de la preferencia del sistema `prefers-reduced-motion` para usuarios que prefieren prescindir de animaciones de tipeo.
* **Independencia de Red:** Tipografías monoespaciadas nativas del sistema operativo, garantizando funcionamiento *offline* total.

---

## 👥 Autores

* **Benjamin Jerez**
* **Dylan Monroy**
* **Nicolas Silva**

---

## 🤖 Declaración de Uso de IA

En cumplimiento con los estándares de integridad académica y profesional, declaramos que para el desarrollo de esta actividad se utilizó asistencia de Inteligencia Artificial (asistente de desarrollo) como herramienta de consulta y apoyo en:

* Sugerencia de estructuración y buenas prácticas para la configuración del workflow de GitHub Actions (`ci.yml`).
* Redacción y estructuración formal de la documentación técnica y convenciones DevOps en el `README.md`.
* Optimización de validaciones sintácticas nativas en Node.js.

Todo el código generado, la configuración del pipeline, la arquitectura GitFlow y las modificaciones de interfaz fueron **revisados, probados, adaptados y validados manualmente** por los integrantes del equipo para garantizar su correcto funcionamiento y cumplimiento con los requerimientos del proyecto.