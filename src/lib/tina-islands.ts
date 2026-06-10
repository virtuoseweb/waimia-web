import { requestWithMetadata } from '@tinacms/astro';
import type { IslandRegistry } from '@tinacms/astro/experimental';
import client from '../../tina/__generated__/client';
import OffreSections from '../components/tina/OffreSections.astro';

type OffreQueryResult = {
  data?: {
    offres?: {
      sections?: unknown[];
    };
  };
};

const TINA_SECTION_TYPES: Readonly<Record<string, string>> = {
  OffresSectionsHero_offer_detail: 'hero-offer-detail',
  OffresSectionsProblem_statement: 'problem-statement',
  OffresSectionsMethod_timeline: 'method-timeline',
  OffresSectionsDeliverables_grid: 'deliverables-grid',
  OffresSectionsStat_block: 'stat-block',
  OffresSectionsCta_final: 'cta-final',
  OffresSectionsHero_split: 'hero-split',
  OffresSectionsProof_bar: 'proof-bar',
  hero_offer_detail: 'hero-offer-detail',
  problem_statement: 'problem-statement',
  method_timeline: 'method-timeline',
  deliverables_grid: 'deliverables-grid',
  stat_block: 'stat-block',
  cta_final: 'cta-final',
  hero_split: 'hero-split',
  proof_bar: 'proof-bar',
};

function normalizeSections(value: unknown): unknown[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((section) => {
    if (!section || typeof section !== 'object' || Array.isArray(section)) return [];

    const data = section as Record<string, unknown>;
    const typename = typeof data.__typename === 'string' ? data.__typename : '';
    const template = typeof data._template === 'string' ? data._template : '';
    const existingType = typeof data.type === 'string' ? data.type : '';
    const type = existingType || TINA_SECTION_TYPES[typename] || TINA_SECTION_TYPES[template];

    return type ? [{ ...data, type }] : [];
  });
}

export const islands: IslandRegistry = {
  offre: {
    fetch: (_request, params) =>
      requestWithMetadata(
        client.queries.offres({
          relativePath: `${params.get('slug') ?? 'activation-ia'}.mdx`,
        }),
        { priority: 'primary' },
      ),
    component: OffreSections,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      sections: normalizeSections((data as OffreQueryResult).data?.offres?.sections),
    }),
  },
};
