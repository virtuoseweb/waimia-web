#!/usr/bin/env node
// crm-lite.mjs · tracker minimal du pipeline de prospection (P3.1-b, §6 de
// docs/business/03-plan-prospection.md).
//
// Pipeline : Sourcé → Contacté → Répondu → RDV → Audit/proposition → Gagné/Perdu.
// Store local append-friendly = crm.jsonl (1 ligne = 1 prospect, état courant + historique).
// AUCUN réseau, AUCUNE dépendance (Node stdlib). Contient de la PII → gitignoré.
//
// Commandes :
//   add     --company X [--contact "Nom"] [--email a@b] [--stage S] [--note "..."]
//   add     --from <scored.csv|scored.jsonl> [--tier A]   (import en masse)
//   move    <id> <étape>
//   list    [--stage S] [--json]
//   stale   [--days N]           (aucune activité depuis > N jours, défaut 14)
//   show    <id>

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_STORE = join(HERE, 'crm.jsonl');

// Ordre canonique du pipeline (§6). « Gagné » et « Perdu » sont deux issues terminales.
const STAGES = ['Sourcé', 'Contacté', 'Répondu', 'RDV', 'Audit/proposition', 'Gagné', 'Perdu'];
const STALE_DEFAULT_DAYS = 14;

function nowISO() {
  return new Date().toISOString();
}

// résolution d'étape tolérante (casse/accents/alias courts)
function resolveStage(input) {
  if (!input) return null;
  const n = norm(input);
  const alias = {
    source: 'Sourcé', sourced: 'Sourcé',
    contacte: 'Contacté', contacted: 'Contacté',
    repondu: 'Répondu', replied: 'Répondu',
    rdv: 'RDV', meeting: 'RDV',
    'audit/proposition': 'Audit/proposition', audit: 'Audit/proposition',
    proposition: 'Audit/proposition', proposal: 'Audit/proposition',
    gagne: 'Gagné', won: 'Gagné',
    perdu: 'Perdu', lost: 'Perdu',
  };
  if (alias[n]) return alias[n];
  return STAGES.find((s) => norm(s) === n) || null;
}

function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

// ── Store IO ─────────────────────────────────────────────────────────────────
function loadStore(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

function saveStore(path, records) {
  writeFileSync(path, records.map((r) => JSON.stringify(r)).join('\n') + (records.length ? '\n' : ''));
}

function genId(company, existing) {
  const base = norm(company).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'prospect';
  let id = base;
  let n = 2;
  const taken = new Set(existing.map((r) => r.id));
  while (taken.has(id)) id = `${base}-${n++}`;
  return id;
}

// ── Commandes ────────────────────────────────────────────────────────────────
function cmdAdd(store, path, opts) {
  const rows = [];
  if (opts.from) {
    const imported = importFrom(opts.from, opts.tier);
    rows.push(...imported);
  } else {
    if (!opts.company) throw new Error('add : --company requis (ou --from <fichier>)');
    rows.push({ company: opts.company, contact: opts.contact, email: opts.email, note: opts.note });
  }
  let added = 0, skipped = 0;
  for (const row of rows) {
    const stage = resolveStage(opts.stage) || 'Sourcé';
    // dédoublonnage par email si présent, sinon par company (norm)
    const dup = store.find((r) =>
      (row.email && norm(r.email) === norm(row.email)) ||
      (!row.email && norm(r.company) === norm(row.company)),
    );
    if (dup) { skipped++; continue; }
    const ts = nowISO();
    const rec = {
      id: genId(row.company, store),
      company: row.company || '',
      contact: row.contact || '',
      email: row.email || '',
      stage,
      created_at: ts,
      updated_at: ts,
      history: [{ stage, at: ts }],
      notes: row.note ? [{ at: ts, text: row.note }] : [],
    };
    store.push(rec);
    added++;
    process.stdout.write(`+ ${rec.id}  ${rec.company}  [${rec.stage}]\n`);
  }
  saveStore(path, store);
  process.stdout.write(`\n${added} ajouté(s), ${skipped} doublon(s) ignoré(s). Total : ${store.length}.\n`);
}

function importFrom(file, tierFilter) {
  const text = readFileSync(file, 'utf8');
  let records;
  if (/\.jsonl$/i.test(file)) {
    records = text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => JSON.parse(l));
  } else if (/\.json$/i.test(file)) {
    const p = JSON.parse(text);
    records = Array.isArray(p) ? p : p.records || [];
  } else {
    records = parseCSVMinimal(text);
  }
  const wanted = tierFilter ? norm(tierFilter) : 'a';
  return records
    .filter((r) => norm(r.tier) === wanted)
    .map((r) => ({ company: r.company, contact: r.contact_name, email: r.contact_email }));
}

// parseur CSV minimal (stdlib) · évite d'importer le scorer pour un simple import
function parseCSVMinimal(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let field = '', row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\r') { /* skip */ }
    else if (c === '\n') { row.push(field); rows.push(row); field = ''; row = []; }
    else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const data = rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
  if (!data.length) return [];
  const header = data[0].map((h) => h.trim());
  return data.slice(1).map((cells) => {
    const o = {};
    header.forEach((h, i) => { o[h] = cells[i] !== undefined ? cells[i] : ''; });
    return o;
  });
}

function findById(store, id) {
  return store.find((r) => r.id === id || norm(r.id) === norm(id));
}

