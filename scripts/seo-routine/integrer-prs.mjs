#!/usr/bin/env node
// Intègre les PR de la routine SEO quotidienne dans UNE branche, pour un seul build de production.
//
// Usage (depuis un worktree propre, sur la branche d'intégration créée depuis origin/main) :
//   node scripts/seo-routine/integrer-prs.mjs            # toutes les PR ouvertes feat/seo-*, par numéro
//   node scripts/seo-routine/integrer-prs.mjs 157 158    # PR choisies, dans cet ordre
//   node scripts/seo-routine/integrer-prs.mjs --continue 159 160  # reprend après une résolution à la main
//
// Pour chaque PR : `git merge` de sa branche. En cas de conflit :
//   - docs/seo/calendrier-editorial.json : fusion à trois voies ENTRÉE PAR ENTRÉE, par `id` ;
//   - docs/seo/journal.md : les deux côtés gardés, le plus récent (la PR fusionnée) en haut ;
//   - docs/seo/keywords.json : lignes ajoutées des deux côtés gardées, contrôle JSON et doublons ;
//   - src/lib/internal-mesh.ts : pages ajoutées des deux côtés gardées, refus d'une page en double ;
//   - *.generated.* : version de la PR, puis tout est régénéré à la fin ;
//   - tout autre fichier : arrêt, à résoudre à la main puis relancer avec --continue.
// Ne pousse rien, n'ouvre aucune PR, ne fusionne rien sur main.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const CALENDRIER = 'docs/seo/calendrier-editorial.json';
export const JOURNAL = 'docs/seo/journal.md';
const GENERATEURS = [
  'scripts/gen-section-aggregate.mjs',
  'scripts/gen-section-usage.mjs',
  'scripts/gen-section-instances.mjs',
  'scripts/gen-site-pages.mjs',
];

// Ordre de check-calendar.mjs (STATUTS) : une entrée ne recule jamais dans cet ordre.
const RANG_STATUT = ['idée', 'planifié', 'en cours', 'publié', 'mesuré', 'abandonné'];
const egal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const estListeAId = (l) =>
  Array.isArray(l) && l.every((x) => x && typeof x === 'object' && !Array.isArray(x) && 'id' in x);

/** Fusion à trois voies d'une valeur JSON ; les listes d'objets à `id` se fusionnent par `id`. */
export function fusionner(base, ours, theirs, chemin = '', conflits = []) {
  if (egal(ours, theirs)) return ours;
  if (egal(base, ours)) return theirs;
  if (egal(base, theirs)) return ours;
  const objet = (v) => v && typeof v === 'object' && !Array.isArray(v);
  if (objet(ours) && objet(theirs)) {
    const b = objet(base) ? base : {};
    const res = {};
    for (const k of [...Object.keys(ours), ...Object.keys(theirs).filter((k) => !(k in ours))]) {
      if (k in ours && k in theirs) res[k] = fusionner(b[k], ours[k], theirs[k], `${chemin}.${k}`, conflits);
      else if (k in ours) { if (!(k in b && egal(b[k], ours[k]))) res[k] = ours[k]; }
      else if (!(k in b && egal(b[k], theirs[k]))) res[k] = theirs[k];
    }
    return res;
  }
  if (estListeAId(ours) && estListeAId(theirs)) {
    const parId = (l) => new Map((estListeAId(l) ? l : []).map((x) => [x.id, x]));
    const b = parId(base), o = parId(ours), t = parId(theirs);
    const ordre = [...o.keys(), ...[...t.keys()].filter((id) => !o.has(id))];
    const res = [];
    for (const id of ordre) {
      if (o.has(id) && t.has(id)) {
        const [eo, et] = [o.get(id), t.get(id)];
        const [ro, rt] = [RANG_STATUT.indexOf(eo.statut), RANG_STATUT.indexOf(et.statut)];
        // Statuts différents : la PR qui a fait avancer l'entrée l'a réécrite d'un bloc (titre, URL,
        // angle, pr) ; on garde son entrée entière plutôt qu'un mélange champ par champ.
        if (ro !== rt && ro >= 0 && rt >= 0) res.push(ro > rt ? eo : et);
        else res.push(fusionner(b.get(id), eo, et, `${chemin}[${id}]`, conflits));
      }
      else if (o.has(id)) { if (!(b.has(id) && egal(b.get(id), o.get(id)))) res.push(o.get(id)); }
      else if (!(b.has(id) && egal(b.get(id), t.get(id)))) res.push(t.get(id));
    }
    return res;
  }
  // Même champ modifié des deux côtés : la PR fusionnée (plus récente) l'emporte, et on le signale.
  conflits.push(chemin || '(racine)');
  return theirs;
}

/** Résout les blocs de conflit du journal : côté PR (plus récent) au-dessus, côté branche dessous. */
export function resoudreJournal(texte) {
  return texte.replace(
    /^<<<<<<< [^\n]*\n([\s\S]*?)^=======\n([\s\S]*?)^>>>>>>> [^\n]*\n/gm,
    (_, ours, theirs) => theirs + (theirs.endsWith('\n\n') ? '' : '\n') + ours,
  );
}

/**
 * keywords.json garde une entrée par ligne : conflit = deux séries de lignes ajoutées en fin de
 * liste. On garde les deux (branche puis PR), virgule ajoutée entre elles, et on refuse un JSON
 * invalide ou une requête en double.
 */
