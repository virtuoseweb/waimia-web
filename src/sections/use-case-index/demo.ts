// Waimia · Co-location DS (Wave #38, T5) · module `use-case-index` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'use-case-index',
    roman: 'III',
    label_fr: "§ 05 · Cas d'usage horizontaux",
    label_en: '§ 05 · Horizontal use cases',
    heading_fr: "Cinq <i>cas d'usage</i>. Une seule méthode.",
    heading_en: 'Five <i>use cases</i>. One method.',
    aside_fr: 'Acquisition, CRM, contenu, productivité, support : les douleurs récurrentes des PME. Mêmes systèmes, vocabulaire adapté à votre métier.',
    aside_en: 'Acquisition, CRM, content, productivity, support: recurring SMB pain points. Same systems, wording adapted to your sector.',
    num_prefix_fr: 'USE CASE',
    num_prefix_en: 'USE CASE',
    items: [
      { label_fr: 'Contenu SEO/GEO',   label_en: 'SEO/GEO Content',   tag_fr: 'Articles · landing · indexation IA',    tag_en: 'Articles · landings · AI indexing',     href: '#' },
      { label_fr: 'Content marketing', label_en: 'Content marketing', tag_fr: 'Éditorial · calendrier · repurposing',  tag_en: 'Editorial · calendar · repurposing',    href: '#' },
      { label_fr: 'Publicité',         label_en: 'Advertising',       tag_fr: 'Google · Meta · ROI',                   tag_en: 'Google · Meta · ROI',                   href: '#' },
      { label_fr: 'Tunnel de vente',   label_en: 'Sales funnel',      tag_fr: 'Landing · étapes · conversion',         tag_en: 'Landing · steps · conversion',          href: '#' },
      { label_fr: 'Agent marketing',   label_en: 'Marketing agent',   tag_fr: 'Prospection · relances · nurturing',    tag_en: 'Prospecting · follow-ups · nurturing',  href: '#' },
    ],
    footer_label_fr: 'Adapté à votre secteur →',
    footer_label_en: 'Adapted to your sector →',
    footer_href: '/secteurs',
  };
