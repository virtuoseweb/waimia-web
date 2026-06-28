// Waimia · Co-location DS (Wave #38, T5) · module `timeline-horizontal` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'timeline-horizontal',
    kicker_fr: '[roadmap] · 2026',
    kicker_en: '[roadmap] · 2026',
    h2_fr: 'La trajectoire produit, <i class="acc">datée</i>.',
    h2_en: 'The product trajectory, <i class="acc">dated</i>.',
    intro_fr: 'Ce qui est livré, ce qui est en cours, ce qui arrive. Sans promesse floue.',
    intro_en: 'What is shipped, what is in progress, what is next. No vague promises.',
    background: 'paper',
    events: [
      { date_fr: 'T1 2026', date_en: 'Q1 2026', label_fr: 'Audit trail signé', label_en: 'Signed audit trail', body_fr: 'Chaque action agent tracée et validée par un humain.', body_en: 'Every agent action traced and human-validated.', status: 'done' },
      { date_fr: 'T2 2026', date_en: 'Q2 2026', label_fr: 'Réallocation budget auto', label_en: 'Auto budget reallocation', body_fr: 'Le scoring CRM pilote le budget média en temps réel.', body_en: 'CRM scoring drives media budget in real time.', status: 'active' },
      { date_fr: 'T3 2026', date_en: 'Q3 2026', label_fr: 'Connecteurs multi-CRM', label_en: 'Multi-CRM connectors', body_fr: 'HubSpot, Salesforce et Pipedrive câblés nativement.', body_en: 'HubSpot, Salesforce and Pipedrive wired natively.', status: 'upcoming' },
      { date_fr: 'T4 2026', date_en: 'Q4 2026', label_fr: 'Reporting comité auto', label_en: 'Auto board reporting', body_fr: 'Export prêt-comité généré chaque vendredi.', body_en: 'Board-ready export generated every Friday.', status: 'upcoming' },
    ],
  };
