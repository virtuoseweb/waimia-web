---
route: /ressources/diagnostics/maturite-ia
verdict: AMÉLIORER
title_actuel: "Diagnostic de maturité IA · les 5 niveaux et où vous en êtes"
kw_cible: niveaux de maturité IA
date: 2026-07-16
---

# /ressources/diagnostics/maturite-ia (contenu maturité)

## 1. Identité
- Title : « Diagnostic de maturité IA · les 5 niveaux et où vous en êtes ». Kw cible `strategy/14` §2 : « niveaux de maturité IA », note « devient l'intro contenu qui pointe l'outil (dédoublonner « maturité IA ») », P2.
- H1 servi : « Diagnostic de maturité IA. »
- Rôle : intro contenu du **cluster maturité** à 3 pages (voir §2).

## 2. Contenu
- **Cannibalisation cluster maturité (enjeu principal)** : trois pages se disputent « maturité IA » :
  1. `/ressources/diagnostics/maturite-ia` (cette page, contenu) ;
  2. `/ressources/outils/score-maturite-ia` (outil instantané, kw « test de maturité IA ») ;
  3. `/ressources/academy` (diagnostic email, « diagnostic IA gratuit »).
  Plan `strategy/14` : cette page = intro contenu qui **pointe l'outil**, `score-maturite-ia` reçoit le **canonical du cluster maturité**. À exécuter (aujourd'hui les deux sont `index, follow` sans canonical croisé).
- Contenu correct (grille 5 niveaux, dimensions). **Squelette templaté** identique aux 3 autres diagnostics (cf `diagnostic-claude-pme.md`).

## 3. SEO on-page
- H1/title kw-first. Densité « maturité IA » à arbitrer avec `score-maturite-ia` pour éviter que les deux visent le même exact-match.

## 4. Maillage interne
- Doit pointer explicitement `score-maturite-ia` (l'outil) et `academy` (le diagnostic email) pour organiser le cluster. Vérifier le lien sortant vers l'outil (aujourd'hui pas garanti dans le corps).

## 5. Balisage
- `Article` + `FAQPage` + `BreadcrumbList` + `ImageObject`.
- **Bug transverse FAQPage dupliqué** : 16 `Question` + **2 blocs `FAQPage`** (8 ×2). Cf `guide-claude-pme.md` action 1.
- Pas de `<table>` pour la grille des 5 niveaux (prose) → extractibilité GEO perfectible.

## 6. Conversion
- Contenu → CTA audit. Pas de quiz interactif (contenu, pas formulaire). Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. Exécuter la consolidation cluster maturité : poser un `canonical` de ce contenu vers `/ressources/outils/score-maturite-ia` (ou l'inverse selon la décision Simon), et faire de cette page l'intro qui pointe l'outil. Pourquoi : 3 pages sur « maturité IA » se cannibalisent (`strategy/14` §2 P2).
2. Ajouter dans le corps les liens vers `score-maturite-ia` (outil) et `academy` (diagnostic email). Pourquoi : matérialiser la hiérarchie du cluster.
3. Convertir la grille des 5 niveaux en `<table>`. Pourquoi : extractibilité GEO.
4. Corriger le FAQPage dupliqué (transverse). Différencier l'ossature vs les autres diagnostics.
