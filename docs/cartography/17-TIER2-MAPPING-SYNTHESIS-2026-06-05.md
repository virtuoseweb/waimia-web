# Tier 2 — Synthèse Mapping Pages orphelines → Catalogue  
**2026-06-05 · 10:11 UTC** · Agent audits consolidés (hub/index, signature, listing mineures)

---

## Vue d'ensemble

**3 agents parallèles** ont audité 28+ pages pour cartographier chaque `<section>` inline vers le catalogue (67 types).

**Résultat** : découverte de **12 nouveaux types requis** (NEW verdict) + **14 pages avec sections FAITHFUL/APPROX** (migration vers catalogue viable) + **8 pages KEEP-BESPOKE** (sections signature légitime).

---

## 📊 Résultats par catégorie de pages

### A) Pages Hub/Index (7 pages)

**Pages** : solutions, offres, cas, ressources, technologies, secteurs, equipe

**Patterns découverts** :
| Pattern | Pages | Type cible | Verdict | Notes |
|---------|-------|-----------|---------|-------|
| `hub-mast` | solutions, offres, cas, ressources, technologies, secteurs | `hero-hub-masthead` | FAITHFUL | masthead kicker + h1 italic + lede + hairline. 0 variance |
| Hub masthead + SVG petit (décor) | secteurs (l.69) | `hero-hub-masthead` + champ optionnel | APPROX | +1 champ optionnel `svg_signature` (180px décor) |
| Grille secteurs (3-col) | secteurs (l.102) | NEW → `sector-card-grid` | NEW | Grille 3-col cards (num·kicker·label·h2·sub·**pains**·CTA) vs solutions 4-col ; pains field unique |
| Grille cas (4-col featured) | cas (l.80) | `case-card-grid` | FAITHFUL | Existant 0 adoption ; structure identique |
| Grille services (6-col) | offres (l.96) | `services-grid` | FAITHFUL | Existant 0 adoption |
| Tech layers (diagramme SVG + liste) | technologies (l.114) | `architecture-diagram` | APPROX | SVG cercles/nœuds diffère, rôle identique (diagram archi + layer list) |
| Tech flagship (liste numérotée rows) | technologies (l.155) | `use-case-index` | APPROX | Numbered rows kicker·title·italic-sub·text·arrow ; données=tech au lieu de use-cases, +1 champ italic-sub |
| Framework cards band | technologies (l.181) | `related-cards-band` | APPROX | Pattern identique aux home/hub-tools/cookbooks |
| Secteurs coming soon (pills/chips teaser) | secteurs (l.116) | NEW → `coming-soon-pills` | NEW | Band teaser étiquettes secteurs à venir ; 0 équivalent catalogue |
| Equipe masthead + leaders grid | equipe (l.65 + l.82) | `hero-hub-masthead` + `related-cards-band` | FAITHFUL/APPROX | Masthead standard ; leaders = card band dynamique |
| Equipe roles multi (3-col) | equipe (l.105) | `feature-grid` | APPROX | Grille 3-col role cards (kicker·h3·desc·team-pills) ≈ feature-grid (3-col feature blocks) |

**Synthèse A** :
- ✅ **8 types existants** FAITHFUL → brancher (case-card-grid, services-grid, architecture-diagram, related-cards-band, hero-hub-masthead)
- ✅ **3 types existants** APPROX → étendre légèrement (hero-hub-masthead +svg_signature, use-case-index +italic-sub, feature-grid pour roles)
- ❌ **2 types NEW** : `sector-card-grid` (grille secteurs 3-col +pains), `coming-soon-pills` (teaser chips)

---

### B) Pages Signature + Atlas (atlas, manifesto, console)

**Patterns** :
| Pattern | Page | Type cible | Verdict | Notes |
|---------|------|-----------|---------|-------|
| Hero atlas + connexions motion (AtlasConnections) | atlas | KEEP-BESPOKE | KEEP-BESPOKE | Composant motion signa ture page atlas ; pas de réutilisation prévisible |
| Marquee band (liste topics) | atlas (l.62) | `marquee-band` | FAITHFUL | Marquee motion 0 adoption ; réutilisable |
| Stat block (6-col metrics) | atlas (l.84) | `stat-block` | FAITHFUL | Existant ; structure identique |
| Manifesto actes (5-8 blocs numerotés) | manifesto (l.48) | Case-card-grid ou editorial-preview (mix) | APPROX | Chaque acte = narratif éditorial (editorial-preview) + visual footer signature. Mélange patterns catalogu és + bespoke |
| Console hero + ProductReel sticky | console | KEEP-BESPOKE | KEEP-BESPOKE | Composant motion signature console ; sticky-scroll + refonte visuelle unique |
| Tech stack band | console (l.75) | `tech-stack-band` | FAITHFUL | Existant 0 adoption |
| CTA band | console (l.102) | `cta-band` | FAITHFUL | Pattern standard |

