// Parcours de conversion · source unique des URL et libellés partagés entre
// /audit-ia-pme, /contact, le diagnostic et les lead magnets (GLOBAL, pas INSTANCE).
//
// Décision Simon (4 octobre 2026) : le rendez-vous se prend sur la page contact.
// Tout bouton « Réserver un audit » pointe vers AUDIT_BOOKING_HREF. Les liens
// « En savoir plus sur l'audit » pointent vers AUDIT_PAGE_HREF.

export const AUDIT_BOOKING_HREF = '/contact#offer=audit-ia-pme&intent=audit';
export const AUDIT_PAGE_HREF = '/audit-ia-pme';
/** Libellé unique du bouton de prise de rendez-vous. */
export const AUDIT_BOOKING_LABEL = { fr: 'Réserver un audit IA gratuit', en: 'Book a free AI audit' } as const;
/** Libellé du lien secondaire vers la page qui présente l'audit. */
export const AUDIT_PAGE_LABEL = { fr: "Comment se passe l'audit", en: 'How the audit works' } as const;

/**
 * Promesse de l'audit gratuit, alignée sur /audit-ia-pme (décision Simon du 14 octobre 2026).
 * Noyau commun : 45 minutes, visio, gratuit, sans engagement, un ou deux chantiers classés.
 * Variante `web` pour les pages site web et logiciel (groupe « Site web » de HUB_GROUPS,
 * colonne « Applications métier » du méga-menu) ; variante `general` partout ailleurs.
 * Interdits dans toute promesse d'audit : « trois », « au moins deux », « rentables »,
 * « chiffrés » (sauf heures), « plan d'action », « budget », « diagnostic », « offert ».
 * Les pages JSON ne peuvent pas importer : elles recopient ces chaînes mot pour mot.
 */
export const AUDIT_PROMISE = {
  general: {
    short: {
      fr: 'Audit gratuit de 45 minutes en visio. Vous repartez avec une cartographie écrite et un ou deux chantiers classés.',
      en: 'Free 45-minute audit by video call. You leave with a written task map and one or two ranked projects.',
    },
    tiny: {
      fr: 'Gratuit, 45 minutes : un ou deux chantiers classés.',
      en: 'Free, 45 minutes: one or two ranked projects.',
    },
    medium: {
      fr: "Quarante-cinq minutes en visio, gratuites et sans engagement. On passe vos process en revue tâche par tâche et vous repartez avec une cartographie écrite et un ou deux chantiers classés. Si rien ne vaut le coup aujourd'hui, on vous le dit.",
      en: "Forty-five minutes on a call, free and with no commitment. We go through your processes task by task and you leave with a written task map and one or two ranked projects. If nothing is worth it today, we tell you.",
    },
  },
  web: {
    short: {
      fr: 'Audit gratuit de 45 minutes en visio : on regarde votre site ou votre outil, et vous repartez avec un ou deux chantiers classés.',
      en: 'Free 45-minute audit by video call: we look at your website or your tool, and you leave with one or two ranked projects.',
    },
    medium: {
      fr: "Quarante-cinq minutes en visio, gratuites et sans engagement. On regarde votre site ou le circuit que votre outil actuel ne tient plus, et on vous dit s'il faut le corriger, le refaire, le développer sur mesure ou prendre un outil du marché. Vous repartez avec un ou deux chantiers classés. Si rien ne vaut le coup, on vous le dit.",
      en: "Forty-five minutes on a call, free and with no commitment. We look at your website, or at the process your current tool no longer handles, and tell you whether to fix it, rebuild it, build it custom or buy an existing tool. You leave with one or two ranked projects. If nothing is worth it, we tell you.",
    },
  },
  /** Méta description de /audit-ia-pme (166 caractères, plafond 175). */
  meta: {
    fr: "Audit IA d'entreprise de 45 min pour PME et ETI : process, site web ou logiciel passés en revue, cartographie écrite, un ou deux chantiers classés. Gratuit, en visio.",
    en: '45-min AI audit for SMBs: processes, website or software reviewed, a written map and one or two ranked projects. Free, by video call.',
  },
} as const;
/** Ancre de la section « site web et logiciel » de /audit-ia-pme. */
export const AUDIT_WEB_ANCHOR = 'site-web-logiciel';
export const DIAGNOSTIC_HREF = '/ressources/diagnostics/maturite-ia';
export const ROI_HREF = '/ressources/outils/calculateur-roi-ia';
export const CHARTE_HREF = '/ressources/outils/charte-ia-entreprise';
export const GRILLE_HREF = '/ressources/outils/grille-taches-a-automatiser';
export const CHECKLIST_HREF = '/ressources/outils/checklist-90-jours-claude';
export const GUIDE_ACHAT_CLAUDE_HREF = '/ressources/outils/guide-achat-claude-pme';
export const PACK_SKILLS_CLAUDE_HREF = '/ressources/outils/pack-skills-claude-pme';
export const KIT_CONFORMITE_CLAUDE_HREF = '/ressources/outils/kit-conformite-claude-entreprise';

