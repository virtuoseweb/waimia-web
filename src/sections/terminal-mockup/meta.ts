// Waimia · Co-location DS (Wave #38, T5) · module `terminal-mockup` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    family: 'terminal-shell',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['scroll-reveal'],
    interactions: ['scroll'],
    elements: ['code-block'],
    layoutFacets: ['2-col', 'media-right', 'split'],
    tags: ['terminal', 'console', 'mockup', 'cli', 'platform', 'split'],
    status: 'stable',
    description_fr: 'Console terminal configurable (frame TerminalMockup) : copy optionnelle à gauche, lignes cmd/out/ok/comment et curseur clignotant, layout split ou pleine largeur.',
    description_en: 'Configurable terminal console (TerminalMockup frame): optional copy on the left, cmd/out/ok/comment lines and a blinking cursor, split or full-width layout.',
  
};
