# 10 — Utilitaires + Pages

> Inventaire structuré — branche `feat/contenu` · 2026-06-04
> Contrainte : lecture libre, AUCUNE modification des composants.
> Seule écriture = ce fichier.

---

## Composants utilitaires

### motion/AtlasConnections

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/motion/AtlasConnections.astro` |
| **Category** | motion |
| **Role** | SVG animé : connexions entre 4 piliers Atlas. Stroke-dashoffset draw-on via IntersectionObserver (threshold 0.3, stagger 180 ms). Hover : CSS `:hover scale(1.5)` + keyframe `atlas-pulse` 2,4 s. |
| **Props** | `class?: string` · `pillars?: { id: string, label: string, x: number, y: number }[]` (défaut : audit/adoption/orchestration/souveraineté) |
| **CSS vars** | `--accent` · `--font-mono` |
| **Consumers** | `src/pages/agence/design-system.astro` · `src/pages/atlas.astro` |
| **Status** | Actif — animated, IntersectionObserver, prefers-reduced-motion honoré |

---

### motion/BootSplash

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/motion/BootSplash.astro` |
| **Category** | motion |
| **Role** | Overlay cinématique CSS-pur au boot (1 100 ms visible + 620 ms fade-out = 1 720 ms). Migré depuis React island `client:only="react"` (-50 KB). |
| **Props** | `lang?: 'fr' \| 'en'` · `brand?: string` · `subtitleFr?: string` · `subtitleEn?: string` |
| **CSS vars** | `--paper` · `--font-display` · `--font-mono` · `--accent` · `--muted` |
| **Animation** | `@keyframes boot-fade` : 0 %→63,95 % `opacity:1`, 99 % `opacity:0`, 100 % `opacity:0` + `pointer-events:none` + `visibility:hidden`. `will-change: opacity`. `z-index: 200`. |
| **Consumers** | `src/layouts/Base.astro` · `src/pages/agence/design-system.astro` · `src/pages/index.astro` · `src/pages/en/index.astro` |
| **Status** | Actif — CSS-pur, aucune dépendance JS runtime |

> **Note** : le brief initial mentionnait 4 fichiers dans `motion/`. Seuls 2 `.astro` sont présents. Les autres composants motion (`LiquidHero.tsx`, `ProductReel.tsx`) sont des **React islands** (`.tsx`), hors périmètre `.astro`.

---

