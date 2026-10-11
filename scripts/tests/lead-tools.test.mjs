/**
 * Outils gratuits (diagnostic de maturité IA, calculateur ROI) : calcul, validation, rapport PDF,
 * e-mails et API, SANS build et SANS e-mail réel (faux serveur Resend via RESEND_API_URL).
 * Lancer : node --test scripts/tests/lead-tools.test.mjs
 */
import './_src-hooks.mjs';
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PDFDocument, PDFName, PDFArray, PDFDict, PDFString } from 'pdf-lib';
import { DIAG, ROI, LONG_EMAIL } from './fixtures/lead-tools.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = (p) => pathToFileURL(join(ROOT, 'src', p)).href;
const { computeDiagnostic, computeRoi, computeLeadTool } = await import(src('lib/lead-tools/index.ts'));
const { LeadToolPayloadSchema } = await import(src('lib/lead-tools/schema.ts'));
const { gmailComposeUrl } = await import(src('lib/lead-tools/digest.ts'));
const { AUDIT_RDV_URL } = await import(src('lib/lead-tools/links.ts'));
const { renderLeadToolPdf } = await import(src('lib/pdf/index.ts'));
const { fr } = await import(src('lib/pdf/kit.ts'));
const { levels, dimensions } = await import(src('data/diagnostic-maturite-ia.ts'));
const { processLeadMagnet } = await import(src('lib/lead-magnet-delivery.ts'));

const RDV = 'https://waimia.com/contact?offer=audit-ia-pme&intent=audit#rdv';
const ids = dimensions.flatMap((d) => d.questions.map((q) => q.id));

/* ───── Calculs ───── */

test('URL du rendez-vous : exactement celle demandée', () => {
  assert.equal(AUDIT_RDV_URL, RDV);
});

test('diagnostic : faible, moyen, fort, égalité', () => {
  const f = computeDiagnostic(DIAG.faible.answers);
  assert.equal(f.total, 0);
  assert.equal(f.level.level, 1);
  assert.equal(f.weak.key, 'donnees');
  const m = computeDiagnostic(DIAG.moyen.answers);
  assert.equal(m.total, 16);
  assert.equal(m.level.level, 3);
  assert.deepEqual(m.dims.map((d) => d.score), [3, 3, 4, 3, 3]);
  assert.equal(m.weak.key, 'donnees', 'égalité : première dimension dans l’ordre');
  const s = computeDiagnostic(DIAG.fort.answers);
  assert.equal(s.total, 30);
  assert.equal(s.level.level, 5);
  const e = computeDiagnostic(DIAG.egalite.answers);
  assert.equal(e.weak.key, 'donnees');
  assert.equal(e.dims[2].questions[0].answer, dimensions[2].questions[0].options[3].label);
});

test('diagnostic : chaque borne de niveau de la source donne le bon niveau', () => {
  for (const l of levels) {
    for (const target of [l.min, l.max]) {
      const a = {};
      let rest = target;
      for (const id of ids) {
        a[id] = Math.min(3, rest);
        rest -= a[id];
      }
      assert.equal(computeDiagnostic(a).level.level, l.level, `score ${target}`);
    }
  }
});

test('ROI : formules du JSON, scénarios bornés 0 à 100', () => {
  const m = computeRoi(ROI.moyen.inputs);
  assert.equal(m.values.heuresAn, 460);
  assert.equal(m.values.valeurAn, 23000);
  assert.equal(m.values.plafond, 23000);
  assert.deepEqual(m.scenarios.map((s) => s.partAuto), [30, 50, 70]);
  const f = computeRoi(ROI.faible.inputs);
  assert.equal(f.values.plafond, 4 * 40 * 0.15 * 30 - 200 * 12);
  const z = computeRoi(ROI.zero.inputs);
  assert.deepEqual(z.scenarios.map((s) => s.partAuto), [0, 0, 20]);
  const x = computeRoi(ROI.maxima.inputs);
  assert.deepEqual(x.scenarios.map((s) => s.partAuto), [80, 100, 100]);
  assert.equal(x.values.heuresAn, 104000);
  assert.throws(() => computeRoi({ ...ROI.moyen.inputs, partAuto: 101 }));
});

/* ───── Validation stricte ───── */

