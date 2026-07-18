// Waimia · Co-location DS · module `used-service-callout` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'used-service-callout',
  label_fr: 'Offre utilisée',
  label_en: 'Service used',
  links: [
    { label_fr: 'Site web intelligent', label_en: 'Intelligent website', href: '/services' },
    { label_fr: 'Système de prospection', label_en: 'Prospecting system', href: '/services' },
  ],
};
