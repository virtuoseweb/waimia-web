// Waimia · Co-location DS (Wave #38, T5) · module `hero-conversion-funnel` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'hero-conversion-funnel',
    variant: 'split',
    media_register: 'lineart',
    media_src: '/images/line-art/dispositif-flow.svg',
    media_alt_fr: 'Schéma : outils dispersés, orchestration centrale, résultat mesuré',
    media_alt_en: 'Diagram: scattered tools, central orchestration, measured result',
    funnel_num: '§ Flagship 01',
    h1_fr: 'Site web <i>IA-first</i>.<br/>Leads automatisés.',
    h1_en: 'AI-first <i>website</i>.<br/>Automated leads.',
    lede_fr: 'Trois agents IA orchestrent acquisition, contenu et CRM. Résultat mesuré en 90 jours.',
    lede_en: 'Three AI agents orchestrate acquisition, content, and CRM. Result measured in 90 days.',
    meta_pills: [
      { label_fr: 'Offre signature', label_en: 'Signature offer' },
      { label_fr: 'Acquisition → conversion → activation', label_en: 'Acquisition → conversion → activation' },
      { label_fr: 'Agent éditeur inclus', label_en: 'Editor agent included' },
    ],
    benefits: [
      { label_fr: 'Lighthouse 100/100/100/100 garanti', label_en: 'Lighthouse 100/100/100/100 guaranteed' },
      { label_fr: '8 articles SEO/mois automatisés', label_en: '8 automated SEO articles/month' },
      { label_fr: 'Relances CRM < 1h', label_en: 'CRM follow-ups in < 1h' },
      { label_fr: '90 jours pour le ROI mesuré', label_en: '90 days to measured ROI' },
    ],
    proof_fr: 'Médiane 6 mois sur 12 PME · +340% leads qualifiés · −72% temps content',
    proof_en: '6-month median on 12 SMBs · +340% qualified leads · −72% content time',
    cta_primary: { label_fr: 'Voir les tarifs ↓', label_en: 'See pricing ↓', href: '#pricing', variant: 'primary' },
    cta_secondary: { label_fr: 'Voir la démo', label_en: 'See the demo', href: '#demo', variant: 'ghost' },
    stats: [
      { value: '+340%', label_fr: 'leads qualifiés', label_en: 'qualified leads' },
      { value: '−72%', label_fr: 'temps content', label_en: 'content time' },
      { value: '8', label_fr: 'articles/mois auto', label_en: 'articles/month auto' },
      { value: '90j', label_fr: 'ROI mesuré', label_en: 'measured ROI' },
    ],
  };
