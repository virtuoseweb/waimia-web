// /audit-ia-pme · contenu des organisms `src/components/ui/organisms/audit/*`.
//
// Source unique (GLOBAL) : l'exemple de cartographie est réutilisé par le hero (extrait)
// et par la section « livrable » (tableau complet). L'entreprise décrite est FICTIVE et
// les chiffres sont inventés pour montrer le format : c'est écrit sur la page, deux fois.
// Ne jamais présenter cet exemple comme un cas client.
//
// La partie « site web et logiciel » (`auditWebSection`) est une section catalogue
// `editorial-prose` construite ici pour porter la promesse canonique AUDIT_PROMISE.web
// (src/data/conversion.ts) sans la recopier, ancrée sur AUDIT_WEB_ANCHOR.

import type { SectionByType } from '@waimia/ds-kernel';
import { AUDIT_PROMISE, AUDIT_WEB_ANCHOR } from './conversion';
import { SCOPING_SPRINT_EUR, SCOPING_SPRINT_HOURS, formatEur, formatEurEn } from './pricing';

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
    `Vous avez un <a href="#${AUDIT_WEB_ANCHOR}">site à créer, refondre ou reprendre, ou un outil sur mesure à envisager</a>, et vous voulez savoir par quoi commencer.`,
  ],
  no: [
    'Vous cherchez une formation pour vos équipes : c\'est une autre prestation, décrite sur la page <a href="/formations">formations IA et automatisation</a>.',
    "Vous attendez un audit de conformité RGPD ou AI Act, ou un audit de sécurité : ce n'est pas ce format.",
    "Votre besoin est une campagne marketing : l'audit porte sur vos process, votre site ou votre logiciel, pas sur votre communication.",
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

/**
 * Partie « site web et logiciel » de /audit-ia-pme (décision Simon du 14 octobre 2026).
 * Section catalogue `editorial-prose`, ancrée sur AUDIT_WEB_ANCHOR : les pages du cluster
 * site web et logiciel pointent vers `/audit-ia-pme#site-web-logiciel`.
 * Faits repris des pages du cluster : trajet d'une demande (site-web-ia.json), formulaires
 * et suite donnée (webflow.json), vitesse sur mobile (wordpress.json), circuit qui coûte le
 * plus de ressaisie et « achetez si le marché suffit » (back-office-sur-mesure.json),
 * tableur ou logiciel du marché qui ne suit plus (applications-internes.json).
 */
const sprintFr = `${SCOPING_SPRINT_HOURS} heures à ${formatEur(SCOPING_SPRINT_EUR)} HT`;
const sprintEn = `${SCOPING_SPRINT_HOURS}-hour scoping sprint at ${formatEurEn(SCOPING_SPRINT_EUR)} excl. VAT`;

export const auditWebSection = {
  type: 'editorial-prose',
  background: 'paper-2',
  anchor: AUDIT_WEB_ANCHOR,
  html_fr: [
    "<h2>Un site web ou un logiciel sur mesure : le même audit</h2>",
    "<p>Waimia développe aussi des sites web et des logiciels sur mesure. Si votre sujet est un site à créer, refondre ou reprendre, ou un outil que le tableur ou le logiciel du marché ne tient plus, l'audit garde le même cadre.</p>",
    `<p>${AUDIT_PROMISE.web.medium.fr}</p>`,
    "<h3>Ce qu'on regarde sur un site</h3>",
    "<ul>",
    "<li><strong>Le trajet d'une demande.</strong> Du formulaire de votre site jusqu'à la personne qui la traite, et ce qui se passe après l'envoi.</li>",
    "<li><strong>La plateforme.</strong> Webflow, WordPress, Shopify ou site codé, et si sa structure bloque votre équipe.</li>",
    "<li><strong>La vitesse sur mobile</strong>, sur votre site réel, pas sur une maquette.</li>",
    "</ul>",
    "<h3>Ce qu'on regarde sur un outil métier</h3>",
    "<ul>",
    "<li><strong>Le circuit qui coûte le plus de ressaisie.</strong> Qui saisit quoi, dans quel outil, et combien de fois la même information est recopiée.</li>",
    "<li><strong>L'outil en place.</strong> Le tableur partagé, le logiciel du marché ou les modules de votre ERP ou de votre CRM, et l'endroit où il ne suit plus.</li>",
    "<li><strong>Ce qui existe déjà sur le marché</strong> pour ce besoin, avant de parler de développement.</li>",
    "</ul>",
    "<h3>Le verdict</h3>",
    "<ul>",
    "<li><strong>Corriger.</strong> La structure tient : on corrige l'existant, sans refaire le design.</li>",
    "<li><strong>Refaire.</strong> Seulement si la structure du site bloque votre équipe. La refonte n'est jamais proposée par défaut.</li>",
    "<li><strong>Développer sur mesure.</strong> Quand le circuit est propre à votre métier et que le tableur ou le logiciel du marché ne suit plus.</li>",
    "<li><strong>Prendre un outil du marché.</strong> Quand un outil existant couvre le circuit sans contournement. C'est moins cher, et on vous le dit.</li>",
    "</ul>",
    `<p>Le prix vient d'un devis écrit après l'audit. Quand le périmètre n'est pas clair, un sprint de cadrage de ${sprintFr} fixe le périmètre, le planning et les jalons avant signature. Le détail des offres est sur les pages <a href="/services/site-web-ia">création et refonte de site web</a> et <a href="/services/applications-internes">application métier sur mesure</a> ; pour examiner le référencement d'un site en entier, voir l'<a href="/services/audit-seo-technique">audit SEO technique</a>.</p>`,
  ].join('\n'),
  html_en: [
    "<h2>A website or custom software: the same audit</h2>",
    "<p>Waimia also builds custom websites and software. If your topic is a site to create, rebuild or take over, or a tool that the spreadsheet or off-the-shelf software no longer handles, the audit keeps the same frame.</p>",
    `<p>${AUDIT_PROMISE.web.medium.en}</p>`,
    "<h3>What we look at on a website</h3>",
    "<ul>",
    "<li><strong>The path of a request.</strong> From your site's form to the person who handles it, and what happens after it is sent.</li>",
    "<li><strong>The platform.</strong> Webflow, WordPress, Shopify or a coded site, and whether its structure blocks your team.</li>",
    "<li><strong>Mobile speed</strong>, on your real site, not on a mock-up.</li>",
    "</ul>",
    "<h3>What we look at on a business tool</h3>",
    "<ul>",
    "<li><strong>The process that costs the most re-entry.</strong> Who enters what, in which tool, and how many times the same information is copied.</li>",
    "<li><strong>The tool in place.</strong> The shared spreadsheet, the off-the-shelf software or the modules of your ERP or CRM, and where it no longer keeps up.</li>",
    "<li><strong>What already exists on the market</strong> for this need, before talking about development.</li>",
    "</ul>",
    "<h3>The verdict</h3>",
    "<ul>",
    "<li><strong>Fix it.</strong> The structure holds: we fix what exists, without redoing the design.</li>",
    "<li><strong>Rebuild it.</strong> Only if the site's structure blocks your team. A rebuild is never proposed by default.</li>",
    "<li><strong>Build it custom.</strong> When the process is specific to your business and the spreadsheet or off-the-shelf software no longer keeps up.</li>",
    "<li><strong>Buy an existing tool.</strong> When an existing tool covers the process without workarounds. It costs less, and we tell you so.</li>",
    "</ul>",
    `<p>The price comes from a written quote after the audit. When the scope is unclear, a ${sprintEn} fixes the scope, schedule and milestones before signing. The offers are detailed on the <a href="/services/site-web-ia">website creation and redesign</a> and <a href="/services/applications-internes">custom business software</a> pages; for a full review of a site's search visibility, see the <a href="/services/audit-seo-technique">technical SEO audit</a>.</p>`,
  ].join('\n'),
} satisfies SectionByType<'editorial-prose'> & { anchor: string };
