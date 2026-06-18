# 10 : Audit catalogue de sections + langage d'interaction (Waimia v7)

> **READ-ONLY. Produit par audit 2026-06-18.** Carte de l'existant pour décider RÉUTILISER vs
> CRÉER avant toute mutation du DS. Source de vérité quantités : `src/data/section-quickref.json`
> (156 records exposés au catalogue) ; le registry `src/lib/section-registry.ts` déclare le
> mapping `type → composant`. Doctrine : `docs/strategy/10-architecture-finale-v7.md §6`.

---

## 0. Faits de cadrage (vérifiés)

- **Taxonomie exploitable = `subcategory`** du quickref (28 valeurs réelles), PAS `category`
  (uniforme `'marketing'` → inutile, confirmé `section-registry.ts:13`). Les 28 subcategories sont
  une vraie carte de familles ; je les regroupe en 15 familles fonctionnelles ci-dessous.
- **Compte** : 156 sections dans le quickref (catalogue exposé). Le registry importe ~160 types
  (quelques-uns non exposés au quickref). Les chiffres « 151 / 163 / 123 composants » des docs
  divergent selon ce qu'on compte (composants `.astro` vs types exposés vs imports) : le **156 du
  quickref** est la surface catalogue de référence.
- **Paper/Ink** : champ `background: z.enum(['paper','paper-2','paper-3','ink']).optional()`
  présent sur **132/156** sections (`sections.ts:24` et 100+ autres lignes). 24 sections SANS
  champ background (héros pleine-image, terminaux, manifestes pinnés, organismes spéciaux : liste
  §1). Chaque composant lit `data.background` et pose `data-bg` lui-même
  (`FeatureSplitMedia.astro:19` + règles `[data-bg='ink']` locales `:160-167`) ; `global.css`
  ajoute 5 règles transverses `[data-bg='ink']` (boutons CTA). `SectionsRenderer.astro` ne touche
  PAS au background : il délègue `{ data, lang }` au composant.

---

## 1. Carte des FAMILLES (15 familles dérivées des 28 subcategories)

Format : **Famille** → types exacts · rôle · support Paper/Ink · variants.

### A. Héros (`Hero Header Sections` 29 + `Hero Sections` 2 = 31)
`hero-conversion-funnel, hero-home, hero-centered, hero-split, hero-full-bleed, hero-liquid,
hero-offer-detail, hero-hub-stats, hero-hub-listing, hero-hub-masthead, hero-pillar-hub,
hero-academy-hub, hero-author, hero-case-study, hero-course, hero-detail-menu, hero-essay,
hero-form-inline, hero-social-proof, hero-landing, hero-lead-magnet, hero-problem-index,
hero-sector, hero-service-detail, hero-service-masthead, hero-tech-layer, hero-tunnel-step,
hero-utility-masthead, tunnel-step-hero, hero-atlas, tier-pyramid-svg`
- Rôle : ouverture de page, 1 par template, porte le `h1`. **DA ref = `hero-conversion-funnel`**
  (background `ink`, funnel kicker, h1+lede+meta_pills+benefits+stats : le plus riche).
- Paper/Ink : la plupart ont `background` ; exceptions sans champ = `hero-home`, `hero-centered`,
  `hero-split`, `hero-full-bleed`, `hero-liquid`, `hero-problem-index`, `tunnel-step-hero` (fond
  géré en dur, souvent ink/liquid natif).
- Variants : très riche (1 par nature de page : service, hub, secteur, auteur, cas, cours…).

### B. Preuve / Trust (`Logo Sections` 6 · `Stats Sections` 8 · `Testimonial Sections` 10 · `Trust Sections` 2 = 26)
- **Logos/social** : `logo-marquee, logo-wall, marquee-band, ecosystem-partners,
  integrations-grid, social-proof` : bandeaux logos clients/intégrations. DA ref = `logo-marquee`
  (`background: paper`, `grayscale: true`).
- **Stats/chiffres** : `stat-block, stat-counter, stats-bento, metric-shift, metric-callout-band,
  proof-bar, roi-band, spec-bar` : chiffres magnifiés + count-up (motion-signature). DA ref =
  `stats-bento` (`background: ink`, 4 stats sourcées Semrush/Afnic).
- **Témoignages/cas** : `testimonial-block, testimonial-single-spotlight, testimonial-metrics,
  testimonial-logo-metric, quote-spotlight, pull-quote-block, case-card-grid, case-spotlight,
  case-split, team-card-grid` : DA ref = `case-card-grid` (`background: ink`, 3 cas + lien hub).
