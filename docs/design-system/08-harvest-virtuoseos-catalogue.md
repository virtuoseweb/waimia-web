# 08 — Récolte virtuoseOS → catalogue waimia (manifest durable)

> **But (Simon, 2026-06-15)** : ne plus JAMAIS reperdre ni avoir à re-chercher (« comme on l'a fait
> pendant 5 ans ») les composants/sections/animations distinctifs construits sur le site VirtuoseWeb
> (`~/Developer/sitewebastro`, alias « virtuoseOS »). Ce doc est l'**inventaire sourcé** (file:line +
> commit pour ce qui est en historique) de ce qui mérite d'être récolté pour enrichir le catalogue de
> sections waimia, **adapté EXCLUSIVEMENT aux tokens du DS Studio waimia** (rule 60, 0 hardcode).
>
> Rattaché au méga-chantier **[03-library-strategy](03-library-strategy.md)** (bibliothèque 1000+ blocks).
> Inscrit au plan : **[state/01-chantiers.md](../state/01-chantiers.md)** § « Récolte virtuoseOS ».
> Source : 2 scouts Explore read-only sur sitewebastro (2026-06-15). Les `:lignes` génériques sont à
> **revérifier au moment du build** (les scouts ont parfois donné des plages approximatives).

## Règle de récolte (à appliquer à CHAQUE item ci-dessous)

1. **Adapter aux tokens DS waimia**, jamais de valeur en dur (rule 60). Le CSS source virtuoseOS est
   déjà tokenisé (`var(--color-*)`, `var(--space-*)`, `var(--radius-*)`...) → la migration est un
   **mapping de rôles**, pas une réécriture de littéraux. Mapping de référence (vérifié sur agentic-terminal) :
   - `--color-bg-card`/`--color-bg-secondary` → `var(--ink)` / `var(--ink-2)` / `var(--ink-3)` (fonds sombres)
   - `--color-accent-*` / cyan / gold / pillar → `var(--accent)` (+ `rgba(var(--accent-rgb), .06/.12/.3)`)
   - texte clair → `var(--paper)` / `rgba(var(--paper-rgb), .86/.72/.55)`
   - `--color-text-*` → `var(--ink)` / `var(--muted)` ; radius/space/text/font/leading → tokens homonymes waimia
   - **rôle « succès/ok »** : waimia n'a PAS de token success/green → mapper sur `var(--accent)`.
   - Seuls littéraux tolérés : pastilles OS rouge/jaune/vert d'un terminal, `1px` hairline, valeurs
     structurelles de grille sans token de rôle (ex. `220px 1fr`).
2. **Cataloguer = 5 touchpoints synchronisés** (calquer `product-reel` / `agentic-terminal`, déjà faits) :
   schema `src/schemas/sections.ts` (z.object + ajout à la `discriminatedUnion`), demo `src/lib/section-demos.ts`,
   registry `src/lib/section-registry.ts` (import + entrée catégorie/tags), wrapper `.astro` + island
   `motion/*.tsx` si interactif, manifest `src/lib/library-manifest.ts` (`{ id, consumers: [] }`).
   Gate `npm run check:touchpoints` doit rester vert.
3. **GF-1** avant « fait » : `check:touchpoints` + `check:no-emdash` + `pnpm build` + preuve Playwright
   (`/preview/<type>` : opacity, animation effective, reduced-motion).
4. **Anti-doublon** : waimia a déjà ~153 types. Vérifier qu'aucune famille existante ne couvre déjà le rôle
   AVANT de cataloguer (rule 60-A). Les items marqués « possible doublon » ci-dessous sont à arbitrer.

## Statut

- ✅ **Déjà récoltés** : `product-reel` (terminal scroll-driven 2 colonnes) · `agentic-terminal`
  (IDE mockup à écriture live) catégorie « Terminal Sections » · `challenges-grid` (pain-points 2×2,
  item B9, catégorie Feature Sections) · `journey-steps` (parcours 3 temps, item B10, catégorie
  Process Sections) récoltés le 2026-06-15, tokens DS exclusifs, GF-1 vérifié.
- ⏳ **Backlog ci-dessous** : par valeur de récolte décroissante.

---

## A. Composants / atomes interactifs & animés (scout #1)

