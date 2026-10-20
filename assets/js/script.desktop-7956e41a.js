"use strict";

(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navegacao");
  if (!header || !toggle || !nav) return;
  const compact = window.matchMedia("(max-width: 1200px)");
  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.hidden = compact.matches && !open;
    if (restoreFocus) toggle.focus();
  };
  const synchronize = () => {
    const focusInside = nav.contains(document.activeElement);
    toggle.hidden = !compact.matches;
    setOpen(false, compact.matches && focusInside);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !compact.matches) return;
    setOpen(false);
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && compact.matches && toggle.getAttribute("aria-expanded") === "true") setOpen(false, true);
  });
  document.addEventListener("click", (event) => {
    if (compact.matches && !header.contains(event.target) && toggle.getAttribute("aria-expanded") === "true") setOpen(false, nav.contains(document.activeElement));
  });
  compact.addEventListener("change", synchronize);
  header.classList.add("menu-enhanced");
  synchronize();
})();
