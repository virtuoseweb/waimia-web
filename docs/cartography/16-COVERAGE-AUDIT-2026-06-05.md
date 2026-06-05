# 16 — AUDIT COUVERTURE 100 % CATALOGUE (2026-06-05)

> Gate Simon avant migration templates : « migration des sections/composants dans les templates une fois qu'on sera sûr que tous les templates, toutes les sections, toutes les pages ont été bien traités et référencés correctement dans le catalogue ».
> Méthode : 3 agents read-only parallèles source-vérifiés (templates · sections/registry · pages), réconciliés. Tous les écarts cités `fichier:ligne`.

## 0. Chiffres réels (source-vérifiés)
| Univers | Réel | Note |
|---|---|---|
| type-ids registry | **67** | CLAUDE.md dit encore « 58 » → **doc périmée (9 ajoutés)** |
| 4 touchpoints (schéma/demo/registry/composant) | **67/67 intacts** ✅ | 0 cassé |
| composants `sections/*` orphelins (hors registry) | **0** ✅ | `SectionsRenderer` = infra, pas un orphelin |
| templates `templates/*` | **18** | **0/18 consomme le registry** (tous imports directs) |
| organisms bespoke `ui/organisms/*` | **8** | Hero/BookSession/FooterMarquee (home) · AtlasGrid/PersonaSwitcher (atlas) · ManifestoAccent (manifesto) · Stub (catch-all) · CookiesBanner (Base) |
| live / catalogue-only (runtime) | **27 / 40** | manifest commente « 21 / 46 » → **périmé** |

## 1. TIER 1 — Mensonges de données du catalogue (factuels, corrigeables tout de suite)

### 1A. `library-manifest.ts` SECTION_USAGE — 14 chemins de templates faux
Tous les consumers de templates omettent le suffixe `Template` → **fichiers inexistants sur disque** (les composants sont bien importés, seul le chemin-string est faux). Ex. `templates/CaseStudy.astro` → réel `CaseStudyTemplate.astro`. Lignes ~36-56 (hero-offer-detail, hero-tech-layer, hero-service-detail, hero-case-study, hero-utility-masthead, hero-academy-hub, hero-conversion-funnel, hero-hub-stats, hero-detail-menu, hero-author, hero-lead-magnet, hero-course, hero-essay, proof-bar, method-timeline, cta-final, cta-band).

### 1B. `library-manifest.ts` — chemins MDX fantômes
`src/content/mdx/composable-pilot` et `src/content/mdx` **n'existent pas** → réel `src/content/offres/composable-pilot.mdx` (hero-split l.49, proof-bar l.50, method-timeline l.51, cta-final l.55).

### 1C. `library-manifest.ts` — cta-final consumers imprécis
- placeholder fictif `'pages/hub-listing (~15)'` (l.55) → 15 pages importent vraiment `CtaFinal` (à lister).
- `src/pages/index.astro` + `en/index.astro` listés en consumers de cta-final = **faux** : la home utilise l'organism `BookSession` (twin merge), pas `CtaFinal` directement.

### 1D. `library-manifest.ts` — commentaires de comptage périmés
l.35 `Live (21)` → 27 ; l.58 `Catalogue-only (46)` → 40. Les 6 sections home converties (architecture-diagram/services-grid/maturity-pyramid/use-case-index/case-card-grid/editorial-preview, l.89-96) sont **live** mais rangées sous le bloc commentaire « catalogue-only ».

