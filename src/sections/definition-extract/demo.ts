// Waimia · Co-location DS (Wave #38, T5) · module `definition-extract` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'definition-extract',
    background: 'paper',
    kicker_fr: '§ Définition · format extractible',
    kicker_en: '§ Definition · extractable format',
    statement_fr: `Un <i class="acc">site web intelligent</i> est un site rapide et structuré qui mesure chaque visite, qualifie les contacts, les route vers vos outils et s'améliore en continu : un actif d'acquisition, pas une vitrine.`,
    statement_en: `An <i class="acc">intelligent website</i> is a fast, structured site that measures every visit, qualifies contacts, routes them to your tools and keeps improving : an acquisition asset, not a brochure.`,
    pills: [
      { label_fr: 'Rapide', label_en: 'Fast' },
      { label_fr: 'SEO + GEO', label_en: 'SEO + GEO' },
      { label_fr: 'Connecté au CRM', label_en: 'CRM-connected' },
      { label_fr: 'Mesurable', label_en: 'Measurable' },
      { label_fr: 'Amélioration continue', label_en: 'Continuous improvement' },
    ],
    specs: [
      { label_fr: 'Claude-first', label_en: 'Claude-first' },
      { label_fr: '100/100 Lighthouse', label_en: '100/100 Lighthouse' },
      { label_fr: 'RGPD propre', label_en: 'Clean GDPR' },
      { label_fr: 'Tracking server-side', label_en: 'Server-side tracking' },
      { label_fr: 'Données structurées', label_en: 'Structured data' },
      { label_fr: 'Pipeline', label_en: 'Pipeline' },
    ],
  };
