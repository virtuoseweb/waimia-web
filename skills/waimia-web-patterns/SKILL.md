---
name: waimia-web-patterns
description: Patterns de code et conventions extraits de l'historique git de waimia-web (catalogue de sections composables, gates DS, commits avec preuve GF-1). A charger avant toute contribution au repo.
version: 1.0.0
source: local-git-analysis
analyzed_commits: 200
---

# Waimia-web : patterns du repo

Extrait de l'analyse des 200 derniers commits (repo : 1348 commits, Astro 6 + Tailwind v4, prod waimia.com sur main via Vercel).

## Conventions de commit

93 % des commits suivent le format conventionnel, message en francais :

```
type(scope): description en francais
```

- Types observes : `feat`, `fix`, `docs`, `refactor`, `chore`, `merge`.
- Le scope = le chantier, pas le dossier : `feat(v7)`, `fix(ds)`, `feat(swi)`, `docs(state)`, `feat(library)`, `refactor(monorepo)`, `feat(builder)`, `fix(nav)`, `feat(habillage)`.
- **Preuve dans le corps du commit** : 202 mentions GF-1/Playwright/screenshot/getComputedStyle sur 200 commits. Un commit qui revendique un rendu ou un fix cite sa preuve empirique (commande + resultat observe), pas une assertion.
- 1 scope = 1 commit ; jamais d'add global de tout le repo (stager fichier par fichier).

## Architecture : catalogue de sections composables

Le coeur du repo est un catalogue de sections. Chaque type de section est co-localise :

```
src/sections/<type>/
├── Component.astro   # rendu, API { data, lang }
├── demo.ts           # donnees de demo pour /preview/<type>
├── meta.ts           # metadonnees catalogue
└── index.ts          # export
packages/ds-kernel/src/sections/<type>/schema.ts   # contrat Zod
```

Fichiers **GENERES, ne jamais editer a la main** (regeneres par `npm run gen:*`, le prebuild lance `gen-section-aggregate` + `gen-section-usage`) :
- `packages/ds-kernel/src/schemas/sections.generated.ts`
- `packages/ds-kernel/src/lib/section-family.generated.ts`
- `src/lib/section-registry.generated.ts` et `src/lib/section-demos.generated.ts`
- `src/data/ds-section-manifest.json`, `src/data/section-quickref.json`

Pages 100 % composables : un JSON de sections rendu par `SectionsRenderer` :
- `src/data/pages/*.json` (pages statiques type /tarifs)
- `src/content/services/*.json` (collection services)
- `src/data/page-variants/<page>/{a,b,c}.json` et `src/data/swi-variants/*.json` (variantes preview `/preview-v/...`)

Anti-orphelin : une page sans tableau `sections` non vide leve une erreur de build volontaire.

## Workflow : ajouter un type de section (sequence observee dans les commits)

1. Creer `packages/ds-kernel/src/sections/<type>/schema.ts` (Zod).
2. Creer `src/sections/<type>/{Component.astro, demo.ts, meta.ts, index.ts}`.
3. Ajouter le type dans `scripts/section-order.json`.
4. Regenerer les agregats (`npm run gen:section-aggregate`, ou le build les regenere en prebuild).
5. Mettre a jour `docs/DS-SECTION-CATALOG.md`.
6. Verifier la preview `/preview/<type>` (Playwright : bloc visible, opacity 1, transform none, 0 erreur console).

## Gates qualite (30 scripts gen/check dans scripts/)

Avant de considerer un changement fini :
- `npx -y pnpm@9.15.0 build` : doit se terminer par `Complete!` (gate principal).
- `check:token-purity` : **jamais de valeur en dur** (couleur, espacement, taille) dans un composant catalogue, tout pointe `var(--token)`.
- `check:no-emdash` : aucun tiret cadratin U+2014 dans le contenu.
- `check:hover-reflow` : les hovers ne changent pas la geometrie (translate, pas de border/size).
- `check:section-rhythm`, `check:internal-links`, `check:touchpoints`, `check:semantic`, `check:board`...
- `astro check` : dette baseline en cours de resorption, ne pas confondre avec le build.

## Direction artistique (directive typo 2026-06-11, docs/41)

- La masse des titres = `var(--font-sans)` (Inter Tight), contraste par la graisse.
- Le serif `var(--font-display)` (Instrument Serif) sert UNIQUEMENT a relever 1 a 3 mots via `<i>` (ou `.u-serif-accent`). Jamais de titre full serif, jamais de full italic.
- Exception signature : `.hero-headline` de la home reste display.
- Bandes logos : `logo-marquee` sur `background: ink` + `grayscale: true` (logos blancs).

## Tests

- E2E : Playwright (`npm run test:e2e`, prod : `test:e2e:prod` avec `PLAYWRIGHT_BASE_URL=https://waimia.com`).
- Preuve visuelle systematique avant merge : screenshot above-fold + `getComputedStyle` sur H1/CTA (`opacity != 0`).
- `localhost:4321` peut etre un serveur statique (`serve-dist.mjs`) : les endpoints `/api/*` n'y repondent pas, utiliser un vrai `astro dev` ou la prod.

## Branches et deploiement

- `main` = prod waimia.com (Vercel). Branches `feat/*`, `fix/*` mergees sur main apres preuve.
- Plan Vercel Hobby : deploys prod en file (~6-8 min), ne pas empiler les deploys.
