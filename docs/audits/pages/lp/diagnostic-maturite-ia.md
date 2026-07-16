---
route: /lp/diagnostic-maturite-ia
verdict: FUSIONNER
title_actuel: "Diagnostic maturité IA · évaluez votre maturité en quelques minutes"
kw_cible: diagnostic maturité IA
date: 2026-07-16
---

# /lp/diagnostic-maturite-ia

## 1. Identité
- Route servie depuis `src/content/lp/diagnostic-maturite-ia.json`.
- noindex, follow ; canonical self ; hors sitemap + robots-disallow (`astro.config.mjs:234-235,250`).
- **Seule LP du silo avec un inbound réel** : la home la référence (`src/pages/index.astro:178` `cta_href: '/lp/diagnostic-maturite-ia'`, bloc `quizCta` L171-181).

## 2. Contenu
- Squelette 7 sections identique au reste du silo (`hero-conversion-funnel … footer-cta-band`). Clone de template, page statique de réservation.
- Double emploi avec la ressource canonique indexée `/ressources/diagnostics/maturite-ia` (`src/content/diagnostics/maturite-ia.json`), qui est BEAUCOUP plus riche : 10 sections (`hero-split-media, direct-answer, diagnostic-stages, manifesto-statement, feature-zigzag, decision-list, process-steps, related-cards-band, faq-accordion, footer-cta-band`) et indexable.

## 3. SEO on-page
- Sans objet côté LP (noindex). La valeur organique du sujet est portée par la ressource `/ressources/diagnostics/maturite-ia`, pas par la LP.

## 4. Maillage interne + bug UX
- La home promet un quiz interactif : `body_fr: 'Faites le diagnostic : dix questions … résultat immédiat'`, `note_fr: 'Gratuit · 5 min · résultat immédiat'` (`src/pages/index.astro:175,181`). Mais le lien envoie vers la LP statique (7 sections, sans quiz 10 questions), pas vers la ressource canonique. **Promesse home ≠ destination livrée** : incohérence à corriger.
- Autres inbounds : `src/pages/lab/home-e.astro` (page `/lab`, hors périmètre) et `src/sections/diagnostic-stages/demo.ts` (données de démo). Le seul lien de prod utile = la home.

## 5. Balisage
- noindex/follow + canonical self : cohérent LP.

## 6. Conversion
- CTA `/contact?offer=diagnostic-maturite-ia&intent=audit`. Fonctionnel.

## 7. Verdict + actions
Verdict : **FUSIONNER** dans `/ressources/diagnostics/maturite-ia` (la ressource indexée et complète absorbe le rôle ; la LP est un doublon appauvri que la home pointe par erreur).

1. Re-pointer la home : `src/pages/index.astro:178` `cta_href: '/lp/diagnostic-maturite-ia'` -> `'/ressources/diagnostics/maturite-ia'`. Corrige aussi la promesse « dix questions / résultat immédiat » en l'envoyant vers la page riche.
2. 301 `'/lp/diagnostic-maturite-ia': '/ressources/diagnostics/maturite-ia'` dans `astro.config.mjs`.
3. Supprimer `src/content/lp/diagnostic-maturite-ia.json`.
4. GF-1 : après build, cliquer le CTA « Faire le diagnostic » de la home et vérifier qu'il aboutit sur `/ressources/diagnostics/maturite-ia` (200, contenu diagnostic-stages).
