---
route: /secteurs/startup-logiciel
verdict: AMÉLIORER
title_actuel: "Site web et IA pour startup et éditeur logiciel : capter les visiteurs qui partent sans formulaire · Waimia"
kw_cible: "site web pour startup / SaaS / éditeur logiciel"
date: 2026-07-16
---

# Audit · /secteurs/startup-logiciel

## 1. Identité
- Contenu `src/content/secteurs/startup-logiciel.mdx`. **Indexée** (`:1010-1011` `noindex:false`). Cas `caseRef: amploi` (`:1006`).
- kw cible : « site web pour startup / SaaS / éditeur ». Intention commerciale.
- Rôle : 3ᵉ page indexée. MAIS strategy/14 §3 ligne 108 la flague explicitement : « corriger le cas (amploi ≠ SaaS) ou noindex temporaire », non traité à ce jour.

## 2. Contenu
- Prose 197 mots, 4 pains distincts SaaS (97 % anonymes, valeur en 5 s, pipeline illisible, pas de temps contenu). metricsHero forts et propres à la cible : Warmly 97 % / 30-40 %, Semrush 4,4×.
- **Problème E-E-A-T (flag strategy) :** le cas rattaché est `amploi`, dont le `sector_fr` est « RH et santé au travail » (`src/content/cases/amploi.mdx:10`), pas un éditeur SaaS grand public. La prose force le rapprochement (« un produit logiciel dont l'acquisition… » `:1041`). C'est un cas de logiciel métier, défendable mais fragile pour une page qui vise « startup/SaaS/éditeur ». Un lecteur SaaS n'y reconnaît pas son pair.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien startup/SaaS-spécifique), grille de cas cassée (montre Carnets/Balzeo/Amploi ; Amploi n'y est que par `card.order` 3, pas par matching secteur).

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. Canonical OK. Indexée, mais l'indexation est fragilisée par le décalage cas↔promesse (cf strategy).

## 6. Conversion
- CTA « Cadrer mon acquisition → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder, mais lever le flag strategy avant de compter l'index comme acquis).
1. **Trancher le cas (action strategy/14 §3)** : soit reformuler l'accroche du cas Amploi pour l'assumer comme « logiciel métier RH » (honnêteté ≥ template), soit passer la page `noindex:true` temporairement tant qu'aucun cas SaaS pur n'existe. Ne pas laisser une page indexée sur une preuve qui ne matche pas la cible.
2. Sectoriser le `related-links` (lien `/services/site-web-ia`, `/services/crm-scoring-routing`, cas-usage « générer plus de leads »).
3. Corriger la grille de cas (bug transverse) : à défaut de cas SaaS, l'état « cas en préparation » honnête vaut mieux qu'un cas hors-cible affiché comme preuve.
4. Raccourcir le `<title>`.