/** Objets de demande proposés dans le formulaire de contact (`subject`). */
export const CONTACT_SUBJECTS = [
  { value: 'audit', label: 'Audit IA gratuit (45 min)' },
  { value: 'projet', label: 'Un projet : automatisation, agent IA, application métier' },
  { value: 'formation', label: 'Une formation IA ou automatisation' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]['value'];

/**
 * Pièce jointe d'une ressource VERROUILLÉE : fichier PRIVÉ (hors `public/`, jamais servi par
 * le site), lu par POST /api/lead-magnet et envoyé en pièce jointe Resend.
 * `file` : chemin relatif à la racine du projet, sous `private/telechargements/`.
 */
export interface LeadMagnetAttachment {
  file: string;
  filename: string;
}

export interface LeadMagnetEntry {
  title: string;
  path: string;
  attachments?: readonly LeadMagnetAttachment[];
}

/** Lead magnets servis par POST /api/lead-magnet (clé = `slug` du payload). */
export const LEAD_MAGNETS = {
  'diagnostic-maturite-ia': {
    title: 'Votre diagnostic de maturité IA',
    path: DIAGNOSTIC_HREF,
  },
  'calculateur-roi-ia': {
    title: 'Votre estimation de temps récupérable',
    path: ROI_HREF,
  },
  'charte-ia-entreprise': {
    title: 'Modèle de charte IA pour PME',
    path: CHARTE_HREF,
    attachments: [
      { file: 'private/telechargements/charte-ia-pme-modele-waimia.pdf', filename: 'charte-ia-pme-modele-waimia.pdf' },
    ],
  },
  'grille-taches-a-automatiser': {
    title: 'Votre grille des tâches à automatiser',
    path: GRILLE_HREF,
  },
  'checklist-90-jours-claude': {
    title: 'Checklist 90 jours pour déployer Claude en PME',
    path: CHECKLIST_HREF,
    attachments: [
      { file: 'private/telechargements/checklist-90-jours-claude-pme-waimia.pdf', filename: 'checklist-90-jours-claude-pme-waimia.pdf' },
    ],
  },
  'guide-achat-claude-pme': {
    title: "Guide d'achat Claude pour PME : plan, coût, configuration",
    path: GUIDE_ACHAT_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/guide-achat-claude-pme.pdf', filename: 'guide-achat-claude-pme.pdf' },
    ],
  },
  'pack-skills-claude-pme': {
    title: 'Pack de 8 skills Claude pour PME',
    path: PACK_SKILLS_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/pack-skills-claude-pme.pdf', filename: 'pack-skills-claude-pme.pdf' },
      { file: 'private/telechargements/pack-skills-claude-pme.zip', filename: 'pack-skills-claude-pme.zip' },
    ],
  },
  'kit-conformite-claude-entreprise': {
    title: 'Kit conformité et administration de Claude en entreprise',
    path: KIT_CONFORMITE_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/kit-conformite-claude-entreprise.pdf', filename: 'kit-conformite-claude-entreprise.pdf' },
    ],
  },
} as const satisfies Record<string, LeadMagnetEntry>;

