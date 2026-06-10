import { defineConfig, type Collection, type Template, type TinaField } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

const stringField = (
  name: string,
  label: string,
  options?: string[],
  _required = false,
): TinaField => ({
  type: 'string',
  name,
  label,
  ...(options ? { options } : {}),
});

const textField = (name: string, label: string, _required = false): TinaField => ({
  type: 'string',
  name,
  label,
  ui: { component: 'textarea' },
});

const numberField = (name: string, label: string): TinaField => ({
  type: 'number',
  name,
  label,
});

const booleanField = (name: string, label: string): TinaField => ({
  type: 'boolean',
  name,
  label,
});

const stringList = (name: string, label: string): TinaField => ({
  type: 'string',
  name,
  label,
  list: true,
});

const objectField = (name: string, label: string, fields: TinaField[]): TinaField => ({
  type: 'object',
  name,
  label,
  fields,
});

const objectList = (
  name: string,
  label: string,
  fields: TinaField[],
  defaultItem: Record<string, unknown>,
): TinaField => ({
  type: 'object',
  name,
  label,
  list: true,
  fields,
  ui: {
    defaultItem,
    itemProps: (item) => ({
      label:
        (typeof item.title_fr === 'string' && item.title_fr) ||
        (typeof item.label_fr === 'string' && item.label_fr) ||
        (typeof item.value === 'string' && item.value) ||
        label,
    }),
  },
});

const ctaFields = (): TinaField[] => [
  stringField('label_fr', 'Libellé FR', undefined, true),
  stringField('label_en', 'Libellé EN', undefined, true),
  stringField('href', 'Lien', undefined, true),
  stringField('variant', 'Variante', ['primary', 'accent', 'ghost', 'ghost-dark', 'terminal']),
  numberField('mag', 'Magnétisme'),
];

const ctaDefault = {
  label_fr: 'Nous contacter',
  label_en: 'Contact us',
  href: '/contact',
  variant: 'primary',
};

const metricFields = (): TinaField[] => [
  stringField('value', 'Valeur', undefined, true),
  stringField('label_fr', 'Libellé FR', undefined, true),
  stringField('label_en', 'Libellé EN', undefined, true),
  booleanField('emphasis', 'Emphase'),
];

const metricDefault = {
  value: '100%',
  label_fr: 'Nouvelle métrique',
  label_en: 'New metric',
  emphasis: false,
};

const stepFields = (): TinaField[] => [
  stringField('num', 'Numéro', undefined, true),
  stringField('label_fr', 'Libellé FR', undefined, true),
  stringField('label_en', 'Libellé EN', undefined, true),
  textField('body_fr', 'Corps FR', true),
  textField('body_en', 'Corps EN', true),
  stringField('meta_fr', 'Meta FR'),
  stringField('meta_en', 'Meta EN'),
  stringField('duration_fr', 'Durée FR'),
];

const stepDefault = {
  num: '01',
  label_fr: 'Nouvelle étape',
  label_en: 'New step',
  body_fr: 'Description de l’étape.',
  body_en: 'Step description.',
};

const template = (
  name: string,
  nameOverride: string,
  label: string,
  fields: TinaField[],
  defaultItem: Record<string, unknown>,
): Template => ({
  name,
  nameOverride,
  label,
  fields,
  ui: { defaultItem },
});

