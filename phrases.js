/**
 * phrases.js
 * -----------------------------------------------------------------
 * Banco de frases sobre DevOps que consume script.js.
 * Cada entrada sigue el formato:
 * { text: "...", author: "...", category: "..." }
 * Categorías: "git", "ci-cd", "cultura", "infraestructura"
 * -----------------------------------------------------------------
 */

const PHRASES = [
  {
    text: "Un commit sin mensaje claro es una promesa que le hiciste a tu yo del futuro y no vas a cumplir.",
    author: "Anónimo DevOps",
    category: "git"
  },
  {
    text: "La rama main no perdona: por eso existen las otras ramas.",
    author: "Anónimo DevOps",
    category: "git"
  },
  {
    text: "Trunk-Based Development es fe ciega en tus tests. GitFlow es desconfianza organizada.",
    author: "Anónimo DevOps",
    category: "git"
  },
  {
    text: "Un pipeline verde no significa que todo esté bien. Significa que nadie lo ha roto todavía hoy.",
    author: "Anónimo DevOps",
    category: "ci-cd"
  },
  {
    text: "La automatización no elimina errores humanos, los hace más rápidos y más consistentes.",
    author: "Anónimo DevOps",
    category: "ci-cd"
  },
  {
    text: "No hay incidente en producción que un buen rollback no pueda calmar, al menos por ahora.",
    author: "Anónimo DevOps",
    category: "ci-cd"
  },
  {
    text: "DevOps no es instalar Docker. Es que Dev y Ops se hablen antes de que algo se caiga.",
    author: "Anónimo DevOps",
    category: "cultura"
  },
  {
    text: "Cada Pull Request es una conversación, no un examen.",
    author: "Anónimo DevOps",
    category: "cultura"
  },
  {
    text: "El mejor momento para hacer merge era hace dos días. El segundo mejor momento es antes de que main cambie otra vez.",
    author: "Anónimo DevOps",
    category: "cultura"
  },
  {
    text: "Si funciona en tu máquina, felicitaciones: acabas de descubrir un nuevo entorno de producción.",
    author: "Anónimo DevOps",
    category: "infraestructura"
  },
  {
    text: "La infraestructura como código es la única garantía de que tu desastre sea 100% reproducible.",
    author: "Anónimo DevOps",
    category: "infraestructura"
  }
];
