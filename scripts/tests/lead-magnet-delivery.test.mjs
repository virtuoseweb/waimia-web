/**
 * Preuve de la livraison des ressources verrouillées, SANS build et SANS e-mail réel :
 *  - faux serveur HTTP « Resend » (RESEND_API_URL) qui enregistre les corps reçus ;
 *  - le vrai code de src/lib/resend.ts, src/lib/lead-magnet-delivery.ts et src/lib/honeypot.ts
 *    est exécuté sous node (crochet de chargement : `import.meta.env` -> process.env, imports
 *    TypeScript sans extension) ;
 *  - faux PDF créé dans un dossier temporaire (jamais dans private/).
 * Lancer : node --test scripts/tests/lead-magnet-delivery.test.mjs
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Crochet de chargement : reproduit ce que Vite fait pour src/ (extensions .ts, import.meta.env).
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith('.') && context.parentURL?.includes('/src/')) {
        for (const suffix of ['.ts', '/index.ts']) {
          try {
            return nextResolve(specifier + suffix, context);
          } catch {
            /* suivant */
          }
        }
      }
      throw err;
    }
  },
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    if (url.includes('/src/') && url.endsWith('.ts') && result.source != null) {
      const text = Buffer.from(result.source).toString('utf8').replaceAll('import.meta.env', 'process.env');
      return { ...result, source: text };
    }
    return result;
  },
});

const srcUrl = (p) => pathToFileURL(join(ROOT, 'src', p)).href;
const { processLeadMagnet } = await import(srcUrl('lib/lead-magnet-delivery.ts'));
const { sendEmail } = await import(srcUrl('lib/resend.ts'));
const { LEAD_MAGNETS } = await import(srcUrl('data/conversion.ts'));

/** Faux Resend. */
let server;
let received = [];
let failNext = false;
before(async () => {
  server = http.createServer((req, res) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      received.push({ url: req.url, auth: req.headers.authorization, body: data ? JSON.parse(data) : null });
      if (failNext) {
        failNext = false;
        res.writeHead(500, { 'content-type': 'application/json' });
        return res.end('{"message":"boom"}');
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end('{"id":"fake-id"}');
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  process.env.RESEND_API_URL = `http://127.0.0.1:${server.address().port}`;
  process.env.RESEND_API_KEY = 'test_key_factice';
});
after(() => server.close());

const tmp = mkdtempSync(join(tmpdir(), 'lm-test-'));
mkdirSync(join(tmp, 'private', 'telechargements'), { recursive: true });
const pdfBytes = Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.alloc(5000, 7), Buffer.from('\n%%EOF')]);
writeFileSync(join(tmp, 'private', 'telechargements', 'faux.pdf'), pdfBytes);
after(() => rmSync(tmp, { recursive: true, force: true }));

const magnets = {
  'faux-guide': {
    title: 'Faux guide',
    path: '/ressources/outils/faux-guide',
    attachments: [{ file: 'private/telechargements/faux.pdf', filename: 'faux-guide.pdf' }],
  },
  'faux-absent': {
    title: 'Fichier absent',
    path: '/ressources/outils/faux-absent',
    attachments: [{ file: 'private/telechargements/absent.pdf', filename: 'absent.pdf' }],
  },
  'sans-fichier': { title: 'Sans fichier', path: '/x' },
};
const deps = { magnets, baseDirs: [tmp] };
const good = { email: 'visiteur@example.com', slug: 'faux-guide', lang: 'fr', website: '' };
const reset = () => {
  received = [];
  process.env.RESEND_API_KEY = 'test_key_factice';
};

test('pièce jointe base64 présente, bon filename, bonne taille, aucun lien public', async () => {
  reset();
  const r = await processLeadMagnet(good, deps);
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.equal(r.body.attached, true);
  const toVisitor = received.find((x) => x.body.to?.[0] === 'visiteur@example.com');
  assert.ok(toVisitor, 'e-mail au visiteur envoyé');
  assert.equal(toVisitor.auth, 'Bearer test_key_factice');
  assert.equal(toVisitor.body.attachments.length, 1);
  const att = toVisitor.body.attachments[0];
  assert.equal(att.filename, 'faux-guide.pdf');
  assert.equal(Buffer.from(att.content, 'base64').length, pdfBytes.length);
  assert.deepEqual(Buffer.from(att.content, 'base64'), pdfBytes);
  assert.ok(!toVisitor.body.html.includes('/telechargements/'), 'aucune URL de fichier dans le HTML');
  assert.ok(toVisitor.body.html.includes('pièce jointe'));
  assert.equal(received.length, 2, 'visiteur + alerte interne');
  const internal = received.find((x) => x !== toVisitor);
  assert.equal(internal.body.attachments, undefined, "l'alerte interne n'embarque pas le fichier");
});

