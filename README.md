# devops-wisdom 🖥️

**devops-wisdom** es una aplicación web interactiva que genera y expone frases reflexivas, humorísticas e instructivas sobre la cultura DevOps, control de versiones con Git, integración continua (CI/CD) y colaboración en equipos de ingeniería de software. 

La interfaz simula la experiencia visual y operativa de una consola de terminal UNIX retro con monitor CRT de fósforo ámbar, renderizando cada sentencia con un efecto de escritura dinámica letra por letra (*typewriter effect*).

### Objetivo del proyecto
El propósito central de este proyecto es servir como caso de estudio y plataforma práctica para la adopción rigurosa de metodologías DevOps:
- Aplicación de un modelo estructurado de control de versiones con **GitFlow**.
- Colaboración efectiva en equipo mediante **GitHub Pull Requests** y revisiones de código asistidas por pares.
- Implementación de un pipeline de **Integración Continua (CI)** con **GitHub Actions** que salvaguarde la calidad del código y la política de cero dependencias en cada integración.
- Entrega de un producto liviano, accesible y ejecutable en cualquier navegador sin dependencias ni compiladores externos.

---

## ⚡ Funcionalidades

El producto unificado integra todas las características desarrolladas por el equipo:

1. **Generador dinámico de frases (`devops --quote`):** Selección aleatoria de frases de sabiduría DevOps evitando repeticiones consecutivas.
2. **Filtro de frases por categorías:** Menú desplegable interactivo que permite clasificar y consultar frases según los dominios clave de DevOps:
   - `git`: Control de versiones, estrategias de ramas y commits.
   - `ci-cd`: Pipelines, automatización, validaciones y pruebas.
   - `cultura`: Colaboración, comunicación entre equipos y gestión de incidentes.
   - `infraestructura`: Servidores, contenedores e infraestructura como código (IaC).
   - `todas`: Consulta global en todo el catálogo de frases.
3. **Comando parametrizado en terminal:** Al filtrar por categoría, la terminal simula la ejecución real con el argumento correspondiente (ej. `devops --quote --category=ci-cd`).
4. **Contador dinámico de entradas:** Indicador en tiempo real del número de frases disponibles según la categoría seleccionada.
5. **Limpieza de pantalla (`clear`):** Botón dedicado en el pie de la terminal para despejar la consola de consultas previas sin perder el estado ni recargar el sitio.
6. **Manejo defensivo y estado sin resultados:**
   - Sanitización de entradas para descartar frases vacías o con autores no definidos.
   - Mensaje informativo claro en caso de que una categoría no contenga elementos o el banco de datos sufra anomalías.
   - Frase de fallback segura para garantizar que la terminal nunca quede en blanco o emita texto indefinido.
7. **Control por teclado y accesibilidad:**
   - Ejecución rápida mediante la tecla <kbd>Enter</kbd> (deshabilitada cuando el foco está en el selector de categoría para permitir navegación accesible).
   - Respeto del estándar `prefers-reduced-motion` del sistema operativo: omite la animación de escritura si el usuario tiene deshabilitadas las animaciones por accesibilidad.
8. **Diseño retro responsivo:** Monitor CRT de fósforo ámbar con líneas de barrido (*scanlines*), barra de título con controles estilo ventana y adaptabilidad fluida a pantallas móviles.

---

## 🛠️ Tecnologías

El proyecto se construyó bajo una política estricta de **cero dependencias externas y cero frameworks**, priorizando máxima portabilidad y rendimiento:

* **HTML5 semántico:** Estructuración de la ventana terminal (`main`, `header`, `section`, `footer`) y controles de interfaz accesibles (`select`, `button`).
* **CSS3 moderno (Vanilla CSS):** Paleta temática ámbar fósforo (`#FFB000`, `#0B0C0A`), degradados de líneas de barrido, tipografías monoespaciadas del sistema (`ui-monospace`, `Consolas`, `JetBrains Mono`), sombras glow retro y diseño responsivo sin librerías externas.
* **JavaScript estándar (Vanilla JS ES6+):** Lógica asíncrona mediante promesas y `requestAnimationFrame` para el efecto de tipeo, manipulación del DOM, arquitectura defensiva de filtrado y control de eventos.
* **GitHub Actions:** Orquestación del pipeline de integración continua en contenedores Ubuntu.
* **Node.js (utilidad de análisis en CI):** Utilizado exclusivamente en el entorno virtual de CI para comprobación sintáctica estricta mediante el motor nativo de V8 (`node --check`).

