#!/usr/bin/env node
// score-icp-bant.mjs : scorer prospection ICP + BANT (outil maison Waimia)
//
// Modèle : ICP + BANT 4 axes (docs/business/03-plan-prospection.md §1.2, seuil 3/4),
// chaque axe composé de sous-critères pondérés repris de la grille ICP de
// docs/business/09-leadsourcing-scoring.md §3.2 QUAND ils sont calculables sur des
// colonnes locales (export Explorium / Vibe Prospecting). Les signaux d'opportunité
// « profonds » de 09 §3.2 (Firecrawl : perf, schema, https, cms) ne sont PAS évalués
// ici. Ils exigent un enrichissement réseau hors périmètre de cet outil (voir README).
//
// Entrée  : CSV ou JSON de prospects (colonnes style Explorium, voir COLUMN_ALIASES).
// Sortie  : CSV + JSON scorés, triés par panier (A>B>C) puis score décroissant, avec
//           panier A (3-4 axes /4), B (2/4), C (rejet ou disqualifiant dur + raison).
//
// Aucune dépendance : Node stdlib uniquement. Aucun appel réseau.
//
// Usage :
//   node scripts/prospecting/score-icp-bant.mjs <input.csv|input.json> [options]
// Options :
//   --out <basepath>   Base des fichiers de sortie (défaut : <input>.scored) → .csv + .jsonl
//   --format csv|json|both  Sortie stdout (défaut : résumé lisible ; fichiers toujours écrits sauf --no-files)
//   --no-files         N'écrit pas de fichiers, imprime le CSV scoré sur stdout
//   --quiet            Supprime le résumé de distribution
//
// Toute la config (poids, seuils, verticales, zones, bloquants) est dans SCORING_CONFIG
// ci-dessous : ajustable SANS toucher la logique (GF-3). Bump `scorer_version` à chaque
// changement de poids pour la comparabilité historique.

import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

