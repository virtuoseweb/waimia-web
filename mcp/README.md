# Serveur MCP capstone Waimia (#41)

Expose le catalogue Design System Waimia a un agent IA via le protocole MCP (transport stdio).

> Slice 1, lecture seule. Les tools d'ecriture / render (`page.compose`, `preview.render`) arrivent dans une slice ulterieure.

## Ce que fait le serveur

Le serveur lit les artefacts deja generes par le site (builder unique `src/lib/mcp-manifest.ts`) :

- `dist/client/library/manifest.json` : index compact tier-1 (forme `ManifestIndex`).
- `dist/client/library/section/<type>.json` : detail tier-2 par type (forme `SectionDetail`, contrat de slots).
- `src/styles/tokens.css` : variables CSS du Design System.

Il n'importe pas `astro:content`, donc il tourne en Node pur, sans serveur Astro.

## Les 3 tools

| Tool | Parametres | Retour |
| --- | --- | --- |
| `catalogue_search` | `query?`, `intent?`, `pageRole?`, `contentMode?`, `category?`, `family?`, `status?`, `usage?`, `limit?` (tous optionnels ; `limit` defaut 30, cap 199 ; `category` matche `categorySlug` OU `domain` ; `query` matche type, label et tags) | `{ total, returned, facets, results }` |
| `catalogue_get_section` | `type` (requis) | le `SectionDetail` complet, ou une erreur de tool listant les types proches si le type est inconnu |
| `ds_tokens` | `prefix?`, `group?` (alias de `prefix` ; filtre par prefixe de nom, ex. `--space`, `--paper`, `--text`) | `{ count, tokens: [{ name, value }] }` |

Les filtres tableau (`intent`, `pageRole`) matchent si l'entree contient la valeur ; les filtres texte sont insensibles a la casse.

## Lancer le serveur

Il faut d'abord builder le site pour generer `dist/client/library/` :

```bash
pnpm build
node mcp/waimia-catalogue-server.mjs
```

Si `dist/client/library/manifest.json` est absent, les tools renvoient une erreur claire (`lance "pnpm build" d'abord`) au lieu de crasher. Les logs vont sur `stderr` (stdout est reserve au protocole MCP).

## Declarer le serveur dans un client MCP

```json
{
  "mcpServers": {
    "waimia-catalogue": {
      "command": "node",
      "args": ["mcp/waimia-catalogue-server.mjs"],
      "cwd": "/Users/simonberos/waimia-web/.worktrees/1782505856-86810"
    }
  }
}
```

Remplace `cwd` par la racine du repo sur ta machine. Le serveur resout `dist/` et `src/` relativement a son propre emplacement (`mcp/..`), donc `cwd` sert surtout au client.
