---
name: waimia-worktree-parallel-phases
description: Worktree isolation for parallel task phases — Each Task or long-running worker gets isolated git worktree to avoid file conflicts when running simultaneously
---

# Worktree Isolation for Parallel Phases — waimia-web

## Pattern observé (3+ fois sur 2026-05-29 à 2026-06-06)

Quand N tâches parallèles écriraient dans les mêmes fichiers (ex: `src/styles/tokens.css`, `src/lib/section-registry.ts`), créer **1 git worktree par tâche** pour éviter les conflits.

## Protocole

```bash
# Main worktree = branche principale (ex: main)
cd /Users/simonberos/waimia-web

# Tâche #12 (DS cleanup) → worktree isolée
git worktree add --detach .claude/worktrees/task-12-ds-cleanup origin/main
cd .claude/worktrees/task-12-ds-cleanup
git checkout -b chore/ds-cleanup

# (Dans la même session) Tâche #13 (Tokens) → autre worktree
cd /Users/simonberos/waimia-web
git worktree add --detach .claude/worktrees/task-13-tokens origin/main
cd .claude/worktrees/task-13-tokens
git checkout -b chore/ds-tokens

# Les 2 peuvent tourner en parallèle sans collision
# Main = surveille le build + merge orchestration
```

## Avantages

1. **Pas de file lock git** — chaque worktree = repo isolé, pas de `git checkout` qui bloque l'autre
2. **Modifs fichiers indépendantes** — `src/styles/tokens.css` peut être modifiée en T#12 ET T#13 simultanément sans collision locale
3. **Builds isolés** — `npm run build` dans T#12 ne voit pas les fichiers incomplets de T#13
4. **Merge granulaire** — chaque tâche fini → cherry-pick ou rebase la branche vers main

## Anti-pattern banni

❌ Deux tâches longues sur la même branch checkout → `git checkout` au milieu échoue, build cassé, perte temps attente.

✅ Chaque tâche → worktree isolée, 2 builds parallèles, merges indépendants.

## Cleanup post-merge

```bash
# Une fois T#12 mergée à main
cd /Users/simonberos/waimia-web
git worktree remove .claude/worktrees/task-12-ds-cleanup

# T#13 peut continuer dans sa worktree indépendamment
```

## Cas vécu (2026-06-05/06)

Cartographie Amploi (T#11, cartography/docs) + DS cleanup (T#12, chore/ds-cleanup) tournaient parallèlement :
- T#11 écrivait dans `src/content/offres/*/` + `docs/cartography/`
- T#12 écrivait dans `src/styles/css-core.css` + `src/lib/section-registry.ts`
- Zéro collision grâce aux worktrees isolées
- T#11 mergée (cherry-pick a03e671 à main), T#12 continue dans sa worktree sans interruption

**Sans worktrees** : aurait fallu attendre T#11 done → merge → checker main → lancer T#12 = sériel.

**Avec worktrees** : parallèle native, T#11 et T#12 exécutées en même temps par des workers indépendants.

## Intégration avec Task-Phase-Workflow

Chaque Task #NN actif en `in-progress` doit avoir une worktree :
```markdown
## Task #12
- **Worktree** : `.claude/worktrees/task-12-ds-cleanup`
- **Branch** : `chore/ds-cleanup` (créée dedans)
- **Status** : in-progress
```

À la fin de la session, documenter dans MEMORY.md le chemin worktree actif pour reprise post-coupure.
