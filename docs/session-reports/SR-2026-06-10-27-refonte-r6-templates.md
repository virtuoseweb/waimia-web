# SR-2026-06-10-27 · Refonte R6 : extinction templates legacy, 65 stubs purgés, 672 → 607 pages

> **Addendum GF-1 PROD (22:46)** : push `5da0c31`, live 22:45 (poll 301 /careers). Vérifié : /equipe/simon-beros eyebrow rendu en atome Kicker au computed (`u-kicker eyebrow`, JetBrains Mono, uppercase, letter-spacing 1.32px, opacity 1), h1 opacity 1 transform neutre, /offres/conseil composable vivant, 0 erreur console.

> Worker **Fable 5** (worktree `.worktrees/r6templates`), branche **`feat/refonte-r6-templates`** commit `465cf63` (20 fichiers, +302/-655). Contre-vérifié orchestrateur (rule 09) : main inspecté sans merge inattendu, 3 gates relancés, grep ListIndexTemplate (0 import, seules mentions = texte footer dev-map + commentaires de provenance).

## 1. Résultat

- **Stubs catch-all `src/pages/[...slug].astro`** : 85 pages stub émises → **20 gardées** (toutes LIÉES, prouvé par point fixe du graphe de liens) ; **65 orphelines purgées** (672 → 607 HTML, purge list == fichiers supprimés au fichier près).
- **Fallbacks template morts** supprimés sur 5 routes collection (offres FR+EN, technologies, solutions FR+EN, tous les MDX étant composables) + throw anti-orphelin si un MDX futur arrive sans `sections:`.
- **ListIndexTemplate supprimé** : fusionné dans `UtilityTemplate` `variant="list"` (markup verbatim), 4 consumers repointés.
- **15 eyebrows legacy → atome Kicker** (AuthorPage 7, Solutions 6, CaseStudy 2), pattern R4, 0 `:where()` (leçon R5b).
- `library-manifest.ts` purgé des templates supprimés en R0 ; **/careers FR+EN → 301 /agence/careers** ; sitemap-noindex 79 → 16.

## 2. Preuves GF-1

- Diff structurel 672 HTML : 552 stricts + 50 modulo espaces + **65 supprimés == purge list exacte** + 0 ajouté + 5 deltas réels justifiés un à un (4 swaps Kicker + compteur ds-studio).
- **82 paired computed** new vs ref sur 28 pages = 0 divergence (tous les `.eyebrow` des pages swappées : police, taille, espacement, couleur, marges identiques). Harnais durci : attente de fin de reveal (faux positifs de jitter d'animation détectés et éliminés).
- Gates : astro check 0 errors · build Complete! 607 HTML · 7 gates PASS (contre-vérifiés post-merge sur main batché).
- 13 screenshots 1440×900 above-fold.

## 3. Restes documentés (V-F suivantes)

Extinction complète OffresDetail/TechDetail (13 stubs template restants LIÉS : exige nettoyage de liens, delta rendu) ; SolutionsDetail (dernier consumer = secteurs) ; ConversionFunnel composable ; copy design-system citant encore ServiceDetail/ListIndex. Détail : `/tmp/wmission/r6templates/architecture.md` §F + docs/40 §7.
