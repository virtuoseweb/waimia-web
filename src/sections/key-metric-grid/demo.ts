// Waimia · Co-location DS (Wave #38, T5) · module `key-metric-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'key-metric-grid',
    background: 'paper',
    eyebrow_fr: 'Résultats mesurés',
    eyebrow_en: 'Measured results',
    title_fr: 'Ce que le pipeline produit sur 12 mois',
    title_en: 'What the pipeline delivers over 12 months',
    columns: 4,
    size: 'lg',
    align: 'left',
    variant: 'default',
    metrics: [
      { value: '×2,4', label_fr: 'leads qualifiés', label_en: 'qualified leads', delta: '+62 %', trend: 'up' },
      { value: '€840K', label_fr: 'pipeline généré', label_en: 'pipeline generated', delta: '+38 %', trend: 'up' },
      { value: '11 j', label_fr: 'cycle de vente moyen', label_en: 'average sales cycle', delta: '-9 j', trend: 'down' },
      { value: '94 %', label_fr: 'données à jour', label_en: 'data kept current', trend: 'flat' },
    ],
  };
