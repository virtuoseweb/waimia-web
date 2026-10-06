// Ressource verrouillée : Kit conformité et administration de Claude en entreprise.
// Le PDF (private/telechargements/kit-conformite-claude-entreprise.pdf) part uniquement par e-mail.
// Source du PDF : private/lead-magnets-src/kit-conformite-claude-entreprise/index.html.
// Faits produit : état au 5 octobre 2026 (sources Anthropic citées dans le PDF). Pas un avis juridique.
import type { LeadMagnetPage } from './types';

export const data: LeadMagnetPage = {
  slug: 'kit-conformite-claude-entreprise',
  title_fr: 'Kit conformité et administration de Claude en entreprise',
  title_en: 'Claude compliance and administration kit for business',
  kicker_fr: 'Kit PDF · Dirigeants et DSI',
  kicker_en: 'PDF kit · Owners and IT leads',
  promise_fr:
    "Les réglages Team et Enterprise à vérifier avant le premier compte, les points RGPD qui comptent vraiment, et les documents à remplir pour décider usage par usage. Chaque fait sur Claude est sourcé et daté ; ce qui relève de votre contrat ou de votre conseil est signalé « à vérifier ».",
  promise_en:
    'The Team and Enterprise settings to check before the first account, the GDPR points that really matter, and the documents to fill in to decide use by use. Every fact about Claude is sourced and dated; what depends on your contract or your adviser is flagged "to check".',
  format_fr: 'PDF A4 · 11 pages',
  format_en: 'A4 PDF · 11 pages',
  forWho_fr: [
    "Le dirigeant d'une PME qui ouvre des comptes Claude Team ou Enterprise et veut savoir ce qu'il signe.",
    'Le DSI ou le responsable informatique qui doit régler la console d\'administration et la diffusion des plugins.',
    'Le DPO, le référent IA ou le responsable conformité qui tient le registre et la politique d\'usage.',
  ],
  forWho_en: [
    'The owner of an SMB opening Claude Team or Enterprise accounts who wants to know what they are signing.',
    'The IT lead who has to configure the admin console and the plugin rollout.',
    'The DPO, AI lead or compliance owner who keeps the register and the usage policy.',
  ],
  inside_fr: [
    { title: "Les réglages d'administration à vérifier", desc: "Cowork par organisation, exécution dans le cloud, navigateur intégré, Claude in Chrome, approbation automatique, « Always allow » des connecteurs : valeur par défaut, recommandation, case de vérification." },
    { title: "Ce qui dépend de l'offre", desc: 'SSO, SCIM, journaux d\'audit, Compliance API, rétention personnalisée : Team ou Enterprise, et les repères de prix datés.' },
    { title: 'Plugins, connecteurs et marketplaces', desc: 'Les quatre niveaux de diffusion, la surcharge par groupe, et sept décisions à prendre avant d\'installer.' },
    { title: 'Les points RGPD', desc: 'Stockage, résidence en Europe, entraînement, comptes grand public, historique local de Cowork, DPA et certifications.' },
    { title: "Une mini trame d'analyse d'impact", desc: 'Huit questions à remplir pour chaque usage, jusqu\'à la décision datée.' },
    { title: "Un modèle de politique d'usage d'une page", desc: 'Dix règles à afficher ou à faire signer, adossées au modèle de charte IA complet.' },
    { title: 'Un registre des usages', desc: 'Le tableau à remplir : usage, référent, données, connecteurs, validation humaine, décision.' },
    { title: 'Les questions à poser au fournisseur', desc: 'Douze questions pour Anthropic, un revendeur ou un intégrateur, contrat et plugins compris.' },
    { title: 'Le calendrier AI Act utile', desc: 'Les dates qui touchent une PME utilisatrice, avec renvoi vers le guide détaillé.' },
  ],
  inside_en: [
    { title: 'The admin settings to check', desc: 'Cowork per organisation, cloud execution, built-in browser, Claude in Chrome, auto-approval, connectors\' "Always allow": default value, recommendation, check box.' },
    { title: 'What depends on the plan', desc: 'SSO, SCIM, audit logs, Compliance API, custom retention: Team or Enterprise, with dated price benchmarks.' },
    { title: 'Plugins, connectors and marketplaces', desc: 'The four rollout levels, per-group override, and seven decisions to make before installing.' },
    { title: 'GDPR points', desc: 'Storage, EU residency, training, consumer accounts, Cowork local history, DPA and certifications.' },
    { title: 'A short impact assessment frame', desc: 'Eight questions to fill in for each use, down to a dated decision.' },
    { title: 'A one-page usage policy template', desc: 'Ten rules to display or have signed, backed by the full AI policy template.' },
    { title: 'A usage register', desc: 'The table to fill in: use, owner, data, connectors, human approval, decision.' },
    { title: 'Questions to ask the vendor', desc: 'Twelve questions for Anthropic, a reseller or an integrator, contract and plugins included.' },
    { title: 'The useful AI Act timeline', desc: 'The dates that affect an SMB using AI, with a link to the detailed guide.' },
  ],
  extract_fr:
    "<p><strong>Extrait de la partie 1 : trois réglages parmi ceux du kit.</strong> Source : aide Claude sur les réglages Cowork pour Team et Enterprise, lue le 5 octobre 2026.</p>" +
    "<ul>" +
    "<li><strong>Exécution de Cowork dans le cloud</strong> : activée par défaut en Team, désactivée par défaut en Enterprise. En Team, décidez-le explicitement : une tâche cloud tourne appareil éteint.</li>" +
    "<li><strong>« Always allow » des connecteurs</strong> : désactivé par défaut. Laissez-le ainsi tant que les actions concernées ne sont pas listées.</li>" +
    "<li><strong>Historique local des sessions Cowork</strong> : non soumis à la politique de rétention standard, et ni gérable ni supprimable centralement par l'administrateur. À écrire dans la politique d'usage.</li>" +
    "</ul>",
  extract_en:
    '<p><strong>Extract from part 1: three of the settings in the kit.</strong> Source: Claude help on Cowork settings for Team and Enterprise, read on 5 October 2026.</p>' +
    '<ul>' +
    '<li><strong>Running Cowork in the cloud</strong>: on by default on Team, off by default on Enterprise. On Team, decide it explicitly: a cloud task runs with the device off.</li>' +
    '<li><strong>Connectors\' "Always allow"</strong>: off by default. Keep it that way until the actions concerned are listed.</li>' +
    '<li><strong>Local Cowork session history</strong>: not subject to the standard retention policy, and neither manageable nor deletable centrally by the admin. Write it into the usage policy.</li>' +
    '</ul>',
  illustration: {
    src: '/images/illustrations/ds/claude-plugins-poste-garde-paper.webp',
    alt_fr: 'Un garde à lanterne inspecte une caisse qui arrive à la porte d\'un haut mur',
    alt_en: 'A guard with a lantern inspects a crate arriving at the gate of a tall wall',
  },
  faq_fr: [
    {
      q: 'Ce kit est-il un avis juridique ?',
      a: "Non. C'est un document de travail : il rassemble les faits publiés par Anthropic au 5 octobre 2026 et des trames à remplir. Les points qui dépendent de votre contrat, de vos traitements ou d'une interprétation du RGPD sont marqués « à vérifier » et se tranchent avec votre DPO ou votre conseil.",
    },
    {
      q: 'Sert-il pour Claude Team comme pour Claude Enterprise ?',
      a: "Oui. Chaque réglage indique sa valeur par défaut selon l'offre quand la source la précise, et un tableau distingue ce qui n'existe qu'en Enterprise (journaux d'audit, SCIM, rétention personnalisée, surcharge des plugins par groupe).",
    },
    {
      q: 'Remplace-t-il la charte IA ?',
      a: "Non. Il contient une politique d'usage d'une page, qui résume les règles et renvoie au <a href=\"/ressources/outils/charte-ia-entreprise\">modèle de charte IA complet</a>. Le cadre général est sur la page <a href=\"/conformite-ia\">conformité IA</a>.",
    },
    {
      q: 'Pourquoi faut-il donner son e-mail ?',
      a: "Le fichier est envoyé en pièce jointe, uniquement par e-mail. L'inscription à la lettre Waimia est une case séparée, décochée par défaut.",
    },
    {
      q: 'Les informations seront-elles encore justes dans six mois ?',
      a: "Pas toutes : les offres de Claude changent vite (la fusion de Cowork dans Claude est en cours). Chaque fait est daté et sourcé pour que vous puissiez le revérifier. Le <a href=\"/ressources/guides/claude-plugins-entreprise\">guide des plugins Claude en entreprise</a> est mis à jour en ligne.",
    },
  ],
  faq_en: [
    {
      q: 'Is this kit legal advice?',
      a: 'No. It is a working document: it gathers the facts published by Anthropic as of 5 October 2026 and frames to fill in. Points that depend on your contract, your processing or a GDPR interpretation are marked "to check" and are settled with your DPO or adviser.',
    },
    {
      q: 'Does it work for Claude Team as well as Claude Enterprise?',
      a: 'Yes. Each setting shows its default per plan when the source specifies it, and a table separates what only exists on Enterprise (audit logs, SCIM, custom retention, per-group plugin override).',
    },
    {
      q: 'Does it replace the AI policy?',
      a: 'No. It contains a one-page usage policy that summarises the rules and points to the <a href="/ressources/outils/charte-ia-entreprise">full AI policy template</a>. The general framework is on the <a href="/conformite-ia">AI compliance</a> page.',
    },
    {
      q: 'Why do I need to give my email?',
      a: 'The file is sent as an attachment, by email only. Signing up to the Waimia letter is a separate box, unticked by default.',
    },
    {
      q: 'Will the information still be accurate in six months?',
      a: 'Not all of it: Claude plans change fast (Cowork is being merged into Claude). Each fact is dated and sourced so you can re-check it. The <a href="/ressources/guides/claude-plugins-entreprise">Claude plugins for business guide</a> is kept up to date online.',
    },
  ],
  relatedPages: [
    '/ressources/guides/claude-plugins-entreprise',
    '/ressources/guides/claude-pme',
    '/ressources/outils/charte-ia-entreprise',
    '/conformite-ia',
    '/ressources/guides/ai-act-pme-calendrier',
    '/services/integration-claude',
  ],
  seoTitle_fr: 'Kit conformité Claude en entreprise (PDF gratuit)',
  seoTitle_en: 'Claude compliance kit for business (free PDF)',
  seoDescription_fr:
    "Kit PDF pour dirigeants et DSI : réglages Claude Team et Enterprise à vérifier, points RGPD, trame d'analyse d'impact, politique d'usage et registre.",
  seoDescription_en:
    'PDF kit for owners and IT leads: Claude Team and Enterprise settings to check, GDPR points, impact assessment frame, usage policy and register.',
  publishedAt: '2026-10-05',
  updatedAt: '2026-10-05',
};