// ===========================================================================
// CONFIG : éditable sans toucher la logique. Fidèle à 03 §1.2 + 09 §3.2.
// ===========================================================================
export const SCORING_CONFIG = {
  scorer_version: 'icp-bant-1.0.0',
  model: 'icp-bant-4axis', // 03 §1.2 : Fit / Budget / Authority / Need-Timing

  // Un axe est « satisfait » (compte dans le seuil 3/4) si son score normalisé
  // atteint ce seuil. Un axe sans aucune donnée évaluable = `unknown` (ne compte
  // pas comme satisfait, mais ne bloque pas (mission : « non évaluable = unknown »).
  axisPassThreshold: 50,

  // Paniers par nombre d'axes satisfaits sur 4 (03 §1.2 « seuil 3/4 »).
  paniers: {
    A: 3, // 3 ou 4 axes satisfaits → attaque
    B: 2, // exactement 2 → nurture
    // sinon (0-1) → C (rejet). Un disqualifiant dur force C quel que soit le compte.
  },

  // Ciblage vague 1 (03 §2) : Montpellier / Occitanie, services premium.
  zone: {
    // matching insensible casse/accents sur city + region/country.
    montpellier: ['montpellier'],
    occitanie: [
      'occitanie', 'herault', 'hérault', 'gard', 'aude', 'pyrenees-orientales',
      'pyrénées-orientales', 'haute-garonne', 'gers', 'tarn', 'aveyron', 'lozere',
      'lozère', 'ariege', 'ariège', 'tarn-et-garonne', 'hautes-pyrenees',
      'hautes-pyrénées', 'lot', 'nimes', 'nîmes', 'toulouse', 'beziers', 'béziers',
      'sete', 'sète', 'perpignan', 'carcassonne',
    ],
    france: ['france', 'fr'],
    weights: { montpellier: 1.0, occitanie: 0.75, france: 0.4, other: 0 },
  },

  // Verticales cibles vague 1 (03 §2). Matching par mots-clés sur sector / naics label.
  targetSectors: [
    'conseil', 'consulting', 'avocat', 'juridique', 'legal', 'expert-comptable',
    'comptable', 'accounting', 'architecte', 'architect', 'immobilier', 'real estate',
    'sante', 'santé', 'health', 'bien-etre', 'bien-être', 'wellness', 'import',
    'export', 'import-export', 'artisanat', 'artisan', 'luxe', 'premium',
    'formation', 'training', // vague 2 tolérée en partiel
  ],

  size: { min: 5, max: 250, nearMin: 3, nearMax: 300 }, // 03 §1.2

  budget: {
    minCapacityEur: 2000, // 03 §1.2 palier d'entrée
    revenueFloorEur: 150000, // proxy « capacité ≥ 2 000 € » si revenue fourni [HYP]
    sizeBudgetThreshold: 10, // effectif ≥ 10 = proxy budget confortable
  },

  // Rôles décideurs (03 §1.2 Authority) vs exclus (stagiaire).
  authority: {
    decisionKeywords: [
      'ceo', 'founder', 'fondateur', 'dirigeant', 'gerant', 'gérant', 'president',
      'président', 'owner', 'proprietaire', 'propriétaire', 'directeur', 'director',
      'dirmkg', 'marketing director', 'directeur marketing', 'responsable marketing',
      'responsable digital', 'head of marketing', 'head of growth', 'cmo', 'coo',
      'associe', 'associé', 'partner', 'vp', 'chief',
    ],
    decisionLevels: ['owner', 'founder', 'c-level', 'clevel', 'cxo', 'vp', 'director', 'head', 'partner', 'manager'],
    excludeKeywords: ['stagiaire', 'intern', 'assistant', 'apprenti', 'alternant', 'junior', 'student', 'trainee'],
  },

  // Poids des sous-critères par axe (repris de 09 §3.2 ICP fit ; normalisés par axe).
  axes: {
    fit: {
      label: 'Fit (verticale + zone + taille + signal digital)',
      criteria: {
        sector_match: 25, // 09 §3.2 « Secteur dans verticales cibles »
        zone: 20, // 09 §3.2 « Zone Occitanie / Montpellier »
        size_band: 20, // 09 §3.2 « Taille 5-250 sal. »
        digital_signal: 15, // 03 §1.2 « signal digital (site/posts/ads) »
      },
    },
    budget: {
      label: 'Budget (capacité + proxy ads/recrutement/effectif)',
      criteria: {
        ads_active: 12, // 09 §3.2 « proxy budget : ads payantes »
        hiring_marketing: 8, // 09 §3.2 « proxy budget : recrutement mkg »
        size_budget: 10, // effectif comme proxy capacité
        revenue: 10, // CA comme proxy direct (si fourni)
      },
    },
    authority: {
      label: 'Authority (décideur joignable identifié)',
      criteria: {
        decision_role: 15, // 09 §3.2 « décideur joignable » + 03 « pas de stagiaire »
        contact_reachable: 10, // email fonctionnel présent
      },
    },
    need: {
      label: 'Need / Timing (déclencheur observable)',
      criteria: {
        trigger_hiring: 10, // offre d'emploi marketing
        trigger_event: 10, // levée / nouveau dirigeant / refonte annoncée (events)
        trigger_weak_site: 8, // site absent (greenfield) ou daté déclaré
        trigger_ads_spend: 6, // dépense ads (besoin actif de convertir)
      },
    },
  },

  // Disqualifiants durs (03 §1.1 / 09 §3.2 bloquants) → tier C, override du score.
  blockers: {
    regulatedSectors: ['armement', 'tabac', 'jeux-argent', 'gambling', 'adulte', 'crypto-scam', 'pharma-reglemente'],
  },
};

