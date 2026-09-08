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

- Integrante 1 — nombre
- Integrante 2 — nombre
