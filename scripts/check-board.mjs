#!/usr/bin/env node
// scripts/check-board.mjs - gate fine : invariant plan maître <-> git.
//
// N'écrit RIEN. Réutilise la logique de sync-board.mjs (pas de duplication du parsing).
//   exit 1 si désync DURE ([x] dont le commit n'existe pas dans git).
//   exit 0 sinon (warnings tolérés, listés).
//   exit 2 si erreur fatale (plan introuvable).

import { parseAndCheck } from './sync-board.mjs';

let result;
try {
  result = parseAndCheck();
} catch (err) {
  console.error(`✗ FATAL : ${err.message}`);
  process.exit(2);
}

const { tasks, hard, warnings } = result;
const done = tasks.filter((t) => t.status === 'done').length;

console.log('━━━ check-board - invariant [x] => commit présent dans git ━━━');
console.log(`HEAD ${tasks.length} tâche(s), ${done} done`);

if (warnings.length) {
  console.log(`⚠ ${warnings.length} warning(s) (non bloquant) :`);
  for (const w of warnings) console.log(`    [${w.id}] ${w.detail}`);
}

if (hard.length > 0) {
  console.error(`✗ ${hard.length} désync(s) DURE(s) :`);
  for (const d of hard) console.error(`    [${d.id}] ${d.detail}`);
  console.error('✗ FAIL - synchronise le plan maître avec git (cf sync-board.mjs --regen).');
  process.exit(1);
}

console.log('✓ PASS - toute case [x] référence un commit présent dans git.');
process.exit(0);
