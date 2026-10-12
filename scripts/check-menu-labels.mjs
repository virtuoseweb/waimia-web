#!/usr/bin/env node
/**
 * check-menu-labels.mjs · le menu (src/data/mega-menu.ts) et le plan du site / footer
 * (src/data/sitemap.ts) donnent le MÊME libellé à chaque page /services/* qu'ils listent.
 * Un libellé qui diverge pour un même href est un défaut de navigation : le visiteur ne
 * reconnaît pas la page d'un écran à l'autre.
 *
 * Usage : npx tsx scripts/check-menu-labels.mjs
 * Exit  : 0 si aucune divergence, 1 sinon.
 */
import { MEGA_MENU } from '../src/data/mega-menu.ts';
import * as sitemap from '../src/data/sitemap.ts';

/** Parcourt récursivement un objet et collecte chaque nœud { href, label: {fr,en} }. */
function collect(node, into, seen = new Set()) {
  if (!node || typeof node !== 'object' || seen.has(node)) return into;
  seen.add(node);
  // Seules les feuilles comptent : un lien de module (ou de colonne) qui porte des enfants
  // nomme le groupe, pas la page, et peut légitimement différer du libellé de la page.
  const hasChildren = ['detail', 'links', 'items', 'cols', 'columns', 'categories', 'modules', 'groups', 'systems'].some(
    (k) => Array.isArray(node[k]) && node[k].length > 0,
  );
  if (!hasChildren && typeof node.href === 'string' && node.label && typeof node.label === 'object' && 'fr' in node.label) {
    into.push({ href: node.href, fr: node.label.fr, en: node.label.en });
  }
  for (const v of Array.isArray(node) ? node : Object.values(node)) collect(v, into, seen);
  return into;
}

const menu = collect(MEGA_MENU, []);
// Plan du site et footer : les menus et colonnes de pied de page de sitemap.ts (pas les
// blocs éditoriaux de l'accueil, qui reformulent librement leurs intitulés).
const planSources = Object.fromEntries(Object.entries(sitemap).filter(([k]) => /^(MM_|FOOTER_COLS)/.test(k)));
const plan = collect(planSources, []);
const isService = (h) => h.startsWith('/services/');

// Le menu pose parfois deux fois un href (lien de module et lien de détail) : on compare
// chaque occurrence du plan à chaque occurrence du menu.
const byHref = (list) => {
  const m = new Map();
  for (const e of list.filter((x) => isService(x.href))) {
    if (!m.has(e.href)) m.set(e.href, new Set());
    m.get(e.href).add(`${e.fr} | ${e.en}`);
  }
  return m;
};
const a = byHref(menu);
const b = byHref(plan);
const problems = [];
for (const [href, planLabels] of b) {
  const menuLabels = a.get(href);
  if (!menuLabels) continue;
  const all = new Set([...menuLabels, ...planLabels]);
  if (all.size > 1) problems.push(`${href}\n    menu : ${[...menuLabels].join(' ; ')}\n    plan : ${[...planLabels].join(' ; ')}`);
}
const shared = [...b.keys()].filter((h) => a.has(h)).length;
if (problems.length) {
  console.error(`check-menu-labels : ${problems.length} libellé(s) divergent(s) sur ${shared} pages communes\n` + problems.join('\n'));
  process.exit(1);
}
console.log(`check-menu-labels : OK (${shared} pages /services/* communes, libellés identiques)`);