test('schéma : refuse réponses manquantes, hors barème, clés en trop, types et valeurs hostiles', () => {
  const ok = (p) => LeadToolPayloadSchema.safeParse(p).success;
  assert.ok(ok(DIAG.moyen));
  assert.ok(ok(ROI.maxima));
  assert.ok(ok(ROI.zero));
  const { q10, ...missing } = DIAG.moyen.answers;
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: missing }), 'question manquante');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q3: 4 } }), 'valeur 4');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q3: -1 } }), 'valeur -1');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q3: 1.5 } }), 'décimale');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q3: '2' } }), 'chaîne');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q11: 1 } }), 'id inconnu');
  assert.ok(!ok({ tool: 'diagnostic-maturite-ia', answers: { ...DIAG.moyen.answers, q1: '<script>alert(1)</script>' } }), 'texte hostile');
  assert.ok(!ok({ ...DIAG.moyen, score: 30 }), 'score client refusé');
  assert.ok(!ok({ tool: 'calculateur-roi-ia', inputs: { ...ROI.moyen.inputs, heuresTaches: 2001 } }), 'au-delà du max');
  assert.ok(!ok({ tool: 'calculateur-roi-ia', inputs: { ...ROI.moyen.inputs, semaines: 0 } }), 'sous le min');
  assert.ok(!ok({ tool: 'calculateur-roi-ia', inputs: { ...ROI.moyen.inputs, valeurAn: 1e9 } }), 'résultat injecté');
  assert.ok(!ok({ tool: 'autre', answers: {} }), 'outil inconnu');
});

/* ───── Typographie et liens ───── */

test('typographie française : insécables, apostrophe, aucune espace fine absente des polices', () => {
  const t = fr("Score : 3 ? C'est « oui » ! 23\u202F000 h et 50 %");
  assert.ok(!t.includes('\u202F'));
  assert.ok(t.includes('\u00A0:') && t.includes('\u00A0?') && t.includes('\u00A0!'));
  assert.ok(t.includes('«\u00A0') && t.includes('\u00A0»'));
  assert.ok(t.includes('C’est'));
  assert.ok(t.includes('23\u00A0000\u00A0h') && t.includes('50\u00A0%'));
});

test('lien Gmail : encodage complet et longueur < 1800 même avec accents et adresse de 200 caractères', () => {
  const long = Array.from({ length: 12 }, () => 'Paragraphe très accentué : éèàùç « œ » ’ ; réponse détaillée.').map((p, i) => `${i} ${p}`);
  const url = gmailComposeUrl(LONG_EMAIL, 'Objet accentué : réponse', ['Bonjour,', ...long, 'Bien à vous,\nWaimia']);
  assert.ok(url.length < 1800, `longueur ${url.length}`);
  assert.ok(url.startsWith('https://mail.google.com/mail/?view=cm&fs=1&to='));
  assert.ok(!/[ éèàù«»\n]/.test(url), 'tout est encodé');
});

/* ───── Rapport PDF ───── */

async function inspect(bytes) {
  const doc = await PDFDocument.load(bytes);
  const links = [];
  doc.getPages().forEach((page, i) => {
    const annots = page.node.lookup(PDFName.of('Annots'));
    if (!(annots instanceof PDFArray)) return;
    for (let k = 0; k < annots.size(); k++) {
      const a = annots.lookup(k, PDFDict);
      const act = a.lookup(PDFName.of('A'), PDFDict);
      const uri = act.lookup(PDFName.of('URI'));
      const rect = a.lookup(PDFName.of('Rect'), PDFArray).asArray().map((n) => n.asNumber());
      links.push({ page: i + 1, uri: uri instanceof PDFString ? uri.decodeText() : uri.decodeText(), w: rect[2] - rect[0], h: rect[3] - rect[1] });
    }
  });
  const lang = doc.catalog.lookup(PDFName.of('Lang'));
  return { doc, links, lang: lang?.decodeText?.() };
}

const ctx = (email = 'claire.martin@atelier-durand.fr') => ({ email, date: new Date('2026-10-11T08:30:00Z'), lang: 'fr' });

for (const [name, payload, pages] of [
  ...Object.entries(DIAG).map(([k, v]) => [`diagnostic ${k}`, v, 4]),
  ...Object.entries(ROI).map(([k, v]) => [`ROI ${k}`, v, 3]),
]) {
  test(`PDF ${name} : pages, poids < 1 Mo, bouton CTA cliquable vers l'URL exacte, métadonnées`, async () => {
    const res = computeLeadTool(payload);
    const { bytes, filename } = await renderLeadToolPdf(res, ctx(name.endsWith('fort') || name.endsWith('maxima') ? LONG_EMAIL : undefined));
    assert.ok(filename.endsWith('.pdf'));
    assert.equal(Buffer.from(bytes.slice(0, 5)).toString(), '%PDF-');
    assert.ok(bytes.length < 1024 * 1024, `${bytes.length} octets`);
    const { doc, links, lang } = await inspect(bytes);
    assert.equal(doc.getPageCount(), pages);
    assert.equal(doc.getAuthor(), 'Waimia');
    assert.ok(doc.getTitle().length > 10);
    assert.equal(lang, 'fr-FR');
    const cta = links.filter((l) => l.uri === RDV);
    assert.ok(cta.some((l) => l.page === pages && l.w >= 150 && l.h >= 40), `bouton CTA cliquable page ${pages} : ${JSON.stringify(cta)}`);
    for (let p = 1; p <= pages; p++) {
      const uris = links.filter((l) => l.page === p).map((l) => l.uri);
      assert.ok(uris.includes('https://waimia.com'), `waimia.com page ${p}`);
      assert.ok(uris.includes('mailto:bonjour@waimia.com'), `e-mail page ${p}`);
      assert.ok(uris.includes('tel:+33620615693'), `téléphone page ${p}`);
    }
  });
}