---

## 🚀 Instalación y ejecución

El proyecto está diseñado para funcionar de manera inmediata en cualquier entorno moderno:

### 1. Clonar el repositorio
```bash
git clone https://github.com/MKbenjA9/Evaluacion1Devops.git
cd Evaluacion1Devops
```

### 2. Ejecutar la aplicación
No se requiere instalar dependencias mediante `npm install` ni compilar código. Puede ejecutarse a través de cualquiera de estas alternativas:

* **Opción A (Apertura directa):**
  Hacer doble clic sobre el archivo `index.html` en el explorador de archivos para abrirlo en su navegador preferido.

* **Opción B (Servidor estático con npx):**
  ```bash
  npx serve .
  ```

* **Opción C (Servidor HTTP con Python):**
  ```bash
  python -m http.server 8080
  ```
  Luego ingresar a `http://localhost:8080` en el navegador.

---

## 📁 Estructura del repositorio

```text
Evaluacion1Devops/
├── .github/
│   └── workflows/
│       └── ci.yml          # Workflow de Integración Continua (GitHub Actions)
├── .gitignore              # Reglas de exclusión de archivos temporales
├── index.html              # Estructura de la aplicación web y elementos de terminal
├── phrases.js              # Base de datos local de frases clasificadas y autores
├── script.js               # Lógica interactiva, filtros, typewriter y manejo de eventos
├── style.css               # Estilos visuales de terminal CRT ámbar, animaciones y responsive
└── README.md               # Documentación técnica integral del proyecto
```

---

## 🌳 Estrategia de ramificación: GitFlow

Para el ciclo de vida del software se implementa de manera estricta el modelo **GitFlow**.

```text
  main  ●───────────────────────────● (Release v1.0.0)
         \                         /
develop   ●────────●────────●─────● (Integración continúa)
           \      / \      /
 feature/   ●────●   \    /         (Nuevas funcionalidades)
                      \  /
 hotfix/   ────────────●●           (Parche crítico sincronizado)
```

### Funciones de cada rama

1. **`main` (Producción):**
   - Aloja exclusivamente código estable, validado y probado listo para ser desplegado.
   - Cada commit en `main` representa un hito de entrega o versión formalmente etiquetada (*tag*).
   - No se envían commits directos a `main`; únicamente recibe fusiones de `develop` (al cerrar versiones) o de `hotfix/*` (ante incidentes críticos).

2. **`develop` (Integración de Desarrollo):**
   - Es la rama central de trabajo colaborativo y actúa como el entorno de pre-producción o *staging*.
   - Concentra la integración continua de todas las características completadas y revisadas.
   - Sirve como punto de partida para crear ramas `feature/*` y punto de destino para sus Pull Requests.

3. **`feature/*` (Ramas de funcionalidad):**
   - Se desprenden siempre a partir de `develop`.
   - Se utilizan para construir nuevas funcionalidades de manera aislada (ej. `feature/agregar-filtro-categorias`).
   - Al culminar el desarrollo, se reintegran a `develop` mediante un Pull Request.

4. **`hotfix/*` (Ramas de corrección de emergencia):**
   - Se ramifican directamente desde `main` cuando se descubre un fallo crítico en el entorno de producción que no puede esperar al siguiente ciclo de release.
   - Una vez resuelto y validado el problema, se integran a `main` y simultáneamente deben sincronizarse de vuelta a `develop` para evitar regresiones futuras.

---

## 🔀 Convenciones de nomenclatura de ramas

Las ramas deben utilizar identificadores en minúsculas (*kebab-case*) acompañados de un prefijo que describa su propósito:

| Tipo de rama | Patrón de nomenclatura | Ejemplo concreto | Cuándo utilizarse |
| :--- | :--- | :--- | :--- |
| **Feature** | `feature/<nombre-descriptivo>` | `feature/agregar-filtro-categorias` | Para desarrollar nuevas capacidades o componentes. Nace de `develop` y se integra en `develop`. |
| **Hotfix** | `hotfix/<nombre-descriptivo>` | `hotfix/corregir-frase-vacia` | Para solucionar errores críticos en el código en producción (`main`). Nace de `main` y se sincroniza con `main` y `develop`. |
| **Fix / Bugfix** | `fix/<nombre-descriptivo>` | `fix/corregir-estilos` | Para corregir defectos menores durante la fase de desarrollo e integración. Nace de `develop` y se integra en `develop`. |
| **Docs** | `docs/<nombre-descriptivo>` | `docs/actualizar-readme` | Para actualizaciones y adiciones exclusivas a la documentación técnica del repositorio. |

---

## 📝 Convenciones de commits

El proyecto adopta formalmente el estándar **Conventional Commits** (v1.0.0) para garantizar consistencia en el historial de Git, facilitar auditorías y habilitar la trazabilidad:

```text
<tipo>(<alcance opcional>): <descripción concisa en imperativo y minúsculas>

[cuerpo explicativo opcional detallando el motivo del cambio]

[referencias opcionales a Pull Requests o issues]
```

### Tipos de commits permitidos

* **`feat:`** Nueva funcionalidad introducida en el proyecto.
  - Ejemplo: `feat: agrega filtro por categoria`
  - Ejemplo: `feat: agrega boton clear para limpiar la consola`
* **`fix:`** Corrección de un fallo o error en la aplicación.
  - Ejemplo: `fix: corrige el estado sin resultados`
  - Ejemplo: `fix: previene la visualizacion de frases vacias en la terminal`
* **`docs:`** Modificaciones o adiciones en la documentación.
  - Ejemplo: `docs: completa el README`
  - Ejemplo: `docs: documenta la estrategia de integracion de pull requests`
* **`ci:`** Configuración o ajustes en pipelines de integración continua.
  - Ejemplo: `ci: integra workflow de validacion`
  - Ejemplo: `ci: restringe permisos minimos y agrega chequeo de archivos requeridos`
* **`style:`** Cambios visuales, espaciados o estilos CSS que no modifican la lógica.
  - Ejemplo: `style: ajusta estilos del filtro`
  - Ejemplo: `style: anade efectos hover en el selector de categorias`
* **`refactor:`** Reestructuración de código que no añade funcionalidades ni repara errores.
  - Ejemplo: `refactor: simplifica funcion de seleccion aleatoria`
* **`chore:`** Tareas administrativas, mantenimiento o ajustes en `.gitignore`.
  - Ejemplo: `chore: actualiza reglas de exclusion local`

---

## 🔍 Estrategia de Pull Requests

Los Pull Requests (PR) constituyen el mecanismo obligatorio de control de calidad antes de fusionar cualquier línea de código.

### Directrices generales de Pull Requests
1. **Ramas de origen y destino coherentes:**
   - Para funcionalidades: de `feature/*` hacia `develop`.
   - Para versiones estables: de `develop` hacia `main`.
   - Para hotfixes: de `hotfix/*` hacia `main`, y posterior sincronización hacia `develop`.
2. **Revisión del diff previo a la aprobación:** El revisor asignado debe examinar minuciosamente la pestaña *Files changed*, asegurándose de que:
   - No existan archivos accidentales (ej. `node_modules`, `.DS_Store`, temporales).
   - No haya código duplicado ni dependencias externas encubiertas.
   - El código mantenga la coherencia estilística del proyecto.
3. **Validación automática de GitHub Actions:** El PR debe contar con el estado exitoso (check verde) del pipeline de CI antes de poder ser fusionado.
4. **Verificación de conflictos:** La rama debe estar al día con su rama de destino. Si existen conflictos, deben resolverse en la rama de origen antes del merge.
5. **Criterios de fusión:** Se utiliza la modalidad **Merge Commit (`--no-ff`)** para dejar un registro explícito en el árbol de Git que refleje la unión de ramas.

### Ejemplo práctico de Pull Request: `feature/agregar-filtro-categorias` hacia `develop`

