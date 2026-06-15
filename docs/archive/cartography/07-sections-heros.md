# 07 — Sections Hero (26)

> Cartographie exhaustive des 26 composants Hero du catalogue de sections Waimia.
> Objectif : réduction DA — identifier les familles structurellement proches pour fusion en héros génériques à variantes.
> Date : 2026-06-04 · Branche : `feat/contenu` · Lecture seule, 0 composant modifié.

---

## HeroAcademyHub

- **file** : `src/components/sections/HeroAcademyHub.astro`
- **type-id** : `z.literal('hero-academy-hub')`
- **role** : Masthead d'un hub école/académie — kicker + h1 monumental + lede + bande de stats 4 chiffres (hairline séparator)
- **template/page consommateur** : `src/components/templates/EcoleHubTemplate.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, stats[{value, label_fr, label_en}] }`
  - `lang: 'fr' | 'en'`
  - `wrap?` : override max-width wrap (CSS var `--hahub-wrap`)
  - `topPad?` : override padding-top (CSS var `--hahub-top-pad`)
- **css_vars** : `--hahub-top-pad`, `--hahub-wrap`, `--space-page-x`, `--paper`, `--hairline`, `--text-h1-hero`, `--font-display`, `--font-sans`, `--text-lede`, `--text-secondary`, `--font-mono`, `--text-muted`
- **css_classes** : `.hero-academy-hub`, `.hero-academy-hub__wrap`, `.hero-academy-hub__kicker`, `.hero-academy-hub__h1`, `.hero-academy-hub__lede`, `.hero-academy-hub__stats`, `.hero-academy-hub__stat`, `.hero-academy-hub__value`, `.hero-academy-hub__label`
- **status** : `FUSIONNABLE avec HeroCentered, HeroCourse, HeroDetailMenu, HeroHubMasthead, HeroHubListing, HeroProblemIndex, HeroUtilityMasthead`
- **notes** : Centered avec stats band. Candidat fusion → `hero-generic-centered` avec prop `stats?: [{value, label_fr, label_en}]` optionnelle.

---

## HeroAuthor

- **file** : `src/components/sections/HeroAuthor.astro`
- **type-id** : `z.literal('hero-author')`
- **role** : Page auteur — 2 colonnes (texte col 1-7, portrait col 8-12), View Transitions carte/h1/image
- **template/page consommateur** : `src/components/templates/AuthorPageTemplate.astro`
- **layout_family** : `split`
- **props** :
  - `data` : `{ team_label_fr, team_label_en, team_href, name, name_lead, name_accent, role_fr, role_en, lede_fr, lede_en }`
  - `lang: 'fr' | 'en'`
  - `transitionId?` : VT hero-h1 + hero-img
- **css_vars** : `--gut`, `--space-6`, `--wrap`, `--muted`, `--accent`, `--ink`, `--ink-2`, `--font-display`, `--font-mono`, `--text-lede`, `--tracking-display`, `--hairline`, `--space-5`, `--space-7`, `--space-3`
- **css_classes** : `.hero-author`, `.hero-author__grid`, `.hero-author__copy`, `.hero-author__tag`, `.hero-author__name`, `.hero-author__role`, `.hero-author__lede`, `.hero-author__portrait`, `.hero-author__img`
- **status** : `unique` (portrait plein-cadre 4/5 + tag équipe lié + VT — structure suffisamment spécifique)
- **notes** : Unique dans sa nature éditoriale + VT spécifique au portrait. Ne pas fusionner.

---

## HeroCaseStudy

- **file** : `src/components/sections/HeroCaseStudy.astro`
- **type-id** : `z.literal('hero-case-study')`
- **role** : Masthead étude de cas — eyebrow + § Case N + h1 + SVG cercles déco top-right + spec-bar optionnelle
- **template/page consommateur** : `src/components/templates/CaseStudyTemplate.astro`
- **layout_family** : `masthead-meta`
- **props** :
  - `data` : `{ eyebrow_fr, eyebrow_en, case_num, h1_fr, h1_en, specs?[{label_fr, label_en, value}] }`
  - `lang: 'fr' | 'en'`
  - `transitionId?` : VT h1 + SVG déco (hero-h1-*, hero-img-*)
  - `cardTransitionId?` : VT section (card-*)
  - `topPad?` : override padding-top (CSS var `--hcs-top-pad`)
  - `h1Gap?` : override margin h1→specs (CSS var `--hcs-h1-gap`)
- **css_vars** : `--hcs-top-pad`, `--hcs-h1-gap`, `--header-height`, `--accent`, `--ink`, `--hairline`, `--font-display`, `--font-mono`, `--space-5`
- **css_classes** : `.hero-case-study`, `.hero-case-study__mast`, `.hero-case-study__deco`, `.hero-case-study__eyebrow`, `.hero-case-study__num`, `.hero-case-study__h1`, `.hero-case-study__specs`, `.hero-case-study__specs-grid`, `.hero-case-study__spec`, `.hero-case-study__spec-l`, `.hero-case-study__spec-v`
- **status** : `unique` (spec-bar horizontale + eyebrow + cercles SVG — différent des geo-deco masthead)
- **notes** : Structure proche de `masthead-geo` mais spec-bar horizontale + SVG cercles (pas rectangles/triangles). Conserver séparé ou fusionner dans `hero-generic-masthead-geo` avec variant `kind: 'case-study'`.

---

## HeroCentered

