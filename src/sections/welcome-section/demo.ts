// Waimia · Co-location DS (Wave #38, T5) · module `welcome-section` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'welcome-section',
    kicker_fr: '§ Audit · Confirmation',
    kicker_en: '§ Audit · Confirmation',
    h1_fr: 'Votre demande est <i>bien reçue</i>.',
    h1_en: 'Your request is <i>confirmed</i>.',
    lede_fr: 'On revient avec une première lecture opérationnelle et les trois actions à préparer avant l’échange.',
    lede_en: 'We come back with a first operational read and the three actions to prepare before the call.',
    next_steps: [
      {
        num: '1',
        title_fr: 'Vérifier le contexte',
        title_en: 'Confirm context',
        body_fr: 'Regroupez les liens utiles : site, CRM, tunnel, documents internes ou exemples de livrables.',
        body_en: 'Collect useful links: website, CRM, funnel, internal docs, or sample deliverables.',
      },
      {
        num: '2',
        title_fr: 'Identifier le point bloquant',
        title_en: 'Name the bottleneck',
        body_fr: 'Choisissez un problème concret : qualification, contenu, relance, reporting ou support.',
        body_en: 'Pick one concrete problem: qualification, content, follow-up, reporting, or support.',
      },
      {
        num: '3',
        title_fr: 'Préparer la décision',
        title_en: 'Prepare the decision',
        body_fr: 'Listez qui doit valider le premier système et quels critères prouvent que ça marche.',
        body_en: 'List who validates the first system and which criteria prove it works.',
        ctaLabel: 'Voir la méthode',
        ctaHref: '/agence/methode',
      },
    ],
  };
