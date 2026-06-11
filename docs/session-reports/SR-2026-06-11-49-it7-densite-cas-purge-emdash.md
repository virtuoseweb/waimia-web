# SR-2026-06-11-49 · It.7 : densité pages cas + purge U+2014 src/lib + micro-fix type ds-studio

> Critique it.7 (orchestrateur, zooms viewport sur /cas/northbound + home) : 3 défauts mesurés sur les pages cas, et un trou de gate révélé par le label home « Acte IV — Les preuves ».

## Vague casedensity (mergée `549fef5`, commit `a3ddedc`)

- **Rectangle gris vide** (~700×220) = cellules orphelines de la grille `auto-fit` de problems-grid quand 4 cartes tombent sur 3 colonnes (northbound, caserne) → colonnes pilotées par le nombre de cartes (`--problems-grid-cols`, 4→2×2) + responsive. Plus aucune cellule morte.
- **method-timeline demi-largeur morte** (719px de vide à droite) → grille 3 colonnes : numéro serif italique accent (langage metric-shift) | corps 52ch | meta mono alignée droite. Pleine largeur sur cas ET secteurs.
- **Blancs verticaux** : padding problems-grid `--section-loose`→`--section-base`.
- Le merge ort a combiné proprement avec A2/A3 session parallèle (sec-base/sec-base-h2 vérifiés présents post-merge, 70 occurrences HEAD).

## Vague emdashlib (mergée `820329a`, commit `c281e0c`)

- Trou de gate : `check-no-emdash` ne couvrait pas `src/lib/` → 50 chaînes user-facing avec U+2014 (demos 35, registry 8, cards cas 2, hero-atlas 2, emails 3) purgées par ponctuation contextuelle (étiquettes → ` · ` idiome kicker, appositions → `:`, incises → `,`/parenthèses). Gate ÉTENDU à src/lib (.ts, ignoreComments).

## Micro-fix orchestrateur (`9e998f7`, type-only 1 ligne)

`ds-studio.astro:264` : le type local de `stats` ne déclarait pas `scopedDuplicateGroupCount`, pourtant émis par `gen-ds-registry.mjs:290` et présent dans le JSON (276). Seule erreur astro check, confirmée par 2 workers indépendants. Usage l.878 déjà correct.

## Incidents process capitalisés (lessons.md)

- **cwd persistant vers un worktree** = 3 faux diagnostics en cascade (merges « Already up to date » ×3, faux « sec-base perdu au merge », fausse « réécriture de main ») : règle = `git -C` explicite pour toute commande git d'orchestration, chemins absolus pour les vérifs.
- **Chaînes shell de validation** : `;` au lieu de `&&` après astro check a masqué l'erreur ds-studio au cycle sectordiff. Règle = exit code explicite + ligne « N errors » extraite (strip ANSI).

## Preuves (orchestrateur, rule 09)

- astro check `- 0 errors` (CHECK_EXIT=0) + build `Complete!` + 7 gates PASS (no-emdash version étendue).
- GF-1 local : northbound 0 rectangle vide + mt step 1376px (pleine largeur) + `__sn`/`sec-base` présents + h1 opacity 1 + 0 reveal caché + 0 em-dash ; services-b2b non-régression (mt 1376px, 0 em-dash) ; home 0 em-dash ; mobile 390 colonne unique (358px), 0 reveal caché. Screenshots : method-timeline 3 colonnes dense (J1→T3 2026).

## Deploy

Prod toujours gelée (quota Vercel Hobby, SR-47). Deploy consolidé it.6+it.7 + GF-1 prod au reset (~16h 2026-06-12).