| # | Nom | Type | Source (à revérifier) | Fonction | JS/anim | Adapt. DS | Valeur | Note doublon waimia |
|---|---|---|---|---|---|---|---|---|
| A1 | **BeamTimeline** | Svelte | `src/lib/components/ui/BeamTimeline.svelte` | Timeline verticale, « beam » qui s'allume au scroll (sync Lenis) | Canvas + scroll sync Lenis | faible | **HAUTE** | distinct des timelines waimia (statiques) |
| A2 | **ZigzagTimeline** | Svelte | `src/lib/components/ui/ZigzagTimeline.svelte` | Timeline zigzag G/D, beam + cards activées au scroll | Canvas + Lenis | faible | **HAUTE** | distinct |
| A3 | **TiltCard** | Svelte | `src/lib/components/ui/TiltCard.svelte` | Carte 3D tilt souris X/Y + mockup device | RAF mouse + perspective | moyenne | **HAUTE** | absent waimia |
| A4 | **CardStack** | Svelte | `src/lib/components/ui/CardStack.svelte` | Pile de cartes rotation 3D + autoplay pause-hover | setInterval + transforms 3D | faible | **HAUTE** | absent |
| A5 | **NeuralNetwork** | Svelte | `src/lib/components/ui/NeuralNetwork.svelte` | Visualisation workflow canvas (nœuds zigzag, particules, hover step) | Canvas 2D + throttling | élevée | **HAUTE** | absent (wow-factor IA) |
| A6 | **Spotlight** | Svelte | `src/lib/components/ui/Spotlight.svelte` | Halo lumineux qui suit le curseur | RAF mouse throttled | faible | **HAUTE** | absent |
| A7 | **FloatingParticles** | Svelte | `src/lib/components/ui/FloatingParticles.svelte` | Particules flottantes décoratives canvas | Canvas + RAF | faible | **HAUTE** | absent |
| A8 | **AuroraGradient** | Svelte | `src/lib/components/ui/AuroraGradient.svelte` (+ `components/ui/AuroraGradientCSS.astro`) | Orbes aurora flottantes/blend, pause au scroll | CSS @keyframes | faible | **MOYENNE** | à vérifier vs effets waimia |
| A9 | **StaggerReveal** | Svelte | `src/lib/components/ui/StaggerReveal.svelte` | Wrapper reveal stagger des enfants au scroll (4 directions) | IntersectionObserver | faible | **MOYENNE** | waimia a data-reveal — comparer |
| A10 | **BeforeAfterSlider** | Svelte | `src/lib/components/ui/BeforeAfterSlider.svelte` | Comparateur avant/après drag split-screen | events drag/touch | faible | **MOYENNE** | waimia a comparison-duo — comparer |
| A11 | **GlassPricingCard** | Svelte | `src/lib/components/ui/GlassPricingCard.svelte` | Carte pricing glassmorphism + toggle one-shot/abo + NumberTicker | NumberTicker | faible | **MOYENNE** | waimia a Pricing — angle glass distinct |
| A12 | **TestimonialCarousel** | Svelte | `src/lib/components/ui/TestimonialCarousel.svelte` | Carousel témoignages premium autoplay + dots/arrows | setInterval + nav | faible | **MOYENNE** | waimia a Testimonial (10) — arbitrer |
| A13 | **NumberTicker** | Svelte | (sous-composant de GlassPricingCard) | Compteur animé de nombres | RAF | faible | **MOYENNE** | utile transverse (stats) |
| A14 | **Recettes CSS bento / solution / ai-lab** | CSS | `src/styles/design-system/recipes.css:700-1900` | 50+ recettes : bento-mirror, stacking-card-solution, ai-lab-cap-*, differentiators-bento-grid | CSS-only | très faible | **HAUTE** | source de patterns layout |

## B. Sections / blocs de page (scout #2)