- **file** : `src/components/sections/HeroCentered.astro`
- **type-id** : `z.literal('hero-centered')`
- **role** : Hero centré générique — kicker + h1 + lede + 2 CTA (primary/secondary) alignés centre, max-width 60%
- **template/page consommateur** : `src/pages/agence/design-system.astro`, `src/pages/en/agence/design-system.astro` (usage catalogue)
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, cta_primary{href, label_fr, label_en}, cta_secondary?{href, label_fr, label_en} }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--spacing-section`, `--header-height`, `--hairline`, `--spacing-block`, `--font-display`, `--text-h1-hero`, `--ink`, `--font-sans`, `--text-body-md`
- **css_classes** : `.hero-centered`, `.hero-centered__wrap`, `.hero-centered__kicker`, `.hero-centered__h1`, `.hero-centered__lede`, `.hero-centered__actions`, `.hero-centered__cta`
- **status** : `FUSIONNABLE avec HeroAcademyHub, HeroCourse, HeroDetailMenu, HeroHubMasthead, HeroHubListing, HeroProblemIndex, HeroUtilityMasthead`
- **notes** : Héro de référence pour la famille centred. Absorberait les autres centred via `variant` + props optionnelles (`stats?`, `pills?`, `meta_kicker?`, `decoration?`, `align?`).

---

## HeroConversionFunnel

- **file** : `src/components/sections/HeroConversionFunnel.astro`
- **type-id** : `z.literal('hero-conversion-funnel')`
- **role** : Landing haute densité — § Flagship + h1 monumental (clamp 64-200px) + lede + meta-pills + benefits 2-col + proof + 2 CTA + stats 4-col
- **template/page consommateur** : `src/components/templates/ConversionFunnelTemplate.astro`
- **layout_family** : `centered-rich`
- **props** :
  - `data` : `{ funnel_num, h1_fr, h1_en, lede_fr, lede_en, meta_pills?, benefits?[{fr, en}], proof_fr?, proof_en?, cta_primary{href, label_fr, label_en}, cta_secondary?, stats?[{value, label_fr, label_en}] }`
  - `lang: 'fr' | 'en'`
  - `wrapMaxWidth?`, `statsAsKeyMetric?`, `kickerReveal?`
- **css_vars** : `--font-display`, `--font-sans`, `--font-mono`, `--accent`, `--muted`, `--ink`, `--hairline`, `--hairline-strong`, `--paper`
- **css_classes** : `.hero-conversion-funnel`, `.hcf-wrap`, `.hcf-kicker`, `.hcf-h1`, `.hcf-lede`, `.hcf-pills`, `.hcf-benefits`, `.hcf-proof`, `.hcf-actions`, `.hcf-stats`
- **status** : `unique`
- **notes** : Héro landing à haute densité. Trop spécifique (benefits 2-col + proof line + meta-pills) pour fusionner dans un centred générique. Conserver.

---

## HeroCourse

- **file** : `src/components/sections/HeroCourse.astro`
- **type-id** : `z.literal('hero-course')`
- **role** : Masthead cours — kicker accent § type + h1 + lede + pills technos + 2 CTA
- **template/page consommateur** : `src/components/templates/CourseDetailTemplate.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ type_label_fr, type_label_en, title_fr, title_en, lede_fr, lede_en, pills?[{label_fr, label_en}], cta_primary{href, label_fr, label_en}, cta_secondary? }`
  - `lang: 'fr' | 'en'`
  - `topPad?` (CSS var `--hero-course-top-pad`), `wrap?`, `ctaPrimaryDisabled?`, `ctaPrimaryExternal?`, `ghostStyle?`
- **css_vars** : `--hero-course-top-pad`, `--space-page-x`, `--hairline`, `--font-display`, `--text-h1-hero`, `--font-sans`, `--text-lede`, `--text-secondary`, `--font-mono`, `--text-muted`, `--accent`, `--ink`, `--paper`
- **css_classes** : `.hero-course`, `.hero-course__wrap`, `.hero-course__kicker`, `.hero-course__h1`, `.hero-course__lede`, `.hero-course__pills`, `.hero-course__pill`, `.hero-course__actions`
- **status** : `FUSIONNABLE avec HeroCentered, HeroAcademyHub, HeroDetailMenu, HeroHubMasthead, HeroHubListing, HeroProblemIndex, HeroUtilityMasthead`
- **notes** : Centré avec pills optionnelles + double CTA. Fusionnable → `hero-generic-centered` avec `pills?` optionnel.

---

## HeroDetailMenu

- **file** : `src/components/sections/HeroDetailMenu.astro`
- **type-id** : `z.literal('hero-detail-menu')`
- **role** : Masthead menu détail — kicker parent + § num accent + h1 clamp 56-156px + lede
- **template/page consommateur** : `src/components/templates/DetailMenuTemplate.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ parent_kicker_fr, parent_kicker_en, detail_num, h1_fr, h1_en, lede_fr, lede_en }`
  - `lang: 'fr' | 'en'`
  - `topPad?`, `wrapMaxWidth?`
- **css_vars** : `--font-display`, `--font-mono`, `--accent`, `--muted`, `--space-4`
- **css_classes** : `.hero-detail-menu`, `.hero-detail-menu__wrap`, `.hero-detail-menu__parent`, `.hero-detail-menu__num`, `.hero-detail-menu__h1`, `.hero-detail-menu__lede`
- **status** : `FUSIONNABLE avec HeroCentered, HeroServiceMasthead, HeroUtilityMasthead`
- **notes** : Centré minimaliste (kicker parent + § num + h1 + lede sans CTA). Fusionnable → `hero-generic-centered`.

---

## HeroEssay

- **file** : `src/components/sections/HeroEssay.astro`
- **type-id** : `z.literal('hero-essay')`
- **role** : Masthead essai éditorial — kicker + h1 + lede italique + meta (auteur · date · lecture) + hero-image optionnelle pleine largeur
- **template/page consommateur** : `src/components/templates/EssayTemplate.astro`
- **layout_family** : `centered`
- **View Transitions** : `card-{cardTransitionId}` (section), `hero-h1-{transitionId}` (h1), image séparée
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, author, date, reading_time_fr?, reading_time_en?, hero_image?, hero_image_alt_fr?, hero_image_alt_en? }`
  - `lang: 'fr' | 'en'`
  - `transitionId?`, `cardTransitionId?`, `topPad?`
