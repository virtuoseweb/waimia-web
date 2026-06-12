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

## 🔬 Vérifié 2026-06-03 (file:line) — le niveau-3 data-driven EXISTE et tourne en PROD

Triangulation anti-hallucination avant de planifier la suite (Simon : « éviter l'écart entre ce qu'on veut et ce qui est »). L'infra composable n'est ni à construire ni dormante :

| Brique | Preuve | État |
|---|---|---|
| Dispatcher data-driven | `src/components/sections/SectionsRenderer.astro` (`sections[]` → registry → `<Component data lang/>`) | ✅ construit |
| Schéma contenu accepte `sections` | `src/content.config.ts:125, 215, 282` `sections: sectionsArraySchema.optional()` (+ z-variants 529, 903) | ✅ sur plusieurs collections |
| Switch page | `src/pages/offres/[...slug].astro:44` `useComposable = Array.isArray(data.sections) && length>0` → `:51` `<SectionsRenderer>` sinon legacy. Jumeau EN `src/pages/en/offres/[...slug].astro` | ✅ câblé |
| Page composable LIVE en prod | `src/content/offres/composable-pilot.mdx` (4 sections : hero-split + proof-bar + method-timeline + cta-final), rendue via SectionsRenderer | ✅ servie |
| Banc de validation | `src/pages/test-composable.astro` (19 sections inline → renderer) | ✅ |
| Catalogue | 67 types (Phase A close, GF-1 prod ✅) | ✅ |

**Conclusion : l'écart est l'ADOPTION, pas l'architecture.** ~1 page composable sur des dizaines ; le reste rend via templates legacy (props).

### ⇒ Phase B RECADRÉE (vs la formulation initiale « réécrire les templates »)

Le niveau-3 cible n'est PAS « template embarque `const sections=[]` ». Le contrat réel (prouvé par `composable-pilot.mdx`) = **`sections:` vit dans le FRONTMATTER MDX du contenu** (`src/content/**`) = **de la DATA bilingue**, pas du code applicatif. Donc :

- **Phase B = AUTHORING de contenu** : pour chaque entrée de contenu (offres, solutions, technologies, école, tunnels, auteurs…), peupler `sections: [...]` en frontmatter MDX avec les types du catalogue, **fidèle au rendu legacy actuel**, page par page, GF-1 par page.
- La plupart des routes consommatrices ont DÉJÀ le switch `useComposable` (pattern `[...slug]`) ; celles qui ne l'ont pas reçoivent un micro-ajout du switch (worker).
- **Endgame** : quand toutes les entrées d'une collection sont composables → le template legacy correspondant est **retiré** (mort). C'est la vraie « digestion des composants » voulue.
- **Tina-ready par construction** : le contenu étant déjà dans `src/content/**`, la couche éditable (docs/36) se branche directement sur `sections[]` du frontmatter — pas de déplacement ultérieur.

A.2 (catalogue complet) reste le prérequis : on ne peut authorer `sections: [{type:'curriculum-table'}]` que si le type existe.

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

- [x] **Phase A — 6 types récurrents + 3 vt=0 = 9 types intégrés sur `main` (`2129b27`, registry 58→67)** — build vert + GF-1 9/9 (`/preview` parité prod, screenshot+getComputedStyle opacity=1/transform none/0 err console). Push `17ca677`. Travail SALVÉ de la fleet pré-compactage (Codex `wf-foundation-sections` + `waimia-components-missing`), PAS refait.
  - **GF-1 PROD final ✅ (2026-06-03, `2559f5e`)** : les 9 `/preview/<type>` répondent **HTTP 200 sur `waimia.com`** (deploy `bepspntuo` DEPLOYED). Échantillon Playwright sur prod déployée (3 types contrastés) = **3/3 OK** : `deliverables-grid` (H2 opacity 1, fontSize 51px), `welcome-section` (H1 opacity 1, 96px), `trust-legal-section` (H1 opacity 1, 102px, screenshot confirmé) — tous `transform:none`, `visibility:visible`, section opacity 1, bodyH 699-1311px, **0 erreur console**. Phase A close et servie en prod. **Tâche #10 (3 vt=0) = RÉSOLUE** : TrustLegal/Welcome/ListIndex ont désormais des composants catalogués dédiés (registry-driven, showcase auto).
- [ ] Phase A.2 — types one-off **restants** (variante-first). ⚠️ Scope réduit : les one-offs vt=0 (`doc-masthead`, `toc-editorial-layout`, `conversion-confirmation`, `next-steps-checklist`, `hero-list-index`) sont **ABSORBÉS** par les sections Phase A (trust-legal-section inclut masthead+TOC — confirmé screenshot prod ; welcome-section inclut confirmation+checklist ; list-index-section inclut le hero d'index). Restent à arbitrer (variante-first) : **Tech** (positioning-split, decision-dual, ecosystem-grid), **Solutions** (workflow-table, case-study-split), **École/Course** (curriculum-objectives, curriculum-table, course-chain, course-catalog-table, learning-path-list), **Author** (publications-index, social-links, expertise-bar, editorial-prose), **LeadMagnet** (abstract-strip, lead-magnet-form), **Funnel** (demo-mockup-band, contact-form-band, editorial-body) — le worker collapse en variantes quand un type existant + prop `variant` couvre le besoin (objectif harmonisation DA, ~19 candidats → ~12 types réels).
- [ ] Phase B — conversion 18 templates → data-driven `sections[]` + SectionsRenderer (par template, 1 worker/template)
- [ ] Couche éditable Tina (post-catalogue) — bridge documenté `docs/36` : `data-tina-field` dans SectionsRenderer + `IslandRegistry` + route `/tina-edit/` + `includeFiles` astro.config
- [ ] Track 2 — atomes/molécules (chiffrage + showcase)

## Leçon multi-session / post-compactage (GF-3 — 2026-06-03)

Le compactage efface la mémoire des **workers en vol**. Résultat ce jour : j'ai re-planifié + lancé un worker Opus **doublon** de la fondation qu'un worker Codex d'une session précédente produisait déjà (même worktree). Coût évité de justesse en vérifiant l'état AVANT de continuer.
**Réflexe à acquérir (à porter aussi en rule 35 global) — AVANT de planifier/lancer après une reprise ou un compactage :**
1. `ps aux | grep -E "claude -p|codex exec"` + `lsof -d cwd | grep <repo>` → workers en vol ?
2. `ls -lt /tmp/codex-missions/` → missions récentes d'autres sessions ?
3. `git status` + `git log --oneline -5` + `git worktree list` → artefacts non commités / branches actives ?
4. **Multi-session = frontière de FICHIERS, pas seulement de branche** : 2 sessions sur `main` mobile cohabitent SANS conflit tant que leurs ensembles de fichiers sont disjoints (ici : moi sections/schema/registry/templates, `3bcf2a5f` layouts/SEO/contenu). C'est la vraie règle anti-collision.
