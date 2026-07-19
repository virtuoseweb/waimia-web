# 🧹 REPO-CLEANUP-MANIFEST — Phase 2 (repo-wide)

> **Pour Claude Code.** Phase 1 (réorg `docs/`) est faite. Ce manifeste couvre le
> **reste du repo**. Objectif : un agent partant de `CLAUDE.md` atteint toute info en
> ≤ 2 sauts, zéro bruit. Branche `feat/repo-cleanup`, commits ciblés, build vert.
> **Supprimer ce fichier une fois Phase 2 close.**

## ✅ Déjà vérifié OK (aucune action)
- `CLAUDE.md` → `docs/README.md` (START HERE) + chemins `strategy/02,49,50` `state/01`
  `directives/02` ✔ (chaîne d'entrée correcte).
- `docs/` foldérisé ; `00-MASTER-PLAN` + `REORG-MANIFEST` archivés ✔.
- `dist/` gitignoré ✔. Images-preuves racine gitignorées **et non trackées** ✔.

## A. Racine — purger les artefacts (gitignorés, non trackés, régénérables)
- **Supprimer les 52 images racine** : `gf1-*`, `v9*-*`, `*proof*`, `sumie-*`, `sol-*`,
  `plateau-*`, `offres-*`, `migrate-*`, `emdash-*`, `brand-forge-*.jpeg`.
  `git ls-files` = 0 → `rm` local sans impact dépôt. (Preuves = artefacts, pas de la doc.)
- `catalog.generated.json`, `design-system.lock.json` : générés → laisser (ou gitignore
  si non suivis et régénérés au build).

## B. `ONBOARDING.md` (racine) — périmé
Guide collaborateur « Florentin » sur `feat/contenu` (contexte vague passée). →
**archiver** : `git mv ONBOARDING.md docs/archive/ONBOARDING-florentin.md`. Si l'onboarding
de collaborateurs reste d'actualité, le réécrire court et générique à la place.

## C. `README.md` (racine) — ajouter le pointeur doc
En tête (après le titre), ajouter :
> 📒 **Documentation projet** : `docs/README.md` = index maître (carte des docs, board
> des chantiers, ordre de lecture). `CLAUDE.md` = garde-fous + règles.

## D. Réduire le bruit historique DANS `docs/` (sans perdre l'historique)
Le levier d'efficacité agent = un **set LIVE court** + le reste **clairement gelé hors du
chemin par défaut**. Ne pas supprimer l'historique utile ; le ranger.
- `session-reports/` (56) : garder `README.md` + les **~5 derniers SR** ; déplacer le reste
  → `session-reports/archive/`. (Journal, lu seulement sur besoin.)
- `visual-audit/` (≈489, tracké git) : **GARDER — mémoire visuelle de l'état réel** (preuves
  GF-1, permet à l'agent de « voir » sans rebuild). **Ne PAS sortir/gitignorer.** Action :
  (1) le `README.md` du dossier est posé (rôle + structure `_current/` + protocole de MAJ) ;
  (2) après l'assainissement SEO, régénérer `_current/` pour les ~28 pages survivantes et
  basculer les campagnes pré-refonte dans `_archive/`. Lecture **à la demande** seulement.
- `audits/` (14), `cartography/` (23), `audit-refonte/` (5), `archive/` : **gelés**, laisser.
  Le README les marque déjà RÉFÉRENCE/ARCHIVE → l'agent ne les ouvre que ciblé.

## E. `tasks/` — finir la consolidation (cf REORG-MANIFEST-DONE §tasks)
- LIVE : `ORCH-STATE.md`, `lessons.md`, `todo.md`. Reste (briefs de vagues, handoff périmé)
  → `tasks/archive/`. Vérifier que c'est fait.

## F. Référencer la doc vivante non-`docs/` dans l'index
Déjà fait : `docs/README.md §4` cartographie `tasks/`, `projects/instincts/`, `skills/`,
`tina/`, `.claude/`. → vérifier que rien d'autre de structurant n'est orphelin
(`grep -rl "^# " skills projects tina --include="*.md"`).

## Vérification finale (preuve GF-1)
1. `astro check` + `npx -y pnpm@9.15.0 build` → `Complete!` (aucun lien doc cassé côté code).
2. `grep -rn "docs/" CLAUDE.md README.md docs/README.md` → tous les chemins existent.
3. Test « ≤ 2 sauts » : depuis `CLAUDE.md`, atteindre `strategy/02`, `state/01`,
   `skills/`, `tasks/ORCH-STATE.md` sans deviner. ✔ attendu.
4. Racine du repo : plus aucune image-preuve, plus de `.md` orphelin (seuls `CLAUDE.md`,
   `README.md`, `CONTRIBUTING.md` subsistent à la racine).
