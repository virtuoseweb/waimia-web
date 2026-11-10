/**
 * Provenance et canal d'une demande : dérivation du canal (fonction pure) et validation des
 * champs UTM, sans build et sans e-mail.
 * Lancer : node --test scripts/tests/lead-source.test.mjs
 */
import './_src-hooks.mjs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { CANAUX, deriveCanal, LeadSourceSchema, leadSourceRows, leadSourceLog, leadCanalTag } = await import(
  pathToFileURL(join(ROOT, 'src', 'lib', 'lead-source.ts')).href
);

test('canal : les UTM posés dans nos liens priment', () => {
  assert.equal(deriveCanal({ utm_source: 'linkedin', utm_medium: 'social' }), 'linkedin');
  assert.equal(deriveCanal({ utm_source: 'linkedin', utm_medium: 'email', entry: 'direct' }), 'email-froid');
  assert.equal(deriveCanal({ utm_source: 'prospection', utm_medium: 'email' }), 'email-froid');
  assert.equal(deriveCanal({ utm_source: 'coworking-lyon', utm_medium: 'qr' }), 'coworking');
  assert.equal(deriveCanal({ utm_source: 'annuaire-ia', utm_medium: 'referral' }), 'annuaire');
  assert.equal(deriveCanal({ utm_source: 'agence-x', utm_medium: 'partenaire' }), 'partenaire');
  assert.equal(deriveCanal({ utm_source: 'google', utm_medium: 'organic' }), 'organique');
  assert.equal(deriveCanal({ utm_source: 'inconnu-total', utm_medium: 'zzz' }), 'inconnu');
});

test('canal : sans UTM, le référent décide', () => {
  assert.equal(deriveCanal({ entry: 'linkedin.com' }), 'linkedin');
  assert.equal(deriveCanal({ entry: 'lnkd.in' }), 'linkedin');
  assert.equal(deriveCanal({ entry: 'google.com' }), 'organique');
  assert.equal(deriveCanal({ entry: 'duckduckgo.com' }), 'organique');
  assert.equal(deriveCanal({ entry: 'direct' }), 'direct');
  assert.equal(deriveCanal({ entry: 'interne' }), 'inconnu');
  assert.equal(deriveCanal({ entry: 'blog-quelconque.fr' }), 'inconnu');
});

test('canal : provenance absente = inconnu, jamais direct', () => {
  assert.equal(deriveCanal(undefined), 'inconnu');
  assert.equal(deriveCanal({}), 'inconnu');
});

test('canal : toujours une valeur de la liste fermée', () => {
  for (const s of [undefined, {}, { utm_source: 'x' }, { entry: 'a.b' }, { utm_medium: 'email' }]) {
    assert.ok(CANAUX.includes(deriveCanal(s)));
  }
  assert.deepEqual(leadCanalTag({ entry: 'direct' }), { name: 'canal', value: 'direct' });
});

test('validation : chaîne simple bornée, le reste est écarté sans refuser la demande', () => {
  const ok = LeadSourceSchema.parse({ utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'lancement-2026', utm_content: 'post 1', landing: '/', entry: 'direct' });
  assert.equal(ok.utm_campaign, 'lancement-2026');
  assert.equal(ok.utm_content, 'post 1');
  const bad = LeadSourceSchema.parse({
    utm_source: '<script>alert(1)</script>',
    utm_medium: 'a'.repeat(81),
    utm_campaign: { $ne: 1 },
    utm_content: 'x\r\nBcc: a@b.c',
    landing: '/ok',
  });
  assert.equal(bad.utm_source, undefined);
  assert.equal(bad.utm_medium, undefined);
  assert.equal(bad.utm_campaign, undefined);
  assert.equal(bad.utm_content, undefined);
  assert.equal(bad.landing, '/ok');
  assert.equal(LeadSourceSchema.parse('pas un objet'), undefined);
});

test('alerte et journal : le canal est lu, jamais pris du navigateur', () => {
  const src = LeadSourceSchema.parse({ utm_source: 'linkedin', utm_medium: 'social', canal: 'direct' });
  const rows = leadSourceRows(src, '/contact');
  assert.deepEqual(rows[0], { label: 'Canal', value: 'linkedin' });
  assert.ok(rows.some((r) => r.label === 'UTM source' && r.value === 'linkedin'));
  assert.equal(leadSourceLog(src, '/contact').canal, 'linkedin');
  assert.equal(leadSourceLog(undefined).canal, 'inconnu');
});

test('parcours : pages de la visite dans l\'alerte et le journal, entrée invalide écartée', () => {
  const src = LeadSourceSchema.parse({ landing: '/blog/a', entry: 'google.com', path: ['/blog/a', '/services/x', '/contact'] });
  const rows = leadSourceRows(src, '/contact');
  assert.equal(rows.find((r) => r.label === 'Parcours')?.value, '/blog/a → /services/x → /contact');
  assert.deepEqual(leadSourceLog(src, '/contact').path, '/blog/a>/services/x>/contact');
  assert.equal(leadSourceLog(src, '/contact').pages, '3');
  assert.equal(LeadSourceSchema.parse({ path: ['/ok', 'javascript:alert(1)'] })?.path, undefined);
  assert.equal(LeadSourceSchema.parse({ path: Array.from({ length: 21 }, () => '/a') })?.path, undefined);
  const one = leadSourceRows(LeadSourceSchema.parse({ landing: '/contact', path: ['/contact'] }));
  assert.equal(one.some((r) => r.label === 'Parcours'), false);
});
