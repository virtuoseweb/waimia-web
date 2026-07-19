# @waimia/atelier-ui · picker

Primitives du sélecteur visuel de sections (« Ajouter une section » façon Relume), partagées
entre le catalogue et le builder. Le picker remplace le choix par NOM (liste texte) par un choix
par VIGNETTES d'aperçu. Intégration prévue par la brick B9 (panneau du builder).

## Frontière de paquet (non négociable)

Ces composants sont **prop-driven** et **autonomes** : aucun import depuis le `src/` de l'app
hôte. Toute donnée (types de sections, presets, blocs sauvegardés) et toute résolution d'URL de
vignette arrivent en **props**. Tout style passe par les tokens DS (`var(--token)`), jamais de
valeur en dur. C'est l'app hôte qui, à l'intégration, fournit les données réelles (registry,
`section-presets`, blocs enregistrés) et la fonction `thumbSrcOf`.

## Composants

### `SectionThumb` (`../preview/SectionThumb.tsx`)

Vignette d'aperçu unitaire : iframe de la page `/preview/…` mise à l'échelle et **non
interactive** (l'iframe porte `pointer-events:none`, un overlay bouton capte le clic). Chargement
paresseux **délégué à `useThumbQueue`** du conteneur parent (l'iframe expose `data-src`, pas
`src` ; le wrapper `[data-lazy-preview]` est promu par la file, max 3 chargements simultanés).
Squelette animé tant que l'iframe n'a pas fini de charger.

| Prop | Type | Défaut | Rôle |
| --- | --- | --- | --- |
| `src` | `string` | requis | URL de la page d'aperçu à charger. |
| `label` | `string` | requis | Libellé sous la vignette + `aria-label` de l'overlay. |
| `width` | `number` | `280` | Largeur affichée de la vignette (px). |
| `height` | `number` | `200` | Hauteur affichée de la zone d'aperçu (px). |
| `onClick` | `() => void` | requis facultatif | Clic sur la vignette. |
| `selected` | `boolean` | `false` | État sélectionné (bordure accent + coche). |
| `footer` | `ReactNode` | facultatif | Contenu sous le libellé (ex. badges d'axes de presets). |

### `AddPanel` (`./AddPanel.tsx`)

Panneau complet « Ajouter une section » façon Relume : en-tête + bouton fermer, deux onglets
**« Suggérées »** (la grille filtrable) et **« Sauvegardées »** (`savedSections`), barre de
recherche (`PickerToolbar`), facette famille en chips (`FamilyChips`), barre de facettes par
**axes de layout** (`AxisFacets` : dropdowns Layout / Colonnes / Fond… + « Au hasard » +
« Effacer »), grille de `SectionThumb`, états vides. La grille attache `useThumbQueue` et se
ré-observe à chaque changement de filtre ou d'onglet.

| Prop | Type | Défaut | Rôle |
| --- | --- | --- | --- |
| `types` | `PickerType[]` | requis | Catalogue des types (`{ id, label_fr, family?, category?, axes? }`). |
| `thumbSrcOf` | `(typeId: string) => string` | requis | Résout l'URL d'aperçu d'un type. |
| `savedSections` | `SavedSection[]` | `[]` | Blocs enregistrés (`{ id, label, type }`). |
| `onPick` | `(typeId: string) => void` | requis | Choix d'un type (aussi appelé par « Au hasard »). |
| `onPickSaved` | `(savedId: string) => void` | facultatif | Choix d'un bloc sauvegardé. |
| `onClose` | `() => void` | facultatif | Fermeture du panneau. |
| `thumbWidth` | `number` | `260` | Largeur des vignettes (px). |
| `facetAxisLabels` | `Record<string,string>` | facultatif | Surcharge des libellés FR des axes de facette. |

- **Recherche** = sous-chaîne insensible à la casse sur `label_fr` **ou** `id`.
- **Facette famille** = familles distinctes dérivées de `types` (chip « Toutes » + une chip par
  famille avec compteur).
- **Facettes par axes** = déduites de `PickerType.axes` : toute clé d'axe ayant **≥ 2 valeurs
  distinctes** dans le catalogue devient un dropdown ; un axe constant est masqué (il ne filtre
  rien). Filtres combinés en ET (recherche ∩ famille ∩ axes). Libellés FR connus : `layout` →
  « Layout », `columns` → « Colonnes », `background` → « Fond », `density` → « Densité »,
  `variant` → « Variante », `contentAlign`/`align` → « Alignement » (surchargeables).
- **« Au hasard »** propose un élément aléatoire du **contexte filtré courant** (onglet Suggérées
  → `onPick` ; onglet Sauvegardées → `onPickSaved`). **« Effacer »** réinitialise recherche +
  famille + axes.

### `PresetGallery` (`./PresetGallery.tsx`)

Grille visuelle des déclinaisons (presets) d'un type, réutilisée par l'inspecteur (B9). Sous
chaque vignette, un badge des **axes différenciants** : seules les clés d'axes dont la valeur
varie sur la collection (ou n'est présente que sur une partie des presets) sont affichées ; une
clé constante est masquée car elle ne distingue rien.

| Prop | Type | Défaut | Rôle |
| --- | --- | --- | --- |
| `typeId` | `string` | requis | Type parent (libellé + contexte). |
| `presets` | `PickerPreset[]` | requis | Déclinaisons (`{ id, label?, axes }`). |
| `thumbSrcOf` | `(presetId: string) => string` | requis | Résout l'URL d'aperçu d'un preset. |
| `current` | `string` | facultatif | Preset appliqué (surligné). |
| `onPick` | `(presetId: string) => void` | requis | Choix d'une déclinaison. |
| `thumbWidth` | `number` | `240` | Largeur des vignettes (px). |

## Sous-composants internes

- `PickerToolbar` : champ de recherche contrôlé + compteur de résultats.
- `FamilyChips` : chips de facette famille (état actif contrôlé par le parent).
- `AxisFacets` : barre horizontale de dropdowns par axe de layout + actions « Au hasard » /
  « Effacer » (options déduites des `axes` passés en props).

## Résolution d'URL de vignette (côté app hôte, à l'intégration)

```ts
// Type   -> /preview/<type>
const thumbSrcOfType = (id: string) => `/preview/${id}`;
// Preset -> /preview/<type>/<presetId>
const thumbSrcOfPreset = (typeId: string) => (pid: string) => `/preview/${typeId}/${pid}`;
```
