# 36 · TinaCMS × Astro : édition visuelle **SANS React** (référence à jour)

> Réécrit le 2026-06-10. Source de vérité = les **releases GitHub `tinacms/tinacms`** (notes verbatim) + l'exemple officiel **`examples/astro/visual-editing`** lu au tag `@tinacms/astro@0.5.0`. Chaque fait est sourcé (release / PR / `fichier`).
> ⚠️ Cette version **remplace** la précédente (basée sur le projet Amploi). L'ancienne décrivait le pattern *island React `client:load` + `output: 'server'` + bridge serverless `/_tina/bridge.js`*. Tina a **publié une nouvelle approche** (mai 2026) qui rend cet ancien pattern obsolète. Détail du « avant/après » en §6.

---

## 0. TL;DR (ce qui a changé, et pourquoi ça nous concerne)

- **`tinacms@3.8.0` (2026-05-12)** ship littéralement « **Visual editing for Astro · without React** ». L'édition visuelle ne passe **plus** par le hook React `useTina()` qui re-render l'arbre de page. Elle passe par **`@tinacms/bridge`** : un bundle **vanilla-JS ~2 KB gzip, 0 dépendance**, qui parle le protocole postMessage de l'admin Tina. **0 React dans l'arbre de page, 0 island hydratée, 0 coût d'hydratation hors de l'iframe d'édition.** ([release `tinacms@3.8.0`](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.8.0) · [PR #6771](https://github.com/tinacms/tinacms/pull/6771))
- **`@tinacms/bridge@0.3.0` + `@tinacms/astro@0.3.0` (2026-05-25)** ajoutent le support **`output: 'static'`** (et mixte static/SSR). Plus besoin de basculer le site en `output: 'server'`. ([PR #6843](https://github.com/tinacms/tinacms/pull/6843))
- **`@tinacms/astro@0.4.0` (2026-05-28)** ajoute le **support officiel Astro 6** (peer dep `^5.0.0 || ^6.0.0`). ([PR #6969](https://github.com/tinacms/tinacms/pull/6969))
- **waimia-web = Astro 6 + `output: 'static'`** → la nouvelle approche est **directement compatible** et **ne casse pas le SSG**. C'est l'inverse de ce que disait l'ancien doc/36 (qui exigeait `output: 'server'`).

Conclusion : pour brancher Tina sur waimia-web (tâche #20), on vise **l'approche No-React** (`examples/astro/visual-editing`), **pas** le pattern React de l'ancien doc, ni l'exemple `kitchen-sink` (qui, lui, met React sur la page via `client:tina`).

---

## 1. Méthode de recherche GitHub (pour réinterroger à chaque montée de version)

Les packages Tina sont **scopés** (`@tinacms/...`) et **monorepo** : les releases sont taguées `@tinacms/astro@X.Y.Z`. La bonne façon de les lister/lire :

```bash
# Lister toutes les releases d'un package scopé (tag | date | url)
gh api 'repos/tinacms/tinacms/releases?per_page=100' --paginate \
  --jq '.[] | select(.tag_name|test("@tinacms/astro@")) | .tag_name + "  |  " + (.published_at|split("T")[0]) + "  |  " + .html_url'

# Lire les notes (body) de plusieurs packages d'un coup
gh api 'repos/tinacms/tinacms/releases?per_page=100' --paginate \
  --jq '.[] | select(.tag_name|test("@tinacms/astro@|@tinacms/bridge@|^tinacms@")) | "===== " + .tag_name + " =====\n" + (.body // "")'

# Lire un fichier de l'exemple officiel à un tag précis (base64 → décodé)
gh api "repos/tinacms/tinacms/contents/examples/astro/visual-editing/astro.config.mjs?ref=@tinacms/astro@0.5.0" \
  --jq '.content' | base64 -d
```

> Astuce : `GH_DEBUG=` (vide) coupe les logs verbeux `* Request at...`. Les `@` et `/` dans le tag passent tels quels dans `?ref=` de l'API `contents`.

---

## 2. Matrice de versions (au 2026-06-10, vérifiée via `gh api releases`)

| Package | Dernière | Date | Apport décisif (sourcé) |
|---|---|---|---|
| `tinacms` (core admin) | **3.9.1** | 2026-06-05 | 3.8.0 = **édition visuelle Astro sans React** ([3.8.0](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.8.0)) ; 3.9.x = workflow éditorial médias sur branches protégées, cache edge-safe |
| `@tinacms/astro` | **0.5.0** | 2026-06-08 | 0.2.0 init ; **0.3.0 = static support** ; **0.4.0 = Astro 6** ; 0.4.1 = Cloudflare ; 0.5.0 = `TinaMarkdown` table ([0.5.0](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.5.0)) |
| `@tinacms/bridge` | **0.3.0** | 2026-05-25 | Le bridge vanilla-JS ; **0.3.0 = support pages statiques** ([0.3.0](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fbridge%400.3.0)) |
| `@tinacms/vercel-previews` | **0.2.13** | 2026-06-05 | Intégration **preview Vercel** (overlay en preview-deploy / draft mode). Complémentaire, pas requis pour l'édition visuelle de base |

Releases citées par toi (toutes vérifiées existantes) :
[`@tinacms/astro@0.2.0`](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.2.0) ·
[`@tinacms/astro@0.3.0`](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.3.0) ·
[`@tinacms/astro@0.4.0`](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.4.0) ·
[`@tinacms/bridge@0.3.0`](https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fbridge%400.3.0) ·
[`tinacms@3.8.0`](https://github.com/tinacms/tinacms/releases/tag/tinacms%403.8.0).
À noter : il existe déjà **0.4.1 et 0.5.0** au-delà du 0.4.0, et le `@tinacms/vercel-preview` que tu cites s'écrit en réalité **`@tinacms/vercel-previews`** (pluriel).

---

## 3. Comment marche l'édition visuelle « no React » (flux sourcé README + 3.8.0)

L'admin Tina (`/admin/`, SPA React) tourne **uniquement dans une iframe d'édition**. La page éditée, elle, est **du HTML Astro pur** + le petit bridge injecté en mode édition seulement.

```
┌─────────────────────────────────┐    ┌──────────────────────────────┐
│  Admin (/admin/index.html)      │    │  Iframe (ta page Astro)      │
│  App React, possède le form     │    │  HTML SSR/SSG + bridge.js +  │
│                                 │    │  payloads form injectés dans │
│                                 │    │  <head> par le middleware    │
│  ◀── {open,id,query,data} ◀─────┼────│  tina(). Bridge lit les      │
│                                 │    │  [data-tina-form].           │
│  l'utilisateur édite un champ   │    │                              │
│  ─── {updateData,id,data} ────▶ │    │  bridge stocke la data       │
│                                 │    │  bridge POST                 │
│                                 │    │   /tina-island/<name>?...     │
│                                 │    │   body: {[id]: data}         │
│                                 │    │  Astro re-render l'island →  │
│                                 │    │  bridge swap le HTML in-DOM  │
└─────────────────────────────────┘    └──────────────────────────────┘
```
(ASCII repris du `README.md` de l'exemple officiel.)

Points clés (verbatim release `tinacms@3.8.0` + README) :
- **« soft-refresh » et non re-render React** : sur chaque changement de champ, le bridge POST l'overlay courant à l'endpoint d'island ; le **serveur rend le composant en fragment HTML** ; le bridge **swap** le fragment dans le DOM vivant. Scope par island (éditer le hero ne refetch que le hero).
- **Transport JSON-over-POST** → l'UTF-8 (tirets, guillemets typographiques, emoji) et les gros rich-text round-trip sans limite de charset/taille.
- **Protocole stateless** : l'admin pousse la data déjà résolue ; l'endpoint la lit via `readOverlay()` (`@tinacms/bridge/preview`) au lieu de toucher le content store. En prod (pas d'overlay) → fetch GraphQL normal. **0 changement backend.**
- **0 JS chez le visiteur** : le middleware `tina()` n'injecte le bridge + les payloads `data-tina-form` **que sur les réponses en mode édition**. « Production HTML is byte-identical to a Tina-free Astro app » (README).
- **`tinaField()` est framework-free** depuis 3.8.0 (`tinacms/tina-field`, sans tirer React/Plate/dnd-kit). Re-exporté aussi par `@tinacms/astro`.

---

## 4. Implémentation canonique (fichiers de `examples/astro/visual-editing` @ `@tinacms/astro@0.5.0`)

### 4.1 `astro.config.mjs`
```js
import tina from '@tinacms/astro/integration';
export default defineConfig({
  output: 'server',                 // l'EXEMPLE est en server ; la feature marche aussi en 'static'/mixte (cf §5)
  adapter: node({ mode: 'standalone' }),
  integrations: [mdx(), tina()],    // le middleware tina() fait toute l'injection edit-mode
  vite: { ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] } },
});
```

### 4.2 `src/lib/islands.ts` · le **registre** (source unique des régions éditables)
```ts
import type { IslandRegistry } from '@tinacms/astro/experimental';
import Blocks from '../components/blocks/Blocks.astro';
import { getPage } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: (_req, params) => getPage(params.get('slug') ?? 'home'),
    component: Blocks,                       // un composant Astro pur
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({ page: data?.data?.page }),
  },
  // ... post, blog, author, global, global-footer
};
```
Ajouter une région éditable = **une entrée** dans ce registre.

### 4.3 `src/pages/tina-island/[name].ts` · **l'unique** route on-demand
```ts
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/islands';
export const prerender = false;            // SEUL endpoint non-prérendu nécessaire
export const ALL = experimental_createIslandRoute(islands);
```
C'est la seule route serverless. Tout le reste du site peut rester statique.

### 4.4 Page visiteur · `<TinaIsland>` enveloppe le rendu
```astro
---
import TinaIsland from '@tinacms/astro/TinaIsland.astro';
import Blocks from '../components/blocks/Blocks.astro';
import { getPage } from '../lib/data';
import { islands } from '../lib/islands';
const page = await getPage('home');
---
<TinaIsland name="page" wrapper={islands.page.wrapper} params={{ slug: 'home' }} primary>
  <Blocks page={page.data.page} />
</TinaIsland>
```
`primary` désigne le form principal de la page (sélection en mode statique ; en SSR c'est `requestWithMetadata(..., { priority: 'primary' })`).

### 4.5 Chargement data · `requestWithMetadata`
```ts
import { requestWithMetadata } from '@tinacms/astro';
import client from '../../tina/__generated__/client';
export const getPost = (slug) =>
  requestWithMetadata(client.queries.post({ relativePath: `${slug}.md` }));
```
`requestWithMetadata` stampe la metadata que `tinaField()` lit, génère l'id de form du bridge, et en mode édition substitue `data` par l'overlay non sauvegardé. **Même code path en prod (pas d'overlay → fetch normal) et en édition.**

### 4.6 Attributs sur les régions éditables
```astro
<article data-tina-island="/tina-island/post?slug=foo">
  <h1 data-tina-field={tinaField(post.data.post, 'title')}>{post.data.post.title}</h1>
</article>
```
- `data-tina-island` → endpoint de refresh (le bridge y POST l'overlay).
- `data-tina-field` → click-to-focus champ par champ (clic dans l'iframe → focus du champ dans l'admin).

---

## 5. Ce que ça implique **concrètement pour waimia-web** (tâche #20)

waimia-web = **Astro 6, `output: 'static'`, adapter `@astrojs/vercel`, DS composable via `section-registry` + `SectionsRenderer`**.

1. **Pas de bascule en `output: 'server'`.** On reste statique (bridge 0.3.0). On ajoute **un seul** `src/pages/tina-island/[name].ts` (`prerender = false`) → une **fonction serverless Vercel** unique ; toutes les pages restent prérendues (`prerender = true`). C'est le mode « mixte static/SSR » documenté par bridge@0.3.0.
2. **0 React shippé aux visiteurs.** L'admin `/admin/` React ne charge que dans l'iframe d'édition. Cohérent avec notre exigence perf (zéro-JS par défaut) et le DS figé.
3. **Le registre d'islands `src/lib/islands.ts` mappe sur notre `section-registry`.** Chaque type de section composable (déjà `type → composant`) devient une island : `component` = le composant `sections/*.astro` existant, `fetch` = lecture de la collection MDX (`offres/[...slug]`, etc.), `wrapper` = conteneur. Le `data-tina-island` se pose au niveau `SectionsRenderer`, le `data-tina-field` champ par champ dans chaque `sections/*.astro` (forme canonique `data ? tinaField(data, 'champ') : undefined` → attribut absent en route visiteur).
4. **Schéma Tina sur `sections[]`** : déclarer dans `tina/config.ts` le champ `sections` (`type:"object", list:true, templateKey:"type", templates: SECTION_TEMPLATES`) en **miroir** de `src/schemas/sections.ts` (nos 4 touchpoints restent la source runtime ; Tina ajoute la couche d'édition par-dessus, il ne la remplace pas). Cf [[vision-produit-roadmap-saas]] : Tina = CONTENU, pas un CMS maison ; le DESIGN reste DS Studio / couche C.
5. **Versions à épingler** : `@tinacms/astro@^0.5.0`, `@tinacms/bridge@^0.3.0`, `tinacms@^3.9.x`, `@tinacms/datalayer` + `@tinacms/mdx` (deps de l'exemple). React (`react`/`react-dom@^18`) reste en **devDependency** pour builder le SPA admin uniquement.
6. **Build** : `tinacms build && astro build` (l'exemple) ; chez nous `tinacms build --skip-cloud-checks` puis le build pnpm, committer `tina/tina-lock.json` (cf rule 29 sync lockfile).
7. **`@tinacms/vercel-previews`** (optionnel, plus tard) : overlay d'édition dans les **preview-deploys Vercel** (draft mode). Pas requis pour le `/admin/` local + édition visuelle de base ; à évaluer si on veut éditer depuis une preview branch.

---

## 6. Avant / après (pourquoi l'ancien doc/36 était à jeter)

| Aspect | Ancien doc/36 (pattern Amploi, < 3.8.0) | Nouveau (Tina ≥ 3.8.0 / astro ≥ 0.3.0) |
|---|---|---|
| React sur la page | **Oui** : `<TinaIsland>` injectait un **island React `client:load`** | **Non** : bridge vanilla-JS, 0 React dans l'arbre de page |
| Mode Astro | **`output: 'server'` requis** | **`output: 'static'`** (ou mixte) OK |
| Bridge | route serverless `/_tina/bridge.js` + `includeFiles: ['.../@tinacms/bridge/dist/index.js']` | **asset statique `/admin/bridge.js`** ; route `/_tina/bridge.js` **supprimée**, export `@tinacms/astro/bridge-route` **retiré** |
| Mécanisme MAJ | re-render React in-place | **soft-refresh** : POST overlay → fragment HTML serveur → swap DOM |
| Astro 6 | non garanti | **support officiel** (astro@0.4.0, peer `^5 || ^6`) |
| Endpoint requis | routes admin SSR par collection | **un seul** `tina-island/[name].ts` (`prerender=false`) via `experimental_createIslandRoute` |

L'ancien doc reflétait fidèlement Amploi **à sa date** ; il n'est pas « faux », il est **antérieur** au virage No-React de Tina. Conserver Amploi comme historique, mais **ne pas répliquer ce pattern** sur waimia-web.

---

## 7. Références (liens vérifiés 2026-06-10)

- Release **`tinacms@3.8.0`** (« Visual editing for Astro · without React ») : https://github.com/tinacms/tinacms/releases/tag/tinacms%403.8.0 · PR https://github.com/tinacms/tinacms/pull/6771
- Release **`@tinacms/bridge@0.3.0`** + **`@tinacms/astro@0.3.0`** (static support) : https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fbridge%400.3.0 · PR https://github.com/tinacms/tinacms/pull/6843
- Release **`@tinacms/astro@0.4.0`** (Astro 6) : https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.4.0 · PR https://github.com/tinacms/tinacms/pull/6969
- Release **`@tinacms/astro@0.5.0`** (dernière) : https://github.com/tinacms/tinacms/releases/tag/%40tinacms%2Fastro%400.5.0 · PR https://github.com/tinacms/tinacms/pull/7041
- Exemple officiel **`examples/astro/visual-editing`** : https://github.com/tinacms/tinacms/tree/main/examples/astro/visual-editing
- Exemple « sibling » React (`client:tina`) **`examples/astro/kitchen-sink`** (à NE PAS suivre pour nous) : https://github.com/tinacms/tinacms/tree/main/examples/astro/kitchen-sink
- Liste des releases d'un package scopé : commande `gh api` en §1.
