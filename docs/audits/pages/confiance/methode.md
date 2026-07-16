---
route: /agence/methode
verdict: VALIDER
title_actuel: "Notre méthode · Process Intelligence · Waimia"
kw_cible: "méthode / process intelligence (support E-E-A-T, pas money)"
date: 2026-07-16
---

# /agence/methode · agence/methode.astro

## 1. Identité

- Fichier : `src/pages/agence/methode.astro` (231 lignes, `UtilityTemplate` + composants catalogués SpecBar/Timeline/MetricCalloutBand, `:87-150`).
- Title : `Notre méthode · Process Intelligence · Waimia` (`:88`). Description conforme voix (`:89`).
- kw cible : intention info « comment vous travaillez ». Pas un money-kw ; rôle support E-E-A-T. Indexée (`index, follow` vérifié HTML servi) : listée « restent indexées » dans `docs/strategy/14 §4`.
- Rôle : preuve de méthode (les 5 phases), nourrit la confiance avant conversion.

## 2. Contenu

- Substance réelle : 5 phases détaillées (`:13-39`), cadence chiffrée (`:48-58`), 3 garanties (`:118-131`), encart VirtuoseOS (`:135-144`). Chiffres tirés de `proof-points.ts` (`:62-64`), zéro invention.
- Voix conforme : « Si ça ne mesure rien, ça n'existe pas », « vous pouvez nous virer » (`:32`, `:37`, `:125`).
- Point de vigilance E-E-A-T : « Cinq ans à câbler des systèmes IA » (`:139`) : à garder cohérent avec le reste du site (Simon-Beros mdx = « 2024-présent » pour Waimia + VirtuoseWeb antérieur). L'affirmation « cinq ans » repose sur l'antériorité VirtuoseWeb, à ne pas contredire ailleurs.
- Doublon partiel des 5 phases avec `/agence` (`method-timeline`) : acceptable (hub résume, méthode détaille + schema HowTo).

## 3. SEO on-page

- H1 « Cinq phases. Pas de diaporama. » (`:94`) : conforme doctrine (pas de « système X »).
- Hiérarchie propre (H1 + H2 sections + `sr-only` pour phases `:107`).

## 4. Maillage interne

- Entrant : ~12 références `/agence/methode` (dont /agence, about, CTA secondaires). Bon ancrage.
- Sortant : CTA canonique via `UtilityTemplate showCta` → `/contact`. Peu de ponts vers les services : un lien vers `/services/integration-claude` (la méthode appliquée) renforcerait le maillage.

## 5. Balisage

- **JSON-LD HowTo** présent (`buildHowTo`, `:79-85`) : excellent pour GEO/AIO (les 5 étapes deviennent citables). Point fort de la page.
- Breadcrumb + canonical hérités.

## 6. Conversion

- CTA final canonique via template (dédup W5, `:146-147`). Conforme.

## 7. Verdict + actions

**VALIDER.** Page de méthode substantielle, HowTo schema, chiffres sourcés, voix impeccable. Modèle de référence pour une page support E-E-A-T.

1. Ajouter 1-2 liens sortants descriptifs vers un pilier money (`/services/integration-claude`) : « la méthode appliquée à un déploiement Claude ».
2. Vérifier la cohérence transverse de « cinq ans » (`:139`) avec les autres pages (mdx Simon, /agence) pour ne pas exposer une contradiction d'ancienneté.
3. Aucune correction bloquante.
