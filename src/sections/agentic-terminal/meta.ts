// Waimia · Co-location DS (Wave #38, T5) · module `agentic-terminal` · meta (extrait)
// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.

import type { SectionMeta } from '../_shared/types';

export const meta: SectionMeta = {
    category: 'marketing',
    subcategory: 'Terminal Sections',
    categorySlug: 'terminal-sections',
    family: 'terminal-shell',
    intent: ['show-features'],
    pageRole: ['body'],
    contentMode: 'instance',
    effects: ['static'],
    interactions: ['none'],
    elements: ['code-block', 'badge'],
    layoutFacets: ['1-col'],
    tags: ['terminal', 'ide', 'agentic', 'typing', 'live', 'cli', 'code', 'animated'],
    status: 'stable',
    description_fr: "Mockup IDE agentique : fenêtre macOS, explorateur de fichiers, prompt utilisateur et bloc de code qui s'écrit en direct caractère par caractère, puis message de succès, footer stats et badges. Fond encre, accent terracotta.",
    description_en: 'Agentic IDE mockup: macOS window, file explorer, user prompt and a code block typed live character by character, then a success message, footer stats and badges. Ink background, terracotta accent.',
  
};
