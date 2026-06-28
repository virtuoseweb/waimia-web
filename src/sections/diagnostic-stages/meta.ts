// Waimia · Co-location DS (Wave #38, T5) · module `diagnostic-stages` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Process Sections',
    categorySlug: 'process-sections',
    family: 'process-steps',
    intent: ['explain-process'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['icons', 'list'],
    layoutFacets: ['multi-col'],
    tags: ['diagnostic', 'maturity', 'stages', 'conversion', 'self-assessment'],
    status: 'stable',
    description_fr: 'Auto-diagnostic « Où en êtes-vous ? » : 4 à 6 stades de maturité en cards horizontales cliquables, le stade courant relevé en accent (« vous êtes ici »). Situe le visiteur et l’oriente vers l’étape suivante (conversion + qualification).',
    description_en: 'A “Where do you stand?” self-assessment: 4 to 6 maturity stages as clickable horizontal cards, the current stage highlighted in accent (“you are here”). Places the visitor and points them to the next step (conversion + qualification).',
  
};
