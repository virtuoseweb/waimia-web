# 24 — Taxonomie catalogue CONSOLIDÉE (recon exhaustive 18/18 templates + 14 pages + 21 organisms)

> ✅ **COMPLET (2026-06-03).** 13 agents de reconnaissance read-only ont couvert **les 18 templates**, **14 pages composées** (home, contact, manifesto, atlas, console, archive, agence/*) et **les 21 organisms**. Chaque `<section>` hors hero a été classée variante-first contre les 67 types catalogués. **Consolidation + harmonisation cross-familles par l'orchestrateur.**

## 🎯 Résultat : ~30 propositions brutes → 6 nouveaux types + ~20 variantes + dédup organisms

La vue exhaustive révèle que des familles différentes réinventent le même bloc. Fusionné au niveau orchestrateur (seul niveau où la dédup est visible) :
- 3 familles (OffresDetail, Service/DetailMenu, Funnel) → **un seul** `social-proof + 'quote-metrics'`
- 4 tableaux + 2 tables terminal console → **un seul** `data-table` (descripteurs de colonnes typés)
- 2 splits + terminal-cta-split + Offices → **un seul** `editorial-split` (variantes)

## ✅ 6 NOUVEAUX types (après fusion exhaustive)

### Cœur — forte réutilisation (5)
| # | Type | Couvre (sources réelles) | Schéma (esquisse) |
|---|---|---|---|
| 1 | **`data-table`** | course-catalog (EcoleHub), course-modules (CourseDetail), tech-capabilities (Tech), workflows (Solutions), terminal-table ×2 (console) | `{ kicker_fr/en, h2_fr/en, aside_fr/en?, columns:[{label_fr/en, kind:'text'\|'mono'\|'pill'\|'badge'\|'display'\|'num'\|'link', width?}], rows:[{cells:[{value_fr?/value_en?/value?, href?, badge_tone?}]}], variant?:'catalog'\|'modules'\|'capabilities'\|'workflows'\|'terminal' }` |
| 2 | **`editorial-split`** | tech-positioning (Tech), case-study-split (Solutions), terminal-cta-split (console), Offices/locations (organism) | `{ kicker_fr/en, h2_fr/en, aside_fr/en?, statement_fr/en?, body_fr/en?, cta?, side:{kind:'facts'\|'results'\|'terminal'\|'locations', items:[{value?,key_fr/en?,label_fr/en?}]}, tone:'paper'\|'dual-dark', variant }` |
| 3 | **`editorial-body`** | author-bio (Author) + **TOUS les corps MDX** (essay/tunnel/course `<slot/>`/`<Content/>`) | `{ eyebrow_fr/en?, body_html_fr, body_html_en }` (rend `set:html`) — **débloque Phase B** (MDX→data) |
| 4 | **`form-section`** | lead-magnet-form (LeadMagnet), contact/devis (Funnel), formulaire contact.astro | `{ kicker_fr/en?, h2_fr/en, intro_fr/en?, action, method:'post', hidden?:[{name,value}], fields:[{name,type:'text'\|'email'\|'select'\|'textarea', label_fr/en, required, options?, autocomplete?, placeholder_fr/en?}], cta_label_fr/en, disclaimer_fr/en?, background:'paper'\|'ink' }` — **0 island** (form HTML natif POST) |
| 5 | **`social-links`** | author social (Author), contact, footer | `{ eyebrow_fr/en?, links:[{key,label,url,external}] }` |

### Niche — faible réutilisation (3, candidats curation/fusion)
| # | Type | Couvre | Alternative variante-first |
|---|---|---|---|
| 6 | **`when-to-use`** | Tech use/avoid bicolore | OU `comparison-table + 'use-avoid'` |
| 7 | **`jobs-listing`** | careers (rows meta + CTA mailto/row) | OU `list-index-section + 'jobs'` |
| 8 | **`persona-switcher`** | atlas (tabs interactives, island, collection Astro) | ⚠️ **borderline BESPOKE** (1 page, island) — peut rester organism |

## 🔧 ~20 extensions de variante (types EXISTANTS — additif, faible risque)

| Type | Variante(s) ajoutée(s) | Sources |
|---|---|---|
| `social-proof` | `'quote-metrics'` (citation + métriques) | **OffresDetail + Service + DetailMenu + Funnel** (4 familles unifiées) |
| `stat-block` | `'dark'`/`background:ink`/`'freeplace'`/`'abstract-lede'` | CaseStudy, Solutions ROI, manifesto, LeadMagnet, console |
| `manifesto-block` | `'accent'` (terracotta), `'hub'`, `'context-prose'` | ManifestoAccent (organism), Hub, CaseStudy |
| `deliverables-grid` | `'objectives'`/`'outcomes'`/`'pillars'` | Course, AtlasGrid (organism) |
| `method-timeline` | `'integration'`/`'toc'`/`'alternating'` + `show_diagram?`/`active_step?` | Tech, LeadMagnet, Author, manifesto Acte II |
| `comparison-table` | `'models'`/`'before-after'` | Tech, Funnel |
| `tech-stack-band` | `'ecosystem'`/`'table'` | Tech, Solutions, OffresDetail tools |
| `problems-grid` | `'numbered-large'`/`'observations'` | Solutions, console Acte I |
| `commitments-grid` | `'dark'` | Hub fit/no-fit |
| `faq-accordion` | `'static'` (2-col) | Solutions |
| `media-block` | `'demo-slot'` | Funnel |
| `inclusions-list` | `'inline-mono'` | Author, Solutions |
| `editorial-preview` | `'writing-index'`/`'sticky'` + `excerpt?` | manifesto, console, Author, WritingNotes/FieldNotes (organisms) |
| `timeline-block` | `meta_fr/en?` | Author curriculum |
| `spec-bar` | `'info-grid'`/`'exam-details'`/`'dl-vertical'` | Course, about |
| `cta-final` | `'placeholder'`/`'centered'` | Course, manifesto |
| `cta-band` | `'dark-teaser'` | manifesto Acte III |
| `list-index-section` | `'learning-paths'`/`'categorized'` | École, archive |
| `use-case-index` | `'categorized-badges'` | prompts |
| `branded-callout` | `'box-tinted'` | methode VirtuoseOS |

## 🔁 DÉDUP ORGANISMS (découverte capitale — dette d'harmonisation)

**13 organisms portent `// COPIE FIDÈLE de organisms/X`** = duplicatas exacts de types catalogués. La home/atlas/console rendent ces organisms bespoke alors que le catalogue a le jumeau data-driven :

| Organism (bespoke, utilisé par home/atlas/console) | Type catalogué jumeau |
|---|---|
| `Hero` | `hero-home` |
| `Manifesto` | `manifesto-block` |
| `HowWeShip` | `how-we-ship` |
| `Pyramid` | `maturity-pyramid` |
| `OperatingLayer` | `operating-layer` |
| `WhyAIStalls` | `why-stalls` |
| `SixServices` | `services-grid` |
| `Cases` | `case-card-grid` |
| `Departments` | `use-case-index` |
| `SystemArchitecture` | `architecture-diagram` |
| `FieldNotes` + `WritingNotes` | `editorial-preview` (+ variante `sticky`) |
| `BookSession` | `cta-final` |

→ **Phase B (adoption)** : faire consommer le catalogue par la home (`src/pages/index.astro`) + atlas + console, puis **retirer les 13 organisms dupliqués**. Gain : 1 source de vérité par bloc, DA garantie alignée. ⚠️ touche la home LIVE → GF-1 strict obligatoire.

### 3 organisms à cataloguer (uniques, réutilisables)
- `AtlasGrid` → `deliverables-grid + 'pillars'` (variante, pas nouveau type)
- `ManifestoAccent` → `manifesto-block + 'accent'` (variante)
- `Offices` → `editorial-split + 'locations'` (variante)

### 5 organisms à GARDER bespoke (chrome/utilitaire, hors catalogue)
`CookiesBanner` (RGPD fixed), `FooterMarquee` (chrome footer), `SigBand` (wordmark clôture), `Stub` (placeholder dev), `PersonaSwitcher` (island interactif + logique collection).

## ✅ Couverture Phase A confirmée (vt=0 + Utility)
- `trust-legal-section`, `welcome-section`, `list-index-section` couvrent **100 %** de leurs templates (vérifié inline). Aucun écart fonctionnel.
- `UtilityTemplate` : slot `body` = passthrough bespoke par design (contact/careers/about/methode injectent du contenu unique) → **0 type à créer**.

## ⛔ Bespoke confirmé (ne PAS cataloguer)
Formulaires hors form-section déjà mappés ; `CalEmbed` (widget tiers), `AtlasConnections`/`ProductReel` (motion React `client:visible` scroll-driven), about prose 60/40, careers-foot, `MethodeProcessDiagram` (SVG déco).

## Ordre d'implémentation (collision-safe)
6 nouveaux types + ~20 variantes touchent les 3 fichiers partagés → **série** sur `feat/catalog-oneoff-sections` (composants distincts = pas de collision fichier). **Vague 1** = 5 types cœur ; **Vague 2** = ~20 variantes ; **Vague 3 (Phase B, séparée)** = adoption pages + dédup organisms. GF-1 orchestrateur (Playwright `/preview/<type>`) après chaque vague. Types niche (6-8) = arbitrage curation Simon.
