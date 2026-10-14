// =============================================================================
// Crochet PreToolUse Bash « on attend un PID, jamais un motif », pour Claude Code
// (.claude/settings.json). Porté de waimia-os (tools/fabrique/crochet-attente.mjs).
//
//   node scripts/claude/crochet-attente.mjs
//
// Entrée JSON sur stdin : `tool_input.command`. Une boucle `until`/`while` qui teste
// `pgrep -f <motif>` est refusée : le motif attrape les builds des lots frères et
// la boucle elle-même, qui ne finit alors jamais. Le remède : attendre un PID
// (`kill -0`), ou lancer en fond et attendre la notification de la tâche.
//
// Ne refuse que cette forme ; rend 0 sans sortie sur toute erreur : un crochet qui
// piégerait l agent serait une panne.
// =============================================================================

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Retire le corps des documents ici (<<'FIN' ... FIN) : un message de commit n est pas une boucle. */
function sansDocumentsIci(commande) {
  return commande.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\b/gu, '');
}

/**
 * Vrai si la commande attend, dans une boucle, un processus désigné par un motif.
 * `until`/`while` doit être en position de commande (début, après ; & | ( { do then, ou après un guillemet
 * ouvrant comme `bash -c "until ..."`), jamais au milieu d une phrase.
 */
export function attendUnMotif(commande) {
  const texte = sansDocumentsIci(String(commande));
  return /(?:^|[;&|({"'\n]|\b(?:do|then)\b)\s*(?:until|while)\b[^\n]*\bpgrep\s+(?:-[a-z]*f[a-z]*)\b/u.test(texte);
}

export function decider(entree) {
  const commande = entree?.tool_input?.command;
  if (typeof commande !== 'string' || !attendUnMotif(commande)) return null;
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        'Boucle d attente par `pgrep -f <motif>` refusée : le motif attrape les builds des autres lots et la boucle elle-même, elle ne finit jamais. Attends un PID nommé (`until ! kill -0 <pid>`) ou lance en fond (`run_in_background`) et attends la notification.',
    },
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const sortie = decider(JSON.parse(readFileSync(0, 'utf8')));
    if (sortie !== null) process.stdout.write(`${JSON.stringify(sortie)}\n`);
  } catch (erreur) {
    // rend 0 sans sortie sur stdout : jamais une panne du développement ; la cause va sur stderr
    process.stderr.write(`crochet-attente : ${erreur instanceof Error ? erreur.message : String(erreur)}\n`);
  }
  process.exit(0);
}
