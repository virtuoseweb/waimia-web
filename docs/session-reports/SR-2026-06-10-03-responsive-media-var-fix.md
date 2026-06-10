# SR 2026-06-10-03 . Fix responsive systémique (media queries `var()` invalides) + dette overflow mobile

> Session autonome (matin). Mergé sur `main` : `a6c6773`. GF-1 preview Vercel PASS.
> Prod (waimia.com) : promote en attente du reset quota Vercel (cf §Blocker).

## TL;DR

Le test e2e `responsive mobile 375px` était chroniquement rouge en CI. Diagnostic : ce n'était pas une simple dette de 2 pages, mais un **bug CSS systémique** touchant tout le site. **46 media queries** utilisaient `var(--token)` dans leur **condition** (`@media (max-width: var(--wrap-read)) { ... }`). C'est **invalide en CSS** (la spec interdit `var()` dans une condition de media query) : tous les navigateurs **jettent le bloc `@media`**, donc le reflow responsive ne s'appliquait **jamais**. Résultat : overflow horizontal mobile silencieux sur l'ensemble du site (`/offres/conseil` débordait de 213px à 375px), sans aucune erreur de build ni de console.

Corrigé en 3 volets + preuve GF-1 sur preview Vercel. Mergé sur main. Reste : flip d'alias prod, bloqué par le quota Vercel Hobby (100 déploiements/jour épuisé), à faire au reset.

## Cause racine (triangulation)

