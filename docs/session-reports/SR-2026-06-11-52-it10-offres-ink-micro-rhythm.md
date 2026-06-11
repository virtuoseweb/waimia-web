# SR-52 — It.10 : crescendo ink /offres + micro-rythme blog/école mergés

Date : 2026-06-11 (soirée). Orchestrateur : session longue itérative.

## Résultat

It.10 livrée en entier sur `main` = `7c2013a`, **poussé** (`46fa8a0..7c2013a`). Deploy toujours suspendu au quota Vercel (cron `d374f95b` demain 16:12).

### Mergé

1. **feat/offres-variation** (`aeb4a04`, 2 lignes) : le Tier III « Partenariat » de `/offres` FR+EN passe en `background: 'ink'` via la prop déjà supportée par `OfferTierGrid` (schéma `sections.ts:1270`). Casse la monotonie 3-cards-clair/3-cards-clair relevée par la critique it.9 et crée un crescendo light → light → ink aligné sur la hiérarchie commerciale (le partenariat premium culmine en sombre). 0 modif de composant catalogué, purement déclaratif.
2. **feat/micro-rhythm** (`70e8e52`) : blog, bande vide lede→1re row resserrée (172→109px desktop, 61px mobile) par marge négative `var(--space-9)` locale à la page (template partagé intact) ; école, grille pilotée par le count (`data-card-count` + override `:global(.tier-ii-grid)` borné ≥ 901px) : 2 cards remplissent désormais 2 colonnes pleines (480px chacune) au lieu de laisser un tiers droit vide, repli mobile 1 colonne préservé.

## Preuves

- Pipeline sur `7c2013a` (worktree validation) : `astro check` CHECK_EXIT=0 « 0 errors » · build `Complete!` · 7 gates PASS.
- GF-1 consolidé orchestrateur (chromium isolé, desktop 1440 + mobile 390) : 8/8 : `tier3Ink: true` sur offres FR+EN aux 2 viewports, blog `distinctDates: 8` + liste trouvée, école `cols: 2` desktop / `cols: 1` mobile + featured intact, h1 opacity 1 et 0 reveal caché partout.
- Zoom viewport orchestrateur sur le Tier III ink : 3 cards en panneaux bordés (Claude Cowork / Conseil / Infrastructure IA), eyebrow « III · PARTENARIAT », CTA accent : la zone douteuse de la capture fullpage était l'artefact header sticky connu.
- Harness : `/tmp/wmission/critique9/gf1-it10.mjs` (paramétrable `GF_BASE` pour la passe prod).

## État de la punch-list 9 (4,1/5)

Traités : i18n hero EN, dates blog, veille quasi-empty, cookbooks featured (it.9) ; monotonie cards offres, bande vide blog, grille école (it.10). Restants : P2 about prose-leaning, P2 trust-center definition-list dense, P2 déséquilibre featured /cas (mineurs, pages à 3,9-4,4) ; et surtout les 2 P1 sur branches en attente.

## File d'attente

- `feat/tunnel-prose` (`3abf865`) + `feat/essay-rhythm` (`6c85772`) : prêtes, GF-1 worker fait, bloquées par les ~73 fichiers non committés de la session parallèle (CourseDetailTemplate, EssayTemplate). Merge + GF-1 dès son commit.
- Cron demain 16:12 : deploy API + GF-1 PROD consolidé : harness gf1-batch8, gf1-secteurs, gf1-it7, gf1-it8, gf1-it9, gf1-it10 en `GF_BASE=https://waimia.com`.
- Worktrees : seuls restent essayrhythm, tunnelprose (branches vivantes), validate-it8 (validation) et les 2 worktrees de la session parallèle.
