---
route: /lp/tunnel-conversion-intelligent
verdict: SUPPRIMER
title_actuel: "Tunnel de conversion intelligent · réservez votre diagnostic 45 min"
kw_cible: tunnel de conversion (nom de service déprécié)
date: 2026-07-16
---

# /lp/tunnel-conversion-intelligent

## 1. Identité
- Route servie depuis `src/content/lp/tunnel-conversion-intelligent.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). **Slug DÉPRÉCIÉ** : `/services/tunnel-conversion-intelligent` est 301 vers `/services/landing-pages-tunnels` (`astro.config.mjs:122`). La LP garde l'ancien nom.

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Clone de template, copy « tunnel qui capture, score et nourrit jusqu'au closing ».

## 3. SEO on-page
- Sans objet (noindex). Aucune valeur organique.
- Doublon thématique de la page canonique indexée `/services/landing-pages-tunnels` (HTTP 200), sous un nom abandonné par la stratégie V8.

## 4. Maillage interne
- Inbound réels = 0 (uniquement `src/lib/section-usage.generated.ts`). Orpheline.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA `/contact?offer=tunnel-conversion-intelligent&intent=discovery|essentiel|complet|intelligence`. Fonctionnel mais offer id déprécié.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (nom de service abandonné, doublon de `/services/landing-pages-tunnels`, noindex, 0 inbound).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer vers `/services/landing-pages-tunnels` avant suppression. Note stratégie 14:59 : le vrai besoin « landing page Google Ads » est déjà mappé sur `/services/landing-page-google-ads` (page dédiée trafic payant), qui couvre ce rôle bien mieux que cette LP.
2. 301 `'/lp/tunnel-conversion-intelligent': '/services/landing-pages-tunnels'` dans `astro.config.mjs`.
3. Supprimer `src/content/lp/tunnel-conversion-intelligent.json`.
4. Rebuild + vérif.
