const PAIRS = [
  ['--ink', '--paper'],
  ['--ink-2', '--paper'],
  ['--muted', '--paper'],
  ['--ink', '--paper-2'],
  ['--paper', '--accent'],
  ['--accent', '--paper'],
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

function resolveToken(root, token) {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  root.appendChild(probe);
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
  const paper = resolveToken(root, '--paper');
  list.replaceChildren();
  PAIRS.forEach(([foregroundName, backgroundName]) => {
    const foreground = composite(resolveToken(root, foregroundName), paper);
    const background = composite(resolveToken(root, backgroundName), paper);
    const value = foreground && background ? ratio(foreground, background) : 0;

    const row = document.createElement('div');
    row.className = 'studio-contrast-row';
    row.dataset.contrastPair = `${foregroundName}/${backgroundName}`;

    const label = document.createElement('span');
    label.textContent = `${foregroundName.slice(2)}/${backgroundName.slice(2)}`;

    const badge = document.createElement('span');
    badge.className = 'studio-contrast-badge';
    badge.textContent = `${value.toFixed(1)} · ${rating(value)}`;

    row.append(label, badge);
    list.appendChild(row);
  });
}
