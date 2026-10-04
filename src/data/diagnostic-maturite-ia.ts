// Diagnostic de maturité IA · questionnaire, barème et restitution (source unique).
//
// 5 dimensions × 2 questions, chaque réponse vaut 0 à 3 → score sur 30.
// Barème VOLONTAIREMENT simple et affiché sur la page (pas de pondération cachée).
// Les 5 niveaux et les 5 dimensions reprennent la grille déjà publiée sur
// /ressources/diagnostics/maturite-ia (sections diagnostic-stages + feature-zigzag).
//
// Consommé par : organism MaturityDiagnostic (rendu + calcul côté client).
// L'e-mail « version à garder » reprend ces libellés via l'événement `cv:collect`.

export interface DiagOption { value: 0 | 1 | 2 | 3; label: string }
export interface DiagQuestion { id: string; text: string; options: DiagOption[] }
export interface DiagDimension {
  key: 'donnees' | 'process' | 'competences' | 'gouvernance' | 'direction';
  name: string;
  why: string;
  /** Conseil affiché si la dimension est la plus faible (score ≤ 3 sur 6). */
  advice: string;
  /** Lien interne utile pour cette dimension (facultatif). */
  link?: { href: string; label: string };
  questions: [DiagQuestion, DiagQuestion];
}

const o = (labels: [string, string, string, string]): DiagOption[] =>
  labels.map((label, i) => ({ value: i as 0 | 1 | 2 | 3, label }));

export const dimensions: DiagDimension[] = [
  {
    key: 'donnees',
    name: 'Données',
    why: "Un agent ou une automatisation travaille avec ce qu'on lui donne. Des données éparpillées donnent des résultats faux, quel que soit l'outil.",
    advice: "Commencez par là. Tant que les données clients et commandes ne vivent pas dans un outil central et à jour, une automatisation ne fera que propager les erreurs. Le premier chantier est un nettoyage et une source unique, pas un agent.",
    link: { href: '/services/donnees-reporting', label: 'Données et reporting' },
    questions: [
      {
        id: 'q1',
        text: 'Où vivent vos données clients et commandes ?',
        options: o([
          'Dans des tableurs et des boîtes mail, chacun les siens',
          'Dans un outil (CRM, ERP), mais incomplet ou avec des doublons',
          "Dans un outil central, à jour pour l'essentiel",
          'Dans un outil central, à jour, accessible par API ou export automatique',
        ]),
      },
      {
        id: 'q2',
        text: 'Pour obtenir la liste des devis en attente aujourd\'hui, il faut…',
        options: o([
          'Demander à plusieurs personnes et recouper',
          'Faire un export et le retravailler dans un tableur',
          "Appliquer un filtre dans l'outil, et le résultat est fiable",
          'Rien : un tableau de bord la donne en continu',
        ]),
      },
    ],
  },
  {
    key: 'process',
    name: 'Process',
    why: "On n'automatise bien que ce qui est décrit. Automatiser une tâche floue revient à l'accélérer telle quelle.",
    advice: "Avant tout outil, écrivez vos tâches récurrentes : qui, à quelle fréquence, combien de temps, quelles exceptions. C'est exactement ce que fait la grille des tâches à automatiser, et c'est le point de départ de l'audit.",
    link: { href: '/ressources/outils/grille-taches-a-automatiser', label: 'Grille des tâches à automatiser' },
    questions: [
      {
        id: 'q3',
        text: 'Vos tâches récurrentes (devis, relances, saisie, reporting) sont…',
        options: o([
          'Dans la tête de ceux qui les font',
          'Connues, mais chacun a sa méthode',
          'Décrites par écrit pour les principales',
          'Décrites, avec leurs exceptions et un responsable',
        ]),
      },
      {
        id: 'q4',
        text: 'Savez-vous combien de temps ces tâches prennent chaque mois ?',
        options: o([
          'Non',
          'Une impression générale',
          'Une estimation tâche par tâche pour les principales',
          'Une mesure suivie dans le temps',
        ]),
      },
    ],
  },
  {
    key: 'competences',
    name: 'Compétences',
    why: "L'adoption suit la compétence. Un outil que personne ne sait vérifier reste sur l'étagère ou produit des erreurs qui passent inaperçues.",
    advice: "Le frein est humain, pas technique. Fournissez un outil d'entreprise (pas des comptes personnels), formez une première équipe sur ses propres cas et désignez une personne référente avec du temps dédié.",
    questions: [
      {
        id: 'q5',
        text: "Comment vos équipes utilisent-elles l'IA générative (ChatGPT, Claude, Copilot) ?",
        options: o([
          'Pas du tout, ou on ne sait pas',
          'Quelques personnes, avec leurs comptes personnels',
          "Régulièrement, avec un outil fourni par l'entreprise",
          'Régulièrement, après une formation, avec des pratiques partagées',
        ]),
      },
      {
        id: 'q6',
        text: "Qui, chez vous, sait vérifier une réponse d'IA et repérer une erreur ?",
        options: o([
          "Personne d'identifié",
          'Une personne, par goût personnel',
          'Plusieurs personnes, chacune dans son métier',
          'Un référent désigné, avec du temps prévu pour ça',
        ]),
      },
    ],
  },
  {
    key: 'gouvernance',
    name: 'Gouvernance',
    why: "Quelles données peuvent passer par une IA, et qui valide ce qu'elle fait : sans réponse écrite, chacun improvise.",
    advice: "Posez la règle avant d'étendre les usages : une charte d'une page qui dit quelles données ne passent jamais par une IA, quels outils sont autorisés et quelles actions exigent une validation humaine. Le modèle de charte est fait pour ça.",
    link: { href: '/ressources/outils/charte-ia-entreprise', label: 'Modèle de charte IA pour PME' },
    questions: [
      {
        id: 'q7',
        text: "Existe-t-il une règle sur les données qu'on peut saisir dans un outil d'IA ?",
        options: o([
          'Non',
          'Une consigne orale',
          'Une règle écrite et diffusée (charte)',
          'Une charte, une liste des outils autorisés et un rappel régulier',
        ]),
      },
      {
        id: 'q8',
        text: 'Si une IA agit dans vos outils (envoyer un e-mail, modifier une fiche), qui valide ?',
        options: o([
          "La question n'a jamais été posée",
          'On verrait au cas par cas',
          'Les actions sensibles sont validées par un humain',
          "Les validations sont définies par type d'action et tracées",
        ]),
      },
    ],
  },
  {
    key: 'direction',
    name: 'Direction',
    why: "Sans cas en production, sans budget et sans responsable, l'IA reste une série d'essais.",
    advice: "Il manque un cap. Choisissez un seul cas d'usage, donnez-lui un responsable et une enveloppe, et mesurez avant et après. Le calculateur de temps récupérable donne l'ordre de grandeur du budget à ne pas dépasser.",
    link: { href: '/ressources/outils/calculateur-roi-ia', label: 'Calculateur de temps récupérable' },
    questions: [
      {
        id: 'q9',
        text: "Avez-vous un cas d'usage IA ou une automatisation en production ?",
        options: o([
          'Non',
          "Des essais, rien d'utilisé chaque semaine",
          'Un cas utilisé chaque semaine',
          'Plusieurs, avec un résultat mesuré',
        ]),
      },
      {
        id: 'q10',
        text: "L'IA a-t-elle un budget et un responsable dans l'entreprise ?",
        options: o([
          "Ni l'un ni l'autre",
          'Un responsable officieux, pas de budget',
          'Un responsable et un budget ponctuel',
          'Un responsable, un budget annuel et des objectifs',
        ]),
      },
    ],
  },
];

