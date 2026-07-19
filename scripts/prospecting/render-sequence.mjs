#!/usr/bin/env node
// render-sequence.mjs · génère la séquence d'outreach personnalisée d'un prospect.
//
// Chantier P3.1-b (partie assets). Prend un prospect scoré (ligne du CSV/JSONL
// produit par score-icp-bant.mjs, panier A par défaut) et remplit les templates
// de scripts/prospecting/sequences/ (séquence §4 de docs/business/03-plan-prospection.md).
//
// Voix éditoriale : docs/business/05-sales-enablement.md (source canonique des scripts,
// NON dupliquée ici · les templates en sont la forme opérable, placeholder-driven).
//
// AUCUN envoi. AUCUN réseau. AUCUNE dépendance (Node stdlib). Produit du markdown
// sur stdout (défaut) ou dans --out DIR. Placeholder prospect manquant → ⟦MANQUANT:champ⟧
// (jamais vide en silence). Placeholders vendeur (preuve/quick-win/signature/optout)
// ont des valeurs par défaut, surchargeables par flag.

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
import { parseCSV } from './score-icp-bant.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SEQ_DIR = join(HERE, 'sequences');

// ── Valeurs vendeur par défaut (Waimia). Surchargeables par flags. ────────────
// Seules valeurs autorisées : docs (audit gratuit cal.com/simonberos/audit,
// preuve = propre infrastructure, cf 05 §2/§5). Aucun chiffre/témoignage inventé.
const SELLER_DEFAULTS = {
  lien_audit: 'cal.com/simonberos/audit',
  preuve_locale: "mon propre site, waimia.com, se charge quasi instantanément et se modifie en langage naturel",
  quick_win: "un repérage de 2 ou 3 leviers concrets sur votre site",
  signature: 'Simon Beros, Waimia. waimia.com',
  optout:
    "Vous recevez ce message à titre professionnel (prospection B2B, intérêt légitime). " +
    "Un mot en réponse et je vous retire de ma liste immédiatement.",
};

const SEGMENTS = ['tpe-locale', 'pme-marketing'];

// Zones Occitanie (proxy « levier local » §2 vague 1). Minuscule + sans accent au test.
const OCCITANIE = [
  'occitanie', 'montpellier', 'herault', 'gard', 'nimes', 'beziers', 'sete',
  'toulouse', 'haute-garonne', 'ganges', 'aude', 'carcassonne', 'perpignan',
  'pyrenees-orientales', 'lozere', 'aveyron', 'tarn', 'gers', 'lot',
];

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

// ── CLI parsing ───────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const opts = {
    input: null, company: null, email: null, index: null, all: false,
    segment: null, touch: null, out: null, force: false,
    preuve: null, quickWin: null, help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') opts.help = true;
    else if (a === '--all') opts.all = true;
    else if (a === '--force') opts.force = true;
    else if (a === '--company') opts.company = argv[++i];
    else if (a === '--email') opts.email = argv[++i];
    else if (a === '--index') opts.index = Number(argv[++i]);
    else if (a === '--segment') opts.segment = argv[++i];
    else if (a === '--touch') opts.touch = argv[++i];
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--preuve') opts.preuve = argv[++i];
    else if (a === '--quick-win') opts.quickWin = argv[++i];
    else if (!a.startsWith('-') && !opts.input) opts.input = a;
    else throw new Error(`argument inconnu : ${a}`);
  }
  return opts;
}

const HELP = `render-sequence.mjs · séquence d'outreach personnalisée (P3.1-b, 0 envoi)

Usage :
  node scripts/prospecting/render-sequence.mjs <scored.csv|scored.jsonl> [sélecteur] [options]

Sélecteur (défaut : 1er prospect panier A) :
  --company "Nom"     prospect dont company == Nom
  --email a@b.fr      prospect dont contact_email == a@b.fr
  --index N           N-ième prospect panier A (0-based)
  --all               tous les prospects panier A

Options :
  --segment tpe-locale|pme-marketing   force le segment (défaut : auto)
  --touch j2                           ne rend qu'une touche (id ou préfixe jour)
  --out DIR                            écrit <slug>.md par prospect (défaut : stdout)
  --preuve "..."                       surcharge {{preuve_locale}}
  --quick-win "..."                    surcharge {{quick_win}}
  --force                              rend même hors panier A
  -h, --help

Un CSV auto-charge son sibling .jsonl (déclencheurs plus riches) s'il existe.
Placeholder prospect manquant → ⟦MANQUANT:champ⟧. Aucun envoi, aucun réseau.`;

// ── Chargement des prospects scorés ─────────────────────────────────────────
function loadScored(path) {
  const text = readFileSync(path, 'utf8');
  if (/\.jsonl$/i.test(path)) {
    return text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => JSON.parse(l));
  }
  if (/\.json$/i.test(path)) {
    const p = JSON.parse(text);
    return Array.isArray(p) ? p : p.records || [];
  }
  // CSV
  const rows = parseCSV(text);
  // enrichissement : sibling .jsonl (déclencheurs de _axes_detail.need)
  const jsonlPath = path.replace(/\.csv$/i, '.jsonl');
  if (jsonlPath !== path && existsSync(jsonlPath)) {
    const rich = loadScored(jsonlPath);
    const byKey = new Map();
    for (const r of rich) byKey.set(`${r.company}|${r.contact_email}`, r);
    for (const row of rows) {
      const hit = byKey.get(`${row.company}|${row.contact_email}`);
      if (hit && hit._axes_detail) row._axes_detail = hit._axes_detail;
    }
  }
  return rows;
}

