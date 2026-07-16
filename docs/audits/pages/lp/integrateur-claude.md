---
route: /lp/integrateur-claude
verdict: SUPPRIMER
title_actuel: "Intégrateur Claude · déployez Claude sans improviser"
kw_cible: intégrateur Claude (nom de service déprécié)
date: 2026-07-16
---

# /lp/integrateur-claude

## 1. Identité
- Route servie depuis `src/content/lp/integrateur-claude.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle : destination Ads (ADR-003). **Slug DÉPRÉCIÉ** : `/services/integrateur-claude` et l'URL nue `/integrateur-claude` sont 301 vers `/services/integration-claude` (`astro.config.mjs:138,142`). La LP conserve l'ancien nom.

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Clone de template, copy « Claude Code + agents managés + MCP + gouvernance ».
- Offer id des CTA (`/contact?offer=integrateur-claude&intent=…`) propage un identifiant obsolète.

## 3. SEO on-page
- Sans objet (noindex). Aucune valeur organique.
- Doublon thématique de la page canonique indexée `/services/integration-claude` (HTTP 200), sous un nom abandonné par la stratégie V8.

## 4. Maillage interne
- Inbound réels = 0 (uniquement `src/lib/section-usage.generated.ts`). Orpheline.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA `/contact?offer=integrateur-claude&intent=audit|cadrage|gouvernance`. Fonctionnel mais offer id déprécié.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (nom de service abandonné, doublon de `/services/integration-claude`, noindex, 0 inbound).

1. **Vérifier campagne Ads active** (hors repo). Si live : re-pointer vers `/services/integration-claude` avant suppression.
2. 301 `'/lp/integrateur-claude': '/services/integration-claude'` dans `astro.config.mjs` (aligne avec les 301 déjà en place pour le même slug ailleurs, L138/142).
3. Supprimer `src/content/lp/integrateur-claude.json`.
4. Rebuild + vérif.
