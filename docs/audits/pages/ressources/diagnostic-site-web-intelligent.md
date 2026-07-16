---
route: /ressources/diagnostics/site-web-intelligent
verdict: AMÉLIORER
title_actuel: "Diagnostic site web intelligent · la checklist et où vous en êtes"
kw_cible: diagnostic site web
date: 2026-07-16
---

# /ressources/diagnostics/site-web-intelligent (contenu diagnostic site)

## 1. Identité
- Title : « Diagnostic site web intelligent · la checklist et où vous en êtes ». Kw cible `strategy/14` §2 : « diagnostic site web », note « angle unique (jamais « site web intelligent » nu, réservé à site-web-ia) », P2.
- H1 servi : « Diagnostic du site intelligent. »
- Rôle : contenu diagnostic « votre site est-il intelligent ou passif ? ». Doit rester sur l'angle **diagnostic**, jamais concurrencer la money page `services/site-web-ia` sur « site web intelligent » nu.

## 2. Contenu
- Bon angle (« Vitrine subie ou site qui qualifie », « Trois non, et c'est une vitrine »). FAQ (8 questions). Voix conforme.
- **Squelette templaté** partagé avec les 3 autres diagnostics.
- **Chevauchement à surveiller** : la notion « site web intelligent » est portée par plusieurs surfaces : `services/site-web-ia` (money, doctrine V8.1 : « site web intelligent » = angle marque, kw commercial réservé), `comparatifs/site-web-intelligent-vs-wordpress`, `lp/diagnostic-site-web-intelligent`, `demonstrations/site-web-intelligent` (que `strategy/14` §4 passe noindex). Cette page doit tenir l'angle diagnostic pur.

## 3. SEO on-page
- H1 « Diagnostic du site intelligent » : garde le mot « diagnostic » en tête → bon (ne prend pas « site web intelligent » nu). `index, follow`.
- Densité « site web intelligent » à surveiller vs la money page.

## 4. Maillage interne
- Doit pointer `services/site-web-ia` (l'offre) et `audit-site-web-intelligent` (endpoint conversion). Frontière avec `lp/diagnostic-site-web-intelligent` (landing) à clarifier : deux surfaces « diagnostic site » (contenu ressource vs LP), vérifier qu'elles ne visent pas le même exact-match.

## 5. Balisage
- `Article` + `FAQPage` + `BreadcrumbList` + `ImageObject`.
- **Bug transverse FAQPage dupliqué** : 16 `Question` + **2 blocs `FAQPage`** (8 ×2). Cf `guide-claude-pme.md` action 1.
- Pas de `<table>` pour la checklist → une checklist tabulée serait très extractible (GEO).

## 6. Conversion
- Contenu → CTA audit (`audit-site-web-intelligent` pertinent ici). Pas de quiz interactif. Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. Corriger le FAQPage dupliqué (transverse).
2. Clarifier la frontière avec `lp/diagnostic-site-web-intelligent` (ressource contenu vs landing page payante) : intentions/kw distincts, ou canonical si redondance. Pourquoi : éviter deux « diagnostic site » qui se cannibalisent.
3. Convertir la checklist en `<table>` et pointer `services/site-web-ia` + `audit-site-web-intelligent` en corps. Pourquoi : extractibilité GEO + maillage vers la money page.
4. Différencier l'ossature vs les autres diagnostics.
