// Waimia · #39 — preuve fonctionnelle (GF-1) du format PageDocument + helpers.
//
// page-document.ts importe (transitivement) `z` depuis `astro:content` (module virtuel Astro
// non résoluble hors build). On réutilise le pattern de rebind de scripts/derive-section-slots.mjs :
// on recopie l'arborescence src/{schemas,sections,lib} dans un répertoire temp en rebindant
// `from 'astro:content'` → le zod réel du repo, puis on importe dynamiquement (tsx transpile à la volée).
//
// Lancement : `npx tsx scripts/test-page-document.mjs` (depuis la racine du repo).
//
// Prouve (exit ≠ 0 si échec) :
//   1. Round-trip sur une entrée MDX réelle : frontmatter → PageDoc → frontmatter, diff nul (sections + meta).
//   2. Validation OK : un PageDocument valide → validatePageDoc().valid === true.
//   3. Validation KO ciblée : un slot requis manquant → valid===false avec le bon `field`.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const repoRoot = process.cwd();
const reqFromRepo = createRequire(path.join(repoRoot, 'package.json'));
const zodPath = reqFromRepo.resolve('zod');

// yaml n'est pas une dépendance directe : on le résout via astro (qui le fournit).
const reqFromAstro = createRequire(reqFromRepo.resolve('astro/package.json'));
const { parse: parseYaml } = await import(reqFromAstro.resolve('yaml'));

// ── 1) Construire un repo temp avec astro:content rebindé sur le zod réel ───────────────────
const rebindAstro = (code) =>
  code.replace(/from ['"]astro:content['"]/g, `from ${JSON.stringify(zodPath)}`);

function copyTree(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const from = path.join(srcDir, entry.name);
    const to = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyTree(from, to);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.ts')) {
        fs.writeFileSync(to, rebindAstro(fs.readFileSync(from, 'utf8')));
      } else if (entry.name.endsWith('.json')) {
        // données de build commitées (ex. section-slots.generated.json) — copiées telles quelles.
        fs.writeFileSync(to, fs.readFileSync(from));
      }
    }
  }
}

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'page-doc-test-'));
let mod;
try {
  const tmpSrc = path.join(tmpRoot, 'src');
  for (const dir of ['schemas', 'sections', 'lib']) {
    const srcDir = path.join(repoRoot, 'src', dir);
    if (fs.existsSync(srcDir)) copyTree(srcDir, path.join(tmpSrc, dir));
  }
  mod = await import(path.join(tmpSrc, 'lib', 'page-document.ts'));
} catch (err) {
  console.error('Échec du chargement du module rebindé :', err);
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  process.exit(1);
}

const { frontmatterToPageDoc, pageDocToFrontmatter, validatePageDoc, resolvePreset, resolveScheme } =
  mod;

// ── Helper : lire le frontmatter YAML d'un fichier MDX réel ─────────────────────────────────
function readFrontmatter(relPath) {
  const raw = fs.readFileSync(path.join(repoRoot, relPath), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error(`Pas de frontmatter dans ${relPath}`);
  return parseYaml(m[1]);
}

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
    console.log(`✅ ${name}`);
  } catch (err) {
    results.push({ name, ok: false, err });
    console.log(`❌ ${name}`);
    console.log(`   ${err.message}`);
  }
}

