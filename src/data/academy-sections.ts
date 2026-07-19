// ─────────────────────────────────────────────────────────────────────────────
// Academy · /ressources/academy · questionnaire de diagnostic extrait (JSONification)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des littéraux DE DONNÉE du formulaire de `src/pages/ressources/academy.astro`
// (fiche 0027 D6 · dette « academy » soldée). La page reste sur `UtilityTemplate` avec un
// `slot="body"` BESPOKE (intro, email, CTA, skip conservés dans la page) ; seuls les
// 6 questions notées q1-q6 et leurs options sont pilotées par cette donnée.
//
// ⚠️ COUPLAGE SCORING — NON NÉGOCIABLE : le score est calculé côté serveur dans
// `src/pages/api/academy.ts` (L164-170) qui lit `q1`..`q6`, chaque valeur bornée 0-3,
// somme max 18. Ce module ne change RIEN au scoring : il ne fait que porter le libellé
// des champs. Les `name` ('q1'..'q6') et `value` ('0'..'3') sont la CLÉ du couplage :
// ne jamais les renommer, réordonner les valeurs ni retirer une option sans casser le score.
//
// 0 valeur réécrite : transcription CARACTÈRE POUR CARACTÈRE de l'ancien markup statique.

export interface AcademyOption {
  /** Note envoyée à l'API et bornée 0-3 côté serveur. Clé du scoring. */
  value: '0' | '1' | '2' | '3';
  label_fr: string;
}

export interface AcademyQuestion {
  /** Attribut `name` du groupe radio. DOIT rester q1..q6 (lu par api/academy.ts). */
  name: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6';
  legend_fr: string;
  options: AcademyOption[];
}

export interface AcademySection {
  kicker_fr: string;
  questions: AcademyQuestion[];
}

export const academySections: AcademySection[] = [
  {
    kicker_fr: '§ 01 · Données',
    questions: [
      {
        name: 'q1',
        legend_fr: 'Q1 · Vos données métier sont-elles centralisées ?',
        options: [
          { value: '0', label_fr: 'Non, dispersées dans 10+ outils' },
          { value: '1', label_fr: 'Centralisées partiellement (CRM ou warehouse)' },
          { value: '2', label_fr: 'Centralisées dans un entrepôt unifié (dbt, Snowflake, etc.)' },
          { value: '3', label_fr: "Entrepôt + politique d'écriture par champ documentée" },
        ],
      },
      {
        name: 'q2',
        legend_fr: 'Q2 · Avez-vous une source de vérité unique pour le pipeline revenue ?',
        options: [
          { value: '0', label_fr: 'Non, débats fréquents en comité' },
          { value: '1', label_fr: 'CRM seul fait foi' },
          { value: '2', label_fr: 'CRM + warehouse réconciliés' },
          { value: '3', label_fr: 'Source unique signée par finance + revenue' },
        ],
      },
    ],
  },
  {
    kicker_fr: '§ 02 · Outillage IA',
    questions: [
      {
        name: 'q3',
        legend_fr: 'Q3 · Avez-vous déjà déployé un agent IA en production ?',
        options: [
          { value: '0', label_fr: 'Non, jamais essayé' },
          { value: '1', label_fr: 'POC seulement, jamais en prod' },
          { value: '2', label_fr: '1-2 agents en prod, peu mesurés' },
          { value: '3', label_fr: '3+ agents en prod avec audit trail mesurable' },
        ],
      },
      {
        name: 'q4',
        legend_fr: 'Q4 · Connaissez-vous le coût LLM mensuel par agent ?',
        options: [
          { value: '0', label_fr: 'Aucune visibilité' },
          { value: '1', label_fr: 'Total mensuel global seulement' },
          { value: '2', label_fr: 'Par agent, sans drill-down' },
          { value: '3', label_fr: 'Par agent + drill-down (modèle, batch, cache)' },
        ],
      },
    ],
  },
  {
    kicker_fr: '§ 03 · Conformité',
    questions: [
      {
        name: 'q5',
        legend_fr: 'Q5 · Vos agents IA sont-ils auditables ?',
        options: [
          { value: '0', label_fr: 'Aucun audit trail' },
          { value: '1', label_fr: 'Logs basiques applicatifs' },
          { value: '2', label_fr: 'Trail structuré exportable' },
          { value: '3', label_fr: 'Trail re-rejouable + signé (AI Act ready)' },
        ],
      },
      {
        name: 'q6',
        legend_fr: "Q6 · Avez-vous un humain d'astreinte nommé sur vos agents prod ?",
        options: [
          { value: '0', label_fr: 'Non, personne désigné' },
          { value: '1', label_fr: 'Oui, mais seulement les heures ouvrées' },
          { value: '2', label_fr: 'Astreinte 24/7 mais réactivité variable' },
          { value: '3', label_fr: 'Astreinte 24/7 avec SLA réveil < 15 min' },
        ],
      },
    ],
  },
];
