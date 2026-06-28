#!/usr/bin/env node
/**
 * check-section-aggregate.mjs : gate « généré == commité » des agrégats de section (Wave #38 T5).
 *
 * Les 4 fichiers `*.generated.ts` (kernel : sections.generated.ts + section-family.generated.ts ;
 * app : section-registry.generated.ts + section-demos.generated.ts) sont COMMITES mais 100 %
 * dérivés des modules co-localisés `src/sections/<type>/` (+ schema.ts cote kernel depuis #40 T3
 * etape 2). Ce gate régénère le contenu EN MEMOIRE (buildGenerated) et le compare
 * octet à octet au contenu commité : tout écart = drift (modules modifiés sans régénérer, ou
 * édition à la main d'un fichier généré) → exit 1.
 *
 * Clone du pattern de scripts/check-token-lock.mjs (régénère → compare → échoue si drift).
 * Déterministe, 0 dépendance npm, 0 U+2014 (rule 58).
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function main() {
  const genUrl = pathToFileURL(join(ROOT, 'scripts/gen-section-aggregate.mjs')).href;
  const { buildGenerated } = await import(genUrl);

  let built;
  try {
    built = buildGenerated();
  } catch (err) {
    console.error('✗ FATAL : génération en mémoire impossible - ' + err.message);
    process.exit(2);
  }
  const { ids, ...files } = built;

  console.log('━━━ check-section-aggregate : gate « généré == commité » (Wave #38 T5) ━━━');
  console.log(`Modules agrégés : ${ids.length}\n`);

  let drift = false;
  for (const [rel, expected] of Object.entries(files)) {
    const p = join(ROOT, rel);
    if (!existsSync(p)) {
      drift = true;
      console.log(`✗ ${rel} : ABSENT (lancer \`npm run gen:section-aggregate\`)`);
      continue;
    }
    const actual = readFileSync(p, 'utf8');
    if (actual === expected) {
      console.log(`✓ ${rel} : à jour`);
    } else {
      drift = true;
      console.log(`✗ ${rel} : DRIFT (le commité diffère du régénéré)`);
      // Diagnostic : 1ʳᵉ ligne divergente.
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
    console.log('✗ DRIFT des agrégats. Lance `npm run gen:section-aggregate` puis recommit.');
    process.exit(1);
  }
  console.log('✓ Les agrégats générés sont alignés avec les modules.');
  process.exit(0);
}

main();
