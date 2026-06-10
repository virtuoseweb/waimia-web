# SR-2026-06-10-12 · APPROX #1 : masthead /solutions migré vers HeroCentered catalogué (task #4)

> Worker Sonnet worktree `.worktrees/approx`, **1 rejet + 1 correctif**, commit `4681e8b` mergé sur main. Cas d'école GF-1 : la v1 déclarait « 0 régression », la comparaison visuelle prod a prouvé le contraire.

## 1. Objet

Dernier masthead bespoke des pages hub : `.hub-mast` de `/solutions/` (FR+EN) → variante `hero-problem-index` du composant catalogué `HeroCentered`, via extensions rétro-compatibles (pattern APPROX du master plan : étendre un type existant par props optionnelles, défaut = catalogue figé).

## 2. Le rejet v1 (et pourquoi c'est important)

La v1 du worker affirmait « 0 régression » avec un raisonnement de delta théorique. Ma comparaison empirique prod vs après a révélé **2 régressions réelles** :
1. **h1 re-wrappé 2→3 lignes** (1312→1136px) : le `max-width:1200px` du catalogue contraignait le wrap du titre 158.4px.
2. **Lede disparue** : l'audit doc 19 (« la page n'a pas de lede ») était faux ; la prod affiche une accroche 28px Inter Tight italique max-width 760.

Leçon appliquée : baseline prod **mesurée** (getComputedStyle, pas le doc), table AVANT/APRÈS exigée, chemins de screenshots vérifiables.

## 3. Correctif (v2, validé)

- `wrapMaxWidth` (prop rétro-compat existante sur 2 autres variantes) étendue à `hero-problem-index`, défaut `undefined` = catalogue intact ; les pages passent `"none"` → wrap pleine largeur legacy.
- `lede_fr`/`lede_en` optionnels sur le schéma + guard dans le composant ; textes extraits de la prod char par char.
- `transition_id` optionnel (view transition conservée).

## 4. Preuves (double : worker + contre-vérif orchestrateur indépendante)

Mesures Playwright @1440×900, dist worktree (:4392) vs prod :

| Métrique | Prod | Après (FR et EN) |
|---|---|---|
| h1 x / width / **lignes** | 64 / 1312 / **2** | 64 / 1312 / **2** |
| h1 fontSize / opacity / transform | 158.4px / 1 / neutre | identique |
| lede présence / taille / style | oui / 28px / italic Inter Tight mw760 | char-identique (114 FR, 100 EN) |
| preview catalogue `/preview/hero-problem-index` | x152 / w1136 / lede demo | **identique au dist main** (règle d'or intacte) |

Gates : `check-touchpoints` 106 PASS · `build` Complete!

## 5. Bilan

Plus aucun masthead hub bespoke : la famille hub est entièrement servie par le catalogue. ~63 LoC bespoke supprimées par page (FR+EN).
