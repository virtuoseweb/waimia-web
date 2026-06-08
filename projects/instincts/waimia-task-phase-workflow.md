---
name: waimia-task-phase-workflow
description: Task-based phase tracking — Breaking large initiatives into numbered tasks (T#NN) with state tracking (pending/in-progress/blocked/done), each task owns 1-3 phases
---

# Task-Phase Workflow — waimia-web

## Pattern observé (3+ fois sur 2026-05-29 à 2026-06-06)

Initiatives longues (cartographie DS, perf optimisation, content refactor) se décomposent en **tâches numérotées** (#12, #13, #14, etc.), chacune liée à une **phase** du roadmap + un **statut** (pending / in-progress / blocked / done).

## Structure recommandée

```markdown
## Task #12 — [phase] [nom court]
- **Owner** : orchestrateur ou worker (job ID si background)
- **Phase** : Cartographie / DS Cleanup / Hero Fusion / Content
- **Status** : pending / in-progress / blocked / done
- **Livrables** : description du travail concret
- **Branch** : `chore/ds-cleanup` ou `feat/contenu`
- **Blockers** : liste (ou "None")
```

## Avantages d'instrumentation

1. **Traçabilité** : chaque tâche = 1 problème bien scoped, pas un fourre-tout
2. **Parallélisation** : Task #12 en background Opus, #13 en Task subagent Explore en parallèle
3. **Handoff** : si la session se coupe, reprendre au Task #NN le plus récent sans perte
4. **Review** : chaque Task a un branch distinct → review par commit + phase validation

## Anti-pattern banni

❌ Grande initiative lancée d'un coup sans découpe → Impossible de savoir où on en est, quel worker opère, quelle branche s'applique.

✅ Chaque tâche = 1 branch + 1 statut + 1 livrables claim → Transparent à la relecture.

## Cas vécu (2026-06-05/06)

Cartographie Amploi + DS cleanup + contenus SEO = 3 Task distinctes :
- T#11 (Cartographie atomique) → branch `feat/contenu`, statut done, commit a03e671
- T#12 (DS CSS cleanup) → branch `chore/ds-cleanup`, statut in-progress, worker Opus ID br8cv8hx9
- T#13 (Tokens → CSS vars) → branch `chore/ds-tokens`, statut pending, bloquée par T#12

Sans cette structure, les 3 auraient fusionné en un énorme refactor impossible à naviguer.

## Intégration MEMORY.md

Chaque session commence par lire MEMORY.md :
- Task actif en cours (phase + statut)
- Branches actives (chore/* / feat/*)
- Blockers connus
- Prochaine tâche numérotée libre

Mise à jour après chaque merge :
```markdown
## Current phase
- Task #NN en status Z
- Branch Y
- Blockers (si existent)

## Next phases
- Task #NN+1 description
```
