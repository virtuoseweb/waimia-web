/**
 * market-cases.ts · « Études de cas du marché » : source UNIQUE (contenu GLOBAL).
 *
 * Règle éditoriale (Simon, octobre 2026) : une page de cas d'usage peut être publiée sans
 * réalisation Waimia, à condition de s'appuyer sur des cas réels, documentés et sourcés,
 * réalisés par d'autres. Ces cas vivent ICI, et nulle part ailleurs :
 *   · ils sont rendus uniquement par la section cataloguée `market-cases`, qui pose sur
 *     chaque cas le libellé `MARKET_CASE_LABEL`, le lien vers la source et la date de lecture ;
 *   · aucun chiffre de ce fichier ne doit être recopié dans un bloc de preuve Waimia
 *     (hero, stats, témoignage, cas client) ;
 *   · `result` reprend la formulation de la source. `quote` est la citation exacte, dans la
 *     langue de la source. `attribution` dit qui parle (l'éditeur, le client, la presse).
 *
 * Ajouter un cas : lire la source primaire en entier, renseigner `readOn` (date de lecture),
 * écrire les limites. Un cas sans source lisible n'entre pas dans ce fichier.
 */

export type MarketCaseFunction = 'support-sav' | 'finance-comptabilite' | 'rh';

export interface MarketCaseSource {
  /** Qui publie (éditeur, entreprise, média). */
  publisher: string;
  /** Nature du document, affichée telle quelle. */
  kind_fr: string;
  kind_en: string;
  url: string;
  /** Date de publication ISO si la source l'indique. */
  publishedOn?: string;
}

export interface MarketCase {
  id: string;
  fn: MarketCaseFunction;
  company: string;
  profile_fr: string;
  profile_en: string;
  automated_fr: string;
  automated_en: string;
  tool: string;
  /** Résultat annoncé, tel que la source le formule. */
  result_fr: string;
  result_en: string;
  /** Citation exacte de la source, dans sa langue d'origine. */
  quote: string;
  quoteLang: 'fr' | 'en';
  attribution_fr: string;
  attribution_en: string;
  limits_fr: string;
  limits_en: string;
  sources: MarketCaseSource[];
  /** Date de lecture de la ou des sources (ISO). */
  readOn: string;
}

/** Libellé obligatoire, posé par le composant sur CHAQUE cas. Ne pas reformuler. */
export const MARKET_CASE_LABEL = {
  fr: 'Cas documenté, non réalisé par Waimia',
  en: 'Documented case, not delivered by Waimia',
} as const;

export const MARKET_CASE_FUNCTION_LABEL: Record<MarketCaseFunction, { fr: string; en: string; href: string }> = {
  'support-sav': { fr: 'Support et SAV', en: 'Support and after-sales', href: '/cas-usages/support-sav' },
  'finance-comptabilite': { fr: 'Finance et comptabilité', en: 'Finance and accounting', href: '/cas-usages/finance-comptabilite' },
  rh: { fr: 'Ressources humaines', en: 'Human resources', href: '/cas-usages/rh' },
};

const READ_ON = '2026-10-05';

const VENDOR_CASE = { kind_fr: "étude de cas publiée par l'éditeur", kind_en: 'case study published by the vendor' };

