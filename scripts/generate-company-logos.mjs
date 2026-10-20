import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Keep the original logos unchanged. Each SVG owns its image and filter so the
// browser does not need to resolve an external CSS filter on an HTML <img>.
const directory = fileURLToPath(new URL('../assets/img/', import.meta.url));
const logos = [
  ['totvs', 'web-250ce8289590f58098c50b3f-59163765.jpg', 'image/jpeg', 3840, 2160, false],
  ['neogrid', 'web-e2560cd44f0412bf75031bd4-caca5ddc.png', 'image/png', 5334, 1705, false],
  ['quiq', 'quiq-source.png', 'image/png', 160, 80, false],
  ['ap-digital', 'ap-digital-source.png', 'image/png', 80, 80, true]
];

for (const [name, source, type, width, height, darkBackground] of logos) {
  const image = fs.readFileSync(directory + source).toString('base64');
  const alpha = darkBackground ? '0.333333 0.333333 0.333333 0 0' : '-1 -1 -1 0 3';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><filter id="monochrome" color-interpolation-filters="sRGB" x="0" y="0" width="1" height="1"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${alpha}" result="keyed"/><feComposite in="keyed" in2="SourceAlpha" operator="in"/></filter></defs>
  <image width="${width}" height="${height}" filter="url(#monochrome)" xlink:href="data:${type};base64,${image}"/>
</svg>
`;
  fs.writeFileSync(directory + name + '-monochrome.svg', svg);
}
console.log('Generated four self-contained monochrome company SVGs.');
