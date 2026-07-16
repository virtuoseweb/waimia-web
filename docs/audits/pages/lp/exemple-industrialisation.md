---
route: /lp/exemple-industrialisation
verdict: SUPPRIMER
title_actuel: "Atelier Lumière (exemple) · démonstration de page composée"
kw_cible: aucun (démo interne, client fictif)
date: 2026-07-16
---

# /lp/exemple-industrialisation

## 1. Identité
- Route servie depuis `src/content/lp/exemple-industrialisation.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- Rôle réel, cité verbatim dans le contenu : `description_fr: "Page de démonstration générée par composition de sections cataloguées (archétype landing). Client fictif Atelier Lumière, sert à prouver le pipeline d'industrialisation."` H1 : « Une page complète, assemblée depuis le catalogue ». **Ce n'est pas une page marketing : c'est une vitrine d'outil (démo pipeline), avec un client FICTIF.**

## 2. Contenu
- Squelette 7 sections identique au reste du silo. Aucun kw cible, aucune offre réelle, aucun prospect visé. Contenu fictif « Atelier Lumière ».

## 3. SEO on-page
- Sans objet (noindex, hors sitemap). Aucune valeur ni intention de recherche. Une page à client fictif ne doit jamais être un modèle de la stratégie de contenu.

## 4. Maillage interne
- Inbound réels = 0 (uniquement `src/lib/section-usage.generated.ts`). Orpheline.

## 5. Balisage
- noindex/follow + canonical self. Cohérent pour une démo, mais la démo n'a pas sa place dans le silo marketing `/lp/`.

## 6. Conversion
- CTA `/contact?ref=exemple-industrialisation&plan=discovery|standard|custom`. Renvoie du trafic fictif vers le contact : sans valeur.

## 7. Verdict + actions
Verdict : **SUPPRIMER** de `/lp/`. C'est une vitrine d'outil (comme `/demonstrations`, périmètre EXCLU du README d'audit), pas une page de contenu.

1. Si une vitrine « pipeline d'industrialisation » est souhaitée, la DÉPLACER sous `/demonstrations/*` (namespace des vitrines outil) plutôt que la garder dans le silo campagne. Sinon suppression sèche.
2. Ne PAS créer de 301 « offre » : rediriger vers un hub générique `'/lp/exemple-industrialisation': '/services'` (ou `/agence/design-system` si l'intention est de montrer le pipeline).
3. Supprimer `src/content/lp/exemple-industrialisation.json`.
4. Rebuild + vérif. Ne jamais retenir cette page comme modèle validé (client fictif).
