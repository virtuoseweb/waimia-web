// =============================================================================
// Crochet PreToolUse Bash « un lourd à la fois » (machine : 12 CPU, 24 Go de RAM).
//
//   node scripts/claude/crochet-ressources.mjs
//
// Entrée JSON sur stdin : `tool_input.command`. Si la commande est lourde (build
// Astro, astro check, playwright test, install ou ci, lighthouse) et qu un
// processus lourd tourne déjà (lu via `ps -axo pid,command`), elle est refusée en
// nommant le PID et la commande en cours. Échappatoire : `WAIMIA_LOURD_OK=1` dans
// la commande. Toute erreur rend 0 sans sortie : un crochet qui piégerait l agent
// serait une panne.
// =============================================================================

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ECHAPPATOIRE = 'WAIMIA_LOURD_OK=1';

// Formes lourdes, valables pour une commande saisie comme pour une ligne de `ps`.
const MOTIFS_LOURDS = [
  /\bastro(?:\.m?js)?\s+(?:build|check)\b/u,
  /\b(?:pnpm|npm|yarn)(?:\.c?js)?(?:@[\w.]+)?\s+(?:(?:--?[\w-]+(?:=\S+)?|exec|run)\s+)*(?:build|install|i|ci)(?=\s|$|[;&|)"'])/u,
  /\bplaywright(?:\.js)?\s+test\b/u,
  /\blighthouse\b/u,
];

// Premiers mots d une ligne de `ps` qui ne sont pas le travail lui-même : le shell
// d enveloppe de la tâche (le vrai processus est son enfant), les outils de lecture.
const ENVELOPPES = new Set(['bash', 'zsh', 'sh', 'dash', 'fish', 'grep', 'rg', 'ps', 'pgrep', 'tail', 'cat', 'less', 'git', 'claude', 'codex', 'vim', 'nvim']);

/** Retire le corps des documents ici (<<'FIN' ... FIN) : un message de commit n est pas une commande. */
function sansDocumentsIci(commande) {
  return commande.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\b/gu, '');
}

/** Retire les chaînes entre guillemets : `grep 'astro build'` cherche un build, il n en lance pas. */
function sansGuillemets(commande) {
  return commande.replace(/'[^']*'|"[^"]*"/gu, "''");
}

export function estLourde(commande) {
  const texte = sansGuillemets(sansDocumentsIci(String(commande)));
  return MOTIFS_LOURDS.some((motif) => motif.test(texte));
}

/** Vrai si une ligne de `ps` (colonne command) est un processus lourd en cours. */
export function estProcessusLourd(ligne) {
  const commande = String(ligne).trim();
  const premier = basename(commande.split(/\s+/u)[0] ?? '');
  if (ENVELOPPES.has(premier)) return false;
  if (commande.includes('crochet-ressources')) return false;
  return MOTIFS_LOURDS.some((motif) => motif.test(commande));
}

/**
 * `processus` : [{ pid, command }]. Rend la sortie du crochet, ou null (accepter).
 * Les processus à exclure (le crochet, le shell courant) le sont à la lecture.
 */
export function decider(entree, processus = []) {
  const commande = entree?.tool_input?.command;
  if (typeof commande !== 'string' || commande.includes(ECHAPPATOIRE) || !estLourde(commande)) return null;
  const enCours = processus.find((p) => estProcessusLourd(p?.command ?? ''));
  if (enCours === undefined) return null;
  const nom = String(enCours.command).trim().slice(0, 160);
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: `Un processus lourd tourne déjà (PID ${enCours.pid} : ${nom}). La machine a 12 CPU et 24 Go : un build ou une suite lourde à la fois. Attends la notification de la tâche de fond (ou \`until ! kill -0 ${enCours.pid}\`), puis relance. Forcer : ajouter ${ECHAPPATOIRE} à la commande, seulement si Simon l a demandé.`,
    },
  };
}

/** Lit les processus de la machine, sans le crochet ni son parent (le shell courant). */
export function lireProcessus() {
  const sortie = execFileSync('ps', ['-axo', 'pid,command'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  const exclus = new Set([process.pid, process.ppid]);
  return sortie
    .split('\n')
    .slice(1)
    .map((ligne) => ligne.match(/^\s*(\d+)\s+(.*)$/u))
    .filter((m) => m !== null && !exclus.has(Number(m[1])))
    .map((m) => ({ pid: Number(m[1]), command: m[2] }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const entree = JSON.parse(readFileSync(0, 'utf8'));
    // ne lit les processus que pour une commande lourde sans échappatoire
    const commande = entree?.tool_input?.command;
    const aVerifier = typeof commande === 'string' && !commande.includes(ECHAPPATOIRE) && estLourde(commande);
    const sortie = aVerifier ? decider(entree, lireProcessus()) : null;
    if (sortie !== null) process.stdout.write(`${JSON.stringify(sortie)}\n`);
  } catch (erreur) {
    // rend 0 sans sortie sur stdout : jamais une panne du développement ; la cause va sur stderr
    process.stderr.write(`crochet-ressources : ${erreur instanceof Error ? erreur.message : String(erreur)}\n`);
  }
  process.exit(0);
}
