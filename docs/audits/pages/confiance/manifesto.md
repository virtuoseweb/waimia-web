---
route: /manifesto
verdict: AMÉLIORER
title_actuel: "Waimia · Manifeste · Construire du revenu, pas des démos"
kw_cible: "aucun (pièce de marque / brand piece)"
date: 2026-07-16
---

# /manifesto · manifesto.astro

## 1. Identité

- Fichier : `src/pages/manifesto.astro` (443 lignes, bespoke : LiquidHero React island + organisms manuels, `:90-304`).
- Title : `Waimia · Manifeste · Construire du revenu, pas des démos` (`:82`). Indexée (`index, follow`), listée « restent indexées » `docs/strategy/14 §4`.
- kw cible : **aucun** (pièce de marque, mémorisation/GEO). Ne cible pas d'intention commerciale, et c'est assumé.
- Rôle : signature éditoriale, preuve de posture, la page la plus maillée du silo (25 liens entrants).

## 2. Contenu

- Éditorial fort, voix conforme (« Build revenue, not demos »), 5 actes rythmés, cas clients réels via collection `cases` (`:36-38`).
- **DÉRIVE DE POSITIONNEMENT vs doctrine studio-solo** (contradiction E-E-A-T à corriger) :
  - kicker hero : « Une agence IA » (`:104`) alors que la doctrine véridique = studio SOLO, pas agence (`docs/strategy/02 §0` : « identité véridique studio/cabinet solo... pas d'agence »).
  - « 6 services · in-house » + « Une équipe qui livre » (`:193`, `:204`) : « équipe » contredit le solo martelé partout ailleurs (about, simon-beros, agence).
  - Ces formulations datent d'un port legacy (`:2` « port de virtuoseweb/waimia DirectionB »). À réaligner sur « studio solo ».
- Marquee « logos clients massifs » (`:9`, `:144-152`) : la donnée réelle `CLIENT_LOGOS` (`src/data/sitemap.ts:477`) est une liste d'OUTILS (Claude, HubSpot, Notion, Make, Stripe...), pas des clients. Le libellé interne « logos clients » est trompeur ; en plus l'Acte IV affirme « Pas de logos pour faire joli » (`:257`). Tension à lever (assumer « stack » plutôt que « clients »).

## 3. SEO on-page

- H1 « Construire du revenu, pas des démos » (`:106-112`) : conforme (pas de « système X »).
- Page à H1/H2 massifs bespoke, riche. Peu de kw ciblé, cohérent avec son statut de brand piece.

## 4. Maillage interne

- Entrant : ~25 (le plus lié du silo). Fort.
- Sortant : `/expertise-claude` labellisé « La plateforme » / « VirtuoseOS · le noyau » (`:131`, `:240`) : **mislabel**. expertise-claude est une page d'AUTORITÉ Claude, pas « la plateforme VirtuoseOS ». Le lien envoie une attente que la cible ne remplit pas. Cas clients → `/cas-clients/*` (`:269`). Blog via `/blog` générique (`:290`, ancres non descriptives).

## 5. Balisage

- `Article` JSON-LD (`buildArticle`, `:49-54`, `:86`). Correct pour un manifeste.

## 6. Conversion

- CTA final canonique `CtaFinal` (Acte V, `:304`) → `/contact` + mailto `bonjour@waimia.fr` (`:71-73`). Vérifier cohérence de l'adresse email de marque (`waimia.fr` vs domaine `waimia.com`).

## 7. Verdict + actions

**AMÉLIORER.** Vitrine éditoriale forte mais désalignée sur le positionnement studio-solo actuel.

1. **Réaligner le vocabulaire sur « studio solo »** : remplacer « Une agence IA » (`:104`), « Une équipe qui livre » (`:204`) et l'esprit « 6 services in-house » par la posture solo véridique (cohérence E-E-A-T avec about/simon-beros/agence).
2. **Corriger le mislabel du lien** vers `/expertise-claude` (`:131`, `:240`) : ne plus l'appeler « La plateforme »/« VirtuoseOS ». Soit repointer vers une vraie page plateforme, soit renommer le libellé « Notre expertise Claude ».
3. **Clarifier le marquee** (`:144`) : l'assumer comme « stack / écosystème » et non « logos clients », pour lever la contradiction avec « pas de logos pour faire joli » (`:257`).
4. Vérifier l'adresse email de marque du CTA (`bonjour@waimia.fr` vs `.com`).
5. Remplacer les ancres génériques « /blog » (`:290`) par des liens d'articles descriptifs.
