# 36 — TinaCMS × Astro : référence édition visuelle (d'après Amploi)

> Recherche READ-ONLY sur `vigiscope-site/amploi-astro` (cloné `/tmp/amploi-astro`).
> Chaque fait est sourcé `fichier:ligne`. Anti-hallucination : rien n'est inventé.

---

## 1. Mécanisme du bridge

TinaCMS v3 + `@tinacms/astro` s'appuient sur **deux circuits parallèles** :

1. **Route visiteur** (`src/pages/index.astro`) — Astro prérendué (`export const prerender = true`), charge les données via `loadLandingByRelativePath` (Content Collections Astro standard). Zéro Tina côté client.

2. **Route admin** (`src/pages/tina-edit/landings/[slug].astro`) — SSR pur (pas de `prerender`), charge les données via `requestWithMetadata(client.queries.landings(...))` (GraphQL Tina), puis encapsule le même composant de rendu dans `<TinaIsland>`.

Le **bridge** est un fichier JS servi à `/_tina/bridge.js` par une route Vercel serverless dédiée. Il est physiquement copié dans la fonction serverless via `includeFiles: ['./node_modules/@tinacms/bridge/dist/index.js']` (`astro.config.mjs:55`). L'interface Tina admin (SPA React) s'y connecte pour envoyer les mutations de champs en temps réel. L'island React hydratée dans la route admin applique ces mutations à l'affichage.

Pour que tout cela fonctionne, le projet doit être en mode **`output: 'server'`** (`astro.config.mjs:45`) — pas en statique. Les routes visiteur importantes posent `export const prerender = true` individuellement.

---

## 2. Fichiers clés et rôle

| Fichier | Rôle | Référence |
|---|---|---|
| `astro.config.mjs` | Intégration `tina()`, SSR output, adapter Vercel + `includeFiles` bridge, ISR exclusions, `adminBootstrapRedirect` | `astro.config.mjs:1-135` |
| `tina/config.ts` | Schéma de toutes les collections (blog, carriere, docs, services, solutions, landings, siteSettings, globalsHeader, globalsFooter), branche Git, env vars Tina Cloud | `tina/config.ts:1-1591` |
| `tina/sections-registry.ts` | `SECTION_TEMPLATES: Template[]` — 35 templates de sections. Source de vérité Tina pour `sections[]` polymorphes | `tina/sections-registry.ts:124` |
| `tina/helpers/visibility-fields.ts` | Factory `visibilityFields()` — injecte les champs `visible` + `preserveLayout` dans n'importe quel template | `tina/helpers/visibility-fields.ts:33` |
| `src/components/sections/registry.ts` | Schémas Zod stricts + mapping `type → composant`. Miroir de `tina/sections-registry.ts` côté runtime | `AGENTS.md:40-41` |
| `src/components/sections/DynamicSection.astro` | Dispatcher universel : reçoit `{ type, visible, data }`, résout le composant Astro et pose le `data-tina-field` racine de la section | `DynamicSection.astro:86-121` |
| `src/components/templates/LandingPageInner.astro` | Template de rendu de landing : itère `sections[]`, pose `data-tina-field={tinaField(section)}` sur chaque section, dispatche selon `__typename` | `LandingPageInner.astro:74-185` |
| `src/pages/tina-edit/landings/[slug].astro` | Route admin — SSR, `requestWithMetadata`, wrap dans `<TinaIsland name="landing-page" wrapper={...} params={{ relativePath }}>` | `tina-edit/landings/[slug].astro:1-77` |
| `src/pages/index.astro` | Route visiteur home — `prerender = true`, charge `home.mdx` via `loadLandingByRelativePath`, pas de Tina | `src/pages/index.astro:1-30` |
| `src/lib/islands.ts` | Registre `IslandRegistry` — pour chaque island nommée : `fetch` (requête GraphQL), `component` (composant Astro), `propsFromData` (extraction props), `wrapper` (balise HTML conteneur) | `src/lib/islands.ts:28-247` |
| `src/content/landings/home.mdx` | Contenu de la home : frontmatter YAML avec `sections[]` (type, data, visible) | `src/content/landings/home.mdx:1-60+` |

**Variables d'environnement nécessaires** (`tina/config.ts:360-367`) :
- `NEXT_PUBLIC_TINA_CLIENT_ID` — ID du projet Tina Cloud
- `TINA_TOKEN` — token d'accès lecture/écriture Tina Cloud
- `GITHUB_BRANCH` ou `VERCEL_GIT_COMMIT_REF` — branche Git source

---

