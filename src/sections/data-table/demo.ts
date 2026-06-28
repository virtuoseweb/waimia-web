// Waimia · Co-location DS (Wave #38, T5) · module `data-table` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'data-table',
    kicker_fr: '[data] · comparatif offres',
    kicker_en: '[data] · plan comparison',
    h2_fr: 'Trois formules, une <i class="acc">seule</i> équipe.',
    h2_en: 'Three plans, one <i class="acc">single</i> team.',
    intro_fr: 'Les chiffres bruts, sans habillage. Chaque ligne reflète un engagement contractuel mesuré chaque mois.',
    intro_en: 'The raw figures, no varnish. Every row reflects a contractual commitment measured monthly.',
    background: 'paper',
    striped: true,
    caption_fr: 'Tarifs hors taxes, périmètre France, mise à jour avril 2026.',
    caption_en: 'Prices excl. tax, France scope, updated April 2026.',
    columns: [
      { label_fr: 'Formule', label_en: 'Plan', align: 'start' },
      { label_fr: 'Workflows', label_en: 'Workflows', align: 'center' },
      { label_fr: 'Relances / mois', label_en: 'Follow-ups / mo', align: 'center' },
      { label_fr: 'Tarif', label_en: 'Price', align: 'end' },
    ],
    rows: [
      { cells: [
        { text_fr: 'Amorçage', text_en: 'Seed', emphasis: true },
        { text_fr: '8', text_en: '8' },
        { text_fr: '1 200', text_en: '1,200' },
        { text_fr: '1 900 € / mois', text_en: '€1,900 / mo' },
      ] },
      { cells: [
        { text_fr: 'Croissance', text_en: 'Growth', emphasis: true },
        { text_fr: '23', text_en: '23' },
        { text_fr: '4 800', text_en: '4,800' },
        { text_fr: '4 200 € / mois', text_en: '€4,200 / mo' },
      ] },
      { cells: [
        { text_fr: 'Échelle', text_en: 'Scale', emphasis: true },
        { text_fr: 'Illimité', text_en: 'Unlimited' },
        { text_fr: '14 000', text_en: '14,000' },
        { text_fr: 'Sur devis', text_en: 'On request' },
      ] },
    ],
  };
