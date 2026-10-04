// Modèle de charte IA pour PME · texte source (unique) de la page
// /ressources/outils/charte-ia-entreprise, du PDF et de l'export Word.
//
// Les jetons {{cle}} sont des champs à personnaliser : la page les remplace en direct par
// les valeurs saisies (organism CharterDocument). Sans saisie, le libellé entre crochets
// reste affiché, y compris dans le PDF statique.
//
// Ce texte est un MODÈLE de règles internes, pas un avis juridique. Il ne cite aucun
// fait sur un produit tiers. La seule référence réglementaire datée (article 4 du
// règlement européen sur l'IA) est sourcée dans `sources`.

export const charterVars = [
  { key: 'entreprise', label: "Nom de l'entreprise", placeholder: "Nom de l'entreprise" },
  { key: 'referent', label: 'Référent IA (nom ou fonction)', placeholder: 'Nom ou fonction du référent IA' },
  { key: 'outils', label: "Outils d'IA autorisés", placeholder: 'Liste des outils autorisés' },
  { key: 'contact', label: 'Adresse pour signaler un incident', placeholder: 'adresse e-mail de signalement' },
  { key: 'date', label: "Date d'entrée en vigueur", placeholder: "date d'entrée en vigueur" },
] as const;

export interface CharterArticle {
  title: string;
  intro?: string;
  rules: string[];
  /** Ce que l'entreprise doit décider avant de diffuser l'article. */
  adapt: string;
}

export const charterTitle = "Charte d'utilisation de l'intelligence artificielle";

export const charterPreamble =
  "{{entreprise}} autorise et encourage l'usage d'outils d'intelligence artificielle quand ils font gagner du temps sans exposer l'entreprise, ses clients ou ses salariés. Cette charte fixe les règles communes. Elle s'applique à toute personne qui travaille pour {{entreprise}} : salariés, alternants, stagiaires, prestataires. Elle entre en vigueur le {{date}}.";

