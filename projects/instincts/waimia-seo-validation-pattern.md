---
name: waimia-seo-validation-pattern
description: GF-1 empirical SEO audit — Playwright screenshots + getComputedStyle checks for noindex meta tags, broken links, console errors on edited pages
---

# SEO Validation Pattern — waimia-web

## Pattern observé (3+ fois sur 2026-06-05/06)

Après tout changement touchant le rendu ou la structure HTML (templates, layouts, pages statiques Astro) :

1. **Screenshot above-the-fold via Playwright** (prod ou preview déployée)
2. **Inspection des éléments critiques** :
   - `getComputedStyle(h1)` → `opacity ≠ 0`, `display ≠ none`
   - `getComputedStyle(a[href])` → toutes les CTAs visibles
   - Absence de `<meta name="robots" content="noindex">`sur pages indexables
   - Présence correcte de noindex sur stub pages ("en préparation")
3. **Détection de liens cassés** dans le DOM : `a[href]` pointant vers des routes qui n'existent pas en dist/
4. **Console errors check** : 0 erreur JavaScript du navigateur

## Trigger explicite

- Merge d'un refactor qui touche les templates (ex: noindex forwarding prop chain)
- Ajout/suppression de routes Astro statiques
- Modification du contenu d'un layout (ex: Base.astro)
- Fix de liens internes (relire le contenu de contexte AVANT de décider de la cible)

## Anti-pattern banni

❌ « Tsc + build + Lighthouse 100/100 donc c'est validé » → Non. Lighthouse ne capture pas les éléments invisibles via opacity/animation.

✅ « Screenshot + inspection getComputedStyle + 0 console errors + broken link scan » → Preuve empirique GF-1.

## Outil préféré

**Playwright** + script simple (voir GF-1 dans CLAUDE.md global) : lancer une fois post-merge sur prod/preview, 30 secondes max.

## Cas vécu

Refactor Navbar + Hero CSS → Lighthouse 100 mais h1 invisibles (opacity:0 via animation-fill-mode). Détecté uniquement par Playwright screenshot + getComputedStyle, pas par Lighthouse. Corrigé: CSS animation reset, re-vérification Playwright, commit.
