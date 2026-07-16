---
route: /lp/diagnostic-site-web-intelligent
verdict: SUPPRIMER
title_actuel: "Diagnostic Site web intelligent · prêt pour le SEO, le GEO et la conversion ?"
kw_cible: diagnostic site web
date: 2026-07-16
---

# /lp/diagnostic-site-web-intelligent

## 1. Identité
- Route servie depuis `src/content/lp/diagnostic-site-web-intelligent.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). Aucune fonction organique.

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Clone de template.
- Double emploi avec la ressource canonique indexée `/ressources/diagnostics/site-web-intelligent` (`src/content/diagnostics/site-web-intelligent.json`, HTTP 200), qui porte le contenu diagnostic complet et indexable.

## 3. SEO on-page
- Sans objet (noindex). La valeur organique du sujet est portée par `/ressources/diagnostics/site-web-intelligent`, pas par la LP.
- Note : le sujet « diagnostic site web » est déjà couvert par DEUX pages proches (`/ressources/diagnostics/site-web-intelligent` et la conversion `/audit-site-web-intelligent`). La LP est une troisième surface redondante.

## 4. Maillage interne
- Inbound réels = 0 (uniquement `src/lib/section-usage.generated.ts`). Contrairement à `diagnostic-maturite-ia`, la home ne la référence PAS. Orpheline totale.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA principal absent des liens détectés ; la copy évoque « book a call » sans href Cal/`/contact` explicite dans le dump. À re-vérifier, mais sans objet si la page est supprimée.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (orpheline, noindex, doublon de la ressource diagnostic indexée).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer vers `/ressources/diagnostics/site-web-intelligent` avant suppression.
2. 301 `'/lp/diagnostic-site-web-intelligent': '/ressources/diagnostics/site-web-intelligent'` dans `astro.config.mjs`.
3. Supprimer `src/content/lp/diagnostic-site-web-intelligent.json`.
4. Rebuild + vérif.