- `grep -rn "@media[^{]*var(" src/` : **46 occurrences** dans **44 fichiers** (sections, molecules, organisms, templates, pages, `global.css`).
- Tokens concernés : `var(--wrap-read)` (= `900px`, 44×) et `var(--wrap-prose)` (= `720px`, 2×), valeurs lues dans `src/styles/tokens.css:52-53`.
- Pourquoi silencieux : `var()` est valide partout SAUF dans une condition `@media`/`@container` (la spec CSS évalue les conditions avant la cascade, où les customs properties n'existent pas). Le navigateur ignore le bloc entier sans erreur. Build Astro et `astro check` ne détectent rien (CSS syntaxiquement plausible).

## Fix 1 . Substitution littérale dans les conditions `@media` uniquement

- `var(--wrap-read)` → `900px`, `var(--wrap-prose)` → `720px`, **sur les lignes `@media` seulement**.
- **Piège évité** : `var(--wrap-read)` / `var(--wrap-prose)` sont AUSSI utilisés comme valeurs de déclaration valides (`max-width: var(--wrap-read);`) sur 8+ lignes hors `@media`. Un `sed` global les aurait corrompus. Le fix cible `/@media/` uniquement.
- Mécanique : `sed -i '' '/@media/ s/var(--wrap-read)/900px/g; /@media/ s/var(--wrap-prose)/720px/g'` sur les 44 fichiers (worker Sonnet, raisonnement déporté).
- Diff chirurgical vérifié : 43 fichiers, 46 remplacements 1:1, 0 ligne modifiée hors `@media`, 8 usages valides intacts.

## Fix 2 . Overflows mobiles résiduels (pré-existants, indépendants du Fix 1)

Une fois le reflow réactivé, un sweep 375px sur 12 pages a isolé 2 sources restantes (qui débordaient depuis toujours, sans media query du tout) :

- **`StatBlock.astro`** (page `/cas/plateau`) : le layout `grid-3` (`repeat(3,1fr)`) n'avait aucun override mobile (seuls `grid-4` et `split` en avaient). 3 colonnes à 375px + valeurs larges (« 18 M€+ ») qui ne rétrécissent pas sous leur contenu → overflow 88px. Ajout du reflow calqué sur `grid-4` : `≤768px` → 2 col, `≤480px` → 1 col.
- **`agence/design-system.astro` (FR + EN)** : la `.ds-spacing-row` (barres de visualisation des tokens d'espacement, `width:Npx` inline) débordait de 149px. Page de référence interne, non testée par la CI. Fix : `flex-wrap: wrap` + cap barre `60vw` à `≤480px`. Info préservée (nom du token + valeur).

## Fix 3 . Faux-positif du gate `check-token-purity.mjs`

Le gate flaggait les `max-width: 900px` des **conditions `@media`** comme « doit être `var(--wrap-read)` », alors que `var()` y est invalide. Faux-positif (46 hits) exposé par le Fix 1. Correction de principe : **skip des lignes `@media`** dans le scan des littéraux property-anchored (2 lignes). Le gate distingue désormais déclaration (doit être token) et condition media (littéral légitime).

+ Commentaire d'avertissement « footgun » ajouté sur `tokenize-literals.mjs` (auto-fixer manuel, hors CI) : il a la même mapping `max-width:900px→var(--wrap-read)` et re-casserait les 46 queries s'il était relancé sur des blocs `@media`. À durcir (skip `@media` dans `applyMappings`) avant tout usage futur.

## Preuve GF-1 (rule 33 / GF-1 empirique)

**Local (build dist + serve-dist parité-prod + Playwright) :**
- Sweep overflow 375px sur 12 pages : **12/12 = 0px** (avant : `/offres/conseil` 213px, `/cas/plateau` 88px, `/agence/design-system` 149px).
- Desktop 1280px **non régressé** : `hero-hub-stats__grid` 4 col, `svc-row` `110px 770px 180px 60px`, `stat-block grid-3` 3 col, 0 overflow.
- Mobile 375px reflow vérifié par `getComputedStyle` : `hero-hub-stats__grid` 2 col, `svc-row` 1 col, `stat-block grid-3` 1 col.
- `h1 /offres/conseil` mobile : opacity 1, transform `matrix(1,0,0,1,0,0)` (neutre).
- Suite e2e complète : **45 passed / 9 skipped / 0 échec** (le test `responsive mobile 375px` = vert).
- Gates : `astro check` 0 err, build `Complete!`, touchpoints, token-purity, no-emdash PASS.

**Preview Vercel réelle (prod-chain build→deploy→navigateur, `dpl_A27mDcfQ`, tree byte-identique à main `9ade9f15`) :**
- Mobile 375px, 5 routes (`/offres/conseil`, `/cas/plateau`, `/`, `/agence/design-system`, `/solutions/finance`) : **5/5 = 0px**.
- `h1` mobile : opacity 1, transform neutre.
- Desktop 1280px : 0px, `hero-hub` 4 col, `stat-block` 3 col intacts.

## Décisions / arbitrages tranchés (autonomie)

1. **Scope = bugfix, pas redesign** : restaurer un reflow déjà écrit (Fix 1) et combler 2 trous responsive (Fix 2) sont des **corrections de défaut**, pas du nouveau design. DS-frozen non violé (0 nouveau token ; `60vw`/`max-content` ne sont pas des tokens de design). CI traite déjà « mobile sans overflow » comme une barre de qualité.
2. **Page interne `/agence/design-system` corrigée aussi** (alors que non CI-gating) : laisser un overflow de 149px sur une page du site est négligé. Fix contenu et borné. Alternative écartée : la documenter et l'ignorer (choisi : la corriger, coût marginal nul dans le même worker).
3. **Gate corrigé plutôt que contourné** : le faux-positif token-purity aurait pu être « réglé » en re-tokenisant (re-cassant le responsive). Choix correct : corriger le gate (il ne comprenait pas les conditions `@media`). Le gate gagne en exactitude.
4. **Merge sur main malgré le quota prod** : le garde-fou « pas de merge visuel sans preview Vercel GF-1 » est satisfait (GF-1 preview PASS sur tree byte-identique). Le flip prod est une étape d'infra distincte, légitimement séparée.

## Blocker . Quota Vercel Hobby (prod-promote en attente)

- Le `build-rate-limit` (builds/fenêtre) a brièvement levé → la preview `dpl_A27mDcfQ` a buildé → GF-1 preview PASS.
- Mais le push prod `a6c6773` a re-déclenché le `build-rate-limit`, ET le `vercel promote` (qui crée un déploiement `action:promote`) bute sur **`api-deployments-free-per-day`** (> 100 déploiements/24h, code 402). Les ~20 déploiements nocturnes + ceux du jour ont épuisé le quota.
- Lever ces quotas = upgrade Pro = **paiement → interdit** (garde-fou).
- **Action au reset** (~24h / minuit UTC) : `vercel promote dpl_A27mDcfQNdNNGrnJzdgpo5wvhq5v --yes` (réutilise l'artefact byte-identique, 0 nouveau build → contourne le build-rate-limit) puis GF-1 prod waimia.com 375px. Tâche #30. Lié au contournement validé en W1.5 (cf mémoire `vercel-build-rate-limit-promote`).
- Note : les commits docs/SR ne changent pas le `dist/` (hors build site) → `dpl_A27mDcfQ` reste un artefact site-identique à main même après ce rapport ; le promote au reset servira bien le bon site.

## Fichiers

- 43 composants/pages/`global.css` (Fix 1, substitution `@media`).
- `src/components/sections/StatBlock.astro` (Fix 2, grid-3 reflow).
- `src/pages/agence/design-system.astro` + `src/pages/en/agence/design-system.astro` (Fix 2, ds-spacing).
- `scripts/check-token-purity.mjs` (Fix 3, skip `@media`) + `scripts/tokenize-literals.mjs` (commentaire footgun).
- Total : 46 fichiers, `+64 / -46`.

## Capstone . Gate anti-régression (commit `00e2b0a`, CI verte)

Pour que cette classe de bug ne puisse **jamais** récidiver silencieusement (GF-3 : transformer le fix en prévention), ajout d'un gate CI dédié :

- `scripts/check-media-query-var.mjs` : scan `src/` (`.astro` + `.css`), regex `/@(media|container)[^{]*var\(/` par ligne, `exit 1` si un seul hit. Cycle PASS→FAIL→PASS vérifié (302 fichiers, 0 hit actuel).
- Câblé dans `.github/workflows/ci.yml` après le gate token-purity. **CI main `00e2b0a` verte** : step `Gate media-query (anti var() en condition @media): success` (+ Build astro + E2E 45/0).
- **Effet de bord bénéfique** : ce gate neutralise aussi le footgun `tokenize-literals.mjs` au niveau CI (si l'auto-fixer ré-introduisait `var()` en `@media`, le gate échouerait). Le durcissement du tool lui-même devient donc optionnel (défense en profondeur).

## Suites

- **#30** : promote prod (`vercel promote dpl_A27mDcfQ`) + GF-1 prod au reset du quota Vercel (`api-deployments-free-per-day`, ~24h).
- Reprise des waves registry (1.6 Tunnel, etc.) : nécessite des previews Vercel → débloqué au reset du quota.