- **css_vars** : `--he-top-pad`, `--header-height`, `--hairline`, `--font-display`, `--accent`, `--ink`, `--muted`, `--font-mono`, `--font-sans`
- **css_classes** : `.hero-essay`, `.hero-essay__hd`, `.hero-essay__kicker`, `.hero-essay__h1`, `.hero-essay__lede`, `.hero-essay__meta`, `.hero-essay__image`
- **status** : `unique` (meta auteur/date + hero-image + VT — spécifique éditorial)
- **notes** : VT + méta-ligne éditoriale + image optionnelle = structure suffisamment distincte. Conserver.

---

## HeroFullBleed

- **file** : `src/components/sections/HeroFullBleed.astro`
- **type-id** : `z.literal('hero-full-bleed')`
- **role** : Hero pleine page — h1 géant clamp 60-180px + lede + CTA; fond variable via `data-bg` (ink-paper / liquid-canvas / gradient-mesh / signature-grid)
- **template/page consommateur** : `src/components/ui/organisms/Hero.astro` (seulement dans catalogue/catalogue DS)
- **layout_family** : `full-bleed`
- **props** :
  - `data` : `{ h1_fr, h1_en, lede_fr?, lede_en?, cta_primary?, background_kind: 'ink-paper' | 'liquid-canvas' | 'gradient-mesh' | 'signature-grid' }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--header-height`, `--hairline`, `--ink`, `--paper`, `--spacing-block`, `--font-display`, `--font-sans`
- **css_classes** : `.hero-full-bleed`, `.hero-full-bleed[data-bg="…"]`, `.hero-full-bleed__wrap`, `.hero-full-bleed__h1`, `.hero-full-bleed__lede`, `.hero-full-bleed__cta`
- **status** : `unique`
- **notes** : Seul hero avec changement de fond via `data-bg`. Structure différente des centred (h1 géant sans kicker, full-width fond). Conserver.

---

## HeroHome

