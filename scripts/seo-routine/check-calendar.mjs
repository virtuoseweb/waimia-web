/**
 * Vérifie le calendrier éditorial docs/seo/calendrier-editorial.json, hors réseau :
 *   - schéma : champs requis, types et statuts permis, identifiants uniques ;
 *   - semaines au format AAAA-Www (semaine ISO qui existe) ;
 *   - `urlCible` unique parmi les entrées actives (idée, planifié, en cours) ;
 *   - une révision ou une fusion vise une page qui existe ; une entrée publiée ou mesurée porte sa PR,
 *     une entrée mesurée porte son résultat, une entrée abandonnée dit pourquoi ;
 *   - avertissements (ne font pas échouer) : stock de moins de 14 créations, moins de 2 semaines d'avance couvertes par une
 *     création planifiée, entrée planifiée dont la semaine est passée, création dont la page existe
 *     déjà, semaine au-delà du plafond de créations ou de révisions.
 * Sort en code 1 s'il y a au moins une erreur. Usage : node scripts/seo-routine/check-calendar.mjs
 */
import { join } from 'node:path';
import { SEO_DIR } from './config.mjs';
import { addWeeks, isMain, isoWeek, isoWeekMonday, readJson } from './lib/util.mjs';
import { targetExists as repoTargetExists } from './lib/targets.mjs';

export const CALENDAR_FILE = join(SEO_DIR, 'calendrier-editorial.json');

export const TYPES = ['article', 'guide', 'comparatif', 'page service', "cas d'usage", 'page locale', 'révision', 'fusion'];
/** Types qui portent sur une page déjà en ligne. Les autres sont des créations. */
export const EXISTING_PAGE_TYPES = ['révision', 'fusion'];
export const STATUTS = ['idée', 'planifié', 'en cours', 'publié', 'mesuré', 'abandonné'];
export const ACTIVE_STATUTS = ['idée', 'planifié', 'en cours'];
export const FIELDS = ['id', 'type', 'titreProvisoire', 'requeteCible', 'intention', 'urlCible', 'angle', 'sourcesALire', 'semainePrevue', 'statut', 'pr', 'mesureAttendue', 'resultat', 'origine'];
const TEXT_FIELDS = ['titreProvisoire', 'requeteCible', 'intention', 'angle', 'mesureAttendue', 'origine'];

/** Cadence de la session (docs/seo/ROUTINE.md, section 4). */
export const MIN_WEEKS_AHEAD = 2;
/** 2 créations par jour, 7 jours sur 7. */
export const MAX_CREATIONS_PER_WEEK = 14;
/** Stock minimal de créations restant à faire (idées, planifiées, en cours) : une semaine de cadence. */
export const MIN_CREATIONS_STOCK = 14;
export const MAX_REVISIONS_PER_WEEK = 3;

const isText = (v) => typeof v === 'string' && v.trim().length > 0;
export const isCreation = (entry) => !EXISTING_PAGE_TYPES.includes(entry.type);

/**
 * Nombre de semaines consécutives, à partir de la semaine qui suit `week`, qui ont au moins une
 * création planifiée ou en cours.
 */
export function weeksAhead(entries, week) {
  const covered = new Set(entries.filter((e) => isCreation(e) && ['planifié', 'en cours'].includes(e.statut)).map((e) => e.semainePrevue));
  let n = 0;
  for (let w = addWeeks(week, 1); w && covered.has(w); w = addWeeks(w, 1)) n += 1;
  return n;
}

/**
 * Fonction pure.
 * @param {{entries?: object[]}} calendar contenu du fichier
 * @param {{now?: Date, targetExists?: (path:string)=>boolean}} options
 * @returns {{errors: string[], warnings: string[], stats: object}}
 */
