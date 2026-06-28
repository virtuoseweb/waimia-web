// Waimia · Co-location DS (Wave #38, T5) · module `maturity-pyramid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'maturity-pyramid',
    roman: 'II',
    label_fr: "Acte II · La pyramide d'engagements",
    label_en: 'Act II · The engagement pyramid',
    heading_fr: '<i>Cartographier.</i> Câbler.<br/>Orchestrer. <i>Industrialiser.</i>',
    heading_en: '<i>Map.</i> Wire.<br/>Orchestrate. <i>Industrialize.</i>',
    aside_fr: "Du diagnostic process à l'infrastructure souveraine, chaque palier prépare le suivant. Vous montez quand vous êtes prêt.",
    aside_en: "From process diagnostic to sovereign infrastructure, each tier sets up the next. You climb when you're ready.",
    timeline_label_fr: 'Progression de maturité IA',
    timeline_label_en: 'AI maturity path',
    tier_cta_fr: 'Voir le palier →',
    tier_cta_en: 'Open tier →',
    steps: [
      { roman: 'I',  verb_fr: 'Cartographier',   verb_en: 'Map',           stage_fr: 'Audit',          stage_en: 'Audit' },
      { roman: 'II', verb_fr: 'Câbler',          verb_en: 'Wire',          stage_fr: 'Workflow',       stage_en: 'Workflow' },
      { roman: 'III',verb_fr: 'Orchestrer',      verb_en: 'Orchestrate',   stage_fr: 'Système',        stage_en: 'System' },
      { roman: 'IV', verb_fr: 'Industrialiser',  verb_en: 'Industrialize', stage_fr: 'Infrastructure', stage_en: 'Infrastructure' },
    ],
    tiers: [
      { n: 'I',  tag_fr: 'ACTIVATION',    tag_en: 'ACTIVATION',   label_fr: 'Activation rapide',           label_en: 'Fast activation',                lead_fr: "Une semaine pour identifier le levier, former l'équipe et livrer un premier workflow en production.", lead_en: 'One week to identify the lever, train the team, and ship the first workflow in production.', items_fr: ['Audit process · 5j', 'Formation équipe · 1 sem', 'Gain rapide Excel'], items_en: ['Process audit · 5d', 'Team training · 1 wk', 'Quick Excel win'], action_fr: 'Cartographier', action_en: 'Map', href: '/offres#tier-1' },
      { n: 'II', tag_fr: 'PRODUCTIVITÉ',  tag_en: 'PRODUCTIVITY', label_fr: 'Productivité opérationnelle', label_en: 'Operational productivity',       lead_fr: 'Supprimer les tâches récurrentes et fluidifier les workflows internes.',                                lead_en: 'Remove recurring tasks and make internal workflows run without daily chasing.',              items_fr: ['Workflows métiers', 'Tâches répétitives', 'Support client'], items_en: ['Business workflows', 'Repetitive tasks', 'Customer support'], action_fr: 'Câbler', action_en: 'Wire', href: '/offres#tier-2' },
      { n: 'III',tag_fr: 'ACQUISITION',   tag_en: 'GROWTH',       label_fr: 'Acquisition & pilotage',      label_en: 'Acquisition & intelligence',     lead_fr: 'Connecter site, CRM, relances, contenu et pilotage dans un même système.',                              lead_en: 'Connect site, CRM, follow-ups, content, and business visibility into one growth system.',    items_fr: ["Système d'acquisition", 'Pipeline commercial', 'Tableaux de pilotage', 'Contenu SEO/GEO'], items_en: ['Acquisition system', 'Sales pipeline', 'Decision dashboards', 'SEO/GEO content'], action_fr: 'Orchestrer', action_en: 'Orchestrate', href: '/offres#tier-3' },
      { n: 'IV', tag_fr: 'ETI',           tag_en: 'ENTERPRISE',   label_fr: 'Infrastructure ETI',          label_en: 'Enterprise infrastructure',      lead_fr: 'Systèmes connectés pour équipes élargies, gouvernance stricte et opérations multi-sites.',              lead_en: 'Connected systems for larger teams, stricter governance, and multi-site operations.',       items_fr: ['Architecture connectée', 'Sécurité & gouvernance', 'Multi-équipes & multi-sites'], items_en: ['Connected architecture', 'Security & governance', 'Multi-team & multi-site'], action_fr: 'Industrialiser', action_en: 'Industrialize', href: '/offres#tier-4' },
    ],
  };
