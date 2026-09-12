# devops-wisdom 🖥️

Generador de frases sobre DevOps con estética de terminal retro (monitor fósforo ámbar). Al presionar el botón (o `Enter`), muestra una frase aleatoria con una animación de escritura letra por letra.

Sin dependencias externas: sin frameworks, sin CDN, sin `npm install`. Solo HTML, CSS y JavaScript puro. Se abre directamente haciendo doble clic en `index.html`.

Este repositorio es la **base de trabajo** para la Evaluación Parcial N°1 de Ingeniería DevOps (DOY0101) — nivel intermedio. A partir de este punto, cada pareja debe construir su propio flujo de trabajo colaborativo aplicando Git, GitHub y GitHub Actions.

---

## 🚀 Cómo levantar el proyecto localmente

No requiere instalación de dependencias. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático simple:

```bash
npx serve .
```

---

## 📁 Estructura del proyecto

```
devops-wisdom/
├── index.html    → estructura de la página
├── style.css     → estética terminal ámbar
├── script.js     → lógica de animación y selección de frases
├── phrases.js    → banco de datos de frases
└── README.md
```

> ✏️ **A completar por la pareja.**
> Si agregan nuevos archivos durante el desarrollo (ej. `.github/workflows/`), actualicen este diagrama.

---

## 🌳 Estrategia de ramificación

> ✏️ **A completar por la pareja.**
> Indiquen aquí si optaron por **GitFlow** o **Trunk-Based Development**, y justifiquen la elección considerando el tamaño del proyecto, la frecuencia de cambios esperada, y el tipo de equipo (2 personas).

---

## 📝 Convenciones de commits

> ✏️ **A completar por la pareja.**
> Documenten aquí el formato que van a usar para sus mensajes de commit (ej. `feat: agrega filtro por categoría`, `fix: corrige frase sin autor`), y por qué eligieron ese formato.

---

## 🔀 Convenciones de naming de ramas

> ✏️ **A completar por la pareja.**
> Ejemplo de formato a definir: `feature/<nombre-descriptivo>`, `hotfix/<nombre-descriptivo>`. Expliquen brevemente el criterio que usaron.

---

## 🔍 Estrategia de revisión (Pull Requests)

> ✏️ **A completar por la pareja.**
> ¿Cómo revisaron los cambios antes de fusionarlos a `develop` o `main`? ¿Qué debía cumplir un Pull Request para ser aprobado?

---

## ⚙️ Automatización (CI/CD)

> ✏️ **A completar por la pareja.**
> Este proyecto no incluye ningún workflow de GitHub Actions todavía — es parte de su trabajo diseñarlo e implementarlo.
>
> **Objetivo sugerido:** usar este repositorio como si tuviera un entorno de *staging* (rama `develop`) y uno de *producción* (rama `main`), automatizando la integración de cambios entre ambos. Por ejemplo:
> - Al hacer `push` a `develop`: validar que el código no tenga errores evidentes (HTML/CSS/JS)
> - Al abrir un Pull Request hacia `main`: ejecutar una verificación o despliegue automático
>
> Documenten aquí qué automatizaron, por qué, y qué rol cumple dentro de un proceso CI/CD real.

---

## 🎨 Notas de diseño

Estética de terminal fósforo ámbar (monitor CRT retro), con animación de escritura letra por letra. Sin fuentes externas: usa la pila de fuentes monoespaciadas del sistema operativo, por lo que funciona sin conexión a internet.

---

## 👥 Autores

- Integrante 1 — Benjamin Jerez
- Integrante 2 — Dylan Monroy
- Integrante 3 — Nicolas Silva


## Estrategia de Ramificación: GitFlow

Para la gestión del control de versiones de este microservicio, hemos implementado la estrategia **GitFlow**. Esta elección técnica se justifica porque permite una estricta separación de entornos y un ciclo de vida de desarrollo altamente organizado, ideal para integraciones CI/CD:

*   **Ramas principales y de integración:** 
    *   `main`: Contiene exclusivamente código estable, probado y listo para el entorno de producción.
    *   `develop`: Actúa como la rama de integración principal donde se unifica todo el código nuevo antes de pasar a producción.
*   **Ramas de soporte:**
    *   `feature/*`: Se utilizan para desarrollar nuevas funcionalidades de forma aislada (ej. `feature/agregar-filtro-categorias`). Nacen de `develop` y se reintegran a esta mediante Pull Requests, asegurando la revisión del código en equipo.
    *   `hotfix/*`: Se reservan para resolver errores críticos en producción (ej. `hotfix/corregir-frase-vacia`). Bifurcan directamente desde `main` y, una vez solucionado el fallo, los cambios se fusionan tanto en `main` como en `develop` para evitar regresiones.

Esta estructura asegura la trazabilidad del código fuente, minimiza los conflictos en escenarios colaborativos y prepara la base perfecta para las futuras automatizaciones de despliegue.

---

## Conclusiones

### Benjamin Jerez
La implementación de la estrategia de ramificación nos ha permitido organizar el código de manera ordenada y colaborar sin generar conflictos graves, estableciendo una buena base para el futuro.

### Dylan Monroy


### Nicolas Silva
El desarrollo de este proyecto evidenció la importancia de adoptar buenas prácticas de DevOps desde etapas tempranas. Establecer un flujo de trabajo estructurado y ordenado facilitó la colaboración en equipo y dejó las bases listas para futuras automatizaciones de integración y entrega continua.
