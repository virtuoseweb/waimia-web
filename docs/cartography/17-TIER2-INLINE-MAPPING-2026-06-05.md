# 17 — TIER 2 · MAPPING inline → catalogue (curation) — 2026-06-05

> Suite de `16-COVERAGE-AUDIT` §2. Objectif du gate Simon : « tous templates/sections/**pages** traités + référencés » AVANT migration. Ce doc **référence chaque `<section>` inline orpheline** des ~24 pages restantes et lui attribue une **disposition** : brancher un type catalogue existant, créer un nouveau type, ou garder bespoke.
> Méthode : 3 agents read-only parallèles source-vérifiés (hub/index · signature atlas-manifesto-console · listings mineurs), réconciliés. Cibles vérifiées : les 67 type-ids du registry confirmés (`/tmp/registry-ids.txt`), tous les types cibles existent à **0 adoption**.
> **NE PAS exécuter** : ce doc est la **curation** (rule 28 DS figé — nouveau type = décision Simon). La migration templates reste différée.

## 0. Synthèse décisionnelle (4 classes)

| Classe | Disposition | Sections inline | Risque | Travail catalogue |
|---|---|---|---|---|
| **A — FAITHFUL** | Brancher un type existant tel quel | ~13 (surtout mastheads + recoupes home) | nul | 0 (type existe, 0 adoption) |
| **B — APPROX** | Brancher existant + extension mineure (champ/variante optionnel) | ~22 | faible | +1 champ schema ou +1 variante CSS par type |
| **C — NEW** | Nouveau type à créer = **arbitrage Simon** | ~11 distincts | — | tâche dédiée (4 touchpoints) |
| **D — KEEP-BESPOKE** | Hors catalogue assumé (motion/signature/listing collection) | ~22 | nul | 0 |

**Constat dominant** : le pattern **masthead** (kicker + h1 italic display + lede + hairline) est répété **~15×** inline → couvert par 3 types existants à 0 adoption : `hero-hub-masthead` (hubs), `hero-hub-listing` (listings), `hero-utility-masthead` (détails). C'est le gisement #1 (brancher, pas créer).

---

## A — FAITHFUL : brancher un type existant (0 modif catalogue)

| inline (page, fichier:ligne) | type existant cible | note |
|---|---|---|
| offres/index `.hub-mast` l.53 | `hero-hub-masthead` | kicker mono + h1 italic + lede, 0 SVG/CTA = desc exacte |
| cas/index `.hub-mast` l.39 | `hero-hub-masthead` | idem |
| ressources/index `.hub-mast` l.143 | `hero-hub-masthead` | idem |
| technologies/index `.hub-mast` l.100 | `hero-hub-masthead` | idem |
| commerce/index `__hd` l.22 | `hero-hub-listing` | tokens DS exacts (font-display/text-h1-hero/hairline) |
| agence/prompts `__hd` l.50 | `hero-hub-listing` | tokens DS exacts |
| commerce/[slug] `__hd` l.57 | `hero-utility-masthead` | tokens DS exacts |
| ressources/index newsletter l.229 | `newsletter-band` | dark + headline gauche + form email droite = desc exacte |
| manifesto `manifesto-hero` l.60 | `hero-liquid` | `<LiquidHero>` canvas terracotta = desc exacte du type |
| manifesto Acte IV cas l.216 | `case-card-grid` | **recoupe home/atlas** (déjà live) |
| manifesto Acte V CTA l.271 | `cta-final` | **recoupe home/atlas** (déjà live) |
| console interlude l.185 | `manifesto-block` | kicker § + display italic accent = desc exacte |
| comparer/[slug] table l.70 | `comparison-table` | dimensions × A/B + winner = desc exacte |

→ **9 types existants** branchables sans toucher le catalogue (dont 4 déjà live = consolidation pure).

---

## B — APPROX : brancher existant + extension mineure (champ/variante optionnel)

| inline (page, fichier:ligne) | type base | extension requise |
|---|---|---|
| solutions/index `.hub-mast` l.65 | `hero-problem-index` | +`canonical_line` (string opt.) ; SVG rects 12° déjà du ressort du type |
| secteurs/index `.hub-mast` l.69 | `hero-hub-masthead` | +`svg_signature` (opt.) |
| equipe/index `.eq-mast` l.110 | `hero-hub-masthead` | +slot kicker dynamique (compteur) |
| testimonials/personas/field-notes/glossaire/integrations/comparer **index `__hd`** (6 pages) | `hero-hub-listing` | normaliser tokens (certains usent `clamp()`/`--color-muted` non-canoniques) |
| personas/[slug] `__hd` l.48 | `hero-utility-masthead` | +`role` mono |
| integrations/[slug] `__hd` l.54 | `hero-utility-masthead` | +`logo_url` (opt.) + badge |
| glossaire/[slug] `__hd` l.46 · comparer/[slug] `__hd` l.56 | `hero-utility-masthead` | h1 display-md / « A vs B » non-italic |
| field-notes/[slug] `__hd` l.42 | `hero-essay` | sous-ensemble (pas de lede/auteur) |
| cas/index `.cas-grid-outer` l.56 | `case-card-grid` | +variante layout `featured_asymmetric` (7fr/5fr) |
| console Acte IV table l.220 | `case-card-grid` | +variante colonnes terminales |
| cas/index `.cas-cta` l.77 · secteurs/index `.hub-cta-band` l.128 · manifesto Acte III l.191 · comparer/[slug] cta l.117 | `cta-band` | +variantes `dark` / `centered` |
| offres/index quote l.207 | `manifesto-block` | +`kicker` (opt.) |
| atlas `atlas-howto` l.114 | `manifesto-block` | layout identique, nommage à aligner |
| ressources/index `.hub-tools` l.154, `.hub-cookbooks` l.189 · technologies/index `.hub-frameworks` l.181 | `related-cards-band` | +`cta` (opt.) sur cookbooks |
| ressources/index `.hub-cases-detail` l.163 · technologies/index `.hub-flagship` l.155 | `use-case-index` | +`sub_title`/`italic-sub` |
| technologies/index `.hub-layers` l.114 | `architecture-diagram` | +variante SVG linéaire horizontale + TechPillRow |
| manifesto Acte II services l.156 | `services-grid` | +variante asymétrique (rows alternées) |
| manifesto Writing l.247 · console Writing l.253 · field-notes/index list l.41 | `editorial-preview` | +`tone:ink\|paper`, +`showNumbers` (field-notes) |
| manifesto marquee l.112 | `marquee-band` | +`theme:dark` (vs nouveau type) |
| personas/[slug] meta l.76 | `spec-bar` | variante dark + valeur font-display |
| console Acte I l.121 | `why-stalls` | variante 2×2 cards (vs rows FIG) |
| console Acte II l.155 | `operating-layer` | variante TerminalTable (vs mockup) |

→ **Politique d'extension à arbitrer** (cf §Décisions Q2) : ajouter des champs/variantes **optionnels** à un type existant n'introduit pas de nouveau token (compatible rule 28 composition), mais touche le schéma → ton OK requis avant exécution Tier 2.

---

## C — NEW : nouveaux types proposés (arbitrage Simon, rule 28)

| nom proposé | source (fichier:ligne) | justification | consolidation possible |
|---|---|---|---|
| `solutions-card-grid` | solutions/index `.hub-solutions` l.83 | grille 5-col problem-solution (num+kicker+h3+sub+lead+CTA) ; ≠ `services-grid` (3×2 figure/metric) | variante de `services-grid` ? |
| `sector-satellite-grid` | solutions/index `.hub-sectors` l.96 | grille 4-col navigation secteurs paper-2 hover ink | **fusionner avec ↓** |
| `sector-card-grid` | secteurs/index `.hub-sectors-live` l.102 | grille 3-col sector-cards + champ `pains` | **fusionner ↑** (1 type `sector-grid` paramétrable ?) |
| `tier-pyramid-svg` | offres/index `pyramid-wrap` l.67 | SVG pyramide isocèle 3 tiers + labels ; aucun SVG pyramide catalogue | — |
| `offer-tier-grid` | offres/index `.tier-i/ii/iii` l.101/124/178 | eyebrow tier + h2 + lede + grille cards offres (3 variantes : standard/featured-hero/transparent) | 1 type 3 variantes |
| `editorial-split-grid` | ressources/index `.hub-blog-lb` l.201 | 2-col dual listing (blog + livres-blancs) chacun kicker+h2+lede+RelatedCards+CTA | — |
| `coming-soon-pills` | secteurs/index `.hub-coming` l.116 | band teaser kicker+h2+chips ; très spécifique | — |
| `team-card-grid` | equipe/index `.eq-grid-sec` l.138 | grille auto-fill auteurs (photo·bio·role·count) data-driven `getCollection('authors')` | — |
| `hero-atlas` (`hero-pillar-map`) | atlas `.hero-atlas` l.54 | 2-col + mini-map piliers (num/label/desc/deliverable) + SVG signature-grid ; ≠ héros existants | — |
| `chapter-stats` | manifesto Acte I l.125 | sticky-kicker gauche + texte édito + grille 3-col stats géantes ; ≠ `stat-block` | variante de `stat-block` ? |
| `persona-attributes-grid` | personas/[slug] `__grid` l.55 | 2×2 hairline-cards (pain/criteria/objections/proofs) + footer dark 3-col | — |
| `product-card-grid` *(conditionnel)* | commerce/index `__group` l.35 | grille prix Stripe (format+titre+desc+prix) — agent : KEEP-BESPOKE acceptable sauf si Waimia étend le commerce | rester bespoke par défaut |

→ **~9-11 types distincts** après consolidation des doublons (sector-grid ×2, offer-tier ×3 variantes). **Aucun créé sans ton GO** (rule 28).

---

## D — KEEP-BESPOKE confirmés (hors catalogue assumé)

**Motion / signature page** (irréductible, couplé à une logique JS) :
- atlas : `AtlasConnections` (canvas RAF), `AtlasGrid` (organism paginé), `PersonaSwitcher` (switcher interactif)
- manifesto : `ManifestoAccent` (organism transition)
- console : hero terminal (typewriter JS `SEQUENCE`), `ProductReel` (sticky-scroll React 4 steps), Acte V terminal session card

**Listings collection-driven** (un composant générique serait moins expressif et réutilisé nulle part) :
- testimonials featured/others · personas-index list · glossaire `__cat` + détail body · integrations filters/grid/détail body · comparer groups + verdict · commerce groups/product/subscription · prompts `__cat` · tous les `__content` MDX

---

## Décisions Simon — TRANCHÉES 2026-06-05 (gate « tout traité + référencé » CLOS)

- **Q1 — Mastheads → UNIFIER en 1 type paramétrable.** Les 3 mastheads (`hero-hub-masthead`/`hero-hub-listing`/`hero-utility-masthead`) fusionnent en **un seul type masthead** avec `variant: 'hub' | 'listing' | 'detail'` + champs optionnels (`role`, `logo_url`, `svg_signature`, `canonical_line`). Canonique probable = `hero-hub-masthead` étendu ; réconcilier l'adoption template existante de `hero-utility-masthead` (Utility) à l'exécution. **~15 mastheads** s'y branchent.
- **Q2 — APPROX → extensions optionnelles AUTORISÉES.** Champs schema optionnels + variantes CSS (`theme:dark`, `tone:ink`, `featured_asymmetric`, variante SVG linéaire, rows asymétriques…) ajoutés aux types existants (0 nouveau token → compatible rule 28). Les ~22 APPROX se branchent ainsi.
- **Q3 — Nouveaux types → MINIMAL (7 irréductibles only).** Créés : `tier-pyramid-svg`, `offer-tier-grid` (3 variantes), `team-card-grid`, `hero-atlas`, `persona-attributes-grid`, `editorial-split-grid`, `coming-soon-pills`. **Reclassés** (≠ nouveau type) : `solutions-card-grid`→**variante `services-grid`** ; `chapter-stats`→**variante `stat-block`** ; `sector-satellite-grid`+`sector-card-grid`→**variante grille existante OU bespoke** (trancher à l'exécution) ; `product-card-grid`→**bespoke**.

### Bilan dispositions finales (chaque inline référencé)
| disposition | nb | action exécution Tier 2 |
|---|---|---|
| Brancher existant (FAITHFUL) | ~13 | 0 modif catalogue |
| Brancher existant + extension opt. (APPROX) | ~22 | +champ/variante opt. |
| Masthead unifié (1 type, variant) | ~15 mastheads | fusion 3→1 + branchement |
| Nouveau type (7 irréductibles) | 7 | 4 touchpoints chacun |
| KEEP-BESPOKE | ~22 | 0 (assumé) |

## Séquence d'exécution Tier 2 (post-gate — workers, GF-2/GF-1)
**Phase A — additions catalogue (n'altère AUCUNE page live)** : (1) unifier le masthead (variant + champs opt.) ; (2) créer les 7 nouveaux types (schéma+demo+registry+composant+preview) ; (3) ajouter les variantes/champs opt. des APPROX. → build vert + GF-1 sur `/preview/<type>` de chaque nouveauté.
**Phase B — branchement pages live (GF-1 par page)** : router chaque inline vers son type (composable `sections:[...]` ou import direct), page par page, diff prod↔preview = 0. Surfaces à risque visuel = mastheads + grilles hub.
**Phase C — migration templates** : faire consommer le registry par les 18 templates (déjà amorcé, cf doc 22).
