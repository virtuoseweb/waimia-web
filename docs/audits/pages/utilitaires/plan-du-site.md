---
route: /plan-du-site
verdict: VALIDER
title_actuel: "Plan du site · Waimia"
kw_cible: "aucun (navigation, noindex assumé)"
date: 2026-07-16
---

# /plan-du-site · plan-du-site.astro

## 1. Identité

- Route : `/plan-du-site` (`src/pages/plan-du-site.astro`, 301 lignes).
- Title : `Plan du site · Waimia`. Description : « Toutes les pages de Waimia en un coup d'œil : solutions IA, offres, cas clients, technologies, ressources et l'agence. »
- kw cible : **aucun**. `docs/strategy/14:120` la classe explicitement « passe noindex + hors sitemap » (nav pure).
- Rôle : plan de navigation HTML pour l'utilisateur (et découverte crawler via liens, même en noindex).

## 2. Contenu

- H1 servi : « Plan du site ». Contenu = liste structurée de toutes les sections (solutions, offres, cas, ressources, agence). Rôle rempli.
- Pas d'enjeu éditorial (voix), page fonctionnelle.

## 3. SEO on-page

- `robots: noindex, follow` (vérifié). Conforme à la décision `docs/strategy/14:120`. Le `follow` laisse le crawl suivre les liens (utile pour la découverte). Bon.

## 4. Maillage interne

- **Rôle = hub de maillage** : la page liste des liens vers l'ensemble du site. **Vérifié** : les 103 liens internes uniques renvoient tous HTTP 200 (crawl du HTML servi). 0 lien mort. Les 404 historiques `/solutions/*`, `/finance`, `/fintech`, `/it-engineering` (`docs/audits/03:47`) ont disparu (grep = 0).

## 5. Balisage

- JSON-LD : `Organization` + `WebSite` + `PostalAddress` (socle). Aucun schema spécifique requis. RAS.
- Canonical présent + `noindex`. Cohérence sitemap : `/plan-du-site` est bien dans `src/data/sitemap-noindex-exclude.ts:80` → exclue du sitemap. Vérifié : absente du `sitemap-0.xml` servi. ✅ conforme.

## 6. Conversion

- Non applicable (page de navigation). RAS.

## 7. Verdict + actions

**VALIDER.** noindex + hors sitemap comme prescrit, rôle de navigation rempli, cohérence sitemap correcte.

1. Aucune action bloquante. 0 lien mort (103/103 en 200), sitemap-exclusion correcte, noindex conforme. Modèle de référence pour une page de navigation.
2. Transverse : décision OG kicker.
