---
route: /cas-usages/
verdict: AMÉLIORER
title_actuel: "Cas d'usage IA pour PME · Waimia"
kw_cible: "cas d'usage IA PME"
date: 2026-07-16
---

# /cas-usages/ (hub) — AMÉLIORER

Source : `src/pages/cas-usages/index.astro` · rendu **100 % composable** (`hero-hub-masthead` + `related-cards-band` chunkés + `cta-final`).

## 1. Identité
- Title `:135` : « Cas d'usage IA pour PME · Waimia » — kw-first, bon.
- Description `:137` : liste les 4 intentions (leads, reporting, données, processus). Bonne.
- Rôle : hub du silo intention-problème (outcome-intents). Croisé `docs/strategy/14:105` : « garder · maillage cas-usage ↔ service verrouillé ».

## 2. Contenu
- 5 cartes dérivées de la collection (`index.astro:30-46`), libellé court = segment avant « · » du title. Voix OK.
- Cartes chunkées 2-3 via `related-cards-band` (`:120-128`). Propre, 0 orphelin.

## 3. SEO on-page
- **H1 non kw-first (défaut doctrine V8.1)** : rendu = « Vos cas, pas une démo. » (`index.astro:73`, vérifié HTML `<h1>Vos cas,pas une démo.</h1>`). Slogan, 0 kw. Le kw « cas d'usage » n'est que dans le kicker (`:72`).
- Title/meta compensent, mais le H1 devrait porter « Cas d'usage IA ».

## 4. Maillage interne
- Sortants : 5 fiches cas-usage + CTA `cta-final` → `/contact` (primaire) et `/services/integration-claude` (secondaire, `:110`). Bon pont hub → service pivot.
- Entrants : nav principale. OK.

## 5. Balisage
- `buildCollectionPage` (`:130`) → `CollectionPage` + items `WebPage`. `MastheadBar` émet le `BreadcrumbList`. Conforme (pas de FAQ au niveau hub, donc pas de dup ici).

## 6. Conversion
- CTA `:98-116` : « Réserver un diagnostic (45 min) → » `/contact` + « Voir les services → » `/services/integration-claude`. Cohérent. Le « diagnostic 45 min » mappe l'offre audit ; pourrait pointer `/contact?intent=…` ou l'audit dédié pour tracer l'intention.

## 7. Verdict + actions
**AMÉLIORER.**
1. Réécrire le H1 en kw-first (`index.astro:73`, `h1_fr`), ex. « Cas d'usage IA : le gain réel, pas une démo. » pour porter le kw hors du seul kicker.
2. (Optionnel) tracer le CTA diagnostic vers `/contact?intent=diagnostic` (ou l'audit dédié) au lieu de `/contact` nu (`:105`).
3. Vérité de source : le hub liste 5 cartes ; s'assurer que la collection reste à 5 (pas de doublon de skeleton non intentionnel, cf near-dup signalé dans les fiches enfants).
