// Ressource verrouillée : Pack de 8 skills Claude pour PME.
// Livrés uniquement par e-mail : private/telechargements/pack-skills-claude-pme.zip (8 skills + LISEZ-MOI)
// et private/telechargements/pack-skills-claude-pme.pdf (mode d'emploi).
// Sources : private/lead-magnets-src/pack-skills-claude-pme/ (skills/<nom>/SKILL.md, index.html).
// Faits produit : documentation Agent Skills, Claude Code et centre d'aide d'Anthropic, lus le 5 octobre 2026.
import type { LeadMagnetPage } from './types';

export const data: LeadMagnetPage = {
  slug: 'pack-skills-claude-pme',
  title_fr: 'Pack de 8 skills Claude pour PME',
  title_en: 'Pack of 8 Claude skills for SMBs',
  kicker_fr: 'ZIP + PDF · Dirigeants et équipes',
  kicker_en: 'ZIP + PDF · Owners and teams',
  promise_fr:
    "Huit skills prêts à adapter à votre entreprise, du devis au rapport mensuel, avec leurs fichiers à compléter et un zip par skill pour claude.ai. Plus un mode d'emploi pour les installer, les régler sur vos prix et vos procédures, les tester et éviter les erreurs fréquentes.",
  promise_en:
    'Eight skills ready to adapt to your business, from quotes to the monthly report, with their fill-in files and one zip per skill for claude.ai. Plus a guide to install them, tune them to your prices and procedures, test them and avoid common mistakes.',
  format_fr: 'ZIP (8 skills) · PDF A4 de 11 pages',
  format_en: 'ZIP (8 skills) · 11-page A4 PDF',
  forWho_fr: [
    "Le dirigeant d'une PME qui utilise déjà Claude et veut que les tâches répétées se fassent toujours de la même façon.",
    "Le responsable administratif, commercial ou RH qui rédige chaque semaine les mêmes devis, relances, comptes rendus ou annonces.",
    "Le référent IA qui doit préparer des skills avant de les diffuser à l'équipe par un plugin.",
  ],
  forWho_en: [
    'The owner of an SMB who already uses Claude and wants repeated tasks done the same way every time.',
    'The office, sales or HR manager who writes the same quotes, reminders, minutes or job ads every week.',
    'The AI lead who must prepare skills before rolling them out to the team through a plugin.',
  ],
  inside_fr: [
    { title: 'devis-commercial', desc: "Brouillon de devis à partir d'une demande en texte libre, avec votre grille tarifaire et votre modèle. Tout prix absent de la grille sort en « hors grille »." },
    { title: 'compte-rendu-reunion', desc: 'Décisions, tableau des actions avec responsable et échéance, points ouverts, liste « à vérifier avant diffusion ».' },
    { title: 'relance-facture-impayee', desc: 'Rappel, relance ferme ou mise en demeure selon le retard, avec vos conditions de paiement. Trois modèles de courrier à adapter.' },
    { title: 'fiche-de-poste', desc: "Fiche de poste interne et offre d'emploi, sept questions de cadrage, critères discriminatoires écartés." },
    { title: 'veille-concurrentielle', desc: 'Note de veille où chaque fait porte sa source et sa date, avec la liste de vos concurrents à compléter.' },
    { title: 'rapport-mensuel-pilotage', desc: 'Indicateurs calculés par code depuis vos exports, écarts commentés, décisions à prendre, fichier de définitions à remplir.' },
    { title: 'charte-redactionnelle', desc: 'Votre ton, votre vocabulaire et vos mots interdits appliqués à tous les textes externes, en écriture comme en relecture.' },
    { title: 'tri-emails-entrants', desc: 'Tri par catégorie et urgence, isolement des messages suspects (dont les changements de RIB), brouillons de réponse.' },
    { title: "Le mode d'emploi PDF", desc: 'Installer sur claude.ai et dans Claude Code, adapter chaque skill, trois essais de recette, erreurs fréquentes, sécurité, passage au plugin.' },
  ],
  inside_en: [
    { title: 'devis-commercial', desc: "A draft quote from a free-text request, with your price list and template. Any price missing from the list comes out as 'off-list'." },
    { title: 'compte-rendu-reunion', desc: "Decisions, an action table with owner and due date, open points, a 'check before sending' list." },
    { title: 'relance-facture-impayee', desc: 'Reminder, firm follow-up or formal notice depending on the delay, using your payment terms. Three letter templates to adapt.' },
    { title: 'fiche-de-poste', desc: 'Internal job description and job ad, seven scoping questions, discriminatory criteria ruled out.' },
    { title: 'veille-concurrentielle', desc: 'A competitive watch note where every fact has its source and date, with your competitor list to fill in.' },
    { title: 'rapport-mensuel-pilotage', desc: 'KPIs calculated by code from your exports, commented variances, decisions to make, a definitions file to fill in.' },
    { title: 'charte-redactionnelle', desc: 'Your tone, vocabulary and banned words applied to every external text, for writing and reviewing.' },
    { title: 'tri-emails-entrants', desc: 'Triage by category and urgency, suspicious messages isolated (including bank detail changes), draft replies.' },
    { title: 'The PDF guide', desc: 'Install on claude.ai and in Claude Code, adapt each skill, three acceptance tests, common mistakes, security, moving to a plugin.' },
  ],
  extract_fr:
    "<p><strong>Extrait du skill compte-rendu-reunion : ses règles.</strong> Le fichier complet contient aussi la procédure, le format de sortie et une variante e-mail de suivi.</p>" +
    '<ul>' +
    "<li><strong>N'écris que ce qui a été dit.</strong> Si une décision n'est pas claire dans la source, classe-la en « point ouvert », pas en « décision ».</li>" +
    "<li><strong>Chaque action a un responsable et une échéance.</strong> S'il manque l'un des deux, écris « responsable à préciser » ou « échéance à préciser », et liste-le à la fin.</li>" +
    '<li><strong>Phrases courtes.</strong> Pas d\'adjectifs d\'ambiance.</li>' +
    '</ul>',
  extract_en:
    '<p><strong>Extract from the compte-rendu-reunion skill: its rules.</strong> The full file also holds the procedure, the output format and a follow-up email variant.</p>' +
    '<ul>' +
    "<li><strong>Write only what was said.</strong> If a decision is unclear in the source, file it as an 'open point', not a 'decision'.</li>" +
    "<li><strong>Every action has an owner and a due date.</strong> If either is missing, write 'owner to confirm' or 'due date to confirm', and list it at the end.</li>" +
    '<li><strong>Short sentences.</strong> No mood adjectives.</li>' +
    '</ul>',
  illustration: {
    src: '/images/illustrations/ds/pack-skills-boite-paper.webp',
    alt_fr: 'Une grande boîte à outils bleue ouverte, huit objets dans ses compartiments, une échelle et une petite silhouette',
    alt_en: 'A large open blue toolbox, eight objects in its compartments, a ladder and a small figure',
  },
  faq_fr: [
    {
      q: 'Sur quelles offres Claude ces skills fonctionnent-ils ?',
      a: "Sur claude.ai, les skills personnalisés demandent l'exécution de code activée ; la documentation développeurs d'Anthropic les cite sur Pro, Max, Team et Enterprise, et le centre d'aide les annonce aussi sur l'offre gratuite. Dans Claude Code, il suffit de copier le dossier dans .claude/skills. Vérifié le 5 octobre 2026.",
    },
    {
      q: 'Faut-il savoir coder pour les installer ou les modifier ?',
      a: "Non. Les huit skills sont du texte au format Markdown, sans script. On les modifie avec un éditeur de texte, et le PDF explique comment refaire le zip d'un skill modifié pour claude.ai.",
    },
    {
      q: 'Les skills sont-ils prêts à servir tels quels ?',
      a: "Deux le sont (compte rendu, fiche de poste). Les six autres s'appuient sur un fichier à compléter : votre grille de prix, vos conditions de paiement, vos indicateurs, votre charte. Tant qu'un champ reste vide, la procédure demande à Claude de le signaler au lieu d'inventer.",
    },
    {
      q: 'Puis-je les partager avec toute mon équipe ?',
      a: "Sur claude.ai, chaque personne installe ses skills, sauf partage d'organisation sur Team et Enterprise selon les réglages d'un propriétaire. Dans Claude Code, un dossier .claude/skills versionné avec un projet suffit. Pour plusieurs équipes, la voie prévue par Anthropic est un plugin privé : le PDF explique quand passer à cette étape.",
    },
    {
      q: 'Comment reçoit-on le pack ?',
      a: "Par e-mail, en deux pièces jointes : le ZIP des skills et le PDF du mode d'emploi. L'inscription à la lettre Waimia est facultative et séparée.",
    },
  ],
  faq_en: [
    {
      q: 'Which Claude plans do these skills work on?',
      a: "On claude.ai, custom skills require code execution to be enabled; Anthropic's developer documentation lists Pro, Max, Team and Enterprise, and the help center also includes the free plan. In Claude Code, you just copy the folder into .claude/skills. Checked on 5 October 2026.",
    },
    {
      q: 'Do I need to code to install or edit them?',
      a: 'No. The eight skills are plain Markdown text, with no scripts. You edit them in a text editor, and the PDF explains how to rebuild the zip of an edited skill for claude.ai.',
    },
    {
      q: 'Are the skills ready to use as they are?',
      a: 'Two are (minutes, job description). The other six rely on a file to fill in: your price list, payment terms, KPIs, style guide. While a field is empty, the procedure tells Claude to flag it rather than invent.',
    },
    {
      q: 'Can I share them with my whole team?',
      a: "On claude.ai, each person installs their skills, unless organisation sharing is enabled on Team and Enterprise by an owner. In Claude Code, a .claude/skills folder versioned with a project is enough. For several teams, Anthropic's intended route is a private plugin: the PDF explains when to take that step.",
    },
    {
      q: 'How do I receive the pack?',
      a: 'By email, as two attachments: the skills ZIP and the PDF guide. Signing up to the Waimia letter is optional and separate.',
    },
  ],
  relatedPages: [
    '/ressources/guides/claude-skills',
    '/ressources/guides/claude-plugins-entreprise',
    '/ressources/guides/claude-code-entreprise',
    '/ressources/guides/claude-pme',
    '/services/integration-claude',
  ],
  seoTitle_fr: 'Pack de 8 skills Claude pour PME (ZIP + PDF)',
  seoTitle_en: 'Pack of 8 Claude skills for SMBs (ZIP + PDF)',
  seoDescription_fr:
    "8 skills Claude prêts à adapter pour une PME : devis, compte rendu, relance d'impayés, fiche de poste, veille, rapport mensuel. Avec mode d'emploi PDF.",
  seoDescription_en:
    '8 Claude skills ready to adapt for an SMB: quotes, minutes, unpaid invoices, job descriptions, competitive watch, monthly report. With a PDF guide.',
  publishedAt: '2026-10-05',
  updatedAt: '2026-10-05',
};