// ── Sélection ────────────────────────────────────────────────────────────────
function selectProspects(records, opts) {
  if (opts.company) return records.filter((r) => norm(r.company) === norm(opts.company));
  if (opts.email) return records.filter((r) => norm(r.contact_email) === norm(opts.email));
  const panierA = records.filter((r) => String(r.tier).toUpperCase() === 'A');
  const pool = opts.force ? records : panierA;
  if (opts.all) return pool;
  if (opts.index != null) return pool[opts.index] ? [pool[opts.index]] : [];
  return pool[0] ? [pool[0]] : [];
}

// ── Segmentation TPE locale vs PME marketing (§1.1 + §2) ─────────────────────
function classifySegment(rec) {
  const size = parseInt(String(rec.size_band).replace(/[^0-9]/g, ''), 10);
  const zone = norm(`${rec.city} ${rec.region}`);
  const isLocal = OCCITANIE.some((z) => zone.includes(z));
  const sector = norm(rec.sector);
  const isMarketing = /marketing|communication|e-commerce|ecommerce|saas|industrie|formation/.test(sector);
  // TPE locale : petite structure ancrée en Occitanie (levier RDV physique, dirigeant).
  if (isLocal && (Number.isNaN(size) || size < 25) && !isMarketing) return 'tpe-locale';
  // PME/ETI marketing : taille marketing, ou hors zone, ou vertical marketing.
  if (size >= 25 || isMarketing || !isLocal) return 'pme-marketing';
  return 'tpe-locale';
}

// ── Déclencheur : de _axes_detail.need (JSONL) ou top_reasons (CSV) ───────────
function deriveDeclencheur(rec) {
  const need = rec._axes_detail?.need?.reasons;
  if (Array.isArray(need)) {
    const trigs = need
      .filter((r) => /^déclencheur:/i.test(r))
      .map((r) => r.replace(/^déclencheur:\s*/i, '').trim());
    if (trigs.length) return humanizeTrigger(trigs.slice(0, 2));
  }
  // fallback CSV : top_reasons (signaux budget/need lisibles)
  const tr = String(rec.top_reasons || '')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  const signal = tr.find((r) => /ads|recrutement|refonte|funding|levée|leve|dépense|depense/i.test(r));
  if (signal) return humanizeTrigger([signal]);
  return null; // → MANQUANT
}

function humanizeTrigger(list) {
  const map = [
    [/recrutement mkg|recrutement marketing/i, 'votre recrutement marketing en cours'],
    [/funding raise|levée|leve|funding/i, 'votre levée de fonds récente'],
    [/dépense ads active|depense ads|ads payantes actives|ads active/i, 'vos campagnes publicitaires actives'],
    [/refonte/i, 'votre projet de refonte de site'],
    [/nouveau dirigeant/i, "l'arrivée d'un nouveau dirigeant"],
  ];
  const phrases = list.map((raw) => {
    const hit = map.find(([re]) => re.test(raw));
    return hit ? hit[1] : raw;
  });
  if (phrases.length === 1) return phrases[0];
  return `${phrases[0]} et ${phrases[1]}`;
}

// ── Contexte de rendu ────────────────────────────────────────────────────────
function buildContext(rec, opts) {
  const firstName = String(rec.contact_name || '').trim().split(/\s+/)[0] || '';
  const declencheur = deriveDeclencheur(rec);
  return {
    prenom: firstName || null,
    entreprise: rec.company || null,
    secteur: rec.sector || null,
    ville: rec.city || null,
    declencheur: declencheur, // null → MANQUANT
    preuve_locale: opts.preuve || SELLER_DEFAULTS.preuve_locale,
    quick_win: opts.quickWin || SELLER_DEFAULTS.quick_win,
    lien_audit: SELLER_DEFAULTS.lien_audit,
    signature: SELLER_DEFAULTS.signature,
    optout: SELLER_DEFAULTS.optout,
  };
}

// ── Templates ────────────────────────────────────────────────────────────────
function parseTemplate(text) {
  const lines = text.split('\n');
  const meta = {};
  let i = 0;
  if (lines[0].trim() === '---') {
    i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const m = lines[i].match(/^([a-z_]+):\s*(.*)$/i);
      if (m) meta[m[1]] = m[2].trim();
      i++;
    }
    i++; // skip closing ---
  }
  const body = lines.slice(i).join('\n');
  const variants = {};
  const re = /@variant\s+(\S+)\n([\s\S]*?)\n@endvariant/g;
  let match;
  while ((match = re.exec(body)) !== null) {
    variants[match[1].trim()] = match[2].replace(/\s+$/, '');
  }
  return { meta, variants };
}