// ===========================================================================
// Mapping des colonnes d'entrée (aliases tolérants : Explorium / Vibe / libre).
// ===========================================================================
const COLUMN_ALIASES = {
  company: ['company', 'name', 'company_name', 'entreprise', 'raison_sociale', 'business_name'],
  website: ['website', 'url', 'site', 'domain', 'web', 'company_website'],
  city: ['city', 'ville', 'town', 'locality'],
  region: ['region', 'région', 'state', 'departement', 'département', 'country', 'pays', 'country_name'],
  sector: ['sector', 'secteur', 'industry', 'naics_description', 'linkedin_category', 'naf_label', 'activity', 'category'],
  naf: ['naf', 'naics', 'naf_code', 'naics_code', 'sic'],
  employees: ['employees', 'company_size', 'size', 'headcount', 'effectif', 'employee_count', 'nb_employes'],
  revenue: ['revenue', 'ca', 'chiffre_affaires', 'turnover', 'annual_revenue', 'yearly_revenue'],
  contact_name: ['contact_name', 'full_name', 'prospect_name', 'nom_contact', 'decision_maker'],
  contact_role: ['contact_role', 'job_title', 'title', 'role', 'poste', 'fonction', 'position'],
  contact_level: ['job_level', 'seniority', 'level', 'niveau'],
  contact_email: ['contact_email', 'email', 'work_email', 'professional_email', 'email_pro'],
  contact_linkedin: ['contact_linkedin', 'linkedin', 'linkedin_url', 'profile_url'],
  has_website: ['has_website', 'website_present', 'has_site'],
  ads_active: ['ads_active', 'has_ads', 'ads', 'running_ads', 'paid_ads', 'advertising'],
  hiring_marketing: ['hiring_marketing', 'careers_marketing', 'recruiting_marketing', 'marketing_hiring', 'is_hiring_marketing'],
  events: ['events', 'signals', 'triggers', 'company_events', 'recent_events'],
  existing_ai_agency: ['existing_ai_agency', 'has_ai_agency', 'ai_agency', 'agence_ia'],
  optout: ['optout', 'opt_out', 'unsubscribed', 'do_not_contact', 'dnc'],
};

// ===========================================================================
// Utilitaires bas niveau
// ===========================================================================

/** Normalise pour matching : minuscule, sans accents, trim. */
function norm(s) {
  if (s == null) return '';
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Parse une valeur booléenne tolérante. Renvoie true/false/undefined (inconnu). */
function parseBool(v) {
  if (v == null) return undefined;
  const s = norm(v);
  if (s === '') return undefined;
  if (['true', '1', 'yes', 'y', 'oui', 'o', 'vrai', 'x'].includes(s)) return true;
  if (['false', '0', 'no', 'n', 'non', 'faux'].includes(s)) return false;
  return undefined;
}

/** Parse un nombre tolérant (gère « 1 200 », « 1,2M », « 250+ », « 50-100 »). Renvoie number|undefined. */
function parseNum(v) {
  if (v == null) return undefined;
  let s = String(v).trim();
  if (s === '') return undefined;
  s = norm(s);
  // fourchette « 50-100 » → moyenne
  const range = s.match(/^(\d[\d\s.,]*)\s*[-–]\s*(\d[\d\s.,]*)$/);
  if (range) {
    const a = parseNum(range[1]);
    const b = parseNum(range[2]);
    if (a != null && b != null) return Math.round((a + b) / 2);
  }
  let mult = 1;
  if (/m(\b|illion|$)/.test(s)) mult = 1e6;
  else if (/k(\b|$)/.test(s)) mult = 1e3;
  else if (/mds?|milliard|b(\b|$)/.test(s)) mult = 1e9;
  const cleaned = s.replace(/[^\d.,]/g, '').replace(/\s/g, '');
  if (cleaned === '') return undefined;
  // enlève séparateurs de milliers, garde le dernier séparateur décimal éventuel
  const n = Number(cleaned.replace(/,/g, '.').replace(/\.(?=.*\.)/g, ''));
  if (!Number.isFinite(n)) return undefined;
  return n * mult;
}

/** Vrai si `hay` contient l'un des mots-clés `needles` (déjà normalisés côté config). */
function containsAny(hay, needles) {
  const h = norm(hay);
  if (h === '') return false;
  return needles.some((k) => h.includes(norm(k)));
}

// ===========================================================================
// Parseur CSV minimal (RFC 4180-ish : guillemets, "" échappés, CRLF).
// Ignore les lignes de commentaire commençant par # AVANT l'en-tête.
// ===========================================================================
export function parseCSV(text) {
  // retire BOM
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); field = ''; row = []; i++; continue; }
    field += c; i++;
  }
  // dernier champ / ligne
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }

  // retire lignes vides et commentaires # de tête
  const dataRows = rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
  let start = 0;
  while (start < dataRows.length && dataRows[start].length >= 1 && dataRows[start][0].trimStart().startsWith('#')) {
    start++;
  }
  if (start >= dataRows.length) return [];
  const header = dataRows[start].map((h) => h.trim());
  const out = [];
  for (let r = start + 1; r < dataRows.length; r++) {
    const cells = dataRows[r];
    // ignore ligne de commentaire au milieu
    if (cells.length >= 1 && cells[0].trimStart().startsWith('#') && cells.length < header.length) continue;
    const obj = {};
    for (let c = 0; c < header.length; c++) obj[header[c]] = cells[c] !== undefined ? cells[c] : '';
    out.push(obj);
  }
  return out;
}

