(function () {
  "use strict";

  const screen = document.getElementById("screen");
  const anchor = document.getElementById("output-anchor");
  const runBtn = document.getElementById("run-btn");
  const clearBtn = document.getElementById("clear-btn");
  const countEl = document.getElementById("phrase-count");
  const categoryFilter = document.getElementById("category-filter");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const DEFAULT_FALLBACK_PHRASE = {
    text: "Un commit sin mensaje claro es una promesa que le hiciste a tu yo del futuro.",
    author: "Anónimo DevOps",
    category: "general"
  };

  const history = [];

  // Filtrado defensivo: solo procesa frases con texto y autor no vacíos
  function getSanitizedPhrases() {
    if (!Array.isArray(PHRASES)) {
      return [];
    }
    return PHRASES.filter(
      (item) =>
        item &&
        typeof item.text === "string" &&
        item.text.trim().length > 0 &&
        typeof item.author === "string" &&
        item.author.trim().length > 0
    );
  }

  function getAvailablePhrases() {
    const validPhrases = getSanitizedPhrases();
    if (validPhrases.length === 0) {
      return [];
    }

    const selectedCategory = categoryFilter
      ? categoryFilter.value.toLowerCase()
      : "todas";

    if (selectedCategory === "todas" || selectedCategory === "all") {
      return validPhrases;
    }

    return validPhrases.filter(
      (item) =>
        item &&
        typeof item.category === "string" &&
        item.category.toLowerCase() === selectedCategory
    );
  }

  function updatePhraseCount() {
    const available = getAvailablePhrases();
    if (countEl) {
      countEl.textContent = available.length;
    }
  }

  updatePhraseCount();

  if (categoryFilter) {
    categoryFilter.addEventListener("change", updatePhraseCount);
  }

  function pickRandomPhrase() {
    const availablePhrases = getAvailablePhrases();

    if (availablePhrases.length === 0) {
      const selectedCategory = categoryFilter ? categoryFilter.value : "todas";
      if (selectedCategory === "todas") {
        return DEFAULT_FALLBACK_PHRASE;
      }
      return {
        text: "No hay frases disponibles para la categoría seleccionada.",
        author: "sistema",
        category: selectedCategory
      };
    }

    // Evita repetir la misma frase dos veces seguidas si hay más de una disponible
    let choice;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      choice = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
      attempts++;
    } while (
      availablePhrases.length > 1 &&
      history[history.length - 1] === choice &&
      attempts < maxAttempts
    );

    history.push(choice);

    // Retorno defensivo con sanitización final
    const safeText =
      choice && typeof choice.text === "string" && choice.text.trim().length > 0
        ? choice.text.trim()
        : DEFAULT_FALLBACK_PHRASE.text;

    const safeAuthor =
      choice && typeof choice.author === "string" && choice.author.trim().length > 0
        ? choice.author.trim()
        : DEFAULT_FALLBACK_PHRASE.author;

    const safeCategory =
      choice && typeof choice.category === "string" && choice.category.trim().length > 0
        ? choice.category.trim()
        : "general";

    return { text: safeText, author: safeAuthor, category: safeCategory };
  }

  function scrollToBottom() {
    screen.scrollTop = screen.scrollHeight;
  }

  function typeText(el, text, speed) {
    return new Promise((resolve) => {
      if (prefersReducedMotion) {
        el.textContent = text;
        resolve();
        return;
      }
      let i = 0;
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      el.after(cursor);

      const tick = () => {
        el.textContent = text.slice(0, i);
        i += 1;
        scrollToBottom();
        if (i <= text.length) {
          requestAnimationFrame(() => setTimeout(tick, speed));
        } else {
          cursor.remove();
          resolve();
        }
      };
      tick();
    });
  }

  async function runQuery() {
    runBtn.disabled = true;

    const selectedCat = categoryFilter ? categoryFilter.value : "todas";
    const commandText =
      selectedCat === "todas"
        ? "devops --quote"
        : `devops --quote --category=${selectedCat}`;

    const query = document.createElement("p");
    query.className = "line query-line";
    screen.insertBefore(query, anchor);
    await typeText(query, commandText, 20);

    const loading = document.createElement("p");
    loading.className = "line dim";
    loading.textContent = "Consultando base de datos...";
    screen.insertBefore(loading, anchor);
    scrollToBottom();

    await new Promise((r) => setTimeout(r, prefersReducedMotion ? 0 : 400));
    loading.remove();

    const phrase = pickRandomPhrase();

    const block = document.createElement("div");
    block.className = "quote-block";
    const textEl = document.createElement("span");
    block.appendChild(textEl);
    const authorEl = document.createElement("span");
    authorEl.className = "quote-author";
    const categoryTag = phrase.category ? ` · [${phrase.category}]` : "";
    authorEl.textContent = `— ${phrase.author}${categoryTag}`;
    authorEl.style.opacity = "0";
    block.appendChild(authorEl);

    screen.insertBefore(block, anchor);
    scrollToBottom();

    await typeText(textEl, phrase.text, 14);
    authorEl.style.transition = "opacity 260ms ease";
    authorEl.style.opacity = "1";

    runBtn.disabled = false;
    scrollToBottom();
  }

  function clearScreen() {
    const printedElements = screen.querySelectorAll(".query-line, .quote-block");
    printedElements.forEach((el) => el.remove());
  }

  runBtn.addEventListener("click", runQuery);

  if (clearBtn) {
    clearBtn.addEventListener("click", clearScreen);
  }

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      !runBtn.disabled &&
      document.activeElement !== categoryFilter
    ) {
      runQuery();
    }
  });
})();