// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var stringField = (name, label, options, _required = false) => ({
  type: "string",
  name,
  label,
  ...options ? { options } : {}
});
var textField = (name, label, _required = false) => ({
  type: "string",
  name,
  label,
  ui: { component: "textarea" }
});
var numberField = (name, label) => ({
  type: "number",
  name,
  label
});
var booleanField = (name, label) => ({
  type: "boolean",
  name,
  label
});
var stringList = (name, label) => ({
  type: "string",
  name,
  label,
  list: true
});
var objectField = (name, label, fields) => ({
  type: "object",
  name,
  label,
  fields
});
var objectList = (name, label, fields, defaultItem) => ({
  type: "object",
  name,
  label,
  list: true,
  fields,
  ui: {
    defaultItem,
    itemProps: (item) => ({
      label: typeof item.title_fr === "string" && item.title_fr || typeof item.label_fr === "string" && item.label_fr || typeof item.value === "string" && item.value || label
    })
  }
});
var ctaFields = () => [
  stringField("label_fr", "Libell\xE9 FR", void 0, true),
  stringField("label_en", "Libell\xE9 EN", void 0, true),
  stringField("href", "Lien", void 0, true),
  stringField("variant", "Variante", ["primary", "accent", "ghost", "ghost-dark", "terminal"]),
  numberField("mag", "Magn\xE9tisme")
];
var ctaDefault = {
  label_fr: "Nous contacter",
  label_en: "Contact us",
  href: "/contact",
  variant: "primary"
};
var metricFields = () => [
  stringField("value", "Valeur", void 0, true),
  stringField("label_fr", "Libell\xE9 FR", void 0, true),
  stringField("label_en", "Libell\xE9 EN", void 0, true),
  booleanField("emphasis", "Emphase")
];
var metricDefault = {
  value: "100%",
  label_fr: "Nouvelle m\xE9trique",
  label_en: "New metric",
  emphasis: false
};
var stepFields = () => [
  stringField("num", "Num\xE9ro", void 0, true),
  stringField("label_fr", "Libell\xE9 FR", void 0, true),
  stringField("label_en", "Libell\xE9 EN", void 0, true),
  textField("body_fr", "Corps FR", true),
  textField("body_en", "Corps EN", true),
  stringField("meta_fr", "Meta FR"),
  stringField("meta_en", "Meta EN"),
  stringField("duration_fr", "Dur\xE9e FR")
];
var stepDefault = {
  num: "01",
  label_fr: "Nouvelle \xE9tape",
  label_en: "New step",
  body_fr: "Description de l\u2019\xE9tape.",
  body_en: "Step description."
};
var template = (name, nameOverride, label, fields, defaultItem) => ({
  name,
  nameOverride,
  label,
  fields,
  ui: { defaultItem }
});
var sectionTemplates = [
  template(
    "hero_offer_detail",
    "hero-offer-detail",
    "Hero offre",
    [
      stringField("hero_variant", "Variante", ["equilibre", "showcase", "encadre"]),
      stringField("breadcrumb_label_fr", "Fil d\u2019Ariane FR"),
      stringField("breadcrumb_label_en", "Fil d\u2019Ariane EN"),
      stringField("breadcrumb_href", "Lien fil d\u2019Ariane"),
      stringField("tier_fr", "Niveau FR", void 0, true),
      stringField("tier_en", "Niveau EN", void 0, true),
      stringField("h1_fr", "Titre FR", void 0, true),
      stringField("h1_en", "Titre EN", void 0, true),
      textField("lead_fr", "Accroche FR", true),
      textField("lead_en", "Accroche EN", true),
      objectField("cta", "CTA", ctaFields()),
      stringField("meta_fr", "Meta FR"),
      stringField("meta_en", "Meta EN"),
      objectList(
        "tags",
        "Tags",
        [stringField("label_fr", "Libell\xE9 FR", void 0, true), stringField("label_en", "Libell\xE9 EN", void 0, true)],
        { label_fr: "Nouveau tag", label_en: "New tag" }
      )
    ],
    {
      tier_fr: "\xA7 NIVEAU",
      tier_en: "\xA7 LEVEL",
      h1_fr: "Nouvelle offre",
      h1_en: "New offer",
      lead_fr: "Accroche de l\u2019offre.",
      lead_en: "Offer lead.",
      cta: ctaDefault
    }
  ),
  template(
    "problem_statement",
    "problem-statement",
    "\xC9nonc\xE9 du probl\xE8me",
    [
      stringField("kicker_fr", "Kicker FR", void 0, true),
      stringField("kicker_en", "Kicker EN", void 0, true),
      textField("statement_fr", "\xC9nonc\xE9 FR", true),
      textField("statement_en", "\xC9nonc\xE9 EN", true),
      booleanField("dropcap", "Lettrine"),
      objectList(
        "stats",
        "Statistiques",
        metricFields().filter((field) => field.name !== "emphasis"),
        metricDefault
      )
    ],
    {
      kicker_fr: "\xA7 Le probl\xE8me",
      kicker_en: "\xA7 The problem",
      statement_fr: "D\xE9crivez le probl\xE8me.",
      statement_en: "Describe the problem.",
      dropcap: true,
      stats: []
    }
  ),
  template(
    "method_timeline",
    "method-timeline",
    "M\xE9thode",
    [
      stringField("kicker_fr", "Kicker FR"),
      stringField("kicker_en", "Kicker EN"),
      stringField("h2_fr", "Titre FR", void 0, true),
      stringField("h2_en", "Titre EN", void 0, true),
      textField("lede_fr", "Accroche FR"),
      textField("lede_en", "Accroche EN"),
      objectList("steps", "\xC9tapes", stepFields(), stepDefault)
    ],
    {
      h2_fr: "M\xE9thode",
      h2_en: "Method",
      steps: [stepDefault, { ...stepDefault, num: "02" }]
    }
  ),
  template(
    "deliverables_grid",
    "deliverables-grid",
    "Livrables",
    [
      stringField("kicker_fr", "Kicker FR", void 0, true),
      stringField("kicker_en", "Kicker EN", void 0, true),
      stringField("title_fr", "Titre FR", void 0, true),
      stringField("title_en", "Titre EN", void 0, true),
      textField("lead_fr", "Accroche FR"),
      textField("lead_en", "Accroche EN"),
      objectList(
        "items",
        "Livrables",
        [
          stringField("title_fr", "Titre FR", void 0, true),
          stringField("title_en", "Titre EN", void 0, true),
          textField("body_fr", "Corps FR", true),
          textField("body_en", "Corps EN", true),
          stringField("format_fr", "Format FR"),
          stringField("format_en", "Format EN"),
          stringField("duration_fr", "Dur\xE9e FR"),
          stringField("duration_en", "Dur\xE9e EN")
        ],
        {
          title_fr: "Nouveau livrable",
          title_en: "New deliverable",
          body_fr: "Description du livrable.",
          body_en: "Deliverable description."
        }
      )
    ],
    {
      kicker_fr: "\xA7 Livrables",
      kicker_en: "\xA7 Deliverables",
      title_fr: "Livrables",
      title_en: "Deliverables",
      items: []
    }
  ),
  template(
    "stat_block",
    "stat-block",
    "Bloc preuve",
    [
      stringField("h2_fr", "Titre FR"),
      stringField("h2_en", "Titre EN"),
      textField("lede_fr", "Accroche FR"),
      textField("lede_en", "Accroche EN"),
      textField("quote_fr", "Citation FR"),
      textField("quote_en", "Citation EN"),
      stringField("cite_fr", "Source FR"),
      stringField("cite_en", "Source EN"),
      objectList("metrics", "M\xE9triques", metricFields(), metricDefault),
      stringField("layout", "Disposition", ["grid-3", "grid-4", "rows-hairlines", "split-quote"])
    ],
    {
      h2_fr: "R\xE9sultats",
      h2_en: "Results",
      metrics: [metricDefault],
      layout: "grid-3"
    }
  ),
  template(
    "cta_final",
    "cta-final",
    "CTA final",
    [
      stringField("h2_fr", "Titre FR", void 0, true),
      stringField("h2_en", "Titre EN", void 0, true),
      textField("body_fr", "Corps FR"),
      textField("body_en", "Corps EN"),
      objectField("cta_primary", "CTA principal", ctaFields()),
      objectField("cta_secondary", "CTA secondaire", ctaFields()),
      stringField("chapter_num", "Num\xE9ro de chapitre"),
      stringField("chapter_title_fr", "Titre chapitre FR"),
      stringField("chapter_title_en", "Titre chapitre EN"),
      stringField("availability_fr", "Disponibilit\xE9 FR"),
      stringField("availability_en", "Disponibilit\xE9 EN"),
      stringField("reassurance_fr", "R\xE9assurance FR"),
      stringField("reassurance_en", "R\xE9assurance EN"),
      stringField("background", "Fond", ["paper", "paper-2", "ink", "accent"])
    ],
    {
      h2_fr: "Parlons de votre projet.",
      h2_en: "Let\u2019s discuss your project.",
      cta_primary: ctaDefault,
      background: "ink"
    }
  ),
  template(
    "hero_split",
    "hero-split",
    "Hero split",
    [
      stringField("kicker_fr", "Kicker FR"),
      stringField("kicker_en", "Kicker EN"),
      stringField("h1_fr", "Titre FR", void 0, true),
      stringField("h1_en", "Titre EN", void 0, true),
      textField("lede_fr", "Accroche FR", true),
      textField("lede_en", "Accroche EN", true),
      objectField("cta_primary", "CTA principal", ctaFields()),
      objectField("cta_secondary", "CTA secondaire", ctaFields()),
      stringField("meta_fr", "Meta FR"),
      stringField("meta_en", "Meta EN"),
      objectField("right_block", "Bloc droit", [
        stringField("kind", "Type", ["mini-map", "workflow-svg", "stats", "image", "mockup-terminal"])
      ])
    ],
    {
      h1_fr: "Nouvelle offre",
      h1_en: "New offer",
      lede_fr: "Accroche de l\u2019offre.",
      lede_en: "Offer lead.",
      cta_primary: ctaDefault
    }
  ),
  template(
    "proof_bar",
    "proof-bar",
    "Barre de preuves",
    [
      stringField("kicker_fr", "Kicker FR"),
      stringField("kicker_en", "Kicker EN"),
      objectList("metrics", "M\xE9triques", metricFields(), metricDefault),
      stringField("layout", "Disposition", ["horizontal", "vertical-stack"])
    ],
    {
      metrics: [metricDefault, { ...metricDefault, value: "2\xD7" }],
      layout: "horizontal"
    }
  )
];
var offres = {
  label: "Offres",
  name: "offres",
  path: "src/content/offres",
  format: "mdx",
  match: { exclude: "conseil" },
  ui: {
    router: ({ document }) => `/offres/${document._sys.filename}`
  },
  fields: [
    stringField("title_fr", "Titre FR", void 0, true),
    stringField("title_en", "Titre EN", void 0, true),
    textField("description_fr", "Description FR", true),
    textField("description_en", "Description EN", true),
    stringField("slug", "Slug", void 0, true),
    { type: "datetime", name: "publishedAt", label: "Date de publication", required: true },
    stringField("category", "Cat\xE9gorie", [
      "acquisition",
      "crm",
      "contenu-seo-geo",
      "productivite",
      "support",
      "pilotage",
      "data",
      "gouvernance"
    ]),
    stringList("tags", "Tags"),
    stringField("tier_fr", "Niveau FR"),
    stringField("tier_en", "Niveau EN"),
    stringField("tier_label_fr", "Libell\xE9 niveau FR"),
    stringField("tier_label_en", "Libell\xE9 niveau EN"),
    stringField("hero_title_html_fr", "Titre hero HTML FR"),
    stringField("hero_title_html_en", "Titre hero HTML EN"),
    stringField("meta_fr", "Meta FR"),
    stringField("meta_en", "Meta EN"),
    numberField("price_from_eur", "Prix minimum EUR"),
    numberField("price_to_eur", "Prix maximum EUR"),
    numberField("duration_min_weeks", "Dur\xE9e minimum semaines"),
    numberField("duration_max_weeks", "Dur\xE9e maximum semaines"),
    stringField("cta_label_fr", "CTA FR"),
    stringField("cta_label_en", "CTA EN"),
    stringField("cta_href", "Lien CTA"),
    textField("lead_fr", "Accroche FR"),
    textField("lead_en", "Accroche EN"),
    textField("problem_statement_fr", "Probl\xE8me FR"),
    textField("problem_statement_en", "Probl\xE8me EN"),
    objectList(
      "problem_annotations",
      "Annotations probl\xE8me",
      [
        stringField("value", "Valeur", void 0, true),
        stringField("label_fr", "Libell\xE9 FR", void 0, true),
        stringField("label_en", "Libell\xE9 EN", void 0, true)
      ],
      metricDefault
    ),
    textField("method_aside_fr", "Apart\xE9 m\xE9thode FR"),
    textField("method_aside_en", "Apart\xE9 m\xE9thode EN"),
    objectList("method_steps", "\xC9tapes m\xE9thode legacy", [...stepFields(), stringField("duration_en", "Dur\xE9e EN")], stepDefault),
    textField("deliverables_aside_fr", "Apart\xE9 livrables FR"),
    textField("deliverables_aside_en", "Apart\xE9 livrables EN"),
    objectList(
      "deliverable_items",
      "Livrables legacy",
      [
        stringField("title_fr", "Titre FR", void 0, true),
        stringField("title_en", "Titre EN", void 0, true),
        textField("body_fr", "Corps FR", true),
        textField("body_en", "Corps EN", true),
        stringField("tag", "Tag", void 0, true)
      ],
      {
        title_fr: "Nouveau livrable",
        title_en: "New deliverable",
        body_fr: "Description.",
        body_en: "Description.",
        tag: "DOC"
      }
    ),
    objectField("proof", "Preuve legacy", [
      textField("quote_fr", "Citation FR", true),
      textField("quote_en", "Citation EN", true),
      stringField("attribution", "Attribution", void 0, true),
      objectList("metrics", "M\xE9triques", metricFields().filter((field) => field.name !== "emphasis"), metricDefault)
    ]),
    stringField("cta_title_fr", "Titre CTA FR"),
    stringField("cta_title_en", "Titre CTA EN"),
    textField("cta_body_fr", "Corps CTA FR"),
    textField("cta_body_en", "Corps CTA EN"),
    objectList(
      "faq_fr",
      "FAQ FR",
      [stringField("q", "Question", void 0, true), textField("a", "R\xE9ponse", true)],
      { q: "Nouvelle question", a: "Nouvelle r\xE9ponse." }
    ),
    objectList(
      "faq_en",
      "FAQ EN",
      [stringField("q", "Question", void 0, true), textField("a", "R\xE9ponse", true)],
      { q: "New question", a: "New answer." }
    ),
    {
      type: "object",
      name: "sections",
      label: "Sections",
      list: true,
      templateKey: "type",
      templates: sectionTemplates,
      ui: { visualSelector: true }
    }
  ]
};
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [offres]
  }
});
export {
  config_default as default
};