- **file** : `src/components/sections/HeroHome.astro`
- **type-id** : `z.literal('hero-home')`
- **role** : Page d'accueil — signature-grid bg + SVG sig-mark + h1 monumental + sous-grille 2-col (lede + minimap 3×2 + 2 CTA + cta-sub / liste proofs numérotées)
- **template/page consommateur** : `src/pages/index.astro` uniquement (pas de template dédié, page directe)
- **layout_family** : `unique`
- **props** :
  - `data` : `{ h1_fr, h1_en, lede_fr, lede_en, minimap[6 items: {label_fr, label_en, href, icon?}], cta_href?, offer_href?, cta_primary_fr, cta_primary_en, cta_secondary_fr, cta_secondary_en, cta_sub_fr, cta_sub_en, proofs[3 items: {num, label_fr, label_en}] }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--hairline`, `--font-display`, `--text-h1-hero`, `--leading-h1`, `--tracking-display`, `--font-sans`, `--text-lede`, `--leading-body`, `--ink`, `--ink-2`, `--accent`, `--gut`, `--section-loose`, `--font-mono`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-7`, `--space-9`
- **css_classes** : `.hero-home`, `.hero-home__sig`, `.hero-home__h1`, `.hero-home__grid`, `.hero-home__left`, `.hero-home__lede`, `.hero-home__minimap`, `.hero-home__minimap-item`, `.hero-home__actions`, `.hero-home__cta-sub`, `.hero-home__right`, `.hero-home__proofs`, `.hero-home__proof`
- **status** : `unique`
- **notes** : Structure la plus complexe du catalogue (signature bg + minimap 6 items + proofs). Conserver absolument.

---

## HeroHubListing

- **file** : `src/components/sections/HeroHubListing.astro`
- **type-id** : `z.literal('hero-hub-listing')`
- **role** : Masthead hub listing — kicker + h1 italique monumental clamp 56-180px + lede; SVG déco cercles+ligne optionnelle
- **template/page consommateur** : `src/pages/ressources/index.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, decoration? }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--header-height`, `--accent`, `--ink`, `--ink-2`, `--font-display`, `--font-sans`
- **css_classes** : `.hero-hub-listing`, `.hero-hub-listing__deco`, `.hero-hub-listing__wrap`, `.hero-hub-listing__kicker`, `.hero-hub-listing__h1`, `.hero-hub-listing__lede`
- **status** : `FUSIONNABLE avec HeroCentered, HeroHubMasthead, HeroUtilityMasthead, HeroProblemIndex`
- **notes** : Centred + SVG déco optionnelle. Fusionnable → `hero-generic-centered` avec `decoration?: 'circles' | 'geo-rects'`.

---

## HeroHubMasthead

- **file** : `src/components/sections/HeroHubMasthead.astro`
- **type-id** : `z.literal('hero-hub-masthead')`
- **role** : Masthead hub simple — kicker + h1 italique monumental + lede; padding 140px fixe
- **template/page consommateur** : `src/pages/offres/index.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--muted`, `--font-display`, `--font-sans`
- **css_classes** : `.hero-hub-masthead`, `.hero-hub-masthead__wrap`, `.hero-hub-masthead__kicker`, `.hero-hub-masthead__h1`, `.hero-hub-masthead__lede`
- **status** : `FUSIONNABLE avec HeroCentered, HeroHubListing, HeroUtilityMasthead, HeroProblemIndex`
- **notes** : Le plus minimaliste des centred (3 var CSS seulement). Archétype pur du centred sans CTA. Candidat noyau de `hero-generic-centered`.

---

## HeroHubStats

- **file** : `src/components/sections/HeroHubStats.astro`
- **type-id** : `z.literal('hero-hub-stats')`
- **role** : Hub thématique avec stats — meta_kicker + § hub_num accent + h1 monumental clamp 64-200px + lede + grille stats 4-col avec lead cell
- **template/page consommateur** : `src/components/templates/HubTemplate.astro`, `src/pages/offres/conseil.astro`
- **layout_family** : `stats`
- **props** :
  - `data` : `{ meta_kicker_fr, meta_kicker_en, hub_num, h1_fr, h1_en, lede_fr, lede_en, stats[{value, label_fr, label_en, emphasis?}] }`
  - `lang: 'fr' | 'en'`
  - `ledeDropCap?`
- **css_vars** : `--hairline`, `--hairline-strong`, `--accent`, `--ink`, `--muted`, `--font-display`, `--font-sans`, `--font-mono`, `--space-5`
- **css_classes** : `.hero-hub-stats`, `.hero-hub-stats__wrap`, `.hero-hub-stats__meta`, `.hero-hub-stats__num`, `.hero-hub-stats__h1`, `.hero-hub-stats__lede`, `.hero-hub-stats__grid`, `.hero-hub-stats__cell`, `.hero-hub-stats__cell--lead`, `.hero-hub-stats__value`, `.hero-hub-stats__label`
- **status** : `FUSIONNABLE avec HeroPillarHub`
- **notes** : Quasi-identique à HeroPillarHub — même props, même grille stats. Différence : HeroHubStats écrit ses cellules inline, HeroPillarHub délègue à `KeyMetric`. Fusion immédiate possible → 1 hero `hero-hub-stats` avec `useKeyMetric?: boolean`.

---

## HeroLanding

- **file** : `src/components/sections/HeroLanding.astro`
- **type-id** : `z.literal('hero-landing')`
- **role** : Landing offering — eyebrow mono + h1 italique serif clamp 40-96px + lede + 2 CTA + availability line
- **template/page consommateur** : `src/pages/offres/site-web-ia-landing.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ eyebrow_fr, eyebrow_en, h1_fr, h1_en, lede_fr, lede_en, cta_primary{href, label_fr, label_en}, cta_secondary?, availability_fr?, availability_en? }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--font-mono`, `--muted`, `--font-serif`, `--ink`, `--accent`, `--font-body`
- **css_classes** : `.hero-landing`, `.hero-landing__wrap`, `.hero-landing__eyebrow`, `.hero-landing__h1`, `.hero-landing__lede`, `.hero-landing__actions`, `.hero-landing__availability`
- **status** : `unique` (seul hero utilisant `--font-serif` + `--font-body` au lieu de `--font-display`)
- **notes** : Token typographique différent (`--font-serif`) + availability line = identité visuelle landing distincte. Conserver ou fusionner dans `hero-generic-centered` avec `fontFamily: 'serif' | 'display'`.

---

## HeroLeadMagnet

- **file** : `src/components/sections/HeroLeadMagnet.astro`
- **type-id** : `z.literal('hero-lead-magnet')`
- **role** : Livre blanc / ressource — 2-col (7fr/4fr) : texte + cover img 3/4 + download bar
- **template/page consommateur** : `src/components/templates/LeadMagnetTemplate.astro`
- **layout_family** : `split`
- **View Transitions** : `card-{cardTransitionId}` (section), `hero-h1-{transitionId}` (h1), `hero-img-{transitionId}` (panel cover)
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, format_fr, format_en, published_at, cover_url?, download_label_fr, download_label_en?, cta_href?, cta_label_fr, cta_label_en }`
  - `lang: 'fr' | 'en'`
  - `transitionId?`, `cardTransitionId?`, `coverFallback?`
- **css_vars** : `--hairline`, `--hairline-strong`, `--paper-2`, `--font-display`, `--ink-2`, `--ink`, `--font-sans`, `--font-mono`, `--muted`, `--accent`
- **css_classes** : `.hero-lead-magnet`, `.hero-lead-magnet__grid`, `.hero-lead-magnet__text`, `.hero-lead-magnet__kicker`, `.hero-lead-magnet__h1`, `.hero-lead-magnet__lede`, `.hero-lead-magnet__meta`, `.hero-lead-magnet__panel`, `.hero-lead-magnet__cover`, `.hero-lead-magnet__download`, `.hero-lead-magnet__download-label`
- **status** : `unique` (split spécifique ressource : cover 3/4 + download bar + meta format/date/gratuit)
- **notes** : Split très spécialisé (cover + CTA de téléchargement). Distinct de HeroSplit/HeroAuthor. Conserver.

---

## HeroLiquid

