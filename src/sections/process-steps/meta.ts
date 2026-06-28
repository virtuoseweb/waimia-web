// Waimia · Co-location DS (Wave #38, T5) · module `process-steps` · meta (extrait)
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
    effects: ['static'],
    interactions: ['none'],
    elements: ['line-art', 'list', 'icons'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['process', 'steps', 'how-it-works', 'numbered', 'onboarding', 'method'],
    status: 'stable',
    description_fr: '« Comment ça marche » en étapes numérotées verticales : numéro, titre, description et meta par étape, connecteurs visuels entre paliers, fonds paper à ink.',
    description_en: 'How it works in vertical numbered steps: number, title, description and meta per step, visual connectors between stages, paper to ink backgrounds.',
  
};
