---
route: /secteurs/comptabilite
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les cabinets comptables : vendre le conseil, pas la saisie · Waimia"
kw_cible: "site web / IA pour cabinet comptable (expert-comptable)"
date: 2026-07-16
---

# Audit · /secteurs/comptabilite

## 1. Identité
- Contenu `src/content/secteurs/comptabilite.mdx`. **noindex** (`:233-234`). Pas de `caseRef` (aucun cas cabinet).
- kw cible : « site web / IA pour cabinet comptable ». Intention commerciale, cible claire (expert-comptable). Aligné.
- Rôle : demande-capture + GEO. Substance sectorielle la plus riche du silo côté prose.

## 2. Contenu
- **Prose la plus longue du silo : 306 mots.** 4 pains vraiment comptables (tenue banalisée, temps saisie, conseil ne se vend pas, recrutement tendu). Angle distinct : « vendre le conseil, pas la tenue » + intégration Claude sur la production documentaire. C'est de la substance propre, pas un find-replace.
- metricsHero : OCDE 70 % (propre), MAIS 2ᵉ métrique = 6sense 81 % (`:227-229`), **clone partagé** avec agence/conseil/services-b2b. Diversifier le 2ᵉ chiffre.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.
- Densité kw « cabinet / comptable / conseil / honoraires » correcte.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien comptable ni vers `/services/integration-claude` mis en avant alors que la page en parle beaucoup), grille de cas cassée (montre Carnets/Balzeo/Amploi, hors-métier).

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison (pas de cas cabinet). Réindexable dès qu'un cas comptable existe.

## 6. Conversion
- CTA « Cadrer mon cabinet → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder : substance réelle, meilleur candidat non-indexé à réindexer après premier cas).
1. Remplacer le 2ᵉ metricsHero cloné (6sense 81 %) par un chiffre propre au métier (automatisation compta, pénurie de profils, part conseil vs tenue) pour tuer le clonage inter-secteurs.
2. Sectoriser le `related-links` : mettre `/services/integration-claude` et `/services/agents-ia` en avant (la page vend l'IA de production), + un cas-usage « centraliser données / standardiser processus ».
3. Corriger la grille de cas (bug transverse) : afficher l'état « cas en préparation » plutôt que 3 cas hors-métier tant qu'aucun cas cabinet n'existe.
4. Raccourcir le `<title>`. Prioriser un premier cas cabinet comptable → réindexation (page la plus prête).
