---
route: /cas-clients/
verdict: AMÉLIORER
title_actuel: "Cas clients · pipelines reconnectés, opérations fluidifiées · Waimia"
kw_cible: "cas clients agence IA / réalisations agence web IA"
date: 2026-07-16
---

# /cas-clients/ (hub) — AMÉLIORER

Source : `src/pages/cas-clients/index.astro`. Rendu non composable (page bespoke : `HeroCentered` + `CaseFeaturedGrid` + `CaseSpotlight` + `CtaFinal`).

## 1. Identité
- **Title** (`index.astro:181`) : « Cas clients · pipelines reconnectés, opérations fluidifiées · Waimia » — bon, kw-first, descriptif.
- **Description** : « Pas de marketing. Des chiffres, des problèmes, ce qu'on a câblé. Ce qui a tenu. » — voix OK mais 0 kw ; ne cite ni « cas clients » ni le bénéfice recherché.
- **Intention** : navigationnelle + preuve (« cas clients agence IA », « réalisations »). Rôle : hub du silo preuve, listé nav principale.
- Croisé `docs/strategy/14:101` : « garder ; desangles = meilleur cas SEO local ; isabelle-diaz : chiffres quand dispo ».

## 2. Contenu
- 5 cartes réelles (Les Carnets, Balzeo, Amploi, Desangles, Isabelle Diaz), triées `card.order` 1→5. Voix anti-théâtre respectée.
- **Contradiction de promesse (E-E-A-T)** : le lede masthead (`index.astro:171`) affirme « Cinq cas réels, avec des résultats mesurés sur les données du client ». Or 2 des 5 n'ont **aucun résultat mesuré** : `amploi` (aucun `metrics`/`shifts`, cf rapport amploi) et `isabelle-diaz-naturopathe` (« Mission en cours », aucun chiffre). La promesse « résultats mesurés » sur-vend l'inventaire réel → risque de crédibilité.
- Kicker (`index.astro:166`) : « cinq cas réels, résultats mesurés » — même sur-promesse.

## 3. SEO on-page
- **H1 non kw-first (défaut doctrine V8.1)** : rendu = « Pas de marketing. Des chiffres. » (`index.astro:168`, vérifié HTML servi `<h1>Pas de marketing.Des chiffres.</h1>`). C'est un slogan de marque, 0 kw. Le kw « cas clients » n'apparaît que dans le kicker stylé, pas dans le H1.
- Hiérarchie Hn correcte sinon (sections avec h2).

## 4. Maillage interne
- Sortants : 5 fiches cas (grid + spotlight vers `/cas-clients/les-carnets-de-montpellier`). CTA → `/contact`.
- **Manque** : aucun pont hub → services/secteurs (« ces cas relèvent de tel système / tel secteur »). Le hub ne route que vers ses enfants.
- Entrants : nav principale + secteurs (`caseRef`). OK.

## 5. Balisage
- Vérifié HTML servi : `BreadcrumbList` + `CollectionPage` + `ItemList` (7 `ListItem`) + `Organization` + `WebSite`. Conforme et pertinent pour un hub.
- Canonical implicite OK. Pas de défaut relevé.

## 6. Conversion
- CTA final `index.astro:110` : « Récupérer mon pipeline → » vers `/contact`. **Tonalité inadaptée** : « récupérer mon pipeline » est un vocabulaire B2B-acquisition, alors que la grille de cas couvre e-commerce, artisan, naturopathe, média local. Un visiteur artisan/naturopathe ne se reconnaît pas dans « pipeline ».
- Pricing : néant (normal pour un hub).

## 7. Verdict + actions
**AMÉLIORER.**
1. Réécrire le H1 en kw-first (ex. « Cas clients : des résultats mesurés, pas du marketing. ») pour porter le kw « cas clients » hors du seul kicker. Fichier `index.astro:168` (`h1_fr`).
2. Corriger la sur-promesse « résultats mesurés » du lede + kicker (`index.astro:166` et `:171`) : reformuler en « cinq cas réels, résultats mesurés quand ils le sont » (ou équivalent) pour couvrir amploi (livraison) et isabelle (en cours) sans mentir. Aligner sur la règle affichée « pas de résultat annoncé avant d'être mesuré ».
3. Neutraliser le CTA sur-typé B2B `index.astro:110` (`cta_primary.label_fr`) : libellé générique (« Parler de votre projet → ») cohérent avec la diversité des cas.
4. Ajouter un pont hub → système/secteur (bande de liens vers `/services/*` et `/secteurs/*` par famille) pour irriguer les silos solution depuis la preuve.
5. (Doctrine) confirmer que le sous-arbre `/cas-clients/resultats/*` reste bien en 301 (`astro.config.mjs:183-192`) — vérifié présent, ne pas réintroduire de pages sous ce préfixe.
