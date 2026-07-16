---
route: /secteurs/industrie
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les PME industrielles : rendre votre savoir-faire lisible et captable · Waimia"
kw_cible: "site web PME industrielle / sous-traitance (appels d'offres)"
date: 2026-07-16
---

# Audit · /secteurs/industrie

## 1. Identité
- Contenu `src/content/secteurs/industrie.mdx`. **noindex** (`:727-728`). Pas de `caseRef`.
- kw cible : « site web PME industrielle / sous-traitance ». Intention B2B technique (donneur d'ordre, appels d'offres). Aligné.
- Rôle : demande-capture + GEO.

## 2. Contenu
- Prose 210 mots, 4 pains vraiment industriels (savoir-faire invisible, présence web datée, cycles techniques mal outillés, données ERP/Excel dispersées). Angle propre : « site technique de savoir-faire » + doc technique interrogeable. Substance réelle.
- metricsHero distincts et sourcés : Gartner 67 % parcours B2B, McKinsey 27 % temps recherche info. Pas de clone 6sense. Bon.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.
- Vocabulaire technique (tolérances, capacités machine, certifications, specs) → bon signal de spécificité sectorielle, éloigne du template générique.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien industrie ; devrait pousser `/services/integration-claude` pour la doc technique et `/services/site-web-ia`), grille de cas cassée (Carnets/Balzeo/Amploi hors-métier).

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison (pas de cas industriel). Réindexable après premier cas.

## 6. Conversion
- CTA « Cadrer mon savoir-faire en ligne → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder : angle technique distinct, faible risque de doublon).
1. Sectoriser le `related-links` (mettre en avant `/services/integration-claude` + `/services/agents-ia` pour la doc technique interrogeable, + un cas-usage « centraliser données »).
2. Corriger la grille de cas (bug transverse) → état « cas en préparation » plutôt que 3 cas hors-métier.
3. Prioriser un premier cas industriel (sous-traitant/fabricant) pour réindexer.
4. Raccourcir le `<title>`.