export const MARKET_CASES: MarketCase[] = [
  // ───────────────────────────── Support et SAV ─────────────────────────────
  {
    id: 'uklash-gorgias',
    fn: 'support-sav',
    company: 'UKLASH',
    profile_fr: "Marque de cosmétiques vendue en ligne, Royaume-Uni, fondée en 2018. Effectif non précisé : la source parle d'une équipe de service client réduite.",
    profile_en: 'Online cosmetics brand, United Kingdom, founded in 2018. Headcount not stated: the source describes a lean customer service team.',
    automated_fr: "Les annulations d'abonnement, avec proposition de pause ou de report, les changements d'adresse avant expédition, les modifications de commande, les renvois et les remboursements, dans des limites fixées par la marque. Le client confirme chaque annulation avant exécution.",
    automated_en: 'Subscription cancellations, with a pause or skip offered instead, address changes before shipping, order edits, reships and refunds, within limits set by the brand. The customer confirms each cancellation before it runs.',
    tool: 'Gorgias AI Agent (Actions), Loop, Shopify',
    result_fr: "Sur les 60 jours suivant la mise en service des actions, 21 % des demandes d'annulation d'abonnement sont traitées de bout en bout par l'agent, avec confirmation du client. Environ 12 % de ces demandes se terminent par une pause ou un report plutôt que par une annulation.",
    result_en: 'In the 60 days after launching actions, 21% of subscription cancellation requests were resolved end to end by the agent, with customer confirmation. About 12% of those ended in a pause or skip rather than a cancellation.',
    quote: '21% of subscription cancellation requests resolved end-to-end by AI Agent, with customer confirmation',
    quoteLang: 'en',
    attribution_fr: "Selon l'éditeur Gorgias, qui vend l'outil décrit",
    attribution_en: 'According to the vendor Gorgias, which sells the tool described',
    limits_fr: "Quatre demandes d'annulation sur cinq passent donc encore par une personne. La source reconnaît que le premier déploiement, deux ans plus tôt, n'était pas assez fiable pour les sujets sensibles (abonnement, paiement, remboursement) et que la tenue à jour des consignes était une charge que l'équipe n'arrivait pas à absorber. Mesure sur 60 jours, sans date de publication affichée.",
    limits_en: 'Four cancellation requests out of five therefore still go through a person. The source admits the first rollout, two years earlier, was not reliable enough for sensitive topics (subscription, payment, refund) and that keeping instructions current was a load the team could not absorb. Measured over 60 days, no publication date shown.',
    sources: [{ publisher: 'Gorgias', ...VENDOR_CASE, url: 'https://www.gorgias.com/customers/uklash' }],
    readOn: READ_ON,
  },
  {
    id: 'cabau-gorgias',
    fn: 'support-sav',
    company: 'Cabau Lifestyle',
    profile_fr: "Marque néerlandaise de compléments alimentaires et de bien-être vendue en ligne. Petite équipe de service client : la source cite un seul agent humain.",
    profile_en: 'Dutch online supplements and wellness brand. Small customer service team: the source mentions a single human agent.',
    automated_fr: "Les questions répétitives avant et après l'achat (suivi de commande, composition des produits, associations possibles) et la réponse aux e-mails en dehors des heures de bureau.",
    automated_en: 'Repetitive pre- and post-purchase questions (order tracking, product ingredients, possible combinations) and email replies outside office hours.',
    tool: 'Gorgias AI Agent, Shopping Assistant',
    result_fr: "La satisfaction client mesurée passe de 4,3 à 4,6 en quatre mois, alors que le volume de demandes a triplé. L'éditeur annonce aussi 6 à 9 embauches évitées.",
    result_en: 'Measured customer satisfaction rose from 4.3 to 4.6 in four months while ticket volume tripled. The vendor also claims 6 to 9 hires avoided.',
    quote: '7% improvement in CSAT with AI Agent, from 4.3 to 4.6 within four months',
    quoteLang: 'en',
    attribution_fr: "Selon l'éditeur Gorgias, qui vend l'outil décrit",
    attribution_en: 'According to the vendor Gorgias, which sells the tool described',
    limits_fr: "Les « embauches évitées » sont une estimation, pas une mesure. Le contexte est exceptionnel : une émission diffusée sur Netflix a fait tripler les demandes. L'agent répond à des questions d'allergie et de santé ; la source se félicite qu'il renvoie vers un médecin, ce qui montre surtout que ce type de sujet demande des règles écrites et une relecture. Pas de date de publication affichée.",
    limits_en: "The 'hires avoided' figure is an estimate, not a measurement. The context is exceptional: a Netflix show tripled demand. The agent answers allergy and health questions; the source is pleased that it refers people to a doctor, which mostly shows this kind of topic needs written rules and review. No publication date shown.",
    sources: [{ publisher: 'Gorgias', ...VENDOR_CASE, url: 'https://www.gorgias.com/customers/cabau-lifestyle' }],
    readOn: READ_ON,
  },
  {
    id: 'bella-sante-tidio',
    fn: 'support-sav',
    company: 'Bella Santé',
    profile_fr: "Spa et centre de soins esthétiques de la région de Boston (États-Unis), ouvert en 1996. Effectif non précisé.",
    profile_en: 'Spa and med spa in the Greater Boston area (United States), open since 1996. Headcount not stated.',
    automated_fr: "Les questions courantes posées dans le chat du site (prestations, forfaits), en complément du centre d'appels. Le reste est transmis à une personne.",
    automated_en: "Routine questions asked in the website chat (services, packages), on top of the call centre. The rest is handed to a person.",
    tool: 'Tidio Lyro',
    result_fr: "Environ 75 % des questions posées dans le chat sont traitées automatiquement ; les autres conversations sont transférées à des opérateurs humains.",
    result_en: 'Around 75% of live chat questions are handled automatically; the remaining conversations are transferred to human operators.',
    quote: 'Around 75% of live chat questions are handled automatically',
    quoteLang: 'en',
    attribution_fr: "Selon l'éditeur Tidio, qui vend l'outil décrit",
    attribution_en: 'According to the vendor Tidio, which sells the tool described',
    limits_fr: "Le chiffre porte sur le chat du site, pas sur le centre d'appels, que l'entreprise a conservé. « Traité automatiquement » ne dit pas si le client a obtenu la bonne réponse : la source ne donne aucune mesure de satisfaction. Entreprise américaine, hors du cadre du RGPD.",
    limits_en: "The figure covers the website chat, not the call centre, which the company kept. 'Handled automatically' does not say whether the customer got the right answer: the source gives no satisfaction measure. US company, outside the GDPR framework.",
    sources: [{ publisher: 'Tidio', ...VENDOR_CASE, url: 'https://www.tidio.com/blog/bella-sante-case-study/', publishedOn: '2026-03-27' }],
    readOn: READ_ON,
  },
  {
    id: 'klarna-openai',
    fn: 'support-sav',
    company: 'Klarna',
    profile_fr: "Société suédoise de paiement fractionné. Grande entreprise : 150 millions de consommateurs selon son communiqué. Ce n'est pas une PME ; le cas est cité pour ce qu'il a appris au marché.",
    profile_en: 'Swedish buy now, pay later company. A large enterprise: 150 million consumers according to its press release. Not an SMB; the case is cited for what it taught the market.',
    automated_fr: "Le chat du service client : remboursements, retours, questions sur les paiements, dans 23 marchés.",
    automated_en: 'Customer service chat: refunds, returns, payment questions, across 23 markets.',
    tool: 'Assistant conçu avec OpenAI',
    result_fr: "Après un mois, l'assistant avait mené 2,3 millions de conversations, soit les deux tiers des échanges du chat du service client.",
    result_en: "After one month, the assistant had held 2.3 million conversations, two-thirds of Klarna's customer service chats.",
    quote: 'The AI assistant has had 2.3 million conversations, two-thirds of Klarna’s customer service chats',
    quoteLang: 'en',
    attribution_fr: "Selon Klarna, dans son communiqué du 27 février 2024",
    attribution_en: 'According to Klarna, in its press release of 27 February 2024',
    limits_fr: "En mai 2025, Klarna a annoncé recruter de nouveau des personnes pour son service client et vouloir que le client puisse toujours parler à un humain. Son dirigeant, cité par CX Dive d'après Bloomberg, reconnaît que le coût a trop pesé dans l'organisation et que la qualité en a souffert. L'assistant traite toujours les deux tiers des demandes : la leçon porte sur l'absence de recours humain, pas sur l'automatisation elle-même.",
    limits_en: "In May 2025, Klarna said it was again recruiting people for customer service and wanted customers to always be able to speak to a human. Its CEO, quoted by CX Dive from Bloomberg, admits cost weighed too heavily and quality suffered. The assistant still handles two-thirds of inquiries: the lesson is about the missing human fallback, not about automation itself.",
    sources: [
      {
        publisher: 'Klarna',
        kind_fr: "communiqué de presse de l'entreprise",
        kind_en: 'company press release',
        url: 'https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/',
        publishedOn: '2024-02-27',
      },
      {
        publisher: 'CX Dive',
        kind_fr: 'article de presse spécialisée',
        kind_en: 'trade press article',
        url: 'https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/',
        publishedOn: '2025-05-09',
      },
    ],
    readOn: READ_ON,
  },

  // ───────────────────────────── Finance et comptabilité ─────────────────────────────
  {
    id: 'asartis-dext',
    fn: 'finance-comptabilite',
    company: 'Asartis',
    profile_fr: "Cabinet d'expertise comptable basé à Angers. Plus de 140 collaborateurs et plus de 5 000 clients (TPE, PME, artisans, professions libérales).",
    profile_en: 'Accounting firm based in Angers, France. Over 140 staff and over 5,000 clients (small businesses, tradespeople, professionals).',
    automated_fr: "La collecte des pièces comptables auprès des clients et leur saisie, par reconnaissance automatique des données. Déploiement progressif en 2019, d'abord dans une agence pilote, puis dans tout le cabinet.",
    automated_en: 'Collecting accounting documents from clients and entering them, through automatic data recognition. Gradual rollout in 2019, first in a pilot office, then across the firm.',
    tool: 'Dext',
    result_fr: "Le temps consacré à la saisie comptable a baissé, avec jusqu'à 2 heures gagnées par mois et par client.",
    result_en: 'Time spent on accounting entry dropped, with up to 2 hours saved per month per client.',
    quote: 'jusqu’à 2 heures gagnées par mois et par client',
    quoteLang: 'fr',
    attribution_fr: "Selon l'éditeur Dext, qui vend l'outil décrit",
    attribution_en: 'According to the vendor Dext, which sells the tool described',
    limits_fr: "« Jusqu'à » désigne un maximum, pas une moyenne. Les pourcentages affichés en tête de la page (75 % de temps gagné sur la saisie, par exemple) sont présentés par l'éditeur comme des estimations tirées de l'ensemble de ses cabinets clients et figurent à l'identique sur ses autres études de cas : ils ne décrivent pas Asartis et ne sont pas repris ici. Pas de date de publication affichée.",
    limits_en: "'Up to' is a maximum, not an average. The percentages shown at the top of the page (75% time saved on entry, for example) are presented by the vendor as estimates drawn from all its client firms and appear identically on its other case studies: they do not describe Asartis and are not repeated here. No publication date shown.",
    sources: [{ publisher: 'Dext', ...VENDOR_CASE, url: 'https://dext.com/fr/ressources/cas-clients-temoignages/asartis' }],
    readOn: READ_ON,
  },
  {
    id: 'eurex-dext',
    fn: 'finance-comptabilite',
    company: 'Groupe Eurex',
    profile_fr: "Groupe d'expertise comptable, de conseil et d'audit : plus de 60 cabinets et 900 collaborateurs.",
    profile_en: 'Accounting, advisory and audit group: over 60 offices and 900 staff.',
    automated_fr: "La gestion des pièces comptables, de la collecte à l'affectation des écritures. Tests de plusieurs solutions en 2019, phase pilote dans 3 cabinets, puis déploiement progressif avec formation des équipes.",
    automated_en: 'Handling accounting documents, from collection to posting entries. Several tools tested in 2019, a pilot phase in 3 offices, then a gradual rollout with staff training.',
    tool: 'Dext',
    result_fr: "Un gain de temps immédiat constaté, sans chiffre. Plus de 200 collaborateurs utilisent l'outil au quotidien.",
    result_en: 'An immediate time saving observed, with no figure. Over 200 staff use the tool daily.',
    quote: 'Aujourd’hui, plus de 200 collaborateurs utilisent Dext au quotidien, et l’adoption continue de croître.',
    quoteLang: 'fr',
    attribution_fr: "Selon l'éditeur Dext, qui vend l'outil décrit",
    attribution_en: 'According to the vendor Dext, which sells the tool described',
    limits_fr: "Aucun gain mesuré n'est publié pour ce groupe. D'après les chiffres de la source, 200 utilisateurs sur 900 collaborateurs, soit moins d'un quart de l'effectif annoncé (calcul Waimia) : l'adoption prend des années, même avec un outil prêt à l'emploi. Pas de date de publication affichée.",
    limits_en: "No measured gain is published for this group. From the source's own figures, 200 users out of 900 staff is under a quarter of the stated headcount (Waimia's calculation): adoption takes years, even with an off-the-shelf tool. No publication date shown.",
    sources: [{ publisher: 'Dext', ...VENDOR_CASE, url: 'https://dext.com/fr/ressources/cas-clients-temoignages/eurex' }],
    readOn: READ_ON,
  },
  {
    id: 'envie-autonomie-lucca',
    fn: 'finance-comptabilite',
    company: 'Envie Autonomie',
    profile_fr: "Reconditionnement de matériel médical. 115 collaborateurs répartis dans 19 établissements en France.",
    profile_en: 'Medical equipment refurbishment. 115 staff across 19 sites in France.',
    automated_fr: "Le cycle des achats : demandes d'engagement de dépense avec circuit d'approbation, rapprochement avec la facture reçue, génération des écritures comptables et synchronisation avec le logiciel comptable sans ressaisie, paiement des fournisseurs par échéance.",
    automated_en: 'The purchasing cycle: spend requests with an approval flow, matching against the received invoice, generating accounting entries and syncing with the accounting software with no retyping, supplier payment by due date.',
    tool: 'Lucca Factures',
    result_fr: "Le responsable financier déclare avoir gagné 2 heures par semaine, réinvesties dans le contrôle de gestion.",
    result_en: 'The finance manager says he saved 2 hours a week, reinvested in management control.',
    quote: 'J’ai gagné 2 heures par semaine ce qui me permet de mettre en place du contrôle de gestion et donc de fournir à ma direction des meilleures informations.',
    quoteLang: 'fr',
    attribution_fr: "Cyril Moncus, responsable financier, cité par l'éditeur Lucca",
    attribution_en: 'Cyril Moncus, finance manager, quoted by the vendor Lucca',
    limits_fr: "C'est le témoignage d'une personne, pas une mesure. Étude de cas publiée par l'éditeur qui vend l'outil. Pas de date de publication affichée.",
    limits_en: "This is one person's testimony, not a measurement. Case study published by the vendor selling the tool. No publication date shown.",
    sources: [
      {
        publisher: 'Lucca',
        ...VENDOR_CASE,
        url: 'https://www.lucca.fr/cas-clients/envie-autonomie-simplifie-sa-gestion-des-factures-avec-cleemy-achats/',
      },
    ],
    readOn: READ_ON,
  },
  {
    id: 'murfy-spendesk',
    fn: 'finance-comptabilite',
    company: 'Murfy',
    profile_fr: "Réparation et reconditionnement d'électroménager, créée en 2018. Plus de 150 employés en juillet 2021 selon la source.",
    profile_en: 'Appliance repair and refurbishment, founded in 2018. Over 150 employees in July 2021 according to the source.',
    automated_fr: "Le traitement et le paiement des factures fournisseurs, les notes de frais, la collecte des justificatifs et l'export vers les experts-comptables externes. Mise en place en 2020, d'abord dans un seul service.",
    automated_en: 'Processing and paying supplier invoices, expense claims, receipt collection and export to the external accountants. Set up in 2020, first in a single department.',
    tool: 'Spendesk',
    result_fr: "Le responsable administratif et juridique déclare gagner 40 % de son temps de gestion et de contrôle.",
    result_en: 'The administrative and legal manager says the team saves 40% of its management and control time.',
    quote: 'L’interface est complète et nous permet de gagner 40% de notre temps en gestion et en contrôle !',
    quoteLang: 'fr',
    attribution_fr: "Doran Piazza, responsable administratif et juridique, cité par l'éditeur Spendesk",
    attribution_en: 'Doran Piazza, administrative and legal manager, quoted by the vendor Spendesk',
    limits_fr: "Le pourcentage est une déclaration, la source ne dit pas comment il a été mesuré. Le point de départ était très bas (justificatifs papier, paiements faits à la banque) : le gain vient d'abord de la dématérialisation. Situation décrite en 2021.",
    limits_en: 'The percentage is a statement; the source does not say how it was measured. The starting point was very low (paper receipts, payments made at the bank): the gain comes first from going paperless. Situation described in 2021.',
    sources: [{ publisher: 'Spendesk', ...VENDOR_CASE, url: 'https://www.spendesk.com/fr/customers/murfy/' }],
    readOn: READ_ON,
  },

  // ───────────────────────────── Ressources humaines ─────────────────────────────
  {
    id: 'le-roy-logistique-lucca',
    fn: 'rh',
    company: 'Le Roy Logistique',
    profile_fr: "Transport et logistique, siège à Rennes. 650 collaborateurs dans 22 agences.",
    profile_en: 'Transport and logistics, headquartered in Rennes, France. 650 staff across 22 branches.',
    automated_fr: "Les demandes de congés, l'envoi des bulletins de paie (650 documents imprimés, mis sous pli et postés auparavant), les entretiens annuels et le portail de documents du salarié.",
    automated_en: 'Leave requests, payslip delivery (650 documents printed, enveloped and posted before), annual reviews and the employee document portal.',
    tool: 'Lucca',
    result_fr: "Sur la seule dématérialisation des bulletins de paie, 6 jours de travail gagnés par an.",
    result_en: 'On payslip dematerialisation alone, 6 working days saved per year.',
    quote: 'À titre d’exemple, rien que sur la dématérialisation des bulletins de paie, on a gagné 6 jours de travail par an.',
    quoteLang: 'fr',
    attribution_fr: "Rachel Placé, service RH de Le Roy Logistique, citée par l'éditeur Lucca",
    attribution_en: 'Rachel Placé, HR at Le Roy Logistique, quoted by the vendor Lucca',
    limits_fr: "La source écrit elle-même que le gain de temps global est « difficilement mesurable ». La baisse du turnover est « observée », sans chiffre ni lien de cause établi. Pas de date de publication affichée.",
    limits_en: "The source itself writes that the overall time saving is 'hard to measure'. The drop in turnover is 'observed', with no figure and no established causal link. No publication date shown.",
    sources: [{ publisher: 'Lucca', ...VENDOR_CASE, url: 'https://www.lucca.fr/cas-clients/le-roy-logistique/' }],
    readOn: READ_ON,
  },
  {
    id: 'sipa-automobiles-lucca',
    fn: 'rh',
    company: 'SIPA Automobiles',
    profile_fr: "Distribution automobile dans le Grand Sud-Ouest : 25 concessions. 780 collaborateurs pour le groupe selon la source.",
    profile_en: 'Car dealerships in south-west France: 25 dealerships. 780 staff for the group according to the source.',
    automated_fr: "La gestion des absences, les entretiens (trames par population, relances) et le dossier du salarié, rempli par lui avant son arrivée. Auparavant, tout passait par des fichiers Excel. Déploiement en 2021.",
    automated_en: 'Absence management, reviews (templates per population, reminders) and the employee file, filled in by the employee before arrival. Previously everything ran on Excel files. Rolled out in 2021.',
    tool: 'Lucca',
    result_fr: "Environ 3 heures par mois gagnées pour une concession de 50 personnes sur la gestion des absences, soit deux jours par mois à l'échelle du groupe.",
    result_en: 'About 3 hours a month saved for a 50-person dealership on absence management, that is two days a month across the group.',
    quote: 'le gain de temps apporté pour une concession de 50 personnes est d’environ 3 heures par mois, soit deux jours de gagnés par mois à l’échelle du groupe',
    quoteLang: 'fr',
    attribution_fr: "Témoignage de l'entreprise, cité par l'éditeur Lucca",
    attribution_en: 'Company testimony, quoted by the vendor Lucca',
    limits_fr: "Estimation de l'entreprise, sans méthode de mesure publiée. Deux jours par mois pour plusieurs centaines de salariés : un gain réel, modeste, à comparer au coût de l'outil et du déploiement. Pas de date de publication affichée.",
    limits_en: 'A company estimate with no published measurement method. Two days a month for several hundred employees: a real, modest gain, to weigh against the cost of the tool and rollout. No publication date shown.',
    sources: [{ publisher: 'Lucca', ...VENDOR_CASE, url: 'https://www.lucca.fr/cas-clients/sipa-automobiles-gestion-rh-simplifiee/' }],
    readOn: READ_ON,
  },
  {
    id: 'claranet-heyteam',
    fn: 'rh',
    company: 'Claranet',
    profile_fr: "Services cloud, cybersécurité et infogérance. Plus de 650 collaborateurs.",
    profile_en: 'Cloud, cybersecurity and managed IT services. Over 650 staff.',
    automated_fr: "L'accueil et le départ des salariés : création automatique du dossier dans le SIRH (Cegid Talentsoft) par synchronisation, sans double saisie, génération et signature des contrats, avenants et pièces administratives.",
    automated_en: 'Onboarding and offboarding: automatic creation of the employee record in the HRIS (Cegid Talentsoft) by sync, with no double entry, generation and signature of contracts, amendments and administrative documents.',
    tool: 'HeyTeam, Cegid Talentsoft',
    result_fr: "30 minutes gagnées par accueil grâce à l'automatisation de la création du matricule, qui prenait 30 minutes à la main.",
    result_en: 'Thirty minutes saved per onboarding by automating the creation of the employee number, which took 30 minutes by hand.',
    quote: '30 minutes gagnées par onboarding grâce à l’automatisation du matricule',
    quoteLang: 'fr',
    attribution_fr: "Selon l'éditeur HeyTeam, qui vend l'outil décrit",
    attribution_en: 'According to the vendor HeyTeam, which sells the tool described',
    limits_fr: "Le gain chiffré est faible par accueil ; il ne compte que si les recrutements sont nombreux. Le projet a demandé une intégration par API et l'implication d'équipes data et informatique internes, ce qu'une PME n'a pas toujours. Pas de date de publication affichée.",
    limits_en: 'The measured gain per onboarding is small; it only matters with many hires. The project required an API integration and the involvement of in-house data and IT teams, which an SMB does not always have. No publication date shown.',
    sources: [{ publisher: 'HeyTeam', ...VENDOR_CASE, url: 'https://www.heyteam.com/clients/claranet-onboarding-automatise-et-securise' }],
    readOn: READ_ON,
  },
  {
    id: 'ibm-askhr',
    fn: 'rh',
    company: 'IBM',
    profile_fr: "Groupe informatique mondial. Ce n'est pas une PME ; le cas est cité parce qu'il est le plus documenté sur les réponses aux questions RH internes.",
    profile_en: 'Global IT group. Not an SMB; the case is cited because it is the best documented on answering internal HR questions.',
    automated_fr: "Les réponses aux questions RH courantes des salariés (bulletin de paie, congés, attestations d'emploi) et environ 80 tâches, avec un second niveau tenu par des conseillers humains pour les demandes complexes.",
    automated_en: 'Answers to routine employee HR questions (payslip, leave, employment letters) and about 80 tasks, with a second tier of human advisers for complex requests.',
    tool: 'AskHR, IBM watsonx Orchestrate',
    result_fr: "Un taux de confinement de 94 % pour les questions courantes, et 75 % de tickets de support en moins depuis 2016.",
    result_en: 'A 94% containment rate for common questions, and 75% fewer support tickets since 2016.',
    quote: 'AskHR a également atteint un taux de confinement de 94 % pour les questions courantes, ce qui a permis de réduire de 75 % le nombre de tickets de support émis depuis 2016',
    quoteLang: 'fr',
    attribution_fr: "Selon IBM, qui est à la fois l'utilisateur et le vendeur de l'outil",
    attribution_en: 'According to IBM, which is both the user and the seller of the tool',
    limits_fr: "IBM décrit son propre produit. Le résultat vient après six ans de mise au point, à une échelle sans rapport avec une PME. Un taux de confinement compte les demandes qui ne sont pas transmises à une personne ; il ne dit pas si la réponse était juste.",
    limits_en: "IBM describes its own product. The result comes after six years of refinement, at a scale unrelated to an SMB. A containment rate counts requests not handed to a person; it does not say whether the answer was right.",
    sources: [
      {
        publisher: 'IBM',
        kind_fr: "étude de cas publiée par l'entreprise",
        kind_en: 'case study published by the company',
        url: 'https://www.ibm.com/fr-fr/case-studies/ibm-human-resources-watsonx-orchestrate',
        publishedOn: '2025-09-09',
      },
    ],
    readOn: READ_ON,
  },
];

export function marketCasesFor(fn: string): MarketCase[] {
  return MARKET_CASES.filter((c) => c.fn === fn);
}