- **Trust légal** : `trust-badges-band, trust-legal-section`.
- Paper/Ink : tous ont `background` SAUF `case-split, roi-band, terminal-*` (palette en dur).

### C. FAQ (`FAQ Sections` 4)
`faq-accordion, faq-two-column, faq-cta-aside, objection-handler` : DA ref = `faq-two-column`
(`background: paper-2`, miroir verbatim de `faq_fr`/`faq_en` → FAQPage JSON-LD). `faq-cta-aside`
= FAQ + panneau CTA **sticky** (`position:sticky` réel). Tous supportent `background`.

### D. CTA / Conversion (`CTA Sections` 9 · `Call-to-Action` 1 · `Newsletter` 2 · `Contact` 2 = 14)
`cta-band, cta-final, cta-inline, cta-form-inline, cta-split-visual, branded-callout,
department-cta, footer-cta-band, newsletter-band, cta-newsletter-footer, newsletter-signup-section,
tunnel-step-nav, contact-form, booking-embed` : DA ref final = `footer-cta-band` (`ink`, rounded).
`booking-embed` = Cal.com sticky. Tous `background` sauf `department-cta`.

### E. Comparatif / Tableau (`Comparison Sections` 10 · `Table Sections` 3 = 13)
`comparison-table, comparison-duo, comparison-pricing-callout, versus-competitors,
feature-comparison-grid, tech-models-table, tech-when-dual, editorial-table-block, fit-columns,
department-stack, workflow-table` + tables `data-table, terminal-table, editorial-write-feed`.
- DA ref = `comparison-duo` (Sans/Avec, `paper-2`). **Le plus riche en tableau = `versus-competitors`**
  (colonne « nous » mise en avant, check/cross/partiel) et `tech-models-table` (5 colonnes
  Modèle/Profil/Coût/Contexte/Usages, base `EditorialTable`). → famille bien couverte pour GEO
  (voir §4 sur la richesse manquante).

### F. Maillage interne / cartes liées (transverse : pas une subcategory)
`related-cards-band, editorial-preview, service-catalog-list, services-grid, use-case-index,
resource-card-grid, article-grid, course-catalog-table, learning-path-list, list-index-section,
case-card-grid (all_href)`. Rôle = hubs + cartes vers enfants. Support `background` quasi général.

### G. Process / Méthodo / Étapes / Timeline (`Process` 3 · `Timeline Sections` 4 · `Timelines` 3 = 10)
`process-steps, journey-steps, diagnostic-stages, method-timeline, timeline-block, how-we-ship,
maturity-pyramid, steps-horizontal, timeline-horizontal, tech-integration-flow`.
- DA ref = `method-timeline` (`paper-2`) + `diagnostic-stages` (`paper`, 6 stades de maturité).
- **`how-we-ship` = Sticky Editorial RÉEL** (`how-we-ship__sticky` `position:sticky`, wrap `380vh`,
  stage en cartes empilées qui défilent) : cf §2. Pas de `background` (palette en dur).

### H. Pricing / Offres (`Pricing Sections` 5)
`pricing-cards, pricing-table, pricing-toggle, pricing-single-highlight, pricing-comparison-matrix`
+ `offer-tier-grid, tier-pyramid-svg, inclusions-list, deliverables-grid`. DA ref = `pricing-cards`
(`paper`, 4 paliers). Tous supportent `background`.

### I. Définition / Réponse-directe (GEO) : **sous-couverte, voir §4**
`problem-statement` (DA ref `§ Définition`, `paper`, dropcap + statement macro-typo + stats) +
`editorial-dropcap-prose, editorial-callout, manifesto-block, branded-callout`. **Pas de bloc dédié
« réponse directe courte » GEO** (paire question→réponse 2-3 phrases en tête de page). Aujourd'hui
on détourne `problem-statement` (un énoncé de problème, pas une définition canonique).

### J. Terminal / Immersif / Système (`Terminal Sections` 5) : **À CONSERVER**
`agentic-terminal, terminal-mockup, terminal-table, terminal-metrics-strip, code-showcase` +
`product-reel, editorial-write-feed`. Rôle = preuve technique animée (saisie, flux système, reels).
Aucun `background` (palette terminal en dur). **Conserver intégralement** (directive v7 §6.2).

