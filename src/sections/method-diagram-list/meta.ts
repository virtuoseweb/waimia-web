// Waimia · Co-location DS · module `method-diagram-list` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Process Sections',
  categorySlug: 'process-sections',
  family: 'process-steps',
  intent: ['explain-process'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: [],
  elements: ['line-art', 'list'],
  layoutFacets: ['1-col'],
  tags: ['method', 'process', 'diagram', 'steps', 'numbered', 'author'],
  status: 'stable',
  description_fr:
    'Bloc methode : entete + diagramme de process (SVG de marque) + liste numerotee de phases (numero mono + titre + corps).',
  description_en:
    'Method block: heading + process diagram (brand SVG) + numbered phase list (mono number + title + body).',
};
