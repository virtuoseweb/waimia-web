# Audit 02 : Co-location des sections (Wave #38)

> Source de vérité unique du **format module co-localisé** `src/sections/<type>/` et de son gate.
> Daté 2026-06-28. Blueprint d'exécution complet (découpe T1..T5, risques) : `tasks/wave-38-colocation-spec.md`.

## Pourquoi

Avant #38, chaque type de section vivait éclaté dans 4 « god-files » partagés (schéma, demo, registry, composant). #38 range chaque type dans **un dossier-par-section** `src/sections/<type>/`, tout en gardant les god-files comme **points d'agrégation** pendant toute la migration. Bascule progressive : codegen en mode « merge » d'abord, « replace » seulement à la fin.

## Format d'un module `src/sections/<type>/`

Un module = un dossier sous `src/sections/`, contenant EXACTEMENT 5 fichiers :

| Fichier | Rôle |
|---|---|
| `schema.ts` | le `z.object` du type (importe `z` depuis `astro:content`). |
| `demo.ts` | les données de démo bilingues fr/en. |
| `meta.ts` | la métadonnée catalogue (famille, facettes, etc.). |
| `Component.astro` | le composant (un `.astro` ne peut pas s'exporter d'un `.ts`, d'où le fichier séparé). |
| `index.ts` | point d'agrégation : réunit les 4 facettes en un default unique. |

Forme constatée du `index.ts` (identique sur les 3 pilotes) :

```ts
import { schema } from './schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from './schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: '<type>' as const,
  schema,
  demo,
  meta,
  Component,
};
```

Le default export doit référencer au minimum `schema`, `demo`, `meta`, `Component` (c'est le contrat attendu par le générateur). `id` est présent sur les pilotes ; un éventuel `consumers` est toléré.

## `_shared` (feuilles pures, PAS un module)

`src/sections/_shared/` (`base.ts`, `subschemas.ts`, `types.ts`) regroupe les feuilles pures partagées par les modules. Ce n'est PAS un module de section : il est EXCLU du codegen et du gate.

## Pipeline codegen `gen:section-aggregate`

`scripts/gen-section-aggregate.mjs` (`npm run gen:section-aggregate`) scanne `src/sections/<type>/index.ts` (hors `_shared`). Méthode d'introspection Zod réutilisée à l'identique de `scripts/derive-section-slots.mjs` : `astro:content` est un module virtuel non résoluble hors build, donc on copie le fichier hors repo en rebindant `astro:content` vers le zod réel + les imports relatifs vers des chemins absolus, puis on l'importe via tsx.

- **Mode actuel = « merge »** : on prépare les lignes de ré-export à injecter dans les god-files, SANS toucher le contenu legacy. 0 module trouvé = no-op strict (0 god-file modifié).
- **Bascule « replace »** (régénération complète des `.generated.ts` + hook `prebuild` + gate « généré == commité ») : SEULEMENT en fin de migration (T5).

## Gate `check:section-modules`

`scripts/check-section-modules.mjs` (`npm run check:section-modules`) est le drift-guard des modules co-localisés. Pour chaque dossier de `src/sections/` (hors `_shared`), il vérifie par analyse STATIQUE (lecture texte + regex, jamais d'`import()`) :

1. la présence des 5 fichiers requis ;
2. que `index.ts` expose un `export default { ... }` référençant au moins `schema`, `demo`, `meta`, `Component`.

Il détecte aussi le module « fantôme » (dossier présent, 0 fichier requis) et tout fichier requis manquant. Sortie : rapport par module (OK / manques) + récap `N valides / M`. Exit 0 si tous valides, 1 si au moins un module incomplet, 2 si `src/sections` est introuvable.

## État (2026-06-28)

- 3 pilotes migrés : `media-bento` (collection), `hero-social-proof` (hero), `eeat-panel` (cas dur EEAT). `check:section-modules` = vert (3/3).
- 196 types legacy encore dans les god-files (199 au total à migrer). `gen:section-aggregate` reste en mode merge ; `check:touchpoints` reste le drift-guard des god-files tant que la bascule replace n'est pas faite.
