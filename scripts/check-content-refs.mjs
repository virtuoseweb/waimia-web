#!/usr/bin/env node
// scripts/check-content-refs.mjs — gate intégrité du maillage contenu (refonte R7a, docs/37 §2.1)
//
// Vérifie, en parsing STATIQUE (zéro import de code applicatif, comme les autres check-*.mjs) :
//   1. referentiels : ids UNIQUES kebab-case dans src/data/pain-points.ts + src/data/proof-points.ts,
//      et chaque entrée `sources` pointe un contenu existant (src/content/<collection>/<slug>.mdx)
//   2. solutions   : `need` ∈ {acquerir, piloter, operer} si présent
//   3. cases.facets : sector ∈ slugs secteurs · painPoints ⊆ ids pain-points ·
//                     solutions ⊆ slugs solutions · results ⊆ ids proof-points
//   4. maillage    : relatedSolutions / relatedOffres / relatedCases / relatedSecteurs
//                    des collections solutions, offres et cases pointent des slugs existants
//
// Sortie : rapport PASS/FAIL détaillé · exit 0 si tout valide · exit 1 si AU MOINS une référence
// cassée · exit 2 si un fichier attendu est introuvable ou un parse rend 0 résultat.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NEED_ENUM = new Set(['acquerir', 'piloter', 'operer']);
const KEBAB = /^[a-z0-9-]+$/;

let errors = 0;
const fail = (msg) => {
  console.error(`  ✗ ${msg}`);
  errors++;
};

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`✗ FATAL : fichier introuvable → ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

// ── 0. Inventaire des slugs par collection (slug frontmatter, fallback nom de fichier) ──
function collectSlugs(collection) {
  const dir = join(ROOT, 'src/content', collection);
  if (!existsSync(dir)) {
    console.error(`✗ FATAL : collection introuvable → src/content/${collection}`);
    process.exit(2);
  }
  const slugs = new Map(); // slug → fichier
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    const m = src.match(/^slug:\s*["']?([a-z0-9-]+)["']?\s*$/m);
    slugs.set(m ? m[1] : f.replace(/\.mdx$/, ''), f);
  }
  // Collections légitimement vidables (purge P0.2-H : cas/secteurs fictifs retirés,
  // reconstruction réelle en P0.6). Un dossier vide n'est PAS une erreur de parse :
  // les références vers ces slugs sont déjà nettoyées en amont (relatedCases: [] etc.).
  const MAY_BE_EMPTY = new Set(['cases', 'secteurs']);
  if (slugs.size === 0 && !MAY_BE_EMPTY.has(collection)) {
    console.error(`✗ FATAL : 0 entrée parsée dans src/content/${collection}`);
    process.exit(2);
  }
  return slugs;
}

const SLUGS = {
  solutions: collectSlugs('solutions'),
  offres: collectSlugs('offres'),
  cases: collectSlugs('cases'),
  secteurs: collectSlugs('secteurs'),
};

// Collections migrées en référentiels TS (V-F1, docs/40 §1) : les MDX sont archivés
// dans docs/archive/content/ : les `sources` qui les citent restent des traces de
// provenance valides mais ne sont plus vérifiées sur disque.
const ARCHIVED_COLLECTIONS = new Set(['pain-points', 'proof-points', 'guarantees']);

// ── 1. Référentiels src/data ──
function parseReferential(rel) {
  const src = read(rel);
  const ids = [...src.matchAll(/^\s*id: '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
  if (ids.length === 0) {
    console.error(`✗ FATAL : 0 id parsé dans ${rel}`);
    process.exit(2);
  }
  const seen = new Set();
  for (const id of ids) {
    if (!KEBAB.test(id)) fail(`${rel} : id non kebab-case → ${id}`);
    if (seen.has(id)) fail(`${rel} : id dupliqué → ${id}`);
    seen.add(id);
  }
  const sources = [...src.matchAll(/'((?:pain-points|proof-points|guarantees|solutions|offres|cases|secteurs)\/[a-z0-9-]+)'/g)].map(
    (m) => m[1],
  );
  return { ids: seen, sources };
}

console.log('── 1. Référentiels src/data/{pain-points,proof-points,guarantees}.ts');
const pains = parseReferential('src/data/pain-points.ts');
const proofs = parseReferential('src/data/proof-points.ts');
const guarantees = parseReferential('src/data/guarantees.ts');
for (const ref of [
  { rel: 'src/data/pain-points.ts', sources: pains.sources },
  { rel: 'src/data/proof-points.ts', sources: proofs.sources },
  { rel: 'src/data/guarantees.ts', sources: guarantees.sources },
]) {
  for (const s of new Set(ref.sources)) {
    const [collection, slug] = s.split('/');
    if (ARCHIVED_COLLECTIONS.has(collection)) continue; // provenance archivée (docs/archive/content/)
    if (!SLUGS[collection]?.has(slug)) fail(`${ref.rel} : source inexistante → ${s}`);
  }
}
console.log(
  `  pain-points : ${pains.ids.size} ids · proof-points : ${proofs.ids.size} ids · guarantees : ${guarantees.ids.size} ids`,
);

// ── Parsing frontmatter minimal (champs plats + bloc facets) ──
function frontmatter(collection, file) {
  const src = readFileSync(join(ROOT, 'src/content', collection, file), 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}
const inlineArray = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*)\\]\\s*$`, 'm'));
  if (!m) return null;
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
};
const scalar = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
};
function facetsBlock(fm) {
  const m = fm.match(/^facets:\n((?:[ \t]+.*\n?)*)/m);
  if (!m) return null;
  const block = m[1];
  return {
    sector: scalar(block.replace(/^[ \t]+/gm, ''), 'sector'),
    painPoints: inlineArray(block.replace(/^[ \t]+/gm, ''), 'painPoints') ?? [],
    solutions: inlineArray(block.replace(/^[ \t]+/gm, ''), 'solutions') ?? [],
    results: inlineArray(block.replace(/^[ \t]+/gm, ''), 'results') ?? [],
  };
}

