# Serveur MCP capstone Waimia (#41)

Expose le catalogue Design System Waimia a un agent IA via le protocole MCP (transport stdio).

Le serveur couvre les 5 tools du capstone : recherche, detail, tokens, composition de page et rendu.

## Ce que fait le serveur

Le serveur lit les artefacts deja generes par le site (builder unique `src/lib/mcp-manifest.ts`) :

- `dist/client/library/manifest.json` : index compact tier-1 (forme `ManifestIndex`).
- `dist/client/library/section/<type>.json` : detail tier-2 par type (forme `SectionDetail`, contrat de slots).
- `src/styles/tokens.css` : variables CSS du Design System.

Il n'importe pas `astro:content`, donc il tourne en Node pur, sans serveur Astro. Le seul tool
qui a besoin d'un site en marche est `preview_render` (il relaie vers l'endpoint SSR de rendu).

## Les 5 tools

| Tool | Parametres | Retour |
| --- | --- | --- |
| `catalogue_search` | `query?`, `intent?`, `pageRole?`, `contentMode?`, `category?`, `family?`, `status?`, `usage?`, `limit?` (tous optionnels ; `limit` defaut 30, cap 199 ; `category` matche `categorySlug` OU `domain` ; `query` matche type, label et tags) | `{ total, returned, facets, results }` |
| `catalogue_get_section` | `type` (requis) | le `SectionDetail` complet, ou une erreur de tool listant les types proches si le type est inconnu |
| `ds_tokens` | `prefix?`, `group?` (alias de `prefix` ; filtre par prefixe de nom, ex. `--space`, `--paper`, `--text`) | `{ count, tokens: [{ name, value }] }` |
| `page_compose` | `sections` (requis, `[{ type, data? }]`, min 1) ; `meta?` (`collection?`, `slug?`, `lang?`, `title_fr?`, `title_en?`, `description_fr?`, `description_en?`) | `{ pageDocument, validation: { valid, errors, warnings }, sectionCount }` |
| `preview_render` | `pageDocument` (requis, l'objet renvoye par `page_compose`) ; `baseUrl?` ; `htmlMaxChars?` | `{ ok, status, baseUrl, endpoint, contentType, byteLength, truncated, html }` |

Les filtres tableau (`intent`, `pageRole`) matchent si l'entree contient la valeur ; les filtres texte sont insensibles a la casse.

### page_compose : composer + valider une page

Un agent fournit une liste de sections (type + donnees de slots). Le serveur assemble un
`PageDocument` typé sérialisable (format #39) et valide chaque section contre son contrat de
slots tier-2 : `meta.collection` requise et dans la liste des collections, `meta.slug` kebab-case,
slots de contenu requis remplis (un slot bilingue exige `_fr` ET `_en`). Le `pageDocument` est
TOUJOURS renvoye (meme invalide) pour permettre l'iteration ; `validation.valid` dit s'il est complet.

Note : la validation ne reutilise pas `validatePageDoc` (src/lib/page-document.ts) car ce module
tire `astro:content` (serveur-only, non runnable en Node pur). Le contrat de slots tier-2 expose
est la source de verite utilisee ici.

### preview_render : rendre une page en HTML

Relaie le `pageDocument` vers l'endpoint SSR existant `/library/builder/render` (source de verite
du rendu = `SectionsRenderer`, 0 duplication). Renvoie le HTML chrome-less (sections seules, sans
header/footer), pret pour une iframe de previsualisation.

## Lancer le serveur

Il faut d'abord builder le site pour generer `dist/client/library/` :

```bash
pnpm build
node mcp/waimia-catalogue-server.mjs
```

Si `dist/client/library/manifest.json` est absent, les tools de lecture renvoient une erreur claire
(`lance "pnpm build" d'abord`) au lieu de crasher. Les logs vont sur `stderr` (stdout est reserve
au protocole MCP).

Pour `preview_render`, le site doit etre joignable : par defaut `http://localhost:4321` (dev Astro).
En prod ou autre port, passe `baseUrl` dans l'appel du tool, ou definis `WAIMIA_BASE_URL`
(ex. `WAIMIA_BASE_URL=https://waimia.com`). Si le site est injoignable, le tool renvoie une erreur
explicite (jamais un crash silencieux).

## Declarer le serveur dans un client MCP

```json
{
  "mcpServers": {
    "waimia-catalogue": {
      "command": "node",
      "args": ["mcp/waimia-catalogue-server.mjs"],
      "cwd": "/Users/simonberos/waimia-web/.worktrees/1782505856-86810",
      "env": { "WAIMIA_BASE_URL": "http://localhost:4321" }
    }
  }
}
```

Remplace `cwd` par la racine du repo sur ta machine. Le serveur resout `dist/` et `src/`
relativement a son propre emplacement (`mcp/..`), donc `cwd` sert surtout au client. `env` est
optionnel (seul `preview_render` l'utilise).