const sectionTemplates: Template[] = [
  template(
    'hero_offer_detail',
    'hero-offer-detail',
    'Hero offre',
    [
      stringField('hero_variant', 'Variante', ['equilibre', 'showcase', 'encadre']),
      stringField('breadcrumb_label_fr', 'Fil d’Ariane FR'),
      stringField('breadcrumb_label_en', 'Fil d’Ariane EN'),
      stringField('breadcrumb_href', 'Lien fil d’Ariane'),
      stringField('tier_fr', 'Niveau FR', undefined, true),
      stringField('tier_en', 'Niveau EN', undefined, true),
      stringField('h1_fr', 'Titre FR', undefined, true),
      stringField('h1_en', 'Titre EN', undefined, true),
      textField('lead_fr', 'Accroche FR', true),
      textField('lead_en', 'Accroche EN', true),
      objectField('cta', 'CTA', ctaFields()),
      stringField('meta_fr', 'Meta FR'),
      stringField('meta_en', 'Meta EN'),
      objectList(
        'tags',
        'Tags',
        [stringField('label_fr', 'Libellé FR', undefined, true), stringField('label_en', 'Libellé EN', undefined, true)],
        { label_fr: 'Nouveau tag', label_en: 'New tag' },
      ),
    ],
    {
      tier_fr: '§ NIVEAU',
      tier_en: '§ LEVEL',
      h1_fr: 'Nouvelle offre',
      h1_en: 'New offer',
      lead_fr: 'Accroche de l’offre.',
      lead_en: 'Offer lead.',
      cta: ctaDefault,
    },
  ),
  template(
    'problem_statement',
    'problem-statement',
    'Énoncé du problème',
    [
      stringField('kicker_fr', 'Kicker FR', undefined, true),
      stringField('kicker_en', 'Kicker EN', undefined, true),
      textField('statement_fr', 'Énoncé FR', true),
      textField('statement_en', 'Énoncé EN', true),
      booleanField('dropcap', 'Lettrine'),
      objectList(
        'stats',
        'Statistiques',
        metricFields().filter((field) => field.name !== 'emphasis'),
        metricDefault,
      ),
    ],
    {
      kicker_fr: '§ Le problème',
      kicker_en: '§ The problem',
      statement_fr: 'Décrivez le problème.',
      statement_en: 'Describe the problem.',
      dropcap: true,
      stats: [],
    },
  ),
  template(
    'method_timeline',
    'method-timeline',
    'Méthode',
    [
      stringField('kicker_fr', 'Kicker FR'),
      stringField('kicker_en', 'Kicker EN'),
      stringField('h2_fr', 'Titre FR', undefined, true),
      stringField('h2_en', 'Titre EN', undefined, true),
      textField('lede_fr', 'Accroche FR'),
      textField('lede_en', 'Accroche EN'),
      objectList('steps', 'Étapes', stepFields(), stepDefault),
    ],
    {
      h2_fr: 'Méthode',
      h2_en: 'Method',
      steps: [stepDefault, { ...stepDefault, num: '02' }],
    },
  ),
  template(
    'deliverables_grid',
    'deliverables-grid',
    'Livrables',
    [
      stringField('kicker_fr', 'Kicker FR', undefined, true),
      stringField('kicker_en', 'Kicker EN', undefined, true),
      stringField('title_fr', 'Titre FR', undefined, true),
      stringField('title_en', 'Titre EN', undefined, true),
      textField('lead_fr', 'Accroche FR'),
      textField('lead_en', 'Accroche EN'),
      objectList(
        'items',
        'Livrables',
        [
          stringField('title_fr', 'Titre FR', undefined, true),
          stringField('title_en', 'Titre EN', undefined, true),
          textField('body_fr', 'Corps FR', true),
          textField('body_en', 'Corps EN', true),
          stringField('format_fr', 'Format FR'),
          stringField('format_en', 'Format EN'),
          stringField('duration_fr', 'Durée FR'),
          stringField('duration_en', 'Durée EN'),
        ],
        {
          title_fr: 'Nouveau livrable',
          title_en: 'New deliverable',
          body_fr: 'Description du livrable.',
          body_en: 'Deliverable description.',
        },
      ),
    ],
    {
      kicker_fr: '§ Livrables',
      kicker_en: '§ Deliverables',
      title_fr: 'Livrables',
      title_en: 'Deliverables',
      items: [],
    },
  ),
  template(
    'stat_block',
    'stat-block',
    'Bloc preuve',
    [
      stringField('h2_fr', 'Titre FR'),
      stringField('h2_en', 'Titre EN'),
      textField('lede_fr', 'Accroche FR'),
      textField('lede_en', 'Accroche EN'),
      textField('quote_fr', 'Citation FR'),
      textField('quote_en', 'Citation EN'),
      stringField('cite_fr', 'Source FR'),
      stringField('cite_en', 'Source EN'),
      objectList('metrics', 'Métriques', metricFields(), metricDefault),
      stringField('layout', 'Disposition', ['grid-3', 'grid-4', 'rows-hairlines', 'split-quote']),
    ],
    {
      h2_fr: 'Résultats',
      h2_en: 'Results',
      metrics: [metricDefault],
      layout: 'grid-3',
    },
  ),
  template(
    'cta_final',
    'cta-final',
    'CTA final',
    [
      stringField('h2_fr', 'Titre FR', undefined, true),
      stringField('h2_en', 'Titre EN', undefined, true),
      textField('body_fr', 'Corps FR'),
      textField('body_en', 'Corps EN'),
      objectField('cta_primary', 'CTA principal', ctaFields()),
      objectField('cta_secondary', 'CTA secondaire', ctaFields()),
      stringField('chapter_num', 'Numéro de chapitre'),
      stringField('chapter_title_fr', 'Titre chapitre FR'),
      stringField('chapter_title_en', 'Titre chapitre EN'),
      stringField('availability_fr', 'Disponibilité FR'),
      stringField('availability_en', 'Disponibilité EN'),
      stringField('reassurance_fr', 'Réassurance FR'),
      stringField('reassurance_en', 'Réassurance EN'),
      stringField('background', 'Fond', ['paper', 'paper-2', 'ink', 'accent']),
    ],
    {
      h2_fr: 'Parlons de votre projet.',
      h2_en: 'Let’s discuss your project.',
      cta_primary: ctaDefault,
      background: 'ink',
    },
  ),
  template(
    'hero_split',
    'hero-split',
    'Hero split',
    [
      stringField('kicker_fr', 'Kicker FR'),
      stringField('kicker_en', 'Kicker EN'),
      stringField('h1_fr', 'Titre FR', undefined, true),
      stringField('h1_en', 'Titre EN', undefined, true),
      textField('lede_fr', 'Accroche FR', true),
      textField('lede_en', 'Accroche EN', true),
      objectField('cta_primary', 'CTA principal', ctaFields()),
      objectField('cta_secondary', 'CTA secondaire', ctaFields()),
      stringField('meta_fr', 'Meta FR'),
      stringField('meta_en', 'Meta EN'),
      objectField('right_block', 'Bloc droit', [
        stringField('kind', 'Type', ['mini-map', 'workflow-svg', 'stats', 'image', 'mockup-terminal']),
      ]),
    ],
    {
      h1_fr: 'Nouvelle offre',
      h1_en: 'New offer',
      lede_fr: 'Accroche de l’offre.',
      lede_en: 'Offer lead.',
      cta_primary: ctaDefault,
    },
  ),
  template(
    'proof_bar',
    'proof-bar',
    'Barre de preuves',
    [
      stringField('kicker_fr', 'Kicker FR'),
      stringField('kicker_en', 'Kicker EN'),
      objectList('metrics', 'Métriques', metricFields(), metricDefault),
      stringField('layout', 'Disposition', ['horizontal', 'vertical-stack']),
    ],
    {
      metrics: [metricDefault, { ...metricDefault, value: '2×' }],
      layout: 'horizontal',
    },
  ),
];

