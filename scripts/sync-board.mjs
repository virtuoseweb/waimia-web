#!/usr/bin/env node
// scripts/sync-board.mjs - moteur de synchronisation du board waimia-web
//
// Réconcilie le PLAN MAÎTRE (intention) avec GIT (réalité) et génère un board lisible.
//
//   Plan maître  : docs/state/02-plan-execution-claude-code.md (cases markdown)
//   Réalité git  : git cat-file -e <sha> (existence) + git show -s (sujet)
//   Artefacts    : docs/state/00-BOARD.md (humain) + tasks/claude-board.json (pont task-list)
//
// Modes (argv) :
//   --regen | --write : régénère les artefacts + résumé. Exit 0 sauf erreur I/O.
//   --check (défaut)  : ne réécrit rien ; vérifie l'invariant. Exit 1 si désync DURE.
//
// Invariant : [x] (done) => tag `sb commit=<sha>` ET <sha> existe dans git.
//             Sinon = DÉSYNC DURE (bloquante).
//   Warnings (exit 0) : [x] sans tag commit ; [x] avec gf1=n ou gf1 absent.
//
// Contraintes : 0 dépendance npm (Node stdlib + child_process pour git de LECTURE).
//               Déterminisme : pas de Date.now()/new Date() dans la génération (HEAD only).
//               0 tiret cadratin U+2014 dans le code ou les sorties.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PLAN_FILE = 'docs/state/02-plan-execution-claude-code.md';
const BOARD_FILE = 'docs/state/00-BOARD.md';
const JSON_FILE = 'tasks/claude-board.json';

// id d'une tâche : P<digits>.<digits>(-<lettre>)? - lettre maj OU min (le plan utilise les deux).
const ID_RE = /\bP\d+\.\d+(?:-[A-Za-z])?\b/;
// id de phase : la partie P<digits> de l'id.
const PHASE_RE = /^(P\d+)\./;
// case markdown : - [x] ou - [ ] (on ne compte que done/open ; [~]/[?] = open non-coché).
const TASK_RE = /^\s*-\s*\[([ xX~?])\]\s+(.*)$/;
// tag machine optionnel en fin de ligne : <!-- sb commit=<sha> gf1=<y|n|na> [note=...] -->
const SB_TAG_RE = /<!--\s*sb\b([^>]*?)-->/;

// ── Helpers git (LECTURE seule) ──────────────────────────────────────────────
function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function headShort() {
  return git(['rev-parse', '--short', 'HEAD']) || 'unknown';
}

