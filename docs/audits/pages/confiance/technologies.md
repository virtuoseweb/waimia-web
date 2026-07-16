---
route: /technologies
verdict: AMÉLIORER
title_actuel: "Stack & technologies · Waimia"
kw_cible: "stack / technologies Waimia (support, kw faible)"
date: 2026-07-16
---

# /technologies · technologies.astro

## 1. Identité

- Fichier : `src/pages/technologies.astro` (281 lignes, `UtilityTemplate` + SpecBar/MetricCalloutBand catalogués, markup couches inline `:126-139`).
- Title : `Stack & technologies · Waimia` (`:106`). Indexée (`index, follow`), listée « restent indexées » `docs/strategy/14 §4`.
- kw cible : « stack / technologies » (volume faible, intention info). Rôle : réassurance technique.
- Rôle silo : page technique de confiance. **C'est la KEEPER du couple technologies/partenaires** (voir `partenaires.md`).

## 2. Contenu

- 5 couches véridiques et utiles (IA, front, CMS, data/CRM, analytics, `:11-65`). Voix conforme (« Si ça ne mesure rien, ça n'existe pas », `:58`).
- **Recouvrement fort avec /partenaires** : mêmes CMS (Tina/Keystatic/Decap/Contentful/Sanity/Strapi/Prismic), mêmes CRM/growth (HubSpot/Lemlist/Instantly/Apollo/Pharow/MailerLite), même stack Google. `/partenaires` est déjà noindex (dupe) : cette page est la version à garder.
- **Claim à vérifier** : « Google Analytics 4 » présenté comme en usage (`:60-62`, spec `:76`). Or `docs/strategy/14 §5` acte « GA4 explicitement reporté » (pas intégré). Affirmer GA4 comme brique active alors qu'il n'est pas branché = sur-promesse.

## 3. SEO on-page

- H1 « La stack, couche par couche. » (`:112`) : conforme. kw faible mais rôle support assumé.
- Markup des couches 100 % inline (`:126-139`) : dette d'orphelin (pas un composant catalogué), sans impact SEO mais à noter (règle anti-orphelin CLAUDE.md).

## 4. Maillage interne

- Entrant : ~9 références (dont mega-menu `:860`).
- Sortant : peu de liens (page terminale). Pourrait pointer vers `/services/site-web-ia` (Astro/front) et `/services/integration-claude` (Claude) pour irriguer.

## 5. Balisage

- `TechArticle` JSON-LD (`:96-103`). Adapté.

## 6. Conversion

- CTA final via template `showCta` → `/contact` (`:158`). Conforme.

## 7. Verdict + actions

**AMÉLIORER.** Page technique correcte à consolider comme unique référence stack (absorbe /partenaires) et à assainir sur GA4.

1. **Aligner le claim GA4** (`:60-62`, `:76`) avec la réalité (GA4 reporté, `strategy/14 §5`) : reformuler en capacité proposée (« Google Analytics 4 quand la mesure le justifie ») plutôt qu'en brique active, ou retirer jusqu'à intégration réelle.
2. **Absorber /partenaires** : cette page devient la seule sur la stack ; récupérer les rares éléments uniques de partenaires (Google Business Profile, Vercel détaillé) puis 301 partenaires → technologies (cf `partenaires.md`).
3. Ajouter 2 liens sortants descriptifs (`/services/site-web-ia`, `/services/integration-claude`).
4. Optionnel : migrer le markup des couches inline (`:126-139`) vers une section cataloguée (dette anti-orphelin).
