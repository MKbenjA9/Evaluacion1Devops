(function () {
  "use strict";

  const screen = document.getElementById("screen");
  const anchor = document.getElementById("output-anchor");
  const runBtn = document.getElementById("run-btn");
  const countEl = document.getElementById("phrase-count");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const history = [];

  countEl.textContent = Array.isArray(PHRASES) ? PHRASES.length : 0;

  function pickRandomPhrase() {
    if (!Array.isArray(PHRASES) || PHRASES.length === 0) {
      return { text: "No hay frases cargadas en phrases.js todavía.", author: "sistema" };
    }
    // Evita repetir la misma frase dos veces seguidas si hay más de una.
    let choice;
    do {
      choice = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    } while (PHRASES.length > 1 && history[history.length - 1] === choice);
    history.push(choice);
    return choice;
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
