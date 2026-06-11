# SR-2026-06-11-40 · /agence recomposée (C3 punch-list, pire page du site 1/5)

> Issue de la critique visuelle réelle (agent read-only, 16 pages prod naviguées + screenshots lus) : /agence était un stub (hero + footer, 0 section) servi par le catch-all `[...slug].astro`. Worker Opus (worktree agence, branche `feat/agence-recomposition`, mergée `96310fa`).

## Livré

- `src/pages/agence/index.astro` (+ miroir EN) : 9 sections 100 % composables via SectionsRenderer (anti-orphelin, 0 markup inline) : hero-hub-stats → manifesto-statement INK → method-timeline → metric-callout-band INK → case-split Plateau → tech-stack-band → trust-badges-band → about-story-split → cta-final INK. Jamais plus de 2 fonds paper d'affilée, 3 blocs sombres.
- Aucun fait inventé : faits repris d'about.astro, sitemap.ts (badges), cases/plateau.mdx, methode.astro. team-bio-grid écarté (demo avec personnes fictives).
- Catch-all : retrait de la route 'agence' (2 lignes) pour céder la place à la vraie page.

## Preuves

- astro check 0 errors, build Complete! (133 KB vs stub), no-emdash + token-purity PASS.
- GF-1 : h1 + 3 titres opacity 1 FR & EN, reveals 8/8, 3 fonds sombres comptés. Screenshots `docs/visual-audit/agence/`.

## Notes

- /agence devient indexable (le stub portait noindex) : comportement voulu pour une vraie page agence ; vérifier l'inclusion sitemap en passe SEO.
- Punch-list critique restante (C1 monotonie fonds transverse, C2 recomposition SolutionsDetailTemplate, C4 images habillées, C5 trust-band partout) : `/tmp/wmission/critique/PUNCHLIST.md`, vagues suivantes.
