# @waimia/atelier-ui · app (BuilderApp)

Cœur du nouvel éditeur visuel (#39, brick B6). L'île React `BuilderApp` remplace l'ancienne
`BuilderCanvas` (composition par noms, JSON brut) : sa vue centrale est un **canvas par blocs**
(une vignette live par section), avec réordonnancement (glisser natif + flèches), duplication,
suppression, insertion entre blocs, et un toggle « Aperçu page » (iframe globale du document).

## Architecture

- **Source de vérité unique** : un `PageDocument` éditable modélisé par `EditorState`
  (`types.ts`), piloté par un **reducer pur** (`reducer.ts`) via `useReducer`.
- **Context** (`context.ts`) : `<BuilderApp>` monte `BuilderContext.Provider`. Tout descendant
  accède à l'état + aux actions via `useBuilder()` (ou `useBuilderOptional()`).
- **Canvas** (`../canvas/`) : `BlockCanvas` (liste + insertion), `BlockCard` (carte mémoïsée +
  vignette live), `FullPreview` (aperçu page). Les vignettes sont bornées en concurrence par
  `useLiveFrame` (même borne `maxConcurrent: 3` que `../preview/useThumbQueue`, mais pour des
  documents VIVANTS : GET nominal / POST de repli).

## Actions du reducer (via `useBuilder()`)

| Action | Signature | Effet |
| --- | --- | --- |
| `add` | `(type, atIndex?)` | Ajoute la démo par défaut du type ; `atIndex` insère entre deux blocs. |
| `remove` | `(index)` | Retire le bloc. |
| `duplicate` | `(index)` | Clone profond inséré juste après. |
| `move` | `(from, to)` | Réordonne. |
| `patchSection` | `(index, props)` | Fusionne des props dans la section (édition de contenu). |
| `setMeta` | `(partial)` | Met à jour l'entête (collection / slug / langue / titres). |
| `load` | `({ meta, sections })` | Remplace tout le document (charger une page / import). |
| `select` | `(uid \| null)` | Sélectionne un bloc (pour l'inspecteur). |

Le reducer incrémente `rev` à chaque mutation (signal de changement bon marché).

## Points d'accroche pour B5 (picker) et B7 (inspecteur)

`BuilderApp` accepte deux **slots** optionnels ; à défaut il rend un picker MINIMAL (liste de
types groupée par famille) et un inspecteur placeholder :

```tsx
<BuilderApp
  items={...} colorSchemes={...} defaultMeta={...} collections={...} pages={...}
  renderPath="/library/builder/render"
  renderPicker={<RichPicker />}      // B5 : consomme useBuilder().add(type, atIndex?)
  renderInspector={<SectionInspector />} // B7 : consomme useBuilder().patchSection(index, props)
/>
```

Un composant de slot lit l'état et déclenche les actions **uniquement** via `useBuilder()` :

```tsx
import { useBuilder } from '@waimia/atelier-ui/app/context';

function SectionInspector() {
  const { sections, selectedUid, patchSection } = useBuilder();
  const index = sections.findIndex((s) => s.uid === selectedUid);
  // ... éditer sections[index].data et appeler patchSection(index, { champ: valeur })
}
```

B5 et B7 ne touchent donc PAS ce dossier ni le reducer : ils se branchent par le Context. Les
acquis fonctionnels (catalogue, ajout, Enregistrer → `/api/ds/compose`, Export JSON/MDX) vivent
dans `BuilderApp` et restent disponibles quels que soient les slots fournis.
