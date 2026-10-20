"use strict";

(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navegacao");
  if (!header || !toggle || !nav) return;
  const compact = window.matchMedia("(max-width: 1200px)");
  const english = document.documentElement.lang === "en";
  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", english ? (open ? "Close menu" : "Open menu") : (open ? "Fechar menu" : "Abrir menu"));
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
    if (href && new URL(href, location.href).hash) {
      const target = document.getElementById(new URL(href, location.href).hash.slice(1));
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

// Native language links work without JavaScript; preserve the section when enhanced.
(() => {
  const links = document.querySelectorAll('[data-language]');
  const updateLinks = () => links.forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.hash = document.getElementById(location.hash.slice(1)) ? location.hash : '';
    link.href = url.href;
  });
  updateLinks();
  window.addEventListener('hashchange', updateLinks);
})();

// Match Catuto's compact header and once-only scroll reveals.
(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('.section-heading, .about-content, .skill-card, .timeline-item, .education-item, .contact-panel, .personal-social');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.visible = 'true';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  if (!motion.matches) elements.forEach(element => {
    element.classList.add('reveal');
    if (element.getBoundingClientRect().top > window.innerHeight) element.dataset.visible = 'false';
    element.addEventListener('focusin', () => { element.dataset.visible = 'true'; });
    observer.observe(element);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      elements.forEach(element => { element.dataset.visible = 'true'; });
    }
  });
})();
