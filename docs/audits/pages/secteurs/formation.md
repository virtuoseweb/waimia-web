---
route: /secteurs/formation
verdict: AMÉLIORER
title_actuel: "Site web et IA pour les organismes de formation : remplir les sessions et produire sans s'épuiser · Waimia"
kw_cible: "site web organisme de formation / CFA (Qualiopi)"
date: 2026-07-16
---

# Audit · /secteurs/formation

## 1. Identité
- Contenu `src/content/secteurs/formation.mdx`. **noindex** (`:630-631`). Pas de `caseRef`.
- kw cible : « site web organisme de formation / CFA ». Intention commerciale (remplir sessions). Aligné, requête à volume réel.
- Rôle : demande-capture + GEO.

## 2. Contenu
- Prose 220 mots, 4 pains vraiment formation (sessions qui peinent, production des supports, invisible sur intentions formation, admin Qualiopi). Angle propre et différenciant : **Qualiopi** + une landing par programme. Substance réelle, faible risque de doublon.
- metricsHero : Education Dynamics 47 % (propre). 2ᵉ « métrique » = « Qualiopi » avec un label descriptif (`:624-626`) : ce n'est pas un chiffre, c'est un badge textuel dans un `metric-callout-band` conçu pour des valeurs. Rend un « KPI » bancal visuellement.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.
- « Qualiopi », « CFA », « edtech », « financement » = bons signaux de spécificité.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien formation ; devrait pousser `/services/seo-geo-contenu` et `/services/landing-pages-tunnels`, la page parle de landing par programme), grille de cas cassée.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex à raison. Réindexable après premier cas OF.

## 6. Conversion
- CTA « Cadrer mon remplissage → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (garder : Qualiopi = angle unique, page peu duplicative).
1. Remplacer le faux metricsHero « Qualiopi » (texte dans un band chiffré) par un vrai chiffre (taux de remplissage, coût d'acquisition/inscrit, part recherche en ligne) ; déplacer la mention Qualiopi dans la prose/FAQ où elle est déjà traitée.
2. Sectoriser le `related-links` (`/services/landing-pages-tunnels`, `/services/seo-geo-contenu`, cas-usage « générer plus de leads »).
3. Corriger la grille de cas (bug transverse) → état vide honnête.
4. Raccourcir le `<title>`.
