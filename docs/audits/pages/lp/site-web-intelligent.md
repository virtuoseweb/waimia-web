---
route: /lp/site-web-intelligent
verdict: SUPPRIMER
title_actuel: "Site web intelligent · réservez votre diagnostic 45 min"
kw_cible: site web intelligent (nom de service déprécié)
date: 2026-07-16
---

# /lp/site-web-intelligent

## 1. Identité
- Route servie depuis `src/content/lp/site-web-intelligent.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). **Slug DÉPRÉCIÉ** : `/services/site-web-intelligent` et l'URL nue `/site-web-intelligent` sont 301 vers `/services/site-web-ia` (`astro.config.mjs:137,141`). La LP garde l'ancien nom.

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Clone de template, copy « site qui capte, score et qualifie, branché CRM ».

## 3. SEO on-page
- Sans objet (noindex). Aucune valeur organique.
- Doublon thématique de la page canonique indexée `/services/site-web-ia` (HTTP 200), sous un nom abandonné.

## 4. Maillage interne
- Inbound réels = 0. Deux occurrences seulement : `src/lib/section-usage.generated.ts` (manifest généré) et `src/data/page-recipes.json:38` qui référence `"derivedFrom": "src/content/lp/site-web-intelligent.mdx"`. **Cette référence est déjà STALE** : le fichier est un `.json`, pas un `.mdx`. Le seed de recette builder pointe un chemin qui n'existe plus.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA `/contact?offer=site-web-intelligent&intent=discovery|essentiel|complet|intelligence`. Fonctionnel mais offer id déprécié.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (nom de service abandonné, doublon de `/services/site-web-ia`, noindex, 0 inbound de prod).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer vers `/services/site-web-ia` avant suppression.
2. 301 `'/lp/site-web-intelligent': '/services/site-web-ia'` dans `astro.config.mjs` (aligne avec L137/141 pour le même slug ailleurs).
3. Corriger ou retirer le `derivedFrom` stale `src/data/page-recipes.json:38` (chemin `.mdx` inexistant). Décider si le builder a encore besoin de ce seed ; sinon nettoyer l'entrée.
4. Supprimer `src/content/lp/site-web-intelligent.json`.
5. Rebuild + vérif.
