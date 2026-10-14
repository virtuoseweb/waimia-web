// ─────────────────────────────────────────────────────────────────────────────
// Méthode · /agence/methode · données de section
// ─────────────────────────────────────────────────────────────────────────────
// Refonte positionnement 2026-10 : la méthode du studio tient en quatre étapes, toujours
// dans cet ordre : audit, pilote, mesure, transfert. Un ingénieur travaille avec les équipes
// métier, sur leurs outils et leurs données (forward deployed engineer).
// Les étapes alimentent la Timeline ET le JSON-LD HowTo de la page (source unique).
// Retirée : la bande « impact » (5 jours / 2 semaines / 100 %), promesses en nombres non
// vérifiables et contradictoires avec l'audit de 45 minutes.
import type { SectionByType } from '@waimia/ds-kernel';
import { AUDIT_PROMISE } from './conversion';

// ── Quatre étapes · source unique (Timeline + JSON-LD HowTo) ──
export const phases = [
  {
    n: '01',
    label_fr: 'Audit',
    body_fr: `${AUDIT_PROMISE.general.short.fr} On regarde vos processus réels, pas vos présentations : qui fait quoi, dans quel outil, avec quelle donnée. On vous dit par quel chantier commencer et, si rien ne vaut le coup aujourd'hui, on vous le dit aussi.`,
  },
  {
    n: '02',
    label_fr: 'Pilote',
    body_fr: "Un premier système en production : une automatisation, un agent IA ou une application métier. Il se branche à vos outils existants (Excel, HubSpot, Outlook, votre ERP), sans migration imposée. Le périmètre de ce que l'agent a le droit de faire est écrit avant de coder, et les actions sensibles passent par une validation humaine.",
  },
  {
    n: '03',
    label_fr: 'Mesure',
    body_fr: "Chaque workflow a sa mesure avant et après, relevée sur vos données : temps rendu, erreurs évitées, coût des modèles. C'est ce relevé qui décide si on étend, si on corrige ou si on s'arrête là. Exemple de relevé : minutes passées par facture fournisseur sur deux semaines avant, puis deux semaines après la mise en production, avec le nombre de corrections manuelles. Quand aucune mesure n'existe, la fiche publiée le dit.",
  },
  {
    n: '04',
    label_fr: 'Transfert',
    body_fr: "Le code, les workflows et la documentation vous sont remis, dans vos comptes. Vos équipes sont formées pour faire évoluer le système. Vous pouvez continuer sans le studio ; l'accompagnement continu reste une option.",
  },
];

// ── Repères de la méthode · SpecBar (faits vérifiables, fond paper-2) ──
export const cadenceData = {
  type: 'spec-bar' as const,
  background: 'paper-2' as const,
  kicker_fr: '§ Repères',
  kicker_en: '§ Markers',
  specs: [
    { label_fr: 'Audit', label_en: 'Audit', value: '45 min · gratuit' },
    { label_fr: 'Sprint de cadrage', label_en: 'Scoping sprint', value: '10 h · 999 € HT' },
    { label_fr: 'Pilote', label_en: 'Pilot', value: 'Un système en production' },
    { label_fr: 'Transfert', label_en: 'Handover', value: 'Code et workflows à vous' },
  ],
} satisfies SectionByType<'spec-bar'>;
