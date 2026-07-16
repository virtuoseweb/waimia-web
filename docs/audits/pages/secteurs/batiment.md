---
route: /secteurs/batiment
verdict: AMÉLIORER
title_actuel: "Site web et IA pour le bâtiment et les artisans : transformer les appels en devis signés · Waimia"
kw_cible: "site internet artisan / bâtiment (devis en ligne)"
date: 2026-07-16
---

# Audit · /secteurs/batiment

## 1. Identité
- Contenu `src/content/secteurs/batiment.mdx`. **noindex** (`:145-146` `noindex:true`), confirmé served (`robots: noindex, follow`).
- kw cible : « site internet artisan / bâtiment ». Intention locale + commerciale (TPE artisan qui veut plus de devis). Aligné, requête à volume réel.
- Rôle : demande-capture. MAIS c'est le secteur qui **possède déjà un cas client parfait non exploité** : `desangles-peinture` (`src/content/cases/desangles-peinture.mdx:10` `sector_fr: "Artisanat et bâtiment"`).

## 2. Contenu
- Prose 189 mots (courte), 3 pains bien artisans (appels non transformés, site qui ne rassure pas, pas le temps de rappeler). metricsHero distincts et sourcés : Clickzou 25-45 % devis signés, Batiweb 88 % avis. Substance sectorielle réelle.
- **Miss E-E-A-T majeur :** la page n'affiche PAS Desangles Peinture. À cause du bug transverse `src/lib/sector-cases.ts:26` (matching sur `facets.sector` absent des cas), la grille rend Carnets/Balzeo/Amploi, vérifié served (`CASE 01 Carnets / 02 Balzeo / 03 Amploi`). Le seul secteur avec une correspondance client-métier parfaite montre 3 cas hors-métier. C'est le cas d'école du bug.

## 3. SEO on-page
- H1 kw-first, 0 « système X ». 10 H2. Title long → raccourcir.
- Prose la plus courte du silo avec therapeutes : 189 mots. Pour une requête à concurrence locale forte, c'est mince même en noindex/GEO.

## 4. Maillage
- **Défauts partagés** : mesh identique 12× (aucun lien bâtiment ni vers `/cas-clients/desangles-peinture`), grille de cas cassée (cf ci-dessus).

## 5. Balisage
- `Article` + `FAQPage` + breadcrumb. noindex correct (pas de cas surfacé → règle caseRef respectée côté flag, MAIS le cas EXISTE, il n'est juste pas branché).

## 6. Conversion
- CTA « Cadrer mes demandes → » vers `/contact`. Cohérent.

## 7. Verdict + actions
**AMÉLIORER** (fort potentiel : c'est un candidat à l'**index** dès que son cas réel est branché).
1. **Corriger la grille de cas** (bug transverse `sector-cases.ts:26`) pour surfacer `desangles-peinture` sur cette page. C'est la correction à plus fort ROI du silo : elle transforme batiment d'un noindex générique en page indexable avec preuve client réelle.
2. Une fois Desangles branché, **repasser `noindex:false`** (règle strategy : index ⟺ caseRef réel cohérent ICP, ici il l'est) et ajouter `caseRef: desangles-peinture` au frontmatter.
3. Enrichir la prose (189→~280 mots) : ajouter un paragraphe local/SEO (avis Google, fiche GBP, rapidité de réponse chiffrée).
4. Sectoriser le `related-links` (lien `/cas-clients/desangles-peinture`, `/services/site-web-ia`, cas-usage devis/leads).
5. Raccourcir le `<title>`.