function cmdMove(store, path, id, stageInput) {
  if (!id || !stageInput) throw new Error('move : usage → move <id> <étape>');
  const rec = findById(store, id);
  if (!rec) throw new Error(`move : prospect introuvable → ${id}`);
  const stage = resolveStage(stageInput);
  if (!stage) {
    throw new Error(`move : étape invalide → "${stageInput}". Valides : ${STAGES.join(' | ')}`);
  }
  const ts = nowISO();
  rec.stage = stage;
  rec.updated_at = ts;
  rec.history.push({ stage, at: ts });
  saveStore(path, store);
  process.stdout.write(`→ ${rec.id}  ${rec.company}  now [${stage}]\n`);
}

function cmdList(store, opts) {
  let rows = store;
  if (opts.stage) {
    const s = resolveStage(opts.stage);
    if (!s) throw new Error(`list : étape invalide → "${opts.stage}". Valides : ${STAGES.join(' | ')}`);
    rows = rows.filter((r) => r.stage === s);
  }
  if (opts.json) { process.stdout.write(JSON.stringify(rows, null, 2) + '\n'); return; }
  if (!rows.length) { process.stdout.write('(vide)\n'); return; }
  const days = (iso) => Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  process.stdout.write(`${'ID'.padEnd(26)} ${'ÉTAPE'.padEnd(18)} ${'MAJ(j)'.padEnd(7)} ENTREPRISE\n`);
  for (const r of rows) {
    process.stdout.write(`${r.id.padEnd(26)} ${r.stage.padEnd(18)} ${String(days(r.updated_at)).padEnd(7)} ${r.company}\n`);
  }
  // récap par étape
  const counts = {};
  for (const r of store) counts[r.stage] = (counts[r.stage] || 0) + 1;
  const summary = STAGES.filter((s) => counts[s]).map((s) => `${s}: ${counts[s]}`).join(' · ');
  process.stdout.write(`\n${rows.length} affiché(s) / ${store.length} total. ${summary}\n`);
}

function cmdStale(store, opts) {
  const days = opts.days != null ? opts.days : STALE_DEFAULT_DAYS;
  const cutoff = Date.now() - days * 86400000;
  const terminal = new Set(['Gagné', 'Perdu']);
  const stale = store.filter((r) => !terminal.has(r.stage) && new Date(r.updated_at).getTime() < cutoff);
  if (!stale.length) { process.stdout.write(`Aucun prospect stale (> ${days} j).\n`); return; }
  process.stdout.write(`Prospects sans activité depuis > ${days} j (${stale.length}) :\n`);
  for (const r of stale) {
    const d = Math.floor((Date.now() - new Date(r.updated_at).getTime()) / 86400000);
    process.stdout.write(`  ${r.id.padEnd(26)} ${r.stage.padEnd(18)} ${d} j  ${r.company}\n`);
  }
}

function cmdShow(store, id) {
  const rec = findById(store, id);
  if (!rec) throw new Error(`show : prospect introuvable → ${id}`);
  process.stdout.write(JSON.stringify(rec, null, 2) + '\n');
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const HELP = `crm-lite.mjs · pipeline de prospection Waimia (P3.1-b, §6, 0 envoi)

Store : ${DEFAULT_STORE} (surcharge : --file <path>) · gitignoré (PII).
Étapes : ${STAGES.join(' → ')}

  add   --company "X" [--contact "Nom"] [--email a@b] [--stage S] [--note "..."]
  add   --from <scored.csv|scored.jsonl> [--tier A]
  move  <id> <étape>
  list  [--stage S] [--json]
  stale [--days N]        (défaut ${STALE_DEFAULT_DAYS})
  show  <id>

Alias d'étape acceptés : sourced, contacted, replied, rdv, audit, proposition, won, lost.`;

function parseArgs(argv) {
  const opts = { file: DEFAULT_STORE, _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') opts.help = true;
    else if (a === '--file') opts.file = argv[++i];
    else if (a === '--company') opts.company = argv[++i];
    else if (a === '--contact') opts.contact = argv[++i];
    else if (a === '--email') opts.email = argv[++i];
    else if (a === '--stage') opts.stage = argv[++i];
    else if (a === '--note') opts.note = argv[++i];
    else if (a === '--from') opts.from = argv[++i];
    else if (a === '--tier') opts.tier = argv[++i];
    else if (a === '--days') opts.days = Number(argv[++i]);
    else if (a === '--json') opts.json = true;
    else opts._.push(a);
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const cmd = opts._[0];
  if (opts.help || !cmd) { process.stdout.write(HELP + '\n'); process.exit(cmd ? 0 : 2); }

  const store = loadStore(opts.file);
  try {
    switch (cmd) {
      case 'add': cmdAdd(store, opts.file, opts); break;
      case 'move': cmdMove(store, opts.file, opts._[1], opts._[2]); break;
      case 'list': cmdList(store, opts); break;
      case 'stale': cmdStale(store, opts); break;
      case 'show': cmdShow(store, opts._[1]); break;
      default:
        process.stderr.write(`Commande inconnue : ${cmd}\n\n${HELP}\n`);
        process.exit(2);
    }
  } catch (e) {
    process.stderr.write(`Erreur : ${e.message}\n`);
    process.exit(1);
  }
}

const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('crm-lite.mjs');
if (isMain) main();

export { STAGES, resolveStage, loadStore, saveStore, genId };
