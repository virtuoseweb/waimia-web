# 04 — Chantier DESIGN / refonte DS (ACTIF, multi-passes — corrige l'erreur « design figé »)

> **Correction de cadrage (2026-06-12).** Le design **N'EST PAS terminé**. `state/02` l'avait
> gelé à tort en « R&D figée, ne pas y toucher » — FAUX. Le DS + le catalogue ont été créés
> **pour refactorer et améliorer largement le design en plusieurs passes**, avec une **passe
> finale Claude Design**. Comme on ne connaît même pas les **sections finales** de certains
> templates (elles seront fixées par la refonte site `strategy/02`), le design ne peut pas être
> « fini ». **Les tâches cochables vivent dans le plan maître `state/02` PHASE P2** (source unique du
> suivi) ; **ce doc = le détail / la philosophie / le #14** (référencé par P2). Méga-chantier de
> référence : `design-system/03-library-strategy` (= #14). Variables : `audits/02-token-coherence`.

## 0. Vision produit (le « pourquoi » — c'est le POC de notre logiciel webdesign)
Waimia = **POC de notre logiciel webdesign interne** (catalogue + DS Studio + bibliothèque). Cible :
un **DS FERMÉ à variables CSS**, façon **ACSS / Frames de Kevin Geary** (getframes.io) mais pour
**notre système Astro** — Tailwind + classes utilitaires custom + variables, où **personnaliser les
variables repeint tout le catalogue** (familles par catégorie de section + variants + déclinaisons).
Inspirations à hauteur de référence : **relume.io, Webflow, tailwindcss.com/plus/ui-blocks, Material
UI/Design, Bootstrap, Figma**. Principe non négociable (`design-system/01-contrat`) : un composant de
section doit reposer sur un **pattern d'un DS figé** (mêmes classes → mêmes variables), **pas sur
plein de variables ad hoc**. Détecter une variable utilisée sur N fichiers ≠ « c'est bon » : il faut
que le composant utilise le **pattern fermé**, sinon c'est de la dette. But : DS fermé, limité,
qui par les variables module le catalogue, les familles, leurs variants et déclinaisons.

## 1. Séquençage vs cash (important)
- **P0/P1 (cash, site honnête, 3 piliers) utilisent le DS EXISTANT tel quel** (propre, ~4,5/5). La
  qualité design s'y applique **par page**, via la **preuve GF-1 visuelle** (screenshot above-fold).
- **La refonte design (#14)** est un **chantier stratégique parallèle** (c'est le produit/boilerplate),
  mais **dépend des sections finales** des templates → **le gros volume (Phase B-E) vient APRÈS** que
  la refonte site ait figé les sections. La **Phase A (consolidation socle, anti-dette, 0 changement
  de rendu)** peut démarrer tôt. **Passe finale Claude Design = à la toute fin.**

## 2. ⚠️ Vérification « ghost » AVANT de continuer (Claude Code, via tes logs/history/cache)
Plusieurs travaux ont été tentés et leur complétion est **incertaine**. Claude Code doit **retrouver
ce qu'il a fait/ghosté** dans ses propres logs/sessions/historique (`~/.claude/`, history, branches,
worktrees, stash) avant de reprendre :
- [ ] **Commit `5924d29` « harmonisation DS Batch 1 »** (fin session B) — **scope inconnu** : `git show 5924d29 --stat`, déterminer ce qui est fait de la Phase A.
- [ ] **Branche/worktree `@theme inline`** tentée ? (`tokens.css:266` ne l'a PAS) → `git branch -a | grep -i 'theme\|inline\|tailwind'`.
- [ ] **`src/lib/section-presets.ts`** : profondeur réelle (hero seulement ?) → le lire en entier + `check-presets`.
- [ ] **Vagues tokens V9d-h** + branche **`feat/ds-coherence-v4b-phantom-color`** (non mergée) : qu'a-t-elle fait ?
- [ ] **`design-system.lock.json` tokenCount** : `106` (state/01) vs `115` (lock courant) — quelle source fait foi ?
- [ ] **Stash `stash@{0}` sur `feat/library-heroes-enrich`** : travail héros bibliothèque jamais évalué.
- [ ] **6 lots `docs/visual-audit/*` committés à la hâte** (SR-55) : doublons / lots intermédiaires à purger.
> Règle : ne RIEN refaire avant d'avoir reconstitué l'état réel (GF-4 triangulation). Capitaliser le constat dans ce doc.

## 3. Méga-chantier #14 — phases (statut réel investigué, source `design-system/03`)
**Phase A — Consolidation socle (EN COURS, partielle) :**
- [ ] A2 emphase serif globale · [ ] A3 adoption `.sec`/`.sec-hd` · [ ] A4 purge tokens orphelins + fusions + `@theme`→vars · [ ] A6 fix `var(--spacing-section)` résiduels.
- [ ] **Cible mesurable** : duplicateGroupCount scoped 280→<50, **tokens 115→~92** (NON atteint), classes scoped 2091→~1200, **0 changement de rendu** (gates verts + GF-1). A1 = fait, A5 = fait (scan scoped dans `gen-ds-registry`).
**Fondation Tailwind v4 (prérequis builder, NON fait) :**
- [ ] Migrer `@theme` mort → **`@theme inline`** pointant `var(--token-maison)` (`tokens.css` : retirer les hex littéraux) pour que le DS Studio repeigne les utilities. Bloque Phase B/C.
**Phase B — Système de variation (DÉMARRÉE, incomplète) :**
- [ ] `sectionBaseSchema` mixin (background/palette/layout/density/effects) · [ ] compléter `section-presets.ts` (au-delà de hero) · [ ] `.sec--layout-*` + déployer `data-palette`/`data-density` (aujourd'hui 2 fichiers) · [ ] route `/preview/[type]/[preset]` · [ ] gate `check-presets` au 6e touchpoint.
**Phase C — DS Studio créatif (NON fait) :**
- [ ] save preset via `POST /api/ds/preset` (réutiliser garde `DS_SAVE_KEYWORD` + pipeline git) → `src/data/ds-presets.json` + bloc `[data-theme]` dans `src/styles/themes.css` · [ ] supprimer reload `loadCatalogType` · [ ] instance overrides.
**Phase D — Production en masse (NON démarrée) :** vagues multi-agents, 40+ presets/catégorie, styles 2010→2026, GF-1 sur CHAQUE preset.
**Phase E — Listing DS Studio exhaustif (NON démarrée).**

## 4. Nettoyage variables CSS — reste-à-faire (source `audits/02-token-coherence`)
- [ ] Vagues perceptibles **différées** : V9d demi-pixels, V9e line-height corps, V9f tracking, V9g durées, V9h collapses.
- [ ] **4 incohérences structurelles à TRANCHER (arbitrage Simon)** : (A) double vocabulaire espacement `--section-*` vs `--spacing-*` ; (B) `--radius-xs` mal nommé ; (C) `--shadow-hairline`≡`--shadow-card-rest` ; (D) `--col-full`.
- [ ] Bugs : `--text-drop-cap` 6vw token vs 8vw fallback ; `tokenCount` du lock désynchronisé.

## 5. Directives design — reste-à-faire
- [ ] **V-TYPO transverse (directive 01)** : `global.css:62-129` h1/h2/h3 encore serif **jamais exécuté en transverse** (vetos permanents : HeroHome `/` + masthead `/solutions`). C'est une passe design réelle non faite.
- [ ] **Awwwards (directive 03) W1/W3/W4** : W1 typo-transverse, W3 recomposition templates secteurs/offres, W4 images stylisées partout. + re-critique it.13 post-deploy (cf `state/02` T-5).
- Dark (directive 02) = CLOSE ; reste 1 P2 `tech-models-table` (33px en-tête↔colonne).

## 6. Itération visuelle pilotée par l'agent — captures (corriger le gitignore)
Aujourd'hui : `docs/visual-audit/` est **tracké** (bien), MAIS le sweep previews écrit dans **`/tmp/wmission/...` éphémère** (perdu) et le `.gitignore` **ignore** `design-system-*.png` (l.42) + `gf1-*.png/.jpeg` (l.73-74) → **les preuves par section/template ne sont pas capitalisées** pour que l'agent lise, comprenne et corrige le design.
- [ ] **Rediriger** le sweep (`scripts/gf1-cloud-sweep.mjs`, `visual-check.mjs`) vers `docs/visual-audit/previews/<type>.png` et `docs/visual-audit/sections/<template>-<section>.png` (chemin NON gitignoré).
- [ ] **Capturer une screenshot par section de chaque template** (above-fold) → l'agent itère dessus (lit → repère le défaut → corrige → recapture). Boucle multi-passes.
- [ ] Assouplir/retirer les patterns `.gitignore` qui bloquent ces captures, OU les nommer pour qu'elles tombent sous `docs/visual-audit/` (non ignoré).

## 7. Re-câblage hérité
- [ ] Re-câbler les pages live (`console`, `manifesto`) sur les nouvelles sections cataloguées (`SR-32`).
- [ ] Migration `SolutionsDetailTemplate` → registry (cf `state/02` T-1).

> **Passe finale = Claude Design** (skill `design:*` / passe dédiée), une fois les sections finales
> figées et les phases A-C avancées. Ce doc se coche `[ ]→[x]` au fil, comme `state/02`.