## 3. Comment la home devient éditable — flux pas-à-pas

### 3.1 Schéma de données (Tina Cloud ← MDX)

La home est une **landing** : son contenu réside dans `src/content/landings/home.mdx` (`home.mdx:1`). Ce fichier MDX contient un frontmatter YAML avec `title`, `description`, et un tableau `sections[]` — chaque entrée a les clés `type`, `visible`, et `data` (`home.mdx:5-37`).

Le tableau `sections[]` est défini dans `tina/config.ts` comme :
```ts
{ type: "object", name: "sections", list: true, templateKey: "type", templates: SECTION_TEMPLATES }
```
(`tina/config.ts` — collection `landings`, champ `sections`)

La clé discriminante est `"type"` (`templateKey: "type"`). Chaque section a la structure :
```yaml
sections:
  - type: "hero"
    visible: true
    data:
      title: "..."
      eyebrow: "..."
```

### 3.2 Route admin — chargement SSR

Quand l'admin Tina ouvre `/tina-edit/landings/home` (redirect automatique depuis `/admin/` via `adminBootstrapRedirect`, `astro.config.mjs:16-39`), la route `src/pages/tina-edit/landings/[slug].astro` s'exécute en SSR :

1. `requestWithMetadata(client.queries.landings({ relativePath: 'home.mdx' }))` — requête GraphQL vers Tina Cloud (`tina-edit/landings/[slug].astro:25-31`)
2. Les données retournées ont `__typename` sur chaque section (`LandingsSectionsHero`, `LandingsSectionsClientLogos`, etc.)
3. Le composant `LandingPageInner` est rendu à l'intérieur de `<TinaIsland name="landing-page" wrapper={islands["landing-page"].wrapper} params={{ relativePath }}>` (`tina-edit/landings/[slug].astro:49-55`)

### 3.3 TinaIsland — activation du bridge

`<TinaIsland>` est le composant Astro fourni par `@tinacms/astro/TinaIsland.astro`. Il :
- Rend le contenu en HTML statique (SSR)
- Injecte un **island React** hydraté (`client:load`) qui écoute les messages du bridge Tina
- Le `wrapper` (ex: `{ tag: "div" }`) définit la balise HTML qui enveloppe l'island (`src/lib/islands.ts:31-32`)
- Le `name` et `params` permettent au bridge de re-fetcher les données via la fonction `fetch` déclarée dans `islands.ts` (`src/lib/islands.ts:33-43`)

Sans `wrapper={islands["landing-page"].wrapper}`, le panneau admin reste vide avec « TinaCMS form fields will appear here » (`AGENTS.md:134-153`).

### 3.4 Positionnement des data-tina-field

Les attributs `data-tina-field` sont posés à **deux niveaux** :

**Niveau section** (dans `LandingPageInner.astro:81`) :
```astro
<div data-tina-field={tinaField(section)}>
  ...
</div>
```
Cela rend la section entière cliquable dans l'overlay.

**Niveau champ individuel** (dans `HeroSection.astro`, par exemple) :
```astro
<h1 data-tina-field={data ? tinaField(data, "title") : undefined}>
  {resolvedTitle}
</h1>
<span data-tina-field={data ? tinaField(data, "eyebrow") : undefined}>
  {resolvedEyebrow}
</span>
```
(`HeroSection.astro:167-193`)

Pour les items de liste (stats) :
```astro
<div data-tina-field={data ? tinaField(data, "stats", index) : undefined}>
```
(`HeroSection.astro:275`)

La fonction `tinaField` vient de `@tinacms/astro` (`import { tinaField } from "@tinacms/astro"`) et génère un identifiant opaque que le bridge Tina sait interpréter pour ouvrir le bon champ dans le panneau admin.

### 3.5 Toggle de visibilité

Chaque section a un champ `visible: boolean` au niveau racine du template (défini via `visibilityFields()`, `tina/helpers/visibility-fields.ts:33`). `LandingPageInner.astro` et `DynamicSection.astro` skipent le rendu si `section.visible === false` (`LandingPageInner.astro:76`, `DynamicSection.astro:96`). Le contenu est conservé dans le MDX mais non affiché.

### 3.6 Résolution du type — double pipeline

Les sections traversent deux pipelines (`DynamicSection.astro:98-110`) :
- **YAML brut** (Content Collections standard) → clé `type` directe
- **GraphQL Tina** → clé `__typename` de format `<Collection>Sections<PascalName>` (ex: `LandingsSectionsHero`)

