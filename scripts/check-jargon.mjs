#!/usr/bin/env node
/**
 * check-jargon.mjs · le texte visible (main) et les balises head (title, description, h1)
 * des pages FR du build ne contiennent pas de vocabulaire interne : on écrit pour des
 * internautes. Lexique ci-dessous (terme interne → formulation à utiliser).
 *
 * Usage : node scripts/check-jargon.mjs [--json out.json] [--root dist/client]
 * Exit  : 0 si aucune occurrence hors ALLOW, 1 sinon.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const ROOT = opt('--root', 'dist/client');
const OUT = opt('--json', null);

const LEXICON = [
  { id: 'pilier', re: /\bpilla?r\b|\bpilier\b/gi, use: 'guide complet, article de référence' },
  { id: 'cluster', re: /\bclusters?\b/gi, use: 'série de guides, ensemble' },
  { id: 'silo', re: /\bsilos?\b/gi, use: 'thème, rubrique' },
  { id: 'doctrine', re: /\bdoctrine\b/gi, use: 'méthode, façon de travailler' },
  { id: 'money-page', re: /money page/gi, use: 'page de l\'offre' },
  { id: 'ICP', re: /\bICP\b/g, use: 'client cible' },
  { id: 'backlog', re: /\bbacklog\b/gi, use: 'liste priorisée' },
  { id: 'lead-magnet', re: /lead[- ]?magnets?/gi, use: 'ressource gratuite contre un contact' },
  { id: 'one-pager', re: /one-?pagers?/gi, use: 'fiche d\'une page' },
  { id: 'design-system', re: /design system/gi, use: 'composants réutilisables, charte de composants' },
  { id: 'SSG-ISR', re: /\bSSG\b|\bISR\b/g, use: 'pages pré-calculées, site statique' },
  { id: 'composable', re: /composables?/gi, use: 'modulaire, par briques' },
  { id: 'agentique', re: /agentiques?/gi, use: 'à agents IA, avec des agents IA' },
  { id: 'ROI-mesure', re: /ROI mesur[ée]s?/gi, use: 'ne pas affirmer un ROI mesuré sans mesure publiée' },
];

// Occurrences légitimes (citation, nom de produit, contexte pédagogique) : "page|id|extrait".
const ALLOW = new Set([]);

const strip = (h) =>
  h.replace(/<(script|style|svg|noscript)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (n === 'index.html') out.push(p);
  }
  return out;
}

const SKIP = /\/(en|preview|preview-swi|preview-v|agence|library|components|categories|dashboard-seo)(\/|$)/;
const hits = [];
for (const f of walk(ROOT)) {
  const page = f.slice(ROOT.length).replace(/\/index\.html$/, '') || '/';
  if (SKIP.test(page)) continue;
  const raw = readFileSync(f, 'utf8');
  const h = strip(raw);
  const main = (h.match(/<main[\s\S]*?<\/main>/i) || [h])[0];
  const head = [
    ['title', (h.match(/<title>([^<]*)/i) || [])[1]],
    ['description', (h.match(/name="description" content="([^"]*)/i) || [])[1]],
  ].filter(([, v]) => v);
  const zones = [...head.map(([k, v]) => [k, v]), ['main', text(main)]];
  for (const [zone, str] of zones) {
    for (const { id, re, use } of LEXICON) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(str))) {
        const ctx = str.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).trim();
        // Citation d'un tiers entre guillemets français : terme repris tel quel, pas du jargon maison.
        const before = str.slice(Math.max(0, m.index - 80), m.index);
        const after = str.slice(m.index, m.index + 80);
        if (before.lastIndexOf('«') > before.lastIndexOf('»') && after.includes('»')) continue;
        const key = `${page}|${id}|${ctx}`;
        if (ALLOW.has(key)) continue;
        hits.push({ page, zone, id, term: m[0], use, ctx });
      }
    }
  }
}

if (OUT) writeFileSync(OUT, JSON.stringify(hits, null, 2));
const byId = {};
for (const x of hits) byId[x.id] = (byId[x.id] || 0) + 1;
const pages = new Set(hits.map((x) => x.page));
console.log(`check-jargon : ${hits.length} occurrence(s) sur ${pages.size} page(s)`);
for (const [id, n] of Object.entries(byId).sort((a, b) => b[1] - a[1])) console.log(`  ${id.padEnd(14)} ${n}`);
if (!OUT) for (const x of hits.slice(0, 40)) console.log(`  ✗ ${x.page} [${x.zone}] ${x.id} : …${x.ctx}…`);
process.exit(hits.length ? 1 : 0);
