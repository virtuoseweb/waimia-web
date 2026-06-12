# 13 — MATRICE DE COUVERTURE 100 % (usage → catégorie → canonique)

> **But (consigne Simon 2026-06-04)** : traiter 100 % des sections utilisées dans les pages ET templates, les ranger dans la bonne catégorie, désigner le modèle canonique par catégorie → base pour décider quoi convertir vers le data-driven var-compatible. **Zéro invention** (les 6 GAPs restent gelés).
> Source : 4 agents de lecture source-vérifiés (2026-06-04), corrigeant `04-organisms.md` et `08-templates-b.md` (périmés sur plusieurs points). Méthode « live » = rendu par un `templates/*`, une `pages/*` (hors pages catalogue), ou un MDX `sections:`.

## 0. Preuve de couverture 100 %

| Univers | Total | Traités dans cette matrice |
|---|---|---|
| type-ids registry | 67 | 67 (§1) |
| Organismes bespoke `ui/organisms/*` | 21 | 21 (§3) |
| Templates `templates/*` | 18 | 18 (§2) |
| Pages composeuses directes | 19 | 19 (§2) |
| **Éléments rendus LIVE distincts** | **33** (21 type-ids live + 12 organismes live) | **33 mappés catégorie+statut** ✅ |

**0 omission** : tout composant `sections/*` ou `ui/organisms/*` grep-trouvé dans `templates/` ou `pages/` figure ci-dessous. Les 46 type-ids `catalogue-only` + 9 organismes non-live sont aussi inventoriés (curation).

## 1. Catalogue (67 type-ids) — catégorie + consommation

**Live (21)** — consommés en prod :

| type-id | categorySlug | composant | où (live) |
|---|---|---|---|
| hero-offer-detail | hero-header | HeroOfferDetail | tpl OffresDetail |
| hero-tech-layer | hero-header | HeroOfferDetail | tpl TechnologiesDetail |
| hero-service-detail | hero-header | HeroServiceDetail | tpl ServiceDetail |
| hero-case-study | hero-header | HeroCaseStudy | tpl CaseStudy |
| hero-utility-masthead | hero-header | HeroUtilityMasthead | tpl Utility |
| hero-academy-hub | hero-header | HeroAcademyHub | tpl EcoleHub |
| hero-conversion-funnel | hero-header | HeroConversionFunnel | tpl ConversionFunnel |
| hero-hub-stats | hero-header | HeroHubStats | tpl Hub |
| hero-detail-menu | hero-header | HeroDetailMenu | tpl DetailMenu |
| hero-author | hero-header | HeroAuthor | tpl AuthorPage |
| hero-lead-magnet | hero-header | HeroLeadMagnet | tpl LeadMagnet |
| hero-course | hero-header | HeroCourse | tpl CourseDetail |
| hero-essay | hero-header | HeroEssay | tpl Essay |
| hero-split | hero-header | HeroSplit | mdx composable-pilot |
| proof-bar | stats | ProofBarSection | tpl ServiceDetail/DetailMenu + home + mdx |
| method-timeline | timelines | MethodTimeline | tpl ServiceDetail/CaseStudy/DetailMenu + mdx |
| feature-grid | feature | FeatureGrid | pages index FR/EN |
| social-proof | logo | SocialProof | pages index + technologies/index |
| faq-accordion | faq | FaqAccordion | pages index FR/EN |
| cta-final | cta | CtaFinal | 5 tpl + ~15 pages + mdx |
| cta-band | cta | CtaBandSection | tpl TrustLegal/ListIndex/Essay |

**Catalogue-only (46)** — jamais consommés en prod (curation : garder comme variante dispo, ou archiver) :
`hero-centered, hero-full-bleed, hero-hub-listing, hero-pillar-hub, hero-home, hero-landing, hero-problem-index, hero-sector, hero-hub-masthead, hero-service-masthead, hero-tunnel-step, hero-liquid` (12 héros) · `trust-legal-section, welcome-section, list-index-section` (3 vt=0) · `marquee-band, problems-grid, why-stalls, how-we-ship, operating-layer, manifesto-block, stat-block, comparison-table, timeline-block, media-block, pricing-table, objection-handler, cta-inline, testimonial-block, guarantee-block, architecture-diagram, services-grid, maturity-pyramid, use-case-index, case-card-grid, commitments-grid, branded-callout, editorial-preview, newsletter-band, spec-bar, deliverables-grid, tech-stack-band, related-cards-band, pull-quote-block, inclusions-list, problem-statement` (31).

## 2. Usage : templates + pages (100 % hardcoded — cible de conversion)

**Constat structurel** : **0/18 templates est data-driven**. Tout le rendu live passe par import direct. 3 templates (Solutions, TunnelStep, Welcome) + `console.astro` = 100 % markup inline (aucun composant catalogué).

Sections `sections/*` rendues en dur par templates (16 distinctes) : 12 héros + `MethodTimeline` (3 tpl), `CtaFinal` (5 tpl), `CtaBandSection` (3 tpl), `ProofBarSection` (2 tpl).

