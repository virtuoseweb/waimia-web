// Waimia · site.config.ts · SOURCE UNIQUE de l'identité de marque (fondation forkabilité)
//
// Fiche 0027 D4 : ce fichier TS versionné est la source de vérité de la marque.
// Les variables d'environnement (.env) restent réservées aux SECRETS et à la
// config runtime (clés API, tokens). Tout ce qui identifie la marque (URL, nom,
// coordonnées, réseaux) vit ICI pour qu'un fork ne modifie qu'un seul fichier.
//
// Règle : ne jamais réintroduire un littéral `https://waimia.com` ni « Waimia »
// dans le code applicatif. Importer `SITE` et dériver.
//
// ⚠️ Les valeurs ci-dessous sont EXACTEMENT celles précédemment en dur dans le
// code (src/lib/seo.ts, src/lib/seo/schema-builder.ts, src/layouts/Base.astro,
// .env.example). Le rendu ne doit pas changer d'un octet lors du câblage.

export const SITE = {
  /** URL canonique de production (sans slash final). */
  url: 'https://waimia.com',
  /** Nom de marque public (H1, watermark OG, JSON-LD `name`). */
  name: 'Waimia',
  /** Raison sociale légale (JSON-LD `legalName` / `alternateName`). */
  legalName: 'VirtuoseWeb',
  /** Email de contact public (JSON-LD Organization `email`). */
  email: 'bonjour@waimia.com',
  /** Expéditeur transactionnel par défaut (env `EMAIL_FROM` prime au runtime). */
  emailFrom: 'Waimia <hello@waimia.com>',
  /** Téléphone format lisible international (JSON-LD Organization `telephone`). */
  tel: '+33 6 20 61 56 93',
  /** Téléphone format E.164 (JSON-LD LocalBusiness `telephone`). */
  telE164: '+33620615693',
  /** Numéro de TVA intracommunautaire (JSON-LD `vatID`). */
  vatID: 'FR07890426307',
  /** Date de fondation ISO (JSON-LD `foundingDate`). */
  foundingDate: '2020-10-15',
  /** Adresse postale (JSON-LD PostalAddress). */
  streetAddress: '537 Rue du Pré aux Clercs',
  postalCode: '34090',
  city: 'Montpellier',
  region: 'Occitanie',
  country: 'FR',
  /** Couleur thème navigateur (`<meta name="theme-color">`, défaut Base.astro). */
  themeColor: '#F6F1E8',
  /** Profils sociaux (JSON-LD `sameAs`). */
  sameAs: [
    'https://www.linkedin.com/company/waimia',
    'https://share.google/nmlHLC5wQak9TWRPl',
  ],
  /** Raccourci LinkedIn (premier `sameAs`). */
  linkedin: 'https://www.linkedin.com/company/waimia',
  /** Cal.com · défauts de réservation (cf .env.example PUBLIC_CAL_*). */
  cal: {
    username: 'simonberos',
    event: 'audit',
    namespace: 'audit',
  },
} as const;

export type SiteConfig = typeof SITE;
