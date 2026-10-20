import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Portuguese HTML is the source; English is generated as static, deployable HTML.
const root = fileURLToPath(new URL('../', import.meta.url));
const translations = JSON.parse(fs.readFileSync(path.join(root, 'assets/locales/en.json'), 'utf8'));
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Proper names and technical terms intentionally stay the same in both versions.
const unchanged = new Set([
  '[', 'CL', ']', 'CRISTIAN NAZARIO LOHN', 'QUALITY ASSURANCE', 'PT', 'EN',
  'CRISTIAN NAZARIO LOHN · QA ANALYST', 'Web + Mobile', 'E2E + APIs',
  'Cypress · Selenium · Gauge · Cucumber', 'Postman · REST Assured · SQL · XML',
  'JavaScript', 'TOTVS', 'Quiq', 'Selenium · REST Assured · Cucumber',
  'AP Interactive', 'Neogrid', 'Selenium · Gauge', 'Anhanguera Educacional',
  '2014 — 2016', 'MBA', '@cristianlohn', 'LinkedIn', 'GitHub',
  'cristianlohn@hotmail.com', '© 2026 Cristian Nazario Lohn'
]);
const missing = new Set();
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const translate = value => {
  const trimmed = value.trim();
  return Object.hasOwn(translations, trimmed) ? value.replace(trimmed, escape(translations[trimmed])) : value;
};

html = html.replace(/>([^<>]+)</g, (_, text) => {
  const value = text.trim();
  if (value && !Object.hasOwn(translations, value) && !unchanged.has(value)) missing.add(value);
  return `>${translate(text)}<`;
});
if (missing.size) throw new Error(`Missing English translations:\n${[...missing].join('\n')}`);
html = html.replace(/(aria-label|content)="([^"]*)"/g, (_, attribute, value) => `${attribute}="${translate(value)}"`);
html = html.replace('<html lang="pt-BR">', '<html lang="en">');
html = html.replaceAll('href="assets/', 'href="../assets/').replaceAll('src="assets/', 'src="../assets/');
html = html.replace(/(<link rel="canonical" href=")https:\/\/cristian.catuto.com.br\//, '$1https://cristian.catuto.com.br/en/');
html = html.replace(/(<meta property="og:url" content=")https:\/\/cristian.catuto.com.br\//, '$1https://cristian.catuto.com.br/en/');
html = html.replace('href="./" lang="pt-BR"', 'href="../" lang="pt-BR"');
html = html.replace('aria-label="Ver site em português" aria-current="page"', 'aria-label="Ver site em português"');
html = html.replace('href="en/" lang="en"', 'href="./" lang="en"');
html = html.replace('aria-label="View website in English"', 'aria-label="View website in English" aria-current="page"');
html = html.replace(
  'https://drive.google.com/file/d/1pOPej44ps9NyS-fhHo_g3kHNrRXFnWnm/view?usp=drive_link',
  'https://drive.google.com/file/d/1fnqyc-XgJSncVTTfPg9LHf7f3ccAkdzB/view?usp=drive_link'
);

fs.mkdirSync(path.join(root, 'en'), { recursive: true });
fs.writeFileSync(path.join(root, 'en/index.html'), html);
console.log('Generated en/index.html');
