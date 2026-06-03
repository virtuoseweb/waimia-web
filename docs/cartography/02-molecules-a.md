# 02 — Molécules A→P (14)

> Inventaire exhaustif · première moitié du répertoire `src/components/ui/molecules/`.
> Méthode : lecture intégrale de chaque fichier + grep consumers réels.
> Seule écriture : ce fichier. Aucun composant modifié.

---

### AsymmetricServiceRow

- file: `src/components/ui/molecules/AsymmetricServiceRow.astro`
- role: Row de service alternant gauche/droite en grille 4 colonnes (num · name · body · arrow), signature visuelle de la page /manifesto Acte II.
- props: `{ num: string; label: string; body: string; reverse?: boolean; class?: string }`
- css_vars: var(--hairline), var(--accent), var(--font-display), var(--muted), var(--ease)
- css_classes: .u-asym-svc-row, .u-asym-num, .u-asym-name, .u-asym-body, .u-asym-body-r, .u-asym-name-r, .u-asym-num-r (+ :global .u-asym-arr, .u-asym-arr-l)
- consumers: src/components/ui/molecules/ServiceCatalogRow.astro, src/pages/agence/design-system.astro, src/pages/manifesto.astro, src/pages/en/manifesto.astro (4)
- status: unique
- notes: Bonne composition (délègue la flèche à l'atom Kicker). Le breakpoint @900px collapse vers 1 colonne et masque les flèches — robuste mobile. Présent dans ServiceCatalogRow (probablement une surcouche), à vérifier si redondance. Candidat section-catalog.

---

### AuthorByline

- file: `src/components/ui/molecules/AuthorByline.astro`
- role: Byline de tête d'article — photo + nom (lien profil) + date localisée + reading time, avec fallback gracieux si auteur introuvable.
- props: `{ authorSlug?: string; date?: Date | string; readingTime?: string }`
- css_vars: var(--font-mono), var(--muted), var(--font-display), var(--ink), var(--accent), var(--ease)
- css_classes: .byline, .byline-photo-link, .byline-photo, .byline-meta, .byline-name, .byline-info, .byline-anon
- consumers: src/pages/ressources/livres-blancs/[...slug].astro, src/pages/cas/[...slug].astro, src/pages/en/cas/[...slug].astro, src/pages/agence/design-system.astro, src/pages/en/ressources/blog/[...slug].astro, src/pages/ressources/cookbooks/[...slug].astro, src/pages/ressources/blog/[...slug].astro, src/pages/ressources/veille-ia/[...slug].astro (8)
- status: unique
- notes: Molécule la plus réutilisée des content pages (8 consumers). Fetch Astro content côté serveur (`getEntry`), lien `/equipe/<id>` hardcodé FR — risque si EN. Différente d'AuthorCard (byline compact vs carte prose). Bonne DA, pas de redondance détectée.

---

### AuthorCard

- file: `src/components/ui/molecules/AuthorCard.astro`
- role: Carte auteur en deux variantes — `mini` (inline avatar + nom + rôle) et `full` (aside avec photo 80px + bio + social links).
- props: `{ authorSlug?: string; variant?: 'mini' | 'full' }`
- css_vars: var(--space-3), var(--space-5), var(--ink), var(--muted), var(--font-display), var(--font-mono), var(--paper-2), var(--accent)
- css_classes: .acard-mini, .acard-mini-photo, .acard-mini-name, .acard-mini-role, .acard-full, .acard-full-header, .acard-full-photo-link, .acard-full-photo, .acard-full-kicker, .acard-full-name, .acard-full-role, .acard-full-bio, .acard-full-social, .acard-full-cta
- consumers: src/components/templates/EssayTemplate.astro, src/pages/cas/[...slug].astro, src/pages/agence/design-system.astro, src/pages/ressources/livres-blancs/[...slug].astro, src/pages/en/cas/[...slug].astro (5)
- status: unique
- notes: `--paper-2` valeur hardcodée `#EFEBE2` dans le style (risque dérive token). Lien `/equipe/<id>` FR-only (idem AuthorByline). Les deux composants auteur (AuthorByline + AuthorCard) coexistent légitimement : rôles distincts (byline top vs aside fin d'article). Variante `mini` peu exploitée (pas vue en prod hors design-system).

---

### Breadcrumb

- file: `src/components/ui/molecules/Breadcrumb.astro`
- role: Fil d'Ariane accessible avec JSON-LD BreadcrumbList intégré, support aria-current, séparateurs `/`, hover accent.
- props: `{ items: { label: string; href?: string; current?: boolean }[]; lang?: 'fr' | 'en'; noJsonLd?: boolean }`
- css_vars: var(--font-mono), var(--muted), var(--space-4), var(--accent), var(--ease), var(--ink), var(--hairline-strong)
- css_classes: .breadcrumb, .sep
- consumers: src/components/sections/HeroAuthor.astro, src/components/sections/HeroOfferDetail.astro, src/components/templates/SolutionsDetailTemplate.astro, src/components/templates/TechnologiesDetailTemplate.astro, src/components/templates/CourseDetailTemplate.astro, src/components/templates/UtilityTemplate.astro, src/components/templates/AuthorPageTemplate.astro, src/components/templates/LeadMagnetTemplate.astro, src/components/templates/ConversionFunnelTemplate.astro, src/components/templates/OffresDetailTemplate.astro, src/components/templates/EssayTemplate.astro, src/components/templates/TrustLegalTemplate.astro, src/lib/seo/schema-builder.ts, src/components/templates/CaseStudyTemplate.astro, src/components/templates/HubTemplate.astro, src/pages/manifesto.astro, src/lib/seo.ts, src/pages/glossaire/[slug].astro, src/pages/commerce/[type]/[slug].astro, src/pages/offres/site-web-ia-landing.astro, src/pages/offres/index.astro, src/pages/agence/design-system.astro, src/pages/integrations/[slug].astro, src/pages/equipe/index.astro, src/pages/comparer/[slug].astro, src/pages/ressources/silo/[...slug].astro, src/pages/ressources/testimonials/index.astro, src/pages/ressources/testimonials/[slug].astro, src/pages/ressources/field-notes/[slug].astro, src/pages/ressources/personas/index.astro, src/pages/ressources/categorie/[...slug].astro, src/pages/ressources/personas/[slug].astro, src/pages/ressources/field-notes/index.astro, src/pages/ressources/tag/[...slug].astro, src/pages/en/offres/index.astro, src/pages/en/integrations/[slug].astro, src/pages/en/comparer/[slug].astro (37)
- status: unique
- notes: MOLÉCULE LA PLUS RÉUTILISÉE DU REPO (37 consumers). Infrastructure critique SEO (JSON-LD). URL `https://waimia.com` hardcodée dans le JSON-LD — ok pour SSG mono-domaine. Focus-visible correct (outline + border-radius). Aucun candidat fusion/suppression — indispensable.

---

### CalEmbed

- file: `src/components/ui/molecules/CalEmbed.astro`
- role: Widget Cal.com booking inline via island React `@calcom/embed-react`, configurable par env vars ou props, avec trim défensif des slugs.
- props: `{ username?: string; eventType?: string; namespace?: string; theme?: 'auto' | 'light' | 'dark'; layout?: 'inline'; id?: string }`
- css_vars: aucune (conteneur `.cal-inline` n'utilise pas de token CSS — `width: 100%; min-height: 600px` statiques)
- css_classes: .cal-inline
- consumers: src/components/footer/Footer.astro, src/pages/contact.astro, src/pages/agence/design-system.astro, src/pages/en/contact.astro (4)
- status: unique
- notes: Enveloppe SSR/React-island propre. Le `min-height: 600px` stabilise le layout pendant l'hydratation `client:only`. `layout` prop déclarée mais non utilisée dans le rendu (passée uniquement via les comments). Dépend de `CalEmbedReact.tsx` (island React). Pas de fallback no-JS visible — acceptable pour booking widget. Présent aussi dans Footer (booking minimal ?).

---

### EditorialCaseCard

- file: `src/components/ui/molecules/EditorialCaseCard.astro`
- role: Card éditoriale d'un cas client avec index + secteur + nom client (géant display) + stack/impact en pied de carte, hover lift + View Transitions `transition:name`.
- props: `{ idx: number; client: string; sector: string; stack: string; impact: string; duration: string; href: string; offset?: number; class?: string; stackLabel?: string; impactLabel?: string }`
- css_vars: var(--paper-2), var(--hairline), var(--accent), var(--ease), var(--font-display), var(--shadow-lift)
- css_classes: .u-case-card, .u-case-card-hd, .u-case-card-client, .u-case-card-foot, .u-case-card-v, .u-case-card-impact (+ :global .u-case-card-k)
- consumers: src/components/templates/ListIndexTemplate.astro, src/pages/manifesto.astro, src/pages/agence/design-system.astro, src/pages/en/manifesto.astro (4)
- status: unique
- notes: `transition:name` câblé dynamiquement via `href` — pattern VT correct. Label `stackLabel`/`impactLabel` en props permet la i18n sans Bi atom. Le `reveal` + `lift` CSS classes supposent un système d'animation global. `prefers-reduced-motion` respecté. Taille display client (`clamp(36px,5vw,72px)`) forte — signature éditoriale assumée.

---

### EditorialWriteRow

- file: `src/components/ui/molecules/EditorialWriteRow.astro`
- role: Row éditorial pour liste blog/changelog en grille 4 colonnes (date · tag · texte · flèche), avec variante tone `paper`/`ink` et slot pour le texte principal.
- props: `{ date: string; tag: string; href: string; tone?: 'paper' | 'ink'; class?: string }` + slot (texte de la row)
- css_vars: var(--hairline), var(--accent), var(--ease), var(--font-display), var(--paper-dim), var(--paper), var(--space-5)
- css_classes: .u-edit-write-row, .on-ink, .u-ewr-text (+ :global .u-ewr-arr)
- consumers: src/components/ui/organisms/WritingNotes.astro, src/components/templates/ListIndexTemplate.astro, src/pages/console.astro, src/pages/manifesto.astro, src/pages/agence/design-system.astro, src/pages/ressources/blog/index.astro, src/pages/en/console.astro, src/pages/en/manifesto.astro (8)
- status: unique
- notes: Unifie 3 variantes inline identifiées (`.writing-row`, `.b-write-row`, `.c-write-row`). Grille @900px collapse en 1 colonne, flèche masquée. `--paper-dim` utilisé uniquement en mode `ink` — token spécifique dark. Molécule éditoriale bien réutilisée (8 consumers).

---

### FitColumns

- file: `src/components/ui/molecules/FitColumns.astro`
- role: Grille 2 colonnes Oui/Non (« Vous êtes fait pour nous si » / « On refusera si ») sur fond ink dark, avec titres bilingues via atom Bi.
- props: `{ yesTitleFr: string; yesTitleEn: string; yesItems: string[]; noTitleFr: string; noTitleEn: string; noItems: string[]; class?: string }`
- css_vars: var(--font-mono), var(--accent), var(--font-display)
- css_classes: .fit-cols, .fit-col, .fit-col-no, .fit-k, .fit-k-muted, .fit-k-accent
- consumers: src/components/templates/ServiceDetailTemplate.astro, src/components/templates/HubTemplate.astro, src/pages/agence/design-system.astro (3)
- status: unique
- notes: Couleurs sans token CSS pour le fond dark (rgba inline hardcodés `rgba(246,241,232,.14)`, `rgba(246,241,232,.1)`, `rgba(246,241,232,.5)`) — risque dérive si le token `--paper` change de valeur. Pas de `var(--paper)` utilisé ici. Conçu exclusivement pour fond `ink` (mention en commentaire « pas de variante paper pour rester intentionnel »). 3 consumers légitimes, molécule pertinente.

---

### MastheadRow

- file: `src/components/ui/molecules/MastheadRow.astro`
- role: Barre de couverture de revue en 4 colonnes Kicker (volume · lieux · langue · statut booking), signature typographique présente sur les heroes /, /manifesto, /atlas.
- props: `{ volume?: string; locations?: string; status?: string; tone?: 'paper' | 'ink' }`
- css_vars: var(--hairline), var(--accent)
- css_classes: .u-masthead-row (+ :global .u-masthead-status)
- consumers: src/components/ui/organisms/Hero.astro, src/pages/agence/design-system.astro (2)
- status: unique
- notes: Style passé en attribut `style` inline (grid + border) plutôt qu'en `<style>` — probablement pour éviter le scoping Astro sur les valeurs dynamiques de couleur de border. Consommé uniquement dans Hero.astro (1 organism réel + design-system). Peu réutilisé hors hero principal — pourrait être inliné dans Hero si jamais utilisé ailleurs.

---

### NewsletterSignup

- file: `src/components/ui/molecules/NewsletterSignup.astro`
- role: Formulaire d'inscription newsletter bilingue en deux variantes (`card` avec eyebrow/heading/sub, `inline` sans header), avec honeypot anti-spam, validation client JS, appel `/api/newsletter`, confirmation et cookie.
- props: `{ lang?: 'fr' | 'en'; variant?: 'inline' | 'card' }`
- css_vars: var(--hairline), var(--paper), var(--font-mono), var(--muted), var(--font-display), var(--ink), var(--font-sans), var(--ease)
- css_classes: .nl-signup, .nl-card, .nl-eyebrow, .nl-heading, .nl-sub, .nl-form, .nl-row, .nl-input, .nl-input--error, .nl-error, .nl-btn, .nl-hint, .nl-confirm, .sr-only
- consumers: src/components/footer/Footer.astro, src/pages/en/agence/design-system.astro, src/pages/agence/design-system.astro (3)
- status: unique
- notes: Molécule la plus complexe du lot (JS inline `is:inline`, form validation, fetch API, cookie). `<script is:inline>` — rebind correct sur `astro:page-load`. `#c0392b` hardcodé pour l'erreur (couleur non tokenisée). Cookie `waimia_newsletter_signed` posé côté client — pas de lecture côté serveur visible ici. Seul consumer prod réel = Footer.astro (design-system = doc).

---

### PagePill

- file: `src/components/ui/molecules/PagePill.astro`
- role: Barre flottante bottom-left de navigation entre les 4 directions de la homepage (Apparatus / Manifesto / Console / Atlas), rendue en HTML pur (SSR) avec hydratation React island (`PagePillIsland`) pour le comportement `.is-visible` au scroll.
- props: aucune (données des directions hardcodées dans le composant, lang détecté via `langFromPath`)
- css_vars: aucune dans le fichier (styles dans `src/styles/global.css` délibérément — commentaire explicite)
- css_classes: .page-pill-btn, .is-active (définies dans global.css, pas en scoped)
- consumers: src/styles/global.css (styles), src/layouts/Base.astro (mount), src/pages/agence/design-system.astro (3)
- status: unique
- notes: Architecture SSR+island exemplaire (HTML indexable + JS progressif). Styles en global.css intentionnellement (scoping Astro empêcherait le React island de matcher `.is-visible`). Les 4 destinations sont hardcodées — évolution nécessite une modification du composant. Non configurable en props. Monté dans Base.astro = présent sur toutes les pages.

---

### PainPointInline

- file: `src/components/ui/molecules/PainPointInline.astro`
- role: Affichage éditorial d'un pain-point avec sa solution — icône severity (◆▲●○) en colonne gauche + label vertical + corps pain/solution, lien optionnel si slug fourni.
- props: `{ pain: string; solution: string; severity: 'critical' | 'high' | 'medium' | 'low'; slug?: string; class?: string }`
- css_vars: var(--hairline), var(--ink), var(--ink-2), var(--muted), var(--muted-2), var(--font-mono), var(--font-sans)
- css_classes: .pp-inline, .pp-inline--critical, .pp-inline--high, .pp-inline--medium, .pp-inline--low, .pp-inline__icon, .pp-inline__glyph, .pp-inline__tag, .pp-inline__body, .pp-inline__pain, .pp-inline__pain--linked, .pp-inline__solution
- consumers: src/pages/en/agence/design-system.astro, src/pages/agence/design-system.astro (2 — uniquement design-system)
- status: unique
- notes: ORPHELIN FONCTIONNEL — aucun consumer prod identifié (hors design-system). Couleur critique `#C94F2E` hardcodée (devrait être `var(--accent)` ou un token dédié). `writing-mode: vertical-lr` + `rotate: 180deg` sur le tag label — effet typographique fort. Concept solide (pain-points avec severity) mais non intégré dans les pages actuelles. Candidat à intégrer dans les templates SolutionsDetailTemplate ou HubTemplate.

---

### PricingTier

- file: `src/components/ui/molecules/PricingTier.astro`
- role: Colonne pricing individuelle (idx + nom palier + description bilingue + prix + features list + CTA button), avec variante `highlight` (bordure accent, badge « Recommandé »). Marqué `@internal` — usage via PricingTable parent recommandé.
- props: `{ idx: string; tier: string; highlight?: boolean; price: string; period?: string; desc_fr: string; desc_en: string; features: string[]; ctaLabel: string; ctaHref: string; class?: string }`
- css_vars: var(--hairline-strong), var(--paper), var(--ease), var(--accent), var(--paper-2), var(--space-2), var(--space-3), var(--font-mono), var(--font-display), var(--muted), var(--ink-2)
- css_classes: .pricing-tier, .is-highlighted, .pricing-badge, .pricing-hd, .pricing-idx, .pricing-tier-name, .pricing-desc, .pricing-price, .pricing-price-k, .pricing-price-period, .pricing-features, .pricing-check
- consumers: src/components/footer/Footer.astro, src/components/templates/ConversionFunnelTemplate.astro, src/pages/offres/site-web-ia-landing.astro, src/pages/agence/design-system.astro (4)
- status: unique
- notes: Documenté `@internal` (usage direct déconseillé, préférer PricingTable). Malgré cela, consommé en direct dans ConversionFunnelTemplate et la page landing — cohérence à surveiller. `box-shadow` hardcodé `rgba(201,79,46,0.08)` (devrait utiliser `var(--accent)` avec opacité). Bonne structure (Bi pour i18n, Button atom).

---

### ProofBand

- file: `src/components/ui/molecules/ProofBand.astro`
- role: Bande de preuve sociale en deux colonnes (quote/attribution | métriques chiffrées en grille 2×N), bilingue via atom Bi, séparateur vertical hairline.
- props: `{ quote_fr: string; quote_en: string; attr_fr: string; attr_en: string; metrics: { k: string; label_fr: string; label_en: string }[]; class?: string }`
- css_vars: var(--font-display), var(--hairline-strong), var(--hairline), var(--muted), var(--font-mono), var(--accent)
- css_classes: .proof-band, .proof-main, .proof-div, .proof-aside, .proof-quote, .proof-attr, .proof-metrics, .proof-metric, .proof-metric-k, .proof-metric-l (+ :global .proof-label)
- consumers: src/components/templates/CaseStudyTemplate.astro, src/components/templates/DetailMenuTemplate.astro, src/components/templates/ServiceDetailTemplate.astro, src/pages/agence/design-system.astro (4)
- status: unique
- notes: Layout `grid-template-columns: 1fr 1px 1fr` avec `proof-div` comme séparateur visuel — pattern propre. Mobile : colonne unique, séparateur masqué, `border-top` sur `proof-aside`. Métriques en grille 2×N avec borders conditionnels (`nth-child` odd/even) — fragile si nombre impair de métriques. Bonne réutilisabilité sur les templates de preuve sociale (3 templates prod).

---

## Synthèse

### Répartition des consumers (hors design-system)

| Molécule | Consumers prod | Statut |
|---|---|---|
| Breadcrumb | 36 | Infrastructure critique SEO |
| AuthorByline | 7 | Indispensable content pages |
| EditorialWriteRow | 7 | Bien distribué |
| AuthorCard | 4 | Bon coverage |
| AsymmetricServiceRow | 3 | Manifesto + ServiceCatalogRow |
| EditorialCaseCard | 3 | Manifesto + ListIndexTemplate |
| CalEmbed | 3 | Contact + Footer |
| ProofBand | 3 | Templates preuve sociale |
| PricingTier | 3 | Conversion + landing |
| FitColumns | 2 | ServiceDetail + Hub |
| NewsletterSignup | 1 (Footer) | Sous-exploitée |
| PagePill | 1 (Base.astro) | Global layout |
| MastheadRow | 1 (Hero.astro) | Signature hero |
| PainPointInline | 0 | **ORPHELIN FONCTIONNEL** |

### Orphelins

- **PainPointInline** : aucun consumer prod. Concept solide (severity + pain/solution) mais non branché. À intégrer dans les templates SolutionsDetailTemplate / HubTemplate, ou à archiver si la direction pain-points est abandonnée.

### Doublons / Redondances détectées

- **AuthorByline vs AuthorCard** : pas de doublon — rôles distincts (byline compact en haut d'article vs carte prose en bas). Coexistence légitime.
- **AsymmetricServiceRow dans ServiceCatalogRow** : ServiceCatalogRow semble envelopper ou réutiliser AsymmetricServiceRow — à vérifier si ServiceCatalogRow est une surcouche redondante (inventaire molécules Q→Z).
- **PricingTier consommé en direct** malgré `@internal` — usage hors PricingTable à normaliser.

### Molécules les plus réutilisées

1. **Breadcrumb** (37 consumers) — infrastructure, ne pas toucher sans plan SEO
2. **AuthorByline** (8) + **EditorialWriteRow** (8) — socles editorial
3. **AuthorCard** (5) — présence transversale content

### Alertes tokens CSS

- `AuthorCard` : `--paper-2` valeur hardcodée `#EFEBE2` dans `background`
- `FitColumns` : 3 rgba hardcodés pour fond dark (pas de tokens)
- `PricingTier` : `box-shadow` rgba hardcodé
- `PainPointInline` : couleur critique `#C94F2E` hardcodée (proche de `--accent` mais pas tokénisée)
- `NewsletterSignup` : `#c0392b` pour erreur (couleur erreur non tokenisée)
