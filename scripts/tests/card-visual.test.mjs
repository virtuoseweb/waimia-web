/**
 * card-visual : la carte reprend le hero explicite tel quel, sans retombée silencieuse.
 * Lancer : node --test scripts/tests/card-visual.test.mjs (sans build)
 */
import './_src-hooks.mjs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { resolveCardVisuals, heroSrcFromSections } = await import(pathToFileURL(join(ROOT, 'src/lib/card-visual.ts')).href);

const HERO = '/images/illustrations/ds/band-showing-tv-paper.webp';
const txt = (text) => ({ text, silo: 'agents' });

test('deux heros identiques : deux cartes identiques, source hero', () => {
  const [a, b] = resolveCardVisuals([{ ...txt('un'), heroSrc: HERO }, { ...txt('deux'), heroSrc: HERO }]);
  assert.equal(a.image, HERO);
  assert.equal(b.image, HERO);
  assert.equal(a.source, 'hero');
  assert.equal(b.source, 'hero');
});

test('deux heros du même dessin en variantes paper et ink : chaque carte garde son fichier', () => {
  const ink = HERO.replace('-paper', '-ink');
  const [a, b] = resolveCardVisuals([{ ...txt('un'), heroSrc: HERO }, { ...txt('deux'), heroSrc: ink }]);
  assert.deepEqual([a.image, b.image], [HERO, ink]);
});

test('un contenu sans hero ne reprend pas le dessin d un hero explicite', () => {
  const out = resolveCardVisuals([{ ...txt('un'), heroSrc: HERO }, txt('veille concurrence marche')]);
  assert.notEqual(out[1].image.replace(/-(paper|ink)\.webp$/, ''), HERO.replace(/-paper\.webp$/, ''));
  assert.notEqual(out[1].source, 'hero');
});

test('heroSrcFromSections lit illustration.src puis media_src', () => {
  assert.equal(heroSrcFromSections([{ illustration: { src: '/a.webp' }, media_src: '/b.webp' }]), '/a.webp');
  assert.equal(heroSrcFromSections([{ media_src: '/b.webp' }]), '/b.webp');
  assert.equal(heroSrcFromSections([]), undefined);
});