test('ressource sans fichier : e-mail sans pièce jointe', async () => {
  reset();
  const r = await processLeadMagnet({ ...good, slug: 'sans-fichier' }, deps);
  assert.equal(r.status, 200);
  assert.equal(received.find((x) => x.body.to?.[0] === 'visiteur@example.com').body.attachments, undefined);
});

test('503 email_not_configured sans clé Resend, aucun appel réseau', async () => {
  reset();
  delete process.env.RESEND_API_KEY;
  const r = await processLeadMagnet(good, deps);
  assert.equal(r.status, 503);
  assert.equal(r.body.code, 'email_not_configured');
  assert.equal(received.length, 0);
  process.env.RESEND_API_KEY = 'test_key_factice';
});

test('503 resource_unavailable si le fichier manque, sans révéler de chemin, rien envoyé', async () => {
  reset();
  const logs = [];
  const orig = console.error;
  console.error = (...a) => logs.push(a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' '));
  let r;
  try {
    r = await processLeadMagnet({ ...good, slug: 'faux-absent' }, deps);
  } finally {
    console.error = orig;
  }
  assert.equal(r.status, 503);
  assert.equal(r.body.code, 'resource_unavailable');
  assert.ok(!JSON.stringify(r.body).includes('private'), 'pas de chemin dans la réponse');
  assert.ok(!JSON.stringify(r.body).includes('absent.pdf'));
  assert.ok(logs.some((l) => l.includes('resource_unavailable') && l.includes('absent.pdf')), 'chemin dans le log serveur');
  assert.equal(received.length, 0);
});

test('502 send_failed si Resend échoue (pas de faux succès)', async () => {
  reset();
  failNext = true;
  const orig = console.error;
  console.error = () => {};
  let r;
  try {
    r = await processLeadMagnet(good, deps);
  } finally {
    console.error = orig;
  }
  assert.equal(r.status, 502);
  assert.equal(r.body.code, 'send_failed');
});

test('slug inconnu rejeté (y compris propriété héritée) ; e-mail invalide rejeté', async () => {
  reset();
  for (const slug of ['inconnu', 'constructor', '__proto__', 'toString']) {
    const r = await processLeadMagnet({ ...good, slug }, deps);
    assert.equal(r.status, 400, slug);
    assert.equal(r.body.code, 'unknown_resource', slug);
  }
  const bad = await processLeadMagnet({ ...good, email: 'pas-un-email' }, deps);
  assert.equal(bad.status, 400);
  assert.equal(bad.body.code, 'invalid_email');
  assert.equal(received.length, 0);
});

test('honeypot : faux succès identique, aucun e-mail, aucun fichier lu, même avec slug inconnu', async () => {
  reset();
  const ok = await processLeadMagnet(good, deps);
  const before = received.length;
  received = [];
  // Espion sur la lecture de fichiers : baseDirs piégé qui lèverait si on le parcourait.
  let touched = false;
  const trapDirs = new Proxy([], { get(t, k) { touched = true; return Reflect.get(t, k); } });
  const bot = await processLeadMagnet({ ...good, website: 'http://spam.example' }, { magnets, baseDirs: trapDirs });
  const botUnknown = await processLeadMagnet({ ...good, slug: 'nimporte', email: 'x', website: 'x' }, deps);
  assert.equal(bot.status, 200);
  assert.deepEqual(Object.keys(bot.body), ['ok']);
  assert.equal(bot.body.ok, true);
  assert.equal(botUnknown.status, 200);
  assert.equal(botUnknown.body.ok, true);
  assert.equal(touched, false, 'aucune racine de fichiers consultée');
  assert.equal(received.length, 0, 'aucun e-mail');
  assert.equal(ok.status, bot.status, 'même statut que le succès');
  assert.ok(before > 0);
});

test('délai minimal : soumission < 2 s après le chargement = robot (faux succès silencieux)', async () => {
  reset();
  const now = Date.now();
  const fast = await processLeadMagnet({ ...good, _t: String(now - 500) }, { ...deps, now });
  assert.equal(fast.status, 200);
  assert.deepEqual(Object.keys(fast.body), ['ok']);
  assert.equal(received.length, 0);
  const slow = await processLeadMagnet({ ...good, _t: String(now - 5000) }, { ...deps, now });
  assert.equal(slow.body.delivered, true);
  const noT = await processLeadMagnet(good, deps);
  assert.equal(noT.body.delivered, true, 'sans horodatage : pas de rejet');
});

test('sendEmail : attachments ajoutés au corps JSON, absents sinon', async () => {
  reset();
  await sendEmail({ to: 'a@example.com', subject: 's', html: '<p>x</p>', attachments: [{ filename: 'f.pdf', content: 'QUJD' }] });
  await sendEmail({ to: 'a@example.com', subject: 's', html: '<p>x</p>' });
  assert.deepEqual(received[0].body.attachments, [{ filename: 'f.pdf', content: 'QUJD' }]);
  assert.equal('attachments' in received[1].body, false);
});