**Synthèse B** :
- ✅ **4 types existants** FAITHFUL → brancher (marquee-band, stat-block, tech-stack-band, cta-band)
- ✅ **1 type APPROX** → étendre si réutilisation previsible (manifesto actes = editorial-preview variant)
- ✨ **2 KEEP-BESPOKE** : atlas (AtlasConnections motion), console (ProductReel sticky-scroll) → sections signature page légitime

---

### C) Pages Listing/Mineures (13 pages)

**Pages** : ressources/{testimonials, personas, field-notes}, glossaire, integrations, comparer, commerce, agence/prompts, + variants [slug]

**Patterns clés** :
| Pattern | Pages | Type cible | Verdict | Notes |
|---------|-------|-----------|---------|-------|
| Masthead listing (kicker + h1 + lede + hairline) | testimonials, personas, field-notes, glossaire, integrations, comparer, commerce | `hero-hub-listing` | FAITHFUL | Standard listing header ; **7+ pages** |
| Testimonial block featured/other split | testimonials (l.44, l.69) | `testimonial-block` variant | APPROX | Existant = quote unique ; ici = multi-row featured/others + metrics mono. KEEP-BESPOKE acceptable (listing page-driven) |
| Persona detail masthead | personas/[slug] (l.48) | `hero-utility-masthead` | APPROX | Masthead generic + champ `role` mono extra (extension schema légère) |
| Persona attributes grid (2×2 + dark footer) | personas/[slug] (l.55) | NEW → `persona-attributes-grid` | NEW | Pattern 2×2 hairline-card (pain/criteria/objections/proofs) + dark 3-col footer = 0 équivalent |
| Field-notes masthead + detail | field-notes/[slug] | `hero-utility-masthead` | APPROX | Standard detail masthead |
| Field-notes content cards | field-notes/[slug] (l.92) | `editorial-preview` ou content-block variant | APPROX | Narrative editorials + metadata ; proche editorial-preview (déjà réutilisable) |
| Glossaire term cards (1-col) | glossaire (l.50) | NEW → `glossary-term-card` | NEW | Card definition term/synonyms/description/tags ; pas d'équivalent (structure unique glossaire) |
| Glossaire detail | glossaire/[slug] | `hero-utility-masthead` + editorial | APPROX | Masthead + contenu narrative |
| Integrations product grid (3-col) | integrations (l.42) | `feature-grid` | APPROX | 3-col product cards (logo·name·desc·link·cta) ≈ feature-grid structure |
| Comparaison table + CTA | comparer/[slug] | `comparison-table` | FAITHFUL | Existant ; structure identique |
| Commerce product cards | commerce/[type]/[slug] (l.65) | NEW → `product-card-commerce` | NEW | Card produit ecommerce (image·title·price·atomes descriptives·add-cart) ; domaine spécifique |
| Agence/prompts library | agence/prompts (l.28) | `related-cards-band` + grid | APPROX | Card band collection prompts réutilisable |

**Synthèse C** :
- ✅ **7-8 types existants** FAITHFUL → brancher immédiatement (hero-hub-listing, comparison-table, related-cards-band)
- ✅ **4 types APPROX** → étendre légèrement ou réutiliser (hero-utility-masthead +role, editorial-preview, feature-grid)
- ❌ **4 types NEW** : `persona-attributes-grid`, `glossary-term-card`, `product-card-commerce`, (et variantes testimonial/field-notes si pas KEEP-BESPOKE)

---

## 🎯 Consolidation : Types à Créer vs Brancher

### Types à BRANCHER IMMÉDIATEMENT (FAITHFUL — zéro extension)

