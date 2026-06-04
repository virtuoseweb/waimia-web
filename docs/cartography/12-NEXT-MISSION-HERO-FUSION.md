# 12 — NEXT MISSION : Fusion héros H3/H4 + Wave O + UI bibliothèque

> **Brief auto-suffisant de reprise.** Lis CE fichier en premier, puis `git log --oneline -8`, puis `docs/cartography/11-FUSION-EXECUTION-BRIEF.md`.
> Écrit le 2026-06-03 après livraison vérifiée de DS-core + fusions héros H1 + H2 en prod.

---

## 1. État à la reprise (vérifié, en prod)

| Livré | Commit `main` | GF-1 |
|---|---|---|
| Cartographie (162 comp / 109 pages / 123 tokens) | `ad8eece` | — |
| Brief fusion | `3678322` | — |
| DS cleanup (tokens trim + layers + 3 canaux RGB) | `4e2dece` | ✅ PROD (`#6B6560` live waimia.com) |
| **H1** fusion service (ServiceMasthead→ServiceDetail) | `768b267` | ✅ wrap 1200/1560 distincts, h1 neutre, 0 err |
| **H2** fusion stats (PillarHub→HubStats) | `db5e68f` | ✅ pillar 1560+KeyMetric×4, hub-stats 1200+inline×4 |

- **Origin** : `github.com/virtuoseweb/waimia-web`, branche `main` à `db5e68f` (tout poussé).
- **Décompte héros : 26 → 24** (cible **15**).
- ⚠️ **Session parallèle** sur `feat/contenu` partage le working dir `/Users/simonberos/waimia-web` (a ses propres modifs M tsconfig.json / ?? src/astro.d.ts). **NE PAS toucher** à ses changements. Je travaille en **worktree isolé** `/tmp/wf-ds`.

## 2. Setup worktree (reprise immédiate)

`/tmp/wf-ds` = worktree avec **vrai `node_modules`** (pas symlink) + `@playwright/test`. Il est sur `feat/hero-fusion-stats` @ `db5e68f` (= main tip).

```
cd /tmp/wf-ds
git checkout -- docs/SESSION-HANDOFF-CURRENT.md   # bruit hook session-snapshot, TOUJOURS reset avant git op
git fetch origin && git checkout main && git reset --hard origin/main
git checkout -b feat/hero-fusion-mastheadgeo       # branche H3 off main tip
```

> **Piège récurrent** : `docs/SESSION-HANDOFF-CURRENT.md` est auto-modifié par un hook → `git checkout --` dessus AVANT chaque `git commit`/`rebase` dans `/tmp/wf-ds`, sinon « unstaged changes ».

## 3. PRINCIPE DE FUSION (verrouillé — ne pas dévier)

