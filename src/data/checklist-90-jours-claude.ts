// Checklist « 90 jours pour déployer Claude en PME » · texte source (unique) de la page
// /ressources/outils/checklist-90-jours-claude et du PDF
// private/telechargements/checklist-90-jours-claude-pme-waimia.pdf (scripts/gen-checklist-pdf.mjs).
//
// Reprend la trame du guide /ressources/guides/claude-pme (6 prérequis, 3 phases de 30 jours)
// et la rend actionnable : une case par action, un livrable par semaine, des indicateurs à
// remplir. Méthode de travail, pas un avis juridique ; aucun fait daté sur un produit tiers.

export interface ChecklistItem {
  label: string;
  /** Précision courte affichée sous l'action (facultative). */
  hint?: string;
}

export interface ChecklistWeek {
  /** Ex. « Semaine 1 ». */
  label: string;
  title: string;
  items: ChecklistItem[];
  /** Ce qui doit exister à la fin de la semaine. */
  deliverable: string;
}

export interface ChecklistPhase {
  id: string;
  /** Ex. « Jours 1 à 30 ». */
  range: string;
  title: string;
  goal: string;
  weeks: ChecklistWeek[];
  /** Condition pour passer à la phase suivante. */
  gate: string;
}

export const checklistTitle = 'Déployer Claude en 90 jours : la checklist PME';

export const checklistIntro =
  "Une action par case, un livrable par semaine, un point de passage tous les trente jours. Cochez au fil de l'eau, notez qui porte chaque action et à quelle date. Si une case reste vide trop longtemps, c'est elle qu'il faut traiter avant d'avancer.";

/** Champs à remplir en tête de document (version imprimée : lignes vides). */
export const checklistFields = [
  'Entreprise',
  'Référent IA',
  'Sponsor (direction)',
  'Cas d\'usage pilote',
  'Date de démarrage (J1)',
] as const;

export const prerequisites: ChecklistItem[] = [
  { label: 'Données : les sources que Claude devra lire sont listées (CRM, documents, e-mails, agenda) et les données qui ne sortent jamais sont repérées.' },
  { label: "Sécurité : une politique d'usage écrite dit quelles données peuvent passer dans l'outil, sur des comptes professionnels.", hint: 'Point de départ : le modèle de charte IA Waimia.' },
  { label: 'Cas d\'usage : un seul cas pilote est choisi, avec un volume chaque semaine, un risque faible en cas d\'erreur et un résultat mesurable.' },
  { label: 'Formation : une demi-journée de prise en main est planifiée et un référent IA interne est nommé.' },
  { label: 'Mesure : le temps passé et le taux d\'erreur actuels du cas pilote sont notés (la baseline).' },
  { label: 'Gouvernance : on sait qui valide un nouveau cas d\'usage et qui révise la politique.' },
];