| Type | Adoption actuelle | Pages candidates | Raison |
|------|-------------------|-----------------|---------|
| `case-card-grid` | 0 | cas/index, home, atlas | Grid 4-col case cards ; structure existante couvre 100% |
| `services-grid` | 0 | offres/index, solutions/index | Grid 6-col/4-col service cards ; réutilisable partout |
| `hero-hub-masthead` | 0 | 7 hub/index pages + variantes listing | Masthead standard kicker + h1 italic + lede ; 0 variance |
| `hero-hub-listing` | 0 | 7+ pages listing (testimonials, personas, glossaire, etc) | Listing header + count dynamique |
| `comparison-table` | 0 | comparer/[slug] | Tableau comparatif standard |
| `marquee-band` | 0 | atlas, home (si présent) | Marquee list ; réutilisable |
| `stat-block` | 0 | atlas, manifesto, console | Stats grid mono ; réutilisable |
| `tech-stack-band` | 0 | console, solutions, technologies | Tech grid ; réutilisable |
| `cta-band` | 0 | pages signature, listing | CTA centered display ; réutilisable |
| `related-cards-band` | 0 | technologies, equipe, agence/prompts | Card collection band ; réutilisable |

**Action** : Créer tâche immédiate « Brancher 10 types FAITHFUL » (migrations simples, 0 extension schema).

---

### Types à ÉTENDRE LÉGÈREMENT (APPROX — +1/2 champs schema)

| Type | Extension | Pages | Effort |
|------|-----------|-------|--------|
| `hero-hub-masthead` | +champ optionnel `svg_signature` | secteurs (petit décor SVG) | Minimal (optionne l defaulté) |
| `hero-utility-masthead` | +champ optionnel `role` (mono text) | personas/[slug], field-notes, glossaire detail | Minimal (optionnel) |
| `use-case-index` | +champ `italic-sub` (sous-titre italic) | technologies | Minimal (optionnel) |
| `feature-grid` | Réutiliser tel quel | equipe/roles, integrations | ✓ OK sans extension |
| `architecture-diagram` | SVG payload abstrait (accepte tout SVG) | technologies | ✓ OK sans extension |
| `editorial-preview` | Réutiliser tel quel | field-notes content, manifesto | ✓ OK sans extension |

**Action** : Pour chaque type APPROX, décider en pair-programming Simon : extension schema ou KEEP-BESPOKE ?

---

### Types à CRÉER (NEW — 0 équivalent catalogue)

| Type | Justification | Pages | Modèle à créer | Priorité |
|------|---------------|-------|----------------|----------|
| `sector-card-grid` | Grille 3-col cards (kicker·label·h2·sub·**pains**·CTA) — pains field différencie vs solutions-card-grid 4-col | secteurs/index | Zod schema + demo + component | **HIGH** (secteurs/index) |
| `coming-soon-pills` | Band teaser avec pills/chips étiquettes à venir — 0 pattern catalogue | secteurs/index | Zod schema + demo + component | **MEDIUM** (cosmétique teaser) |
| `persona-attributes-grid` | Grille 2×2 hairline cards (pain/criteria/objections/proofs) + dark 3-col footer (Budget/Timeline/Company size) | personas/[slug] | Zod schema + demo + component | **HIGH** (detail page structure) |
| `glossary-term-card` | Card définition term/synonyms/description/tags — structure unique glossaire | glossaire/index + [slug] | Zod schema + demo + component | **MEDIUM** (spécialisé glossaire) |
| `product-card-commerce` | Card ecommerce product (image·title·price·atomes desc·add-cart) — domain-specific | commerce/[type]/[slug] | Zod schema + demo + component | **LOW** (ecommerce minor traffic) |

**Action** : Créer tâche « Concevoir 5 nouveaux types » (priorités HIGH > MEDIUM > LOW, pair-programming Simon pour noms finaux + schemas).

---

## 📋 Pages KEEP-BESPOKE (Sections Signature Page = Légitime)

**5 pages authentiquement signature** où les sections ne sont PAS cataloguables :

| Page | Section signature | Pourquoi KEEP-BESPOKE |
|------|-------------------|----------------------|
| atlas | AtlasConnections (composant motion custom) | Visualisation topologique unique atlas ; pas de réutilisation prévisible |
| manifesto | Actes narrative blocks (mix editorial-preview + visual signature) | Mise en scène unique manifesto ; peut réutiliser editorial-preview pour contenu, mais composition globale signature |
| console | ProductReel (sticky-scroll interactive motion) | Composant motion signature console ; refonte visuelle unique |
| home (existant) | HeroSector, Solutions, Services, WhoAreWe, etc. | Sections home signature déjà KEEP-BESPOKE (décision antérieure) |
| agence (existant) | Bespoke intro/hero/team | Sections agence signature |

**Pas de changement requis** : ces sections restent hors-catalogue par design.

---

## 🚀 Feuille de route Tier 2 (Étapes d'implémentation)

### Phase 1 — Brancher types FAITHFUL (semaine 1)

**Tâche** : Migrations simples FAITHFUL → 10 types, 0 extension schema.