function loadTemplates() {
  const files = readdirSync(SEQ_DIR).filter((f) => f.endsWith('.md')).sort();
  const tpls = files.map((f) => {
    const parsed = parseTemplate(readFileSync(join(SEQ_DIR, f), 'utf8'));
    return { file: f, ...parsed };
  });
  tpls.sort((a, b) => Number(a.meta.jour) - Number(b.meta.jour) || a.file.localeCompare(b.file));
  return tpls;
}

// ── Substitution ─────────────────────────────────────────────────────────────
function substitute(templateText, ctx, missingSet) {
  return templateText.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = ctx[key];
    if (val == null || val === '') {
      missingSet.add(key);
      return `⟦MANQUANT:${key}⟧`;
    }
    return val;
  });
}

function pickVariant(tpl, segment) {
  if (tpl.variants[segment]) return tpl.variants[segment];
  if (tpl.variants.default) return tpl.variants.default;
  // sinon 1re variante dispo
  const keys = Object.keys(tpl.variants);
  return keys.length ? tpl.variants[keys[0]] : '';
}

function slugify(s) {
  return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'prospect';
}

// ── Rendu d'un prospect ──────────────────────────────────────────────────────
function renderProspect(rec, tpls, opts) {
  const segment = opts.segment || classifySegment(rec);
  const ctx = buildContext(rec, opts);
  const missing = new Set();
  const parts = [];
  parts.push(`# Séquence outreach · ${rec.company || '⟦MANQUANT:entreprise⟧'}`);
  parts.push('');
  parts.push(`- Contact : ${rec.contact_name || '?'} (${rec.contact_role || '?'})`);
  parts.push(`- Panier : ${rec.tier || '?'} · Segment : ${segment} · Ville : ${rec.city || '?'}`);
  parts.push(`- Déclencheur retenu : ${ctx.declencheur || '⟦MANQUANT:declencheur⟧'}`);
  parts.push('');
  parts.push('> Personnalisation IA à relire avant tout envoi (GF-1). Aucun envoi automatique.');
  parts.push('');

  let selected = tpls;
  if (opts.touch) {
    selected = tpls.filter(
      (t) => t.meta.id === opts.touch || t.file.startsWith(opts.touch) || String(t.meta.jour) === String(opts.touch).replace(/^j/i, ''),
    );
  }

  for (const tpl of selected) {
    const raw = pickVariant(tpl, segment);
    const rendered = substitute(raw, ctx, missing);
    const label = `J${tpl.meta.jour} · ${tpl.meta.canal} · ${tpl.meta.intention || tpl.meta.id}`;
    parts.push(`## ${label}`);
    parts.push('');
    parts.push(rendered);
    parts.push('');
  }

  // champs prospect manquants (les placeholders vendeur ont un défaut, jamais listés)
  const prospectMissing = [...missing].filter((k) => !(k in SELLER_DEFAULTS));
  if (prospectMissing.length) {
    parts.push('---');
    parts.push(`> Champs prospect manquants à compléter à la main : ${prospectMissing.join(', ')}`);
  }
  return { markdown: parts.join('\n'), segment, missing: prospectMissing };
}

// ── main ─────────────────────────────────────────────────────────────────────
function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (e) {
    process.stderr.write(`Erreur : ${e.message}\n\n${HELP}\n`);
    process.exit(2);
  }
  if (opts.help || !opts.input) {
    process.stdout.write(HELP + '\n');
    process.exit(opts.help ? 0 : 2);
  }
  if (opts.segment && !SEGMENTS.includes(opts.segment)) {
    process.stderr.write(`Segment invalide : ${opts.segment}. Valides : ${SEGMENTS.join(', ')}\n`);
    process.exit(2);
  }

  const records = loadScored(opts.input);
  const tpls = loadTemplates();
  const selected = selectProspects(records, opts);

  if (!selected.length) {
    process.stderr.write('Aucun prospect sélectionné (panier A vide, ou sélecteur sans correspondance).\n');
    process.exit(1);
  }

  if (opts.out) mkdirSync(opts.out, { recursive: true });

  const docs = [];
  for (const rec of selected) {
    if (!opts.force && String(rec.tier).toUpperCase() !== 'A') {
      process.stderr.write(`⚠ ${rec.company} n'est pas panier A (tier=${rec.tier}). Rendu quand même (--force pour taire).\n`);
    }
    const { markdown, missing } = renderProspect(rec, tpls, opts);
    if (missing.length) {
      process.stderr.write(`⚠ ${rec.company} : champs manquants → ${missing.join(', ')}\n`);
    }
    if (opts.out) {
      const file = join(opts.out, `${slugify(rec.company)}.md`);
      writeFileSync(file, markdown + '\n');
      process.stderr.write(`écrit : ${file}\n`);
    } else {
      docs.push(markdown);
    }
  }
  if (!opts.out) process.stdout.write(docs.join('\n\n---\n\n') + '\n');
}

const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('render-sequence.mjs');
if (isMain) main();

export { classifySegment, deriveDeclencheur, buildContext, parseTemplate, substitute, renderProspect };