test('registre réel : le PDF de la checklist expédié est lisible et envoyé tel quel', async () => {
  reset();
  const real = join(ROOT, 'private', 'telechargements', 'checklist-90-jours-claude-pme-waimia.pdf');
  assert.ok(existsSync(real), 'PDF présent hors public/');
  assert.ok(!existsSync(join(ROOT, 'public', 'telechargements', 'checklist-90-jours-claude-pme-waimia.pdf')), 'plus de copie publique');
  const r = await processLeadMagnet({ ...good, slug: 'checklist-90-jours-claude' }, { baseDirs: [ROOT] });
  assert.equal(r.status, 200);
  const att = received.find((x) => x.body.to?.[0] === 'visiteur@example.com').body.attachments[0];
  assert.deepEqual(Buffer.from(att.content, 'base64'), readFileSync(real));
  // les 5 slugs du cluster sont enregistrés avec les bons noms de fichiers
  for (const slug of ['checklist-90-jours-claude', 'charte-ia-entreprise', 'guide-achat-claude-pme', 'pack-skills-claude-pme', 'kit-conformite-claude-entreprise']) {
    assert.ok(LEAD_MAGNETS[slug]?.attachments?.length, slug);
  }
  assert.deepEqual(LEAD_MAGNETS['pack-skills-claude-pme'].attachments.map((a) => a.filename), ['pack-skills-claude-pme.pdf', 'pack-skills-claude-pme.zip']);
});

test('isBotSubmission : champ piège, horodatage, cas neutres', async () => {
  const { isBotSubmission } = await import(srcUrl('lib/honeypot.ts'));
  const now = 1_800_000_000_000;
  assert.equal(isBotSubmission({ website: 'x' }, now), true);
  assert.equal(isBotSubmission({ website: '   ' }, now), false);
  assert.equal(isBotSubmission({ website: '' }, now), false);
  assert.equal(isBotSubmission({ _t: String(now - 1999) }, now), true);
  assert.equal(isBotSubmission({ _t: now - 100 }, now), true);
  assert.equal(isBotSubmission({ _t: String(now - 2000) }, now), false);
  assert.equal(isBotSubmission({ _t: '' }, now), false);
  assert.equal(isBotSubmission({ _t: String(now + 60_000) }, now), false, 'horloge cliente en avance : pas de conclusion');
  assert.equal(isBotSubmission(null, now), false);
});

const post = (url, body) =>
  new Request(`http://localhost${url}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}` }, body: JSON.stringify(body) });

test('endpoints newsletter, contact, devis : honeypot = faux succès silencieux, aucun e-mail', async () => {
  reset();
  for (const name of ['newsletter', 'contact', 'devis']) {
    const { ALL } = await import(srcUrl(`pages/api/${name}.ts`));
    const res = await ALL({ request: post(`/api/${name}`, { email: 'bot@example.com', website: 'http://spam', name: 'x', brief: 'y', slug: 'z' }) });
    assert.equal(res.status, 200, name);
    assert.deepEqual(await res.json(), { ok: true }, name);
    const fast = await ALL({ request: post(`/api/${name}`, { email: 'bot@example.com', _t: String(Date.now() - 100), name: 'x', brief: 'y', slug: 'z' }) });
    assert.equal(fast.status, 200, name);
    assert.deepEqual(await fast.json(), { ok: true }, name);
  }
  assert.equal(received.length, 0, 'aucun e-mail pour aucun des trois');
});

test('endpoint lead-magnet (route Astro) : honeypot et slug inconnu', async () => {
  reset();
  const { ALL } = await import(srcUrl('pages/api/lead-magnet.ts'));
  const res = await ALL({ request: post('/api/lead-magnet', { email: 'bot@example.com', slug: 'checklist-90-jours-claude', website: 'x' }) });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(received.length, 0);
  const unknown = await ALL({ request: post('/api/lead-magnet', { email: 'ok@example.com', slug: 'nope' }) });
  assert.equal(unknown.status, 400);
});

test('newsletter sans clé Resend : 503 honnête (plus de faux succès)', async () => {
  reset();
  delete process.env.RESEND_API_KEY;
  const { ALL } = await import(srcUrl('pages/api/newsletter.ts'));
  const orig = console.error;
  console.error = () => {};
  let res;
  try {
    res = await ALL({ request: post('/api/newsletter', { email: 'vrai@example.com' }) });
  } finally {
    console.error = orig;
  }
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, 'email_not_configured');
  process.env.RESEND_API_KEY = 'test_key_factice';
});