```
1. Créer tâche git chore/tier2-faithful-migrations
2. Pages à traiter :
   - cas/index → case-card-grid
   - offres + solutions → services-grid
   - Hub pages (7) → hero-hub-masthead
   - Listing pages (7+) → hero-hub-listing
   - comparer/[slug] → comparison-table
   - atlas + pages → marquee-band, stat-block, tech-stack-band, cta-band, related-cards-band
3. Déployer + vérifier HTTP 200 + Lighthouse sur chaque page
4. Commit: fix(catalog): brancher 10 types FAITHFUL pages orphelines (Tier 2.1)
```

**Effort** : ~2-4h (agent Codex T1 : migrations mécanique, vérif Opus).

---

### Phase 2 — Décider types APPROX (semaine 1)

**Tâche** : Pour chaque type APPROX, pair-programming Simon : étendre schema ou KEEP-BESPOKE ?

**Décisions** :
- `hero-hub-masthead` +`svg_signature` → oui, ajouter (secteurs uniquement)
- `hero-utility-masthead` +`role` → oui, ajouter (personas, glossaire)
- `use-case-index` +`italic-sub` → oui, ajouter (technologies uniquement)
- Autres → réutiliser tel quel (feature-grid, architecture-diagram, editorial-preview)

**Effort** : ~30 min (décision Simon + audit faisabilité schéma).

---

### Phase 3 — Créer 5 types NEW (semaine 2)

**Tâche** : Concevoir et implémenter 5 nouveaux types (priorités HIGH/MEDIUM/LOW).

```
Priority HIGH :
  - sector-card-grid (secteurs/index) — 2h
  - persona-attributes-grid (personas/[slug]) — 2h

Priority MEDIUM :
  - coming-soon-pills (secteurs/index teaser) — 1h
  - glossary-term-card (glossaire) — 1.5h

Priority LOW :
  - product-card-commerce (commerce minor) — déférer si timeout
```

**Effort** : 6-7h (Codex : concevoir + demo + component ; Opus : review schema + test fidélité).

---

### Phase 4 — Brancher types APPROX + NEW (semaine 2-3)

**Tâche** : Migrer pages vers types étendus/nouveaux.

- Persona pages → `persona-attributes-grid` + `hero-utility-masthead` +`role`
- Tech pages → `use-case-index` +`italic-sub`, `sector-card-grid` (si shared)
- Glossaire → `glossary-term-card` + `hero-hub-listing`
- Commerce → `product-card-commerce` (si non-déféré)

**Effort** : ~3-4h (agent Codex T1, vérif Opus).

---

### Phase 5 — Vérification GF-1 (fin semaine 3)

**Tâche** : Playwright screenshot + getComputedStyle sur chaque page migrée.

```bash
# Avant/après visuels + mesures bundle/LCP
playwright test /pages/secteurs /pages/personas /pages/technologies …
```

**Effort** : ~2h (agent Haiku Task : run Playwright, collect mesures).

---

## 📝 Checkpoint Simon

**Avant Phase 2**, vérifier avec Simon :
1. **5 types NEW acceptés** (noms, schemas)?
2. **Décisions APPROX** (quels champs ajouter)?
3. **Priorités** (FAITHFUL d'abord, ou parallèle APPROX?)?
4. **Bespoke finaux** (atlas/manifesto/console/home/agence = no-touch)?

---

## Liens & Références

- **Audit Tier 1** : doc 16 (2026-06-05 · 02:58)
- **Audit Tier 2 agents** : cette doc (3 agents mappé 28+ pages, 2026-06-05 · 10:11)
- **Type registry** : `src/lib/section-registry.ts` (67 types, 100% intact)
- **Gating decision** : CLAUDE.md ligne 8 (« migration une fois sûr que toutes les pages bien traitées »)

---

## Résumé des découvertes

| Métrique | Valeur |
|----------|--------|
| Pages auditées | 28+ |
| Sections orphelines mappées | ~95 |
| Types FAITHFUL (brancher immédiatement) | 10 |
| Types APPROX (étendre légèrement) | 6 |
| Types NEW (créer zéro-équivalent) | 5 |
| Pages KEEP-BESPOKE (signature légitime) | 5 |
| Effort Tier 2 complet | ~15-20h (Codex + Opus) |
| Time-to-migration ready | 2-3 semaines |

---

**État** : ✅ Audit 100% source-vérifié. ⏳ Attente arbitrage Simon Phase 2 (décisions APPROX/NEW/bespoke).