export const charterArticles: CharterArticle[] = [
  {
    title: 'Champ d\'application',
    rules: [
      "La charte couvre tout outil qui génère du texte, du code, des images, du son ou des décisions à partir d'une instruction : assistants conversationnels, fonctions d'IA intégrées aux logiciels de bureautique, de messagerie, de CRM ou de comptabilité, agents qui agissent dans les outils de l'entreprise.",
      "Elle s'applique quel que soit l'appareil utilisé, y compris un téléphone ou un ordinateur personnel dès lors qu'il sert à une tâche professionnelle.",
      "Elle complète le règlement intérieur, la charte informatique et les engagements de confidentialité déjà signés. En cas de contradiction, la règle la plus stricte s'applique.",
    ],
    adapt: "Vérifiez que votre charte informatique existe et qu'elle est à jour : cette charte IA s'y adosse, elle ne la remplace pas.",
  },
  {
    title: 'Outils autorisés',
    rules: [
      "Seuls les outils suivants sont autorisés pour un usage professionnel : {{outils}}.",
      "Ces outils sont utilisés avec le compte fourni par l'entreprise. Les comptes personnels et les versions gratuites grand public ne sont pas utilisés pour le travail.",
      "Tout nouvel outil, y compris une extension de navigateur ou une fonction d'IA activée dans un logiciel existant, est soumis à {{referent}} avant usage. La réponse est donnée sous cinq jours ouvrés.",
      "La liste des outils autorisés est tenue à jour par {{referent}} et accessible à tous.",
    ],
    adapt: "Listez les outils avec leur niveau d'abonnement. Avant d'en autoriser un, lisez ses conditions sur trois points : où les données sont hébergées, si elles servent à entraîner les modèles, combien de temps elles sont conservées.",
  },
  {
    title: "Données qui ne passent jamais par un outil d'IA",
    intro: "Quel que soit l'outil, y compris autorisé, les informations suivantes ne sont ni saisies, ni collées, ni téléversées :",
    rules: [
      "Les données de santé, les données bancaires, les numéros de sécurité sociale, les pièces d'identité.",
      "Les données personnelles de salariés ou de candidats : dossiers RH, évaluations, bulletins de paie, CV nominatifs.",
      "Les mots de passe, clés d'API, jetons d'accès et tout secret technique.",
      "Les contrats, offres commerciales et documents couverts par un accord de confidentialité avec un client ou un fournisseur, sauf accord écrit de ce dernier.",
      "Les informations financières non publiées de l'entreprise.",
    ],
    adapt: "Ajoutez vos catégories sensibles propres (plans, formules, fichiers clients, données de patients). Pour les autres données personnelles, la règle par défaut : anonymiser avant de saisir (remplacer les noms par des rôles, retirer adresses et numéros).",
  },
  {
    title: "Ce qui sort d'une IA est un brouillon",
    rules: [
      "Un contenu généré par une IA est relu en entier par la personne qui l'utilise avant d'être envoyé, publié ou intégré à un document. Cette personne en reste l'auteur responsable.",
      "Les chiffres, les dates, les citations, les références juridiques et les noms propres sont vérifiés à la source. Une IA peut produire une information fausse avec assurance.",
      "Un contenu généré n'est jamais envoyé à un client sous forme de copier-coller non relu.",
      "Aucune décision concernant une personne (recrutement, évaluation, sanction, attribution d'un crédit ou d'une remise) n'est prise sur la seule base d'une réponse d'IA.",
    ],
    adapt: "Désignez les documents pour lesquels une double relecture est exigée (devis, contrats, communications officielles).",
  },
  {
    title: 'Agents et automatisations',
    intro: "Quand une IA ne se contente pas de répondre mais agit dans les outils de l'entreprise (envoyer un message, modifier une fiche, créer une facture) :",
    rules: [
      "Chaque automatisation a un responsable nommé, qui connaît ce qu'elle fait et sait l'arrêter.",
      "Les actions sensibles sont validées par un humain avant exécution : envoi à un client, engagement financier, suppression de données, modification de droits d'accès.",
      "Les actions exécutées sont journalisées et le journal est consultable par le responsable.",
      "Une automatisation ne reçoit que les accès strictement nécessaires à sa tâche.",
    ],
    adapt: "Dressez la liste de vos automatisations en service, avec leur responsable et les actions qui exigent une validation. Si vous n'en avez aucune, gardez l'article : il s'appliquera à la première.",
  },
  {
    title: 'Transparence',
    rules: [
      "Un client, un candidat ou un partenaire qui échange avec un assistant automatisé en est informé dès le début de l'échange.",
      "Les images, sons ou vidéos générés ou modifiés par une IA et diffusés à l'extérieur sont signalés comme tels.",
      "En interne, on ne présente pas comme un travail entièrement personnel un livrable produit pour l'essentiel par une IA.",
    ],
    adapt: "Rédigez la phrase d'information affichée par vos assistants (site, messagerie, téléphone) et l'endroit où elle apparaît.",
  },
  {
    title: 'Propriété intellectuelle',
    rules: [
      "On ne demande pas à une IA de reproduire une œuvre protégée, une marque ou le style identifiable d'un auteur vivant pour un usage commercial.",
      "Le code généré est relu avant intégration, et son origine est signalée lors de la revue de code.",
      "Les contenus de tiers (documents clients, études payantes, bases de données sous licence) ne sont pas téléversés dans un outil d'IA sans vérifier que la licence le permet.",
    ],
    adapt: "Si vous livrez des créations à vos clients (textes, visuels, code), précisez dans vos contrats la part d'assistance par IA et qui détient les droits.",
  },
  {
    title: 'Formation et référent',
    rules: [
      "{{referent}} est le référent IA de {{entreprise}} : il tient la liste des outils autorisés, répond aux questions d'usage et reçoit les signalements.",
      "Toute personne qui utilise un outil d'IA dans son travail suit une formation initiale : fonctionnement et limites des outils, règles de cette charte, cas pratiques de son métier.",
      "Un rappel a lieu au moins une fois par an, et à chaque nouvel outil autorisé.",
    ],
    adapt: "Fixez le format de la formation (durée, qui l'anime) et gardez une trace des personnes formées : c'est ce qui permet de montrer que l'obligation de l'article 4 du règlement européen sur l'IA est prise au sérieux.",
  },
  {
    title: 'Incidents et révision',
    rules: [
      "Toute saisie par erreur d'une donnée interdite, toute réponse d'IA ayant conduit à une erreur envoyée à l'extérieur, tout comportement anormal d'une automatisation est signalé sans délai à {{contact}}.",
      "Un signalement fait de bonne foi n'entraîne pas de sanction. L'absence de signalement d'un incident connu peut en entraîner.",
      "Si l'incident concerne des données personnelles, {{referent}} prévient la personne en charge de la protection des données, qui évalue s'il faut notifier la CNIL.",
      "La charte est relue au moins une fois par an, et à chaque changement d'outil ou de réglementation. La version en vigueur est datée et accessible à tous.",
    ],
    adapt: "Indiquez qui est en charge de la protection des données chez vous (DPO ou dirigeant) et comment la charte est portée à la connaissance des équipes (annexe au règlement intérieur, signature, affichage).",
  },
];

export const charterClosing =
  "Version du {{date}}. Charte établie par {{entreprise}} à partir du modèle publié par Waimia (waimia.com), librement réutilisable et modifiable.";

export const charterSources = [
  {
    label: "Commission européenne, « Maîtrise de l'IA : questions et réponses » (article 4 du règlement (UE) 2024/1689, en application depuis le 2 février 2025)",
    href: 'https://digital-strategy.ec.europa.eu/fr/faqs/ai-literacy-questions-answers',
    checked: 'vérifié le 4 octobre 2026',
  },
];