### svg/geometric/AuditMaturityTimeline

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/geometric/AuditMaturityTimeline.astro` |
| **Category** | svg/geometric |
| **Role** | Timeline SVG 560×180 représentant le process audit 10 jours : J1-J2 Cadrage → J3-J6 Terrain → J7-J8 Analyse → J9-J10 Restitution → DOC Signé (accent). |
| **Props** | `compact?: boolean` |
| **CSS vars** | `var(--waimia-accent, #C94F2E)` · `var(--paper-2, #F6F1E8)` · `currentColor` (ink via stroke) |
| **Fonts** | JetBrains Mono (classe `.am`) · Instrument Serif (classe `.as`) |
| **Consumers** | `src/pages/offres/audit-maturite-ia.astro` |
| **Status** | Actif — SVG statique, aucune animation |

---

### svg/geometric/ConseilAuditDiagram

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/geometric/ConseilAuditDiagram.astro` |
| **Category** | svg/geometric |
| **Role** | Diagramme radial SVG 560×360. Cercle central « CONSEIL Waimia » (accent) + 7 cercles satellites (Audit 01, Roadmap 02, Gouvernance 03, Dette 04, RPA 05, FinOps 06, Cyber 07) reliés par rayons. |
| **Props** | `compact?: boolean` |
| **CSS vars** | `var(--waimia-accent, #C94F2E)` · `var(--paper-2, #F6F1E8)` · `currentColor` (ink) |
| **Consumers** | `src/pages/offres/conseil.astro` |
| **Status** | Actif — SVG statique |

---

### svg/geometric/MethodeProcessDiagram

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/geometric/MethodeProcessDiagram.astro` |
| **Category** | svg/geometric |
| **Role** | Timeline de processus SVG 800×120 en 5 phases : 01 Cartographie · 02 Priorisation · 03 Câblage · 04 Mesure · 05 Passation. Animation IntersectionObserver : ligne draw-on (1,1 s) + nœuds spring-in (0,5 s, stagger 160 ms). Prop `active` met un nœud en accent. |
| **Props** | `active?: 0\|1\|2\|3\|4` · `variant?: 'default' \| 'compact'` |
| **CSS vars** | `var(--waimia-accent, #C94F2E)` · `--ink` |
| **Animation** | stroke-dashoffset draw (1,1 s) + `opacity`/`scale` spring cubic-bezier(0.34,1.56,0.64,1). Nœuds init `opacity:0, scale(0.6)`. prefers-reduced-motion honoré. Script IIFE inline. |
| **Consumers** | `src/components/templates/AuthorPageTemplate.astro` · `src/pages/agence/methode.astro` · `src/pages/en/agence/methode.astro` |
| **Status** | Actif — animated, IntersectionObserver |

---

### svg/geometric/RevOpsFunnel

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/geometric/RevOpsFunnel.astro` |
| **Category** | svg/geometric |
| **Role** | Entonnoir de conversion SVG 520×280, 4 couches : LEADS (100 %) → MQL (~58 %) → SQL (~24 %) → DEAL (×3,1 en accent). Chaque couche est un `rect` de largeur décroissante. |
| **Props** | `compact?: boolean` |
| **CSS vars** | `var(--waimia-accent, #C94F2E)` · `var(--paper-2, #F6F1E8)` · `currentColor` |
| **Consumers** | `src/pages/offres/revops.astro` |
| **Status** | Actif — SVG statique |

---

### svg/sumie/PortraitSimon

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/sumie/PortraitSimon.astro` |
| **Category** | svg/sumie |
| **Role** | Portrait sumi-e de Simon Beros (fondateur) SVG 240×320. Tracés multi-coups avec `stroke-width` et `stroke-dasharray` variés pour l'esthétique encre de Chine. Un tracé accent `#C94F2E` (détail oeil droit) en `variant==='default'`. |
| **Props** | `size?: 'sm' \| 'md' \| 'lg'` · `variant?: 'default' \| 'mono'` |
| **CSS vars** | `--ink-2` (via `color: var(--ink-2)`) |
| **Tailles** | `.portrait-sm` = 80 px · `.portrait-md` = 180 px · `.portrait-lg` = 280 px |
| **Consumers** | `src/components/templates/AuthorPageTemplate.astro` · `src/pages/agence/about.astro` |
| **Status** | Actif — SVG statique |

---

### svg/sumie/SecteurFinance

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/sumie/SecteurFinance.astro` |
| **Category** | svg/sumie |
| **Role** | Graphes financiers sumi-e SVG 480×320. Colonnes histogramme + courbe tendance tiretée + ombre. Diamant accent `#C94F2E` au sommet de la tendance en `variant==='default'`. |
| **Props** | `size?: 'sm' \| 'md' \| 'lg'` · `variant?: 'default' \| 'mono'` |
| **CSS vars** | `--ink-2` (via `color`) |
| **Tailles** | `.sumie-sector-sm` = 180 px · `.sumie-sector-md` = 360 px · `.sumie-sector-lg` = 480 px |
| **Consumers** | `src/components/templates/SolutionsDetailTemplate.astro` |
| **Status** | Actif — SVG statique |

---

### svg/sumie/SecteurIndustrie

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/sumie/SecteurIndustrie.astro` |
| **Category** | svg/sumie |
| **Role** | Atelier industriel sumi-e SVG 480×320. Sol d'atelier + silhouette opérateur. Croix/éclair accent `#C94F2E` en `variant==='default'`. |
| **Props** | `size?: 'sm' \| 'md' \| 'lg'` · `variant?: 'default' \| 'mono'` |
| **CSS vars** | `--ink-2` · classe `.sumie-sector` partagée |
| **Consumers** | `src/components/templates/SolutionsDetailTemplate.astro` |
| **Status** | Actif — SVG statique |

---

### svg/sumie/SecteurServicesB2B

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/svg/sumie/SecteurServicesB2B.astro` |
| **Category** | svg/sumie |
| **Role** | Réunion de consultants B2B sumi-e SVG 480×320. Table elliptique + 3 silhouettes autour. Diamant accent `#C94F2E` en `variant==='default'`. |
| **Props** | `size?: 'sm' \| 'md' \| 'lg'` · `variant?: 'default' \| 'mono'` |
| **CSS vars** | `--ink-2` · classe `.sumie-sector` partagée |
| **Consumers** | `src/components/templates/SolutionsDetailTemplate.astro` |
| **Status** | Actif — SVG statique |

---

### header/Header

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/header/Header.astro` (501 lignes) |
| **Category** | header |
| **Role** | En-tête global du site. Mega-menu desktop (panneaux data-cols 2/3/4 + bloc featured) + sheet mobile accordéon. Pur Astro SSR + script `is:inline` (~50 LoC). Aucun React island (-6 KB). Navigation MEGA_MENU data-driven, i18n FR/EN automatique depuis l'URL, CTA « Réserver un audit » avec `data-mag="0.18"`. |
| **Props** | Aucun (dérive `lang` de `Astro.url.pathname`) |
| **CSS vars** | `--accent` · `--paper-2` · `--ink` · `--ease` |
| **Features** | `is:inline` (évite bug Astro 6 + Vercel adapter virtual-path en dev) · `style is:global` (évite bug scoping Astro sur classes ajoutées runtime) · re-init `astro:page-load` (ViewTransitions ClientRouter) · guard `data-headerBound` anti double-init · ARIA complet (WCAG 2.4.5, 2.1.1, 4.1.2) : `aria-expanded`, `aria-haspopup="dialog"`, `inert`, `role="dialog"`, `aria-modal="true"` · navigation clavier complète (Arrow keys, Escape, Tab trap) |
| **Consumers** | `src/layouts/Base.astro` (primaire) · `src/pages/agence/design-system.astro` · `src/pages/archive.astro` · `src/pages/en/agence/design-system.astro` · `src/pages/preview/[type].astro` |
| **Status** | Actif — global, critique |

---

### footer/Footer

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/footer/Footer.astro` (456 lignes) |
| **Category** | footer |
| **Role** | Pied de page global. 5 colonnes éditoriales (FOOTER_COLS), trust badges, section newsletter, switcher langue, réseaux sociaux, copyright. Importe `NewsletterSignup`. Index DEV-only listant les 40 templates/pages/routes du projet. |
| **Props** | Aucun (dérive `lang` de l'URL) |
| **CSS vars** | `--ink` · `--muted` · `--accent` · `--hairline` · `--font-display` · `--font-mono` · `--paper-2` · `--ease` · `--paper` |
| **DEV index** | 40 entrées : Templates 01-18 · Pages statiques 19-20 · Homepages variants 21-24 · Hub landings 25-28 · Conversion 29-35 · API routes 36-40 |
| **Consumers** | `src/layouts/Base.astro` (primaire) · `EssayTemplate` · `TunnelStepTemplate` · `WelcomeTemplate` · `src/pages/agence/design-system.astro` · `src/pages/archive.astro` · `src/pages/en/index.astro` · `src/pages/index.astro` · `src/pages/preview/[type].astro` |
| **Status** | Actif — global, critique |

---

### library/ (vide)

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/library/` |
| **Category** | library |
| **Role** | Répertoire présent mais **vide** — aucun fichier `.astro` trouvé. |
| **Status** | Vide — peut être un emplacement réservé pour une future librairie de composants génériques |

---

### seo/JsonLd

| Champ      | Valeur |
|-----------|--------|
| **File**   | `src/components/seo/JsonLd.astro` (13 lignes) |
| **Category** | seo |
| **Role** | Injecte des blocs `<script type="application/ld+json">` dans `<head>`. Accepte un objet unique ou un tableau (itère sur chaque bloc). |
| **Props** | `data: Record<string, unknown> \| Array<Record<string, unknown>>` |
| **CSS vars** | Aucune |
| **Impl.** | `<script is:inline type="application/ld+json" set:html={JSON.stringify(b)}>` par bloc |
| **Consumers** | `src/layouts/Base.astro` · `FaqAccordion.astro` · `CourseDetailTemplate.astro` · `OffresDetailTemplate.astro` · `Breadcrumb.astro` · `src/pages/commerce/[type]/[slug].astro` · `src/pages/en/offres/index.astro` · `src/pages/offres/index.astro` |
| **Status** | Actif — utilitaire SEO critique |

---

## Carte routes → templates

Routes dynamiques avec `getStaticPaths()` + `getCollection()`.

| Route | Collection | Template | Notes |
|-------|-----------|----------|-------|
| `src/pages/[...slug].astro` | offres + solutions + technologies | `OffresDetailTemplate` / `SolutionsDetailTemplate` / `TechnologiesDetailTemplate` | Route catch-all racine, dispatche par type de collection |
| `src/pages/offres/[...slug].astro` | offres | `OffresDetailTemplate` | Route dédiée offres |
| `src/pages/offres/[...slug].astro` (EN) → `en/offres/[...slug].astro` | offres | `OffresDetailTemplate` | Miroir EN |
| `src/pages/cas/[...slug].astro` | cases | `CaseStudyTemplate` | Études de cas FR |
| `src/pages/en/cas/[...slug].astro` | cases | `CaseStudyTemplate` | Miroir EN |
| `src/pages/solutions/[...slug].astro` | solutions | `SolutionsDetailTemplate` | Solutions FR |
| `src/pages/en/solutions/[...slug].astro` | solutions | `SolutionsDetailTemplate` | Miroir EN |
| `src/pages/technologies/[...slug].astro` | technologies | `TechnologiesDetailTemplate` | Technologies FR |
| `src/pages/secteurs/[...slug].astro` | secteurs | `SolutionsDetailTemplate` | Réutilise le même template que Solutions |
| `src/pages/ressources/blog/[...slug].astro` | blog | `EssayTemplate` | Blog FR |
| `src/pages/en/ressources/blog/[...slug].astro` | blog | `EssayTemplate` | Miroir EN |
| `src/pages/ressources/cookbooks/[...slug].astro` | cookbooks | `EssayTemplate` | Cookbooks FR |
| `src/pages/ressources/veille-ia/[...slug].astro` | veilleIA | `EssayTemplate` | Veille IA FR |
| `src/pages/ressources/outils/[...slug].astro` | outils | `EssayTemplate` | Outils FR |
| `src/pages/ressources/livres-blancs/[...slug].astro` | livresBlancs | `LeadMagnetTemplate` | Lead magnets FR |
| `src/pages/bienvenue/[...slug].astro` | pages | `WelcomeTemplate` | Pages de bienvenue personnalisées |
| `src/pages/equipe/[...slug].astro` | authors | `AuthorPageTemplate` | Pages auteurs |
| `src/pages/glossaire/[slug].astro` | glossary | inline (Base + Kicker + Breadcrumb) | Pas de template dédié — rendu inline dans la page |
| `src/pages/integrations/[slug].astro` | integrations | inline (Base + Kicker + Breadcrumb) | Pas de template dédié — rendu inline |
| `src/pages/comparer/[slug].astro` | comparisons | inline (Base + Kicker + Breadcrumb) | Pas de template dédié — rendu inline |
| `src/pages/en/comparer/[slug].astro` | comparisons | inline (Base + Kicker + Breadcrumb) | Miroir EN |
| `src/pages/en/integrations/[slug].astro` | integrations | inline (Base + Kicker + Breadcrumb) | Miroir EN |
| `src/pages/ressources/field-notes/[slug].astro` | fieldNotes | inline (Base + Kicker + Breadcrumb) | Pas de template dédié |
| `src/pages/ressources/testimonials/[slug].astro` | testimonials | inline (Base + Kicker + Breadcrumb) | Pas de template dédié |
| `src/pages/ressources/personas/[slug].astro` | personas | inline (Base + Kicker + Breadcrumb) | Pas de template dédié |
| `src/pages/ecole/[type]/[slug].astro` | courses | `CourseDetailTemplate` | Cours par type FR |
| `src/pages/ecole/cours/[slug].astro` | courses | `CourseDetailTemplate` | Cours directs FR |
| `src/pages/offres/[offre]/tunnel/[step].astro` | tunnels | `TunnelStepTemplate` | Tunnel de conversion multi-step |
| `src/pages/commerce/[type]/[slug].astro` | commerce | inline (Base + Kicker + Breadcrumb + JsonLd produit) | Pas de template dédié — page commerce avec schema produit |
| `src/pages/ressources/categorie/[...slug].astro` | blog + cookbooks + livresBlancs + veilleIA + cases | inline (Base + CtaFinal) | Hub catégorie multi-collections |
| `src/pages/ressources/silo/[...slug].astro` | blog + cookbooks + livresBlancs + veilleIA + cases | inline (Base + CtaFinal) | Hub silo |
| `src/pages/ressources/tag/[...slug].astro` | blog + cookbooks + livresBlancs + veilleIA + cases | inline (Base + CtaFinal) | Hub tag |
| `src/pages/categories/[slug].astro` | section-registry (statique) | inline (Base + section-registry) | Catalogue sections par catégorie DS |
| `src/pages/preview/[type].astro` | sections (toutes) | inline (Header + Footer + rendu section) | Preview DS — toutes sections |
| `src/pages/components/[type].astro` | components | inline | Preview composants |

---

## Pages composées

Pages statiques construites sans template dédié, composant des organismes et sections.

| Page | Organismes / sections importés |
|------|-------------------------------|
| `src/pages/index.astro` | `Hero` · `ProofBarSection` · `SocialProof` · `FeatureGrid` · `SystemArchitecture` · `SixServices` · `Pyramid` · `Departments` · `Cases` · `FaqAccordion` · `FieldNotes` · `BookSession` · `FooterMarquee` · `BootSplash` · `ScrollProgress` · `SectionTransition` |
| `src/pages/en/index.astro` | Identique à `index.astro` FR (miroir EN complet) — mêmes 16 composants |
| `src/pages/atlas.astro` | `AtlasGrid` · `PersonaSwitcher` · `Cases` · `FieldNotes` · `CtaFinal` · `AtlasConnections` |
| `src/pages/manifesto.astro` | `LiquidHero` (React island) · `ManifestoAccent` · `EditorialWriteRow` · `AsymmetricServiceRow` · `EditorialCaseCard` · `Breadcrumb` · `Button` · `Kicker` · `PillCTA` |
| `src/pages/console.astro` | `ProductReel` (React island) · `TerminalMockup` · `EditorialWriteRow` · `TerminalTable` · `TerminalCTA` · `Kicker` |
| `src/pages/archive.astro` | `Header` · `Footer` (manual — hors Base layout) |
| `src/pages/contact.astro` | `UtilityTemplate` · `CalEmbed` · `Button` · `Kicker` · `FormErrors` |
| `src/pages/agence/about.astro` | `UtilityTemplate` · `PortraitSimon` · `Kicker` |
| `src/pages/agence/methode.astro` | `UtilityTemplate` · `Timeline` · `MethodeProcessDiagram` · `Kicker` |
| `src/pages/agence/design-system.astro` | `Base` + tous les atomes/molécules (catalogue complet DS) · `BootSplash` · `AtlasConnections` · `Header` · `Footer` · `SectionHeader` · `NewsletterSignup` · `PainPointInline` · `ShareButtons` · `StatRow` · `TechPillRow` · `RelatedCards` · etc. |
| `src/pages/offres/index.astro` | `Base` · `Kicker` · `CtaFinal` · `Breadcrumb` |
| `src/pages/offres/conseil.astro` | `HubTemplate` · `ServiceCatalogRow` · `EditorialTable` · `ConseilAuditDiagram` |
| `src/pages/offres/audit-maturite-ia.astro` | `DetailMenuTemplate` · `AuditMaturityTimeline` |
| `src/pages/offres/revops.astro` | `ServiceDetailTemplate` · `RevOpsFunnel` |
| `src/pages/solutions/index.astro` | `Base` · `Kicker` · `Cases` · `CtaFinal` |
| `src/pages/ressources/index.astro` | `Base` · `Kicker` · `CtaFinal` · `RelatedCards` · `Button` · `Bi` · `FormErrors` |
| `src/pages/ecole/index.astro` | `EcoleHubTemplate` (getCollection courses) |
| `src/pages/glossaire/index.astro` | `Base` · `Kicker` (inline, liste alphabétique) |
| `src/pages/integrations/index.astro` | `Base` · `Kicker` (inline, grille intégrations) |
| `src/pages/bienvenue/index.astro` | — (probablement redirect ou page bienvenue simple) |

---

## Synthèse

### Routes dynamiques par template

| Template | Nb de routes FR | EN mirror | Total |
|---------|----------------|-----------|-------|
| `EssayTemplate` | 4 (blog / cookbooks / veille-ia / outils) | 1 (en/blog) | 5 |
| `OffresDetailTemplate` | 2 (catch-all + /offres/) | 1 (en/offres) | 3 |
| `SolutionsDetailTemplate` | 2 (solutions + secteurs) | 1 (en/solutions) | 3 |
| `TechnologiesDetailTemplate` | 1 (technologies) | 0 | 1 |
| `CaseStudyTemplate` | 1 (cas) | 1 (en/cas) | 2 |
| `CourseDetailTemplate` | 2 (ecole/[type]/[slug] + ecole/cours/[slug]) | 0 | 2 |
| `LeadMagnetTemplate` | 1 (livres-blancs) | 0 | 1 |
| `AuthorPageTemplate` | 1 (equipe) | 0 | 1 |
| `WelcomeTemplate` | 1 (bienvenue) | 0 | 1 |
| `TunnelStepTemplate` | 1 (offres/[offre]/tunnel/[step]) | 0 | 1 |
| `HubTemplate` | 1 (offres/conseil) | 0 | 1 |
| `DetailMenuTemplate` | 1 (offres/audit-maturite-ia) | 0 | 1 |
| `ServiceDetailTemplate` | 1 (offres/revops) | 0 | 1 |
| `EcoleHubTemplate` | 1 (ecole/index) | 0 | 1 |
| inline (Base + composants) | 8 (glossaire/slug · integrations/slug · comparer/slug · ressources/categorie · silo · tag · field-notes · testimonials · personas · commerce · categories · preview · components) | 2 (en/comparer + en/integrations) | ~15 |

### Pages composées hors template (assemblées manuellement)

| Page | Complexité |
|------|-----------|
| `index.astro` | Haute — 16 organismes/sections |
| `en/index.astro` | Haute — 16 organismes/sections (miroir FR exact) |
| `atlas.astro` | Moyenne — 6 organismes |
| `manifesto.astro` | Moyenne — 9 composants dont React island |
| `console.astro` | Moyenne — 7 composants dont React island |
| `agence/design-system.astro` | Très haute — catalogue exhaustif DS (~20 composants) |
| `agence/about.astro` | Faible — `UtilityTemplate` + 2 composants |
| `agence/methode.astro` | Faible — `UtilityTemplate` + 3 composants |
| `contact.astro` | Faible — `UtilityTemplate` + Cal.com embed |
| `offres/conseil.astro` | Moyenne — `HubTemplate` + 3 |
| `offres/audit-maturite-ia.astro` | Faible — `DetailMenuTemplate` + SVG |
| `offres/revops.astro` | Faible — `ServiceDetailTemplate` + SVG |
| `archive.astro` | Faible — `Header` + `Footer` directs (pas de Base layout) |

### Doublons FR/EN confirmés

| Route FR | Route EN |
|----------|---------|
| `src/pages/index.astro` | `src/pages/en/index.astro` |
| `src/pages/offres/[...slug].astro` | `src/pages/en/offres/[...slug].astro` |
| `src/pages/solutions/[...slug].astro` | `src/pages/en/solutions/[...slug].astro` |
| `src/pages/cas/[...slug].astro` | `src/pages/en/cas/[...slug].astro` |
| `src/pages/ressources/blog/[...slug].astro` | `src/pages/en/ressources/blog/[...slug].astro` |
| `src/pages/comparer/[slug].astro` | `src/pages/en/comparer/[slug].astro` |
| `src/pages/integrations/[slug].astro` | `src/pages/en/integrations/[slug].astro` |
| `src/pages/agence/design-system.astro` | `src/pages/en/agence/design-system.astro` |
| `src/pages/agence/methode.astro` | `src/pages/en/agence/methode.astro` |

### Anomalies / points d'attention

- **`motion/`** : 2 fichiers `.astro` (AtlasConnections, BootSplash) — les 2 autres composants motion sont des React islands `.tsx` (`LiquidHero`, `ProductReel`), hors périmètre `.astro`.
- **`library/`** : répertoire vide — aucun composant `.astro` présent.
- **Routes inline sans template** : 13+ routes gèrent leur propre rendu (glossaire, intégrations, comparer, commerce, field-notes, testimonials, personas, categorie/silo/tag). Candidats à la création d'un template dédié si le contenu se diversifie.
- **`secteurs/[...slug].astro`** réutilise `SolutionsDetailTemplate` — couplage implicite à documenter si le template évolue.
- **`archive.astro`** importe `Header` + `Footer` directement (hors `Base` layout) — exception à la composition standard.
