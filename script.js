(function () {
  "use strict";

  const screen = document.getElementById("screen");
  const anchor = document.getElementById("output-anchor");
  const runBtn = document.getElementById("run-btn");
  const countEl = document.getElementById("phrase-count");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const DEFAULT_FALLBACK_PHRASE = {
    text: "Un commit sin mensaje claro es una promesa que le hiciste a tu yo del futuro.",
    author: "Anónimo DevOps"
  };

  const history = [];

  // Filtrado defensivo: solo almacena frases válidas con texto y autor no vacíos
  const validPhrases = Array.isArray(PHRASES)
    ? PHRASES.filter(
        (item) =>
          item &&
          typeof item.text === "string" &&
          item.text.trim().length > 0 &&
          typeof item.author === "string" &&
          item.author.trim().length > 0
      )
    : [];

  countEl.textContent = validPhrases.length;

  function pickRandomPhrase() {
    if (validPhrases.length === 0) {
      return DEFAULT_FALLBACK_PHRASE;
    }

    // Evita repetir la misma frase dos veces seguidas si hay más de una disponible.
    let choice;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      choice = validPhrases[Math.floor(Math.random() * validPhrases.length)];
      attempts++;
    } while (
      validPhrases.length > 1 &&
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

    return { text: safeText, author: safeAuthor };
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

    const query = document.createElement("p");
    query.className = "line query-line";
    screen.insertBefore(query, anchor);
    await typeText(query, "devops --quote", 22);

    const loading = document.createElement("p");
    loading.className = "line dim";
    loading.textContent = "Consultando base de datos...";
    screen.insertBefore(loading, anchor);
    scrollToBottom();

    await new Promise((r) => setTimeout(r, prefersReducedMotion ? 0 : 420));
    loading.remove();

    const phrase = pickRandomPhrase();

    const block = document.createElement("div");
    block.className = "quote-block";
    const textEl = document.createElement("span");
    block.appendChild(textEl);
    const authorEl = document.createElement("span");
    authorEl.className = "quote-author";
    authorEl.textContent = "— " + phrase.author;
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

  runBtn.addEventListener("click", runQuery);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !runBtn.disabled) {
      runQuery();
    }
  });
})();
