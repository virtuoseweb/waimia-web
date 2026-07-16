---
route: /ressources
verdict: AMÉLIORER
title_actuel: "Ressources · Cas, blog, cookbooks, outils · Waimia"
kw_cible: ressources IA PME
date: 2026-07-16
---

# /ressources (hub éditorial)

## 1. Identité
- Title : « Ressources · Cas, blog, cookbooks, outils · Waimia ». Kw cible `strategy/14` §2 : « ressources IA PME » (note « ok · garder », P3). Le kw n'est pas dans le title ; « cookbooks » = jargon anglais.
- H1 servi : « Tout ce qu'on publie. » (marque, pas kw ; acceptable pour un hub, cf doctrine `strategy/10 §0bis`).
- Rôle : porte d'entrée du silo Ressources (blog, outils, cas, comparatifs, diagnostics, guides, academy).

## 2. Contenu
- **Promesse ≠ réalité (défaut majeur)** : le masthead lede promet « cookbooks de méthodes, notes de terrain » (`src/pages/ressources/index.astro:225`), le title promet « cookbooks » et « TCO/ROI/AI Act » (`:241-242`), et l'intro de la grille affirme « **Six formats**, des compteurs réels. Rien d'inventé : ce que vous voyez est ce qui existe. » (`:111`). Or le code ne construit que **2 catégories** (blog + outils, `:78-101`, les livres-blancs/cookbooks/field-notes/veille supprimés `:74`). La page dit « six formats » et en affiche deux : contradiction interne + promesse creuse (AI-tell contraire à la voix anti-théâtre).
- Voix globalement conforme ailleurs (bande de preuve chiffrée sur compteurs réels, `:169-181`).

## 3. SEO on-page
- Title à requalifier sur « ressources IA PME », retirer « cookbooks » (jargon EN).
- Corriger l'intro « Six formats » → nombre réel de catégories affichées.

## 4. Maillage interne
- **Sous-linkage du propre silo** : la grille de formats ne pointe que vers `/blog` et `/ressources/outils` (`:85,94`). Les hubs enfants **comparatifs, diagnostics, guides, academy** ne sont atteignables que par le méga-menu, pas depuis le corps du hub. Les cas clients, eux, sont listés (`:264-287`). Ajouter des entrées comparatifs/diagnostics/guides/academy dans la grille (ou une seconde rangée) pour irriguer le silo.
- CTA final vers `/contact` et `/services` (`:235-236`).

## 5. Balisage
- `CollectionPage` + `ItemList` + `WebSite` + `Organization` ✅. Canonical ✅. `index, follow` cohérent.

## 6. Conversion
- 2 formulaires réels (newsletter `/api/newsletter`, `:302` ; pas de pricing → normal pour un hub). CTA audit gratuit vers `/contact`.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. `src/pages/ressources/index.astro:111` : remplacer « Six formats » par le compte réel de catégories rendues (aujourd'hui 2). Pourquoi : la page s'auto-contredit et viole la voix « rien d'inventé ».
2. `:225` + `:241-242` : retirer « cookbooks » (jargon EN) et « notes de terrain » du lede/title/description tant que ces formats n'existent pas ; requalifier le title sur « ressources IA PME ». Pourquoi : cohérence promesse/contenu + kw cible.
3. `:78-101` : ajouter dans la grille (ou une rangée dédiée) des cards vers `/ressources/comparatifs`, `/ressources/diagnostics`, `/ressources/guides`, `/ressources/academy`. Pourquoi : le hub n'irrigue pas ses propres enfants indexés depuis le corps de page (maillage interne faible).
