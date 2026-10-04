// /audit-ia-pme · contenu des organisms `src/components/ui/organisms/audit/*`.
//
// Source unique (GLOBAL) : l'exemple de cartographie est réutilisé par le hero (extrait)
// et par la section « livrable » (tableau complet). L'entreprise décrite est FICTIVE et
// les chiffres sont inventés pour montrer le format : c'est écrit sur la page, deux fois.
// Ne jamais présenter cet exemple comme un cas client.

export interface TaskRow {
  task: string;
  who: string;
  /** Fréquence telle qu'on la note pendant l'échange. */
  frequency: string;
  /** Durée d'une occurrence. */
  unit: string;
  /** Temps par mois, calculé : occurrences par mois × durée unitaire. */
  monthly: string;
  /** Verdict d'automatisation. */
  verdict: 'oui' | 'partiel' | 'non';
  reason: string;
  /** Rang proposé, ou raison de mise à l'écart. */
  rank: string;
}

// Base de calcul affichée sous le tableau : 21 jours ouvrés et 4,33 semaines par mois.
//   630 × 4 min = 42 h · 173 × 6 min = 17 h 30 · 120 × 8 min = 16 h (arrondi à la demi-heure)
//   4,33 × 90 min = 6 h 30 · 315 × 3 min = 16 h · 6 × 60 min = 6 h
export const exampleCompany = 'Négoce B2B, 25 personnes';

export const exampleTasks: TaskRow[] = [
  {
    task: "Ressaisie dans l'ERP des commandes reçues par e-mail",
    who: 'Administration des ventes',
    frequency: '30 par jour',
    unit: '4 min',
    monthly: '42 h',
    verdict: 'oui',
    reason: 'Règles stables, bons de commande en PDF lisibles.',
    rank: '1',
  },
  {
    task: 'Relance des devis restés sans réponse',
    who: 'Commerciaux',
    frequency: '40 par semaine',
    unit: '6 min',
    monthly: '17 h 30',
    verdict: 'oui',
    reason: "Brouillon préparé par l'agent, envoi validé par le commercial.",
    rank: '2',
  },
  {
    task: 'Rapprochement factures fournisseurs et bons de commande',
    who: 'Comptabilité',
    frequency: '120 par mois',
    unit: '8 min',
    monthly: '16 h',
    verdict: 'partiel',
    reason: 'Les cas conformes passent seuls, les écarts restent à un humain.',
    rank: '3',
  },
  {
    task: 'Réponses aux demandes de disponibilité produit',
    who: 'Administration des ventes',
    frequency: '15 par jour',
    unit: '3 min',
    monthly: '16 h',
    verdict: 'partiel',
    reason: "Dépend de la fiabilité du stock dans l'ERP : à vérifier d'abord.",
    rank: 'Après vérification',
  },
  {
    task: 'Reporting hebdomadaire des ventes',
    who: 'Direction',
    frequency: '1 par semaine',
    unit: '1 h 30',
    monthly: '6 h 30',
    verdict: 'oui',
    reason: "Données déjà dans l'ERP, mise en forme répétitive.",
    rank: '4',
  },
  {
    task: 'Négociation des tarifs fournisseurs',
    who: 'Achats',
    frequency: '6 par mois',
    unit: '1 h',
    monthly: '6 h',
    verdict: 'non',
    reason: 'Jugement et relation : on ne touche pas.',
    rank: 'Écartée',
  },
];

export const exampleProposals = [
  {
    title: "Chantier 1 : saisie des commandes dans l'ERP",
    body: "Un workflow lit les bons de commande reçus par e-mail, prépare la commande dans l'ERP et la présente pour validation. Prérequis : un accès API ou un import de fichier côté ERP.",
  },
  {
    title: 'Chantier 2 : relance des devis',
    body: "Un agent repère les devis sans réponse dans le CRM, rédige la relance avec le contexte du dossier, et le commercial valide avant l'envoi.",
  },
];

export const exampleSetAside =
  "Mis de côté : la négociation fournisseurs (pas un sujet d'automatisation) et les demandes de disponibilité tant que le stock de l'ERP n'est pas fiable. Automatiser une donnée fausse ne fait que répondre faux plus vite.";

/** Déroulé des 45 minutes. `minutes` pilote la largeur du segment sur la règle. */
export const session = [
  {
    from: 0,
    to: 10,
    title: 'Votre contexte et vos outils',
    body: "Activité, taille des équipes, outils en place (CRM, ERP, messagerie, facturation, tableurs). Ce que vous avez déjà essayé avec l'IA et ce qui n'a pas tenu.",
  },
  {
    from: 10,
    to: 30,
    title: 'On déroule deux ou trois process, tâche par tâche',
    body: "Pour chaque tâche : qui la fait, à quelle fréquence, combien de temps, à partir de quelles données, avec quelles exceptions. C'est la partie qui remplit la cartographie.",
  },
  {
    from: 30,
    to: 40,
    title: 'Le tri',
    body: "Ce qui s'automatise tel quel, ce qui s'automatise avec une validation humaine, ce qui ne doit pas l'être. Et ce qui bloque : données dispersées, outil sans API, règle jamais écrite.",
  },
  {
    from: 40,
    to: 45,
    title: 'Le premier chantier et la suite',
    body: "On retient un ou deux chantiers et on se dit franchement si une suite a du sens, avec Waimia ou sans.",
  },
];

export const fit = {
  yes: [
    "Votre entreprise compte entre 10 et 250 personnes et des tâches reviennent chaque semaine : saisie, relances, rapprochements, reporting, réponses aux mêmes questions.",
    "Vous avez plusieurs idées d'usage de l'IA et vous ne savez pas laquelle traiter en premier.",
    "Vous avez testé ChatGPT, Claude ou Copilot en interne et rien n'est passé en production.",
    "Une personne qui connaît les process au quotidien peut participer aux 45 minutes, pas seulement la direction.",
  ],
  no: [
    "Vous cherchez une formation pour vos équipes : c'est une autre prestation, passez par le formulaire de contact.",
    "Vous attendez un audit de conformité RGPD ou AI Act, ou un audit de sécurité : ce n'est pas ce format.",
    "Votre besoin est un site vitrine ou une campagne marketing : l'audit porte sur vos process internes, pas sur votre communication.",
    "Vous êtes moins de cinq et rien n'est encore répétitif : il n'y a pas assez de volume pour qu'une automatisation se justifie.",
    "Votre cahier des charges est déjà écrit : envoyez-le directement, on gagnera une étape.",
  ],
};

export const after = [
  {
    title: 'Vous gardez la cartographie',
    body: "Elle vous est envoyée par e-mail après l'échange, que l'on travaille ensemble ou non. Vous pouvez la confier à votre équipe ou à un autre prestataire : elle est écrite pour ça.",
  },
  {
    title: 'Si un chantier se dégage, un devis',
    body: "Périmètre, délai et prix écrits pour le premier chantier. La méthode ensuite : un pilote mis en production sur un périmètre réduit, une mesure avant et après, puis le transfert du code et de la documentation à vos équipes.",
  },
  {
    title: "Si ce n'est pas le moment, on le dit",
    body: "Données à remettre d'aplomb d'abord, volume trop faible, outil qui ne s'ouvre pas : dans ces cas l'audit se conclut par ce qu'il faut régler avant, pas par une proposition commerciale.",
  },
];