`DynamicSection.astro` normalise les deux vers la clé `type` du registre. `LandingPageInner.astro` fait la même chose en dérivant `LandingsSectionsHero` depuis `section.__typename` ou en construisant le `__typename` depuis `section.type` (`LandingPageInner.astro:55-71`).

---

## 4. Ce qu'il faudrait pour répliquer sur waimia-web (`SectionsRenderer`)

waimia-web a un `SectionsRenderer` qui consomme `sections: SectionData[]` et mappe `type → composant`. Voici les prérequis pour lui greffer l'édition visuelle Tina.

### 4.1 Prérequis infrastructure

| Condition | État requis | Fichier Amploi de référence |
|---|---|---|
| Mode Astro | `output: 'server'` (pas static) | `astro.config.mjs:45` |
| Adapter Vercel | `includeFiles: ['./node_modules/@tinacms/bridge/dist/index.js']` | `astro.config.mjs:55` |
| ISR exclusions | Exclure `/_tina/bridge.js`, `/tina-island/`, `/admin/`, `/tina-edit/` en **RegExp** (pas string) | `astro.config.mjs:62-78` |
| SSR vite config | `noExternal: ['@tinacms/astro']` dans `vite.ssr` | `astro.config.mjs:127-129` |

### 4.2 Schéma Tina pour `sections[]`

Dans `tina/config.ts`, déclarer le champ sections de la collection cible :
```ts
{
  type: "object",
  name: "sections",
  list: true,
  templateKey: "type",       // discriminant = clé "type" dans le MDX
  templates: SECTION_TEMPLATES,
}
```
Créer `tina/sections-registry.ts` avec un template par type de section (cf. `tina/sections-registry.ts:112-123` pour la convention Wave 9 : `{ visible, data: { ...fields } }`).

### 4.3 Deux routes par collection éditable

Pour chaque collection éditable, créer :
- **Route visiteur** : `src/pages/[slug].astro` avec `export const prerender = true`, charge via Content Collections standard
- **Route admin** : `src/pages/tina-edit/<collection>/[slug].astro`, SSR, charge via `requestWithMetadata(client.queries.<collection>(...))`, wrap dans `<TinaIsland>`

### 4.4 Registre d'islands (`src/lib/islands.ts`)

Déclarer chaque island nommée avec `fetch`, `component`, `propsFromData`, `wrapper`. Le `component` est votre template de rendu existant. Ce registre est consommé par `<TinaIsland wrapper={islands["..."].wrapper}>`.

### 4.5 Modifier `SectionsRenderer` (ou équivalent) pour la route admin

Dans le composant qui itère `sections[]`, poser `data-tina-field` à deux niveaux :

**Sur le conteneur de chaque section :**
```astro
---
import { tinaField } from "@tinacms/astro";
---
<div data-tina-field={tinaField(section)}>
  <SectionComponent {...section.data} />
</div>
```

**Dans chaque composant de section, sur chaque champ éditable :**
```astro
<h2 data-tina-field={data ? tinaField(data, "title") : undefined}>
  {data?.title}
</h2>
```

Le pattern `data ? tinaField(data, "field") : undefined` est la forme canonique Amploi — quand `data` est `undefined` (route visiteur sans Tina), l'attribut n'est pas rendu (`HeroSection.astro:167`).

### 4.6 Toggle visibilité

Pour supporter le toggle `visible` par section, il suffit que le dispatcher saute le rendu si `section.visible === false` (Amploi : `DynamicSection.astro:96`, `LandingPageInner.astro:76`). Le champ `visible` est automatiquement injecté via `visibilityFields()` dans chaque template Tina (`tina/helpers/visibility-fields.ts:33-57`).

### 4.7 Sync lockfile et build

Après tout ajout de template ou de champ :
```bash
npx tinacms build --skip-cloud-checks
# committer tina/tina-lock.json
```
(`AGENTS.md:173-178`)

---

## Récapitulatif des fichiers décisifs

| Fichier | Rôle |
|---|---|
| `astro.config.mjs` | Coeur infrastructure : SSR + bridge + ISR |
| `tina/config.ts` | Schéma complet des collections et des sections |
| `tina/sections-registry.ts` | Templates Tina des 35 sections polymorphes |
| `src/pages/tina-edit/landings/[slug].astro` | Pattern canonique route admin + TinaIsland |
| `src/lib/islands.ts` | Registre islands : fetch + component + propsFromData |
| `src/components/templates/LandingPageInner.astro` | Pattern tinaField sur sections[] + dispatch __typename |
| `src/components/sections/HeroSection.astro` | Pattern tinaField champ par champ dans un composant |
