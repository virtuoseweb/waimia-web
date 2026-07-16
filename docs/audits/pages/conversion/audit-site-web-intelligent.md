---
route: /audit-site-web-intelligent
verdict: AMÉLIORER
title_actuel: "Audit gratuit de site web · 45 min sur votre système d'acquisition"
kw_cible: "audit site web / conversion"
date: 2026-07-16
---

# /audit-site-web-intelligent · audit-site-web-intelligent.astro (composable, collection `audits`)

## 1. Identité

- Route : `/audit-site-web-intelligent` (route explicite, `src/pages/audit-site-web-intelligent.astro`).
- Title : `Audit gratuit de site web · 45 min sur votre système d'acquisition`.
- Description : « Audit gratuit de 45 min de votre site web et de votre acquisition : on repère les fuites de conversion, les angles SEO et un plan d'action chiffré. »
- kw cible (`docs/strategy/14:91`) : `audit site web / conversion`. Action carte = garder, **PAS de fusion** avec audit-ia-pme (catégories/kw distincts).
- Intention : commerciale/lead-gen (audit gratuit orienté site + conversion). Endpoint du système d'acquisition.

## 2. Contenu

- H1 servi : « Audit gratuit de votre site web. » kw-first propre. Le title enchaîne « votre système d'acquisition » = couche marque en sous-titre (conforme double couche §0bis.5 : H1 métier, « système » en habillage).
- 18 Q/R FAQ, 4 angles de revue (SEO, conversion, etc.). Profondeur forte.
- Voix conforme (« fuites de conversion », « un plan d'action chiffré », « pas un rapport qui dort »).

## 3. SEO on-page

- H1 kw-first, « système d'acquisition » seulement en sous-titre (pas en H1 SEO) : conforme §0bis.4. Bon.
- FAQ 18 Q/R = fort AEO/GEO.

## 4. Maillage interne

- Entrante forte (home ×3, contact ×3, nav/footer). Breadcrumb masthead correct.
- Sortante vers conversion. Cohérent.

## 5. Balisage

- JSON-LD : `Service` + `Offer` (0 €) + `BreadcrumbList` + `Organization` + `WebSite`. Adapté.
- **Même anomalie double `FAQPage`** que /audit-ia-pme : le HTML servi compte 2 `FAQPage` (18 Q, 18 A). Origine identique (`buildFAQPage` page-level `src/pages/audit-site-web-intelligent.astro:44` + section FAQ auto-émettrice). À dédupliquer.
- Canonical `https://waimia.com/audit-site-web-intelligent`, robots `index, follow`. RAS.

## 6. Conversion

- Offre gratuite (0 €), CTA cohérent. Aucun prix contradictoire. Bon.

## 7. Verdict + actions

**AMÉLIORER** (double FAQPage + risque de sections templatées partagées avec l'autre audit).

1. **Dédupliquer le FAQPage** (même correction que /audit-ia-pme, action 1) : un seul bloc `FAQPage` par page.
2. **Risque de contenu dupliqué inter-pages** : 3 sections H2 sont identiques mot pour mot entre `/audit-ia-pme` et `/audit-site-web-intelligent` : « L'audit est utile pour vous si », « Le déroulé des 45 minutes », « Ce que vous nous demandez » (vérifié sur le HTML servi des 2 pages). Les angles propres diffèrent bien (IA/process vs site/leads), donc PAS de fusion (`docs/strategy/14:91`), mais ces 3 blocs partagés risquent le near-duplicate. Différencier le corps de ces 3 sections par page (déroulé orienté site/SEO ici, orienté process/automatisation là) pour supprimer tout chevauchement littéral.
3. Transverse : décision OG kicker `§ Waimia`.
