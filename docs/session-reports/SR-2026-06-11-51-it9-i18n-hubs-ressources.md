# SR-51 — It.9 : i18n hero EN + hubs ressources mergés, essay-rhythm prêt, critique 4,1/5

Date : 2026-06-11 (début de soirée). Orchestrateur : session longue itérative.

## Résultat

It.9 livrée aux 2/3 sur `main` = `2265c85`, **poussé** (`c648e5c..2265c85`). Toujours pas de deploy (quota Vercel, reset demain ~16:03, cron `d374f95b` 16:12).

### Critique it.9 (agent Opus read-only, 15 pages, 30 screenshots)

**4,1/5** (3,9 en it.8). Home FR/EN jugée au niveau swiss editorial cible ; offres/école au palier attendu post-it.8. Punch-list : `/tmp/wmission/critique9/PUNCHLIST9.md`.

### Mergé

1. **feat/i18n-date** (`5469c5e`) : KPI hero `5 j` localisé via l'idiome bilingue interne du composant (`lang === 'fr' ? '5 j' : '5 d'`, `Hero.astro:136`) : la home EN n'affiche plus d'unité française above-fold. Dates listing blog `MM.YYYY` → `JJ.MM` (formateur local à la page, 0 fuite ailleurs).
2. **feat/hubs-ressources** (`c9ca4ed`) : veille-ia, bloc quasi-empty éditorial (« La veille hebdomadaire Waimia démarre... ») conditionné `< 3` items donc auto-extinguible ; cookbooks, featured dark accent CB·01 « Réconcilier HubSpot et l'entrepôt en 5 jours » + grille de 5 (principe « featured + reste » aligné sur /cas et /ecole).
3. **Micro-fix orchestrateur** (`2265c85`) : tokenisation `gap: var(--space-4)` + `letter-spacing: var(--tracking-display)` dans le featured cookbooks, attrapé par le gate token-purity (le worker avait copié les valeurs du pattern /ecole au lieu des tokens ; parité de rendu exacte, `--space-4: 16px`).

### Prêt, non mergé (2 branches en attente du commit de la session parallèle)

- **feat/tunnel-prose** (`3abf865`) : rail méta sticky tunnel + cours (P1 mur de prose).
- **feat/essay-rhythm** (`6c85772`) : `EssayTemplate.astro:400` marge h2 `clamp(48px,6vw,72px)` → `clamp(40px,5vw,56px)` ; cookbook court -27 % de hauteur (5138→3732px, bandes mortes éliminées), essais denses quasi intacts (5974→5894px), drop-cap + accent `§` préservés, 0 fuite EN dans les pages FR.

### Faux départ évité (triangulation worker)

Le 1er worker « rythme cookbook » a REFUSÉ d'éditer : la critique avait localisé le défaut dans `CourseDetailTemplate`, mais le cookbook détail est rendu par `EssayTemplate` (`cookbooks/[...slug].astro:78`). Refus argumenté sources à l'appui, re-cadrage immédiat sur le bon fichier. Leçon dans `tasks/lessons.md` : l'orchestrateur vérifie le mapping page→template (1 grep) avant de nommer le fichier autorisé d'un brief.

## Preuves

- Pipeline sur `2265c85` (worktree validation détaché) : `astro check` 0 errors · build `Complete!` · 7 gates PASS (token-purity re-PASS après micro-fix).
- GF-1 consolidé (chromium isolé, desktop 1440 + mobile 390) : 10/10 : EN `kpis ["+12h","5 d","100%"]`, FR `5 j` conservé, blog 8 dates distinctes JJ.MM (re-sonde innerText après un sélecteur `time` mal câblé), veille `article: true` + `soonVisible: true`, cookbooks `featured: true` + 5 cards, h1 opacity 1 et 0 reveal caché partout.
- Screenshots : `/tmp/wmission/critique9/shots-gf1/` + rapports workers `/tmp/wmission/it9-*/`.

## Suivant

1. Vague it.10 : P2 restants de la punch-list 9 sans collision (monotonie cards offres, respiration about, bande vide hero→liste blog).
2. Merge tunnel-prose + essay-rhythm au commit du chantier variation parallèle, puis GF-1 tunnel/cours/cookbook détail.
3. Cron demain 16:12 : deploy + GF-1 PROD consolidé (5 harness : gf1-batch8, gf1-secteurs, gf1-it7, gf1-it8, gf1-it9 avec `GF_BASE=https://waimia.com`).
