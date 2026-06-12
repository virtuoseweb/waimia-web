# 46 — Spec Phase B : système de variation (le moteur des 1000+ presets)

> Fondé sur docs/45 (stratégie) + cartographies. Couche 2-4 de l'architecture.
> Objectif : ajouter les 3 axes de variation transverses + le niveau « preset » SANS dupliquer de types.

## Principe

Une **Variante** = un layout (structure de grille). Une **Déclinaison** = palette/densité/effets sur une variante.
On les exprime par **3 axes orthogonaux transverses** (mixin partagé) + un **touchpoint preset** (la combinaison nommée, sélectionnable). 1 composant-famille = N presets.

## B1 — Mixin `presentationSchema` (src/schemas/sections.ts)

Dans la zone sous-schémas (l.10-92), créer un objet de base réutilisé par `.extend()` :
```ts
const presentationSchema = z.object({
  background: z.enum(['paper','paper-2','paper-3','ink']).optional(), // EXISTANT (122× inline) → mutualisé
  layout: z.string().optional(),     // id d'un preset de grille (cf B2), ex 'split-3-1', 'bento-async-a'
  density: z.enum(['compact','base','ample']).optional(), // mappe sur les crans --section-*
  // effects : phase ultérieure (mask/géométrie/ruban) — NE PAS introduire avant que layout+density soient prouvés
});
```
Migration mécanique : remplacer les 122 `background:` inline par `...presentationSchema.shape` (ou `presentationSchema.extend({...})`). Le gate `check-touchpoints` lit les `z.literal` → insensible. Pas de nouveau type.

## B2 — Axe LAYOUT (couche 2, classes + CSS var)

Idiome (déjà prouvé par `hero-detail--*` et `--hod-wrap`) : le composant pose `data-layout={layout}` et lit une CSS var de grille.
- Table de presets de grille dans `src/styles/layouts.css` (nouveau, importé par global.css) :
```css
[data-layout='split-3-1']   { --sec-grid: 3fr 1fr; }
[data-layout='split-1-3']   { --sec-grid: 1fr 3fr; }
[data-layout='even-2']      { --sec-grid: 1fr 1fr; }
[data-layout='even-3']      { --sec-grid: 1fr 1fr 1fr; }
[data-layout='even-4']      { --sec-grid: 1fr 1fr 1fr 1fr; }
[data-layout='center-1-2-1']{ --sec-grid: 1fr 2fr 1fr; }
[data-layout='editorial-6-1-1']{ --sec-grid: 6fr 1fr 1fr; }
/* bento async / mosaïques : grid-template-areas nommées + tailles asymétriques par ligne */
```
- Les composants dont la grille est paramétrable consomment `grid-template-columns: var(--sec-grid, <défaut de la famille>)`. Le défaut garantit 0 régression si `layout` absent.
- Valeurs DS only : les fractions sont structurelles (pas des tokens couleur) → conformes `check-token-purity`. Les gaps/paddings restent en `var(--space-*)`/`--section-*`.

## B3 — Axe DENSITY (couche 2)

`data-density` → cran de rythme : `[data-density='compact'] { --sec-pad: var(--section-tight) } …`. Le composant : `padding-block: var(--sec-pad, var(--section-base))`. Conforme `check-section-rhythm` (valeurs = crans existants).

## B4 — Touchpoint PRESET (src/lib/section-presets.ts — NOUVEAU)

```ts
export type Preset = {
  id: string;          // 'hero-split--showcase-ink'
  type: SectionType;   // famille
  label: string;       // 'Hero split · showcase · encre'
  family?: string;     // regroupement intra-catégorie
  era?: string;        // style 2010-2026 (filtrage)
  props: Partial<...>; // surcharges background/layout/density (+ demo override léger)
};
export const SECTION_PRESETS: Record<SectionType, Preset[]>;
```
- `SECTION_DEMOS` sert le preset par défaut ; un preset surcharge `props` au rendu.
- Sélectionnable via `/preview/[type]/[preset]` (getStaticPaths imbriqué) ; `/categories/[slug]` liste familles → types → presets.

## B5 — Taxonomie registry (src/lib/section-registry.ts)

Ajouter `family: string` sur `SectionDescriptor` (l.16-26) → formalise **Catégorie → Famille → Variante(type) → Déclinaison(preset)**. `listFamilies(categorySlug)` dérivé.

## B6 — Gate

Étendre `check-touchpoints.mjs` : valider que chaque `Preset.type` existe, que `layout`/`density` sont des valeurs connues, que les ids sont uniques. 6e touchpoint.

## Preuve (avant scale)

Appliquer B1-B6 à la **famille HERO** uniquement comme RÉFÉRENCE : rendre `HeroSplit`/`HeroCentered` paramétrables (var `--sec-grid`), définir ~8-10 presets (variantes layout × déclinaisons palette), GF-1 local light+dark sur chaque preset. Une fois le pattern prouvé sur hero → vague de production (phase D) catégorie par catégorie.

## Garde-fous

- Valeurs DS only (tokens + classes utilitaires + fractions structurelles). 0 nouveau token couleur.
- `data-bg` (palette) déjà consolidé (A1) ; `data-layout`/`data-density` ajoutés ICI ; effects plus tard.
- Modèle instance/global : le preset définit le STYLE (global, via composant+classes) ; le contenu reste props d'instance.
- GF-1 local sur CHAQUE preset (déploiement Vercel différé jusqu'au reset quota).