- **file** : `src/components/sections/HeroLiquid.astro`
- **type-id** : `z.literal('hero-liquid')`
- **role** : Page manifesto — fond encre plein-bleed + canvas React animé (LiquidHero client:visible) + eyebrow + h1 reveal-mask-up + lede + 2 PillCTA
- **template/page consommateur** : `src/pages/manifesto.astro`
- **layout_family** : `liquid-animated`
- **props** :
  - `data` : `{ eyebrow_fr, eyebrow_en, h1_fr, h1_en, lede_fr, lede_en, cta_primary_label_fr, cta_primary_label_en, cta_primary_href, cta_secondary_label_fr, cta_secondary_label_en, cta_secondary_href }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--ink`, `--paper`, `--font-display`, `--accent`
- **css_classes** : `.hero-liquid`, `.hero-liquid__canvas`, `.hero-liquid__content`, `.hero-liquid__eyebrow`, `.hero-liquid__h1`, `.hero-liquid__lede`, `.hero-liquid__actions`
- **status** : `unique`
- **notes** : Seul hero avec île React canvas animée (`LiquidHero`, `client:visible`). Fond dark ink inversé. Absolument unique.

---

## HeroOfferDetail

- **file** : `src/components/sections/HeroOfferDetail.astro`
- **type-id** : `z.literal('hero-offer-detail')`
- **role** : Masthead offre — breadcrumb + tier mono + h1 clamp 56-148px + sous-grille 1.4fr/1fr (lead italique / CTA + meta) + SVG lignes+cercles concentriques top-right
- **template/page consommateur** : `src/components/templates/OffresDetailTemplate.astro`
- **layout_family** : `masthead-geo`
- **View Transitions** : `card-{cardTransitionId}` (section), `hero-h1-{transitionId}` (h1), `hero-img-{transitionId}` (SVG déco)
- **props** :
  - `data` : `{ breadcrumb_label_fr, breadcrumb_label_en, breadcrumb_href, tier_fr, tier_en, h1_fr, h1_en, lead_fr, lead_en, cta{href, label_fr, label_en}, meta_fr?, meta_en? }`
  - `lang: 'fr' | 'en'`
  - `transitionId?`, `cardTransitionId?`, `wrapMax?`, `geoReveal?`, `breadcrumbCurrent?`
- **css_vars** : `--hod-wrap`, `--font-mono`, `--muted`, `--accent`, `--font-display`, `--ink`, `--paper`, `--font-sans`, `--hairline`
- **css_classes** : `.hero-offer-detail`, `.hero-offer-detail__geo`, `.hero-offer-detail__wrap`, `.hero-offer-detail__breadcrumb`, `.hero-offer-detail__tier`, `.hero-offer-detail__title`, `.hero-offer-detail__sub`, `.hero-offer-detail__lead`, `.hero-offer-detail__actions`, `.hero-offer-detail__cta`, `.hero-offer-detail__meta`
- **status** : `FUSIONNABLE avec HeroSector, HeroTechLayer`
- **notes** : Les 3 masthead-geo partagent la sous-grille 1.4fr/1fr + lead italique + CTA ink-button. Différences : forme SVG (cercles / rectangles / triangles) + label type (breadcrumb+tier / dept / layer badge). Fusion → `hero-generic-masthead-geo` avec `geoShape: 'circles' | 'rects' | 'triangles'` + `labelKind: 'breadcrumb-tier' | 'dept' | 'layer'`.

---

## HeroPillarHub

- **file** : `src/components/sections/HeroPillarHub.astro`
- **type-id** : `z.literal('hero-pillar-hub')`
- **role** : Hub pilier thématique — meta_kicker + § hub_num + h1 clamp 64-200px + lede + grille stats optionnelle (via composant KeyMetric)
- **template/page consommateur** : `src/components/templates/HubTemplate.astro` (variante `.hub-masthead`)
- **layout_family** : `stats`
- **props** :
  - `data` : `{ meta_kicker_fr, meta_kicker_en, hub_num, h1_fr, h1_en, lede_fr, lede_en, stats?[{value, label_fr, label_en, emphasis?}] }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--header-height`, `--space-5`, `--font-display`, `--ink`, `--accent`, `--font-sans`, `--muted`, `--hairline-strong`, `--hairline`
- **css_classes** : `.hero-pillar-hub`, `.hero-pillar-hub__wrap`, `.hero-pillar-hub__meta`, `.hero-pillar-hub__num`, `.hero-pillar-hub__h1`, `.hero-pillar-hub__lede`, `.hero-pillar-hub__stats`
- **status** : `FUSIONNABLE avec HeroHubStats`
- **notes** : Quasi-identique à HeroHubStats (même props structure, même stats grid). HeroPillarHub utilise le composant `KeyMetric`, HeroHubStats écrit ses cellules inline. Fusion prioritaire → 1 composant.

---

## HeroProblemIndex

