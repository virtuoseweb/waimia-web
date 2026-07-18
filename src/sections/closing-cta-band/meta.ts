// Waimia · Co-location DS · module `closing-cta-band` · meta (descriptor SANS component/usage).
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'CTA Sections',
  categorySlug: 'cta-sections',
  family: 'band',
  intent: ['drive-action'],
  pageRole: ['conversion'],
  contentMode: 'instance',
  effects: ['scroll-reveal'],
  interactions: ['hover'],
  elements: ['buttons'],
  layoutFacets: ['1-col'],
  tags: ['cta', 'closing', 'ink', 'band', 'author', 'conversion'],
  status: 'stable',
  description_fr:
    'Bande CTA de cloture sur fond ink : kicker + titre display-lg (accent italique) + bouton primaire. Titre rendu en HTML (accent <em>).',
  description_en:
    'Closing CTA band on ink: kicker + display-lg title (italic accent) + primary button. Title rendered as HTML (<em> accent).',
};
