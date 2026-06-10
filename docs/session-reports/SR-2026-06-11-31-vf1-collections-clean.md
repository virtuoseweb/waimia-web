# SR-2026-06-11-31 · V-F1 : nettoyage collections (25 → 19), archives, guarantees en TS

> Worker Fable 5 (worktree `.worktrees/vf1clean`, branche `feat/vf1-collections-clean` `db9fb25`, mergée main `00cc355`, push `255502c`). Contre-vérifié orchestrateur (rule 09) : 0 getCollection des collections retirées (grep), 19 defineCollection, archives présentes, gates relancés.

## 1. Livré (verdicts docs/40 §1)

- **Archivées** (MDX déplacés `docs/archive/content/`) : `pages` (1, + route bienvenue/[...slug] supprimée, 0 page générée), `knowledgeBase` (10, 0 consumer), `brandVoice` (1, 0 consumer).
- **Migrée TS** : `guarantees` → `src/data/guarantees.ts` (pattern R7a : ids stables, `GUARANTEE_BY_ID`), prêt pour V-F3/V-F4.
- **Purge MDX** : painPoints (12) + proofPoints (15), migration TS déjà faite en R7a ; dossier `newsletter/` vide supprimé.
- **Pages mortes** : `archive.astro` + `agence/hero-lab.astro` supprimés, 301 ×2 dans astro.config.mjs + re-ciblage `/ressources/cas/virtuoseos` → `/` (anti-chaîne 301).
- Gate `check-content-refs.mjs` adapté (ids guarantees.ts validés).
- `tunnels` : 0 élagage (les 20 entrées sont toutes rendues) ; l'élagage par référence d'offre = V-F4.

## 2. Preuves (iso-rendu GF-1)

- Build avant 607 / après 605 pages, Complete! les deux. **Diff dist normalisé = 7 entrées, toutes justifiées** (les 2 pages supprimées + sitemap −2 URLs + llms.txt −2 sections) ; **0 delta sur toutes les pages restantes**.
- Sondes DOM paired (dist new vs ref) sur /cas, /offres/composable-pilot, /agence/design-system : computed styles, textes, bodyLen identiques.
- Gates : astro check 0 errors · 7 gates PASS post-merge.

## 3. Restes documentés

Migrations .astro→MDX (brain-circuit, cookbooks, livre-blanc) reportées (changeraient le rendu, contraire à l'iso-rendu de cette vague) ; liens entrants vers pages 301 (sitemap.ts:484, carte hero-lab dans design-system) à nettoyer en V-F6/recomposition ; `offre_label_map` du tunnel = V-F4.

## 4. Incident process orchestrateur (capitalisé)

Un `cd && git merge` dont le cwd n'a pas persisté a fait atterrir les merges du batch sur la branche du worker au lieu de main. Détection : reflog main muet + « Already up to date » suspect. Réparation : reset branche worker + re-merge via `git -C` chemins absolus. Règle : git multi-worktree orchestrateur = `git -C` TOUJOURS (tasks/lessons.md).

> **Addendum GF-1 PROD (01:32)** : push `255502c`, live 01:30 (poll). Sondes : `/archive` 301, `/agence/hero-lab` 301, home 200 + h1 computed opacity 1.
