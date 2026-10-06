// Ressource verrouillée : Guide d'achat Claude pour PME (plan, coût, configuration).
// Livrée uniquement par e-mail : private/telechargements/guide-achat-claude-pme.pdf (PDF A4, 14 pages).
// Source : private/lead-magnets-src/guide-achat-claude-pme/index.html ; génération :
// node scripts/gen-lead-pdf.mjs guide-achat-claude-pme --footer "Guide d'achat Claude pour PME · waimia.com"
// Faits produit : page tarifs Claude, centre d'aide et documentation d'Anthropic, lus le 5 octobre 2026.
import type { LeadMagnetPage } from './types';

export const data: LeadMagnetPage = {
  slug: 'guide-achat-claude-pme',
  title_fr: "Guide d'achat Claude pour PME : plan, coût, configuration",
  title_en: "Claude buyer's guide for SMBs: plan, cost, setup",
  kicker_fr: 'PDF · Dirigeants et responsables de PME',
  kicker_en: 'PDF · SMB owners and managers',
  promise_fr:
    "Choisir la bonne offre Claude, chiffrer le budget de votre équipe et la configurer correctement dès le premier jour. Trois budgets calculés pour 5, 15 et 40 personnes, avec les formules et les hypothèses écrites, les pièges d'achat et les questions à poser avant de signer.",
  promise_en:
    "Choose the right Claude plan, cost your team's budget and set it up properly from day one. Three budgets worked out for 5, 15 and 40 people, with formulas and assumptions written out, buying traps and the questions to ask before signing.",
  format_fr: 'PDF A4 · 14 pages',
  format_en: 'A4 PDF · 14 pages',
  forWho_fr: [
    "Le dirigeant de PME qui hésite entre des comptes Pro, Team ou Enterprise et veut un budget avant de payer.",
    "Le responsable administratif ou financier qui doit justifier le nombre de sièges et le rythme de facturation.",
    "Le référent informatique ou IA qui configure l'organisation et doit répondre aux questions de données et de conformité.",
  ],
  forWho_en: [
    'The SMB owner weighing Pro, Team or Enterprise accounts who wants a budget before paying.',
    'The office or finance manager who must justify the seat count and billing cycle.',
    'The IT or AI lead who sets up the organisation and must answer data and compliance questions.',
  ],
  inside_fr: [
    { title: 'La grille Claude en une page', desc: "Les cinq offres, les deux types de siège Team, l'usage relatif, les conditions et ce qui compte pour une PME. Prix en dollars au 5 octobre 2026." },
    { title: 'Matrice de décision par profil', desc: 'Huit situations, de dirigeant seul à 40 personnes avec exigences de données : offre recommandée, raison et piège à éviter.' },
    { title: 'Estimer le coût : méthode et formules', desc: "Les formules Team et Enterprise, le classement des utilisateurs en trois groupes, l'usage au-delà du quota et la mise en place." },
    { title: 'Trois budgets illustratifs : 5, 15 et 40 personnes', desc: "Calculs détaillés, mensuel contre annuel, seuil d'équilibre Team contre Enterprise, limites de chaque calcul." },
    { title: "Les pièges d'achat", desc: "Douze erreurs fréquentes, des comptes Pro personnels aux plafonds de crédits oubliés, et ce qu'elles coûtent." },
    { title: 'Configuration du jour 1, pas à pas', desc: "Douze étapes pour une organisation Team, la liste à cocher avant d'inviter l'équipe et les réglages par défaut à connaître." },
    { title: 'Questions à poser avant de signer', desc: "Prix et contrat, données et conformité, produit et feuille de route, et les questions à vous poser à vous-même." },
    { title: "Quand passer par l'API, Bedrock ou Vertex", desc: "Résidence en Europe, intégration dans vos outils, traitements en lot : quand l'abonnement ne suffit pas, et quand l'API n'est pas la réponse." },
    { title: 'Mini plan de déploiement sur 90 jours', desc: 'Quatre périodes, de la décision au renouvellement, avec le critère de réussite à 90 jours.' },
  ],
  inside_en: [
    { title: 'The Claude price list on one page', desc: 'The five plans, the two Team seat types, relative usage, terms and what matters for an SMB. Dollar prices as of 5 October 2026.' },
    { title: 'Decision matrix by profile', desc: 'Eight situations, from a solo owner to 40 people with data requirements: recommended plan, reason and trap to avoid.' },
    { title: 'Estimating cost: method and formulas', desc: 'The Team and Enterprise formulas, sorting users into three groups, usage beyond the quota and setup.' },
    { title: 'Three illustrative budgets: 5, 15 and 40 people', desc: 'Detailed calculations, monthly versus annual, Team versus Enterprise break-even, limits of each calculation.' },
    { title: 'Buying traps', desc: 'Twelve common mistakes, from personal Pro accounts to forgotten credit caps, and what they cost.' },
    { title: 'Day-one setup, step by step', desc: 'Twelve steps for a Team organisation, the checklist before inviting the team and the default settings to know.' },
    { title: 'Questions to ask before signing', desc: 'Price and contract, data and compliance, product and roadmap, and the questions to ask yourself.' },
    { title: 'When to use the API, Bedrock or Vertex', desc: 'Residency in Europe, integration into your tools, batch processing: when a subscription is not enough, and when the API is not the answer.' },
    { title: 'Mini 90-day rollout plan', desc: 'Four periods, from decision to renewal, with the success criterion at 90 days.' },
  ],
  extract_fr:
    "<p><strong>Extrait du chapitre 3 : les formules.</strong> Le guide les applique ensuite à trois équipes de 5, 15 et 40 personnes, avec les hypothèses et les limites de chaque calcul.</p>" +
    '<ul>' +
    '<li><strong>Team, facturation annuelle</strong> : (sièges Standard × 20 $ + sièges Premium × 100 $) × 12.</li>' +
    '<li><strong>Team, facturation mensuelle</strong> : (sièges Standard × 25 $ + sièges Premium × 125 $) × 12.</li>' +
    "<li><strong>Enterprise</strong> : sièges × 20 $ × 12, plus l'usage annuel au tarif de l'API.</li>" +
    '<li><strong>Budget total</strong> : abonnement, plus crédits au-delà du quota, plus mise en place.</li>' +
    '</ul>' +
    '<p>Prix Anthropic au 5 octobre 2026, en dollars, hors TVA et hors taux de change.</p>',
  extract_en:
    '<p><strong>Extract from chapter 3: the formulas.</strong> The guide then applies them to three teams of 5, 15 and 40 people, with the assumptions and limits of each calculation.</p>' +
    '<ul>' +
    '<li><strong>Team, billed annually</strong>: (Standard seats × $20 + Premium seats × $100) × 12.</li>' +
    '<li><strong>Team, billed monthly</strong>: (Standard seats × $25 + Premium seats × $125) × 12.</li>' +
    '<li><strong>Enterprise</strong>: seats × $20 × 12, plus annual usage at API rates.</li>' +
    '<li><strong>Total budget</strong>: subscription, plus credits beyond the quota, plus setup.</li>' +
    '</ul>' +
    "<p>Anthropic prices as of 5 October 2026, in dollars, excluding VAT and exchange rates.</p>",
  illustration: {
    src: '/images/illustrations/ds/guide-achat-claude-pme-balance-paper.webp',
    alt_fr: "Une immense balance : le plateau chargé d'une pile de cartons descend, une femme regarde",
    alt_en: 'A huge balance scale: the pan holding a stack of boxes goes down, a woman looks on',
  },
  faq_fr: [
    {
      q: 'Le guide donne-t-il des prix en euros ?',
      a: "Non. Anthropic publie sa grille en dollars, et la facture peut être en devise locale, TVA incluse ou ajoutée selon le pays. Le guide calcule en dollars hors TVA, avec les formules, pour que vous refassiez le calcul avec le montant affiché sur votre page de paiement.",
    },
    {
      q: 'Les trois budgets sont-ils des cas clients ?',
      a: "Non. Ce sont des scénarios illustratifs construits à partir des prix publics du 5 octobre 2026. Les hypothèses sont écrites à côté de chaque calcul : remplacez-les par les vôtres.",
    },
    {
      q: 'Le guide est-il utile si nous avons déjà des comptes Claude ?',
      a: "Oui. Les chapitres sur les pièges d'achat, la configuration du jour 1 et le plan à 90 jours servent aussi à corriger une installation existante, par exemple des comptes Pro personnels à regrouper dans une organisation Team.",
    },
    {
      q: 'Que devient mon adresse e-mail ?',
      a: "Elle sert à vous envoyer le PDF. Vous ne recevez la lettre Waimia que si vous cochez la case prévue à cet effet. Désinscription en un clic.",
    },
  ],
  faq_en: [
    {
      q: 'Does the guide give prices in euros?',
      a: 'No. Anthropic publishes its prices in dollars, and the invoice may be in local currency, VAT included or added depending on the country. The guide calculates in dollars excluding VAT, with formulas, so you can redo it with the amount shown on your checkout page.',
    },
    {
      q: 'Are the three budgets client cases?',
      a: 'No. They are illustrative scenarios built from public prices as of 5 October 2026. The assumptions are written next to each calculation: replace them with yours.',
    },
    {
      q: 'Is the guide useful if we already have Claude accounts?',
      a: 'Yes. The chapters on buying traps, day-one setup and the 90-day plan also help fix an existing setup, for example personal Pro accounts to regroup in a Team organisation.',
    },
    {
      q: 'What happens to my email address?',
      a: 'It is used to send you the PDF. You only receive the Waimia letter if you tick the box for it. Unsubscribe in one click.',
    },
  ],
  relatedPages: [
    '/ressources/guides/claude-fonctionnalites-pme',
    '/ressources/guides/claude-pme',
    '/ressources/outils/checklist-90-jours-claude',
    '/services/integration-claude',
  ],
  seoTitle_fr: "Guide d'achat Claude pour PME (PDF gratuit)",
  seoTitle_en: "Claude buyer's guide for SMBs (free PDF)",
  seoDescription_fr:
    "Choisir son abonnement Claude, chiffrer le budget pour 5, 15 ou 40 personnes et configurer Team dès le jour 1. Guide d'achat PDF de 14 pages, gratuit.",
  seoDescription_en:
    'Choose your Claude plan, cost the budget for 5, 15 or 40 people and set up Team from day one. A free 14-page PDF buyer\'s guide.',
  publishedAt: '2026-10-05',
  updatedAt: '2026-10-05',
};