test('PDF diagnostic : chaque dimension la plus faible × chaque niveau, et libellés les plus longs, tiennent en 4 pages', async () => {
  const longest = {};
  for (const d of dimensions) for (const q of d.questions) {
    longest[q.id] = q.options.reduce((a, o) => (o.label.length > a.label.length ? o : a)).value;
  }
  const cases = [{ tool: 'diagnostic-maturite-ia', answers: longest }];
  for (const weakIdx of dimensions.keys()) {
    for (const l of levels) {
      // total visé = milieu du niveau ; la dimension visée reste strictement la plus basse.
      const a = Object.fromEntries(ids.map((id) => [id, 3]));
      const target = Math.round((l.min + l.max) / 2);
      let excess = 30 - target;
      const order = [...dimensions[weakIdx].questions.map((q) => q.id), ...ids.filter((id) => !dimensions[weakIdx].questions.some((q) => q.id === id))];
      for (const id of order) { const take = Math.min(3, excess); a[id] -= take; excess -= take; }
      const res = computeDiagnostic(a);
      if (res.level.level !== l.level) continue;
      cases.push({ tool: 'diagnostic-maturite-ia', answers: a });
    }
  }
  const seen = new Set();
  for (const c of cases) {
    const res = computeLeadTool(c);
    seen.add(`${res.weak.key}/${res.level.level}`);
    const { bytes } = await renderLeadToolPdf(res, ctx(LONG_EMAIL));
    assert.equal((await PDFDocument.load(bytes)).getPageCount(), 4, `${res.weak.key} niveau ${res.level.level}`);
  }
  for (const d of dimensions) assert.ok([...seen].some((k) => k.startsWith(d.key + '/')), `dimension ${d.key} rendue en point faible`);
  for (const l of levels) assert.ok([...seen].some((k) => k.endsWith('/' + l.level)), `niveau ${l.level} rendu`);
});

/* ───── API (logique de /api/lead-magnet) avec faux Resend ───── */

let server;
let received = [];
before(async () => {
  server = http.createServer((req, res) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      received.push(JSON.parse(data));
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end('{"id":"fake-id"}');
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  process.env.RESEND_API_URL = `http://127.0.0.1:${server.address().port}`;
  process.env.RESEND_API_KEY = 'test_key_factice';
});
after(() => server.close());

const post = (body, deps = {}) => {
  received = [];
  return processLeadMagnet({ email: 'claire.martin@atelier-durand.fr', lang: 'fr', website: '', newsletter: true, ...body }, deps);
};
const toVisitor = () => received.find((m) => m.to[0] === 'claire.martin@atelier-durand.fr');
const toTeam = () => received.find((m) => m.to[0] !== 'claire.martin@atelier-durand.fr');

test('API diagnostic : recalcul serveur, PDF joint au visiteur ET à l’alerte, base64 renvoyé', async () => {
  // Le client prétend « niveau 5 » : le serveur recalcule depuis les réponses (toutes à 0).
  const r = await post({ slug: 'diagnostic-maturite-ia', headline: 'Niveau 5 (Transformation) · 30/30', result: DIAG.faible, company: '<img src=x onerror=alert(1)>' });
  assert.equal(r.status, 200, JSON.stringify(r.body));
  assert.equal(r.body.ok, true);
  assert.equal(r.body.pdf.filename, 'waimia-diagnostic-maturite-ia.pdf');
  const bytes = Buffer.from(r.body.pdf.base64, 'base64');
  assert.equal((await PDFDocument.load(bytes)).getPageCount(), 4);
  const v = toVisitor();
  assert.equal(v.subject, 'Votre rapport de maturité IA · niveau 1 sur 5');
  assert.equal(v.attachments.length, 1);
  assert.equal(v.attachments[0].content, r.body.pdf.base64, 'même PDF');
  assert.ok(v.html.includes('Votre rapport est prêt'));
  assert.ok(v.html.includes(`href="${RDV}"`), 'bouton vers le rendez-vous');
  const t = toTeam();
  assert.equal(t.subject, 'Lead diagnostic maturité IA · claire.martin@atelier-durand.fr');
  assert.equal(t.attachments[0].content, r.body.pdf.base64, 'même PDF dans l’alerte');
  assert.ok(t.html.includes('Niveau 1 sur 5 (Exploration)'), 'niveau recalculé');
  assert.ok(!t.html.includes('Niveau 5'), 'le niveau du client est ignoré');
  for (const d of dimensions) for (const q of d.questions) {
    const esc = q.text.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    assert.ok(t.html.includes(esc), `question ${q.id} présente`);
  }
  assert.ok(t.html.includes('Angle de reprise'));
  assert.ok(t.html.includes('inscription demandée'));
  assert.ok(!t.html.includes('<img src=x'), 'valeur hostile échappée');
  const gmail = t.html.match(/href="(https:\/\/mail\.google\.com[^"]+)"/)[1].replace(/&amp;/g, '&');
  assert.ok(gmail.length < 1800);
  assert.ok(gmail.includes(`to=${encodeURIComponent('claire.martin@atelier-durand.fr')}`));
  assert.ok(!/—/.test(v.html + t.html), 'aucun tiret cadratin');
});