const offres: Collection = {
  label: 'Offres',
  name: 'offres',
  path: 'src/content/offres',
  format: 'mdx',
  match: { exclude: 'conseil' },
  ui: {
    router: ({ document }) => `/offres/${document._sys.filename}`,
  },
  fields: [
    stringField('title_fr', 'Titre FR', undefined, true),
    stringField('title_en', 'Titre EN', undefined, true),
    textField('description_fr', 'Description FR', true),
    textField('description_en', 'Description EN', true),
    stringField('slug', 'Slug', undefined, true),
    { type: 'datetime', name: 'publishedAt', label: 'Date de publication', required: true },
    stringField('category', 'Catégorie', [
      'acquisition',
      'crm',
      'contenu-seo-geo',
      'productivite',
      'support',
      'pilotage',
      'data',
      'gouvernance',
    ]),
    stringList('tags', 'Tags'),
    stringField('tier_fr', 'Niveau FR'),
    stringField('tier_en', 'Niveau EN'),
    stringField('tier_label_fr', 'Libellé niveau FR'),
    stringField('tier_label_en', 'Libellé niveau EN'),
    stringField('hero_title_html_fr', 'Titre hero HTML FR'),
    stringField('hero_title_html_en', 'Titre hero HTML EN'),
    stringField('meta_fr', 'Meta FR'),
    stringField('meta_en', 'Meta EN'),
    numberField('price_from_eur', 'Prix minimum EUR'),
    numberField('price_to_eur', 'Prix maximum EUR'),
    numberField('duration_min_weeks', 'Durée minimum semaines'),
    numberField('duration_max_weeks', 'Durée maximum semaines'),
    stringField('cta_label_fr', 'CTA FR'),
    stringField('cta_label_en', 'CTA EN'),
    stringField('cta_href', 'Lien CTA'),
    textField('lead_fr', 'Accroche FR'),
    textField('lead_en', 'Accroche EN'),
    textField('problem_statement_fr', 'Problème FR'),
    textField('problem_statement_en', 'Problème EN'),
    objectList(
      'problem_annotations',
      'Annotations problème',
      [
        stringField('value', 'Valeur', undefined, true),
        stringField('label_fr', 'Libellé FR', undefined, true),
        stringField('label_en', 'Libellé EN', undefined, true),
      ],
      metricDefault,
    ),
    textField('method_aside_fr', 'Aparté méthode FR'),
    textField('method_aside_en', 'Aparté méthode EN'),
    objectList('method_steps', 'Étapes méthode legacy', [...stepFields(), stringField('duration_en', 'Durée EN')], stepDefault),
    textField('deliverables_aside_fr', 'Aparté livrables FR'),
    textField('deliverables_aside_en', 'Aparté livrables EN'),
    objectList(
      'deliverable_items',
      'Livrables legacy',
      [
        stringField('title_fr', 'Titre FR', undefined, true),
        stringField('title_en', 'Titre EN', undefined, true),
        textField('body_fr', 'Corps FR', true),
        textField('body_en', 'Corps EN', true),
        stringField('tag', 'Tag', undefined, true),
      ],
      {
        title_fr: 'Nouveau livrable',
        title_en: 'New deliverable',
        body_fr: 'Description.',
        body_en: 'Description.',
        tag: 'DOC',
      },
    ),
    objectField('proof', 'Preuve legacy', [
      textField('quote_fr', 'Citation FR', true),
      textField('quote_en', 'Citation EN', true),
      stringField('attribution', 'Attribution', undefined, true),
      objectList('metrics', 'Métriques', metricFields().filter((field) => field.name !== 'emphasis'), metricDefault),
    ]),
    stringField('cta_title_fr', 'Titre CTA FR'),
    stringField('cta_title_en', 'Titre CTA EN'),
    textField('cta_body_fr', 'Corps CTA FR'),
    textField('cta_body_en', 'Corps CTA EN'),
    objectList(
      'faq_fr',
      'FAQ FR',
      [stringField('q', 'Question', undefined, true), textField('a', 'Réponse', true)],
      { q: 'Nouvelle question', a: 'Nouvelle réponse.' },
    ),
    objectList(
      'faq_en',
      'FAQ EN',
      [stringField('q', 'Question', undefined, true), textField('a', 'Réponse', true)],
      { q: 'New question', a: 'New answer.' },
    ),
    {
      type: 'object',
      name: 'sections',
      label: 'Sections',
      list: true,
      templateKey: 'type',
      templates: sectionTemplates,
      ui: { visualSelector: true },
    },
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [offres],
  },
});
