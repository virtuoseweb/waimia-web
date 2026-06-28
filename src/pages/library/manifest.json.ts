// Waimia · Library · /library/manifest.json (Vague C / P2, passé en 2 tiers à la Vague C2-B).
//
// TIER 1, INDEX COMPACT (graine MCP `catalogue.search`). Endpoint statique (prerender) sur
// lequel un agent IA CHERCHE / filtre l'ensemble du catalogue, sans charger le détail de chaque
// type. Petit par entrée : facettes agrégées + une CompactEntry par type qui pointe vers le
// tier 2 (`detailHref` → /library/section/<type>.json) pour la composition réelle.
//
// La FORME est définie une seule fois dans le builder `src/lib/mcp-manifest.ts` (DRY, 0 drift
// avec le tier 2). Source de vérité des données = registry + facettes + slots + presets + usage.
//
// Schéma (versionné par `version`, cf ManifestIndex dans mcp-manifest.ts) :
// {
//   "version": 2,
//   "generatedFrom": "...",
//   "counts": { "types": N, "categories": N, "families": N, "presets": N },
//   "facets": {
//     "effects": [{ "tag", "label", "count" }], "interactions", "elements", "layoutFacets",
//     "intent": [...], "pageRole": [...], "contentMode": [...]   // facettes sémantiques C2-A
//   },
//   "sections": [{
//     "type", "domain", "categorySlug", "family", "status",
//     "intent": ["..."], "pageRole": ["..."], "contentMode", "contentSource"?,
//     "label", "presetCount", "usage", "detailHref"
//   }, ...]
// }
//
// 0 nouveau token, 0 U+2014. prerender (sort un fichier statique au build).

import { buildIndex } from '../../lib/mcp-manifest';

export const prerender = true;

export function GET() {
  const manifest = buildIndex();
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
