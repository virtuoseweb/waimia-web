// ─────────────────────────────────────────────────────────────────────────────
// Méthode · /agence/methode · données de section extraites (JSONification, vague V3)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des littéraux DE DONNÉE de `src/pages/agence/methode.astro` (fiche 0027 D6 ·
// vague V3). La page reste sur `UtilityTemplate` avec un `slot="body"` BESPOKE (blocs
// `.meth-garanties` et `.meth-os` sans équivalent catalogué → conservés dans la page,
// DETTE consignée conformément à D6 « ne pas décomposer le markup bespoke, risque parité »).
// Ici : les phases (réutilisées 3× dans la page : Timeline + HowTo + source) et les 2
// sections cataloguées pilotées par donnée (SpecBar cadence, MetricCalloutBand impact).
//
// 0 valeur réécrite : transcription CARACTÈRE POUR CARACTÈRE de l'ancien frontmatter.
import { getProofPoint } from './proof-points';
import type { SectionByType } from '@waimia/ds-kernel';

// ── Cinq phases · source unique (alimente Timeline + JSON-LD HowTo dans la page) ──
export const phases = [
  {
    n: '01',
    label_fr: 'Cartographie',
    body_fr: "On regarde votre métier, pas vos présentations. Vos vrais workflows, vos vrais bouchons. Le mardi on observe, le vendredi on chiffre.",
  },
  {
    n: '02',
    label_fr: 'Priorisation',
    body_fr: "On classe les workflows par ROI, pas par sophistication technique. Le gain rapide passe en premier.",
  },
  {
    n: '03',
    label_fr: 'Câblage',
    body_fr: "On câble les agents IA dans vos outils existants : Excel, HubSpot, Outlook, votre ERP. Pas de migration. On connecte ce qui marche.",
  },
  {
    n: '04',
    label_fr: 'Mesure',
    body_fr: "Chaque workflow a sa métrique avant/après. Si ça ne mesure rien, ça n'existe pas.",
  },
  {
    n: '05',
    label_fr: 'Passation',
    body_fr: "Vous prenez la main. Documentation, mode opératoire, formation. Pas de boîte noire : vous pouvez nous virer.",
  },
];

// ── Cadence de la méthode · SpecBar (rythme rejouable, fond paper-2) ──
export const cadenceData = {
  type: 'spec-bar' as const,
  background: 'paper-2' as const,
  kicker_fr: '§ Cadence',
  kicker_en: '§ Cadence',
  specs: [
    { label_fr: 'Phases', label_en: 'Phases', value: '5' },
    { label_fr: 'Audit livré', label_en: 'Audit delivered', value: '5 jours' },
    { label_fr: 'Pilote en prod', label_en: 'Pilot in prod', value: '2 semaines' },
    { label_fr: 'Pour démarrer', label_en: 'To get started', value: '45 min' },
  ],
} satisfies SectionByType<'spec-bar'>;

// ── Impact mesuré · MetricCalloutBand INK · 3 chiffres canoniques (proof-points.ts, 0 invention) ──
const _audit = getProofPoint('time-5-jours-audit');
const _pilote = getProofPoint('time-2-semaines-pilote');
const _equipe = getProofPoint('adoption-100pct-equipe');
export const impactData = {
  type: 'metric-callout-band' as const,
  background: 'ink' as const,
  kicker_fr: '§ Ce que la méthode garantit',
  kicker_en: '§ What the method guarantees',
  context_fr: 'On ne vend pas un cabinet : un protocole rejouable, chiffré à chaque étape. Trois engagements tenus sur chaque mission.',
  context_en: 'We do not sell a consultancy: a replayable protocol, measured at every step. Three commitments kept on every mission.',
  metrics: [
    { value: _audit?.value ?? '5 jours', label_fr: 'pour l\'audit complet de maturité IA', label_en: 'for the full AI maturity audit' },
    { value: _pilote?.value ?? '2 semaines', label_fr: 'pour un premier pilote en production', label_en: 'for a first pilot in production' },
    { value: _equipe?.value ?? '100%', label_fr: 'des équipes formées et autonomes', label_en: 'of teams trained and autonomous' },
  ],
} satisfies SectionByType<'metric-callout-band'>;