test('API ROI : hypothèses et résultats complets dans l’alerte, PDF 3 pages', async () => {
  const r = await post({ slug: 'calculateur-roi-ia', result: ROI.moyen });
  assert.equal(r.status, 200);
  assert.equal((await PDFDocument.load(Buffer.from(r.body.pdf.base64, 'base64'))).getPageCount(), 3);
  const t = toTeam();
  assert.equal(t.subject, 'Lead calculateur ROI IA · claire.martin@atelier-durand.fr');
  assert.ok(t.html.includes('Hypothèses saisies') && t.html.includes('Sensibilité'));
  assert.ok(t.html.includes('460'), 'heures récupérables');
  assert.ok(toVisitor().subject.startsWith('Votre estimation · 460 heures'));
});

test('API : 400 propre si résultat invalide ou d’un autre outil, rien envoyé', async () => {
  let r = await post({ slug: 'diagnostic-maturite-ia', result: { tool: 'diagnostic-maturite-ia', answers: { q1: 9 } } });
  assert.equal(r.status, 400);
  assert.equal(r.body.code, 'invalid_result');
  r = await post({ slug: 'calculateur-roi-ia', result: DIAG.moyen });
  assert.equal(r.status, 400);
  assert.equal(r.body.code, 'result_mismatch');
  r = await post({ slug: 'calculateur-roi-ia', result: { tool: 'calculateur-roi-ia', inputs: { ...ROI.moyen.inputs, tauxHoraire: 501 } } });
  assert.equal(r.body.code, 'invalid_result');
  assert.equal(received.length, 0);
});

test('API : échec du PDF jamais silencieux (e-mail sans pièce jointe, alerte en tête, pdf null + warning)', async () => {
  const r = await post({ slug: 'diagnostic-maturite-ia', result: DIAG.moyen }, { renderPdf: async () => { throw new Error('police introuvable'); } });
  assert.equal(r.status, 200);
  assert.equal(r.body.pdf, null);
  assert.equal(r.body.warning, 'pdf_not_generated');
  const v = toVisitor();
  assert.equal(v.attachments, undefined);
  assert.ok(v.html.includes('pas pu être joint'));
  const t = toTeam();
  assert.equal(t.attachments, undefined);
  const firstText = t.html.slice(t.html.indexOf('<td style="padding:36px 0;">'));
  assert.ok(firstText.indexOf('PDF non généré : police introuvable') < firstText.indexOf('Nouveau lead'), 'alerte en tête');
});

test('API : ressources statiques inchangées (pas de champ pdf), clé absente = 503 sans PDF', async () => {
  const r = await post({ slug: 'diagnostic-maturite-ia' });
  assert.equal(r.status, 200);
  assert.ok(!('pdf' in r.body));
  delete process.env.RESEND_API_KEY;
  try {
    const r2 = await post({ slug: 'calculateur-roi-ia', result: ROI.moyen });
    assert.equal(r2.status, 503);
    assert.equal(r2.body.code, 'email_not_configured');
    assert.ok(!('pdf' in r2.body));
    assert.equal(received.length, 0);
  } finally {
    process.env.RESEND_API_KEY = 'test_key_factice';
  }
});
