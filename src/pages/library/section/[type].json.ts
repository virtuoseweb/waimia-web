// Waimia · Library · /library/section/<type>.json (Vague C2-B).
//
// TIER 2, DÉTAIL PAR TYPE (graine MCP `catalogue.getSection`). Endpoint statique (prerender)
// émis pour CHAQUE type du registry (getStaticPaths sur listSections() → couvre les 199 types).
// Un agent IA récupère ce document après avoir trouvé le type dans le tier 1 (index compact) :
// il contient tout pour COMPOSER / instancier la section, dont le CONTRAT DE SLOTS (C2-A,
// getSlots) qui dit quels champs remplir, plus les presets et les descriptions complètes.
//
// La FORME est définie une seule fois dans le builder `src/lib/mcp-manifest.ts`
// (`buildSectionDetail`, DRY, 0 drift avec le tier 1). 0 nouveau token, 0 U+2014.

import type { APIRoute, GetStaticPaths } from 'astro';
import type { SectionType } from '../../../schemas/sections';
import { allSectionTypes } from '../../../lib/mcp-manifest';
import { buildSectionDetail } from '../../../lib/mcp-manifest';

export const prerender = true;

// Un path par type du registry (couvre les 199 types). Disjoint des autres routes /library/*.
export const getStaticPaths: GetStaticPaths = () =>
  allSectionTypes().map((type) => ({ params: { type } }));

export const GET: APIRoute = ({ params }) => {
  const detail = buildSectionDetail(params.type as SectionType);
  if (!detail) {
    return new Response(JSON.stringify({ error: 'unknown section type', type: params.type }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
  return new Response(JSON.stringify(detail, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
