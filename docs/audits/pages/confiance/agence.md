---
route: /agence
verdict: AMÉLIORER
title_actuel: "L'Agence · Waimia · Architectes de systèmes agentiques"
kw_cible: "agence IA / studio IA PME (rôle confiance, pas money page)"
date: 2026-07-16
---

# /agence · agence/index.astro

## 1. Identité

- Fichier : `src/pages/agence/index.astro` (215 lignes, 100 % composable via `SectionsRenderer`, 9 sections cataloguées, `:21-201`).
- Title : `L'Agence · Waimia · Architectes de systèmes agentiques`. Description : « Studio IA solo à Montpellier. Méthode Process Intelligence... » (`:206-207`).
- kw cible : pas de money-kw ciblé (page de confiance / hub agence). Intention : « qui est Waimia, à qui je parle ».
- Rôle silo : pilier confiance / posture. Tête du sous-arbre `/agence/*`. Indexée (`index, follow` vérifié HTML servi).

## 2. Contenu

- Voix anti-théâtre respectée et forte : « On livre du code le mardi, on lit le pipeline le vendredi » (`:31`), « Pas de diaporama de comité ». Conforme au standard éditorial.
- E-E-A-T solide et VÉRIDIQUE : posture studio solo Simon Beros (`:168`), Montpellier, Anthropic, France Num activateur (`:147-150`, `:170-174`). P0.2-D a retiré les certifications non détenues (`:137-138`), bon réflexe.
- Doublon partiel assumé avec `/agence/methode` : la section `method-timeline` (5 phases, `:54-70`) reprend les mêmes 5 phases que la page méthode. Acceptable en logique hub → détail (la page méthode va plus loin : garanties, VirtuoseOS, schema HowTo).
- Recouvrement fort avec `/agence/about` (origine « frustration de chantier », refus du théâtre IA, faits clés). Voir report `about.md` : about est la quasi-dupe à replier ici.

## 3. SEO on-page

- H1 servi : « Un studio solo. Une posture. » (`:29`). Conforme doctrine V8.1 (jamais « système X » en H1). Zéro kw commercial, ce qui est acceptable pour un hub confiance.
- Title « Architectes de systèmes agentiques » : (a) **« Architectes » au pluriel contredit la posture studio SOLO** martelée dans le corps ; (b) « systèmes agentiques » = jargon peu recherché. Incohérence de surface à corriger.
- Hiérarchie Hn cohérente (H1 unique hero, H2 par section via registry).

## 4. Maillage interne

- Entrant : ~8 références `/agence` dans `src` (mega-menu, footer, CTA d'autres pages confiance). Bon ancrage.
- Sortant : `/contact` (`:113`, `:196`), `/agence/methode` (`:197`). Peu de ponts vers les money pages (`/services/*`) : une agence bien maillée devrait renvoyer vers 2-3 piliers (site-web-ia, integration-claude). À ajouter.

## 5. Balisage

- OpenGraph + canonical hérités de `Base.astro`. Breadcrumb via `MastheadBar` (`:209-212`).
- Pas de JSON-LD spécifique (`Organization`/`AboutPage`) sur cette page : le socle global suffit, mais un `AboutPage` explicite renforcerait la lecture entité (about.astro en a un, cette page non).

## 6. Conversion

- CTA primaire cohérent : « Démarrer un diagnostic » → `/contact` (`:196`), CTA final ink, réassurance « diagnostic gratuit, sans engagement, réponse sous 24h » (`:198`). Conforme.

## 7. Verdict + actions

**AMÉLIORER.** Page-modèle de la posture studio, contenu au niveau, E-E-A-T véridique. Corrections mineures.

1. **Title** : remplacer « Architectes de systèmes agentiques » (pluriel + jargon) par une formule cohérente solo et lisible, p. ex. « L'Agence · Studio IA solo à Montpellier · Waimia ».
2. **Maillage sortant** : ajouter dans une section existante 2-3 liens descriptifs vers les piliers money (`/services/site-web-ia`, `/services/integration-claude`) pour que la confiance irrigue la conversion.
3. **Absorber /agence/about** : replier les éléments uniques de about (le `dl` « Faits clés » : forme, SIREN via mentions, langues) puis 301 about → /agence (cf `about.md`).
4. Optionnel : ajouter un JSON-LD `AboutPage`/`Organization` explicite (parité avec about.astro `:9-21`).