/** Charge un fichier CSV ou JSON → tableau d'objets bruts. */
export function loadRecords(path, rawText) {
  const text = rawText != null ? rawText : readFileSync(path, 'utf8');
  const isJson = /\.json$/i.test(path) || /^\s*[[{]/.test(text);
  if (isJson) {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.records)) return parsed.records;
    if (parsed && Array.isArray(parsed.leads)) return parsed.leads;
    if (parsed && typeof parsed === 'object') return [parsed];
    return [];
  }
  return parseCSV(text);
}

/** Résout un champ canonique via ses alias (insensible casse). Renvoie string ('' si absent). */
function field(rec, canonical) {
  const aliases = COLUMN_ALIASES[canonical] || [canonical];
  // index normalisé une seule fois par record
  if (!rec.__idx) {
    const idx = {};
    for (const k of Object.keys(rec)) idx[norm(k)] = rec[k];
    Object.defineProperty(rec, '__idx', { value: idx, enumerable: false });
  }
  for (const a of aliases) {
    const v = rec.__idx[norm(a)];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

// ===========================================================================
// Évaluateurs d'axes. Chaque critère renvoie :
//   { earned: <0..weight>, max: <weight>, applicable: bool, reason: string }
// Si applicable=false → critère non évaluable (colonne absente) : exclu de la
// normalisation de l'axe (mission : « non évaluable = unknown, pas crash »).
// ===========================================================================

function crit(applicable, ratio, weight, reason) {
  return { applicable, earned: applicable ? Math.round(ratio * weight * 100) / 100 : 0, max: weight, reason };
}

function evalZone(rec) {
  const city = field(rec, 'city');
  const region = field(rec, 'region');
  const hay = `${city} ${region}`;
  if (norm(hay) === '') return crit(false, 0, SCORING_CONFIG.axes.fit.criteria.zone, 'zone inconnue');
  const z = SCORING_CONFIG.zone;
  let ratio = z.weights.other;
  let label = 'hors zone';
  if (containsAny(hay, z.montpellier)) { ratio = z.weights.montpellier; label = 'Montpellier'; }
  else if (containsAny(hay, z.occitanie)) { ratio = z.weights.occitanie; label = 'Occitanie'; }
  else if (containsAny(hay, z.france)) { ratio = z.weights.france; label = 'France (hors Occitanie)'; }
  return crit(true, ratio, SCORING_CONFIG.axes.fit.criteria.zone, `zone: ${label}`);
}

function evalSector(rec) {
  const sector = field(rec, 'sector');
  const naf = field(rec, 'naf');
  const hay = `${sector} ${naf}`;
  const w = SCORING_CONFIG.axes.fit.criteria.sector_match;
  if (norm(hay) === '') return crit(false, 0, w, 'secteur inconnu');
  const match = containsAny(hay, SCORING_CONFIG.targetSectors);
  return crit(true, match ? 1 : 0, w, match ? `secteur cible: ${sector || naf}` : `secteur hors verticales: ${sector || naf}`);
}

function evalSize(rec) {
  const emp = parseNum(field(rec, 'employees'));
  const w = SCORING_CONFIG.axes.fit.criteria.size_band;
  if (emp == null) return crit(false, 0, w, 'taille inconnue');
  const s = SCORING_CONFIG.size;
  if (emp >= s.min && emp <= s.max) return crit(true, 1, w, `taille ${emp} sal. (dans 5-250)`);
  if ((emp >= s.nearMin && emp < s.min) || (emp > s.max && emp <= s.nearMax)) return crit(true, 0.5, w, `taille ${emp} sal. (proche bornes)`);
  return crit(true, 0, w, `taille ${emp} sal. (hors 5-250)`);
}

function evalDigitalSignal(rec) {
  const w = SCORING_CONFIG.axes.fit.criteria.digital_signal;
  const website = field(rec, 'website');
  const hasWebsite = parseBool(field(rec, 'has_website'));
  const linkedin = field(rec, 'contact_linkedin');
  const ads = parseBool(field(rec, 'ads_active'));
  // évaluable dès qu'au moins un indice digital est présent ou explicitement absent
  const anyKnown = website !== '' || hasWebsite !== undefined || linkedin !== '' || ads !== undefined;
  if (!anyKnown) return crit(false, 0, w, 'signal digital inconnu');
  const present = website !== '' || hasWebsite === true || linkedin !== '' || ads === true;
  return crit(true, present ? 1 : 0, w, present ? 'signal digital présent' : 'aucun signal digital');
}

function evalAdsBudget(rec) {
  const w = SCORING_CONFIG.axes.budget.criteria.ads_active;
  const ads = parseBool(field(rec, 'ads_active'));
  if (ads === undefined) return crit(false, 0, w, 'ads inconnues');
  return crit(true, ads ? 1 : 0, w, ads ? 'ads payantes actives' : 'pas d\'ads détectées');
}

function evalHiringMkt(rec) {
  const w = SCORING_CONFIG.axes.budget.criteria.hiring_marketing;
  const raw = field(rec, 'hiring_marketing');
  const b = parseBool(raw);
  if (b !== undefined) return crit(true, b ? 1 : 0, w, b ? 'recrutement marketing en cours' : 'pas de recrutement mkg');
  // sinon tenter via events
  const events = field(rec, 'events');
  if (norm(events) === '' && raw === '') return crit(false, 0, w, 'recrutement mkg inconnu');
  const hit = containsAny(events, ['hiring', 'recrut', 'marketing job', 'offre', 'emploi']);
  return crit(true, hit ? 1 : 0, w, hit ? 'signal recrutement (events)' : 'pas de recrutement mkg');
}

function evalSizeBudget(rec) {
  const w = SCORING_CONFIG.axes.budget.criteria.size_budget;
  const emp = parseNum(field(rec, 'employees'));
  if (emp == null) return crit(false, 0, w, 'effectif inconnu (proxy budget)');
  const t = SCORING_CONFIG.budget.sizeBudgetThreshold;
  if (emp >= t) return crit(true, 1, w, `effectif ${emp} ≥ ${t} (proxy budget)`);
  if (emp >= SCORING_CONFIG.size.min) return crit(true, 0.5, w, `effectif ${emp} (proxy budget partiel)`);
  return crit(true, 0, w, `effectif ${emp} faible`);
}

function evalRevenue(rec) {
  const w = SCORING_CONFIG.axes.budget.criteria.revenue;
  const rev = parseNum(field(rec, 'revenue'));
  if (rev == null) return crit(false, 0, w, 'CA inconnu');
  const floor = SCORING_CONFIG.budget.revenueFloorEur;
  return crit(true, rev >= floor ? 1 : rev >= floor / 3 ? 0.5 : 0, w, `CA ~${Math.round(rev).toLocaleString('fr-FR')} €`);
}

function evalDecisionRole(rec) {
  const w = SCORING_CONFIG.axes.authority.criteria.decision_role;
  const role = field(rec, 'contact_role');
  const level = field(rec, 'contact_level');
  const hay = `${role} ${level}`;
  if (norm(hay) === '') return crit(false, 0, w, 'rôle décideur inconnu');
  const a = SCORING_CONFIG.authority;
  if (containsAny(hay, a.excludeKeywords)) return crit(true, 0, w, `rôle non décideur: ${role || level}`);
  const isDecision = containsAny(hay, a.decisionKeywords) || containsAny(level, a.decisionLevels);
  return crit(true, isDecision ? 1 : 0.3, w, isDecision ? `décideur: ${role || level}` : `rôle ambigu: ${role || level}`);
}

function evalContactReachable(rec) {
  const w = SCORING_CONFIG.axes.authority.criteria.contact_reachable;
  const email = field(rec, 'contact_email');
  if (email === '') return crit(false, 0, w, 'email inconnu');
  const valid = /@/.test(email) && !/@(gmail|yahoo|hotmail|outlook|free|orange|wanadoo|laposte)\./i.test(email);
  return crit(true, valid ? 1 : email.includes('@') ? 0.5 : 0, w, valid ? `email pro: ${email}` : `email non pro: ${email}`);
}

function evalTriggerHiring(rec) {
  const w = SCORING_CONFIG.axes.need.criteria.trigger_hiring;
  const b = parseBool(field(rec, 'hiring_marketing'));
  const events = field(rec, 'events');
  if (b === undefined && norm(events) === '') return crit(false, 0, w, 'déclencheur recrutement inconnu');
  const hit = b === true || containsAny(events, ['hiring', 'recrut', 'emploi', 'offre']);
  return crit(true, hit ? 1 : 0, w, hit ? 'déclencheur: recrutement mkg' : 'pas de recrutement');
}

function evalTriggerEvent(rec) {
  const w = SCORING_CONFIG.axes.need.criteria.trigger_event;
  const events = field(rec, 'events');
  if (norm(events) === '') return crit(false, 0, w, 'events inconnus');
  const hit = containsAny(events, ['funding', 'levee', 'levée', 'raise', 'new ceo', 'nouveau dirigeant', 'new exec', 'refonte', 'redesign', 'relaunch', 'website', 'expansion', 'acquisition']);
  return crit(true, hit ? 1 : 0, w, hit ? `déclencheur: ${events}` : 'pas de déclencheur event');
}

function evalTriggerWeakSite(rec) {
  const w = SCORING_CONFIG.axes.need.criteria.trigger_weak_site;
  const website = field(rec, 'website');
  const hasWebsite = parseBool(field(rec, 'has_website'));
  const events = field(rec, 'events');
  const anyKnown = website !== '' || hasWebsite !== undefined || norm(events) !== '';
  if (!anyKnown) return crit(false, 0, w, 'état du site inconnu');
  // site absent = greenfield (ticket d'entrée, 09 §3.2) ; site daté déclaré via events
  const noSite = website === '' && hasWebsite !== true;
  const dated = containsAny(events, ['old site', 'site date', 'site daté', 'wordpress', 'refonte', 'outdated']);
  const hit = noSite || dated;
  return crit(true, hit ? 1 : 0, w, hit ? (noSite ? 'déclencheur: pas de site (greenfield)' : 'déclencheur: site daté') : 'site présent/à jour');
}

function evalTriggerAdsSpend(rec) {
  const w = SCORING_CONFIG.axes.need.criteria.trigger_ads_spend;
  const ads = parseBool(field(rec, 'ads_active'));
  if (ads === undefined) return crit(false, 0, w, 'dépense ads inconnue');
  return crit(true, ads ? 1 : 0, w, ads ? 'déclencheur: dépense ads active' : 'pas de dépense ads');
}

const AXIS_EVALUATORS = {
  fit: [evalSector, evalZone, evalSize, evalDigitalSignal],
  budget: [evalAdsBudget, evalHiringMkt, evalSizeBudget, evalRevenue],
  authority: [evalDecisionRole, evalContactReachable],
  need: [evalTriggerHiring, evalTriggerEvent, evalTriggerWeakSite, evalTriggerAdsSpend],
};

/** Évalue un axe → { score(0-100|null), status, met, reasons[] }. */
function evalAxis(rec, axisKey) {
  const results = AXIS_EVALUATORS[axisKey].map((fn) => fn(rec));
  const applicable = results.filter((r) => r.applicable);
  const reasons = results.map((r) => r.reason);
  if (applicable.length === 0) {
    return { score: null, status: 'unknown', met: false, reasons };
  }
  const earned = applicable.reduce((s, r) => s + r.earned, 0);
  const maxSum = applicable.reduce((s, r) => s + r.max, 0);
  const score = maxSum > 0 ? Math.round((earned / maxSum) * 1000) / 10 : 0;
  const met = score >= SCORING_CONFIG.axisPassThreshold;
  return { score, status: met ? 'met' : 'unmet', met, reasons };
}

// ===========================================================================
// Disqualifiants durs (03 §1.1)
// ===========================================================================
function evalBlockers(rec) {
  const flags = [];
  // opt-out
  if (parseBool(field(rec, 'optout')) === true) flags.push('optout');
  // agence IA déjà installée
  if (parseBool(field(rec, 'existing_ai_agency')) === true) flags.push('agence_ia_installee');
  // secteur réglementé hors compétence
  const sector = `${field(rec, 'sector')} ${field(rec, 'naf')}`;
  if (containsAny(sector, SCORING_CONFIG.blockers.regulatedSectors)) flags.push('secteur_reglemente');
  // aucune intention digitale ET aucun contact
  const website = field(rec, 'website');
  const hasWebsite = parseBool(field(rec, 'has_website'));
  const linkedin = field(rec, 'contact_linkedin');
  const ads = parseBool(field(rec, 'ads_active'));
  const email = field(rec, 'contact_email');
  const noDigital = website === '' && hasWebsite !== true && linkedin === '' && ads !== true;
  const noContact = email === '' && linkedin === '';
  if (noDigital && noContact) flags.push('aucune_intention_digitale_ni_contact');
  // micro-budget : solo (≤1 sal.) sans aucun signal budget
  const emp = parseNum(field(rec, 'employees'));
  const hiring = parseBool(field(rec, 'hiring_marketing'));
  if (emp != null && emp <= 1 && ads !== true && hiring !== true) flags.push('micro_budget');
  return flags;
}

// ===========================================================================
// Scoring d'un record
// ===========================================================================
export function scoreRecord(rec) {
  const blocking_flags = evalBlockers(rec);
  const axes = {};
  for (const key of Object.keys(AXIS_EVALUATORS)) axes[key] = evalAxis(rec, key);

  const axesMet = Object.values(axes).filter((a) => a.met).length;
  const evaluable = Object.values(axes).filter((a) => a.status !== 'unknown').length;

  // score_total = moyenne des scores d'axes évaluables (0-100), pour le tri intra-panier.
  const scored = Object.values(axes).filter((a) => a.score != null);
  const score_total = scored.length ? Math.round((scored.reduce((s, a) => s + a.score, 0) / scored.length) * 10) / 10 : 0;

  let tier;
  let tierReason;
  if (blocking_flags.length > 0) {
    tier = 'C';
    tierReason = `disqualifiant dur: ${blocking_flags.join(', ')}`;
  } else if (axesMet >= SCORING_CONFIG.paniers.A) {
    tier = 'A';
    tierReason = `${axesMet}/4 axes BANT satisfaits`;
  } else if (axesMet >= SCORING_CONFIG.paniers.B) {
    tier = 'B';
    tierReason = `${axesMet}/4 axes BANT satisfaits`;
  } else {
    tier = 'C';
    tierReason = evaluable === 0 ? 'aucun axe évaluable (données insuffisantes)' : `${axesMet}/4 axes BANT satisfaits`;
  }

  // top_reasons = raisons positives dominantes (axes satisfaits) pour la perso du hook
  const top_reasons = [];
  for (const [k, a] of Object.entries(axes)) {
    if (a.met) top_reasons.push(a.reasons.find((r) => !/inconnu|inconnue|pas de|hors|aucun|non /.test(r)) || `${k} ok`);
  }

  return {
    company: field(rec, 'company'),
    website: field(rec, 'website'),
    city: field(rec, 'city'),
    region: field(rec, 'region'),
    sector: field(rec, 'sector') || field(rec, 'naf'),
    size_band: field(rec, 'employees'),
    contact_name: field(rec, 'contact_name'),
    contact_role: field(rec, 'contact_role'),
    contact_email: field(rec, 'contact_email'),
    score_total,
    axes_met: axesMet,
    score_fit: axes.fit.score,
    score_budget: axes.budget.score,
    score_authority: axes.authority.score,
    score_need: axes.need.score,
    tier,
    tier_reason: tierReason,
    top_reasons: top_reasons.slice(0, 3).join(' ; '),
    blocking_flags: blocking_flags.join(';'),
    source: field(rec, 'website') ? 'vibe' : 'unknown',
    scorer_version: SCORING_CONFIG.scorer_version,
    status: 'sourced',
    // détail complet des raisons par axe → traçabilité JSONL
    _axes_detail: axes,
  };
}

/** Trie A>B>C puis score décroissant puis axes satisfaits. */
function sortScored(rows) {
  const rank = { A: 0, B: 1, C: 2 };
  return [...rows].sort((a, b) => {
    if (rank[a.tier] !== rank[b.tier]) return rank[a.tier] - rank[b.tier];
    if (b.score_total !== a.score_total) return b.score_total - a.score_total;
    return b.axes_met - a.axes_met;
  });
}

// ===========================================================================
// Sérialisation
// ===========================================================================
const CSV_COLUMNS = [
  'company', 'website', 'city', 'region', 'sector', 'size_band',
  'contact_name', 'contact_role', 'contact_email',
  'score_total', 'axes_met', 'score_fit', 'score_budget', 'score_authority', 'score_need',
  'tier', 'tier_reason', 'top_reasons', 'blocking_flags',
  'source', 'scorer_version', 'status',
];

function csvCell(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCSV(rows) {
  const lines = [CSV_COLUMNS.join(',')];
  for (const r of rows) lines.push(CSV_COLUMNS.map((c) => csvCell(r[c])).join(','));
  return lines.join('\n') + '\n';
}

export function toJSONL(rows) {
  return rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
}

// ===========================================================================
// Pipeline principal
// ===========================================================================
export function scoreAll(records) {
  const scored = records.map(scoreRecord);
  const sorted = sortScored(scored);
  const dist = { A: 0, B: 0, C: 0 };
  for (const r of sorted) dist[r.tier]++;
  return { rows: sorted, dist, total: sorted.length };
}

// ===========================================================================
// CLI
// ===========================================================================
function parseArgs(argv) {
  const args = { _: [], format: 'summary', files: true, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = argv[++i];
    else if (a === '--format') args.format = argv[++i];
    else if (a === '--no-files') args.files = false;
    else if (a === '--quiet') args.quiet = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else args._.push(a);
  }
  return args;
}

function printHelp() {
  process.stdout.write(`Scorer prospection ICP + BANT (Waimia)\n\n` +
    `Usage : node scripts/prospecting/score-icp-bant.mjs <input.csv|input.json> [options]\n\n` +
    `Options :\n` +
    `  --out <base>      Base des fichiers de sortie (défaut <input>.scored) → .csv + .jsonl\n` +
    `  --format csv|json|both|summary   Sortie stdout (défaut summary)\n` +
    `  --no-files        N'écrit pas de fichiers (imprime le CSV sur stdout)\n` +
    `  --quiet           Pas de résumé de distribution\n` +
    `  -h, --help        Cette aide\n\n` +
    `Paniers : A = 3-4/4 axes BANT · B = 2/4 · C = <2 ou disqualifiant dur.\n` +
    `Config (poids/seuils/verticales) éditable dans SCORING_CONFIG en tête de fichier.\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args._.length === 0) { printHelp(); process.exit(args.help ? 0 : 1); }

  const inputPath = args._[0];
  let records;
  try {
    records = loadRecords(inputPath);
  } catch (e) {
    process.stderr.write(`ERREUR: impossible de lire/parser « ${inputPath} » : ${e.message}\n`);
    process.exit(2);
  }

  if (!Array.isArray(records) || records.length === 0) {
    process.stderr.write(`AVERTISSEMENT: 0 prospect dans « ${inputPath} » (fichier vide ou sans lignes de données). Rien à scorer.\n`);
    // sortie propre : fichiers vides + exit 0 (pas un crash)
    if (args.files) {
      const base = args.out || `${inputPath.replace(/\.(csv|json)$/i, '')}.scored`;
      writeFileSync(`${base}.csv`, toCSV([]));
      writeFileSync(`${base}.jsonl`, '');
      process.stderr.write(`Fichiers vides écrits : ${base}.csv / ${base}.jsonl\n`);
    }
    process.exit(0);
  }

  const { rows, dist, total } = scoreAll(records);

  if (args.files) {
    const base = args.out || `${inputPath.replace(/\.(csv|json)$/i, '')}.scored`;
    writeFileSync(`${base}.csv`, toCSV(rows));
    writeFileSync(`${base}.jsonl`, toJSONL(rows));
    if (!args.quiet) process.stderr.write(`Écrit : ${base}.csv (${total} lignes) + ${base}.jsonl\n`);
  }

  if (args.format === 'csv' || !args.files) process.stdout.write(toCSV(rows));
  else if (args.format === 'json' || args.format === 'both') process.stdout.write(toJSONL(rows));

  if (!args.quiet) {
    const pct = (n) => (total ? Math.round((n / total) * 100) : 0);
    process.stderr.write(
      `\n── Distribution (${total} prospects) ──\n` +
      `  A (attaque)  : ${dist.A}  (${pct(dist.A)}%)\n` +
      `  B (nurture)  : ${dist.B}  (${pct(dist.B)}%)\n` +
      `  C (rejet)    : ${dist.C}  (${pct(dist.C)}%)\n` +
      `  scorer_version: ${SCORING_CONFIG.scorer_version}\n`);
  }
}

// exécution directe uniquement (pas à l'import pour les tests)
const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('score-icp-bant.mjs');
if (isMain) main();
