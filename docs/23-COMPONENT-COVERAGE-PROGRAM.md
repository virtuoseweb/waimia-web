# 23 — Programme couverture composants (au-delà des heroes)

> Déclencheur Simon (2026-06-03) : « j'ai l'impression que tu as fais le travail que pour les hero ; il faut avoir TOUTE les sections et type de composants selon les rubriques et catégorie et élément qu'on a déjà donné. Lance des workers, chacun traite une catégorie avec l'ensemble des pages, missions longues. »
>
> Constat : la migration heroes (13/18) ne touche que le **masthead** de chaque template. ~88 `<section>` de **contenu** restent rendues en inline, alors que le registry expose déjà 32 types de contenu non consommés. Ce programme étend la standardisation à TOUTES les sections + complète le catalogue.

## ✅ Architecture confirmée (2026-06-03) — l'écart est d'ADOPTION, pas d'architecture

Vérifié empiriquement (anti-hallucination) : le modèle « définition unique → instances → design global propagé + contenu via props + DS fermé adaptable » **existe déjà**, NE PAS le refactoriser :
- `section-registry.ts` : 1 type → 1 composant (def unique). `SectionsRenderer.astro` (V2, 2026-05-15) : `sections[]` Zod → registry → `<Component data lang/>` = **renderer data-driven déjà construit** (jamais adopté par les templates).
- 58/62 composants prennent `data: SectionByType<...>` (contenu via prop typée). `tokens.css` = 127 tokens, **953 `var(--token)` dans sections, 0 hex en dur** (DS fermé réel).

**3 niveaux d'industrialisation d'un template :**
1. **Inline** (88 sections actuelles) — markup+contenu fusionnés, non-propageable. ❌
2. **Instance explicite** (mes migrations hero) — `<HeroX data={obj} lang/>`. Design propagé, contenu en frontmatter. ✅
3. **Data-driven** (cible max, outillée) — `const sections: SectionData[] = […]` → `<SectionsRenderer sections lang/>`. Contenu = data pure CMS/Tina-ready, template fin. ✅✅

→ Le travail = finir l'adoption (inline→instance) + compléter le catalogue. **Discipline ajoutée : variante-first** (réutiliser type existant + prop `variant` avant de créer un nouveau type ; ~25→~12) + override par instance via CSS custom props + curation différée (`status:'provisional'` + scorecard).

## État de départ (mesuré 2026-06-03)

- **Registry** : 58 types (`section-registry.ts`), tous `category: 'marketing'`, groupés par `subcategory` : Hero Header ×26, Feature ×11, CTA ×5, Timeline ×4, Stats ×3, Testimonial ×2, Logo ×2, FAQ ×2, Pricing/Gallery/Comparison ×1.
- **Showcase = piloté par le registry** : routes dynamiques `/components/[type]`, `/preview/[type]`, `/categories/[slug]`, `/agence/design-system`. Ajouter un type → il apparaît automatiquement. **0 page à créer à la main.**
- **Templates** : 18. Consomment surtout le hero (+ parfois CtaFinal/MethodTimeline/ProofBar). ~88 sections de contenu encore inline.
- **Atomes/molécules** : `src/components/editorial/` (8 : Callout, Dingbat, DropCap, EditorialTable, KeyMetric, PullQuote, Sidenote, Timeline) + `src/components/ui/` (React islands) + header/footer/library/motion/svg. **Pas de registry ni de showcase atomic-design** (≠ section-registry). → chantier distinct (track 2).

## Gap map — sections inline → type catalogue (recon 4 agents)

### Patterns RÉCURRENTS (forte valeur catalogue — Phase A)

| Type à créer | Consommé par | Source inline (ancre CSS) | Nature |
|---|---|---|---|
| `deliverables-grid` | Offres, ServiceDetail, DetailMenu (3×) | `off-deliverables`/`del-tag`, `dt-deliverables`, svc §03 | grille livrables tagués (format+durée) |
| `tech-stack-band` | ServiceDetail, DetailMenu, CaseStudy, ConversionFunnel (4×) | `cf-stack`, `dt-stack`, `case-stack`, svc §05 (TechPillRow) | lead + rangée de pills techno |
| `related-cards-band` | ServiceDetail, Hub, DetailMenu (3×) | RelatedCards molecule + kicker | cartes contenus connexes |
| `pull-quote-block` | Hub, AuthorPage (2×) | `hub-closing`, `author-pullquote` (PullQuote) | citation de marque standalone |
| `inclusions-list` | Offres, Solutions (2×) | `·`-list, `ws-sep` | flux inclusions séparées |
| `problem-statement` | Offres, ServiceDetail, DetailMenu (3×) | display text + ProofBar/stats | énoncé problème macro-typo |

