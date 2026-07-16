---
route: /secteurs/liberal-independant
verdict: AMÉLIORER
title_actuel: "Site web et IA pour libéraux et indépendants : être trouvé et choisi avant le premier contact · Waimia"
kw_cible: "site web pour indépendant / libéral (avocat, consultant)"
date: 2026-07-16
---

# Audit · /secteurs/liberal-independant

## 1. Identité
- Contenu `src/content/secteurs/liberal-independant.mdx`. **Indexée** (`:826-827` `noindex:false`). Cas réel `caseRef: les-carnets-de-montpellier` (`:822`).
- kw cible : « site web pour indépendant / libéral ». Intention commerciale d'un solo (avocat, consultant, expert, créateur). Aligné.
- Rôle : 2ᵉ page indexée légitime du silo (avec e-commerce). Cas réel = E-E-A-T présent.

## 2. Contenu
- Prose 234 mots, 4 pains distincts (décision en amont, dépendance plateformes, effondrement trafic média, pas de temps marketing). metricsHero forts et variés : CNB 59 %, 8,3× SEO, Reuters -33 % trafic média.
- Substance réelle, mais **chevauchement d'ICP** : `icp_fr` = « conseil, droit, média, expertise » (`:777`). Le « conseil » recoupe `/secteurs/conseil` et le « média/expertise » recoupe le cas Carnets. Risque de cannibalisation sur les requêtes « consultant » avec `/secteurs/conseil` (firms), à départager par le nombre : liberal = solo (`icpSize 1-20`), conseil = cabinets (`1-100`).

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title = H1 long + `· Waimia`, très long → raccourcir le `<title>`.
- La prose cite un chiffre non porté en metricsHero (« 8,3× plus de trafic », « 3,2 à 7,8 % conversion » `:846-847`) : cohérent, sourcé.

## 4. Maillage
- **Défaut partagé (mesh identique 12×)** : aucun lien libéral-spécifique ni vers `/cas-clients/les-carnets-de-montpellier`. À sectoriser.
- **Défaut partagé (grille cassée)** : Carnets apparaît (order 1) donc en tête ici par chance, mais pas parce que le tri est sectoriel. Le cas propre du secteur est bien Carnets, la grille devrait le garantir, pas l'obtenir par hasard.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb (served). Canonical OK. Indexée à raison (cas réel + prose distincte).

## 6. Conversion
- CTA « Cadrer ma visibilité → » vers `/contact`. Cohérent. Pas de pricing.

## 7. Verdict + actions
**AMÉLIORER** (garder indexée).
1. Départager la cannibalisation avec `/secteurs/conseil` : recentrer liberal-independant sur le **solo/indépendant** (retirer « conseil » de l'ICP ou le qualifier « consultant indépendant » ≠ cabinet) ; réserver « cabinet de conseil » à `/secteurs/conseil`.
2. Sectoriser le `related-links` (lien `/cas-clients/les-carnets-de-montpellier`, `/services/seo-geo-contenu`, `/services/site-web-ia`).
3. Corriger la grille de cas (bug transverse) pour garantir Carnets en tête par matching secteur, pas par `card.order`.
4. Raccourcir le `<title>`.
