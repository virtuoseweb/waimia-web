---
route: /ressources/diagnostics/claude-pme
verdict: AMÉLIORER
title_actuel: "Votre PME est-elle prête à déployer Claude ? Le diagnostic en 6 questions"
kw_cible: PME prête à déployer Claude (readiness)
date: 2026-07-16
---

# /ressources/diagnostics/claude-pme (readiness Claude)

## 1. Identité
- Title : « Votre PME est-elle prête à déployer Claude ? Le diagnostic en 6 questions » (angle readiness, question-first bon pour GEO). Kw cible `strategy/14` §2 : « PME prête à déployer Claude (readiness) », note « garder · dé-commercialiser title », P1. Le title actuel est déjà non-commercial (readiness), l'action « dé-commercialiser » semble déjà satisfaite.
- H1 servi : « Votre PME est-elle prête à déployer Claude ? »
- Rôle : maillon readiness du cluster « déployer Claude » (voir `guide-claude-pme.md`). Ne prend pas le kw commercial (réservé à `services/integration-claude`).

## 2. Contenu
- Contenu net (5 dimensions, grille de niveaux, « un seul axe faible fait échouer le déploiement »). FAQ (8 questions). Voix conforme.
- **Squelette templaté partagé** avec les 3 autres diagnostics : mêmes H2 (« Où en est votre entreprise ? » / « Ce qui détermine… » / « Six questions pour vous situer » / « Ce qu'on fait selon votre niveau » / « Ce que vous nous demandez » / CTA « Passons au prochain pas »). Risque de templated content si les corps se ressemblent trop (varier l'ossature, cf `strategy/14` vague 2).

## 3. SEO on-page
- H1/title kw-first, `index, follow`. Frontière cluster Claude respectée.

## 4. Maillage interne
- CTA `/contact?offer=claude-pme&intent=diagnostic` (intent distinct du guide, bon suivi). Doit pointer le guide how-to (`guides/claude-pme`) et `services/integration-claude` en corps de page pour matérialiser le cluster.

## 5. Balisage
- `Article` + `FAQPage` + `BreadcrumbList` + `WebPage` + `ImageObject`.
- **Bug transverse FAQPage dupliqué** : 16 `Question` / 16 `Answer` + **2 blocs `FAQPage`** (8 questions ×2). Cause : `FaqAccordion.astro:9` + `src/pages/ressources/diagnostics/[...slug].astro:43-44` (`buildFAQPage`). Cf `guide-claude-pme.md` action 1.
- Pas de `<table>` HTML pour la « grille de niveaux » (rendue en prose/cards). Une vraie table rendrait la grille extractible par les IA (GEO).

## 6. Conversion
- Funnel = contenu → CTA audit (pas de quiz interactif ici : les « 6 questions » sont du contenu, pas un formulaire noté ; le vrai formulaire interactif est `/ressources/academy`). Cohérent. Pas de pricing.

## 7. Verdict + actions
Verdict : **AMÉLIORER**.
1. Corriger le FAQPage dupliqué (action transverse, cf `guide-claude-pme.md` action 1).
2. Convertir la grille de niveaux en `<table>` HTML. Pourquoi : extractibilité GEO (grille de readiness = format idéal pour être cité par une IA).
3. Ajouter en corps les liens cluster : `guides/claude-pme` (how-to) + `services/integration-claude` (déploiement). Pourquoi : verrouiller le cluster « déployer Claude ».
4. Différencier l'ossature vs les 3 autres diagnostics (H2/angle) pour éviter le templated content. Pourquoi : 4 pages au même squelette exposées à une pénalité de similarité.