/** true si <sha> résout vers un objet commit existant. */
function commitExists(sha) {
  try {
    execFileSync('git', ['cat-file', '-e', `${sha}^{commit}`], {
      cwd: ROOT,
      stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

/** sujet court d'un commit (sha + sujet) ou null si introuvable. */
function commitSubject(sha) {
  return git(['show', '-s', '--format=%h %s', `${sha}^{commit}`]);
}

// ── Parsing du tag machine ───────────────────────────────────────────────────
function parseSbTag(line) {
  const m = line.match(SB_TAG_RE);
  if (!m) return null;
  const body = m[1];
  const out = { commit: null, gf1: null, note: null };
  const commit = body.match(/\bcommit=([0-9a-fA-F]+)\b/);
  if (commit) out.commit = commit[1];
  const gf1 = body.match(/\bgf1=(y|n|na)\b/i);
  if (gf1) out.gf1 = gf1[1].toLowerCase();
  const note = body.match(/\bnote=([^\s][^>]*?)\s*$/);
  if (note) out.note = note[1].trim();
  return out;
}

/** titre court : le **gras** de début si présent, sinon le texte nettoyé du tag. */
function extractTitle(rest) {
  const bold = rest.match(/^\*\*(.+?)\*\*/);
  if (bold) return bold[1].trim();
  return rest.replace(SB_TAG_RE, '').trim();
}

/**
 * Un titre de section compte comme "chantier" s'il porte un id de phase/chantier
 * (ex « ## Chantier P0.2 - … » ou « ### P0.2 - … »). On ignore les sous-titres
 * génériques (« Tâches finies », « Tâches en attente », « Méthode … », « Index … »).
 */
function chantierFromHeading(headingText) {
  if (!ID_RE.test(headingText)) return null;
  return headingText.replace(/^#+\s*/, '').replace(/^Chantier\s+/i, '').trim();
}

// ── Parsing du plan maître ───────────────────────────────────────────────────
export function parsePlan() {
  const planPath = join(ROOT, PLAN_FILE);
  if (!existsSync(planPath)) {
    throw new Error(`Plan maître introuvable : ${PLAN_FILE}`);
  }
  const lines = readFileSync(planPath, 'utf8').split('\n');
  const tasks = [];
  let currentChantier = null;

  for (const raw of lines) {
    const heading = raw.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      const c = chantierFromHeading(heading[2]);
      if (c) currentChantier = c;
      continue;
    }
    const t = raw.match(TASK_RE);
    if (!t) continue;
    const box = t[1];
    const rest = t[2];
    const idMatch = rest.match(ID_RE);
    if (!idMatch) continue; // ligne cochée sans id = bruit, on ignore
    const id = idMatch[0];
    const phase = (id.match(PHASE_RE) || [])[1] || 'P?';
    const status = box.toLowerCase() === 'x' ? 'done' : 'open';
    const tag = parseSbTag(rest);
    tasks.push({
      id,
      phase,
      chantier: currentChantier || '(hors chantier)',
      status,
      commit: tag?.commit ?? null,
      gf1: tag?.gf1 ?? null,
      note: tag?.note ?? null,
      title: extractTitle(rest),
    });
  }
  return tasks;
}

// ── Réconciliation plan <-> git ──────────────────────────────────────────────
/**
 * Enrichit chaque tâche d'un verdict git et collecte les désyncs.
 * Retourne { tasks (enrichies), hard, warnings }.
 *   hard     : [x] avec commit déclaré mais absent de git (DÉSYNC DURE).
 *   warnings : [x] sans tag commit ; [x] avec gf1 manquant/n.
 */
export function reconcile(tasks) {
  const hard = [];
  const warnings = [];
  const subjectCache = new Map();

  for (const task of tasks) {
    task.commitExists = false;
    task.commitSubject = null;

    if (task.commit) {
      if (!subjectCache.has(task.commit)) {
        subjectCache.set(
          task.commit,
          commitExists(task.commit) ? { exists: true, subject: commitSubject(task.commit) } : { exists: false, subject: null },
        );
      }
      const resolved = subjectCache.get(task.commit);
      task.commitExists = resolved.exists;
      task.commitSubject = resolved.subject;
    }

    if (task.status === 'done') {
      if (!task.commit) {
        warnings.push({ id: task.id, kind: 'no-commit', detail: 'case [x] sans tag commit' });
      } else if (!task.commitExists) {
        hard.push({ id: task.id, kind: 'unknown-commit', detail: `commit=${task.commit} absent de git` });
      }
      if (task.gf1 !== 'y' && task.gf1 !== 'na') {
        warnings.push({ id: task.id, kind: 'gf1', detail: `gf1=${task.gf1 ?? 'absent'} sur une case [x]` });
      }
    }
  }
  return { tasks, hard, warnings };
}

/** Point d'entrée réutilisable par la gate fine (check-board.mjs). */
export function parseAndCheck() {
  const tasks = parsePlan();
  return reconcile(tasks);
}

// ── Agrégation ───────────────────────────────────────────────────────────────
function pct(done, total) {
  if (total === 0) return '0%';
  return `${Math.round((done / total) * 100)}%`;
}

function byPhase(tasks) {
  const map = new Map();
  for (const t of tasks) {
    if (!map.has(t.phase)) map.set(t.phase, { phase: t.phase, done: 0, total: 0, open: [] });
    const e = map.get(t.phase);
    e.total += 1;
    if (t.status === 'done') e.done += 1;
    else e.open.push(t.title);
  }
  return [...map.values()].sort((a, b) => a.phase.localeCompare(b.phase));
}

function byChantier(tasks) {
  const map = new Map();
  for (const t of tasks) {
    if (!map.has(t.chantier)) {
      map.set(t.chantier, { chantier: t.chantier, phase: t.phase, done: 0, total: 0, commits: [] });
    }
    const e = map.get(t.chantier);
    e.total += 1;
    if (t.status === 'done') {
      e.done += 1;
      if (t.commit && t.commitExists && t.commitSubject) e.commits.push(t.commitSubject);
    }
  }
  return [...map.values()].sort(
    (a, b) => a.phase.localeCompare(b.phase) || a.chantier.localeCompare(b.chantier),
  );
}

// ── Génération des artefacts ─────────────────────────────────────────────────
function mdEscapePipe(s) {
  return String(s).replace(/\|/g, '\\|');
}

function buildBoardMd(tasks, hard, warnings) {
  const head = headShort();
  const phases = byPhase(tasks);
  const chantiers = byChantier(tasks);
  const totalDone = tasks.filter((t) => t.status === 'done').length;

  const out = [];
  out.push('<!-- GÉNÉRÉ par sync-board.mjs - NE PAS ÉDITER À LA MAIN -->');
  out.push('');
  out.push('# 00 - Board (généré)');
  out.push('');
  out.push(`État : HEAD \`${head}\` - ${totalDone}/${tasks.length} tâches done (${pct(totalDone, tasks.length)}).`);
  out.push('');

  out.push('## Avancement par phase');
  out.push('');
  out.push('| Phase | done/total | % | Reste (tâches `[ ]`, cappé 5) |');
  out.push('| --- | --- | --- | --- |');
  for (const p of phases) {
    const reste = p.open.slice(0, 5).map(mdEscapePipe).join(' ; ');
    const more = p.open.length > 5 ? ` (+${p.open.length - 5})` : '';
    out.push(`| ${p.phase} | ${p.done}/${p.total} | ${pct(p.done, p.total)} | ${reste || '-'}${more} |`);
  }
  out.push('');

  out.push('## Avancement par chantier');
  out.push('');
  out.push('| Chantier | Phase | done/total | % | Derniers commits (cappé 3) |');
  out.push('| --- | --- | --- | --- | --- |');
  for (const c of chantiers) {
    const commits = c.commits.slice(-3).map(mdEscapePipe).join(' ; ');
    out.push(`| ${mdEscapePipe(c.chantier)} | ${c.phase} | ${c.done}/${c.total} | ${pct(c.done, c.total)} | ${commits || '-'} |`);
  }
  out.push('');

  out.push('## ⚠ Désyncs');
  out.push('');
  if (hard.length === 0 && warnings.length === 0) {
    out.push('Aucune désync détectée.');
  } else {
    if (hard.length) {
      out.push('### Dures (bloquantes)');
      out.push('');
      for (const d of hard) out.push(`- \`${d.id}\` : ${mdEscapePipe(d.detail)}`);
      out.push('');
    }
    if (warnings.length) {
      out.push('### Warnings');
      out.push('');
      for (const w of warnings) out.push(`- \`${w.id}\` : ${mdEscapePipe(w.detail)}`);
      out.push('');
    }
  }
  out.push('');
  return out.join('\n');
}

function buildBoardJson(tasks) {
  const sorted = [...tasks].sort((a, b) => a.id.localeCompare(b.id));
  const rows = sorted.map((t) => ({
    id: t.id,
    phase: t.phase,
    chantier: t.chantier,
    status: t.status,
    commit: t.commit,
    gf1: t.gf1,
    title: t.title,
  }));
  return `${JSON.stringify(rows, null, 2)}\n`;
}

function writeArtifacts(tasks, hard, warnings) {
  const boardMd = buildBoardMd(tasks, hard, warnings);
  const boardJson = buildBoardJson(tasks);
  writeFileSync(join(ROOT, BOARD_FILE), boardMd, 'utf8');
  mkdirSync(join(ROOT, dirname(JSON_FILE)), { recursive: true });
  writeFileSync(join(ROOT, JSON_FILE), boardJson, 'utf8');
  return { boardMd, boardJson };
}

// ── Rapport console ──────────────────────────────────────────────────────────
function printSummary({ tasks, hard, warnings }) {
  const done = tasks.filter((t) => t.status === 'done').length;
  console.log('━━━ sync-board - réconciliation plan maître <-> git ━━━');
  console.log(`HEAD ${headShort()} - ${done}/${tasks.length} tâches done`);
  if (hard.length) {
    console.log(`✗ ${hard.length} désync(s) DURE(s) :`);
    for (const d of hard) console.log(`    [${d.id}] ${d.detail}`);
  } else {
    console.log('✓ 0 désync dure');
  }
  if (warnings.length) {
    console.log(`⚠ ${warnings.length} warning(s) :`);
    for (const w of warnings) console.log(`    [${w.id}] ${w.detail}`);
  } else {
    console.log('✓ 0 warning');
  }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
function main() {
  const argv = process.argv.slice(2);
  const isRegen = argv.includes('--regen') || argv.includes('--write');

  let result;
  try {
    result = parseAndCheck();
  } catch (err) {
    console.error(`✗ FATAL : ${err.message}`);
    process.exit(2);
  }

  if (isRegen) {
    try {
      writeArtifacts(result.tasks, result.hard, result.warnings);
    } catch (err) {
      console.error(`✗ FATAL I/O : ${err.message}`);
      process.exit(2);
    }
    printSummary(result);
    console.log('');
    console.log(`✓ régénéré : ${BOARD_FILE} + ${JSON_FILE}`);
    process.exit(0);
  }

  // mode --check (défaut)
  printSummary(result);
  if (result.hard.length > 0) {
    console.log('');
    console.log('✗ DÉSYNC DURE - une case [x] référence un commit absent de git.');
    process.exit(1);
  }
  process.exit(0);
}

// Exécution directe uniquement (pas lors d'un import par check-board.mjs).
if (resolve(process.argv[1] || '') === resolve(fileURLToPath(import.meta.url))) {
  main();
}