const RELATED = [
  ['relatedSolutions', 'solutions'],
  ['relatedOffres', 'offres'],
  ['relatedCases', 'cases'],
  ['relatedSecteurs', 'secteurs'],
];

function checkRelated(label, fm) {
  for (const [key, collection] of RELATED) {
    for (const slug of inlineArray(fm, key) ?? []) {
      if (!SLUGS[collection].has(slug)) fail(`${label} : ${key} → slug inexistant "${slug}"`);
    }
  }
}

// ── 2 + 4. Solutions : need + maillage ──
console.log('── 2. Solutions : need ∈ enum + maillage related*');
let needCount = 0;
for (const [slug, file] of SLUGS.solutions) {
  const fm = frontmatter('solutions', file);
  const need = scalar(fm, 'need');
  if (need !== null) {
    needCount++;
    if (!NEED_ENUM.has(need)) fail(`solutions/${slug} : need invalide → "${need}"`);
  }
  checkRelated(`solutions/${slug}`, fm);
}
console.log(`  need posé sur ${needCount}/${SLUGS.solutions.size} solutions`);

// ── 3 + 4. Cases : facets + maillage ──
console.log('── 3. Cases : facets reliées aux référentiels + maillage related*');
let facetsCount = 0;
for (const [slug, file] of SLUGS.cases) {
  const fm = frontmatter('cases', file);
  const facets = facetsBlock(fm);
  if (facets) {
    facetsCount++;
    if (facets.sector && !SLUGS.secteurs.has(facets.sector))
      fail(`cases/${slug} : facets.sector → secteur inexistant "${facets.sector}"`);
    for (const id of facets.painPoints)
      if (!pains.ids.has(id)) fail(`cases/${slug} : facets.painPoints → id inconnu "${id}"`);
    for (const s of facets.solutions)
      if (!SLUGS.solutions.has(s)) fail(`cases/${slug} : facets.solutions → slug inexistant "${s}"`);
    for (const id of facets.results)
      if (!proofs.ids.has(id)) fail(`cases/${slug} : facets.results → id inconnu "${id}"`);
  }
  checkRelated(`cases/${slug}`, fm);
}
console.log(`  facets posées sur ${facetsCount}/${SLUGS.cases.size} cas`);

// ── 4. Offres : maillage ──
console.log('── 4. Offres : maillage related*');
for (const [slug, file] of SLUGS.offres) {
  checkRelated(`offres/${slug}`, frontmatter('offres', file));
}

// ── Verdict ──
if (errors > 0) {
  console.error(`\nFAIL — ${errors} référence(s) cassée(s)`);
  process.exit(1);
}
console.log('\nPASS — référentiels, need, facets et maillage related* intègres');
