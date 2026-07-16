---
route: /ressources/outils/score-maturite-ia
verdict: AMÉLIORER
title_actuel: "Score de maturité IA · Outils Waimia"
kw_cible: test de maturité IA
date: 2026-07-16
---

# /ressources/outils/score-maturite-ia

## 1. Identité
- Title : « Score de maturité IA · Outils Waimia ». Kw cible `strategy/14` §2 : « test de maturité IA », note « title qualifié · **reçoit le canonical du cluster maturité** », P2.
- H1 servi : « Score de maturité IA ».
- Rôle : outil instantané no-email, pièce centrale du **cluster maturité** (avec `diagnostics/maturite-ia` et `academy`). Doit recevoir le canonical du cluster.

## 2. Contenu
- **Même défaut critique que `calculateur-roi-ia`. Outil non rendu.** Le MDX définit 3 `inputs` (outils IA, données, équipe), un `output` (`scoreMaturite = outilsIa + donnees + equipe`, sur 9) et un `apiSlug` (`src/content/outils/score-maturite-ia.mdx:9-72`). Mais le template `[...slug].astro` (EssayTemplate) ne rend que la prose. Le corps promet explicitement « **trois questions, un résultat immédiat à l'écran, sans email** » et « le score additionne ces trois dimensions » (`:80-82`), or **aucun champ n'est affiché** : le HTML servi ne contient que les 2 inputs du footer newsletter. Promesse « à l'écran » démentie par le rendu.
- Aggrave le cluster maturité : `academy` (`academy.astro:20`) et `diagnostics/maturite-ia` renvoient vers cette page « pour un chiffre tout de suite sans email » → le point d'arrivée du funnel maturité est un cul-de-sac (pas de calcul possible).

## 3. SEO on-page
- Title générique « · Outils Waimia » à requalifier. Contenu mince (2 paragraphes). Doit porter le `canonical` du cluster maturité (aujourd'hui absent).

## 4. Maillage interne
- `relatedPages: []` mais le corps renvoie bien `academy` (`:88`, frontière propre : score instantané vs scorecard email humain). Devrait aussi être la cible canonical de `diagnostics/maturite-ia`.

## 5. Balisage
- `Article` + `BreadcrumbList` + `WebPage` + `Person` + `ImageObject`. Balisé article, pas outil (cohérent avec l'absence de widget).

## 6. Conversion
- **Funnel cassé** : c'est le tool censé donner « le chiffre tout de suite » vers lequel academy et le diagnostic maturité pointent, mais il ne calcule rien. Impact conversion direct sur tout le cluster maturité. Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER** (défaut fonctionnel majeur + noeud du cluster maturité).
1. Rendre le score interactif (widget consommant `inputs`/`formula`/`output` du MDX), OU router vers un template outil dédié. Pourquoi : la page promet un « résultat immédiat à l'écran » inexistant ; elle est le point d'arrivée du funnel maturité (academy + diagnostic pointent ici).
2. Poser le `canonical` du cluster maturité sur cette page et requalifier le title (retirer « · Outils Waimia »). Pourquoi : `strategy/14` §2 P2 (dédoublonner « maturité IA »).
3. Renseigner `relatedPages` (cluster maturité + une money page). Pourquoi : maillage.
4. Après correction, JSON-LD `WebApplication`. Pourquoi : décrire un vrai outil.