| # | Nom | Source (à revérifier) | Fonction | Adapt. DS | Valeur | Note doublon waimia |
|---|---|---|---|---|---|---|
| B1 | **ProcessCard 5-phases numérotées** | `src/pages/notre-approche.astro:17-53` | 5 étapes : numéro + titre + desc + livrables grid 2×2, couleur par phase | faible | **HAUTE** | waimia Process (2) plus simple — angle « méthode colorée » distinct |
| B2 | **Comparatif 3-col (Agence/Freelance/Nous)** | `src/components/sections/ComparisonTable3Col.astro` | Table 3 colonnes, 7 critères, fond alterné | faible | **HAUTE** | waimia a 10 Comparison — vérifier si 3-col positionnement existe |
| B3 | **Story prose narrative** | `src/pages/pourquoi-virtuoseweb.astro:174-197` | Section éditoriale 3 paragraphes, badge, h2, liens internes | très faible | **MOYENNE** | proche about-story-split — arbitrer |
| B4 | **Guarantees 4-card grid** | `src/pages/pourquoi-virtuoseweb.astro:232-250` | 4 cartes garanties (icône + titre + texte) | très faible | **HAUTE** | proche Trust — angle « garanties » distinct |
| B5 | **Testimonials 3-col + guillemets FR** | `src/pages/pourquoi-virtuoseweb.astro:252-271` | 3 témoignages, guillemets FR en pseudo-éléments (identité marque) | très faible | **MOYENNE** | waimia Testimonial — angle typo distinct |
| B6 | **Stats bento 2×2→4-col** | `src/pages/a-propos.astro:105-116` | 4 stats animées (StaggerReveal), grid responsive | faible | **HAUTE** | waimia a 8 Stats — comparer densité |
| B7 | **Values card grid 2×2 (hover color-shift)** | `src/pages/a-propos.astro:147-167` | 4 valeurs, emoji large, hover transition couleur | très faible | **HAUTE** | absent (bloc « valeurs/convictions ») |
| B8 | **Timeline vertical→horizontal (jalons)** | `src/pages/a-propos.astro:170-194` | Jalons année, vertical mobile / horizontal desktop, ligne gradient | moyenne | **MOYENNE** | waimia a Timeline — responsive distinct |
| B9 | **Challenges 2×2 (pain-points persona)** | `src/components/sections/PersonaChallenges.astro` | 4 pain-points, numéro coin, border-left accent, hover | très faible | **HAUTE** | absent (bloc problème) |
| B10 | **Journey horizontal 3-steps** | `src/components/sections/PersonaJourney.astro` | 3 étapes parcours, icône cercle + numéro + highlight-pill, connecteur | moyenne | **HAUTE** | absent (funnel/onboarding) |
| B11 | **ProblemAgitator (pain-points warning)** | `src/components/sections/ProblemAgitator.astro` | Pain-points grid 1→2col, icône cercle, border-left warning, hook italic | très faible | **MOYENNE** | proche B9 — choisir l'un |
| B12 | **ServiceSectorMosaic (bento premium)** | `src/components/services/templates/sections/ServiceSectorMosaic.astro` | Bento asymétrique (2 featured span-2 + 3), gradient-border-top color-coded, mesh glow, 0 JS | faible | **HAUTE** | style Linear/Stripe — distinct |
| B13 | **CaseStudyHero split** | `src/components/sections/CaseStudyHero.astro` | Hero cas client (logo + name + badges industrie/taille) + titre + meta + 2 CTA + image, Aurora optionnel | très faible | **HAUTE** | waimia a CaseStudy — vérifier ce hero précis |

## C. Rejetés (trop métier virtuoseOS, non réutilisables tels quels)

PersonaJourney/Challenges en tant que **données** (garder le LAYOUT, pas le contenu), PackComparison,
RelatedCaseStudies, LeadMagnetFormAdvanced, composants devis/pricing/quiz app-level, templates
Service/Blog/Technology (trop structurés sur le modèle de données VirtuoseWeb).

## D. Ordre de récolte recommandé (quand on exécute, par vagues)

1. **Vague « wow-factor distinctif »** (absent waimia, fort impact) : A3 TiltCard, A4 CardStack, A6 Spotlight,
   A7 FloatingParticles, B7 Values-grid, B9 Challenges, B10 Journey, B12 SectorMosaic.
2. **Vague « scroll-driven »** (dépend de Lenis — vérifier l'intégration scroll waimia avant) : A1 BeamTimeline,
   A2 ZigzagTimeline, A5 NeuralNetwork.
3. **Vague « éditorial »** (arbitrer les doublons) : B1 ProcessCard, B2 Comparatif-3col, B4 Guarantees,
   B6 Stats-bento, B13 CaseStudyHero.
4. **Infra** : A14 recettes CSS (source d'inspiration de patterns, pas un import brut — re-tokeniser).

> ⚠️ Dépendance **Lenis** pour A1/A2 : vérifier si waimia utilise déjà un smooth-scroll compatible AVANT
> de récolter les composants beam scroll-driven (sinon, soit intégrer Lenis, soit réimplémenter en
> IntersectionObserver + scroll progress natif).

## E. Traçabilité

- Inventaire produit par 2 scouts Explore read-only sur `~/Developer/sitewebastro` le 2026-06-15.
- Composants valables retirés de `main` mais présents en historique : la section « Agentic Terminal »
  (commit `2c3ff88`) — DÉJÀ récoltée. Les autres retraits étaient trop métier (cf §C).
- Ce manifest est la **source de vérité unique** de la récolte virtuoseOS (rule 59). Toute récolte
  effectuée → cocher l'item ici (statut ✅) + mettre à jour le compteur du catalogue.