export function validateCalendar(calendar, { now = new Date(), targetExists = () => true } = {}) {
  const errors = [];
  const warnings = [];
  const entries = calendar?.entries;
  if (!Array.isArray(entries) || entries.length === 0) return { errors: ['calendrier : `entries` doit être une liste non vide'], warnings, stats: {} };

  const week = isoWeek(now);
  const ids = new Set();
  const activeUrls = new Map();

  entries.forEach((e, i) => {
    const label = isText(e?.id) ? e.id : `entrée n° ${i + 1}`;
    const err = (m) => errors.push(`${label} : ${m}`);
    if (!e || typeof e !== 'object' || Array.isArray(e)) return err('doit être un objet');

    for (const f of FIELDS) if (!(f in e)) err(`champ manquant « ${f} »`);
    for (const f of Object.keys(e)) if (!FIELDS.includes(f)) err(`champ inconnu « ${f} »`);

    if (!isText(e.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) err('`id` attendu en minuscules, chiffres et tirets');
    else if (ids.has(e.id)) err('`id` en double');
    ids.add(e.id);

    if (!TYPES.includes(e.type)) err(`type inconnu « ${e.type} » (permis : ${TYPES.join(', ')})`);
    if (!STATUTS.includes(e.statut)) err(`statut inconnu « ${e.statut} » (permis : ${STATUTS.join(', ')})`);
    for (const f of TEXT_FIELDS) if (f in e && !isText(e[f])) err(`« ${f} » doit être un texte non vide`);
    if ('sourcesALire' in e && (!Array.isArray(e.sourcesALire) || e.sourcesALire.length === 0 || !e.sourcesALire.every(isText))) err('`sourcesALire` doit être une liste non vide de textes');

    if (!isText(e.urlCible) || !/^\/[a-z0-9/-]*$/.test(e.urlCible) || (e.urlCible.length > 1 && e.urlCible.endsWith('/'))) err(`\`urlCible\` attendu comme un chemin du site, sans domaine ni barre finale (reçu : ${e.urlCible})`);
    else {
      if (ACTIVE_STATUTS.includes(e.statut)) {
        if (activeUrls.has(e.urlCible)) err(`\`urlCible\` ${e.urlCible} déjà prise par l'entrée active « ${activeUrls.get(e.urlCible)} »`);
        else activeUrls.set(e.urlCible, label);
      }
      const exists = targetExists(e.urlCible);
      if (EXISTING_PAGE_TYPES.includes(e.type) && e.statut !== 'abandonné' && !exists) err(`${e.type} d'une page introuvable dans le repo : ${e.urlCible}`);
      if (['publié', 'mesuré'].includes(e.statut) && !exists) err(`entrée « ${e.statut} » dont la page est introuvable dans le repo : ${e.urlCible}`);
      if (isCreation(e) && ACTIVE_STATUTS.includes(e.statut) && exists) warnings.push(`${label} : création prévue sur ${e.urlCible}, qui semble déjà exister (une révision ?)`);
    }

    // Une idée ou un abandon peut ne pas avoir de semaine ; tout le reste en a une.
    const weekOptional = ['idée', 'abandonné'].includes(e.statut);
    if (e.semainePrevue === null) {
      if (!weekOptional) err('`semainePrevue` obligatoire sauf pour une idée ou un abandon');
    } else if (!isoWeekMonday(e.semainePrevue)) err(`\`semainePrevue\` hors format AAAA-Www ou semaine inexistante (reçu : ${e.semainePrevue})`);
    else if (e.statut === 'planifié' && e.semainePrevue < week) warnings.push(`${label} : planifiée en ${e.semainePrevue}, semaine passée (nous sommes en ${week}) : à livrer, replanifier ou abandonner`);

    const pr = e.pr;
    if (pr !== null && !(Number.isInteger(pr) && pr > 0) && !(isText(pr) && /^https:\/\/github\.com\//.test(pr))) err('`pr` attendu : null, un numéro de PR ou son URL GitHub');
    if (['publié', 'mesuré'].includes(e.statut) && pr === null) err(`statut « ${e.statut} » sans \`pr\``);
    if (e.resultat !== null && !isText(e.resultat)) err('`resultat` attendu : null ou un texte');
    if (['mesuré', 'abandonné'].includes(e.statut) && !isText(e.resultat)) err(`statut « ${e.statut} » sans \`resultat\` (la mesure, ou la raison de l'abandon)`);
  });

  // Cadence : plafond par semaine, sur ce qui reste à faire.
  const byWeek = new Map();
  for (const e of entries) {
    if (!['planifié', 'en cours'].includes(e?.statut) || !e.semainePrevue) continue;
    const slot = byWeek.get(e.semainePrevue) ?? { creations: 0, revisions: 0 };
    slot[isCreation(e) ? 'creations' : 'revisions'] += 1;
    byWeek.set(e.semainePrevue, slot);
  }
  for (const [w, slot] of [...byWeek].sort()) {
    if (slot.creations > MAX_CREATIONS_PER_WEEK) warnings.push(`${w} : ${slot.creations} créations planifiées, plafond ${MAX_CREATIONS_PER_WEEK}`);
    if (slot.revisions > MAX_REVISIONS_PER_WEEK) warnings.push(`${w} : ${slot.revisions} révisions planifiées, plafond ${MAX_REVISIONS_PER_WEEK}`);
  }

  const stock = entries.filter((e) => e && typeof e === 'object' && isCreation(e) && ACTIVE_STATUTS.includes(e.statut)).length;
  if (stock < MIN_CREATIONS_STOCK) warnings.push(`${stock} création(s) en stock (idées, planifiées, en cours), ${MIN_CREATIONS_STOCK} attendues : alimenter le calendrier`);

  const ahead = weeksAhead(entries.filter((e) => e && typeof e === 'object'), week);
  if (ahead < MIN_WEEKS_AHEAD) warnings.push(`${ahead} semaine(s) d'avance avec une création planifiée après ${week} (${MIN_WEEKS_AHEAD} attendues) : replanifier`);

  const count = (statut) => entries.filter((e) => e?.statut === statut).length;
  return { errors, warnings, stats: { week, total: entries.length, weeksAhead: ahead, creationsStock: stock, byStatut: Object.fromEntries(STATUTS.map((s) => [s, count(s)])) } };
}

if (isMain(import.meta.url)) {
  let calendar;
  try {
    calendar = await readJson(CALENDAR_FILE, null);
  } catch (e) {
    console.error(`check-calendar : ${e.message}`);
    process.exit(1);
  }
  if (!calendar) {
    console.error(`check-calendar : fichier absent (${CALENDAR_FILE})`);
    process.exit(1);
  }
  const { errors, warnings, stats } = validateCalendar(calendar, { targetExists: repoTargetExists });
  for (const w of warnings) console.warn(`  avertissement : ${w}`);
  if (errors.length) {
    console.error(`check-calendar : ${errors.length} erreur(s)`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  const s = stats.byStatut;
  console.log(`check-calendar OK : ${stats.total} entrées (${s['idée']} idées, ${s['planifié']} planifiées, ${s['en cours']} en cours, ${s['publié']} publiées, ${s['mesuré']} mesurées, ${s['abandonné']} abandonnées), ${stats.weeksAhead} semaine(s) d'avance après ${stats.week}, ${warnings.length} avertissement(s).`);
}
