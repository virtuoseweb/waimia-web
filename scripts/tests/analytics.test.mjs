/**
 * Mesure d'audience maison : preuve SANS build, SANS base, SANS e-mail réel.
 *  - logique pure (src/lib/analytics/event.ts, dashboard.ts) ;
 *  - vraies routes /api/collect, /api/stats, /api/contact, /api/devis, /api/newsletter,
 *    /api/lead-magnet appelées avec un `Request`, un FAUX stockage injecté et un faux serveur
 *    « Resend » (RESEND_API_URL) ;
 *  - hors production/preview ou sans variable de base : rien n'est écrit.
 * Lancer : node --test scripts/tests/analytics.test.mjs
 */
import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
import './_src-hooks.mjs';
const srcUrl = (p) => pathToFileURL(join(ROOT, 'src', p)).href;

const ev = await import(srcUrl('lib/analytics/event.ts'));
const dash = await import(srcUrl('lib/analytics/dashboard.ts'));
const store = await import(srcUrl('lib/analytics/store.ts'));
const collect = await import(srcUrl('pages/api/collect.ts'));
const stats = await import(srcUrl('pages/api/stats.ts'));
const contact = await import(srcUrl('pages/api/contact.ts'));
const devis = await import(srcUrl('pages/api/devis.ts'));
const newsletter = await import(srcUrl('pages/api/newsletter.ts'));
const leadMagnet = await import(srcUrl('pages/api/lead-magnet.ts'));
const { LEAD_MAGNETS } = await import(srcUrl('data/conversion.ts'));

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/605 Version/17 Safari/605';

/** Faux stockage en mémoire. */
function fakeStore({ failInsert = false } = {}) {
  const rows = [];
  return {
    rows,
    purged: 0,
    async insert(e) {
      if (failInsert) throw new Error('boom');
      rows.push(e);
    },
    async purge() {
      this.purged++;
    },
    async report() {
      return {
        daily: [{ day: '2026-10-15', visites: 3 }],
        sources: [{ source: 'ia', visites: 2 }, { source: 'google', visites: 1 }],
        leadTypes: [{ type: 'contact', n: 1 }],
        pages: [{ path: '/<script>alert(1)</script>', visites: 3, google: 1, ia: 2, rdv: 1, leads: 1 }],
      };
    },
  };
}

