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
// Collections supprimées (SEO état final, §0ter) : collection retirée de content.config,
// dossier supprimé. Dir absent = retour map vide, PAS un FATAL (la collection n'existe plus).
const REMOVED_COLLECTIONS = new Set(['solutions', 'offres']);
function collectSlugs(collection) {
  const dir = join(ROOT, 'src/content', collection);
  if (!existsSync(dir)) {
    if (REMOVED_COLLECTIONS.has(collection)) return new Map();
    console.error(`✗ FATAL : collection introuvable → src/content/${collection}`);
    process.exit(2);
  }
  const slugs = new Map(); // slug → fichier
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.json'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    let slug;
    if (f.endsWith('.json')) {
      // Page composable migrée (frontmatter → objet JSON, cf ADR docs/strategy/12).
      slug = JSON.parse(src).slug ?? f.replace(/\.json$/, '');
    } else {
      const m = src.match(/^slug:\s*["']?([a-z0-9-]+)["']?\s*$/m);
      slug = m ? m[1] : f.replace(/\.mdx$/, '');
    }
    slugs.set(slug, f);
  }
  // Collections légitimement vidables (purge P0.2-H : cas/secteurs fictifs retirés,
  // reconstruction réelle en P0.6) + supprimées (SEO état final). Un dossier vide
  // n'est PAS une erreur : les références vers ces slugs sont nettoyées en amont.
  const MAY_BE_EMPTY = new Set(['cases', 'secteurs', 'solutions', 'offres']);
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
// + solutions : collection supprimée (SEO état final) → mêmes traces de provenance
//   tolérées dans pain-points.ts / proof-points.ts (contenu fusionné en sections piliers).
const ARCHIVED_COLLECTIONS = new Set(['pain-points', 'proof-points', 'guarantees', 'solutions', 'offres']);

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

// ── 5. Refs `{ref}` (P4.4-e) : pointeurs { "ref": "source/id" } dans src/content/**/*.json ──
// BLOC ISOLÉ : scan JSON.parse propre (PAS la fonction frontmatter() héritée MDX, cassée sur
// JSON — laissée intacte, dette séparée). Valide que chaque pointeur cible une source CÂBLÉE à
// ce stade ET un id existant. WIRED_REF_SOURCES = sources réellement branchées dans le résolveur
// (REF_TARGETS). À ÉTENDRE au fil des phases suivantes (testimonials, pricing, pain-points, ...).
console.log('── 5. Refs {ref} : pointeurs de contenu global (P4.4-e)');
const WIRED_REF_SOURCES = new Set(['logos', 'cases']);

// Ids valides par source câblée.
//  - logos : CLÉS D'OBJET du store LOGOS (`  claude: {`), PAS un champ `id:` (regex dédié).
//  - cases : noms de fichiers (sans extension) de src/content/cases/*.json.
const logoIds = new Set(
  [...read('src/data/logos.ts').matchAll(/^ {2}([a-z][a-z0-9-]*):\s*\{\s*$/gm)].map((m) => m[1]),
);
const caseIds = new Set(
  readdirSync(join(ROOT, 'src/content/cases'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, '')),
);
const REF_IDS = { logos: logoIds, cases: caseIds };
if (logoIds.size === 0) fail('src/data/logos.ts : 0 clé de logo parsée (regex à revoir)');
if (caseIds.size === 0) fail('src/content/cases : 0 fichier de cas');

// Scan récursif de tous les .json sous src/content.
function walkJson(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkJson(p));
    else if (entry.isFile() && entry.name.endsWith('.json')) out.push(p);
  }
  return out;
}
// Collecte récursive des pointeurs { ref: 'source/id' } (objet à clé UNIQUE `ref` string).
function collectRefs(node, acc) {
  if (Array.isArray(node)) {
    for (const v of node) collectRefs(v, acc);
  } else if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === 'ref' && typeof node.ref === 'string') acc.push(node.ref);
    else for (const v of Object.values(node)) collectRefs(v, acc);
  }
  return acc;
}

let refCount = 0;
for (const file of walkJson(join(ROOT, 'src/content'))) {
  const rel = file.slice(ROOT.length + 1);
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    fail(`${rel} : JSON invalide (${e.message})`);
    continue;
  }
  for (const ref of collectRefs(parsed, [])) {
    refCount++;
    const slash = ref.indexOf('/');
    const source = slash === -1 ? ref : ref.slice(0, slash);
    const id = slash === -1 ? '' : ref.slice(slash + 1);
    if (!WIRED_REF_SOURCES.has(source)) {
      fail(`${rel} : ref source non câblée « ${source} » (${ref})`);
      continue;
    }
    if (!REF_IDS[source].has(id)) fail(`${rel} : ref cassée → ${ref} (id absent de « ${source} »)`);
  }
}
console.log(`  ${refCount} pointeur(s) {ref} scanné(s) · sources câblées : ${[...WIRED_REF_SOURCES].join(', ')}`);

// ── Verdict ──
if (errors > 0) {
  console.error(`\nFAIL — ${errors} référence(s) cassée(s)`);
  process.exit(1);
}
console.log('\nPASS — référentiels, need, facets, maillage related* et refs {ref} intègres');
