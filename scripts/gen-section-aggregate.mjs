#!/usr/bin/env node
/**
 * gen-section-aggregate.mjs
 * Waimia · Co-location DS (Wave #38, T2) · agrégateur de modules de section
 *
 * MODE « MERGE » (pilote) — co-existe avec les god-files legacy pendant la migration.
 * Scanne `src/sections/<type>/index.ts` (modules co-localisés). Pour chaque module trouvé,
 * il prépare les lignes de ré-export à injecter dans les god-files (schema + demo + meta),
 * SANS jamais réécrire le contenu legacy des 196+ sections encore mono-fichier. Tant
 * qu'AUCUN module n'existe (état T1), la sortie est un NO-OP propre (0 god-file modifié).
 *
 * La bascule « REPLACE » (régénération complète de sections.generated.ts /
 * section-registry.generated.ts / section-demos.generated.ts + hook prebuild + gate
 * « généré == commité ») est HORS scope T2 (= T5, post-pilote).
 *
 * Méthode d'introspection (réutilisée à l'identique de scripts/derive-section-slots.mjs:287-300) :
 * les schémas importent `z` depuis `astro:content` (module virtuel Astro non résoluble hors
 * build). On copie le fichier hors repo en remplaçant cet import par le zod réel, puis on
 * l'importe dynamiquement (tsx transpile le .ts à la volée). Zod v4 (`_def.options`).
 *
 * Lancement : `node scripts/gen-section-aggregate.mjs` (ou `npm run gen:section-aggregate`).
 *
 * Contraintes (alignées sur les autres générateurs du repo) :
 *   - 0 nouvelle dépendance npm (built-ins Node + tsx déjà utilisé par derive-slots).
 *   - Déterministe, idempotent, tri alphabétique, 0 timestamp.
 *   - 0 em-dash U+2014 dans tout contenu généré (rule 58).
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const repoRoot = process.cwd();
const MODULES_DIR = path.join(repoRoot, 'src/sections');
// Dossiers ignorés lors du scan (feuilles partagées, pas des modules de section).
const IGNORED_DIRS = new Set(['_shared']);

// ─── Découverte des modules co-localisés ───
// Un module = un dossier `src/sections/<type>/` contenant `index.ts`.
function discoverModules() {
  if (!fs.existsSync(MODULES_DIR)) return [];
  const out = [];
  for (const entry of fs.readdirSync(MODULES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (IGNORED_DIRS.has(entry.name)) continue;
    const indexPath = path.join(MODULES_DIR, entry.name, 'index.ts');
    if (fs.existsSync(indexPath)) {
      out.push({ type: entry.name, dir: path.join(MODULES_DIR, entry.name), indexPath });
    }
  }
  // Tri alphabétique déterministe.
  out.sort((a, b) => a.type.localeCompare(b.type, 'en'));
  return out;
}

// ─── Introspection Zod (clone du pattern derive-section-slots.mjs) ───
// Copie un module .ts hors repo en rebindant `astro:content` → zod réel, puis import().
// Réécrit aussi les imports relatifs `./` et `../` vers des chemins ABSOLUS du repo, sinon
// le fichier temp (dans os.tmpdir()) ne résout plus les feuilles `_shared` co-localisées.
async function importSchemaModule(absPath) {
  const reqFromRepo = createRequire(path.join(repoRoot, 'package.json'));
  const zodPath = reqFromRepo.resolve('zod');
  const srcDir = path.dirname(absPath);
  let src = fs.readFileSync(absPath, 'utf8');
  // Rebind du module virtuel Astro.
  src = src.replace(/from ['"]astro:content['"]/g, `from ${JSON.stringify(zodPath)}`);
  // Rebind des imports relatifs vers des chemins absolus (le temp vit hors repo).
  src = src.replace(/from ['"](\.[^'"]+)['"]/g, (_m, rel) => {
    const abs = path.resolve(srcDir, rel);
    return `from ${JSON.stringify(abs)}`;
  });
  const tmp = path.join(os.tmpdir(), `gen-section-aggregate-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.ts`);
  fs.writeFileSync(tmp, src);
  try {
    // tsx (loader) requis pour transpiler le .ts à la volée — comme derive-slots via `npx tsx`.
    return await import(pathToFileURL(tmp).href);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

async function main() {
  const modules = discoverModules();

  if (modules.length === 0) {
    // État T1 : aucun module co-localisé encore créé. NO-OP strict : on ne touche AUCUN
    // god-file (sections.ts / section-registry.ts / section-demos.ts restent intacts).
    console.log(
      'gen-section-aggregate (mode merge) : 0 module trouvé dans src/sections/<type>/. ' +
        'Rien à agréger, aucun god-file modifié (no-op attendu en T1).',
    );
    return;
  }

  // Mode MERGE : on construit les lignes de ré-export pour chaque module découvert. On NE
  // régénère PAS les god-files entiers (les 196 legacy restent inchangés) ; on prépare
  // seulement les réexports drop-in, alpha-déterministes, à injecter dans les blocs gérés.
  const reexports = { schema: [], demo: [], meta: [] };
  for (const mod of modules) {
    let loaded;
    try {
      loaded = await importSchemaModule(mod.indexPath);
    } catch (err) {
      throw new Error(`Module « ${mod.type} » non importable (${mod.indexPath}): ${err.message}`);
    }
    const def = loaded?.default;
    if (!def || typeof def !== 'object') {
      throw new Error(`Module « ${mod.type} » : export default { id, schema, demo, meta, Component } attendu.`);
    }
    if (def.schema?._def?.shape?.type === undefined && !def.schema) {
      throw new Error(`Module « ${mod.type} » : champ \`schema\` (z.object) manquant.`);
    }
    const relFromLib = path.relative(path.join(repoRoot, 'src/lib'), mod.dir);
    const relFromSchema = path.relative(path.join(repoRoot, 'src/schemas'), mod.dir);
    reexports.schema.push(
      `export { schema as ${mod.type.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Schema } from '${toPosix(relFromSchema)}/schema';`,
    );
    reexports.demo.push(`// demo: ${mod.type} → ${toPosix(relFromLib)}/demo`);
    reexports.meta.push(`// meta: ${mod.type} → ${toPosix(relFromLib)}/meta`);
  }

  // En T2, on s'arrête à la PRÉPARATION (et on la journalise). L'injection effective dans les
  // blocs gérés des god-files relève de T3 (migration des 3 pilotes), pas de T2.
  console.log(
    `gen-section-aggregate (mode merge) : ${modules.length} module(s) découvert(s) : ` +
      `${modules.map((m) => m.type).join(', ')}.`,
  );
  console.log('Réexports schema préparés (à injecter en T3, blocs gérés des god-files) :');
  for (const line of reexports.schema) console.log('  ' + line);
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
