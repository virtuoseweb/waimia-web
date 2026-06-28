// Paires de contraste WCAG calculées LIVE sur les tokens courants du DS.
//
// Couples = rôles de TEXTE (ink / ink-2 / muted / accent-text) croisés avec les
// SURFACES réellement utilisées (paper / paper-2 / paper-3 / ink). Les noms de
// tokens viennent de src/styles/tokens.css (text=--ink, muted=--muted,
// accent texte=--accent-text ; surfaces=--paper/--paper-2/--paper-3/--ink).
//
// Subtilité ink : sous [data-bg='ink'] (global.css), --muted et --accent-text
// sont remappés. On résout donc les foregrounds de la surface ink DANS un
// contexte [data-bg='ink'] (option `context`), sinon on lirait les valeurs paper.
const PAIRS = [
  // Surface paper
  { fg: '--ink', bg: '--paper' },
  { fg: '--ink-2', bg: '--paper' },
  { fg: '--muted', bg: '--paper' },
  { fg: '--accent-text', bg: '--paper' },
  // Surface paper-2
  { fg: '--ink', bg: '--paper-2' },
  { fg: '--muted', bg: '--paper-2' },
  { fg: '--accent-text', bg: '--paper-2' },
  // Surface paper-3
  { fg: '--ink', bg: '--paper-3' },
  { fg: '--muted', bg: '--paper-3' },
  // Surface ink (foregrounds résolus en contexte [data-bg='ink'])
  { fg: '--paper', bg: '--ink', context: 'ink' },
  { fg: '--muted', bg: '--ink', context: 'ink' },
  { fg: '--accent-text', bg: '--ink', context: 'ink' },
];

function parseRgb(value) {
  const rgb = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), rgb[4] === undefined ? 1 : Number(rgb[4])];

  const hex = value.trim().match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);
  if (!hex) return null;
  const expanded = hex[1].length === 3 ? hex[1].split('').map((part) => part + part).join('') : hex[1];
  return [
    parseInt(expanded.slice(0, 2), 16),
    parseInt(expanded.slice(2, 4), 16),
    parseInt(expanded.slice(4, 6), 16),
    expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1,
  ];
}

// Résout un token en couleur rgba. `host` = élément parent du probe : permet de
// placer la sonde dans un contexte [data-bg='ink'] pour lire les remaps ink.
function resolveToken(host, token) {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  host.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return parseRgb(value);
}

function composite(color, background) {
  if (!color || !background || color[3] >= 1) return color;
  const alpha = color[3];
  return [
    color[0] * alpha + background[0] * (1 - alpha),
    color[1] * alpha + background[1] * (1 - alpha),
    color[2] * alpha + background[2] * (1 - alpha),
    1,
  ];
}

function luminance(color) {
  const channels = color.slice(0, 3).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

function rating(value) {
  if (value >= 7) return 'AAA';
  if (value >= 4.5) return 'AA';
  if (value >= 3) return 'AA-large';
  return 'FAIL';
}

export function renderContrast(root, list) {
  if (!list) return;

  // Contexte ink : un host caché portant data-bg='ink' (cascade des remaps de
  // global.css) pour résoudre les foregrounds de la surface sombre.
  let inkHost = null;
  function getInkHost() {
    if (inkHost) return inkHost;
    inkHost = document.createElement('div');
    inkHost.setAttribute('data-bg', 'ink');
    inkHost.style.position = 'absolute';
    inkHost.style.visibility = 'hidden';
    inkHost.style.pointerEvents = 'none';
    root.appendChild(inkHost);
    return inkHost;
  }

  list.replaceChildren();
  PAIRS.forEach(({ fg, bg, context }) => {
    const fgHost = context === 'ink' ? getInkHost() : root;
    const background = resolveToken(root, bg); // surface = valeur :root (opaque)
    const foreground = composite(resolveToken(fgHost, fg), background);
    const value = foreground && background ? ratio(foreground, background) : 0;

    const row = document.createElement('div');
    row.className = 'studio-contrast-row';
    row.dataset.contrastPair = `${fg}/${bg}`;

    const label = document.createElement('span');
    label.textContent = `${fg.slice(2)}/${bg.slice(2)}`;

    const badge = document.createElement('span');
    badge.className = 'studio-contrast-badge';
    badge.textContent = `${value.toFixed(1)} · ${rating(value)}`;

    row.append(label, badge);
    list.appendChild(row);
  });

  if (inkHost) inkHost.remove();
}
