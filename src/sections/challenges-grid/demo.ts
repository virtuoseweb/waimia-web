// Waimia · Co-location DS (Wave #38, T5) · module `challenges-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'challenges-grid',
    background: 'paper-2',
    kicker_fr: 'Le problème',
    kicker_en: 'The problem',
    h2_fr: 'Pourquoi votre site <i class="acc">stagne</i>',
    h2_en: 'Why your site <i class="acc">stalls</i>',
    items: [
      { icon: '📉', title_fr: 'Trafic en berne', title_en: 'Stalling traffic', body_fr: 'Les pages ne se positionnent plus et le trafic organique décroche, sans cause évidente.', body_en: 'Pages no longer rank and organic traffic slips, with no obvious cause.' },
      { icon: '🗂️', title_fr: 'Contenu non maintenu', title_en: 'Stale content', body_fr: 'Les articles vieillissent, personne ne les met à jour, et le site perd sa fraîcheur.', body_en: 'Articles age, nobody updates them, and the site loses its freshness.' },
      { icon: '🤖', title_fr: 'Invisible des IA', title_en: 'Invisible to AI', body_fr: 'Les moteurs génératifs ne citent pas votre marque faute de signaux GEO clairs.', body_en: 'Generative engines never cite your brand for lack of clear GEO signals.' },
      { icon: '📊', title_fr: 'ROI éditorial flou', title_en: 'Fuzzy editorial ROI', body_fr: 'Vous produisez du contenu sans savoir ce qui convertit ni où réinvestir.', body_en: 'You ship content without knowing what converts or where to reinvest.' },
    ],
  };
