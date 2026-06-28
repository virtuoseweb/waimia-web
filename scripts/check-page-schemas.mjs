#!/usr/bin/env node
// Waimia · Mission #39 · Gate « généré == commité » des JSON Schema de page.
//
// Les 6 fichiers `src/schemas/generated/<col>.page.schema.json` sont COMMITES mais 100 %
// dérivés du Zod de `src/content.config.ts`. Ce gate régénère le contenu EN MEMOIRE
// (buildPageSchemas) et le compare octet à octet au contenu commité : tout écart = drift
// (schéma Zod modifié sans régénérer, ou édition à la main d'un fichier généré) -> exit 1.
//
// Clone du pattern de scripts/check-section-aggregate.mjs.
// Déterministe, 0 U+2014 (rule 58).

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_REL = 'src/schemas/generated';

async function main() {
  const genUrl = pathToFileURL(join(ROOT, 'scripts/gen-page-schemas.mjs')).href;
  const { buildPageSchemas } = await import(genUrl);

  let built;
  try {
    built = await buildPageSchemas();
  } catch (err) {
    console.error('✗ FATAL : génération en mémoire impossible - ' + err.message);
    process.exit(2);
  }

  console.log('━━━ check-page-schemas : gate « généré == commité » (Mission #39) ━━━');
  console.log(`JSON Schema attendus : ${Object.keys(built).length}\n`);

  let drift = false;
  for (const [name, expected] of Object.entries(built)) {
    const rel = join(OUT_REL, name);
    const p = join(ROOT, rel);
    if (!existsSync(p)) {
      drift = true;
      console.log(`✗ ${rel} : ABSENT (lancer \`npm run gen:page-schemas\`)`);
      continue;
    }
    const actual = readFileSync(p, 'utf8');
    if (actual === expected) {
      console.log(`✓ ${rel} : à jour`);
    } else {
      drift = true;
      console.log(`✗ ${rel} : DRIFT (le commité diffère du régénéré)`);
      const a = actual.split('\n');
      const e = expected.split('\n');
      const n = Math.max(a.length, e.length);
      for (let i = 0; i < n; i++) {
        if (a[i] !== e[i]) {
          console.log(`    1ʳᵉ ligne divergente (#${i + 1}) :`);
          console.log(`      commité  : ${JSON.stringify(a[i] ?? '<EOF>')}`);
          console.log(`      régénéré : ${JSON.stringify(e[i] ?? '<EOF>')}`);
          break;
        }
      }
    }
  }

  console.log('');
  if (drift) {
    console.log('✗ DRIFT des JSON Schema de page. Lance `npm run gen:page-schemas` puis recommit.');
    process.exit(1);
  }
  console.log('✓ Les 6 JSON Schema générés sont alignés avec le Zod de content.config.ts.');
  process.exit(0);
}

main();