**1 composant générique qui branche sur `data.type` → N type-ids servis. AUCUN type-id supprimé du catalogue** (la lib garde tout). On colocalise les N markups + N blocs `<style>` **byte-identiques** (classes distinctes → coexistent), registry pointe les N type-ids sur le composant canonique, on supprime les fichiers absorbés. **Zéro mutualisation du markup/CSS divergent** (c'est ce qui évite les régressions ; GF-1 le prouve).

4 touchpoints par type-id : `src/schemas/sections.ts` · `src/lib/section-demos.ts` · `src/lib/section-registry.ts` · `src/components/sections/*.astro`. **Fusion = on touche UNIQUEMENT registry + composant** (schema + demos INCHANGÉS, les type-ids restent).

## 4. H3 — masthead-geo (PROCHAINE MISSION, la plus risquée)

**Fusionner 3 héros « masthead à géométrie SVG »** → 1 composant canonique, 3 type-ids.

| type-id | composant actuel | LIVE via | View Transitions |
|---|---|---|---|
| `hero-offer-detail` | `HeroOfferDetail.astro` (canonique à garder) | `OffresDetailTemplate` (`/offres/<slug>`) | ✅ `transitionId` + `cardTransitionId` |
| `hero-sector` | `HeroSector.astro` (`.sol-hero`) | `SolutionsDetailTemplate` (`/solutions/<slug>`) | ❌ aucune |
| `hero-tech-layer` | `HeroTechLayer.astro` | `TechnologiesDetailTemplate` (`/technologies/<slug>`) | ✅ `transitionId` |

> ⚠️ **Différence clé vs H1/H2** : ici **les 3 sont LIVE** (H1/H2 avaient 1 live + 1 catalogue-only). Donc GF-1 doit couvrir **les 3 pages live réelles** + la **navigation VT** (carte→détail sans flash).

### Avant de specer — LIRE les 3 composants
`HeroOfferDetail.astro` déjà lu (cf §6 « contenu capturé » plus bas). **Lire** `HeroSector.astro` + `HeroTechLayer.astro` dans `/tmp/wf-ds/src/components/sections/`. Identifier pour chacun : le markup SVG (offer=cercles concentriques ; sector=? ; tech=?), le type de label (offer=breadcrumb+tier ; sector=département ; tech=layer), la présence/forme des `transition:name`, la sous-grille (les 3 partagent `1.4fr / 1fr` + lead italique + CTA ink button d'après la cartographie — **à confirmer en lisant**).

### Approche
1. **Canonique = `HeroOfferDetail.astro`** (le plus riche, 2/3 ont des VT). Élargir `interface Props` :
   `data: SectionByType<'hero-offer-detail'> | SectionByType<'hero-sector'> | SectionByType<'hero-tech-layer'>` + garder les props optionnelles VT (`transitionId?`, `cardTransitionId?`, `wrapMax?`, `geoReveal?`, `breadcrumbCurrent?`).
2. `const kind = data.type;` → 3 branches `{kind === 'hero-sector' ? (<…sol-hero…>) : kind === 'hero-tech-layer' ? (<…tech…>) : (<…offer-detail…>)}`.
3. Copier **byte-identique** les 3 markups + leurs 3 blocs `<style>`. **CRITIQUE View Transitions** : préserver `transition:name={`hero-h1-${transitionId}`}` / `hero-img-${transitionId}` / `card-${cardTransitionId}` sur offer ET tech (sinon flash navigation carte→détail). Sector n'a pas de VT → ne pas en inventer.
4. **Piège `.wrap-wide` / wrap local** : si un des 3 a une largeur de wrap locale (ex. `var(--hod-wrap,1320px)` sur offer), **scoper la règle au composant** (`.hero-offer-detail__wrap{…}` déjà scopé par classe → OK ; vérifier que sector/tech n'introduisent pas de `.wrap-wide{max-width}` global qui contamine).
5. Narrowing TS : tout accès à un champ propre à un type DOIT être gardé par `data.type === '<ce-type>'` (sinon `astro check` casse l'union).
6. `section-registry.ts` : importer une seule fois `HeroOfferDetail`, faire pointer les entrées `hero-sector` et `hero-tech-layer` sur `HeroOfferDetail`, supprimer les imports `HeroSector`/`HeroTechLayer`. `git rm` les 2 fichiers absorbés.
7. **NE PAS toucher** : schemas, demos, les 3 templates (`OffresDetailTemplate`/`SolutionsDetailTemplate`/`TechnologiesDetailTemplate` passent déjà les bons props), `docs/SESSION-HANDOFF-CURRENT.md`.

### Tier worker (rule 41)
Composant fusionné plus gros (3× markup SVG + VT) → **spec front-loadée exacte** dans la mission. Démarrer **Sonnet `--effort medium`** (raisonnement déporté sur le brief). Si Sonnet **thrashe** (autocompact 3×) → escalader **Opus 4.8** worker OU déporter : Opus lit/compare en lecture, Sonnet applique des `old→new` exacts (rule 41 §Task-subagent-model). Worker NE COMMIT PAS le merge final / NE PUSH PAS (orchestrateur commit après GF-1).

### GF-1 H3 (obligatoire avant merge)
Harness modèle = `/tmp/gf1-h2.mjs` (à adapter). Routes à auditer :
- `/preview/hero-offer-detail`, `/preview/hero-sector`, `/preview/hero-tech-layer` (parité previews).
- **3 pages live réelles** : un `/offres/<slug>`, un `/solutions/<slug>`, un `/technologies/<slug>` (lister via `ls src/pages` ou les templates).
- Pour chaque : h1 `opacity!==0` + transform neutre (`none` ou `matrix(1,0,0,1,0,0)`), 0 erreur console, screenshot above-fold.
- **VT** : naviguer carte→détail (offer + tech) et vérifier l'absence de flash (h1/img gardent leur `transition:name`). Snapshot avant/après.

Pattern d'exécution GF-1 (sert dist = parité prod) :
```
cd /tmp/wf-ds
npx -y pnpm@9.15.0 build                      # → .vercel/output/static
npx -y pnpm@9.15.0 exec astro check           # 0 errors (les 26 lignes ts(6385) Zod sont des WARNINGS pré-existants, pas des erreurs)
# servir .vercel/output/static sur un port, puis :
cp /tmp/gf1-h3.mjs /tmp/wf-ds/_gf1.mjs && BASE=http://localhost:<port> node ./_gf1.mjs ; rm -f /tmp/wf-ds/_gf1.mjs
```
GF-1 vert → `git checkout main && git merge --ff-only feat/hero-fusion-mastheadgeo && git push origin main`. Vercel auto-deploy. **Re-GF-1 sur prod** (waimia.com) après deploy.

## 5. Suite (séquence anti-double-travail)

1. **H4 — centered ×8** (la grosse) : ~8 type-ids « hero centré » → 1 composant, plusieurs **pages index LIVE** (donc GF-1 sur chaque index). Risque = nombreuses pages consommatrices. Même pattern byte-identique.
2. **Wave O — dédup 13 organisms** (#15, le plus risqué) : `ManifestoAccent` à cataloguer d'abord → hors-home (atlas/ressources) → home FR+EN (12 migrations dans `index.astro`, GF-1 strict). Plan détaillé : `docs/cartography/11` Wave O.
3. **#13 sweep hardcodes** (~204 rgba + 44 hex / 57 fichiers) : **APRÈS** fusions+dédup, sur le set survivant (intégré aux composants consolidés — éviter de tokeniser des fichiers qui seront supprimés/fusionnés).
4. **#16 UI bibliothèque** : `src/lib/library-manifest.ts` (id de section + statut `live|catalogue|MERGE→done` + tags nature/template) + page `/agence/library` qui liste tout avec checklist/ID visibles depuis l'UI (objectif Simon : « je te dirai quoi utiliser pour composer les pages »). DS à variables CSS limitées → réutilisable cross-projet (remplace automatic.css).

## 6. Référence — HeroOfferDetail.astro (déjà lu, structure capturée)

`<section class="hero-offer-detail reveal" transition:name={cardTransitionId ? `card-${cardTransitionId}`}>` → SVG cercles concentriques `<svg class="hero-offer-detail__geo" transition:name={`hero-img-${transitionId}`}>` → `.hero-offer-detail__wrap` (`max-width:var(--hod-wrap,1320px)`) → breadcrumb → tier → `<h1 transition:name={`hero-h1-${transitionId}`}>` → `.hero-offer-detail__sub` (grid `1.4fr 1fr`, max-width 1100px) → lead italic → CTA ink button → meta. Padding `clamp(72px,8vw,112px) 0 clamp(48px,5.5vw,88px)`.

## 7. Garde-fous transverses (rappel)

- **GF-1** preuve empirique avant « validé/fini » (Playwright screenshot + getComputedStyle opacity≠0/transform neutre, sur prod déployée + reveals 100% après scroll).
- **GF-2** Opus ≤ 3 LoC applicatif → fusion = worker (Sonnet/Opus selon thrash). Docs/registry-edits triviaux ≤ 3 lignes OK direct.
- **rule 09** sortie worker = hypothèse → l'orchestrateur relance build + astro check + GF-1 lui-même (jamais sur la seule foi du `DONE.md`).
- **rule 33** tout changement CSS/token/animation/structure rendu = GF-1 Playwright obligatoire.
- Worker : reste dans `/tmp/wf-ds`, **0 push**, **0 re-délégation**, brief = spec exacte. Orchestrateur commit/push après GF-1, « au fur et à mesure » (1 vague = 1 commit ff → main).
- Ne JAMAIS toucher le repo `waimia-v2` (≠ waimia-web). Ne pas toucher les modifs de la session `feat/contenu`.