// ---- Faux Resend ---------------------------------------------------------------------------
let server;
let resendFails = false;
before(async () => {
  server = http.createServer((req, res) => {
    req.resume();
    req.on('end', () => {
      res.writeHead(resendFails ? 500 : 200, { 'content-type': 'application/json' });
      res.end(resendFails ? '{"message":"boom"}' : '{"id":"fake-id"}');
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  process.env.RESEND_API_URL = `http://127.0.0.1:${server.address().port}`;
});
after(() => {
  server.close();
  store.setAnalyticsStoreForTests(undefined);
});

let fake;
let ipN = 0;
beforeEach(() => {
  fake = fakeStore();
  store.setAnalyticsStoreForTests(fake);
  process.env.VERCEL_ENV = 'production';
  process.env.RESEND_API_KEY = 'test_key_factice';
  resendFails = false;
});

const post = (url, body, headers = {}) =>
  new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${++ipN}`, referer: 'https://waimia.com/services/agents-ia', ...headers },
    body: JSON.stringify(body),
  });

// ---- Logique pure --------------------------------------------------------------------------
test('classement des sources : google, bing, ia (hôte et utm), social, direct, interne, autre', () => {
  const c = ev.classifySource;
  assert.equal(c('google.com', null), 'google');
  assert.equal(c('google.fr', null), 'google');
  assert.equal(c('bing.com', null), 'bing');
  for (const h of ['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com', 'copilot.microsoft.com']) {
    assert.equal(c(h, null), 'ia', h);
  }
  assert.equal(c(null, 'chatgpt.com'), 'ia', 'utm_source=chatgpt.com sans référent');
  assert.equal(c('google.com', 'chatgpt.com'), 'ia', "l'utm IA l'emporte");
  for (const h of ['linkedin.com', 'facebook.com', 'x.com', 't.co']) assert.equal(c(h, null), 'social', h);
  assert.equal(c(null, null), 'direct');
  assert.equal(c('waimia.com', null), 'interne');
  assert.equal(c('preview-abc.vercel.app', null, ['preview-abc.vercel.app']), 'interne');
  assert.equal(c('exemple.org', null), 'autre');
  assert.equal(c('notgoogle.com', null), 'autre');
});

const ctx = { env: 'production', userAgent: UA };

test('normalisation : hôte du référent seulement, pas de query ni de hash, longueurs bornées', () => {
  const e = ev.normalizeClientEvent(
    {
      type: 'pageview',
      path: '/blog/article?x=1#h',
      referrer: 'https://www.google.com/search?q=secret+personnel',
      utm_source: 'a'.repeat(500),
      utm_medium: 'cpc',
      utm_campaign: 'x',
      device: 'mobile',
    },
    ctx,
  );
  assert.equal(e.path, '/blog/article');
  assert.equal(e.referrer_host, 'google.com');
  assert.equal(e.source, 'google');
  assert.equal(e.utm_source.length, 60);
  assert.equal(e.device, 'mobile');
  assert.equal(e.kind, 'pageview');
  const stored = JSON.stringify(e);
  assert.ok(!stored.includes('secret'), 'aucune URL de référent complète');
  assert.deepEqual(Object.keys(e).sort(), ['detail', 'device', 'env', 'kind', 'name', 'path', 'referrer_host', 'source', 'utm_campaign', 'utm_medium', 'utm_source']);
});

test('rejets : chemin invalide, type inconnu, appareil inconnu neutralisé, rdv_click mappé', () => {
  for (const path of ['blog', '//evil.com', 'https://x.fr/', '/a b', 42, undefined, '/' + 'a'.repeat(300)]) {
    assert.equal(ev.normalizeClientEvent({ type: 'pageview', path }, ctx), null, String(path));
  }
  assert.equal(ev.normalizeClientEvent({ type: 'lead', path: '/' }, ctx), null);
  assert.equal(ev.normalizeClientEvent('x', ctx), null);
  assert.equal(ev.normalizeClientEvent({ type: 'pageview', path: '/', device: 'frigo' }, ctx).device, null);
  const click = ev.normalizeClientEvent({ type: 'rdv_click', path: '/services' }, ctx);
  assert.equal(click.kind, 'click');
  assert.equal(click.name, 'rdv_click');
});

test('robots : user-agent bot/crawl/spider/headless/lighthouse, absent, et drapeau webdriver', () => {
  for (const ua of ['Googlebot/2.1', 'AhrefsBot', 'SomeCrawler', 'Spider/1.0', 'HeadlessChrome/120', 'Chrome-Lighthouse', '', null]) {
    assert.equal(ev.normalizeClientEvent({ type: 'pageview', path: '/' }, { env: 'production', userAgent: ua }), null, String(ua));
  }
  assert.equal(ev.normalizeClientEvent({ type: 'pageview', path: '/', webdriver: true }, ctx), null);
  assert.ok(ev.normalizeClientEvent({ type: 'pageview', path: '/', webdriver: false }, ctx));
});

test("env : production et preview seulement", () => {
  assert.equal(ev.analyticsEnv('production'), 'production');
  assert.equal(ev.analyticsEnv('preview'), 'preview');
  assert.equal(ev.analyticsEnv('development'), null);
  assert.equal(ev.analyticsEnv(undefined), null);
});

test("recordSafely : n'écrit rien sans événement ni stockage, ne lève jamais, ne bloque pas au-delà du délai", async () => {
  await store.recordSafely(null, ev.leadEvent('production', 'contact', undefined, '/'));
  await store.recordSafely(fake, null);
  assert.equal(fake.rows.length, 0);
  await store.recordSafely(fakeStore({ failInsert: true }), ev.leadEvent('production', 'contact', undefined, '/'));
  const slow = { insert: () => new Promise(() => {}) };
  const t0 = Date.now();
  await store.recordSafely(slow, ev.leadEvent('production', 'contact', undefined, '/'), 50);
  assert.ok(Date.now() - t0 < 1000);
});

// ---- /api/collect --------------------------------------------------------------------------
const beacon = (body, headers = {}) =>
  new Request('https://waimia.com/api/collect', {
    method: 'POST',
    headers: { 'content-type': 'text/plain;charset=UTF-8', origin: 'https://waimia.com', 'user-agent': UA, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
const hit = async (req) => {
  const r = await collect.ALL({ request: req });
  assert.equal(r.status, 204);
  assert.equal(await r.text(), '');
};

test('collect : page vue écrite (text/plain), 204 sans corps', async () => {
  await hit(beacon({ type: 'pageview', path: '/services/agents-ia', referrer: 'https://chatgpt.com/', device: 'ordinateur' }));
  assert.equal(fake.rows.length, 1);
  assert.equal(fake.rows[0].source, 'ia');
  assert.equal(fake.rows[0].env, 'production');
  assert.equal(fake.rows[0].path, '/services/agents-ia');
});

test('collect : 204 toujours, aucune écriture (robot, webdriver, autre origine, corps illisible, trop gros, GET, preview vide)', async () => {
  await hit(beacon({ type: 'pageview', path: '/' }, { 'user-agent': 'Googlebot' }));
  await hit(beacon({ type: 'pageview', path: '/', webdriver: true }));
  await hit(beacon({ type: 'pageview', path: '/' }, { origin: 'https://evil.example' }));
  await hit(beacon({ type: 'pageview', path: '/' }, { origin: '' }));
  await hit(beacon('{pas du json'));
  await hit(beacon({ type: 'pageview', path: '/', pad: 'x'.repeat(5000) }));
  await hit(new Request('https://waimia.com/api/collect', { method: 'GET' }));
  assert.equal(fake.rows.length, 0);
});

test('collect : aucune écriture hors production/preview ni sans base ; erreur du stockage = 204', async () => {
  process.env.VERCEL_ENV = 'development';
  await hit(beacon({ type: 'pageview', path: '/' }));
  assert.equal(fake.rows.length, 0);
  process.env.VERCEL_ENV = 'preview';
  await hit(beacon({ type: 'pageview', path: '/' }));
  assert.equal(fake.rows[0].env, 'preview');
  store.setAnalyticsStoreForTests(null);
  await hit(beacon({ type: 'pageview', path: '/' }));
  store.setAnalyticsStoreForTests(fakeStore({ failInsert: true }));
  await hit(beacon({ type: 'pageview', path: '/' }));
  assert.equal(fake.rows.length, 1);
});

// ---- Conversions côté serveur --------------------------------------------------------------
const contactBody = { email: 'visiteur@example.com', name: 'Jeanne Test', brief: 'Bonjour, un besoin.', subject: 'audit', offer: 'site-web-ia', lang: 'fr' };

test('contact : lead enregistré après succès réel, avec offre et page d\'origine', async () => {
  const r = await contact.ALL({ request: post('https://waimia.com/api/contact', contactBody) });
  assert.equal(r.status, 200);
  assert.deepEqual(fake.rows.map((x) => [x.kind, x.name, x.detail, x.path]), [['lead', 'contact', 'site-web-ia', '/services/agents-ia']]);
});

test('contact : honeypot, échec d\'envoi, champs invalides, base absente : aucun lead, réponse inchangée', async () => {
  let r = await contact.ALL({ request: post('https://waimia.com/api/contact', { ...contactBody, website: 'http://spam.example' }) });
  assert.equal(r.status, 200);
  resendFails = true;
  r = await contact.ALL({ request: post('https://waimia.com/api/contact', contactBody) });
  assert.equal(r.status, 500);
  resendFails = false;
  r = await contact.ALL({ request: post('https://waimia.com/api/contact', { email: 'pas-un-email' }) });
  assert.equal(r.status, 400);
  assert.equal(fake.rows.length, 0);
  store.setAnalyticsStoreForTests(null);
  r = await contact.ALL({ request: post('https://waimia.com/api/contact', contactBody) });
  assert.equal(r.status, 200, 'sans base, le formulaire fonctionne');
});

test('contact : un stockage qui échoue ne bloque pas le formulaire', async () => {
  store.setAnalyticsStoreForTests(fakeStore({ failInsert: true }));
  const r = await contact.ALL({ request: post('https://waimia.com/api/contact', contactBody) });
  assert.equal(r.status, 200);
});

test('devis : lead avec slug d\'offre ; honeypot et échec : rien', async () => {
  const body = { email: 'visiteur@example.com', slug: 'site-web-ia', brief: 'Un site.', lang: 'fr' };
  let r = await devis.ALL({ request: post('https://waimia.com/api/devis', body) });
  assert.equal(r.status, 200);
  assert.deepEqual(fake.rows.map((x) => [x.name, x.detail]), [['devis', 'site-web-ia']]);
  fake.rows.length = 0;
  await devis.ALL({ request: post('https://waimia.com/api/devis', { ...body, website: 'x' }) });
  resendFails = true;
  r = await devis.ALL({ request: post('https://waimia.com/api/devis', body) });
  assert.equal(r.status, 500);
  assert.equal(fake.rows.length, 0);
});

test('newsletter : lead après succès ; honeypot et échec : rien', async () => {
  const body = { email: 'visiteur@example.com', lang: 'fr' };
  let r = await newsletter.ALL({ request: post('https://waimia.com/api/newsletter', body) });
  assert.equal(r.status, 200);
  assert.deepEqual(fake.rows.map((x) => [x.name, x.detail, x.path]), [['newsletter', null, '/services/agents-ia']]);
  fake.rows.length = 0;
  await newsletter.ALL({ request: post('https://waimia.com/api/newsletter', { ...body, website: 'x' }) });
  resendFails = true;
  r = await newsletter.ALL({ request: post('https://waimia.com/api/newsletter', body) });
  assert.notEqual(r.status, 200);
  assert.equal(fake.rows.length, 0);
});

test('lead-magnet : lead avec slug si livré ; honeypot et échec : rien', async () => {
  const slug = Object.keys(LEAD_MAGNETS).find((s) => !/diagnostic|calculateur/.test(s));
  const body = { email: 'visiteur@example.com', slug, lang: 'fr' };
  let r = await leadMagnet.ALL({ request: post('https://waimia.com/api/lead-magnet', body) });
  assert.equal(r.status, 200, JSON.stringify(await r.clone().json()));
  assert.deepEqual(fake.rows.map((x) => [x.name, x.detail]), [['lead-magnet', slug]]);
  fake.rows.length = 0;
  await leadMagnet.ALL({ request: post('https://waimia.com/api/lead-magnet', { ...body, website: 'x' }) });
  resendFails = true;
  r = await leadMagnet.ALL({ request: post('https://waimia.com/api/lead-magnet', body) });
  assert.notEqual(r.status, 200);
  assert.equal(fake.rows.length, 0);
});

test('lead hors production/preview : rien', async () => {
  process.env.VERCEL_ENV = 'development';
  await contact.ALL({ request: post('https://waimia.com/api/contact', contactBody) });
  assert.equal(fake.rows.length, 0);
});

// ---- /api/stats ----------------------------------------------------------------------------
const basic = (user, pass) => 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
const get = (qs = '', auth) =>
  stats.ALL({ request: new Request('https://waimia.com/api/stats' + qs, { headers: auth ? { authorization: auth } : {} }) });

test('stats : 401 sans mot de passe configuré, sans en-tête ou avec un mauvais mot de passe', async () => {
  delete process.env.ANALYTICS_DASHBOARD_PASSWORD;
  assert.equal((await get('', basic('waimia', ''))).status, 401, 'mot de passe non configuré : jamais ouvert');
  process.env.ANALYTICS_DASHBOARD_PASSWORD = 'mdp-de-test';
  let r = await get();
  assert.equal(r.status, 401);
  assert.match(r.headers.get('www-authenticate'), /^Basic /);
  assert.equal((await get('', basic('waimia', 'mauvais'))).status, 401);
  assert.equal((await get('', basic('autre', 'mdp-de-test'))).status, 401);
  assert.equal((await get('', 'Basic ???')).status, 401);
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(r.headers.get('cache-control'), 'no-store');
});

test('stats : 200 avec le bon mot de passe, HTML échappé, en-têtes, purge, paramètres', async () => {
  process.env.ANALYTICS_DASHBOARD_PASSWORD = 'mdp-de-test';
  const r = await get('?jours=7&env=preview', basic('waimia', 'mdp-de-test'));
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(r.headers.get('cache-control'), 'no-store');
  const html = await r.text();
  assert.ok(!html.includes('<script>alert'), 'chemin échappé');
  assert.ok(html.includes('&lt;script&gt;alert(1)'));
  assert.ok(html.includes('assistants IA'));
  assert.ok(html.includes('7 derniers jours') && html.includes('preview'));
  assert.equal(fake.purged, 1);
  assert.equal(dash.parseDays('90'), 90);
  assert.equal(dash.parseDays('5'), 30);
  assert.ok(!html.includes('mdp-de-test'));
  assert.ok(!html.includes(String.fromCharCode(0x2014)));
});

test('stats : base absente = 503 après authentification', async () => {
  process.env.ANALYTICS_DASHBOARD_PASSWORD = 'mdp-de-test';
  store.setAnalyticsStoreForTests(null);
  assert.equal((await get('', basic('waimia', 'mdp-de-test'))).status, 503);
});
