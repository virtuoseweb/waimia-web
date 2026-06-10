# SR-2026-06-10-13 · Hygiène DS lot E : 4 tokens + substitutions var() codebase-wide (task #19, Wave 4.2)

> Worker Sonnet worktree `.worktrees/hygiene`, commit `2e01bc0` mergé sur main. 52 fichiers, +121/−113.

## 1. Livré

4 valeurs récurrentes promues en tokens dans `src/styles/tokens.css`, puis substituées partout (hors fichiers réservés à la mission APPROX parallèle) :

| Token | Valeur | Occurrences substituées |
|---|---|---|
| `--radius-base` | 6px | 26 (3 CSS externes + 23 inline `style=`) |
| `--radius-card` | 10px | 6 (console.astro FR+EN) |
| `--dur-trim` | 220ms | 59 transitions/animations (hors conditions `@media`, footgun connu) |
| `--text-body-base` | 16px | là où applicable (dont `.about-facts dd`) |

`design-system.lock.json` régénéré : 110 tokens, 0 token imprévu.

## 2. Pushback worker conservé : `start-1..8` NON supprimés

Le brief supposait que les classes `start-1..start-8` de `grid.css` étaient des no-op à supprimer. Le worker a démontré le contraire : ce sont des positionnels réels (`grid-column-start: 1..8`), les supprimer changerait le comportement. Verdict vérifié par l'orchestrateur (grep `grid.css:79-100`) et **conservé**. C'est le comportement attendu d'un worker : contester le brief avec preuve plutôt qu'exécuter aveuglément.

## 3. Reporté (hors scope volontaire)

Les `220ms` de `src/pages/solutions/index.astro` FR+EN : fichiers réservés à la mission APPROX qui tournait en parallèle (anti-collision worktrees). À reprendre dans un prochain lot d'hygiène.

## 4. Preuves (worker + contre-vérif orchestrateur indépendante)

- Gates **relancés par l'orchestrateur** dans le worktree : `check-token-purity` PASS · `check-token-lock` PASS (110, 0 nouveau) · `check-media-query-var` PASS (304 fichiers) · `check-no-emdash` PASS.
- Équivalence rendue : valeurs computed **identiques** main vs hygiène sur 3 sondes (`.btn` border-radius 2px sur /comparer, h1 /secteurs opacity 1 / fs 158.4 / transform neutre, card console 8px).
- `build` Complete!
