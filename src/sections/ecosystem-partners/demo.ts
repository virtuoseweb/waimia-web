// Waimia · Co-location DS (Wave #38, T5) · module `ecosystem-partners` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'ecosystem-partners',
    kicker_fr: 'Écosystème partenaires',
    kicker_en: 'Partner ecosystem',
    h2_fr: 'Une stack éprouvée, des partenaires certifiés',
    h2_en: 'A proven stack, certified partners',
    layout: 'grid',
    partners: [
      { name: 'Claude (Anthropic)', asset: '/logos/partners/partner-claude.png', href: '/expertise-claude', category: 'ai' },
      { name: 'OpenAI', asset: '/logos/partners/partner-openai.png', href: 'https://openai.com', external: true, category: 'ai' },
      { name: 'Amazon Web Services', asset: '/logos/partners/partner-aws.png', href: 'https://aws.amazon.com', external: true, category: 'cloud' },
      { name: 'Microsoft', asset: '/logos/partners/partner-microsoft.png', category: 'cloud' },
      { name: 'Salesforce', asset: '/logos/partners/partner-salesforce.png', href: 'https://www.salesforce.com', external: true, category: 'crm' },
      { name: 'HubSpot', asset: '/logos/partners/partner-hubspot.png', href: 'https://www.hubspot.com', external: true, category: 'crm' },
    ],
  };
