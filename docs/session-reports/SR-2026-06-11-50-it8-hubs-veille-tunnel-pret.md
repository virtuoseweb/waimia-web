# SR-50 — It.8 : veille orpheline + densité hubs mergés, tunnel-prose prêt en attente

Date : 2026-06-11 (fin d'après-midi). Orchestrateur : session longue itérative (boucle critique → vague → GF-1).

## Résultat

It.8 livrée aux 2/3 sur `main` = `48e2e9b`, **poussé** (`340b424..48e2e9b`). Pas de deploy : quota Vercel Hobby épuisé (reset 2026-06-12 ~16:03), cron `d374f95b` demain 16:12 déclenchera le deploy API + GF-1 prod consolidé (4 harness).

### Mergé (2 vagues)

1. **veillefix** (`309df7b`) : `/ressources/veille-ia` requête enfin `getCollection('blog')` filtré `type === 'veille-ia'` → l'article publié `gpt-4o-vision-update` (HTTP 200, orphelin depuis sa mise en ligne) est exposé en EditorialWriteRow ; intro pleine largeur (hero-hub-listing + wrap-wide). Bonus : « Francenum » → « France Num » ×6 (sitemap, agence ×2, changelog, about FR+EN).
2. **hubsdense** (`a69ac0b` + merge `48e2e9b`) :
   - `TierPyramidSvg.astro` : viewBox 440→408, labels 10px→17px ink (pyramide lisible, plus de décor faible) ;
   - `/offres/` FR+EN : gap pyramide → section suivante 296→136px ;
   - `/ecole/` : table 3 lignes → `OfferTierGrid` variant=featured + cours phare en carte dark terracotta (« Automatiser les relances CRM en 4 heures ») ;
   - `UtilityTemplate.astro` : breadcrumb offset `calc(--header-height + --space-5)` (contact ne clippe plus sous la nav).

### Prêt, non mergé

- **`feat/tunnel-prose` = `3abf865`** (worktree `.worktrees/tunnelprose` conservé) : le P1 le plus structurant de la punch-list 8 — TunnelStepTemplate + CourseDetailTemplate passent du mur de prose mono-colonne ~55 % à un rail méta sticky 2 colonnes (prose 720px + gauge 01/04 + steps accent + CTA), vide hero→hr resserré, puces dot accent, hiérarchie CTA cours rétablie. **Bloqué par les ~65 fichiers ouverts de la session parallèle** (chantier variation Phase B touche les mêmes templates) → merge différé à son commit, réconciliation sémantique attendue (rail méta × variations dark). Demande déposée dans `tasks/ORCH-STATE.md`.

## Preuves (GF-1 local, worktree de validation détaché `validate-it8` sur 48e2e9b)

- Pipeline : `astro check` CHECK_EXIT=0 « 0 errors » · build `Complete!` · 7 gates PASS.
- Sondes Playwright desktop 1440 + mobile 390 (chromium isolé, scroll lent) :
  - veille : article listé, lien `/ressources/veille-ia/gpt-4o-vision-update`, h1 opacity 1, 0 reveal caché — PASS desktop+mobile ;
  - école : cards 2 + featured true + hasTable false — PASS ;
  - offres : pyramide présente ; gap mesuré par le worker 136-148px (ma sonde `nextElementSibling` rendait 0 = mal câblée, pas le site) ;
  - contact : page fraîche scrollY 0 → `bcTop 96 > navH 79` — PASS (la sonde initiale -819 était polluée par l'état de scroll du harness).
- Screenshots : `/tmp/wmission/critique8/shots-gf1/local-veille.png`, `local-ecole.png`, `contact-top.png` — confirmation visuelle directe (hero veille + row article ; carte phare dark + 2 cards).

## Punch-list 8 — état

Note globale critique : 3,9/5. Traités : veille 2,9 (P1 orphelin + intro), école 3,3 (P1 maigre), offres 3,8 (P1 bande morte + P2 pyramide), contact 4,8 (P2 breadcrumb). Restant : tunnel 3,0-3,1 (P1 mur de prose → branche prête), monotonie héros tunnel (P2, non traité).

## Suivant

1. Merge `tunnel-prose` dès commit du chantier variation parallèle (+ GF-1 tunnel/cours).
2. Cron demain 16:12 : deploy API gitSource + poll + GF-1 PROD (gf1-batch8, gf1-secteurs, gf1-it7, gf1-it8 en `GF_BASE=https://waimia.com`) + SR.
3. Re-critique it.9 (boucle mandat) — inclure les pages non couvertes par la critique 8.

## Leçons

- Une sonde GF-1 qui contredit la mesure du worker n'invalide pas le livrable : trancher par re-mesure propre (page fraîche, scroll connu) + screenshot avant de conclure. Deux faux négatifs (`gapAfterPyramid: 0`, `bcTop: -819`) venaient du harness, zéro du site.
- Worktrees : `veillefix` + `hubsdense` supprimés post-merge ; `tunnelprose` (branche vivante) + `validate-it8` (validation sur tree pollué) conservés.
