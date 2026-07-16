---
route: /ressources/comparatifs/site-web-intelligent-vs-wordpress
verdict: AMÉLIORER
title_actuel: "Site Web Intelligent vs WordPress · le comparatif honnête pour PME"
kw_cible: site web intelligent vs WordPress
date: 2026-07-16
---

# /ressources/comparatifs/site-web-intelligent-vs-wordpress

## 1. Identité
- Title : « Site Web Intelligent vs WordPress · le comparatif honnête pour PME » (vs-intent + qualifieur PME). Kw `strategy/14` §2 : comparatifs « fort · garder », P3.
- H1 servi : « Site Web Intelligent vs WordPress. » (H1 en intention comparative légitime ; l'usage de « Site Web Intelligent » comme terme de marque est admissible dans un comparatif, mais reste à ne pas laisser concurrencer la money page sur le kw nu).
- Rôle : comparatif décisionnel PME.

## 2. Contenu
- Format GEO très bon : **`<table>` HTML** (critère par critère : perf, SEO/GEO, maintenance, sécurité, coût total), « Là où le Site Web Intelligent creuse l'écart », « La même PME, deux trajectoires » (scénario), FAQ (9 questions), daté 2026-06-29.
- Voix conforme (« comparatif honnête », « un site qui travaille, pas une dette à porter »). Réutilise la stat Afnic 61 % côté cluster (cohérent).

## 3. SEO on-page
- **Chevauchement à cadrer (raison du verdict)** : la thématique WordPress vs SWI est portée par plusieurs surfaces : `services/wordpress` (kw « création/refonte site WordPress / headless »), `services/site-web-ia` (money « site web intelligent »), `demonstrations/site-web-intelligent` (que `strategy/14` §4 passe **noindex** justement pour « concurrence frontale avec la money page site-web-ia »), `diagnostics/site-web-intelligent`. Ce comparatif doit rester sur l'**intention comparative** et ne pas dupliquer l'argumentaire de la money page.
- « Site Web Intelligent » (terme marque) très présent : acceptable en contexte comparatif, mais surveiller la densité vs `services/site-web-ia`.

## 4. Maillage interne
- Doit renvoyer `services/site-web-ia` (l'offre) et `services/wordpress` (la refonte WordPress) en ancres descriptives. Vérifier qu'il ne redonde pas `demonstrations/site-web-intelligent` (passé noindex) ni le diagnostic SWI.

## 5. Balisage
- `Article` + `FAQPage` + `BreadcrumbList` + `WebPage` + `ImageObject` ✅.
- **Bug transverse FAQPage dupliqué** : 17 `Question` + **2 blocs `FAQPage`** (fait +1 vs les autres). Cf `guide-claude-pme.md` action 1.

## 6. Conversion
- CTA « Un site qui travaille… » → `/contact`. Pas de pricing (informationnel ; les prix restent sur `services/site-web-ia` / `wordpress`). ✅

## 7. Verdict + actions
Verdict : **AMÉLIORER** (format fort, chevauchement money page à cadrer).
1. Tenir l'angle comparatif et renvoyer explicitement la mise en œuvre vers `services/site-web-ia` (offre) et `services/wordpress` (refonte). Pourquoi : éviter que le comparatif duplique l'argumentaire de la money page (qui a fait passer `demonstrations/site-web-intelligent` en noindex pour la même raison).
2. Surveiller la densité de « Site Web Intelligent » vs `services/site-web-ia`. Pourquoi : le kw nu est réservé à la money page (doctrine V8.1).
3. **[Transverse]** Corriger le FAQPage dupliqué.
