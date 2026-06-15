# 00 — CARTOGRAPHIE MAÎTRE de la bibliothèque waimia-web

> ✅ **Cartographie exhaustive (2026-06-04).** 162 composants (`src/components/**`) + 109 pages + 123 tokens CSS inventoriés par 11 agents structurés. Détail par catégorie : fichiers `01`→`10` de ce dossier. Ce document = **synthèse + système d'ID + framework de curation + plan de resserrement DS**.

## 🆔 Système d'ID (visible UI biblio — demande Simon)

Préfixe par catégorie + numéro stable. **Statut** : `KEEP` (garder/réutiliser) · `MERGE→X` (fusionner) · `ORPHAN` (0 conso prod, à intégrer ou archiver) · `DUP→X` (doublon d'un type catalogué) · `DEL?` (candidat suppression) · `GAP` (à créer, cf docs/24).

| Préfixe | Catégorie | Count | Fichier détail |
|---|---|---|---|
| `ATM-##` | Atomes | 11 | `01-atoms.md` |
| `MOL-##` | Molécules | 27 | `02`, `03` |
| `EDI-##` | Éditoriaux | 8 | `03` |
| `ORG-##` | Organisms | 21 | `04-organisms.md` |
| `SEC-##` | Sections contenu | ~33 | `05`, `06` |
| `HERO-##` | Sections hero | 26 | `07-sections-heros.md` |
| `TPL-##` | Templates | 18 | `08a`, `08b` |
| `UTL-##` | Utilitaires (motion/svg/header/footer/seo) | 16 | `10-utility-pages.md` |

> Étape suivante (proposée) : générer `src/lib/library-manifest.ts` (ID, name, category, file, status, page_objectives, consumers, css_vars, dup_of) = source unique → **UI `/agence/library`** filtrable par catégorie + statut, où Simon coche/désigne les blocs à utiliser par page.

## 🎯 4 leviers d'industrialisation (cross-cutting)

### Levier 1 — Heros : 26 → 15 (−42 %)
4 familles de fusion (cf `07`) :
- **`centered`** (10 heros) → fusionner 8 en `hero-generic-centered` (variantes), garder HeroEssay + HeroLanding distincts
- **`masthead-geo`** (3) → `hero-generic-masthead-geo` (geoShape + labelKind = variantes)
- **`stats`** (2 : HeroHubStats + HeroPillarHub) → fusion triviale
- **`service-kicker`** (2 : HeroServiceDetail + HeroServiceMasthead) → fusion triviale (diff = `metrics?`)
- **11 uniques conservés** : HeroHome, HeroLiquid, HeroTunnelStep, HeroConversionFunnel, HeroFullBleed, HeroSplit, HeroAuthor, HeroLeadMagnet, HeroEssay, HeroLanding, HeroCaseStudy
- Ordre risque croissant : Service×2 (trivial) → HubStats+PillarHub (trivial) → Offer+Sector+TechLayer (modéré) → 8 centered (complexe, 0 régression si bien spec'd)

### Levier 2 — Organisms : 13/21 sont des duplicatas (`// COPIE FIDÈLE`)
La home FR/EN + atlas + console rendent du bespoke alors que le **jumeau catalogué data-driven existe** (cf `04`) :
| Organism → type catalogué jumeau | | |
|---|---|---|
| `Hero`→hero-home · `Manifesto`→manifesto-block (ORPHELIN, 0 conso live → `DEL?`) · `HowWeShip`→how-we-ship · `Pyramid`→maturity-pyramid · `OperatingLayer`→operating-layer · `WhyAIStalls`→why-stalls · `SixServices`→services-grid · `Cases`→case-card-grid · `Departments`→use-case-index · `SystemArchitecture`→architecture-diagram · `FieldNotes`+`WritingNotes`→editorial-preview · `BookSession`→cta-final · `FooterMarquee`→marquee-band |
- **Action** : migrer `index.astro` (+ en/ + atlas + console) pour consommer le catalogue → **retirer 13 organisms**. ⚠️ home LIVE → GF-1 strict.
- **À cataloguer (1)** : `ManifestoAccent` (terracotta full-bleed, utilisé /manifesto FR+EN, pas couvert) → `manifesto-block + variant 'accent'`.
- **Garder bespoke (6)** : AtlasGrid, CookiesBanner, Offices, PersonaSwitcher, SigBand, Stub.

### Levier 3 — CSS / Design System : 95 → ~52 tokens + bugs actifs (cf `09`)
- **31 tokens orphelins** (définis, 0 usage) → suppression : 4 `--fg-*`, 6 `--z-*`, 5 durées, 6 paliers spacing hauts, etc.
- **~60 `rgba()` en dur** (ink/accent/paper à ~30 opacités) → introduire `--ink-rgb`/`--accent-rgb`/`--paper-rgb` (3 canaux) → pilotable.
- **🐛 BUGS ACTIFS** : (a) `grid.css` `.g12--narrow/standard/wide/grand` référencent des tokens **supprimés** en Phase D.1 ; (b) 5 tokens fantômes référencés non définis (`--waimia-accent`, `--text-secondary`…) ; (c) `.reveal` défini en double (global.css ⊕ scroll-reveal.css, comportements différents) ; (d) double timing `--reveal-*` vs `--dur-*` contradictoire ; (e) `@theme` Tailwind duplique 10 couleurs.
- **Hardcodes couleur** : 15+ SVG/UI + 5 molécules (AuthorCard `#EFEBE2`, PainPointInline `#C94F2E`, NewsletterSignup `#c0392b`, TechPillRow `#2aa876`, TerminalMockup `#17140F`).
- **Cible DS resserré** : ~52 tokens + canaux RGB + `--color-success`/`--color-error` → **theme-able par changement de valeurs = remplace Automatic.css**.

### Levier 4 — Orphelins & doublons fins
- **Atomes** : `ProgressBar` ↔ `ScrollProgress` = doublon (2 barres scroll actives sur la home) → garder ScrollProgress (CSS-only), `DEL?` ProgressBar. `FormErrors` utilise `className` (React-isme) → harmoniser en `class`.
- **Molécules orphelines** (0 conso prod, design-system only) : PainPointInline, StatRow, TaxonomyMenu, TunnelNav, Sidenote → intégrer ou archiver.
- **Sections catalogue-only** : ~10-12 sections jamais consommées par un template/page live (cf `05`/`06`) → cible Phase B (adoption) ou curation.
- **editorial/Timeline vs sections/MethodTimeline** : **PAS un doublon** (composant libre vs section catalogue Zod) — rôles distincts, garder les deux.
- **Atome commun candidat** : `ProofBarSection` + `StatBlock` partagent le pattern valeur/label/emphasis → extraire `MetricItem` (atome) réutilisable.

## 🗂️ Templates par OBJECTIF de page (cf `08a`/`08b`)
| Objectif | Templates |
|---|---|
| conversion | ConversionFunnel, DetailMenu |
| acquisition | CourseDetail, LeadMagnet |
| editorial | Essay (5 routes) |
| information | AuthorPage |
| seo | CaseStudy |
| hub/pillar | EcoleHub, Hub |
| legal | TrustLegal (+ trust-center, governance) |
| (pré/post-conversion) | Utility, Welcome |
| detail produit | OffresDetail, ServiceDetail, SolutionsDetail, Technologies |

**Paires redondantes** (candidates unification raisonnée — PAS template identique, on adapte à l'objectif) :
- ConversionFunnel ↔ DetailMenu (offres B2B, diff = pricing/devis)
- OffresDetail ≈ ServiceDetail (arc Problem→Method→Deliverables→Proof→CTA ; OffresDetail 4× plus lourd)
- Utility ↔ Welcome (même masthead, pré/post-conversion — distinction intentionnelle)
- EcoleHub ↔ Hub (rôle hub/index ; EcoleHub n'utilise pas CtaFinal = anti-pattern)

## 🧩 Gaps de couverture (cf docs/24) — à créer APRÈS curation
6 nouveaux types (data-table, editorial-split, editorial-body, form-section, social-links, when-to-use) + ~20 variantes. **Ne PAS implémenter avant la curation** (éviter double travail) — ils complètent la cartographie mais s'inscrivent dans le DS resserré validé.

## 🚀 Améliorations proposées (workflow + industrialisation)
1. **`library-manifest.ts` + UI `/agence/library`** : registry unifié tous-éléments (ID/statut/objectif/conso) → Simon coche depuis l'UI ce qu'on garde/utilise. Remplace la curation « à l'aveugle ».
2. **Tokens en 3 couches** : `primitives` (valeurs brutes) → `semantic` (rôles : --surface, --text, --accent) → `component` (overrides). C'est le modèle theme-able cross-projet (façon Automatic.css/Open Props).
3. **Fix des bugs CSS actifs d'abord** (grid.css cassée, tokens fantômes, double .reveal) — dette silencieuse avant tout refactor.
4. **`status` + `id` dans le section-registry** : ajouter les champs au registry existant → le showcase devient l'UI biblio sans nouvelle page.
5. **Curation par catégorie via checklist** : pour chaque ID, décision KEEP/MERGE/DEL → pilote le refactor templates-par-objectif.

## ✅ Séquence proposée (ordre anti-double-travail)
1. **[fait]** Cartographie exhaustive (ce dossier).
2. **Curation Simon** : valider statuts KEEP/MERGE/DEL par catégorie (via UI biblio à construire, ou directement sur ce doc).
3. **DS resserré** : fix bugs CSS + trim tokens + 3 couches + RGB channels.
4. **Fusions** : heros 26→15, organisms dedup (home→catalogue), atomes/molécules orphelins.
5. **Gaps** : créer les 6 types + variantes validés.
6. **Refactor templates par objectif** : séquences de sections cohérentes par conversion/seo/legal/hub/silo.
7. **Adoption data-driven** (Phase B) : `sections:` frontmatter MDX + retrait templates legacy.
