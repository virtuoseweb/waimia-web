---
route: /partenaires
verdict: FUSIONNER
title_actuel: "Partenaires technologiques · L'écosystème que Waimia intègre"
kw_cible: "aucun (noindex, dupe de /technologies)"
date: 2026-07-16
---

# /partenaires · partenaires.astro

## 1. Identité

- Fichier : `src/pages/partenaires.astro` (297 lignes, `UtilityTemplate` + markup strates inline `:112-139`).
- Title : `Partenaires technologiques · L'écosystème que Waimia intègre` (`:88`).
- kw cible : **aucun**. Page **noindex** (`:91`, vérifié HTML servi `noindex, follow`) + hors sitemap (`sitemap-noindex-exclude.ts:79` « partenaires (dupe /technologies) »).
- Rôle : redondant avec `/technologies`. Décision de fusion déjà actée (`docs/strategy/14 §4`).

## 2. Contenu

- Cadrage honnête (aucun partenariat inventé, `:8`, `:104`), mais contenu quasi identique à `/technologies` : mêmes 5 strates, mêmes CMS/CRM/Google. La seule vraie valeur ajoutée : Google Business Profile détaillé (`:80`) et le lien Anthropic → `/services/integration-claude` (`:29`).
- Duplication de contenu inter-pages = risque de dilution évité justement par le noindex actuel.

## 3. SEO on-page

- H1 « L'écosystème que nous intégrons. » (`:94`) : correct mais sans valeur (noindex).
- `CollectionPage` JSON-LD (`:10-16`) superflu sur page noindex.

## 4. Maillage interne

- **Problème maillage** : `/partenaires` (noindex) est encore listée dans le **mega-menu** (`src/data/mega-menu.ts:852`), juste au-dessus de `/technologies` (`:860`). La navigation grand public pointe vers une page noindex vouée à disparaître → à retirer.
- Entrant : ~4 références.
- Sortant : `/services/integration-claude` (`:29`).

## 5. Balisage

- Markup strates 100 % inline (`:112-139`) : dette d'orphelin, sans importance (la page part).

## 6. Conversion

- Encart INK « on ne vous enferme dans aucun » (`:144`). Pas de CTA de conversion propre.

## 7. Verdict + actions

**FUSIONNER → /technologies.** Doublon noindex ; décision stratégique déjà prise. À neutraliser + nettoyer la nav.

1. **Récupérer les éléments uniques** avant suppression : Google Business Profile (`:80`) et le lien Anthropic → `/services/integration-claude` (`:29`) à porter dans `/technologies`.
2. **Retirer `/partenaires` du mega-menu** (`src/data/mega-menu.ts:846-859`, section « Écosystème ») : ne garder que « Stack & technologies » → `/technologies`.
3. **301** `/partenaires` → `/technologies` (+ miroir EN).
4. Re-router les ~4 liens entrants restants vers `/technologies`, puis supprimer `partenaires.astro`.
