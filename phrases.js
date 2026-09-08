/**
 * phrases.js
 * -----------------------------------------------------------------
 * Banco de frases sobre DevOps que consume script.js.
 * Cada entrada sigue el formato:
 * { text: "...", author: "...", category: "..." }
 * -----------------------------------------------------------------
 */

const PHRASES = [
  {
    text: "Un commit sin mensaje claro es una promesa que le hiciste a tu yo del futuro y no vas a cumplir.",
    author: "Banco inicial",
    category: "Git"
  },
  {
    text: "La rama main no perdona: por eso existen las otras ramas.",
    author: "Banco inicial",
    category: "Git"
  },
  {
    text: "DevOps no es instalar Docker. Es que Dev y Ops se hablen antes de que algo se caiga.",
    author: "Banco inicial",
    category: "DevOps"
  },
  {
    text: "Si funciona en tu máquina, felicitaciones: acabas de descubrir un nuevo entorno de producción.",
    author: "Banco inicial",
    category: "DevOps"
  },
  {
    text: "Un pipeline verde no significa que todo esté bien. Significa que nadie lo ha roto todavía hoy.",
    author: "Banco inicial",
    category: "CI/CD"
  },
  {
    text: "La automatización no elimina errores humanos, los hace más rápidos y más consistentes.",
    author: "Banco inicial",
    category: "CI/CD"
  },
  {
    text: "Cada Pull Request es una conversación, no un examen.",
    author: "Banco inicial",
    category: "Colaboración"
  },
  {
    text: "El mejor momento para hacer merge era hace dos días. El segundo mejor momento es antes de que main cambie otra vez.",
    author: "Banco inicial",
    category: "Colaboración"
  },
  {
    text: "Trunk-Based Development es fe ciega en tus tests. GitFlow es desconfianza organizada.",
    author: "Banco inicial",
    category: "Git"
  },
  {
    text: "No hay incidente en producción que un buen rollback no pueda calmar, al menos por ahora.",
    author: "Banco inicial",
    category: "DevOps"
  }
];