// Waimia · Co-location DS · module `hero-manifesto` · donnee demo bilingue (neutre, reelle).
import type { DemoData } from '../../lib/section-demos';

export const demo = {
  type: 'hero-manifesto',
  meta: [
    { html_fr: 'Waimia · Manifeste 02', html_en: 'Waimia · Manifesto 02' },
    { html_fr: 'Montpellier · 2026', html_en: 'Montpellier · 2026' },
    {
      html_fr: '<span style="color:var(--accent-text)">◉</span> Booking T3',
      html_en: '<span style="color:var(--accent-text)">◉</span> Booking Q3',
    },
  ],
  eyebrow_fr: 'Un studio IA solo · <span style="color:var(--accent-text)">marketing, sales, contenu, web, CRM et marque alignés</span>',
  eyebrow_en: 'A solo AI studio · <span style="color:var(--accent-text)">marketing, sales, content, web, CRM and brand aligned</span>',
  h1_fr: 'Construire du <i class="accent">revenu</i>,<br />pas des démos.',
  h1_en: 'Build <i class="accent">revenue</i>,<br />not demos.',
  subhead_fr: 'Un manifeste en cinq actes. Lu d’une traite, il prend dix&nbsp;minutes. Appliqué chez vous, il s’écrit en <i>quatre semaines</i>.',
  subhead_en: 'A manifesto in five acts. Read in one sitting, it takes ten minutes. Applied at your company, it writes itself in <i>four weeks</i>.',
  intro_fr: "On câble l'IA dans vos outils marketing, sales et web : acquisition, contenu, CRM, site, analytics, marque. Sans changer vos process.",
  intro_en: 'We wire AI into your marketing, sales and web stack: acquisition, content, CRM, site, analytics, brand. Without changing your process.',
  cta_primary_label_fr: 'Prendre RDV →',
  cta_primary_label_en: 'Book a session →',
  cta_primary_href: '/contact',
  cta_secondary_label_fr: 'Notre expertise Claude',
  cta_secondary_label_en: 'Our Claude expertise',
  cta_secondary_href: '/services/integration-claude',
  foot: [
    { text_fr: 'SCROLL TO BEGIN ↓', text_en: 'SCROLL TO BEGIN ↓' },
    { text_fr: 'FIVE ACTS · ONE DOCUMENT', text_en: 'FIVE ACTS · ONE DOCUMENT' },
  ],
} satisfies DemoData;
