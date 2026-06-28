# 04. Blueprint #40 : frontières packages monorepo (ds-studio / catalogue / builder / mcp / kernel)

> Statut : BLUEPRINT (architecte, lecture seule). Aucun code déplacé par ce doc.
> Mesuré le 2026-06-28 sur la branche `worktree-1782505856-86810`. Tout chiffre = `fichier:ligne` ou commande grep.
> Source de vérité du sujet « packages / frontières monorepo » (rule 59). `docs/archive/40-VISION-FINALE.md` est archivé, ne pas réutiliser.
> Lié : `audits/02-section-colocation-38.md` (#38 co-location), `state/02-plan-execution-claude-code.md` (#38 in_progress, #40 pending).

## 0. État actuel (point de départ)

- **1 seul package**, pas de workspace : `package.json:2` `"name": "waimia-web"`, `"type": "module"` (`package.json:3`). `pnpm-workspace.yaml` ABSENT (vérifié `ls` → « no pnpm-workspace.yaml »), dossier `packages/` ABSENT (`ls packages/` → « no packages/ dir »).
- `packageManager` = `pnpm@9.15.0` (`package.json`), `engines.node >=22.12.0`.
- Astro 6 (`astro ^6.1.9`), build SSG (`output: 'static'` + `@astrojs/vercel`), React 18 islands, Tailwind v4 (`@tailwindcss/vite`), Zod 4.
- Le **MCP est déjà standalone** : `mcp/waimia-catalogue-server.mjs` ne fait AUCUN `import` du code `src/` ; il lit les artefacts générés au runtime via `fs` (`mcp/waimia-catalogue-server.mjs:25` `import { readFileSync }`, `:39` `MANIFEST_PATH = dist/client/library/manifest.json`, `:41` `TOKENS_PATH = src/styles/tokens.css`, `:106` lit `dist/client/library/section/<type>.json`). C'est le modèle cible de découplage.

## 1. Carte des frontières (packages proposés)

Ordre = du plus isolé (feuille) au plus couplé (hub). 6 packages + 1 app hôte.

### `@waimia/mcp` (DÉJÀ extractible, package témoin)
- **Fichiers** : `mcp/waimia-catalogue-server.mjs`, `mcp/README.md`.
- **API publique** : binaire serveur stdio MCP (`McpServer`, `:29`).
- **Dépendances** : `@modelcontextprotocol/sdk`, `zod`, `node:fs/path/url` UNIQUEMENT. **0 dépendance vers les autres packages** (consomme `dist/client/library/*.json` + `src/styles/tokens.css` par chemin, pas par import). C'est la feuille parfaite.
- **Note** : il dépend de l'ARTEFACT de build de l'app hôte (le `dist/`), pas de son code. Frontière propre par construction.

### `@waimia/ds-tokens` (feuille pure)
- **Fichiers** : `src/styles/tokens.css` (`:292` `@theme`), `src/styles/fonts.css`, et l'helper de parsing `scripts/lib/ds-tokens.mjs`.
- **API publique** : le fichier CSS `tokens.css` (consommé par Tailwind v4 via `@theme` et par le MCP via `fs`) + la fonction de parse de `ds-tokens.mjs`.
- **Consommateurs** : `scripts/apply-ds-export.mjs`, `src/integrations/ds-save-dev.mjs` (`grep ds-tokens` → ces 2 + self). Le CSS est importé par `src/styles/global.css:7` (`@import "./tokens.css"`).
- **Dépendances** : aucune (feuille). 

### `@waimia/ds-kernel` (le NOYAU, contrat de section)
- **Fichiers** :
  - Schémas : `src/schemas/sections.ts`, `src/schemas/page-document.ts`.
  - Modules de contrat : `src/lib/section-facets.ts`, `src/lib/section-slots.ts`, `src/lib/section-presets.ts`, `src/lib/section-colorschemes.ts`, `src/lib/section-variants.ts`, `src/lib/section-archetypes.ts`, `src/lib/page-document.ts`, `src/lib/page-document-frontmatter.ts`.
  - Sous-contrats co-localisés : `src/sections/_shared/base.ts`, `subschemas.ts`, `types.ts`.
- **API publique** : `sectionSchema`, `SectionType`, `getSlots`, `listPresets`, `COLOR_SCHEMES`/`schemeProps`, `validatePageDoc`, `frontmatterToPageDoc`, `pageDocToFrontmatter`.
- **Dépendances** : `@waimia/ds-tokens` (indirect, via valeurs), `zod`. **⚠️ contrainte dure** : `src/schemas/sections.ts:8` `import { z } from 'astro:content'` et `src/schemas/page-document.ts:14` idem → le kernel est aujourd'hui PINÉ au runtime Astro (cf §4).
- **⚠️ N'INCLUT PAS `section-registry.ts`** (voir package suivant : c'est la frontière clé à tracer).