export const phases: ChecklistPhase[] = [
  {
    id: 'cadrer',
    range: 'Jours 1 à 30',
    title: 'Cadrer et lancer',
    goal: 'Un premier agent qui tourne sur un périmètre limité, avec un gain mesurable.',
    weeks: [
      {
        label: 'Semaine 1',
        title: 'Cadrer le pilote',
        items: [
          { label: 'Écrire le cas pilote en une phrase : qui, quelle tâche, quel résultat attendu.' },
          { label: 'Fixer l\'objectif chiffré à 30 jours (heures rendues, délai, taux d\'erreur).' },
          { label: 'Lister 10 exemples réels de la tâche, bons et mauvais, pour tester l\'agent.' },
          { label: 'Ouvrir les comptes professionnels des 2 à 5 premiers utilisateurs.' },
        ],
        deliverable: 'Fiche pilote d\'une page : périmètre, objectif, utilisateurs, exemples.',
      },
      {
        label: 'Semaine 2',
        title: 'Rassembler le contexte',
        items: [
          { label: 'Réunir les documents de référence : procédures, modèles, ton de la maison, FAQ.' },
          { label: 'Nettoyer les doublons et les versions périmées avant de les donner à Claude.' },
          { label: 'Décider ce que l\'agent ne touche jamais et l\'écrire dans ses consignes.' },
          { label: 'Rédiger les consignes de l\'agent et les tester sur les 10 exemples.' },
        ],
        deliverable: 'Consignes de l\'agent + base de documents propre.',
      },
      {
        label: 'Semaine 3',
        title: 'Lancer en conditions réelles',
        items: [
          { label: 'Mettre l\'agent entre les mains des premiers utilisateurs sur des cas réels.' },
          { label: 'Garder une relecture humaine sur 100 % des sorties.' },
          { label: 'Noter chaque erreur dans un journal partagé (cas, sortie, correction).' },
        ],
        deliverable: 'Journal des erreurs alimenté chaque jour.',
      },
      {
        label: 'Semaine 4',
        title: 'Mesurer et décider',
        items: [
          { label: 'Comparer temps passé et taux d\'erreur à la baseline.' },
          { label: 'Recueillir l\'avis des utilisateurs : ce qui aide, ce qui gêne.' },
          { label: 'Corriger les consignes à partir du journal des erreurs.' },
        ],
        deliverable: 'Bilan J30 : chiffres avant/après et décision de poursuivre.',
      },
    ],
    gate: 'Passage en phase 2 si le gain est mesurable et qu\'aucune erreur grave n\'est restée sans correction.',
  },
  {
    id: 'fiabiliser',
    range: 'Jours 31 à 60',
    title: 'Fiabiliser et former',
    goal: 'Un agent fiable, adopté par l\'équipe, et une compétence qui reste dans l\'entreprise.',
    weeks: [
      {
        label: 'Semaine 5',
        title: 'Former l\'équipe',
        items: [
          { label: 'Animer la demi-journée de prise en main : formuler, vérifier, signaler.' },
          { label: 'Ouvrir l\'accès au reste de l\'équipe concernée par le cas pilote.' },
        ],
        deliverable: 'Équipe formée, liste des participants.',
      },
      {
        label: 'Semaine 6',
        title: 'Capitaliser',
        items: [
          { label: 'Créer une bibliothèque de demandes types qui marchent, partagée.' },
          { label: 'Écrire la marche à suivre quand une réponse est fausse ou sensible.' },
        ],
        deliverable: 'Bibliothèque de demandes + procédure d\'escalade.',
      },
      {
        label: 'Semaine 7',
        title: 'Alléger la relecture',
        items: [
          { label: 'Passer d\'une relecture totale à une relecture par échantillon sur les cas simples.' },
          { label: 'Garder la relecture totale sur les cas sensibles (clients, chiffres, juridique).' },
        ],
        deliverable: 'Règle de relecture écrite, par type de cas.',
      },
      {
        label: 'Semaine 8',
        title: 'Point d\'étape J60',
        items: [
          { label: 'Mesurer à nouveau : gain, taux d\'erreur, taux d\'usage par personne.' },
          { label: 'Choisir le deuxième cas d\'usage avec les trois critères du pilote.' },
        ],
        deliverable: 'Bilan J60 + fiche du deuxième cas d\'usage.',
      },
    ],
    gate: 'Passage en phase 3 si l\'usage est régulier et que le référent IA répond aux questions sans aide extérieure.',
  },
  {
    id: 'etendre',
    range: 'Jours 61 à 90',
    title: 'Étendre et gouverner',
    goal: 'Un deuxième cas d\'usage lancé sur des bases saines et des règles qui tiennent sans vous.',
    weeks: [
      {
        label: 'Semaine 9',
        title: 'Lancer le deuxième cas',
        items: [
          { label: 'Rejouer les semaines 1 à 3 en accéléré sur le deuxième cas d\'usage.' },
          { label: 'Réutiliser consignes, documents et bibliothèque du pilote.' },
        ],
        deliverable: 'Deuxième agent en conditions réelles.',
      },
      {
        label: 'Semaine 10',
        title: 'Brancher les outils',
        items: [
          { label: 'Identifier les tâches où l\'agent doit agir dans un outil (CRM, agenda, ticketing).' },
          { label: 'Cadrer les accès : lecture seule par défaut, écriture seulement là où c\'est validé.', hint: 'Les connecteurs MCP permettent de limiter et de tracer ces accès.' },
        ],
        deliverable: 'Carte des accès de chaque agent.',
      },
      {
        label: 'Semaine 11',
        title: 'Gouverner',
        items: [
          { label: 'Écrire qui valide un nouveau cas d\'usage et sur quels critères.' },
          { label: 'Fixer la date de révision de la politique d\'usage (au moins tous les six mois).' },
          { label: 'Tenir un registre des agents : rôle, données lues, accès, responsable.' },
        ],
        deliverable: 'Registre des agents + règle de validation.',
      },
      {
        label: 'Semaine 12',
        title: 'Bilan J90',
        items: [
          { label: 'Chiffrer le gain total : heures rendues par mois et leur valeur.' },
          { label: 'Présenter le bilan à la direction et décider des trois prochains cas.' },
        ],
        deliverable: 'Bilan J90 + feuille de route du trimestre suivant.',
      },
    ],
    gate: 'Le déploiement est installé quand deux agents tournent, mesurés, avec un référent et des règles écrites.',
  },
];

/** Indicateurs à suivre (tableau à remplir : baseline, J30, J60, J90). */
export const metrics = [
  'Temps passé sur la tâche (heures par semaine)',
  'Taux d\'erreur ou de reprise (%)',
  'Volume traité (par semaine)',
  'Utilisateurs actifs (nombre)',
  'Satisfaction de l\'équipe (note sur 5)',
] as const;

export const metricColumns = ['Baseline', 'J30', 'J60', 'J90'] as const;

/** Signaux d'alerte : s'arrêter et corriger avant d'avancer. */
export const warnings = [
  'Personne n\'a de date ni de nom en face d\'une action depuis deux semaines.',
  'Des données sensibles passent par des comptes personnels.',
  'Le gain n\'est pas mesuré parce que la baseline n\'a jamais été notée.',
  'L\'équipe contourne l\'agent ou refait le travail derrière lui sans le signaler.',
  'On ouvre un troisième cas d\'usage avant que le premier soit fiable.',
] as const;
