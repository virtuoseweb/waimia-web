// Waimia · Co-location DS (Wave #38, T5) · module `team-bio-grid` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'team-bio-grid',
    background: 'paper',
    kicker_fr: 'L’équipe',
    kicker_en: 'The team',
    h2_fr: 'Les gens qui <i>livrent</i> vos agents',
    h2_en: 'The people who <i>ship</i> your agents',
    lede_fr: 'Une équipe resserrée d’ingénieurs et de stratèges IA, habituée à mettre des agents en production, pas à produire des slides.',
    lede_en: 'A tight team of AI engineers and strategists, used to putting agents into production rather than producing slides.',
    columns: '3',
    members: [
      { name: 'Élodie Tran', role_fr: 'Cofondatrice · Stratégie IA', role_en: 'Co-founder · AI strategy', bio_fr: 'Dix ans à industrialiser la donnée pour des groupes du CAC 40. Cadre les cas d’usage à fort effet de levier.', bio_en: 'Ten years industrialising data for CAC 40 groups. Frames the high-leverage use cases.' },
      { name: 'Marc Devauchelle', role_fr: 'Cofondateur · Ingénierie agents', role_en: 'Co-founder · Agent engineering', bio_fr: 'Architecte des runtimes agentiques de Waimia. Obsédé par la traçabilité et la fiabilité en production.', bio_en: 'Architect of Waimia’s agentic runtimes. Obsessed with traceability and production reliability.' },
      { name: 'Sarah Lindqvist', role_fr: 'Lead activation client', role_en: 'Client activation lead', bio_fr: 'Transforme un pilote réussi en déploiement à l’échelle. Pilote l’adoption côté métier.', bio_en: 'Turns a successful pilot into a full-scale rollout. Drives adoption on the business side.' },
      { name: 'Hugo Bonnet', role_fr: 'Ingénieur plateforme', role_en: 'Platform engineer', bio_fr: 'Construit les intégrations et l’observabilité qui gardent vos agents sous contrôle.', bio_en: 'Builds the integrations and observability that keep your agents under control.' },
      { name: 'Naïma Ferhat', role_fr: 'Designer d’interaction', role_en: 'Interaction designer', bio_fr: 'Dessine les interfaces où humains et agents décident ensemble, sans friction.', bio_en: 'Designs the interfaces where humans and agents decide together, frictionlessly.' },
      { name: 'Tobias Wagner', role_fr: 'Responsable conformité', role_en: 'Compliance lead', bio_fr: 'Garantit que chaque décision d’agent reste auditable et conforme au RGPD.', bio_en: 'Ensures every agent decision stays auditable and GDPR-compliant.' },
    ],
  };
