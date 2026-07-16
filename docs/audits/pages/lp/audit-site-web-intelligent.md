---
route: /lp/audit-site-web-intelligent
verdict: SUPPRIMER
title_actuel: "Audit Site web intelligent · votre site génère-t-il assez de leads ?"
kw_cible: audit site web
date: 2026-07-16
---

# /lp/audit-site-web-intelligent

## 1. Identité
- Route servie depuis `src/content/lp/audit-site-web-intelligent.json` via `src/pages/lp/[...slug].astro`.
- noindex, follow ; canonical self `https://waimia.com/lp/audit-site-web-intelligent` ; hors sitemap + robots-disallow `/lp/` (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). Aucune fonction organique.
- Intention : « audit site web / audit conversion SEO GEO ».

## 2. Contenu
- Squelette 7 sections identique au reste du silo (`hero-conversion-funnel … footer-cta-band`). Clone de template.
- Contenu « 8 axes : conversion, SEO, GEO, CMS, contenu, CRM, analytics, lead magnets » : angle un peu plus riche que les autres LP, mais recopie la promesse de la page canonique jumelle.

## 3. SEO on-page
- Sans objet (noindex/hors sitemap). Aucune valeur ni risque organique.
- Doublon frontal de la page canonique indexée `/audit-site-web-intelligent` (`src/pages/audit-site-web-intelligent.astro`, HTTP 200) ET de la ressource `/ressources/diagnostics/site-web-intelligent` (`src/content/diagnostics/site-web-intelligent.json`). Trois surfaces pour un même sujet, dont deux indexées.

## 4. Maillage interne
- Inbound réels = 0 (seule occurrence dans `src/lib/section-usage.generated.ts`, manifest généré). Orpheline hors Ads.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP. Rien à corriger côté balisage.

## 6. Conversion
- CTA hero `/contact?offer=audit-site-web-intelligent&intent=audit` + cartes vers `intent=conversion|contenu|crm`. Cohérent.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (doublon d'une page canonique top-level indexée + d'une ressource diagnostic ; noindex ; 0 inbound).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer l'annonce vers `/audit-site-web-intelligent` (jumelle indexée) avant suppression.
2. 301 `'/lp/audit-site-web-intelligent': '/audit-site-web-intelligent'` dans `astro.config.mjs`.
3. Supprimer `src/content/lp/audit-site-web-intelligent.json`.
4. Rebuild + vérif `Complete!`.
