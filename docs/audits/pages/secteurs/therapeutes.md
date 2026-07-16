---
route: /secteurs/therapeutes
verdict: AMÉLIORER
title_actuel: "Site web et IA pour thérapeutes et praticiens bien-être : être trouvé sans dépendre des plateformes · Waimia"
kw_cible: "site web thérapeute / praticien bien-être"
date: 2026-07-16
---

# Audit · /secteurs/therapeutes

## 1. Identité
- Contenu `src/content/secteurs/therapeutes.mdx`. **noindex** (`:1094-1095`).
- kw cible : « site web thérapeute / praticien bien-être ». Intention locale, solo santé/bien-être. Aligné.
- Rôle : demande-capture. Comme batiment, possède un cas client réel non branché : `isabelle-diaz-naturopathe` (`src/content/cases/isabelle-diaz-naturopathe.mdx:10` `sector_fr: "Santé et bien-être"`).

## 2. Contenu
- **Page la plus mince du silo : prose 153 mots, 3 pains seulement, 1 seul metricsHero** (Clickzou 2,8×). C'est le minimum syndical. Pour une requête locale concurrentielle, c'est trop léger même en GEO.
- Pains corrects (visibilité louée aux plateformes, site qui ne rassure pas, créneaux vides) mais 3 seulement, et fortement recoupés avec liberal-independant (dépendance plateformes, solo, visibilité locale).
- **Miss E-E-A-T :** Isabelle Diaz (naturopathe, cas réel bien-être) n'est PAS surfacée (bug grille transverse). Le seul cas santé/bien-être du portfolio n'apparaît pas sur la page thérapeutes.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». Title long → raccourcir.
- 1 seul metricsHero → le `metric-callout-band` est sous-alimenté (le schéma en accepte 3). Diversifier.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien thérapeute ni vers `/cas-clients/isabelle-diaz-naturopathe`), grille de cas cassée.

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex correct pour l'instant (mais le cas existe, non branché).

## 6. Conversion
- CTA « Cadrer ma visibilité → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (candidat index après branchement du cas + enrichissement).
1. **Brancher `isabelle-diaz-naturopathe`** via la correction de la grille (bug transverse `sector-cases.ts:26`), puis ajouter `caseRef: isabelle-diaz-naturopathe` et envisager `noindex:false` (index ⟺ cas réel cohérent).
2. **Enrichir : la page est trop mince** (153 mots, 3 pains, 1 métrique). Ajouter un 4ᵉ pain, 1-2 metricsHero (SEO local santé, avis, prise de RDV), porter la prose à ~280 mots. Sinon la page reste sous le seuil de crédibilité.
3. Départager le chevauchement avec liberal-independant : thérapeutes = santé/bien-être + RDV local ; liberal = expertise/droit/média. Verrouiller l'angle « prise de RDV + confiance patient » propre aux thérapeutes.
4. Sectoriser le `related-links`, raccourcir le `<title>`.