Pages composeuses directes (19) : home `index.astro`+`en/index.astro` (9 organismes + ProofBarSection/SocialProof/FeatureGrid/FaqAccordion) · `atlas`+`en/atlas` (AtlasGrid/PersonaSwitcher/Cases/FieldNotes + CtaFinal) · `manifesto`+`en/manifesto` (ManifestoAccent) · 13 pages hub/listing (surtout `CtaFinal` boulonné).

## 3. Organismes bespoke (21) → jumeau catalogué + statut

| Statut | Organismes | Action |
|---|---|---|
| **MERGE→ (jumeau + live, cible conversion)** — 9 | Hero→`hero-home` · SystemArchitecture→`architecture-diagram` · SixServices→`services-grid` · Pyramid→`maturity-pyramid` · Departments→`use-case-index` · Cases→`case-card-grid` · FieldNotes→`editorial-preview` · BookSession→`cta-final` · FooterMarquee→`marquee-band` | Migrer home FR/EN (+atlas/solutions pour Cases/FieldNotes) vers le registry → retirer l'organism. GF-1 strict (home live). |
| **KEEP-bespoke** — 5 | AtlasGrid · CookiesBanner (global Base.astro, 100 % pages) · PersonaSwitcher · Stub (catch-all) · ManifestoAccent (à cataloguer plus tard, 2 pages) | Garder hors catalogue (chrome/infra). |
| **ORPHAN supprimés ✅ (FAIT `8df9546`)** — 7 | HowWeShip, Manifesto, OperatingLayer, WhyAIStalls, WritingNotes (jumeau catalogué = source unique) · Offices, SigBand (0 jumeau, 0 conso) | Suppression nette, 0 page touchée. **Fait** : manifest 21→14, 0 import mort (cf doc 15 §39). |

## 4. Canonique par catégorie (Phase 1c — proposition, curation Simon)

| Catégorie | Live (= déjà canonique de fait) | Variantes catalogue-only à arbitrer |
|---|---|---|
| hero-header | 14 héros live (1 par template) | 12 héros catalogue-only → famille « masthead éditorial » (hub-listing/hub-masthead/problem-index/utility-masthead) candidate fusion ; centered/full-bleed/landing/liquid à trancher |
| cta | `cta-final` (dominant), `cta-band` | `cta-inline`, `newsletter-band`, `branded-callout` |
| stats | `proof-bar` | `stat-block`, `spec-bar` |
| timelines | `method-timeline` | `timeline-block`, `how-we-ship`, `maturity-pyramid` |
| feature | `feature-grid` | `services-grid`, `use-case-index`, `deliverables-grid`, `inclusions-list`, `commitments-grid`, `problems-grid`, `operating-layer`, `architecture-diagram`, `guarantee-block`, `editorial-preview`, `tech-stack-band`, `related-cards-band`, `manifesto-block`, `why-stalls`, `problem-statement` (15 — la catégorie la plus dense, gros potentiel de regroupement) |
| logo | `social-proof` | `marquee-band` |
| faq | `faq-accordion` | `objection-handler` |
| testimonial | — (0 live) | `testimonial-block`, `case-card-grid`, `pull-quote-block` → désigner 1 canonique |
| comparison | — (0 live) | `comparison-table` (seul) |
| pricing | — (0 live) | `pricing-table` (seul) |
| gallery | — (0 live) | `media-block` (seul) |
| trust/utility/index | — (3 vt=0) | `trust-legal-section`/`welcome-section`/`list-index-section` (markup inline dans leurs templates) |

> Les catégories **sans live** (testimonial/comparison/pricing/gallery) n'ont qu'1 modèle catalogue-only → canonique trivial mais **0 adoption** : à brancher dans les templates lors de la conversion.

## 5. Backlog de conversion → data-driven (Phase 2, ordre proposé)

1. ~~**Quick wins dette** : supprimer les 7 organismes ORPHAN (5 ont un jumeau, 2 purs).~~ ✅ **FAIT** (`8df9546`, manifest 21→14, 0 import mort) — cf doc 15 §39.
2. **Pages hub/listing légères** : remplacer les `CtaFinal`/`SocialProof` boulonnés par le rendu registry (faible risque).
3. **Templates → data-driven** : convertir les 18 templates pour qu'ils consomment le registry (héros + body via `SectionsRenderer`) au lieu d'imports directs. 1 template = 1 vague, GF-1.
4. **Home FR/EN** : migrer les 9 organismes MERGE→ vers leurs jumeaux catalogués (risque HIGH, GF-1 strict).
5. **3 templates inline** (Solutions/TunnelStep/Welcome) + `console.astro` : cataloguer leur markup inline (verbatim) puis convertir.
6. **Var-compatibilité** : à chaque conversion, mapper les couleurs/spacings en dur vers les tokens sémantiques (cf `09-css-audit.md`).

## Écarts vs docs antérieurs (corrigés ici, source-vérifiés)
- `CLAUDE.md`/`08-templates-b.md` : « TechnologiesDetail rend HeroTechLayer » → FAUX post-fusion H3 : rend `HeroOfferDetail` (HeroTechLayer.astro supprimé, type-id `hero-tech-layer` préservé).
- `04-organisms.md` : CookiesBanner = global (pas preview-only) ; Offices/WritingNotes/HowWeShip/Manifesto/OperatingLayer/WhyAIStalls/SigBand = ORPHAN réels (mentions = commentaires, pas imports) ; Cases consommé aussi par solutions/index.
