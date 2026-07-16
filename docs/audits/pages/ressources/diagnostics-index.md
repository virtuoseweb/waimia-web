---
route: /ressources/diagnostics
verdict: AMÉLIORER
title_actuel: "Diagnostics IA gratuits · Waimia"
kw_cible: (hub, noindex) diagnostics IA gratuits
date: 2026-07-16
---

# /ressources/diagnostics (hub diagnostics, noindex)

## 1. Identité
- Title : « Diagnostics IA gratuits · Waimia ». H1 servi : « Diagnostics gratuits. »
- `robots: noindex, follow` ✅ (conforme `strategy/14` §2, RAS).
- Rôle : index des 4 diagnostics (claude-pme, maturite-ia, referent-ia, site-web-intelligent).

## 2. Contenu
- Un cran au-dessus du hub guides : présence d'un H2 de curation « Un repérage honnête, pas un argumentaire. » qui pose la ligne éditoriale (voix conforme). Reste léger (grille de 4 cards + CTA).
- 4 items → hub réellement peuplé, contrairement à guides.

## 3. SEO on-page
- noindex → pas d'enjeu ranking.

## 4. Maillage interne
- Pointe vers les 4 diagnostics. Non listé dans la grille du hub `/ressources` (cf `_index.md`).

## 5. Balisage
- `BreadcrumbList` + `WebSite` + `Organization`. Cohérent hub noindex.

## 6. Conversion
- CTA « Envie d'en parler ? » → `/contact`. Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER** (léger, noindex conservé).
1. Ajouter dans le hub un micro-repère de différenciation par diagnostic (readiness Claude / maturité IA / référent / site web) pour aider l'utilisateur à choisir. Pourquoi : 4 cards au libellé proche, l'intention de chacune n'est pas évidente au premier coup d'œil.
2. L'exposer depuis le corps de `/ressources` (cf `_index.md` action 3). Pourquoi : aujourd'hui atteignable seulement par le méga-menu.
