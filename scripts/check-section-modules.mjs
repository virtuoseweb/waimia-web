#!/usr/bin/env node
/**
 * check-section-modules.mjs : gate de complétude des MODULES co-localisés (Wave #38).
 *
 * Le refactor de co-location (#38) range chaque type de section dans un module
 * `src/sections/<type>/` (un dossier par type). Ce gate vérifie que CHAQUE module
 * découvert respecte le contrat de forme attendu par scripts/gen-section-aggregate.mjs :
 *
 *   1. Les 5 fichiers requis existent :
 *        schema.ts · demo.ts · meta.ts · Component.astro · index.ts
 *   2. Le `index.ts` ré-expose un `export default` qui référence AU MOINS les 4 clés
 *      de facette : schema, demo, meta, Component (forme constatée sur les 3 pilotes :
 *        export default { id, schema, demo, meta, Component }).
 *
 * `_shared` (feuilles pures partagées : base.ts / subschemas.ts / types.ts) est EXCLU :
 * ce n'est pas un module de section. (Liste alignée sur gen-section-aggregate.mjs.)
 *
 * Méthode : analyse STATIQUE (lecture texte + regex tolérante), JAMAIS d'`import()`.
 * Les modules importent `astro:content` (module virtuel Astro non résoluble hors build)
 * et un `.astro` (non chargeable par Node), exactement comme check-touchpoints.mjs.
 *
 * Sortie :
 *   - rapport par module : OK / liste des manques.
 *   - récap « N modules valides / M ».
 *   - exit 0 si tous valides, exit 1 si AU MOINS un module incomplet (drift réel),
 *     exit 2 si le scan est suspect (répertoire src/sections absent).
 *
 * Contraintes (alignées sur les autres gates) : 0 dépendance npm (node built-ins),
 * déterministe, tri alphabétique, 0 U+2014 (rule 58).
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODULES_DIR = join(ROOT, 'src/sections');

// Dossiers ignorés : feuilles partagées, pas des modules de section.
// (Même liste que IGNORED_DIRS dans gen-section-aggregate.mjs.)
const IGNORED_DIRS = new Set(['_shared']);

// Les 5 fichiers requis par module.
const REQUIRED_FILES = ['schema.ts', 'demo.ts', 'meta.ts', 'Component.astro', 'index.ts'];

// Les clés de facette que le default export du module doit référencer (au minimum).
// `id` et un éventuel `consumers` sont tolérés mais non exigés.
const REQUIRED_INDEX_KEYS = ['schema', 'demo', 'meta', 'Component'];

// ── Découverte des modules ────────────────────────────────────────────────────
// Un module = un sous-dossier de src/sections/ (hors _shared).
function discoverModules() {
  const out = [];
  for (const entry of readdirSync(MODULES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (IGNORED_DIRS.has(entry.name)) continue;
    out.push({ type: entry.name, dir: join(MODULES_DIR, entry.name) });
  }
  out.sort((a, b) => a.type.localeCompare(b.type, 'en'));
  return out;
}

// ── Analyse du default export de index.ts (regex tolérante) ───────────────────
// On isole le bloc `export default { ... }` par scan d'accolades équilibré, puis on
// vérifie la présence de chaque clé requise. On accepte `key,` (shorthand) comme
// `key: value` (idiome des 3 pilotes : { id, schema, demo, meta, Component }).
function matchBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function analyzeIndex(indexPath) {
  const src = readFileSync(indexPath, 'utf8');
  const decl = /export\s+default\s*\{/.exec(src);
  if (!decl) {
    return { hasDefaultObject: false, missingKeys: [...REQUIRED_INDEX_KEYS] };
  }
  const open = decl.index + decl[0].length - 1;
  const end = matchBrace(src, open);
  if (end === -1) {
    return { hasDefaultObject: false, missingKeys: [...REQUIRED_INDEX_KEYS] };
  }
  const body = src.slice(open + 1, end);
  const missingKeys = REQUIRED_INDEX_KEYS.filter((key) => {
    // `key:` (paire) OU `key,` / `key }` (shorthand), borné par début de propriété.
    const re = new RegExp(`(^|[\\s,{])${key}\\s*(:|,|\\}|$)`);
    return !re.test(body);
  });
  return { hasDefaultObject: true, missingKeys };
}

// ── Vérification d'un module ──────────────────────────────────────────────────
function checkModule(mod) {
  const issues = [];

  // Fichiers présents sur disque (uniquement des fichiers réguliers).
  const present = new Set(
    readdirSync(mod.dir, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => e.name),
  );

  const missingFiles = REQUIRED_FILES.filter((f) => !present.has(f));

  // Module fantôme : dossier présent mais AUCUN des fichiers requis.
  const ghost = REQUIRED_FILES.every((f) => !present.has(f));
  if (ghost) {
    issues.push('module fantôme : dossier présent, 0 fichier requis');
    return { ...mod, ok: false, issues };
  }

  for (const f of missingFiles) issues.push(`fichier requis manquant : ${f}`);

  // Analyse de index.ts uniquement s'il existe (sinon déjà signalé ci-dessus).
  if (present.has('index.ts')) {
    const idx = analyzeIndex(join(mod.dir, 'index.ts'));
    if (!idx.hasDefaultObject) {
      issues.push("index.ts : `export default { ... }` introuvable");
    } else if (idx.missingKeys.length) {
      issues.push(`index.ts : clés du default export manquantes -> ${idx.missingKeys.join(', ')}`);
    }
  }

  return { ...mod, ok: issues.length === 0, issues };
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  if (!existsSync(MODULES_DIR) || !statSync(MODULES_DIR).isDirectory()) {
    console.error(`✗ FATAL : répertoire introuvable -> src/sections (${MODULES_DIR}).`);
    process.exit(2);
  }

  const modules = discoverModules();

  console.log('━━━ check-section-modules : gate de complétude des modules co-localisés (Wave #38) ━━━');
  console.log(`Modules scannés (hors _shared) : ${modules.length}`);
  console.log(`Contrat : 5 fichiers requis + default export { ${REQUIRED_INDEX_KEYS.join(', ')} }\n`);

  if (modules.length === 0) {
    // État T1 (aucun module encore migré) : pas un échec, juste un no-op informatif.
    console.log('Aucun module co-localisé pour l\'instant (état pré-migration). Rien à vérifier.');
    console.log('\n✓ 0 module valide / 0.');
    process.exit(0);
  }

  const results = modules.map(checkModule);

  let valid = 0;
  for (const r of results) {
    if (r.ok) {
      valid++;
      console.log(`✓ ${r.type} : OK`);
    } else {
      console.log(`✗ ${r.type} : INCOMPLET`);
      for (const issue of r.issues) console.log(`    - ${issue}`);
    }
  }

  const total = results.length;
  console.log('');
  console.log(`Résumé : ${valid} module(s) valide(s) / ${total}.`);

  if (valid !== total) {
    console.log(`\n✗ ${total - valid} module(s) incomplet(s). Compléter les fichiers/clés manquants.`);
    process.exit(1);
  }
  console.log('\n✓ Tous les modules co-localisés sont complets.');
  process.exit(0);
}

main();
