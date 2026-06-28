// Waimia · Co-location DS (Wave #38, T5) · module `faq-cta-aside` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'faq-cta-aside',
    background: 'paper-2',
    kicker_fr: 'FAQ · réponses directes',
    kicker_en: 'FAQ · direct answers',
    h2_fr: 'Les questions <i>avant</i> de signer',
    h2_en: 'The questions <i>before</i> you sign',
    items: [
      { q_fr: 'Combien de temps pour un premier livrable ?', q_en: 'How long until a first deliverable?', a_fr: 'AI Activation expédie un pilote utile en 1 semaine. Le Growth System se déploie en 6 à 10 semaines.', a_en: 'AI Activation ships a useful pilot in 1 week. The Growth System rolls out in 6 to 10 weeks.' },
      { q_fr: "Que se passe-t-il si l'audit ne trouve rien ?", q_en: 'What if the audit finds nothing?', a_fr: 'On vous le dit franchement et on ne relance pas. Pas de mission inventée pour la facturer.', a_en: 'We tell you plainly and never follow up. No invented engagement just to bill it.' },
      { q_fr: 'Travaillez-vous avec notre stack actuelle ?', q_en: 'Do you work with our current stack?', a_fr: 'Oui. HubSpot, Salesforce, Notion, Excel, GA4 : on câble sur ce qui tourne déjà.', a_en: 'Yes. HubSpot, Salesforce, Notion, Excel, GA4: we wire onto what already runs.' },
    ],
    open_first: true,
    aside_title_fr: 'Encore une question ?',
    aside_title_en: 'Still one question?',
    aside_body_fr: '30 minutes en visio. On regarde votre cas, on chiffre, vous repartez avec un plan clair.',
    aside_body_en: '30 minutes on a call. We look at your case, we price it, you leave with a clear plan.',
    aside_cta: { label_fr: 'Réserver un créneau →', label_en: 'Book a slot →', href: '/contact', variant: 'primary' },
    aside_note_fr: 'Réponse sous 24h · sans engagement',
    aside_note_en: 'Reply within 24h · no commitment',
  };