### K. Éditorial / Texte-riche (`Content` 1 · `Manifesto` 3 + atomes éditoriaux)
`editorial-prose, editorial-dropcap-prose, editorial-callout, editorial-dingbat-rule,
editorial-timeline, editorial-split-grid, pull-quote-block, manifesto-statement, manifesto-act,
asymmetric-services, manifesto-block`. **`manifesto-statement` = Sticky Editorial pinné** (cf §2).

### L. Bento / Grid (`Feature Sections` 33, le plus gros bucket)
`feature-grid, feature-zigzag, feature-tabs, feature-accordion, feature-split-media,
feature-comparison-grid, bento-grid, stats-bento, icon-trio, commitments-grid, deliverables-grid,
problems-grid, pain-points, challenges-grid, decision-list, persona-attributes-grid,
operating-layer, why-stalls, architecture-diagram, tech-capabilities-specs, tech-positioning-split,
tech-stack-band, coming-soon-pills, guarantee-block, …` : la réserve de blocs de contenu. Support
`background` quasi général.

### M. Médias / Mockup (`Gallery Sections` 2)
`media-block, gallery-masonry` + `feature-split-media, cta-split-visual, product-reel`.

### N. Auteur / E-E-A-T (`Team Sections` 1 · `About Sections` 1 + héros)
`team-bio-grid, about-story-split, hero-author, team-card-grid`. **Pas de bloc « auteur d'article »
compact inline** (nom + photo + rôle + date + lien profil sous un h1 d'article) : voir §4.

### O. Utility / Bannière (`Utility` 1 · `Banner` 1)
`welcome-section, announcement-banner`.

---

## 2. Audit du langage d'interaction (4 effets validés v7)

### Système Progressive Reveal : **EXISTE, sobre, conforme** ✅
- `src/lib/animations/scroll-reveal.ts` : IntersectionObserver double seuil (standard 0.08 / tall 0
  pour éléments plus hauts que le viewport, bug mobile R1 corrigé). Idempotent, re-jouable après
  View Transitions (`astro:page-load`). Bypass total sous `prefers-reduced-motion`.
- `src/styles/scroll-reveal.css` : la classe `.reveal` de base = `opacity:0` + `translateY(12px)`
  + `blur(8px)` → `is-visible/in`. **Sobre et imperceptible** (12px, conforme « translation
  légère »). Variantes : `.reveal-stagger` (délai 60ms/enfant, jusqu'à 12), `.reveal-fade`,
  `.reveal-slide`, `.reveal-snap`, `.reveal-mask-up` (28px), `.reveal-zoom-in` (scale .95),
  `.reveal-blur-clip`, `.reveal-curtain` (rideau ::before/::after), `.reveal-split-letter`
  (`.s-char` translateY 105%). Parallaxe scroll-linked léger via `[data-par]`.
- Câblage : monté dans `Base.astro` (global) + rejoué dans `/preview/[type]/animated.astro`. Usage :
  classes `.reveal*` dans 67 composants `sections/*.astro`. **PARTIEL côté discipline** : c'est le
  composant qui décide d'ajouter `.reveal` : pas un champ de schéma `motion`. Donc l'effet n'est pas
  pilotable depuis le MDX, il est codé dans chaque section.
- `src/lib/animations/motion-signature.ts` : 2 moments signature scroll-driven : (1) **manifesto
  progressif** (mots qui s'allument `--ms-lit` piloté par scroll, lié au pin sticky `data-ms-pinned`)
  ; (2) **count-up des métriques** (chiffres 0→valeur à l'entrée viewport, 0 CLS, format préservé).
  Sélecteurs : `.metric-callout__value, .stat-block__value, .proof-bar__value, .manifesto-act__stat-k`.

### Les 4 effets validés v7

| Effet | État | Preuve (`fichier:ligne`) |
|---|---|---|
| **Progressive Reveal** | ✅ EXISTE (sobre, complet) | `scroll-reveal.ts` + `scroll-reveal.css:7-23` ; câblé `Base.astro` |
| **Sticky Editorial** | 🟡 PARTIEL (2 implémentations spécifiques, pas générique) | `ManifestoStatement.astro:21` (`data-ms-pinned`, track `min-height:280vh`, section `position:sticky` `:117-120`, narration mots via `motion-signature.ts:76-104`) ; `HowWeShip.astro:27,75-77` (`__sticky position:sticky`, wrap `380vh`, stage cartes) ; `FaqCtaAside`/`booking-embed` = panneau CTA sticky. **MAIS** : pas de primitive réutilisable « titre fixe + contenu qui défile » exposée comme effet de catalogue ; chaque cas est codé en dur dans son composant. |
| **Container Expansion** | ❌ MANQUE | `grep container-expand\|scroll-expand\|data-expand src/` = 0. Aucune carte qui s'agrandit au scroll (marges/radius qui diminuent, occupe le viewport). |
| **Scroll Morph** | ❌ MANQUE | `grep morph src/` = 0. Aucun élément qui se transforme en un autre (carte→section, mockup→dashboard). |

**Terminal / saisie / système (à conserver)** : famille J (5 types) + `editorial-write-feed`
(saisie animée), `product-reel`. Effets de frappe/flux codés dans les composants. Aucun à toucher.

---

## 3. Mécanisme d'ajout (preuve par l'exemple)

### 3.a Ajouter un nouveau TYPE de section : 4 touchpoints synchronisés
Exemple réel bout-en-bout : `key-metric-grid` (bloc `[editorial-atoms]`).
1. **Schéma** `src/schemas/sections.ts:3596` → `keyMetricGridSchema = z.object({ type:
   z.literal('key-metric-grid'), background: z.enum([...]).optional(), … })`, puis ajouté à la
   discriminatedUnion `:3858` (et donc au type `SectionType`).
2. **Demo** `src/lib/section-demos.ts:3166` → `'key-metric-grid': { type:'key-metric-grid', … }`
   (données bilingues fr/en, consommées par `/preview` et `/library`).
3. **Registry** `src/lib/section-registry.ts:1792` → import du composant + entrée
   `'key-metric-grid': { component: KeyMetricGrid, category, subcategory, categorySlug, tags,
   status, description_fr/en }`.
4. **Composant** `src/components/sections/KeyMetricGrid.astro` → reçoit `{ data, lang }`, lit
   `data.background` → `<section … data-bg={data.background}>`.

> **Le « 5ᵉ touchpoint » manifest (`ds-section-manifest.json`) du CLAUDE.md n'est PAS requis** :
> `grep key-metric-grid ds-section-manifest.json` = 0. Le manifest n'est pas régénéré pour chaque
> nouveau type ; les **4 touchpoints du §6 doctrine font foi**. `section-quickref.json` est lui
> aussi un dérivé (généré), pas un touchpoint à éditer à la main.

Sécurité : un MDX `sections:` qui référence un type absent du registry → `SectionsRenderer.astro`
log `[SectionsRenderer] Type inconnu` et rend `null` ; un schéma manquant casse la validation Zod
au build (anti-orphelin volontaire, `services/[...slug].astro:28-29`).

### 3.b Ajouter un nouvel EFFET d'animation proprement (0 nouveau token DS)
Pattern existant à suivre (le plus propre) : **classe CSS `.reveal-*` dans `scroll-reveal.css` +
ajout du sélecteur à `REVEAL_SELECTOR` dans `scroll-reveal.ts:17-36`**. L'observer applique
`.is-visible/.in` → la transition CSS joue. Reduced-motion déjà géré globalement (`:177-197`).
- Pour un effet **scroll-driven continu** (Container Expansion, Scroll Morph) : suivre le pattern
  `motion-signature.ts` / `scroll-reveal.ts` parallax : un module `src/lib/animations/*.ts` qui lit
  `getBoundingClientRect()` sur un `[data-attr]`, calcule une progression et écrit une CSS custom
  property (`--x`) en `requestAnimationFrame`, monté dans `Base.astro`, neutralisé sous reduced-motion
  et sur mobile (cf le track `280vh` désactivé `≤768px` dans `ManifestoStatement.astro:127-141`).
- Toutes les durées/easings sont des variables existantes (`--dur-slow`, `--dur-reveal`, `--ease-out`)
  → 0 nouveau token. Les marges/radius d'une Container Expansion s'interpolent sur
  `calc()` de variables existantes (`--space-*`, `--radius-*`), pas de token neuf.
- Si un effet a besoin d'un champ pilotable depuis le MDX (ex. `expand: true`), c'est un champ de
  **schéma** (touchpoint 1) sur la/les section(s) concernée(s), pas un token DS.

---

## 4. Gap → à CRÉER

### Effets manquants (les 2 vrais trous + 1 à généraliser)
| Effet | Décision | Effort estimé |
|---|---|---|
| **Container Expansion** | CRÉER neuf. Module `src/lib/animations/container-expand.ts` (scroll-driven, interpole margin/border-radius/scale d'une carte `[data-expand]` vers plein-viewport) + classe CSS + champ schéma opt-in sur les sections immersives (cas, dashboards, démos). | Moyen (~1 module ~120 l + CSS + 1 champ schéma). Réutilise le pattern rAF de `motion-signature.ts`. |
| **Scroll Morph** | CRÉER neuf. Module `scroll-morph.ts` (cross-fade/transform d'un élément A vers B sur plage de scroll, `[data-morph-from]/[data-morph-to]`). Plus délicat (2 éléments superposés). Réserver aux sections démo/transformation. | Moyen-élevé (~1 module + composant porteur, ex. mockup→dashboard). |
| **Sticky Editorial** | GÉNÉRALISER l'existant. Extraire la primitive de `HowWeShip`/`ManifestoStatement` en effet réutilisable (wrapper sticky + track `Nvh` + slot contenu défilant) pour l'appliquer à méthodo/process/storytelling au-delà des 2 composants actuels. | Faible-moyen (le mécanisme existe, c'est de l'extraction/généralisation). |

### Familles / variants sous-couvertes pour l'archi cible
| Besoin (archi v7) | Existant le plus proche | Décision |
|---|---|---|
| **Réponse-directe / définition GEO** (bloc court Q→R 2-3 phrases + entités, en tête de page, source FAQPage/DefinedTerm JSON-LD) | `problem-statement` (énoncé de problème) + `editorial-dropcap-prose` | **CRÉER** un type dédié `direct-answer` / `definition-block` (court, GEO-first, dropcap optionnel, schema DefinedTerm). Réutiliser le markup macro-typo de `problem-statement` en l'étendant. Effort : faible. |
| **Tableau comparatif riche** (multi-colonnes, check/cross/partiel, colonne « nous » accentuée, lignes groupées) | `versus-competitors` + `tech-models-table` + `comparison-table` | **RÉUTILISER en l'étendant** : la famille E couvre déjà bien le besoin. Vérifier que `versus-competitors` gère assez de colonnes/groupes pour les pages comparatif ; sinon variante. Effort : faible (variante au besoin). |
| **Bloc auteur E-E-A-T** (auteur d'article inline : photo+nom+rôle+date+lien profil, sous h1 article) | `hero-author` (page auteur entière), `team-bio-grid` (grille équipe) | **CRÉER** un atome compact `author-byline` (inline, 1 auteur, date publiée/màj, schema Person/Author). `hero-author` est trop lourd pour un en-tête d'article. Effort : faible. |
| Template **article (blog)** complet | atomes éditoriaux (K) + `article-grid` (listing) | RÉUTILISER : composer hero-essay + author-byline (à créer) + editorial-prose + faq + related-cards. |
| Template **étude de cas** | `hero-case-study, case-split, case-spotlight, stats-bento` | RÉUTILISER. Candidat n°1 pour Container Expansion (immersif). |
| Template **démonstration** | famille Terminal (J) + `product-reel` | RÉUTILISER. Candidat n°1 pour Scroll Morph (mockup→dashboard). |
| Template **diagnostic / audit** (transactionnel) | `diagnostic-stages, maturity-pyramid, pricing-cards, contact-form, booking-embed` | RÉUTILISER intégralement. |
| Template **locale / implantation** | `hero-sector, hero-service-detail, related-cards-band, footer-cta-band` | RÉUTILISER. |

**Bilan création nette minimale** : 2 effets neufs (Container Expansion, Scroll Morph) + 1 effet
généralisé (Sticky Editorial) + 3 atomes de section (direct-answer GEO, author-byline E-E-A-T,
éventuelle variante comparatif riche). Tout le reste = composition de l'existant.

---

## 5. Séquence FLAGSHIP proposée : `/services/integrateur-claude`

**DA de référence (séquence + rythme Paper/Ink exacts, `site-web-intelligent.mdx`)** : vérifié :
`ink → paper → paper → paper-2 → ink → paper → paper-2 → paper-2 → paper → ink → paper-2 → paper
→ paper-2 → ink`. (Le 2ᵉ service réel `content-marketing-intelligent` suit le MÊME patron.)
Rythme = ouverture `ink`, respirations `paper/paper-2`, 2 climax `ink` (preuve cas + stats marché),
clôture `ink`. **À répliquer.**

`integrateur-claude` n'a pas encore de contenu (`src/content/services/` n'a que site-web-intelligent
+ content-marketing-intelligent + 2 refs). Séquence proposée (1 `h1`, `h2/h3` logiques, GEO-first) :

| # | type | background | effet | rôle / titres |
|---|---|---|---|---|
| 1 | `hero-conversion-funnel` | **ink** | reveal (hero) | **h1** « Intégrateur Claude & Claude Code » + lede + meta_pills + stats. Ouverture (DA ref). |
| 2 | **`direct-answer`** ⚠️À CRÉER | paper | reveal | **Bloc GEO obligatoire** : définition courte « Qu'est-ce qu'un intégrateur Claude ? » + réponse directe 2-3 phrases. h2. DefinedTerm JSON-LD. |
| 3 | `logo-marquee` | paper | reveal | Écosystème (Anthropic, Claude Code, MCP, agents). Trust. |
| 4 | `problems-grid` | paper-2 | reveal-stagger | h2 « Là où l'IA déraille en interne » (gouvernance, shadow-AI, intégration). |
| 5 | `tech-positioning-split` ou `tech-capabilities-specs` | paper | reveal | h2 capacités (agents, skills, gouvernance, MCP). Famille L. |
| 6 | `method-timeline` | paper-2 | **Sticky Editorial** (à généraliser) | h2 méthode d'intégration (cadrage→déploiement→gouvernance). |
| 7 | `case-card-grid` | **ink** | reveal | **Climax 1** : cas clients réels. h2. Candidat Container Expansion. |
| 8 | **`versus-competitors`** (variante riche) | paper-2 | reveal | **Tableau comparatif GEO** : intégrateur Claude vs agence classique vs DIY. h2. |
| 9 | `deliverables-grid` | paper | reveal-stagger | h2 livrables (agents, runbooks, gouvernance, formation). |
| 10 | `stats-bento` | **ink** | count-up | **Climax 2** : chiffres marché IA (sourcés). h2. |
| 11 | `pricing-cards` | paper | reveal | h2 paliers d'offre. |
| 12 | **`author-byline`** ⚠️À CRÉER + `about-story-split` | paper-2 | reveal | **E-E-A-T** : fondateur, date, expertise Claude. h2. |
| 13 | `faq-two-column` | paper-2 | reveal | **FAQPage JSON-LD** (miroir frontmatter `faq_fr/en`). h2. Bloc GEO obligatoire. |
| 14 | `footer-cta-band` | **ink** | reveal | Clôture conversion (diagnostic 45 min). |

**Blocs GEO obligatoires couverts** : définition+réponse directe en tête (#2, À CRÉER), FAQ schema
(#13, existe), tableau comparatif (#8, à étendre), auteur+date E-E-A-T (#12, byline À CRÉER).
**À CRÉER pour ce flagship** : `direct-answer` (#2), `author-byline` (#12), variante riche de
`versus-competitors` si besoin (#8). **Tout le reste = sections existantes**, rythme Paper/Ink
calqué sur la DA ref. Effet à généraliser avant ce build : Sticky Editorial (#6). Container
Expansion/Scroll Morph = bonus immersif (#7/démos), pas bloquants pour le flagship.

---

## 6. GF-1 : vérifier empiriquement un effet sur `/preview/<type>/animated`

`/preview/[type]/animated.astro` rejoue les vrais reveals (monte `scroll-reveal.ts`, ne neutralise
PAS l'opacity comme la route statique). Protocole (chromium headless jetable, pas le MCP partagé) :

```js
// node + playwright, script /tmp
const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 900 });
await p.goto('<preview-url>/preview/<type>/animated'); // Vercel preview ou serve-dist local
// 1. avant scroll : un .reveal doit être à opacity 0
const before = await p.$eval('.reveal, .reveal-stagger', el => getComputedStyle(el).opacity);
// 2. scroll jusqu'à l'élément
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(1500);
// 3. après : opacity 1 + transform neutre
const after = await p.$eval('.reveal, .reveal-stagger', el => {
  const cs = getComputedStyle(el); return { opacity: cs.opacity, transform: cs.transform };
});
await p.screenshot({ path: '/tmp/effect.png', fullPage: true });
// assertion : before==='0' (ou proche) ET after.opacity==='1' ET transform neutre/none
console.log({ before, after }); await b.close();
```
Pour un effet scroll-driven (expansion/morph/sticky), scroller par paliers et asserter la CSS
custom property (`--ms-lit`, `--expand`) ou la `transform` à chaque palier + screenshots étagés.
Toujours tester aussi `prefers-reduced-motion: reduce` → tout doit être révélé immédiatement
(`scroll-reveal.css:177-197`).