export function resoudreMotsCles(texte) {
  const res = texte.replace(
    /^<<<<<<< [^\n]*\n([\s\S]*?)^=======\n([\s\S]*?)^>>>>>>> [^\n]*\n/gm,
    (_, ours, theirs) => ours.replace(/\}\s*\n$/, '},\n') + theirs,
  );
  const requetes = JSON.parse(res).keywords.map((k) => k.query);
  const doublons = requetes.filter((q, i) => requetes.indexOf(q) !== i);
  if (doublons.length) throw new Error(`requêtes en double dans keywords.json : ${doublons.join(', ')}`);
  return res;
}
export const MOTS_CLES = 'docs/seo/keywords.json';

/**
 * Registre du maillage (internal-mesh.ts) : une page par ligne `'/chemin': { ... },`. Conflit = deux
 * séries de pages ajoutées au même endroit : on garde les deux et on refuse une page en double.
 */
export function resoudreMaillage(texte) {
  let doublon = null;
  const res = texte.replace(
    /^<<<<<<< [^\n]*\n([\s\S]*?)^=======\n([\s\S]*?)^>>>>>>> [^\n]*\n/gm,
    (_, ours, theirs) => {
      const lignes = (ours + theirs).split('\n').filter(Boolean);
      if (!lignes.every((l) => /^\s*'\/[^']*': \{.*\},\s*$/.test(l))) throw new Error('bloc qui n\'est pas une liste de pages');
      const cles = lignes.map((l) => l.match(/'([^']*)'/)[1]);
      doublon ??= cles.find((c, i) => cles.indexOf(c) !== i);
      return ours + theirs;
    },
  );
  if (doublon) throw new Error(`page en double : ${doublon}`);
  return res;
}
export const MAILLAGE = 'src/lib/internal-mesh.ts';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
const gitOk = (...a) => { try { execFileSync('git', a, { stdio: 'ignore' }); return true; } catch { return false; } };

function resoudreConflits(pr) {
  const fichiers = git('diff', '--name-only', '--diff-filter=U').split('\n').filter(Boolean);
  const restants = [];
  for (const f of fichiers) {
    if (f === CALENDRIER) {
      const lire = (n) => JSON.parse(git('show', `:${n}:${f}`));
      const conflits = [];
      const res = fusionner(lire(1), lire(2), lire(3), '', conflits);
      writeFileSync(f, JSON.stringify(res, null, 2) + '\n');
      for (const c of conflits) console.log(`  #${pr} calendrier : ${c} modifié des deux côtés, version de la PR gardée`);
    } else if (f === JOURNAL) {
      writeFileSync(f, resoudreJournal(readFileSync(f, 'utf8')));
    } else if (f === MOTS_CLES) {
      try { writeFileSync(f, resoudreMotsCles(readFileSync(f, 'utf8'))); }
      catch (e) { console.error(`  #${pr} keywords.json : ${e.message}`); restants.push(f); }
    } else if (f === MAILLAGE) {
      try { writeFileSync(f, resoudreMaillage(readFileSync(f, 'utf8'))); }
      catch (e) { console.error(`  #${pr} internal-mesh.ts : ${e.message}`); restants.push(f); }
    } else if (/\.generated\./.test(f)) {
      git('checkout', '--theirs', '--', f);
    } else restants.push(f);
  }
  if (restants.length) return restants;
  const marques = fichiers.filter((f) => /^<<<<<<< /m.test(readFileSync(f, 'utf8')));
  if (marques.length) return marques;
  git('add', '--', ...fichiers);
  git('commit', '-q', '--no-edit');
  console.log(`#${pr} fusionnée (conflits résolus : ${fichiers.join(', ')})`);
  return [];
}

function main(args) {
  const reprise = args[0] === '--continue';
  if (reprise) args = args.slice(1);
  let prs = args.map(Number).filter(Boolean);
  if (!prs.length) {
    const liste = JSON.parse(execFileSync('gh', ['pr', 'list', '--state', 'open', '--limit', '100', '--json', 'number,headRefName'], { encoding: 'utf8' }));
    prs = liste.filter((p) => p.headRefName.startsWith('feat/seo-')).map((p) => p.number).sort((a, b) => a - b);
  }
  if (!reprise && git('status', '--porcelain', '--untracked-files=no')) {
    console.error('Arbre de travail modifié : partir d\'un worktree propre créé depuis origin/main.');
    process.exit(2);
  }
  console.log(`Branche ${git('branch', '--show-current')} · PR à intégrer : ${prs.join(', ') || 'aucune'}`);
  if (reprise && git('diff', '--name-only', '--diff-filter=U')) {
    const restants = resoudreConflits('en cours');
    if (restants.length) { console.error(`Conflit à résoudre à la main dans ${restants.join(', ')}.`); process.exit(1); }
  }
  for (const pr of prs) {
    const branche = execFileSync('gh', ['pr', 'view', String(pr), '--json', 'headRefName', '-q', '.headRefName'], { encoding: 'utf8' }).trim();
    git('fetch', '-q', 'origin', branche);
    if (gitOk('merge', '-q', '--no-edit', `origin/${branche}`)) { console.log(`#${pr} fusionnée`); continue; }
    const restants = resoudreConflits(pr);
    if (restants.length) {
      console.error(`#${pr} : conflit à résoudre à la main dans ${restants.join(', ')}.`);
      console.error(`Puis : git add, git commit --no-edit, et relancer avec --continue ${prs.slice(prs.indexOf(pr) + 1).join(' ')}`);
      process.exit(1);
    }
  }
  for (const g of GENERATEURS) execFileSync('node', [g], { stdio: 'ignore' });
  if (git('status', '--porcelain', '--untracked-files=no')) {
    git('add', '-u');
    git('commit', '-q', '-m', 'chore(generated): régénération après intégration des PR de la routine');
    console.log('Fichiers générés régénérés et commités.');
  }
  console.log(`Fait. PR fermées par la fusion de cette branche sur main : ${prs.map((p) => '#' + p).join(' ')}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