### 1E. `design-system.astro` + `en/...` §10 TEMPLATES — entrée fantôme + liens cassés
- **Fantôme** : `FormationDetailTemplate` listé (l.797) **n'existe pas** ; `CourseDetailTemplate` (réel, /ecole/cours) **non listé**.
- **~8 liens preview cassés** (la page liée n'utilise pas le template) : HubTemplate→`/ressources` (réel `/offres/conseil`) · ListIndexTemplate→`/cas` (réel `/ressources/changelog`) · SolutionsDetail→`/solutions` (réel `/solutions/<slug>`) · OffresDetail→`/offres` (réel `/offres/<slug>`) · TechnologiesDetail→`/technologies` (réel `/technologies/<slug>`) · AuthorPage→`/equipe` (réel `/equipe/<slug>`) · ConversionFunnel→`/offres/site-web-ia-landing` (réel `/offres/site-web-ia`).
- **3 sans href** : DetailMenu (réel `/offres/audit-maturite-ia`), LeadMagnet (réel `/ressources/livres-blancs/ai-act-readiness`), TunnelStep.

→ **Correction Tier 1 déléguée (worker) ce jour.** Faible risque, rend le catalogue factuellement exact.

## 2. TIER 2 — Dette structurelle : markup inline orphelin (le vrai chantier pré-migration)
**~20+ pages rendent des `<section>` écrites à la main, NON cataloguées** (ni composant `sections/*`, ni template). C'est le cœur du « tout traité et référencé ». Aucune n'est dans le catalogue.

| Page (FR+EN) | Sections inline orphelines (échantillon) |
|---|---|
| `index.astro` | INLINE mais utilise composants catalogue (sauf 3 organisms bespoke) — OK, hors dette |
| `atlas.astro` | `hero-atlas` (~60l+250l CSS), `atlas-howto`, `atlas-connections-wrap` |
| `manifesto.astro` | 8 actes inline (manifesto-hero, marquee, stats, services, cta, cases, writing, cta-final) |
| `solutions/index` | `hub-mast`, `hub-solutions` (5-col), `hub-sectors` |
| `offres/index` | `hub-mast`, `hub-pyramid` (SVG), `hub-tier-i/ii/iii`, quote |
| `cas/index` | `hub-mast`, `cas-grid-outer`, `cas-cta` |
| `ressources/index` | `hub-mast`, `hub-tools`, `hub-cases-detail`, `hub-cookbooks`, `hub-blog-lb`, newsletter |
| `technologies/index` | `hub-mast`, `hub-layers` (SVG archi), `hub-flagship`, `hub-frameworks` |
| `secteurs/index` | `hub-mast` (SVG), `hub-sectors-live`, `hub-coming`, `hub-cta-band` |
| `equipe/index` | `eq-mast`, `eq-grid-sec` |
| `console.astro` | 10 actes inline (signature page) |
| `agence/prompts` | `prompts-index` |
| Mineurs | testimonials/personas/field-notes/glossaire/integrations/comparer/commerce index+détails (listings hand-written) |

**Pattern dominant = `hub-mast`** (masthead H1+lead+CTAs) répété ~7× inline sur les pages hub/index → **candidat #1 à cataloguer** (1 type `hero-hub-masthead` existe déjà dans le registry mais **0 page ne le consomme** → à brancher). Idem grilles hub (`hub-solutions`/`hub-sectors`/`hub-tier-*`).

→ **NE PAS migrer en aveugle.** Cataloguer ces patterns = soit brancher des type-ids existants (hero-hub-masthead, hero-pillar-hub, etc. catalogue-only à 0 adoption), soit créer de nouveaux types (= tâche dédiée Simon, rule 28 DS figé). Curation requise : décider quels patterns inline deviennent canoniques.

## 3. Plan
1. **Tier 1 (ce jour, worker)** : corriger manifest (1A-1D) + §10 FR/EN (1E). Build + GF-1 liens 200.
2. **CLAUDE.md** : « 58 types » → 67 (doc).
3. **Tier 2 (programme)** : cataloguer le markup inline orphelin, en commençant par `hub-mast` → brancher `hero-hub-masthead` (type existant, 0 adoption) sur les ~7 pages hub. Curation Simon sur le mapping inline→type avant exécution.
4. **Puis seulement** : migration templates (faire consommer le registry par les 18 templates) — le gate sera levé quand Tier 1+2 finis.
