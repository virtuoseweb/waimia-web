// Waimia · Library · /library/manifest.json (Vague C / P2).
//
// GRAINE DU FUTUR MCP DE COMPOSITION : endpoint statique (prerender) qui sort TOUT le catalogue
// de sections sous forme lisible machine, pour qu'un agent IA puisse composer une page à partir
// de la library sans lire le code. Source de vérité unique = le registry (section-registry.ts)
// + les facettes (section-facets.ts) + les presets (section-presets.ts).
//
// Schéma (stable, versionné par `version`) :
// {
//   "version": 1,
//   "generatedFrom": "section-registry.ts + section-facets.ts + section-presets.ts",
//   "counts": { "types": N, "categories": N, "families": N, "presets": N },
//   "facets": {                       // tous les tags disponibles par genre, avec effectifs
//     "effects":      [{ "tag": "...", "label": "...", "count": N }, ...],
//     "interactions": [...], "elements": [...], "layoutFacets": [...]
//   },
//   "sections": [{                    // une entrée par type (variante)
//     "type": "...",                  // identité (SectionType)
//     "domain": "marketing|ecommerce|app-ui",   // SectionDescriptor.category (macro)
//     "categorySlug": "...",          // intent
//     "categoryLabel": "...",         // subcategory lisible
//     "family": "...",                // forme structurelle
//     "status": "stable|wip|deprecated",
//     "tags": ["..."],                // tags libres historiques
//     "effects": ["..."], "interactions": ["..."], "elements": ["..."], "layoutFacets": ["..."],
//     "description_fr": "...", "description_en": "...",
//     "presetCount": N,
//     "presets": [{ "id": "...", "label": "..." }],   // déclinaisons
//     "usage": "site|library"          // utilisé dans des pages du site, ou library-only
//   }, ...]
// }
//
// 0 nouveau token, 0 U+2014. prerender (sort un fichier statique au build).

import { listSections, listCategories, listFacetCounts } from '../../lib/section-registry';
import { FACET_LABELS_FR, type FacetKind } from '../../lib/section-facets';
import { listPresets } from '../../lib/section-presets';
import { getUsage } from '../../lib/library-manifest';

export const prerender = true;

export function GET() {
  const sections = listSections();
  const categories = listCategories();
  const categoryLabelBySlug = new Map(categories.map((c) => [c.slug, c.label]));
  const facetCounts = listFacetCounts();

  const facetKinds: FacetKind[] = ['effects', 'interactions', 'elements', 'layoutFacets'];
  const facets = Object.fromEntries(
    facetKinds.map((kind) => [
      kind,
      facetCounts[kind].map(({ tag, count }) => ({
        tag,
        label: (FACET_LABELS_FR[kind] as Record<string, string>)[tag] ?? tag,
        count,
      })),
    ]),
  );

  const sectionEntries = sections.map((section) => {
    const presets = listPresets(section.type);
    return {
      type: section.type,
      domain: section.category,
      categorySlug: section.categorySlug,
      categoryLabel: categoryLabelBySlug.get(section.categorySlug) ?? section.subcategory,
      family: section.family,
      status: section.status,
      tags: section.tags,
      effects: section.effects,
      interactions: section.interactions,
      elements: section.elements,
      layoutFacets: section.layoutFacets,
      description_fr: section.description_fr,
      description_en: section.description_en,
      presetCount: presets.length,
      presets: presets.map((p) => ({ id: p.id, label: p.label })),
      usage: getUsage(section.type),
    };
  });

  const presetTotal = sectionEntries.reduce((acc, s) => acc + s.presetCount, 0);

  const manifest = {
    version: 1,
    generatedFrom: 'section-registry.ts + section-facets.ts + section-presets.ts',
    counts: {
      types: sectionEntries.length,
      categories: categories.length,
      families: new Set(sections.map((s) => s.family)).size,
      presets: presetTotal,
    },
    facets,
    sections: sectionEntries,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
