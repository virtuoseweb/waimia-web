# SR 2026-06-10-04 . Overflow mobile résiduel : sweep systématique 438 routes → 0/438

> Session autonome (matin, suite de SR-03). Branche `fix/responsive-residual` : `df63c21` + `2e47195` + `a6c9388`.
> GF-1 local (build dist + serve-dist parité-prod + Playwright) : 0 overflow sur 438 routes. Merge prod conditionné au reset quota Vercel (preview GF-1, cf §Statut).

## TL;DR

SR-03 a corrigé le bug systémique des media queries `var()` invalides (46 queries) et validé 5 routes + la suite e2e. Mais le test e2e responsive ne couvrait que **2 routes** (`/offres/conseil`, `/cas/plateau`), laissant passer des overflows mobiles résiduels sur des pages **bespoke** (markup inline, hors templates/catalogue).

Un **sweep Playwright systématique sur les 438 routes publiques** à 375px a isolé exactement **7 routes en overflow**. Toutes diagnostiquées empiriquement (scrollWidth réel + chaîne d'ancêtres, pas à l'œil), corrigées, re-vérifiées : **0/438 après fix**. Deux classes de bug, plus un faux-départ instructif (le mega-menu, red herring). Test e2e responsive étendu de 2 à 11 routes (prévention GF-3).

## Méthode . Le sweep systématique (pourquoi)

SR-03 a validé un échantillon (5 routes) + la suite e2e. Le trou : les pages **bespoke** (`/manifesto`, `/console`, etc.) composent leur markup à la main (grilles `grid-template-columns` en style **inline**), hors du catalogue de sections testé. Un échantillon ne les attrape pas.

Sweep = `dist/client` → 438 routes publiques (hors `/preview`, `/components`, `/categories`) → Playwright 375px → `documentElement.scrollWidth - clientWidth`. Coût : ~90 s. Résultat : 7 routes > 1px. Toutes les autres (431) déjà à 0 (le fix media-var de SR-03 + les templates catalogués tiennent).

## Vague 1 . `/agence/methode` + `/manifesto` (FR) — commit `df63c21`

- **MethodeProcessDiagram.astro** : le diagramme SVG forçait `min-width: 560px` à `≤600px` (héritage desktop). Passé en `width:100%; min-width:0; max-width:100%`. `/agence/methode` 375px → 0px.
- **manifesto.astro** : 5 grilles éditoriales avec `grid-template-columns` en style **inline**. Coupable principal isolé par le diagnostic de chaîne : la grille `400px 1fr` (section Writing) — colonne **fixe** 400px > viewport 360px → pousse la 2ᵉ colonne à `left=460` → `scrollWidth=530` (overflow 170px).

### Faux-départ instructif (rule 09 a payé)

Un premier diagnostic accusait `.mega-featured` (mega-menu, ~572px de large, listé au bord droit). **Test live avant édition** : injecter `display:none` sur `.mega` ne changeait **rien** au scrollWidth (530 → 530). Le mega est `position:fixed` → **ne contribue pas** au scroll overflow. Le worker précédent (session antérieure) avait justement tenté `.mega{display:none}` sans effet : reverté ici. Le vrai coupable (grille `400px 1fr`) n'a été confirmé qu'en traçant l'élément `left=460,right=530` jusqu'à sa grille parente. **Leçon : tester le fix en live (injection CSS) AVANT d'éditer, surtout quand un suspect « évident » existe.**