### `@waimia/sections` (composants + registry, le HUB lourd, reste proche de l'app)
- **Fichiers** : `src/components/sections/*.astro` (**168 composants**, `ls src/components/sections/*.astro | wc -l` → 168 ; le « 171 » du brief était approximatif), `src/lib/section-registry.ts`, `src/lib/section-demos.ts`, `src/lib/library-manifest.ts`, `src/lib/mcp-manifest.ts`, et les modules co-localisés pilotes `src/sections/{media-bento,hero-social-proof,eeat-panel}/` (#38).
- **API publique** : `SECTION_REGISTRY`, `listSections`, `listCategories` ; `SECTION_DEMOS` ; `getUsage` ; le builder de manifest MCP.
- **Dépendances** : `@waimia/ds-kernel`, `@waimia/ds-tokens`, runtime Astro/Vite (obligatoire).
- **⚠️ Pourquoi le registry vit ICI et pas dans le kernel** : `section-registry.ts` importe **167 composants `.astro`** (`grep -cE "components/sections/.*\.astro" src/lib/section-registry.ts` → 167). C'est le point qui ancre tout l'arbre au runtime Astro. Le séparer du kernel garde le kernel (schémas/contrat) théoriquement portable, et concentre l'ancrage Astro dans un seul package.

### `@waimia/catalogue-ui` (UI explorateur, partiellement portable)
- **Fichiers** : `src/components/library/CatalogueExplorer.tsx`, `CopyCode.tsx`, `VariantToggle.tsx` (React purs), `SectionCard.astro`, `FacetChip.astro`, `DsLocalNav.astro`, `lazy-preview.ts` ; les sous-dossiers `hero-explore/`, `hero-explore-2/`.
- **API publique** : composants React/Astro de présentation du catalogue.
- **Dépendances** : `@waimia/ds-kernel` (types/facettes), `@waimia/sections` (registry pour les données), React. `CatalogueExplorer.tsx` est une **feuille React pure** (`grep import` → seul `react` ; reçoit les données par props, 0 import kernel) → extractible facilement. Les `.astro` restent ancrés Astro.

### `@waimia/builder` (composition de page typée)
- **Fichiers** : `src/components/library/builder/BuilderCanvas.tsx`, `src/components/library/builder/types.ts`.
- **API publique** : canvas React du builder + types de document de composition.
- **Dépendances** : `@waimia/ds-kernel` (`page-document` + `schemas/page-document`), `@waimia/sections` (registry pour le picker), React.
- **Note** : `BuilderCanvas.tsx` référence `astro:content` (apparaît dans le grep `astro:content`) → vérifier au moment de l'extraction si c'est un type-only import (neutralisable) ou un vrai runtime (bloquant). Les pages `src/pages/library/builder/{index,render}.astro` restent dans l'app hôte (routes).

### `waimia-web` (APP HÔTE, tout le reste)
- **Fichiers** : `src/pages/**` (toutes les routes, dont `library/studio.astro`, `library/*.astro`, `preview/**`, `offres/**`, endpoints `*.json.ts`), `src/layouts/**`, `src/components/ui/**` (atoms/molecules/organisms), `src/components/templates/**`, `src/content.config.ts`, `src/integrations/**`, `src/styles/{global,grid,layouts,section-layouts,scroll-reveal}.css`, tous les `scripts/**` de gen/check, `astro.config`, contenu `src/content/**`, `src/data/**`.
- **Rôle** : compose les packages, héberge les routes SSG/SSR, lance la génération des artefacts que le MCP consomme.
- **DS Studio reste ici** : `src/pages/library/studio.astro` (101 932 octets) importe ~20 atoms/molecules de `src/components/ui/` (`studio.astro:25-44`) + le kernel (`:47-52` registry/demos/schema/presets/colorschemes) + ses scripts `src/scripts/ds-studio.js` (62 583 o), `ds-studio-contrast.js`, `ds-section-workshop.js`, et l'intégration `src/integrations/ds-save-dev.mjs`. C'est une PAGE Astro, pas un package : elle consomme les packages, elle n'en est pas un. (Un futur `@waimia/studio` n'a de sens que si l'éditeur devient une app détachée ; hors scope #40.)

## 2. Graphe de dépendances (orienté, sens « importe »)

```
ds-tokens (feuille, 0 dep)
   ▲
   │
ds-kernel ──(z from astro:content ⚠️)──► [runtime Astro]
   ▲   ▲   ▲
   │   │   └────────────── builder ──► sections (picker)
   │   └────────── catalogue-ui ──► sections (données)
   │
sections (registry: 167 .astro ⚠️ ancre Astro) ──► ds-kernel, ds-tokens
   ▲
   │
APP HÔTE (waimia-web) ──► ds-kernel, sections, catalogue-ui, builder, ds-tokens
   │
   └─(build SSG produit dist/client/library/*.json + tokens.css)──► mcp (lecture fs, 0 import)
```

### Cycles actuels à casser
- **Aucun cycle d'import dur détecté** entre les domaines proposés : le flux est acyclique (tokens → kernel → sections → ui/builder → app → artefacts → mcp).
- **Faux cycle / couplage circulaire latent à surveiller** : `mcp-manifest.ts` (qui ira dans `@waimia/sections`) importe `section-facets`, `section-slots`, `section-presets`, `library-manifest`, `section-registry`, et `schemas/sections` (`mcp-manifest.ts:19-39`). Si une partie de ces modules part au kernel et l'autre reste dans sections, garder le sens kernel→sections (jamais sections→…→kernel→sections). La répartition §1 respecte ça (manifest dans sections, contrat dans kernel).
- **Ancre transverse, pas un cycle mais un pin** : `section-registry.ts` → 167 `.astro` → runtime Astro. Ce n'est pas un cycle, c'est ce qui empêche `@waimia/sections` d'être un package npm « pur Node ». À accepter (le package reste Astro-aware), pas à casser.

## 3. Tableau couplage (imports entrants par module kernel)

Mesuré par grep ciblé sur `src/ mcp/ scripts/` (consommateurs réels, hors self).

| Module | Imports entrants | Domaines consommateurs | Lecture |
|---|---|---|---|
| `schemas/sections.ts` | **224** fichiers | sections (168 `.astro` + co-loc), kernel, catalogue, builder, studio, app pages, scripts, content.config | Hub absolu. Tout en dépend. → kernel, jamais déplacé sans casser tout. |
| `lib/section-registry.ts` | **~30** (17 hors `.astro` + il importe lui 167 `.astro`) | sections, catalogue (`[type]/compare/family/index`), studio, preview, builder, scripts gen/check | Hub d'agrégation Astro. → `@waimia/sections`. |
| `lib/section-presets.ts` | 11 | kernel (page-document), studio, preview, scripts | → kernel. |
| `lib/section-demos.ts` | 10 | sections, studio, app pages | → sections (données de démo). |
| `lib/section-facets.ts` | 9 | mcp-manifest, scripts derive/check | → kernel. |
| `lib/page-document.ts` | 6 | builder, render, scripts | → kernel. |
| `lib/section-slots.ts` | 5 | kernel, mcp-manifest, scripts | → kernel. |
| `lib/library-manifest.ts` | 5 | mcp-manifest, studio | → sections. |
| `lib/section-colorschemes.ts` | 4 | kernel, studio | → kernel. |
| `lib/section-archetypes.ts` | 3 | scripts, registry | → kernel. |
| `lib/mcp-manifest.ts` | 2 | scripts gen-section-manifest | → sections (produit l'artefact MCP). |
| `schemas/page-document.ts` | 6 | builder, render, page-document.ts | → kernel. |
| `sections/_shared/*` | 6 | uniquement modules `src/sections/<type>/` (#38) + `schemas/sections.ts` | → kernel (sous-contrat). |

Lecture stratégique : `schemas/sections.ts` (224 entrants) est le centre de gravité absolu. Toute extraction doit le traiter en PREMIER comme racine du `@waimia/ds-kernel`, et le rendre importable par un alias TS stable (`@waimia/ds-kernel`) pour ne pas réécrire 224 chemins relatifs à la main.

## 4. Contraintes Astro (portable npm vs reste app hôte)

| Élément | Portable en package npm ? | Raison / `fichier:ligne` |
|---|---|---|
| `mcp/waimia-catalogue-server.mjs` | ✅ OUI (déjà) | Node pur + sdk + zod, lit `fs` les artefacts. 0 import src. |
| `src/styles/tokens.css` | ✅ OUI | CSS pur ; `@theme` (`:292`) consommé par Tailwind de l'app. Le package expose juste le fichier. |
| `scripts/lib/ds-tokens.mjs` | ✅ OUI | `.mjs` Node pur. |
| `CatalogueExplorer.tsx`, `CopyCode.tsx`, `VariantToggle.tsx`, `BuilderCanvas.tsx` | ✅ OUI (React purs) | `CatalogueExplorer.tsx` n'importe que `react`. Données par props. (Vérifier l'import `astro:content` de `BuilderCanvas.tsx` : type-only = OK.) |
| `src/schemas/sections.ts`, `schemas/page-document.ts` | ⚠️ PORTABLE SOUS CONDITION | `import { z } from 'astro:content'` (`sections.ts:8`, `page-document.ts:14`). `astro:content` est un module virtuel Astro non résoluble hors build. Hors Astro il faut rebinder `astro:content`→`zod` (le repo le fait déjà pour les scripts : `scripts/derive-section-slots.mjs:298-301` copie les fichiers et remplace `from 'astro:content'` par le chemin de `zod`). Pour un package npm propre : **remplacer `astro:content` par `import { z } from 'zod'`** (le z d'astro:content EST zod) → le kernel devient portable Node. |
| `src/lib/section-registry.ts` | ❌ NON (reste Astro-aware) | Importe **167 `.astro`** (`grep -c` → 167). Les `.astro` exigent le runtime/loader Astro+Vite ; ne s'importent pas depuis du `.ts` compilé hors Astro. → `@waimia/sections` est un package « Astro-aware » consommé par l'app, pas un module Node neutre. |
| `src/components/sections/*.astro` (168) | ❌ NON (Astro-aware) | Fichiers `.astro` = composants serveur Astro, nécessitent l'intégration Astro côté hôte. Extractibles en package mais SEULEMENT consommable par une app Astro. |
| `src/pages/**` (routes, dont `studio.astro`, `builder/render.astro`) | ❌ NON | Routes = file-based routing Astro, vivent dans `src/pages/` de l'app. `render.astro:34` `export const prerender = false` (endpoint SSR) → runtime serveur, reste hôte. |
| `src/content.config.ts`, modules `astro:content` runtime (`page-document.ts` famille, `blog-routing`, `sector-cases`) | ❌ NON | `astro:content` runtime (getCollection/getEntry) = serveur Astro only. Reste app hôte. (Le brief signale déjà `validatePageDoc` non runnable hors Astro : confirmé, `page-document.ts` est dans le kernel MAIS sa branche `astro:content` runtime doit être isolée ou le module scindé sérialisation pure / runtime ; déjà amorcé : `page-document-frontmatter.ts` est la part « sans dépendance astro:content », cf `page-document.ts:24-26`.) |
| Tailwind v4 `@theme` / `@tailwindcss/vite` | ❌ config app | Le plugin Vite + `global.css` (`@import` chain `:5-9`) sont configurés dans l'app. Le package n'expose que le CSS source. |

**Synthèse contrainte dominante** : la frontière dure n'est PAS entre domaines fonctionnels, c'est entre « code qui touche `astro:content` / `.astro` » (reste Astro-aware) et « code pur TS/Node/React » (portable). Le centre de gravité (`schemas/sections.ts`, 224 entrants) est portable au prix d'un seul changement mécanique (`astro:content`→`zod`). Le registry (167 `.astro`) est l'ancre irréductible.

## 5. Plan d'extraction stagé (pilote-first)

Principe (comme #38) : structure d'abord, puis 1 package à la fois, du plus isolé au plus couplé. Preuve GF-1 à chaque étape = `npx -y pnpm@9.15.0 build` → `Complete!` + `astro check` 0 erreur + parité `dist/client/library/manifest.json` (diff vide avant/après).

| Étape | Contenu | Fichiers déplacés | Imports à réécrire | Risque | Preuve GF-1 |
|---|---|---|---|---|---|
| **T1 : Scaffolding** | Créer `pnpm-workspace.yaml` (`packages: ['packages/*', '.']`) + `packages/` vide. Extraire le package TÉMOIN déjà standalone : `@waimia/mcp` (déplacer `mcp/` → `packages/mcp/`, ajouter `package.json` + `bin`). AUCUN code src touché. | `mcp/*` → `packages/mcp/` | Ajuster les chemins relatifs du serveur vers `dist/` + `tokens.css` (remontée d'un niveau) | 🟢 Faible | build Complete! + lancer le serveur MCP, `catalogue.search` retourne un résultat. |
| **T2 : ds-tokens** ✅ FAIT | `@waimia/ds-tokens` : `tokens.css` + `fonts.css` + `scripts/lib/ds-tokens.mjs` → `packages/ds-tokens/`. Re-pointer la VRAIE carte (cf addendum T2). | 3 fichiers | 9 refs fonctionnelles (pas 3) | 🟡 Moyen (touche save DS Studio + MCP + 2 générateurs + 3 gates + données générées) | build Complete! + tokens visuellement appliqués (Playwright getComputedStyle) + astro check 62. |
| **T3 : ds-kernel** | `@waimia/ds-kernel` : schémas + modules de contrat + `_shared`. **Changement clé** : `astro:content`→`zod` dans `sections.ts:8` + `page-document.ts:14`. Définir alias TS+Vite `@waimia/ds-kernel`. | ~13 fichiers | **224 chemins** vers `schemas/sections` → migrer via alias (1 reconfig, pas 224 edits) + grep-replace contrôlé | 🔴 RISQUÉ (worktree-isolé dédié) | build Complete! + `astro check` 0 + `validatePageDoc` round-trip + diff manifest vide. |
| **T4 : catalogue-ui** | `@waimia/catalogue-ui` : composants React purs d'abord (`CatalogueExplorer/CopyCode/VariantToggle`), puis `.astro` de présentation. | ~7 fichiers | imports des pages `library/*` | 🟡 Moyen | build Complete! + screenshot `/library` (catalogue rendu, filtres OK) + 0 erreur console. |
| **T5 : builder** | `@waimia/builder` : `BuilderCanvas.tsx` + `types.ts`. (Dépend de #39 « document de composition » et de la résolution de l'`astro:content` de BuilderCanvas.) | 2 fichiers | imports des pages `builder/*` | 🟡 Moyen | build Complete! + screenshot `/library/builder` (canvas + export). |
| **T6 : sections + registry** | `@waimia/sections` : les **168 `.astro`** + `section-registry.ts` (167 imports) + `section-demos` + `library-manifest` + `mcp-manifest` + modules co-localisés #38. Package « Astro-aware ». | ~175 fichiers | tous les `components/sections/*` + registry refs | 🔴 TRÈS RISQUÉ (worktree-isolé dédié, après #38 T5) | build Complete! + `astro check` 0 + diff manifest vide + GF-1 sweep sur previews. |

L'app hôte `waimia-web` garde `src/pages/**`, `templates/**`, `ui/**`, `integrations/**`, `content.config.ts`, `scripts/**`, et la page `studio.astro`.

### Addendum T2 (2026-06-28) : carte EXACTE des consommateurs ds-tokens (le « 3 imports » était sous-estimé)

`@waimia/ds-tokens` créé : `packages/ds-tokens/{tokens.css,fonts.css,ds-tokens.mjs,package.json}` (`"name":"@waimia/ds-tokens"`, `"private":true`, exports `./tokens.css` `./fonts.css` `./parse`). `pnpm-workspace.yaml` étendu avec `'packages/*'` ; `pnpm install` lie les 3 projets.

⚠️ `fonts.css` utilise des chemins ABSOLUS (`/fonts/*.woff2`) → les woff2 restent dans `public/fonts/`, rien à déplacer (vérifié : 12 woff2 copiés dans `dist/client/fonts/`, `@font-face` présents dans le CSS buildé).

**9 références FONCTIONNELLES repointées** (vs « 3 » du plan initial) :
1. `src/styles/global.css:6-7` : `@import "../../packages/ds-tokens/{fonts,tokens}.css"`.
2. `src/integrations/ds-save-dev.mjs` : import `parse` (`:27`) + `TOKENS_PATH` (`:31`) + `git add` (`:139`) → `packages/ds-tokens/`. (Flux SAVE du DS Studio.)
3. `mcp/waimia-catalogue-server.mjs:41` : `TOKENS_PATH` → `packages/ds-tokens/tokens.css`.
4. `scripts/gen-ds-registry.mjs:8` : `TOKENS_FILE` → régénéré (`gen:ds-registry`).
5. `scripts/apply-ds-export.mjs:37,60` : import `parse` + `tokensPath`.
6. `scripts/gen-section-manifest.mjs:30` : `TOKENS_FILE` → régénéré (`gen:section-manifest`).
7. `scripts/gen-token-lock.mjs:8` : `SOURCE` → régénéré (`gen:token-lock`).
8. `scripts/check-token-lock.mjs:8` : `SOURCE` (le gate lit le nouveau chemin).
9. `scripts/check-token-purity.mjs:439` : scan rgba-marque du contrat → nouveau chemin.

Données générées régénérées (0 ancien chemin résiduel) : `src/data/ds-registry.json` (125 tokens), `design-system.lock.json` (`generatedFrom: packages/ds-tokens/tokens.css`), `src/data/ds-section-manifest.json` (200 types, 5580 token refs). Commentaires `cf tokens.css` dans les composants laissés tels quels (non fonctionnels) ; docstrings/strings MCP + README mis à jour pour exactitude.

**Preuves GF-1** : `pnpm build` → `Complete!` ; tokens visuellement appliqués (Playwright `/` + `/preview/feature-grid` : `--ink #0c0b09`→color rgb(12,11,9), `--paper #f6f1e8`→bg rgb(246,241,232), police « Instrument Serif » chargée, H1 opacity 1, 0 reveal caché) ; `--ink`/`--accent`/`--paper`/`--gut`/`--wrap-read` présents dans `dist/client/_astro/*.css` ; MCP `TOKENS_PATH` résout + lit 125 tokens ; `astro check` 62 erreurs (baseline) ; gates `check:token-lock`/`check:section-modules`/`check:page-schemas`/`check:usage-manifest` exit 0. `check:token-purity` exit 1 = baseline PRÉ-EXISTANT (clamp brut `render.astro`, fichier non touché par T2), sans rapport avec l'extraction.

### Addendum T3 étape 1 (2026-06-28) : dépin Astro de la couche schéma — le « 2 fichiers » était pré-#38

⚠️ Le plan §5 (« T3 : `astro:content`→`zod` dans `sections.ts:8` + `page-document.ts:14` », 2 fichiers) a été écrit AVANT la fin de #38. Réalité post-co-location mesurée le 2026-06-28 : **205 fichiers** importaient `import { z } from 'astro:content';` (forme strictement uniforme, 0 variante) :
- 200 schémas co-localisés `src/sections/<type>/schema.ts` (#38) ;
- `src/sections/_shared/{base,subschemas,locals}.ts` ;
- `src/schemas/page-document.ts` ;
- `src/schemas/sections.generated.ts` (GÉNÉRÉ → corriger le GÉNÉRATEUR `scripts/gen-section-aggregate.mjs:89`, sinon `gen:section-aggregate`/build revert le swap silencieusement).

Sécurité du swap (GF-4) : **0 usage `image()`/`z.image`** dans la couche schéma → le `z` d'`astro:content` ≡ `zod` pour ces fichiers. `content.config.ts` CONSERVE `astro:content` (`defineCollection` + `reference()`, reste app-hôte).

**Fait** : swap déterministe ligne-exacte (commit `efbb673b`, 206 fichiers / 206 ins / 206 del, branche `feat/kernel-deatro` → FF main). GF-1 : build `Complete!` + `manifest.json` IDENTIQUE (MCP indemne) + `astro check` 60 ≤ 62 baseline + page composable `/offres/growth-system-ia` rendue (H1 opacity 1, 10 sections, 0 reveal caché). Le build valide les collections composables contre les schémas swappés → plain zod prouvé OK dans le pipeline content Astro. Étape atomique + réversible, AUCUN fichier déplacé.

**Reste T3 étape 2 (déplacement + alias)** : créer `packages/ds-kernel/` + déplacer `schemas/{sections.ts,sections.generated.ts,page-document.ts}` + `lib/section-{facets,slots,presets,colorschemes,variants,archetypes}.ts` + `lib/page-document*.ts` + `_shared/*`, définir alias TS+Vite `@waimia/ds-kernel`, grep-replace contrôlé des chemins relatifs. ⚠️ **Wrinkle post-#38 à trancher** : `sections.ts`→`sections.generated.ts`→`import { schema } from '../sections/<type>/schema'` (200 schémas co-localisés). Ces schémas co-localisés sont, au §1, dans `@waimia/sections` (T6), PAS le kernel → l'agrégateur `sections.generated.ts` (kernel) importerait `@waimia/sections` = **cycle kernel→sections**. Options : (a) déplacer aussi les 200 `schema.ts` co-localisés dans le kernel (les `Component.astro` restant dans sections) ; (b) garder l'agrégat dans `@waimia/sections` et n'exporter du kernel que `_shared` + contrat + `page-document`. À arbitrer AVANT l'étape 2 (branche worktree-isolée dédiée). Le dépin (étape 1) débloque les deux options.

## 6. Risques + parades

| Risque | Parade |
|---|---|
| `astro:content` non résoluble hors Astro (kernel) | Remplacer `import { z } from 'astro:content'` par `import { z } from 'zod'` (équivalent, déjà neutralisé par les scripts `derive-section-slots.mjs:298-301`). Garder les modules `getCollection`/`getEntry` (runtime) DANS l'app hôte (déjà scindé : `page-document-frontmatter.ts` = part pure, `page-document.ts:24-26`). |
| 224 chemins relatifs vers `schemas/sections` à réécrire | Définir un alias TS (`tsconfig paths`) + Vite (`resolve.alias`) `@waimia/ds-kernel` AVANT le déplacement, puis grep-replace contrôlé `from '../schemas/sections'`→`from '@waimia/ds-kernel'`. 1 reconfig, validation par build, pas 224 edits manuels risqués. |
| Cycle latent kernel↔sections via `mcp-manifest` | Garder la frontière du §1 : contrat (facets/slots/presets/schemas) au kernel, agrégateurs (registry/manifest/demos) dans sections. Sens unique kernel→sections. Gate : un lint d'import (ou `madge --circular`) en CI. |
| Build SSG doit continuer à passer + artefacts MCP identiques | À CHAQUE étape : `pnpm build` → `Complete!` ET `git diff --stat dist/client/library/manifest.json` = vide (parité). Le MCP lit `dist/` ; tant que l'artefact est identique, le MCP est indemne. |
| `astro check` / résolution Vite des `.astro` en package | `@waimia/sections` reste Astro-aware (pas npm pur) ; l'app hôte garde l'intégration Astro. Tester `astro check` après T6 spécifiquement. |
| Régression visuelle silencieuse (déjà vue sur le repo) | GF-1 sweep Playwright sur les previews après T4/T5/T6 (screenshot + getComputedStyle), pas seulement build vert. |
| Worktree partagé + workers parallèles | Étapes 🔴 (T3, T6) = worktree-isolé dédié, séquentielles (elles touchent le centre de gravité). Jamais 2 workers en parallèle sur le registry/schema. |

## 7. Recommandation tranchée : #40 APRÈS #38 T5

**Faire #40 APRÈS la fin de la co-location #38 (T5), pas avant.** Arguments adossés au graphe :

1. **#38 réduit la surface de la frontière la plus risquée (T6 sections+registry).** Aujourd'hui `section-registry.ts` importe 167 `.astro` éparpillés (`grep -c` → 167) et les 5 touchpoints d'un type vivent dans 5 god-files. #38 fait converger chaque section vers un module unique `src/sections/<type>/` avec `registry`+`manifest` GÉNÉRÉS (`gen:section-aggregate`). Une fois #38 fini, `@waimia/sections` s'extrait comme un dossier `src/sections/*` cohérent + un agrégat généré, au lieu de 175 fichiers dispersés à recâbler à la main. Extraire AVANT #38 = déplacer une cible mouvante (les 167 imports vont être réécrits par #38 de toute façon → double travail, anti-pattern rule 30 §3 « pas d'audit/refactor avant un refactor qui l'invalide »).

2. **Le kernel (T3) et les feuilles (T1 mcp, T2 tokens) sont, eux, déjà mûrs et indépendants de #38.** Rien n'empêche de lancer **T1 + T2 maintenant** (faible risque, gain immédiat : `pnpm-workspace.yaml` + 2 packages témoins) en parallèle de #38 ; ils ne touchent ni le registry ni les `.astro`. C'est la part « scaffolding » du plan, sûre dès aujourd'hui.

3. **T3 (kernel) peut suivre T1/T2** car `schemas/sections.ts` est stable côté contrat (les couches NOW sont livrées, tâches #48-#55 completed) ; seul `astro:content`→`zod` le bloque, indépendant de #38. Mais il vaut mieux le faire juste avant T6 pour minimiser les fenêtres où l'alias `@waimia/ds-kernel` coexiste avec des imports relatifs legacy.

**Séquencement recommandé** : T1 + T2 (maintenant, sûr) → finir #38 (#38 in_progress, registry/manifest générés) → T3 (kernel, worktree-isolé) → T4 + T5 (ui/builder) → T6 (sections+registry, worktree-isolé, le plus tard). Cela évite le double travail sur les 167 imports et fait porter le risque maximal sur un arbre déjà assaini par #38.
