---
route: /cas-clients/balzeo
verdict: VALIDER
title_actuel: "Balzeo : migration vers WordPress et site deux fois plus rapide · Waimia"
kw_cible: "migration WordPress / refonte e-commerce plus rapide (long tail)"
date: 2026-07-16
---

# /cas-clients/balzeo — VALIDER

Source : `src/content/cases/balzeo.mdx` · rendu legacy `CaseStudyTemplate`.

## 1. Identité
- Title `balzeo.mdx:2` : « Balzeo : migration vers WordPress et site deux fois plus rapide ». kw-first (migration WordPress + bénéfice), excellent.
- Description `:4` précise (headless → WordPress/WooCommerce). `card.order: 2`, `featured: true`.
- Rôle : preuve secteur e-commerce (`/secteurs/e-commerce.mdx:53` → `caseRef: "balzeo"`, match parfait).

## 2. Contenu / E-E-A-T
- **Véracité interne exemplaire.** Les chiffres racontent la même histoire partout :
  - `shifts` (`:132-146`) : 5,2 s → 2,4 s (-50 %) ; 32 % → 43 % (+35 %) ; 1,2 → 3,6 (x3) ; 500 EUR → 80 EUR (-84 %).
  - `metrics` (`:147-160`) : 2,4 s / +35 % / x3 / -84 % — dérivent exactement des shifts.
  - `impact_fr:18` : « chargement divisé par deux, rétention +35 %, catalogue x3, maintenance -84 % » — cohérent.
  - `contextStats` (5,2 s / 8 sem. / 84 %) + prose (`:231`) alignés.
- `pullQuote` (`:161`) attribué « Fondateur de Balzeo » (second-party réaliste, non nominatif mais crédible).
- `showcase` (`:24`) : `url: https://balzeo.com` + capture pleine page (`home-full.webp` existe, 537 Ko). Bouton visite `nofollow noopener` (vérifié HTML servi). Fraîcheur OK.
- Voix anti-théâtre nette, prose serrée.

## 3. SEO on-page
- H1 = `title_fr` kw-first (vérifié HTML : « Balzeo : migration vers WordPress et site deux fois plus rapide »). Hn corrects.
- Canonical vérifié : `https://waimia.com/cas-clients/balzeo`. Pas de dup inter-cas.

## 4. Maillage interne
- Entrant : `/secteurs/e-commerce` (caseRef). Bien.
- **Dette commune (non bloquante)** : pas de lien in-body vers `/services/wordpress` ni `/secteurs/e-commerce` depuis le corps du cas (template legacy sans mesh page-level, `[...slug].astro:135`). À câbler globalement, pas spécifique à balzeo.

## 5. Balisage
- Vérifié HTML servi : `Article` + `BreadcrumbList` (3 `ListItem`) + `Organization` (×2) + `Person` + `ImageObject`. Canonical OK, `nofollow` sur lien externe OK. Conforme.

## 6. Conversion
- CTA chrome cohérents (`/contact`, `/audit-*`). Pas de pricing (normal).

## 7. Verdict + actions
**VALIDER** (modèle de référence pour le silo cas clients).
1. (Optionnel, dette globale) quand la mesh page-level des cas sera câblée, ajouter les liens in-body vers `/services/wordpress` + `/secteurs/e-commerce`.
2. Aucune correction de contenu requise : c'est le gabarit à répliquer (numéros cohérents card/metrics/shifts/impact/prose).