export interface DiagLevel {
  level: 1 | 2 | 3 | 4 | 5;
  min: number;
  max: number;
  name: string;
  reading: string;
  next: string;
}

/** Bornes sur 30. Affichées telles quelles sous le résultat. */
export const levels: DiagLevel[] = [
  {
    level: 1, min: 0, max: 6, name: 'Exploration',
    reading: "Curiosité sans passage à l'action. Pas d'outil utilisé régulièrement, des données et des process peu formalisés.",
    next: "Ne lancez pas de projet IA maintenant. Écrivez vos tâches récurrentes, centralisez les données clients, et testez un assistant sur un seul métier.",
  },
  {
    level: 2, min: 7, max: 13, name: 'Expérimentation',
    reading: "Des usages individuels, sans cadre ni objectif. Des essais isolés, rien en production.",
    next: "Passez d'essais dispersés à un seul cas cadré : une tâche répétitive, mesurée avant, automatisée avec validation humaine, mesurée après.",
  },
  {
    level: 3, min: 14, max: 20, name: 'Adoption',
    reading: "Un à trois cas d'usage actifs, des premiers résultats mesurés, des données en partie structurées.",
    next: "Le socle est là. Le bon moment pour cartographier l'ensemble des tâches et choisir les deux chantiers suivants par volume, pas par envie.",
  },
  {
    level: 4, min: 21, max: 26, name: 'Intégration',
    reading: "L'IA est intégrée aux process principaux, avec une gouvernance, des équipes formées et une mesure régulière.",
    next: "L'enjeu devient la fiabilité et le coût : supervision des agents, traçabilité des actions, revue des validations humaines.",
  },
  {
    level: 5, min: 27, max: 30, name: 'Transformation',
    reading: "L'IA est au cœur de l'activité, pilotée avec des objectifs et un budget.",
    next: "Vous n'avez pas besoin d'un audit de découverte. Si un sujet précis bloque, décrivez-le directement par le formulaire de contact.",
  },
];

export const MAX_SCORE = 30;
export const QUESTION_COUNT = 10;