* **Título:** `feat: agregar selector y filtro de frases por categorías`
* **Rama de origen:** `feature/agregar-filtro-categorias`
* **Rama de destino:** `develop`
* **Descripción del Pull Request:**
  > **Resumen del cambio:**  
  > Se implementa un selector `<select id="category-filter">` en la terminal que permite a los usuarios filtrar frases por `git`, `ci-cd`, `cultura` e `infraestructura`.
  > 
  > **Archivos modificados:**
  > - `index.html`: Incorporación del elemento select accesible.
  > - `phrases.js`: Clasificación de cada frase con su respectiva categoría.
  > - `script.js`: Actualización del contador dinámico y adaptación del comando animado para reflejar `devops --quote --category=<categoria>`.
  > - `style.css`: Estilos visuales retro y diseño adaptado a móviles para el nuevo selector.
  > 
  > **Pruebas realizadas:**
  > - Verificación sintáctica con `node --check`.
  > - Pruebas en navegador con selección de categorías y comportamiento ante filtros vacíos.
  > - Comprobación de que la tecla Enter no interfiere con la selección en el menú desplegable.
  > 
  > **Estado de CI:** Pipeline de GitHub Actions ejecutado con éxito.

---

## ⚙️ Integración continua con GitHub Actions

El repositorio cuenta con un pipeline automatizado implementado en `.github/workflows/ci.yml`.

### Disparadores (*Triggers*)
El workflow se activa automáticamente bajo los siguientes eventos:
1. `push` hacia la rama `develop`: Ejecución temprana (*Shift-Left*) ante cada cambio integrado al entorno de desarrollo.
2. `pull_request` dirigidos a las ramas `main` y `develop`: Calificación y validación estricta previa a la aprobación y fusión de código.