### One-off (1 template — Phase B/C, créés au fil de la migration du template)

- **Tech** : `positioning-split`, `decision-dual`, `ecosystem-grid`, (capabilities→`spec-bar` fidélité), (models→`comparison-table` fidélité)
- **Solutions** : `workflow-table`, `case-study-split`, (ROI→`stat-block` dark), (pains→`timeline-block`)
- **École/Course** : `curriculum-objectives`, `curriculum-table`, `course-chain`, `course-catalog-table`, `learning-path-list`
- **AuthorPage** : `publications-index`, `social-links`, `expertise-bar`, `editorial-prose`
- **LeadMagnet** : `abstract-strip`, `lead-magnet-form`
- **Funnel/Tunnel** : `demo-mockup-band`, `contact-form-band`, `editorial-body`
- **TrustLegal** (vt=0) : `doc-masthead`, `toc-editorial-layout`
- **Welcome** (vt=0) : `conversion-confirmation`, `next-steps-checklist`
- **ListIndex** (vt=0) : `hero-list-index`

### Deltas fidélité à résoudre sur types EXISTANTS

`method-timeline` (props editorial vs catalogue), `pricing-table` (interface Tier custom vs schema), `comparison-table` (narratif vs bool), `faq-accordion` (mono vs bilingue ; + variante statique 2-col), `spec-bar` (feature-check vs tableau K/V), `social-proof`/`testimonial-block` (quote+metrics vs avatar/auteur).

## Décomposition collision-safe (le modèle « 1 worker = 1 catégorie » collisionne sur les templates multi-types)

- **Phase A — Fondation** (additive pure) : créer les 6 types récurrents (composant fidèle + 4 touchpoints), build vert, GF-1 sur `/preview/<type>`. 1 worker long (worktree). N'édite AUCUN template. Branche `feat/catalog-reusable-sections`.
- **Phase A.2 — Types one-off** (additive, après merge A) : créer tous les types one-off restants (variante-first : réutiliser type existant + prop `variant` quand possible, sinon nouveau type), registry COMPLET avant conversion. Worktree + merge série (édite les 3 fichiers partagés).
- **Phase B — Conversion templates → DATA-DRIVEN niveau 3** (DÉCISION Simon 2026-06-03) : chaque template restructuré en `const sections: SectionData[] = [...]` → `<SectionsRenderer sections={sections} lang/>`. Tous les types existant (A+A.2), le worker ne touche QUE son template → **1 worker = 1 template = 0 collision**, parallélisable. GF-1 par page.
  - **slots/islands/MDX** : MDX/corps riche → type `editorial-body` (data = HTML rendu) ; islands (forms/accordéons) → type de section dont le composant rend l'island `client:load` piloté par data ; sections conditionnelles → `push()` dans le tableau.
  - **Étape CMS ultérieure (non engagée)** : déplacer `sections[]` dans le frontmatter Tina → édition contenu hors-code.
- **Phase C — Track atomes/molécules** : registry + showcase atomic-design séparés (boutons/badges/inputs/tabs/breadcrumbs/…). Chiffrage en cours (recon track 2).

## Règles d'exécution (rappel)

- 4 touchpoints synchronisés par type (schema/demos/registry/composant) sinon build cassé.
- Composant : reproduire FIDÈLEMENT le markup+CSS inline, paramétrer via schema. Le rendu par défaut du composant doit garder le sweep vert (58→N/N).
- GF-1 = orchestrateur (Opus) sur preview/prod déployée, PAS le worker (rule 09). Worker = build vert + rapport.
- Workers ne committent pas. Orchestrateur merge après vérif indépendante.

## Suivi des vagues

- [⏳] Phase A — 6 types récurrents (worker `feat/catalog-reusable-sections`, en cours `b2rax30zn`)
- [ ] Phase A.2 — types one-off (variante-first)
- [ ] Phase B — conversion 18 templates → data-driven `sections[]` + SectionsRenderer (par template)
- [ ] Track 2 — atomes/molécules (chiffrage + showcase)
