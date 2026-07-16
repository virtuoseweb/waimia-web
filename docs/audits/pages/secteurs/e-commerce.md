---
route: /secteurs/e-commerce
verdict: AMÉLIORER
title_actuel: "Site web et IA pour e-commerce : convertir au lieu de subir les paniers abandonnés · Waimia"
kw_cible: "site web IA e-commerce / IA pour boutique en ligne"
date: 2026-07-16
---

# Audit · /secteurs/e-commerce

## 1. Identité
- Route rendue par `src/pages/secteurs/[...slug].astro`, contenu `src/content/secteurs/e-commerce.mdx`. **Indexée** (`e-commerce.mdx:432-433` `noindex:false`), confirmé served (`robots: index, follow`).
- kw cible : « site web IA e-commerce », intention commerciale (le marchand cherche à convertir/refondre). Bien aligné au H1.
- Rôle : c'est la MEILLEURE page du silo (index légitime, cas réel `balzeo`, 3 metricsHero distincts et sourcés). Page de référence.

## 2. Contenu
- Prose 258 mots, 4 pains réellement e-commerce (panier, vitesse mobile, aveuglement conversion, trafic IA). Substance sectorielle réelle, pas un find-replace.
- metricsHero uniques et forts : Baymard ~70 % paniers, McKinsey +10-25 % conv, Adobe +693 % trafic IA. Aucun clonage 6sense. Bon.
- Cas `balzeo` (e-commerce écoresponsable) cité dans la prose (`e-commerce.mdx:469`) : vraie preuve E-E-A-T sectorielle.

## 3. SEO on-page
- H1 = title long kw-first (« Site web et IA pour e-commerce : … »). Doctrine V8.1 respectée (0 « système X »). 10 H2, hiérarchie propre.
- Title dupliqué avec le H1 à l'identique + 2ᵉ clause « convertir au lieu de subir… » : le title dépasse ~70 car, la queue sera tronquée en SERP. À raccourcir côté `<title>` (garder « Site web et IA pour e-commerce · Waimia ») tout en gardant le H1 long.

## 4. Maillage
- **Défaut partagé (mesh identique 12×)** : `related-links` rend les MÊMES 4 groupes que tous les secteurs (`src/lib/internal-mesh.ts:316-351` ignore le slug). Aucun lien e-commerce-spécifique (ex. vers `/services/site-web-ia`, `/cas-clients/balzeo`, un cas-usage panier). À sectoriser.
- **Défaut partagé (grille de cas cassée)** : la grille injectée montre Carnets/Balzeo/Amploi (3 cas de plus bas `card.order`), pas « les cas du secteur ». Ici Balzeo apparaît par chance (order 2), mais le tri n'est pas sectoriel : `src/lib/sector-cases.ts:26` matche `facets.sector` absent des cas. Balzeo devrait être en tête et unique-secteur.

## 5. Balisage
- JSON-LD `Article` + `FAQPage` + breadcrumb (served). L'Article convient au GEO, mais une page d'offre par secteur gagnerait un `Service`/`WebPage`. Canonical correct `https://waimia.com/secteurs/e-commerce`.

## 6. Conversion
- CTA « Cadrer ma boutique → » vers `/contact` (hero + footer-cta-band). Cohérent. Pas de pricing (renvoi devis), conforme. Pas de lien Cal `simonberos/audit` direct, le silo entier pointe `/contact`, à harmoniser globalement si besoin.

## 7. Verdict + actions
**AMÉLIORER** (garder indexée, page pilote du silo).
1. Raccourcir le `<title>` à « Site web et IA pour e-commerce · Waimia » (conserver le H1 long) pour éviter la troncature SERP.
2. Corriger la grille de cas (bug transverse `sector-cases.ts:26`) pour que Balzeo soit priorisé et non noyé derrière Carnets/Amploi ; à défaut de `facets.sector`, mapper `sector_fr`→slug comme le fait déjà `internal-mesh.ts:395`.
3. Sectoriser le `related-links` : ajouter une variante e-commerce (lien `/cas-clients/balzeo`, `/services/site-web-ia`, un cas-usage conversion).
4. Ajouter 1-2 metricsHero encore plus e-commerce si dispo (ex. vitesse mobile→SEO), sinon garder : déjà le meilleur set du silo.
