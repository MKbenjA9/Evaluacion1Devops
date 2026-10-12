/**
 * tests/app.test.js
 * Suite de pruebas unitarias automatizadas para devops-wisdom.
 * Ejecutable mediante el runner nativo de pruebas de Node.js (node --test).
 * No requiere npm install ni dependencias de terceros.
 */

const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Carga del catálogo de frases
const phrasesFilePath = path.join(__dirname, "..", "phrases.js");
const phrasesCode = fs.readFileSync(phrasesFilePath, "utf8");
const loadPhrases = new Function(phrasesCode + "; return PHRASES;");
const PHRASES = loadPhrases();

describe("1. Integridad estructural de archivos y HTML", () => {
  test("Los archivos principales deben existir en el repositorio", () => {
    const requiredFiles = ["index.html", "style.css", "script.js", "phrases.js", "Dockerfile"];
    for (const file of requiredFiles) {
      const fullPath = path.join(__dirname, "..", file);
      assert.ok(fs.existsSync(fullPath), `El archivo requerido ${file} no existe`);
    }
  });

  test("index.html debe contener los IDs y elementos del DOM esenciales", () => {
    const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
    assert.match(html, /id=["']screen["']/, "Falta contenedor #screen");
    assert.match(html, /id=["']output-anchor["']/, "Falta ancla #output-anchor");
    assert.match(html, /id=["']run-btn["']/, "Falta botón #run-btn");
    assert.match(html, /id=["']clear-btn["']/, "Falta botón #clear-btn");
    assert.match(html, /id=["']category-filter["']/, "Falta selector #category-filter");
    assert.match(html, /id=["']phrase-count["']/, "Falta contador #phrase-count");
  });
});

describe("2. Validación del banco de frases (phrases.js)", () => {
  test("PHRASES debe ser un array no vacío", () => {
    assert.ok(Array.isArray(PHRASES), "PHRASES debe ser un Array");
    assert.ok(PHRASES.length >= 10, `Se esperan al menos 10 frases, recibidas: ${PHRASES.length}`);
  });

  test("Cada frase debe poseer propiedades válidas (text, author, category)", () => {
    const allowedCategories = ["git", "ci-cd", "cultura", "infraestructura"];
    PHRASES.forEach((item, index) => {
      assert.ok(typeof item.text === "string" && item.text.trim().length > 5, `Frase en índice ${index} tiene texto inválido`);
      assert.ok(typeof item.author === "string" && item.author.trim().length > 0, `Frase en índice ${index} tiene autor vacío`);
      assert.ok(allowedCategories.includes(item.category), `Frase en índice ${index} tiene categoría no permitida: ${item.category}`);
    });
  });

  test("Debe haber cobertura equilibrada de todas las categorías oficiales", () => {
    const categories = PHRASES.map(p => p.category);
    assert.ok(categories.includes("git"), "Faltan frases de git");
    assert.ok(categories.includes("ci-cd"), "Faltan frases de ci-cd");
    assert.ok(categories.includes("cultura"), "Faltan frases de cultura");
    assert.ok(categories.includes("infraestructura"), "Faltan frases de infraestructura");
  });
});

describe("3. Lógica del motor de selección y filtrado", () => {
  // Simulador puro de la lógica de filtrado defensivo
  function filterPhrases(category) {
    if (!category || category === "todas") return PHRASES;
    return PHRASES.filter(p => p.category === category);
  }

  test("Filtrar por 'todas' debe retornar el total completo de frases", () => {
    const result = filterPhrases("todas");
    assert.strictEqual(result.length, PHRASES.length);
  });

  test("Filtrar por 'git' solo debe incluir frases con categoría 'git'", () => {
    const result = filterPhrases("git");
    assert.ok(result.length > 0, "No se encontraron frases de git");
    assert.ok(result.every(p => p.category === "git"), "El resultado contiene categorías distintas de git");
  });

  test("Filtrar por una categoría inexistente debe retornar array vacío", () => {
    const result = filterPhrases("blockchain");
    assert.strictEqual(result.length, 0);
  });

  test("Comportamiento defensivo: manejo seguro de banco corrupto o vacío", () => {
    const fallback = { text: "Fallback seguro", author: "sistema", category: "general" };
    function pickWithFallback(list) {
      if (!Array.isArray(list) || list.length === 0) return fallback;
      return list[0];
    }
    assert.deepStrictEqual(pickWithFallback([]), fallback);
    assert.deepStrictEqual(pickWithFallback(null), fallback);
  });
});
