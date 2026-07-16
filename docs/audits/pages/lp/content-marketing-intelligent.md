---
route: /lp/content-marketing-intelligent
verdict: SUPPRIMER
title_actuel: "Content marketing intelligent · réservez votre diagnostic 45 min"
kw_cible: content marketing (nom de service déprécié)
date: 2026-07-16
---

# /lp/content-marketing-intelligent

## 1. Identité
- Route servie depuis `src/content/lp/content-marketing-intelligent.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). **Le slug porte un nom de service DÉPRÉCIÉ** : `/services/content-marketing-intelligent` a été renommé et 301 vers `/services/seo-geo-contenu` (`astro.config.mjs:129`). La LP conserve l'ancienne nomenclature.

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Clone de template, copy « machine éditoriale SEO/GEO ».
- L'offer id des CTA (`/contact?offer=content-marketing-intelligent&intent=…`) propage un identifiant d'offre obsolète.

## 3. SEO on-page
- Sans objet (noindex). Aucune valeur organique.
- Doublon thématique de la page canonique indexée `/services/seo-geo-contenu` (HTTP 200), sous un nom que la stratégie V8 a explicitement abandonné.

## 4. Maillage interne
- Inbound réels = 0 (uniquement `src/lib/section-usage.generated.ts`). Orpheline.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA `/contact?offer=content-marketing-intelligent&intent=discovery|essentiel|complet|intelligence`. Fonctionnel mais offer id déprécié.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (nom de service abandonné, doublon de `/services/seo-geo-contenu`, noindex, 0 inbound).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer vers `/services/seo-geo-contenu` avant suppression.
2. 301 `'/lp/content-marketing-intelligent': '/services/seo-geo-contenu'` dans `astro.config.mjs`.
3. Supprimer `src/content/lp/content-marketing-intelligent.json`.
4. Rebuild + vérif.
