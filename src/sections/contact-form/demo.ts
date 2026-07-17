// Waimia · Co-location DS (Wave #38, T5) · module `contact-form` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'contact-form',
    background: 'paper',
    kicker_fr: 'Parlons de votre projet',
    kicker_en: "Let's talk about your project",
    h2_fr: 'Dites-nous ce que vous voulez <i>câbler</i>',
    h2_en: 'Tell us what you want to <i>wire</i>',
    body_fr: 'Décrivez votre contexte en deux lignes. On revient vers vous sous 24h avec une première lecture, pas un argumentaire.',
    body_en: 'Describe your context in two lines. We reply within 24h with a first read, not a sales pitch.',
    name_label_fr: 'Nom', name_label_en: 'Name',
    email_label_fr: 'Email', email_label_en: 'Email',
    message_label_fr: 'Votre projet en deux lignes', message_label_en: 'Your project in two lines',
    submit_label_fr: 'Envoyer le message →',
    submit_label_en: 'Send message →',
    form_action: '/api/contact',
    hint_fr: 'Vos données restent privées · jamais revendues',
    hint_en: 'Your data stays private · never resold',
    details: [
      { label_fr: 'Email', label_en: 'Email', value: 'bonjour@waimia.com', href: 'mailto:bonjour@waimia.com' },
      { label_fr: 'Réponse', label_en: 'Response', value: 'Sous 24h ouvrées' },
      { label_fr: 'Base', label_en: 'Based in', value: 'Montpellier · à distance partout' },
    ],
  };