Fix : extraction des 5 `grid-template-columns` inline → classes scopées `.mf-grid--*` + media query `≤768px` → 1 colonne. 0 `!important` (l'extraction du inline suffit), 0 nouveau token. Desktop intact (3 col / 1:2 / 3 col / 2 col / 400px 1fr).

## Vague 2 . Les 6 routes restantes — commit `2e47195`

| Route | Overflow | Coupable | Fix |
|---|---|---|---|
| `/console` | 256px | grilles inline (`1fr 1fr`, `repeat(5,1fr)`, `280px 1fr`, `1.2fr 1fr`) | extraction → `.cn-grid--*` + reflow ≤768px (card `overflow:hidden` préservée) |
| `/en/console` | 209px | idem (jumeau EN) | idem |
| `/en/manifesto` | 167px | 5 grilles inline (jumeau EN de `manifesto.astro`) | idem `.mf-grid--*` que le FR |
| `/ressources/blog/note-3…` | 148px | `.essay-toc` (grid item `min-width:auto` ne shrink pas sous min-content) | `min-width:0` sur `.essay-toc`/`.essay-prose` + `overflow-wrap:anywhere` sur `.toc-link` |
| `/ressources/cookbooks/claude-skills-tutorial` | 100px | `<pre>` de code long sans `overflow-x` | `.essay-prose :global(pre){overflow-x:auto;max-width:100%}` |
| `/ressources/cookbooks/mcp-server-deploy` | 55px | idem `<pre>` | idem |

Deux fichiers touchés pour les 3 routes essay (template partagé) : `EssayTemplate.astro` + `TableOfContents.astro`. Fix universel (bénéficie à tout futur article avec TOC long ou bloc de code).

Chaque fix **prouvé en live** (injection CSS → re-mesure scrollWidth) avant édition : console 256→0, en/console 209→0, essay 148/100/55→0.

## Orchestration

Diagnostics empiriques (Playwright `evaluate`, scripts jetables) menés par l'orchestrateur (triangulation, autorisé). Édition du code applicatif (> 3 lignes) déléguée à **3 Task subagents Sonnet séquentiels** (raisonnement déporté : old→new exacts fournis) — rule 45 §worktree-isolation : séquencés (pas parallèles) car le tree est partagé. Briefs avec interdictions dures (0 git, 0 re-délégation, fichiers nommés). Chaque diff re-vérifié (rule 09) avant build.

## Preuve GF-1

- **Re-sweep 375px post-fix : 0/438 routes overflow** (était 7). Overflow mobile éliminé à l'échelle du site.
- **Desktop 1280px** (routes touchées) : 0 overflow, grilles d'origine intactes (`/console` 2/5/2/2 col, `/en/manifesto` 3/2/3/2/2 col), `h1` reveal → opacity 1, transform `matrix(1,0,0,1,0,0)` après animation.
- **Gates** : touchpoints, token-purity, no-emdash, media-query-var PASS ; `astro check` 0 errors.
- 0 nouveau token (`min-width`/`overflow-x`/`max-width`/`overflow-wrap` = propriétés structurelles, pas des tokens de design), 0 `!important`, 0 em-dash.

## Prévention (GF-3) — commit `a6c9388`

Test e2e responsive `templates.spec.ts` étendu de **2 → 11 routes** (pages bespoke + 1 représentant par template à risque : grilles inline, TOC essay, blocs de code). Vérifié : 11/11 à 0px sur le build dist. Barre anti-régression : tout ajout futur à cette liste doit rester à 0px.

## Décisions / arbitrages tranchés (autonomie)

1. **Sweep exhaustif plutôt qu'échantillon** : après le trou révélé par SR-03, tester les 438 routes (coût 90 s) garantit l'absence de zone d'ombre. Choix : exhaustivité > échantillon pour une classe de bug silencieuse.
2. **Reflow 1 colonne ≤768px pour toutes les grilles bespoke** : choix de robustesse éditoriale (pages narratives denses, 1 col mobile = standard lisible) plutôt qu'un breakpoint plus fin par grille (sur-ingénierie). Desktop strictement préservé.
3. **Card `overflow:hidden` des consoles NON reflowée** : elle est déjà clippée (ne déborde pas) et son design 2-panneaux est intentionnel. Reflow inutile = risque de régression visuelle. Laissée intacte.
4. **Fix essay au niveau du template** (`min-width:0` + `pre{overflow-x:auto}`) plutôt que par article : la cause est structurelle (grid item + blocs de code), le fix template bénéficie à tous les articles présents et futurs.
5. **`overflow-wrap:anywhere` plutôt que masquer le TOC sur mobile** : préserve l'utilité du sommaire sur petit écran (il reflow en `position:static` sous le titre), au lieu de le supprimer.

## Statut merge — ✅ MERGÉ PROD

- **PR #36 mergée sur `main`** (`2094836`). Le quota Vercel s'était reset entre-temps → pipeline preview→merge→prod complet.
- **GF-1 triangulé sur 3 niveaux** : local (serve-dist, 0/438) + **preview Vercel** (`waimia-gavrflksz`, 0/11, classes fix présentes) + **prod `waimia.com`** (0/11 à 375px après déploiement `2094836`).
- CI PR #36 verte (Build astro 3m17s, E2E Playwright 2m56s incl. test responsive 11 routes, gf1-sweep 5m7s, Vercel deployments).
- Clôt #30 (promote prod responsive + GF-1 prod). Le bug responsive est éradiqué de bout en bout.

## Fichiers

- `src/components/svg/geometric/MethodeProcessDiagram.astro` (vague 1)
- `src/pages/manifesto.astro` (vague 1)
- `src/pages/en/manifesto.astro`, `src/pages/console.astro`, `src/pages/en/console.astro` (vague 2, grilles)
- `src/components/templates/EssayTemplate.astro`, `src/components/ui/molecules/TableOfContents.astro` (vague 2, essay)
- `tests/e2e/templates.spec.ts` (prévention)
