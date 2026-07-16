---
route: /agence/about
verdict: FUSIONNER
title_actuel: "Le Studio · Pourquoi Waimia · Architecte de systèmes agentiques"
kw_cible: "aucun (noindex, quasi-dupe de /agence)"
date: 2026-07-16
---

# /agence/about · agence/about.astro

## 1. Identité

- Fichier : `src/pages/agence/about.astro` (386 lignes, bespoke `UtilityTemplate` + markup inline, `:23-136`).
- Title : `Le Studio · Pourquoi Waimia · Architecte de systèmes agentiques`. Description quasi identique à /agence.
- kw cible : **aucun**. Page **noindex** (`about.astro:27`, vérifié HTML servi `noindex, follow`) + hors sitemap (`sitemap-noindex-exclude.ts:79` « about (quasi-dupe /agence) »).
- Rôle : redondant avec `/agence`. Décision déjà actée en stratégie (`docs/strategy/14 §4` : « /agence/about (quasi-dupe de /agence) → noindex + hors sitemap »).

## 2. Contenu

- Recouvrement quasi total avec `/agence` : origine « frustration de chantier » (`:42-43` vs agence `:166-169`), « Ce que nous refusons » (`:48-54` vs agence manifeste `:46`), « un humain derrière chaque mission » (`:82-84` vs agence `:168`).
- Éléments UNIQUES à préserver avant suppression : le `dl` « Faits clés » (`:92-100` : Forme, Fondateur, Ancrage, Périmètre, Partenariats, Langues) et les « Quatre livrables » (`:59-80`). Ce sont des blocs E-E-A-T denses absents de /agence.

## 3. SEO on-page

- H1 « Un studio IA solo. Francophone, par choix. » (`:30`) : bon, mais sans valeur SEO (noindex).
- `AboutPage` + `Person` JSON-LD présents (`:9-21`) : correct, mais inutile sur une page noindex.

## 4. Maillage interne

- Entrant : ~8 références `/agence/about` dans `src`. **Problème** : des pages pointent vers une page noindex à replier. Ces liens doivent être re-routés vers `/agence` au moment du 301.
- Sortant : `/contact` (`:131`), `/agence/methode` (`:132`).

## 5. Balisage

- `AboutPage`/`Person` OK mais superflu. Markup 100 % inline (pas de composant catalogué) : dette d'orphelin, mais sans importance puisque la page part.

## 6. Conversion

- CTA « Démarrer un diagnostic » → `/contact` (`:131`). Identique à /agence.

## 7. Verdict + actions

**FUSIONNER → /agence.** Page noindex, quasi-dupe, décision stratégique déjà prise. À neutraliser proprement.

1. **Migrer vers /agence les 2 blocs uniques** : le `dl` « Faits clés » (`about.astro:92-100`) et « Quatre livrables » (`:59-80`), sous forme de sections cataloguées (jamais markup inline, règle anti-orphelin).
2. **301** `/agence/about` → `/agence` (et `/en/agence/about` → `/en/agence`).
3. **Re-router les ~8 liens entrants** `/agence/about` vers `/agence` (grep `rg -l "/agence/about" src`), notamment depuis le footer / mega-menu s'il y figure.
4. Supprimer le fichier `about.astro` une fois le contenu migré et les liens re-routés.