- **file** : `src/components/sections/HeroProblemIndex.astro`
- **type-id** : `z.literal('hero-problem-index')`
- **role** : Index problèmes/solutions — SVG déco rectangles rotatifs + ligne diagonale + kicker + h1 clamp 56-180px + lede italique + texte canonique optionnel
- **template/page consommateur** : `src/pages/solutions/index.astro`
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, h1_fr, h1_en, lede_fr, lede_en, canonical_fr?, canonical_en? }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--font-display`, `--font-sans`, `--ink-2`, `--muted`, `--ink`
- **css_classes** : `.hero-problem-index`, `.hero-problem-index__deco`, `.hero-problem-index__wrap`, `.hero-problem-index__kicker`, `.hero-problem-index__h1`, `.hero-problem-index__lede`, `.hero-problem-index__canonical`
- **status** : `FUSIONNABLE avec HeroCentered, HeroHubMasthead, HeroHubListing, HeroUtilityMasthead`
- **notes** : Centré avec SVG rectangles déco + lede italique. Identique à HeroUtilityMasthead (centré + lede italic + align?). Fusionnable → `hero-generic-centered`.

---

## HeroSector

- **file** : `src/components/sections/HeroSector.astro`
- **type-id** : `z.literal('hero-sector')`
- **role** : Masthead solution sectorielle — SVG déco rectangles rotatifs + dept kicker mono accent + h1 italique clamp 56-148px + sous-grille 1.4fr/1fr (lead italique / CTA + meta) + tags optionnels
- **template/page consommateur** : `src/components/templates/SolutionsDetailTemplate.astro` (`.sol-hero`)
- **layout_family** : `masthead-geo`
- **props** :
  - `data` : `{ dept_fr, dept_en, h1_fr, h1_en, lead_fr, lead_en, cta{href, label_fr, label_en}, meta_fr?, meta_en?, tags?[{label_fr, label_en}] }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--font-mono`, `--accent`, `--font-display`, `--ink`, `--font-sans`, `--hairline`, `--muted`
- **css_classes** : `.sol-hero`, `.sol-hero__deco`, `.sol-hero__wrap`, `.sol-hero__dept`, `.sol-hero__h1`, `.sol-hero__sub`, `.sol-hero__lead`, `.sol-hero__actions`, `.sol-hero__cta`, `.sol-hero__meta`, `.sol-hero__tags`, `.sol-hero__tag`
- **status** : `FUSIONNABLE avec HeroOfferDetail, HeroTechLayer`
- **notes** : Même sous-grille 1.4fr/1fr + lead italique + CTA ink que HeroOfferDetail et HeroTechLayer. Différences : rectangles SVG (vs cercles/triangles) + dept label (vs breadcrumb-tier / layer badge) + tags row optionnel. Fusion → `hero-generic-masthead-geo`.

---

## HeroServiceDetail

- **file** : `src/components/sections/HeroServiceDetail.astro`
- **type-id** : `z.literal('hero-service-detail')`
- **role** : Masthead service — § Service N + h1 clamp 56-156px + lede display + proof-bar métriques optionnel (grille auto-fit)
- **template/page consommateur** : `src/components/templates/ServiceDetailTemplate.astro`
- **layout_family** : `service-kicker`
- **props** :
  - `data` : `{ service_num, h1_fr, h1_en, lede_fr, lede_en, metrics?[{value, label_fr, label_en}] }`
  - `lang: 'fr' | 'en'`
  - `topPad?`
- **css_vars** : `--header-height`, `--space-5`, `--font-display`, `--ink`, `--muted`, `--accent`, `--hairline`, `--font-mono`
- **css_classes** : `.hero-service-detail`, `.hero-service-detail__wrap`, `.hero-service-detail__kicker`, `.hero-service-detail__h1`, `.hero-service-detail__lede`, `.hero-service-detail__metrics`, `.hero-service-detail__metric`, `.hero-service-detail__value`, `.hero-service-detail__label`
- **status** : `FUSIONNABLE avec HeroServiceMasthead`
- **notes** : HeroServiceDetail = HeroServiceMasthead + `metrics?` optionnel + `topPad?`. Fusion immédiate → 1 hero `hero-service` avec `metrics?` en prop optionnelle.

---

## HeroServiceMasthead

- **file** : `src/components/sections/HeroServiceMasthead.astro`
- **type-id** : `z.literal('hero-service-masthead')`
- **role** : Masthead service simplifié — § Service N kicker + h1 display clamp 56-156px + lede display (sans métriques)
- **template/page consommateur** : `src/components/templates/ServiceDetailTemplate.astro` (variante simplifiée, l.131-138)
- **layout_family** : `service-kicker`
- **props** :
  - `data` : `{ service_num, h1_fr, h1_en, lede_fr, lede_en }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--space-5`, `--font-display`, `--muted`
- **css_classes** : `.hero-service-masthead`, `.hero-service-masthead__wrap`, `.hero-service-masthead__kicker`, `.hero-service-masthead__h1`, `.hero-service-masthead__lede`
- **status** : `FUSIONNABLE avec HeroServiceDetail`
- **notes** : Strictement identique à HeroServiceDetail sans `metrics?` ni `topPad?`. La fusion en 1 composant est triviale.

---

## HeroSplit

- **file** : `src/components/sections/HeroSplit.astro`
- **type-id** : `z.literal('hero-split')`
- **role** : Hero 2-col générique — col gauche (kicker opt. + h1 + lede + 2 CTA + meta opt.) + col droite (bloc visuel optionnel)
- **template/page consommateur** : `src/components/ui/organisms/Hero.astro`, `src/content/offres/composable-pilot.mdx`, `src/pages/agence/design-system.astro`, `src/pages/test-composable.astro`, `src/styles/global.css`
- **layout_family** : `split`
- **props** :
  - `data` : `{ kicker_fr?, kicker_en?, h1_fr, h1_en, lede_fr, lede_en, cta_primary{href, label_fr, label_en, variant, mag?}, cta_secondary?{href, label_fr, label_en, variant}, meta_fr?, meta_en?, right_block?{kind} }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--spacing-section`, `--header-height`, `--hairline`, `--spacing-block`, `--font-display`, `--text-h1-hero`, `--ink`, `--font-sans`, `--text-body-md`, `--paper-2`
- **css_classes** : `.hero-split`, `.hero-split__grid`, `.hero-split__copy`, `.hero-split__kicker`, `.hero-split__h1`, `.hero-split__lede`, `.hero-split__actions`, `.hero-split__meta`, `.hero-split__visual`
- **status** : `unique` (héro split de référence — 58fr/42fr, droit col visuel flexible)
- **notes** : Le plus générique des splits — plusieurs consommateurs. Conserver comme référence. HeroAuthor et HeroLeadMagnet sont des spécialisations éditoriales.

---

## HeroTechLayer

- **file** : `src/components/sections/HeroTechLayer.astro`
- **type-id** : `z.literal('hero-tech-layer')`
- **role** : Masthead couche technologique — triangles SVG signature + badge layer (claude/os/orch) mono dot + h1 clamp 56-148px + sous-grille 1.4fr/1fr (lead italique / CTA + meta)
- **template/page consommateur** : `src/components/templates/TechnologiesDetailTemplate.astro`
- **layout_family** : `masthead-geo`
- **View Transitions** : `card-{cardTransitionId}` (section), `hero-h1-{transitionId}` (h1), `hero-img-{transitionId}` (SVG géo)
- **props** :
  - `data` : `{ layer_type?: 'claude' | 'os' | 'orch', layer_label_fr, layer_label_en, h1_fr, h1_en, lead_fr, lead_en, cta{href, label_fr, label_en}, meta_fr?, meta_en? }`
  - `lang: 'fr' | 'en'`
  - `transitionId?`, `cardTransitionId?`, `wrapMax?`, `geoReveal?`
- **css_vars** : `--htl-wrap`, `--font-mono`, `--accent`, `--ink`, `--font-display`, `--font-sans`, `--paper`, `--muted`, `--hairline`
- **css_classes** : `.hero-tech-layer`, `.hero-tech-layer--{layerType}`, `.hero-tech-layer__geo`, `.hero-tech-layer__wrap`, `.hero-tech-layer__layer`, `.hero-tech-layer__layer--claude`, `.hero-tech-layer__layer--os`, `.hero-tech-layer__layer--orch`, `.hero-tech-layer__title`, `.hero-tech-layer__sub`, `.hero-tech-layer__lead`, `.hero-tech-layer__actions`, `.hero-tech-layer__cta`, `.hero-tech-layer__meta`
- **status** : `FUSIONNABLE avec HeroOfferDetail, HeroSector`
- **notes** : Troisième masthead-geo. Triangles (vs cercles vs rectangles). Badge coloré `layer-type` = seule variante de couleur par type (accent/ink/ink+opacity). Fusion → `hero-generic-masthead-geo`.

---

## HeroTunnelStep

- **file** : `src/components/sections/HeroTunnelStep.astro`
- **type-id** : `z.literal('hero-tunnel-step')`
- **role** : Étape tunnel conversion — kicker label + barre progression [01][02]... + h1 2 tailles (hero/section) + lede sans
- **template/page consommateur** : `src/components/templates/TunnelStepTemplate.astro` (`.tnl-hero`)
- **layout_family** : `funnel`
- **props** :
  - `data` : `{ kicker_fr, kicker_en, step, progress_total, h1_fr, h1_en, lede_fr, lede_en }`
  - `lang: 'fr' | 'en'`
- **css_vars** : `--font-mono`, `--accent`, `--space-6`, `--space-7`, `--muted`, `--hairline`, `--font-display`, `--text-h1-hero`, `--text-h2-grand`, `--ink`, `--font-sans`, `--text-lede`, `--gut`
- **css_classes** : `.hero-tunnel-step`, `.tnl-hero__progress`, `.tnl-hero__step`, `.tnl-hero__h1`, `.tnl-hero__lede`
- **status** : `unique`
- **notes** : Seul hero avec indicateur de progression numéroté (barre d'étapes). Comportement conditionnel h1 (hero vs section selon `step === 1`). Absolument unique.

---

## HeroUtilityMasthead

- **file** : `src/components/sections/HeroUtilityMasthead.astro`
- **type-id** : `z.literal('hero-utility-masthead')`
- **role** : Masthead page utilitaire — kicker opt. + h1 clamp 56-180px + lede display italique; variante d'alignement (left | centered)
- **template/page consommateur** : `src/components/templates/UtilityTemplate.astro` (`.util-hd`)
- **layout_family** : `centered`
- **props** :
  - `data` : `{ kicker_fr?, kicker_en?, h1_fr, h1_en, lede_fr, lede_en, align?: 'left' | 'centered' }`
  - `lang: 'fr' | 'en'`
  - `wrapMaxWidth?`, `reveal?`
- **css_vars** : `--hairline`, `--font-display`, `--ink-2`, `--ink`, `--accent`
- **css_classes** : `.hero-utility-masthead`, `.hero-utility-masthead__wrap`, `.hero-utility-masthead[data-align="centered"]`, `.hero-utility-masthead__kicker`, `.hero-utility-masthead__h1`, `.hero-utility-masthead__lede`
- **status** : `FUSIONNABLE avec HeroCentered, HeroHubMasthead, HeroProblemIndex, HeroHubListing`
- **notes** : Centré le plus polyvalent (kicker optionnel + `align` left|centered + `reveal`). Candidat noyau alternatif pour `hero-generic-centered`.

---

## Synthèse

### Tableau layout_family → membres

| layout_family | Membres | Nb |
|---|---|---|
| `centered` | HeroAcademyHub, HeroCentered, HeroCourse, HeroDetailMenu, HeroEssay*, HeroHubListing, HeroHubMasthead, HeroLanding†, HeroProblemIndex, HeroUtilityMasthead | 10 |
| `split` | HeroAuthor, HeroLeadMagnet, HeroSplit | 3 |
| `masthead-geo` | HeroOfferDetail, HeroSector, HeroTechLayer | 3 |
| `stats` | HeroHubStats, HeroPillarHub | 2 |
| `service-kicker` | HeroServiceDetail, HeroServiceMasthead | 2 |
| `centered-rich` | HeroConversionFunnel | 1 |
| `full-bleed` | HeroFullBleed | 1 |
| `liquid-animated` | HeroLiquid | 1 |
| `masthead-meta` | HeroCaseStudy | 1 |
| `funnel` | HeroTunnelStep | 1 |
| `unique` | HeroHome | 1 |

> \* HeroEssay est centré mais avec méta-ligne éditoriale + image full-width — conserver séparé.
> † HeroLanding est centré mais utilise `--font-serif` (token distinct) — conserver ou var.

---

### Recommandation fusion DA (26 → 8 composants génériques)

**Objectif : passer de 26 héros à ~8 héros génériques à variantes** sans perte de capacité expressive.

#### Fusion 1 — `hero-generic-centered` (absorbe 8 héros, conserve 2 éditoriaux)

Fusionner : **HeroCentered + HeroHubMasthead + HeroUtilityMasthead + HeroHubListing + HeroProblemIndex + HeroAcademyHub + HeroCourse + HeroDetailMenu**

Props cumulées (tout optionnel sauf h1) :
```
{ kicker_fr?, kicker_en?, h1_fr, h1_en, lede_fr, lede_en,
  cta_primary?, cta_secondary?,
  stats?[{value, label_fr, label_en}],   // AcademyHub, HubStats subset
  pills?[{label_fr, label_en}],           // Course
  canonical_fr?, canonical_en?,           // ProblemIndex
  decoration?: 'circles' | 'geo-rects',  // HubListing, ProblemIndex
  align?: 'left' | 'centered',           // UtilityMasthead
  topPad?, wrapMaxWidth?
}
```
Conserver séparément (trop spécifiques) : **HeroEssay** (méta éditoriale + image), **HeroLanding** (`--font-serif`).

#### Fusion 2 — `hero-generic-service` (absorbe 2 héros)

Fusionner : **HeroServiceDetail + HeroServiceMasthead**

Props :
```
{ service_num, h1_fr, h1_en, lede_fr, lede_en,
  metrics?[{value, label_fr, label_en}],
  topPad?
}
```

#### Fusion 3 — `hero-generic-masthead-geo` (absorbe 3 héros)

Fusionner : **HeroOfferDetail + HeroSector + HeroTechLayer**

Sous-grille 1.4fr/1fr partagée + lead italique + CTA ink-button. Différences encapsulées via variantes :
```
{ geoShape: 'circles' | 'rects' | 'triangles',
  labelKind: 'breadcrumb-tier' | 'dept' | 'layer',
  label_fr, label_en,
  sublabel_fr?, sublabel_en?,             // tier (Offres) / dept (Sector) / layer-type (Tech)
  h1_fr, h1_en,
  lead_fr, lead_en,
  cta{href, label_fr, label_en},
  meta_fr?, meta_en?,
  tags?[{label_fr, label_en}],           // Sector uniquement
  layer_type?: 'claude' | 'os' | 'orch', // TechLayer uniquement
  breadcrumb_href?, breadcrumbCurrent?,  // Offres uniquement
  wrapMax?, geoReveal?,
  transitionId?, cardTransitionId?       // VT (Offres + TechLayer)
}
```

#### Fusion 4 — `hero-generic-stats` (absorbe 2 héros)

Fusionner : **HeroHubStats + HeroPillarHub**

```
{ meta_kicker_fr, meta_kicker_en, hub_num,
  h1_fr, h1_en, lede_fr, lede_en,
  stats[{value, label_fr, label_en, emphasis?}],
  ledeDropCap?, useKeyMetric?
}
```

#### Conserver sans modification (8 héros spécifiques)

| Hero | Raison de conservation |
|---|---|
| **HeroHome** | Structure unique complexe (minimap 6 items + proofs + signature bg) |
| **HeroConversionFunnel** | Haute densité (benefits + proof + pills + stats) |
| **HeroSplit** | Split générique de référence (multiple consommateurs directs) |
| **HeroAuthor** | Split éditorial portrait + VT spécifique |
| **HeroLeadMagnet** | Split ressource (cover 3/4 + download bar) + VT |
| **HeroEssay** | Centré éditorial (méta auteur/date + image full-width) + VT |
| **HeroLanding** | Centré `--font-serif` + availability line (token typographique distinct) |
| **HeroCaseStudy** | Masthead-meta (spec-bar horizontale + cercles SVG — différent des masthead-geo) |
| **HeroLiquid** | React canvas animé — unique techniquement |
| **HeroFullBleed** | Full-bleed multi-fond via `data-bg` |
| **HeroTunnelStep** | Progression steps — unique fonctionnellement |

---

### Résultat final de fusion

| Avant | Après | Réduction |
|---|---|---|
| 26 héros distincts | **4 génériques** (centered, service, masthead-geo, stats) + **11 conservés** = **15 héros** | **−42 %** |

> Les 4 fusions prioritaires (gains immédiats, risque faible) sont dans l'ordre : **Fusion 2** (service, trivial — 2 composants quasi-identiques) · **Fusion 4** (stats, trivial) · **Fusion 3** (masthead-geo, modéré — SVG différent) · **Fusion 1** (centered, complexe — 8 composants + props cumulées).