export type LeadMagnetSlug = keyof typeof LEAD_MAGNETS;

/**
 * Appel vers un OUTIL interactif depuis une autre page (article de blog) : pas de formulaire,
 * le résultat n'existe que sur la page de l'outil. Texte GLOBAL par ressource (clé = slug de
 * LEAD_MAGNETS), rendu par la section catalogue `cta-final` (bloc `lead` du template essay).
 * Une ressource absente d'ici est traitée comme verrouillée (PDF) si elle a des pièces jointes.
 */
export interface ToolEntryCopy {
  href: string;
  h2: string;
  body: string;
  label: string;
}

export const TOOL_ENTRY_COPY = {
  'grille-taches-a-automatiser': {
    href: GRILLE_HREF,
    h2: 'Classez vos tâches avant de choisir le premier cas',
    body: 'Dix minutes, un classement par priorité en heures par mois : la grille vous le donne tout de suite, sans inscription. Vous pouvez ensuite la recevoir par e-mail pour la garder.',
    label: 'Classer mes tâches',
  },
  'calculateur-roi-ia': {
    href: ROI_HREF,
    h2: 'Chiffrez le gain avant de vous engager',
    body: 'Entrez vos heures et vos coûts : le calculateur donne le temps récupérable tout de suite, sans inscription. Vous pouvez ensuite recevoir le détail par e-mail.',
    label: 'Calculer mon gain',
  },
  'diagnostic-maturite-ia': {
    href: DIAGNOSTIC_HREF,
    h2: "Où en est votre entreprise avec l'IA ?",
    body: "Le diagnostic de maturité prend quelques minutes et donne un niveau et une première piste. Le résultat s'affiche tout de suite ; vous pouvez le recevoir par e-mail.",
    label: 'Faire le diagnostic',
  },
} as const satisfies Partial<Record<LeadMagnetSlug, ToolEntryCopy>>;

/**
 * Bande finale « audit » des pages outil (section catalogue `cta-final`).
 * Source unique : même boutons partout, seul le texte d'accroche varie par page.
 */
export function auditCtaFinal(h2: string, body: string) {
  return {
    type: 'cta-final' as const,
    background: 'ink' as const,
    h2_fr: h2,
    h2_en: h2,
    body_fr: body,
    body_en: body,
    cta_primary: { label_fr: AUDIT_BOOKING_LABEL.fr, label_en: AUDIT_BOOKING_LABEL.en, href: AUDIT_BOOKING_HREF, variant: 'primary' as const },
    cta_secondary: { label_fr: AUDIT_PAGE_LABEL.fr, label_en: AUDIT_PAGE_LABEL.en, href: AUDIT_PAGE_HREF, variant: 'ghost' as const },
  };
}

/**
 * Texte par défaut de la section catalogue `lead-capture-band`, par ressource (GLOBAL).
 * Une page (outil, guide, article) qui pose la section avec seulement `lead_magnet` reçoit ce
 * texte ; tout champ écrit dans la section le remplace (override d'instance).
 * Règle : `benefits` ne liste QUE ce que l'e-mail apporte réellement (src/lib/lead-magnet-delivery.ts :
 * fichier en pièce jointe pour les ressources verrouillées ; pour les outils, récapitulatif de ce
 * qui a été saisi et calculé, lien de retour vers la page, prochaine étape audit ; un seul e-mail).
 * Comptes de pages mesurés sur les PDF de private/telechargements/ le 6 octobre 2026.
 */
export interface LeadCaptureCopyLang {
  kicker: string;
  h2: string;
  body: string;
  benefits: readonly string[];
  submit: string;
  cover: { kicker: string; title: string; meta: string };
}
export interface LeadCaptureCopy {
  mode: 'required' | 'open';
  fr: LeadCaptureCopyLang;
  en: LeadCaptureCopyLang;
}

