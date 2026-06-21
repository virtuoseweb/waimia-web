# Couverture GF-1 du catalogue — sweep automatisé (P2.1-a)

> Balayage automatisé des previews `/preview/<type>` du catalogue de sections.
> Mesure empirique (build local servi sur port fixe). Régénérable.
> Rapport brut : `coverage-sweep.json` (ce dossier).

## Méthode

Script Playwright headless parcourant **les 186 types previewables** (clés `section-demos.ts`)
en **desktop 1440×900 + mobile 400×844**, avec checks mécaniques GF-1 par preview :

- **heading** présent + `opacity ≠ 0` + `visibility ≠ hidden` + transform non aberrant ;
- **0 overflow horizontal** (`scrollWidth ≤ clientWidth + 2`) ;
- **0 erreur console** (incl. ressources 404 via prefetch) ;
- **0 reveal incomplet** (`[data-reveal]:not([data-revealed])`).

## Résultat (dernier passage)

| Mesure | Valeur |
| --- | --- |
| Types balayés | **186** (× 2 viewports = 372 rendus) |
| Clean (0 flag) | **161** |
| Flaggés | 25 |
| → **vrais défauts** (liens morts 404 au prefetch) | **9 — corrigés (9/9)** |
| → faux positifs (`no-heading`) | 16 — **confirmés sans-titre par design** (rendent toutes du contenu réel) |

### Vrais défauts corrigés (hygiène catalogue)

9 previews polluaient la console avec des **404 de prefetch** : des `href` de demo pointaient
vers des routes **inexistantes/purgées** (`/solutions/*`, `/solutions` nu, `/cas-clients/<slug>`
sans page, `/offres/{activation,growth,sur-mesure}`, `/ressources/guides/audit-ia-10-jours`).

- **Aucune page live** ne référençait ces routes (vérifié `grep` hors `section-demos.ts`) → impact
  limité au catalogue (bruit console), pas un lien cassé visiteur. `/secteurs`, `/cas-clients`,
  `/ressources` (index) restent **valides** (200) et sont conservés.
- Fix : repointage des `href` de demo vers `'#'` (convention demo en place) dans `section-demos.ts` ;
  `case-featured-grid` reçoit un `href` explicite (le composant fabriquait `/cas-clients/${slug}` à défaut).
  Data catalogue régénérée (`gen-section-quickref`, `gen-section-manifest`).
- Post-fix : **9/9 résolus, 0 erreur console résiduelle.**

### Faux positifs — `no-heading` (non défauts)

16 types n'ont pas de `h1/h2/title` **par design** (chrome / band / prose) : `announcement-banner`,
`author-byline`, `breadcrumb-bar`, `cta-band`, `cta-inline`, `editorial-callout`,
`editorial-dingbat-rule`, `editorial-dropcap-prose`, `editorial-prose`, `marquee-band`,
`masthead-bar`, `media-block`, `product-reel`, `pull-quote-block`, `spec-bar`, `tier-pyramid-svg`.
Vérifié : toutes rendent un contenu non vide (texte + hauteur). Le check `heading-required` est
inadapté à ces familles → raffiner par whitelist headingless plutôt que les compter comme défauts.

## Reste (P2.1-b/c/d)

- **P2.1-b** : versionner 1 capture above-fold par section/template sous `_current/<zone>/`.
- **P2.1-c** : rediriger le pipeline de sweep (`/tmp` → `docs/visual-audit/`, dé-ignorer `gf1-*`/`design-system-*.png`).
- **P2.1-d** : maintenance permanente (recapture à chaque itération design).
