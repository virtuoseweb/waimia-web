// Waimia · Co-location DS (Wave #38, T5) · module `services-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'services-grid',
    fig_num: 'FIG II · 2.0',
    fig_title_fr: 'Acte II · La méthode',
    fig_title_en: 'Act II · The method',
    spec_fr: '6 SERVICES · UNE COUCHE CONTINUE',
    spec_en: '6 SERVICES · ONE CONTINUOUS LAYER',
    h2_fr: 'Six services, appris en <i>livrant</i>, pas en PowerPoint.',
    h2_en: 'Six services, taught by <i>doing</i>, not by slides.',
    connectors_label_fr: 'Connecteurs',
    connectors_label_en: 'Connectors',
    services: [
      { fig: '2.01', metric_fr: '45 min', metric_en: '45 min', label_fr: 'Diagnostic 45 min', label_en: '45-min diagnostic', body_fr: 'On identifie le levier métier avant la techno.', body_en: 'We identify the business lever before the technology.', connectors_fr: 'Audit · Cartographie · Stack mapping', connectors_en: 'Audit · Cartography · Stack mapping' },
      { fig: '2.02', metric_fr: '+840 K€ pipe', metric_en: '+€840K pipe', label_fr: "Système d'acquisition", label_en: 'Acquisition system', body_fr: 'Pipeline reconnecté, qualification automatisée.', body_en: 'Pipeline reconnected, qualification automated.', connectors_fr: 'Google Ads · Meta · LinkedIn · GA4 · Landing', connectors_en: 'Google Ads · Meta · LinkedIn · GA4 · Landing' },
      { fig: '2.03', metric_fr: '−35% manuel', metric_en: '−35% manual', label_fr: 'CRM augmenté', label_en: 'Augmented CRM', body_fr: 'Le CRM qui relance, qualifie et alerte, sans que vous touchiez rien.', body_en: 'The CRM that follows up, qualifies and alerts, without you touching it.', connectors_fr: 'HubSpot · Salesforce · Pipedrive · Outlook', connectors_en: 'HubSpot · Salesforce · Pipedrive · Outlook' },
      { fig: '2.04', metric_fr: 'Décide en 2 min', metric_en: '2 min decision', label_fr: 'Lisibilité des données', label_en: 'Data clarity', body_fr: 'Tableaux de bord temps réel : décidez en 2 minutes, pas en réunion.', body_en: 'Real-time dashboards: decide in 2 minutes, not a meeting.', connectors_fr: 'GA4 · Search Console · SEO tools · Dashboards', connectors_en: 'GA4 · Search Console · SEO tools · Dashboards' },
      { fig: '2.05', metric_fr: '+12h / sem', metric_en: '+12h / week', label_fr: 'Tâches répétitives éliminées', label_en: 'Repetitive tasks removed', body_fr: 'Workflows qui tournent sans vous.', body_en: 'Workflows that run without you.', connectors_fr: 'Workflows · Agents IA · Excel · Office', connectors_en: 'Workflows · AI agents · Excel · Office' },
      { fig: '2.06', metric_fr: 'Souverain', metric_en: 'Sovereign', label_fr: 'Sur-mesure ETI', label_en: 'Enterprise custom build', body_fr: "Architecture souveraine, quand les outils du marché butent sur votre périmètre.", body_en: 'Sovereign architecture, when the market stack hits your perimeter limits.', connectors_fr: 'Trust Center · Design System · Governance · VirtuoseOS', connectors_en: 'Trust Center · Design System · Governance · VirtuoseOS' },
    ],
    illustration: {
      src: 'services-layer.svg',
      alt_fr: 'Six services reliés par une même couche continue : une dorsale traverse et connecte chaque service.',
      alt_en: 'Six services linked by one continuous layer: a backbone runs through and connects each service.',
      caption_fr: 'La couche continue qui relie les six services',
      caption_en: 'The continuous layer connecting the six services',
    },
  };