// ── Test 1 : round-trip sur une entrée MDX réelle ───────────────────────────────────────────
const MDX = 'src/content/offres/audit-maturite-ia.mdx';
check('1. Round-trip frontmatter → PageDoc → frontmatter (diff sémantique nul)', () => {
  const fm = readFrontmatter(MDX);
  const doc = frontmatterToPageDoc('offres', fm.slug, fm);

  // Structure du PageDoc.
  assert.equal(doc.$schema, 'waimia.page-document/v1', '$schema');
  assert.equal(doc.meta.collection, 'offres', 'meta.collection');
  assert.equal(doc.meta.slug, fm.slug, 'meta.slug');
  assert.ok(Array.isArray(doc.sections) && doc.sections.length > 0, 'sections non vides');

  const back = pageDocToFrontmatter(doc);

  // sections : identiques (le contrat d'instance n'est jamais touché).
  assert.deepEqual(
    JSON.parse(JSON.stringify(back.sections)),
    JSON.parse(JSON.stringify(fm.sections)),
    'sections préservées',
  );

  // meta à plat : restituée (slug + titres + descriptions + seo).
  for (const k of ['slug', 'title_fr', 'title_en', 'description_fr', 'description_en']) {
    assert.deepEqual(back[k], fm[k], `frontmatter.${k} restitué`);
  }

  // collectionExtra : tous les champs non-meta non-sections (ex. category, tags, price_from_eur, faq_fr).
  for (const k of ['category', 'tags', 'price_from_eur', 'category_fr', 'faq_fr']) {
    if (k in fm) {
      assert.deepEqual(
        JSON.parse(JSON.stringify(back[k])),
        JSON.parse(JSON.stringify(fm[k])),
        `collectionExtra.${k} restitué`,
      );
    }
  }

  // Idempotence : re-parser le frontmatter restitué redonne un PageDoc équivalent.
  const doc2 = frontmatterToPageDoc('offres', back.slug, back);
  assert.deepEqual(
    JSON.parse(JSON.stringify(doc2)),
    JSON.parse(JSON.stringify(doc)),
    'frontmatterToPageDoc(pageDocToFrontmatter(doc)) ≈ doc',
  );
});

// ── Test 2 : validation OK ──────────────────────────────────────────────────────────────────
check('2. validatePageDoc().valid === true sur un doc valide', () => {
  const fm = readFrontmatter(MDX);
  const doc = frontmatterToPageDoc('offres', fm.slug, fm);
  const res = validatePageDoc(doc);
  assert.equal(res.valid, true, `valid attendu true — erreurs : ${JSON.stringify(res.errors)}`);
  assert.equal(res.errors.length, 0, 'aucune erreur');
});

// ── Test 3 : validation KO ciblée (slot de contenu requis manquant) ─────────────────────────
check('3. validatePageDoc() KO ciblé : slot requis manquant → field correct', () => {
  // problem-statement : slot de contenu requis bilingue `statement` (statement_fr/_en).
  const doc = {
    $schema: 'waimia.page-document/v1',
    meta: { collection: 'offres', slug: 'ko-test', lang: 'fr', collectionExtra: {} },
    sections: [
      {
        type: 'problem-statement',
        kicker_fr: '§ Test',
        kicker_en: '§ Test',
        // statement_fr / statement_en VOLONTAIREMENT absents.
      },
    ],
  };
  const res = validatePageDoc(doc);
  assert.equal(res.valid, false, 'valid attendu false');
  const stmtErr = res.errors.find((e) => e.field === 'statement_fr' || e.field === 'statement');
  assert.ok(
    stmtErr,
    `erreur sur le champ statement attendue — erreurs reçues : ${JSON.stringify(res.errors)}`,
  );
  assert.equal(stmtErr.index, 0, 'index de section = 0');
});

// ── Bonus : resolvePreset / resolveScheme renvoient des props concrètes ─────────────────────
check('4. resolvePreset / resolveScheme → props concrètes (pas de référence)', () => {
  const preset = resolvePreset('hero-split', 'hero-split--showcase-3-1-paper');
  assert.ok(preset && preset.background === 'paper' && preset.layout === 'split-3-1', 'preset résolu');
  const unknown = resolvePreset('hero-split', 'inconnu');
  assert.equal(unknown, undefined, 'preset inconnu → undefined');

  const scheme = resolveScheme('duo-paper-ink');
  assert.ok(scheme && scheme.background === 'paper' && Array.isArray(scheme.cellCycle), 'scheme résolu');
  assert.equal(resolveScheme('inconnu'), undefined, 'scheme inconnu → undefined');
});

fs.rmSync(tmpRoot, { recursive: true, force: true });

const failed = results.filter((r) => !r.ok);
console.log('');
console.log(`Résultat : ${results.length - failed.length}/${results.length} assertions passées.`);
process.exit(failed.length === 0 ? 0 : 1);
