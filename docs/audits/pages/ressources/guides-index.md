---
route: /ressources/guides
verdict: AMÉLIORER
title_actuel: "Guides pratiques IA · Waimia"
kw_cible: (hub, noindex) guides pratiques IA
date: 2026-07-16
---

# /ressources/guides (hub guides, noindex)

## 1. Identité
- Title : « Guides pratiques IA · Waimia ». H1 servi : « Guides pratiques. »
- `robots: noindex, follow` ✅ (conforme `strategy/14` §2 : « hubs {comparatifs,guides,diagnostics} noindex déjà, RAS »).
- Rôle : index de collection guides. Ne vise pas de kw (noindex assumé).

## 2. Contenu
- **Hub à 1 item** : `src/content/guides/` ne contient que `claude-pme.json`. La checklist `checklist-deploiement-claude` prévue en fusion (`strategy/14:87`) est déjà absente (fusion how-to actée). Le hub est donc une page quasi vide : masthead + une card + « Envie d'en parler ? ».
- Aucune curation éditoriale (pas d'intro qui explique la ligne des guides). H2 servi unique = « Envie d'en parler ? » (CTA), pas de valeur propre.

## 3. SEO on-page
- noindex → pas d'enjeu ranking. Rien à corriger côté kw.

## 4. Maillage interne
- Pointe vers `/ressources/guides/claude-pme`. N'est pas listé dans la grille du hub `/ressources` (cf `_index.md`). Reçoit surtout du trafic nav.

## 5. Balisage
- `BreadcrumbList` + `WebSite` + `Organization`. Cohérent pour un hub noindex.

## 6. Conversion
- CTA « Envie d'en parler ? » vers `/contact`. Pas de pricing (normal).

## 7. Verdict + actions
Verdict : **AMÉLIORER** (léger, la page reste, noindex conservé).
1. Ajouter 1-2 phrases de curation en intro (ce qu'est un « guide » ici : how-to opérationnel daté, pas un article). Pourquoi : donner une valeur propre au hub au-delà d'une grille à 1 card.
2. Tant qu'il n'y a qu'un seul guide, envisager de pointer la nav directement vers `/ressources/guides/claude-pme` (le hub reste accessible mais cesse d'être une étape vide). Pourquoi : éviter un palier de navigation sans contenu. Réversible dès l'ajout d'un 2ᵉ guide.
