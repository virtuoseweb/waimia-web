#!/usr/bin/env node
/**
 * check-silos.mjs · Cohérence de la taxonomie éditoriale (silos), sur les SOURCES.
 *
 * Un silo (`category` d'un contenu) = un thème du maillage interne. Échoue si :
 *   1. les clés de SILOS (src/data/taxonomies.ts) et le type `Topic` du maillage
 *      (src/lib/internal-mesh.ts) divergent, dans un sens ou dans l'autre ;
 *   2. la page pilier d'un silo n'est pas au registre du maillage ;
 *   3. un article, guide ou comparatif n'a pas de `category` ;
 *   4. une `category` n'est pas une clé de SILOS ;
 *   5. la `category` d'un contenu présent au maillage n'est pas le PREMIER thème de sa
 *      page au registre (le silo affiché, la phrase du bandeau CTA et le maillage
 *      doivent raconter la même chose) ;
 *   6. un article, guide ou comparatif INDEXABLE est absent du registre du maillage.
 *
 * Remède : aligner la `category` du JSON sur le premier thème de la page dans PAGES,
 * ou réordonner les thèmes de la page si c'est le maillage qui se trompe.
 * Usage : node scripts/check-silos.mjs · Exit 1 si écart.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const meshSrc = read('src/lib/internal-mesh.ts');
const taxoSrc = read('src/data/taxonomies.ts');

const topicBlock = meshSrc.match(/type Topic =([\s\S]*?);/);
if (!topicBlock) throw new Error('type Topic introuvable dans src/lib/internal-mesh.ts');
const topics = [...topicBlock[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);

const silosBlock = taxoSrc.match(/export const SILOS = \{([\s\S]*?)\n\} as const/);
if (!silosBlock) throw new Error('SILOS introuvable dans src/data/taxonomies.ts');
const silos = Object.fromEntries(
  [...silosBlock[1].matchAll(/^ {2}([a-z-]+): \{[\s\S]*?pillar: '([^']+)'/gm)].map((m) => [m[1], m[2]]),
);

const pages = {};
for (const m of meshSrc.matchAll(/^ {2}'(\/[^']*)': \{[^\n]*?topics: \[([^\]]*)\]/gm)) {
  pages[m[1]] = [...m[2].matchAll(/'([a-z-]+)'/g)].map((t) => t[1]);
}
if (topics.length === 0 || Object.keys(silos).length === 0 || Object.keys(pages).length === 0) {
  throw new Error('Lecture vide (motif cassé ?) : Topic, SILOS ou PAGES sans entrée.');
}

const errors = [];
for (const t of topics) if (!(t in silos)) errors.push(`Thème « ${t} » du maillage sans silo dans SILOS.`);
for (const [s, pillar] of Object.entries(silos)) {
  if (!topics.includes(s)) errors.push(`Silo « ${s} » absent du type Topic du maillage.`);
  if (!(pillar in pages)) errors.push(`Silo « ${s} » : page pilier ${pillar} absente du registre du maillage.`);
}

const COLLECTIONS = {
  blog: { base: '/blog', editorial: true },
  guides: { base: '/ressources/guides', editorial: true },
  comparatifs: { base: '/ressources/comparatifs', editorial: true },
  services: { base: '/services' },
  'cas-usages': { base: '/cas-usages' },
  cases: { base: '/cas-clients' },
  audits: { base: '/audits' },
  diagnostics: { base: '/ressources/diagnostics' },
  demonstrations: { base: '/demonstrations' },
  implantations: { base: '/implantations' },
  lp: { base: '/lp' },
};

let checked = 0;
for (const [coll, { base, editorial }] of Object.entries(COLLECTIONS)) {
  const dir = path.join(root, 'src/content', coll);
  // Récursif : le loader glob lit `**/*.json` ; l'id (donc la route) vient de `slug`, sinon
  // du nom de fichier.
  for (const f of fs.readdirSync(dir, { recursive: true }).filter((x) => x.endsWith('.json'))) {
    const file = `src/content/${coll}/${f}`;
    const d = JSON.parse(read(file));
    const route = `${base}/${d.slug ?? path.basename(f, '.json')}`;
    const cat = d.category;
    checked++;
    if (cat === undefined) {
      if (editorial) errors.push(`${file} : \`category\` manquante (silo obligatoire pour ${coll}).`);
      continue;
    }
    if (!(cat in silos)) {
      errors.push(`${file} : category « ${cat} » n'est pas un silo (${Object.keys(silos).join(', ')}).`);
      continue;
    }
    const pageTopics = pages[route];
    if (pageTopics && pageTopics[0] !== cat) {
      errors.push(`${file} : category « ${cat} » ≠ premier thème « ${pageTopics[0] } » de ${route} au maillage.`);
    }
    if (!pageTopics && editorial && !d.seo?.noindex) {
      errors.push(`${file} : ${route} est indexable mais absente du registre du maillage (src/lib/internal-mesh.ts).`);
    }
  }
}

if (errors.length > 0) {
  console.error(`check-silos · ${errors.length} écart(s) :`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(`check-silos · OK · ${Object.keys(silos).length} silos = ${topics.length} thèmes du maillage · ${checked} contenus vérifiés.`);