export const LEAD_CAPTURE_COPY: Record<LeadMagnetSlug, LeadCaptureCopy> = {
  'diagnostic-maturite-ia': {
    mode: 'open',
    fr: {
      kicker: 'Votre résultat, à garder',
      h2: 'Recevez votre rapport PDF complet par e-mail',
      body: "Le résultat reste affiché sur cette page. Le rapport PDF, joint à l'e-mail, vous en garde le détail, à relire ou à transférer avant d'en parler en interne.",
      benefits: [
        'Votre niveau sur 5, votre score total et la note de chaque dimension',
        'Le point à traiter en premier et la prochaine étape à votre niveau',
        'Vos dix réponses, telles que vous les avez données',
        "Le lien pour revenir au diagnostic, et l'audit gratuit de 45 minutes, réservable depuis le PDF",
      ],
      submit: 'Recevoir mon rapport',
      cover: { kicker: 'PDF · diagnostic', title: 'Votre rapport de maturité IA', meta: 'Niveau, scores, lecture par dimension, prochaine étape' },
    },
    en: {
      kicker: 'Your result, to keep',
      h2: 'Get your full PDF report by email',
      body: 'The result stays on this page. The PDF report attached to the email keeps the detail for you, to reread or forward before discussing it internally.',
      benefits: [
        'Your level out of 5, your total score and the score of each dimension',
        'The first point to work on and the next step at your level',
        'Your ten answers, as you gave them',
        'The link back to the assessment, and the free 45-minute audit, bookable from the PDF',
      ],
      submit: 'Get my report',
      cover: { kicker: 'PDF · assessment', title: 'Your AI maturity report', meta: 'Level, scores, reading by dimension, next step' },
    },
  },
  'calculateur-roi-ia': {
    mode: 'open',
    fr: {
      kicker: 'Votre calcul, à garder',
      h2: 'Recevez votre rapport PDF par e-mail',
      body: "Les chiffres restent affichés ci-dessus. Le rapport PDF, joint à l'e-mail, les garde pour vous, prêts à transférer à un associé ou à votre expert-comptable.",
      benefits: [
        'Vos hypothèses, ligne par ligne, telles que vous les avez saisies',
        'Les résultats calculés : heures récupérables, valeur de ce temps, budget de mise en place à ne pas dépasser',
        'Le lien pour revenir au calculateur et refaire le calcul',
        "L'audit gratuit de 45 minutes, réservable depuis le PDF, pour vérifier ces chiffres sur vos vraies tâches",
      ],
      submit: 'Recevoir mon rapport',
      cover: { kicker: 'PDF · estimation', title: 'Votre rapport de temps récupérable', meta: 'Hypothèses, calcul pas à pas, prochaine étape' },
    },
    en: {
      kicker: 'Your calculation, to keep',
      h2: 'Get your PDF report by email',
      body: 'The figures stay on screen above. The PDF report attached to the email keeps them for you, ready to forward to a partner or your accountant.',
      benefits: [
        'Your assumptions, line by line, as you entered them',
        'The calculated results: recoverable hours, value of that time, maximum setup budget',
        'The link back to the calculator to run it again',
        'The free 45-minute audit, bookable from the PDF, to check these figures on your real tasks',
      ],
      submit: 'Get my report',
      cover: { kicker: 'PDF · estimate', title: 'Your recoverable time report', meta: 'Assumptions, step-by-step calculation, next step' },
    },
  },
  'grille-taches-a-automatiser': {
    mode: 'open',
    fr: {
      kicker: 'Votre classement, à garder',
      h2: 'Recevez votre grille classée par e-mail',
      body: "Le classement reste affiché ici. L'e-mail vous le garde, prêt à partager avec l'équipe ou à apporter à l'audit.",
      benefits: [
        'Vos tâches classées par priorité, jusqu\'à vingt lignes',
        'Pour chacune : fréquence, durée, heures par mois et score',
        'Le total des heures recensées par mois',
        "Le lien pour revenir à la grille, et l'audit gratuit de 45 minutes pour trancher les cas limites",
      ],
      submit: 'Recevoir mon classement',
      cover: { kicker: 'E-mail · grille', title: 'Votre grille des tâches à automatiser', meta: 'Tâches classées, heures par mois' },
    },
    en: {
      kicker: 'Your ranking, to keep',
      h2: 'Get your ranked grid by email',
      body: 'The ranking stays on screen here. The email keeps it for you, ready to share with the team or bring to the audit.',
      benefits: [
        'Your tasks ranked by priority, up to twenty lines',
        'For each one: frequency, duration, hours per month and score',
        'The total hours listed per month',
        'The link back to the grid, and the free 45-minute audit to settle borderline cases',
      ],
      submit: 'Get my ranking',
      cover: { kicker: 'Email · grid', title: 'Your grid of tasks to automate', meta: 'Ranked tasks, hours per month' },
    },
  },
  'charte-ia-entreprise': {
    mode: 'required',
    fr: {
      kicker: 'PDF · envoyé par e-mail',
      h2: 'Recevez la charte en PDF, prête à faire signer',
      body: "Le texte est lisible en entier sur cette page. Le PDF, lui, part uniquement par e-mail, en pièce jointe : il n'existe pas de lien de téléchargement public.",
      benefits: [
        'Le modèle complet en neuf articles, mis en page pour être imprimé et signé',
        "Les notes d'adaptation pour l'ajuster à votre entreprise",
        "Les champs que vous avez personnalisés sur la page, repris dans l'e-mail",
        'Un seul e-mail, sans inscription à une liste',
      ],
      submit: 'Recevoir le PDF',
      cover: { kicker: 'Modèle PDF · A4', title: 'Charte IA pour PME', meta: '9 articles · 5 pages' },
    },
    en: {
      kicker: 'PDF · sent by email',
      h2: 'Get the policy as a PDF, ready to sign',
      body: 'The full text is readable on this page. The PDF is sent by email only, as an attachment: there is no public download link.',
      benefits: [
        'The full template in nine articles, laid out to print and sign',
        'Adaptation notes to fit it to your company',
        'The fields you customised on the page, repeated in the email',
        'A single email, no mailing list',
      ],
      submit: 'Get the PDF',
      cover: { kicker: 'PDF template · A4', title: 'AI policy for SMBs', meta: '9 articles · 5 pages' },
    },
  },
  'checklist-90-jours-claude': {
    mode: 'required',
    fr: {
      kicker: 'PDF · envoyé par e-mail',
      h2: 'Recevez la checklist en PDF pour votre réunion de lancement',
      body: "La checklist se coche en ligne. Le PDF vierge part uniquement par e-mail, en pièce jointe : il n'existe pas de lien de téléchargement public.",
      benefits: [
        'Les six prérequis et les douze semaines, une case par action',
        'Les indicateurs à suivre et les signaux d\'alerte',
        'Une version vierge à imprimer et à distribuer en réunion',
        "Votre avancement sur la page, s'il y en a un, repris dans l'e-mail",
      ],
      submit: 'Recevoir le PDF',
      cover: { kicker: 'Checklist PDF · A4', title: 'Déployer Claude en PME en 90 jours', meta: '6 prérequis · 12 semaines · 5 pages' },
    },
    en: {
      kicker: 'PDF · sent by email',
      h2: 'Get the checklist as a PDF for your kick-off meeting',
      body: 'The checklist can be ticked online. The blank PDF is sent by email only, as an attachment: there is no public download link.',
      benefits: [
        'The six prerequisites and twelve weeks, one box per action',
        'The indicators to track and the warning signs',
        'A blank version to print and hand out in the meeting',
        'Your progress on the page, if any, repeated in the email',
      ],
      submit: 'Get the PDF',
      cover: { kicker: 'PDF checklist · A4', title: 'Rolling out Claude in an SMB in 90 days', meta: '6 prerequisites · 12 weeks · 5 pages' },
    },
  },
  'guide-achat-claude-pme': {
    mode: 'required',
    fr: {
      kicker: 'PDF · 14 pages · envoyé par e-mail',
      h2: "Recevez le guide d'achat Claude dans votre boîte mail",
      body: "Le guide part uniquement par e-mail, en pièce jointe : il n'existe pas de lien de téléchargement public.",
      benefits: [
        'La grille Claude en une page, prix en dollars au 5 octobre 2026',
        'Trois budgets calculés pour 5, 15 et 40 personnes, formules comprises',
        "Douze pièges d'achat et ce qu'ils coûtent",
        'La configuration du jour 1, en douze étapes',
      ],
      submit: 'Recevoir le guide',
      cover: { kicker: 'Guide PDF · A4', title: "Guide d'achat Claude pour PME", meta: 'Plan, coût, configuration · 14 pages' },
    },
    en: {
      kicker: 'PDF · 14 pages · sent by email',
      h2: "Get the Claude buyer's guide in your inbox",
      body: 'The guide is sent by email only, as an attachment: there is no public download link.',
      benefits: [
        'The Claude price list on one page, dollar prices as of 5 October 2026',
        'Three budgets worked out for 5, 15 and 40 people, formulas included',
        'Twelve buying traps and what they cost',
        'Day-one setup, in twelve steps',
      ],
      submit: 'Get the guide',
      cover: { kicker: 'PDF guide · A4', title: "Claude buyer's guide for SMBs", meta: 'Plan, cost, setup · 14 pages' },
    },
  },
  'pack-skills-claude-pme': {
    mode: 'required',
    fr: {
      kicker: 'ZIP et PDF · envoyés par e-mail',
      h2: 'Recevez les 8 skills Claude prêts à installer',
      body: "Le pack part uniquement par e-mail, en deux pièces jointes : il n'existe pas de lien de téléchargement public.",
      benefits: [
        'Huit skills en ZIP : devis, compte rendu, relance de facture, fiche de poste, veille et trois autres',
        "Le mode d'emploi PDF de 11 pages : installer, adapter, tester",
        'Les erreurs fréquentes et les règles de sécurité',
        'Un seul e-mail, sans inscription à une liste',
      ],
      submit: 'Recevoir le pack',
      cover: { kicker: 'ZIP + PDF', title: 'Pack de 8 skills Claude pour PME', meta: "8 skills · mode d'emploi de 11 pages" },
    },
    en: {
      kicker: 'ZIP and PDF · sent by email',
      h2: 'Get the 8 Claude skills, ready to install',
      body: 'The pack is sent by email only, as two attachments: there is no public download link.',
      benefits: [
        'Eight skills in a ZIP: quotes, meeting notes, invoice reminders, job descriptions, monitoring and three more',
        'The 11-page PDF guide: install, adapt, test',
        'Common mistakes and security rules',
        'A single email, no mailing list',
      ],
      submit: 'Get the pack',
      cover: { kicker: 'ZIP + PDF', title: '8 Claude skills for SMBs', meta: '8 skills · 11-page guide' },
    },
  },
  'kit-conformite-claude-entreprise': {
    mode: 'required',
    fr: {
      kicker: 'PDF · 11 pages · envoyé par e-mail',
      h2: 'Recevez le kit conformité Claude pour votre administrateur',
      body: "Le kit part uniquement par e-mail, en pièce jointe : il n'existe pas de lien de téléchargement public.",
      benefits: [
        "Les réglages d'administration à vérifier, avec la valeur par défaut et notre recommandation",
        "Les points RGPD et une mini trame d'analyse d'impact",
        "Un registre des usages et un modèle de politique d'usage d'une page",
        'Douze questions à poser au fournisseur avant de signer',
      ],
      submit: 'Recevoir le kit',
      cover: { kicker: 'Kit PDF · A4', title: 'Conformité et administration de Claude', meta: 'Réglages, RGPD, registre · 11 pages' },
    },
    en: {
      kicker: 'PDF · 11 pages · sent by email',
      h2: 'Get the Claude compliance kit for your administrator',
      body: 'The kit is sent by email only, as an attachment: there is no public download link.',
      benefits: [
        'The admin settings to check, with the default value and our recommendation',
        'GDPR points and a short impact assessment frame',
        'A usage register and a one-page usage policy template',
        'Twelve questions to ask the vendor before signing',
      ],
      submit: 'Get the kit',
      cover: { kicker: 'PDF kit · A4', title: 'Claude compliance and administration', meta: 'Settings, GDPR, register · 11 pages' },
    },
  },
};
