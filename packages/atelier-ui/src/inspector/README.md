# @waimia/atelier-ui · inspector

Inspecteur de section à 4 onglets. Composants React **prop-driven** (aucun import depuis le
`src/` de l'app), destinés à être montés par l'hôte (BuilderApp, brick B9) pour éditer **une**
section sélectionnée. Zéro JSON brut : chaque type logique de slot a son widget dédié.

## Onglets

1. **Variante** (`VariantTab`) : grille des presets du type. Si `renderPresetThumb` est fourni,
   chaque carte affiche la vignette ; sinon carte texte (libellé + badges des axes clés du
   preset). Clic → `onPickPreset(id)`. Le preset actif (`selectedPresetId`) est surligné.
2. **Layout** (`LayoutTab`) : un contrôle par axe de présentation (`AxisControl[]`). enum →
   segmented control, `stepper` (columns) → +/−, `toggle` (bool), `direction` → 4 boutons,
   `order` → un stepper par position (ordre visuel), `placement` → sous-panneau align / justify
   / order / hideOn par région. Helper `deriveAxes(presentationSlots, extras?)` construit la
   liste depuis les slots de présentation (enum → segmented) plus des axes fournis par l'hôte.
3. **Contenu** (`SlotForm`) : formulaire data-driven des slots de contenu. Champs bilingues sous
   tabs FR/EN. Tableaux repliables (add / remove / reorder), objets imbriqués récursifs.
4. **Couleur** (`ColorTab`) : pastilles visuelles des 16 schémas DS (fond + cellules). Le schéma
   actif est déduit de `background` (+ `cellCycle`). Clic → patch `{ background, cellCycle }`.

## Contrat de props (`InspectorPanelProps`)

| prop | type | rôle |
| --- | --- | --- |
| `typeId` | `string` | type de section édité |
| `props` | `Record<string, unknown>` | props courantes de l'instance (source **contrôlée**) |
| `slots` | `SectionSlot[]` | contrat de slots complet (`getSlots(typeId)`) |
| `presentationAxes` | `AxisControl[]` | axes de layout (voir `deriveAxes`) |
| `presets` | `Preset[]` | presets du type (`SECTION_PRESETS[typeId]`) |
| `schemes` | `ColorScheme[]` | schémas de couleur (`COLOR_SCHEMES`) |
| `onChange` | `(patch) => void` | patch **partiel** émis à chaque édition ; l'hôte fusionne |
| `onPickPreset` | `(id) => void` | application d'un preset |
| `renderPresetThumb?` | `(id) => ReactNode` | vignette optionnelle d'un preset |
| `selectedPresetId?` | `string` | preset actif (surbrillance) |

Le panneau est **contrôlé** : il ne duplique aucun état de données (seuls l'onglet actif et la
langue d'édition sont internes). L'hôte détient `props` et applique les patchs.

## Modèle de patch

`onChange(patch)` reçoit un objet partiel de props racine ; l'hôte fait un merge shallow
(`{ ...props, ...patch }`, une valeur `undefined` supprime la clé). Exemples :

- édition d'un texte bilingue : `{ title_fr: '…' }` ;
- édition d'un tableau (add/remove/reorder ou item modifié) : `{ metrics: [...] }` (tableau complet) ;
- édition d'un sous-champ d'objet : `{ cta: { ...cta, href: '…' } }` (objet complet) ;
- choix d'un schéma de couleur : `{ background, cellCycle }`.

## Conventions de données (dérivées du schéma Zod)

- slot bilingue `field` → clés `${field}_fr` / `${field}_en` ;
- slot `object` → une valeur objet (sous-champs = `itemShape`) ;
- slot `array` **avec** `itemShape` → tableau d'objets ; **sans** → tableau de scalaires ;
- slot `array` bilingue → `${field}_fr` / `${field}_en`, chacun un tableau ;
- sous-champ bilingue d'`itemShape` → `${sub}_fr` / `${sub}_en` dans chaque item.

## Mapping type de slot vers widget

| `SlotType` | widget (contenu) | widget (layout) |
| --- | --- | --- |
| `text` | input texte | segmented si enum d'axe |
| `richtext` | textarea (HTML éditorial) | n/a |
| `url` | input url | n/a |
| `image` | input src + aperçu `<img>` | n/a |
| `number` | input number | stepper |
| `enum` | select | segmented control |
| `bool` | toggle | toggle |
| `array` | liste repliable add/remove/reorder | n/a |
| `object` | fieldset récursif | n/a |
| axe `direction` | n/a | 4 boutons |
| axe `order` | n/a | stepper par position |
| axe `placement` | n/a | sous-panneau par région |

## Style

Feuille scopée injectée une fois via `useInspectorStyles()` (appelée par `InspectorPanel`),
classes préfixées `wa-insp`, **tout en `var(--token)` DS** (0 valeur en dur hormis 1px hairline
structurel). Aucun import CSS externe requis côté hôte. `SURFACE_VAR` mappe chaque surface DS
vers son `var(--token)` pour les pastilles.

## Découplage

Les types de contrat (`SectionSlot`, `ColorScheme`, `Preset`, `AxisControl`…) sont un mirroir
self-contained de `@waimia/ds-kernel` (`section-slots.ts`, `section-colorschemes.ts`,
`section-presets.ts`) : aucun import runtime, le paquet reste découplé et l'hôte fournit les
données réelles. La preuve GF-1 (harness `scratchpad/b7`) monte le panneau sur 3 types réels
(`cta-band`, `case-spotlight`, `agentic-terminal`) avec leurs slots, demos, presets et schémas
RÉELS : 29/29 assertions Playwright vertes, 0 erreur JS/React.