### Aspectos validados por el pipeline
El job `validate` ejecuta cuatro etapas secuenciales:
1. **Verificación de archivos esenciales:** Comprueba mediante un script shell que los archivos estructurales obligatorios (`index.html`, `style.css`, `script.js`, `phrases.js`, `README.md`) existan físicamente en el repositorio.
2. **Preparación de entorno:** Configura el runtime de Node.js v20 sobre el runner `ubuntu-latest`.
3. **Validación de sintaxis JavaScript:** Ejecuta el comando nativo `node --check script.js` y `node --check phrases.js` para detectar errores léxicos o de sintaxis antes de llegar a los navegadores.
4. **Política estricta Vanilla JS:** Escanea el espacio de trabajo para comprobar la ausencia total de gestores de paquetes y archivos prohibidos (`package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, carpeta `node_modules`).

### Estado de las ejecuciones y consulta
* **Ejecución exitosa (Verde):** Todos los archivos requeridos están presentes, el código JS es sintácticamente impecable y no se violó la política de cero dependencias.
* **Ejecución fallida (Roja):** Se interrumpe el pipeline si falta un archivo estructural, si existe un error de sintaxis en el código JavaScript o si alguien introdujo accidentalmente dependencias de Node.
* **Consulta de resultados:** Se puede inspeccionar el historial y los logs paso a paso ingresando a la pestaña **Actions** en el repositorio de GitHub: `https://github.com/MKbenjA9/Evaluacion1Devops/actions`.

---

## 👥 Flujo de colaboración del equipo

El equipo de trabajo está integrado por:
* **Benjamin Jerez**
* **Dylan Monroy**
* **Nicolas Silva**

### Protocolo de colaboración sin colisiones
Para colaborar de forma armoniosa y evitar sobreescrituras accidentales, el equipo sigue el siguiente protocolo:

1. **Sincronización inicial:** Cada integrante actualiza su rama `develop` local antes de comenzar cualquier tarea (`git checkout develop && git pull origin develop`).
2. **Aislamiento por funcionalidades:** Cada miembro crea una rama específica para su asignación (`git checkout -b feature/nombre-tarea develop`).
3. **Commits atómicos y descriptivos:** Se registran avances en commits pequeños acompañados de mensajes bajo Conventional Commits.
4. **Publicación y Pull Request:** Se envía la rama a GitHub (`git push -u origin feature/nombre-tarea`) y se abre un Pull Request dirigido hacia `develop`.
5. **Revisión cruzada y validación:** Otro integrante del equipo inspecciona el Pull Request, verifica que el pipeline de GitHub Actions esté en verde y deja comentarios o aprobación.
6. **Fusión formal:** El Pull Request es fusionado mediante un commit de integración a `develop`.
7. **Paso a producción:** Cuando `develop` alcanza un estado de release completo y probado por los tres integrantes, se abre un Pull Request final desde `develop` hacia `main`.

---

## 🤖 Declaración de uso de Inteligencia Artificial

En cumplimiento con los principios de transparencia académica y profesional, declaramos que se utilizó una herramienta de Inteligencia Artificial como asistente de desarrollo para:
- Diagnosticar el estado del árbol de Git y las inconsistencias de las ramas no integradas.
- Asistir en la resolución de conflictos de fusión entre las ramas de características y hotfix.
- Estructurar y redactar la documentación técnica del `README.md` alineada a los estándares de la evaluación.
- Perfeccionar las comprobaciones de archivos y permisos del flujo de GitHub Actions (`ci.yml`).

Todos los cambios, integraciones, pruebas sintácticas y verificaciones en el navegador fueron **inspeccionados, validados y ejecutados técnicamente** para asegurar el correcto funcionamiento del software.

---

## 📌 Conclusiones del equipo

### Benjamin Jerez
La implementación formal de GitFlow y el uso de Pull Requests nos permitió ordenar el trabajo del equipo, asegurando que cada funcionalidad y corrección pase por una etapa de integración en `develop` antes de tocar `main`. Esto resolvió las confusiones de merges directos y fortaleció la estabilidad del proyecto.

### Dylan Monroy
La adopción de GitHub Actions como puerta de enlace obligatoria demostró la importancia del *Shift-Left Testing*. El pipeline nos garantiza que ningún cambio con errores de sintaxis o dependencias accidentales pueda integrarse a las ramas protegidas, ahorrando tiempo en depuración manual.

## Estrategia de Ramificación: GitFlow

Para la gestión del control de versiones de este proyecto, hemos implementado la estrategia **GitFlow**, ya que permite organizar el desarrollo, integrar las funcionalidades de forma controlada y mantener una versión estable para producción.

- **Ramas principales y de integración:**
  - `main`: contiene el código estable, probado y listo para producción.
  - `develop`: integra las funcionalidades y correcciones antes de su incorporación a producción.

- **Ramas de soporte:**
  - `feature/*`: permiten desarrollar nuevas funcionalidades de forma aislada. Se crean desde `develop` y se integran mediante Pull Requests. Ejemplo: `feature/agregar-filtro-categorias`.
  - `hotfix/*`: se utilizan para corregir errores críticos detectados en producción. Se crean desde `main` y, una vez validadas, sus cambios se integran tanto en `main` como en `develop`.

Esta estructura mejora la trazabilidad del código, facilita la colaboración entre los integrantes y reduce el riesgo de introducir errores durante las integraciones.

---

## Conclusiones

### Benjamin Jerez

La implementación de la estrategia de ramificación nos ha permitido organizar el código de manera ordenada y colaborar sin generar conflictos graves, estableciendo una buena base para el futuro.

### Dylan Monroy

Definir convenciones para los commits y el nombrado de ramas fue importante para mantener un historial limpio y comprensible. Además, el uso de Pull Requests como mecanismo de revisión nos permitió comprender la importancia de verificar los cambios antes de incorporarlos al proyecto.

### Nicolas Silva

El desarrollo de este proyecto evidenció la importancia de adoptar buenas prácticas de DevOps desde etapas tempranas. La separación de responsabilidades entre ramas de funcionalidades (`feature/*`) y correcciones urgentes (`hotfix/*`), junto con la documentación de las convenciones de trabajo, contribuye a una colaboración más organizada y a una integración controlada de los cambios.

La experiencia también nos permitió comprender que desarrollar una funcionalidad no es suficiente: es necesario revisarla, probarla e integrarla correctamente para que forme parte del producto final.