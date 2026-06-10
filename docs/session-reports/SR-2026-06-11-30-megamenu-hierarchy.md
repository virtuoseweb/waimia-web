# SR-2026-06-11-30 · Mega menu Solutions hiérarchisé (maquette Simon)

> Worker Fable 5 (worktree `.worktrees/megamenu`, branche `feat/megamenu-hierarchy` `aa778b9`, mergée main `aeb3772`, push `255502c`). Contre-vérifié orchestrateur (rule 09) : main inspecté, gates relancés, vérification visuelle des screenshots.

## 1. Demande

Refondre le mega menu Solutions selon la maquette fournie (conservée : `docs/visual-audit/nav/reference-simon-megamenu.webp`) : titres Acquérir/Piloter/Opérer gras serif plus visibles, but en petites caps accent dessous, citations clients gardées (barre terracotta), listing épuré sans numéros « Offre 0X », 4e colonne conservée. Corrections itération 2 : badge de colonne RETIRÉ (désalignait les 3 titres) ; à la place, badges inline « Offre phare »/« Flagship » sur les 2 offres phares (Growth System IA, Site web IA).

## 2. Livré

- `src/data/mega-menu.ts` : hiérarchie data-driven (goal + quote par colonne), suppression des numéros d'offres, badge inline sur exactement 2 liens, champ `image` optionnel sur MegaMenuFeatured (câblé `cas-plateau.webp`).
- `src/components/header/Header.astro` : pill `.flag` après le label (desktop + mobile), image featured conditionnelle.
- `src/styles/global.css` : styles `.mega-link .flag` (margin-left auto, aligné droite), `.mega-featured .img img` (cover). +176/-13.

## 3. Preuves

- Alignement réparé : `offsetTop = 120` identique sur les 3 titres de colonnes (computed).
- Badges sur exactement 2 items ; panels cas/ressources/agence `outerHTML` strictement identiques à la prod (non-régression).
- Gates : astro check 0 errors · build Complete! · no-emdash/touchpoints/token-purity PASS (relancés post-merge orchestrateur, + token-lock 0 nouveau token).
- Screenshots : `docs/visual-audit/nav/after-megamenu-{desktop,mobile}.jpeg`.

> **Addendum GF-1 PROD (01:32)** : push `255502c`, live 01:30. Computed sur waimia.com panel ouvert : 3 titres `top=120` identiques (Instrument Serif 34px), badges « Offre phare » sur exactement Growth System IA + Site web IA, 0 « Offre 0X », `cas-plateau.webp` chargée (naturalWidth>0), panel opacity 1, h1 home opacity 1 transform neutre, 0 erreur console.
