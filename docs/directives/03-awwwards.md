# 44 · Directive finale Awwwards (Simon, 2026-06-11 10:40)

> Références visuelles committées : `docs/visual-audit/references/ref-finance-compta.png` (page secteur cible) et `ref-offre-deploiement.png` (page offre cible). Ces 2 maquettes SONT la direction design : s'y conformer.

## Demandes (verbatim condensé)

1. **Bibliothèque trop pauvre** : ce qui a été fait pour les héros (variantes, dark) doit l'être pour CHAQUE catégorie ; pas assez de variantes par type.
2. **Espacements + alignements cohérents sur chaque template** ; recomposer les mises en page (templates) comme la home l'a été.
3. **Copywriting** à améliorer page par page ; contenu ajouté si besoin ; images ajoutées.
4. **Typo** : encore trop de h2/h3 en Instrument Serif sur des PHRASES ENTIÈRES. Serif = QUELQUES MOTS d'emphase max (docs/41, jamais exécuté en transverse).
5. **Sections manquantes** : caractéristiques, optimisation GEO/SEO, conversion, réassurance (testimonials, certifications, récompenses), variation comme la home.
6. **Images** : habiller davantage, stylisées AU BON ENDROIT dans des blocs de section composés, pas « en mode brut » (le media-block pleine largeur actuel des cas est l'anti-exemple).

## Patterns des maquettes à cataloguer/répliquer

ref-finance-compta (secteur) : hero 2 col (fait) · « Pourquoi ça bloque » 3 colonnes numérotées 01/02/03 · « Workflows clés » table éditoriale (agent / modèle / impact chiffré accent) · « L'impact chiffré » bandeau 4 métriques massives · « Un cas concret » carte INK avec image + métriques latérales + citation barre accent · « Où en êtes-vous ? » auto-diagnostic 5 stades (cards cliquables, stade actif accent) · « Stack » grid 2 rangées (modèles + infra avec tags) · CTA ink « Votre équipe finance, augmentée ».
ref-offre-deploiement (offre) : hero INK · proof-bar 3 métriques (12% / 87% / 2,4h) · « Méthode Waimia » 4 phases numérotées · « Livrables » grid 6 cards avec tag méta · témoignage chiffré + 4 métriques · « Stack » chips · « Aller plus loin » 3 services liés · CTA ink « Prêt à déployer ? » · **bandeau confiance footer : Partenaire Anthropic · Claude Certified Architect · expert IA · AI Act ready · RGPD · ISO 27001** (réassurance).

## Exécution (vagues, coordination ORCH-STATE)

W1 typo-serif transverse (docs/41, global.css + composants, paired computed) · W2 gap-analysis maquettes vs catalogue → types manquants (diagnostic-stages, case-spotlight-ink, trust-band certifications, testimonial-metrics, deliverables-grid…) + variantes par catégorie · W3 recomposition templates secteurs/offres sur le modèle des maquettes (copywriting + images habillées) · W4 images en blocs stylisés (remplacer les media-blocks bruts) · puis variantes systématiques par catégorie, GF-1 prod à chaque batch.

---

## Addendum 2026-06-20 · Direction raffinée + méthode de composition (Simon, verbatim condensé)

### A. Cible de qualité (non négociable une fois tous les chantiers au vert)
Niveau **awwwards** : registre d'une agence créative de création de site, pas d'un thème. Mais **côté classique-moderne d'un cabinet de conseil qui inspire confiance** : pas de gadget. Inspirations : **Linear, Stripe, Anthropic, OpenAI, Apple**. Langage visuel : **minimalisme + éditorial tech + swiss** (grille, hiérarchie typographique forte, blanc maîtrisé) + **animations/effets subtils** qui cassent la monotonie éditoriale → site **narratif/immersif qui donne envie de scroller**, où l'effet **sert le contenu** (jamais décoratif gratuit).

### B. Méthode de composition OBLIGATOIRE (correction Simon · anti-réductionnisme)
**Interdit** : la règle uniforme appliquée sans réflexion (« tout est à gauche donc on aligne tout à gauche », « tout centré ») = réducteur et irréfléchi. **Interdit aussi** : focaliser l'analyse sur le hero et survoler le reste.
**Obligatoire** : passer **chaque section au crible**, pour elle-même ET dans la page, sur 4 axes :
1. **Philosophie** : que fait cette section (accroche / preuve / respiration / différenciation / climax / réassurance) ?
2. **Chronologie** : où arrive-t-elle dans le parcours de lecture (ouverture, montée, plateau, bascule, clôture) ?
3. **Rythme** : alterne-t-elle avec ses voisines (densité, fond ink/paper, pleine largeur vs colonnes, statique vs animé) ou crée-t-elle une monotonie / un doublon de traitement ?
4. **Hiérarchie** : alignement (gauche/centré), poids typo, place du CTA → décidés **par le rôle de la section**, harmonisés à l'échelle de la page, pas par recette globale.
Le livrable de cette méthode = une **doctrine de composition par section** (table : section · rôle · traitement visuel · alignement · animation) avant toute exécution.

### C. Enrichir SANS enterrer (catalogue à deux étages)
Tout travail de design **enrichit** le catalogue, il **n'enterre jamais** les socles solides déjà livrés. On garde **deux étages** par famille :
- **Standard / classique** : la section sobre et fiable (déjà en prod) — reste disponible.
- **Créative / immersive** : une ou plusieurs **variantes travaillées** (déclinaisons) ajoutées via le DS (4 touchpoints + DS Studio, variables figées). On **compose** la page en piochant l'étage adapté au rôle du slot (créatif aux climax, classique aux respirations).

### D. Animations / effets = chantier réel, pas encore livré
Les effets type **Container Expansion** (une section démarre en carte/conteneur encadré, puis au scroll s'agrandit, marges qui se réduisent, bordures/radius qui s'effacent jusqu'à occuper le viewport — pour sections immersives, études, cas, blocs narratifs) **existent techniquement mais sont aujourd'hui trop subtils / non câblés** sur le flagship → ils relèvent du chantier design, ce n'est pas un bug. Système d'animation à concevoir comme **primitives réutilisables** (scroll-driven reveal, expansion, parallax léger), respect `prefers-reduced-motion`, jamais one-off. Skills à mobiliser : front-end-design, ui-ux-pro-max, et les plugins d'animation (motion-framer, animejs, scroll-reveal, locomotive-scroll, lightweight-3d-effects).

### E. Contraintes de conversion + SEO/GEO
Page **impactante mais pas trop longue** : astuces UI/UX (progressive disclosure, ancrage, condensation visuelle) pour réduire la longueur perçue **sans amputer** la matière nécessaire à la conversion ni au SEO/GEO (contenu indexable préservé, `direct-answer` et FAQ conservés).

### F. Séquencement proposé (à valider avec Simon)
1. **Illustrations** (manifeste 11 §5.5, 28 visuels, top 8) : habiller d'abord — c'est le manque visuel n°1 et un prérequis pour juger la composition.
2. **Doctrine de composition section-par-section** (méthode B) sur le flagship + DA/motion language (réf Linear/Stripe/Anthropic).
3. **Variantes créatives** ajoutées au catalogue (étage créatif, méthode C) + recomposition du flagship.
4. **Polish awwwards** : rythme global, micro-interactions, Container Expansion aux bons slots, GF-1 section-par-section.

### G. Signal de composition repéré 2026-06-20 (flagship `integrateur-claude`)
Sur les 19 slots : `versus-competitors` **2×** (slots 4 et 12) et `related-cards-band` **2×** (slots 11 et 15). À trancher dans la doctrine B : répétition intentionnelle (deux angles de différenciation distincts) ou monotonie à dédoublonner / différencier de traitement.

---

## Addendum 2026-06-29 · Règles créatives ENRICHIES + bibliothèque de patterns (Simon, 2 interrupts)

> Source de vérité unique de la direction créative (rule 59). Ce bloc est la **référence à embarquer dans CHAQUE brief de worker section/variante**. Il augmente les possibilités de composition et fixe les contraintes dures (compat système + library, DS-driven, images réelles du repo). Inventaire de référence (vérifié 2026-06-29) : **200 types** `src/sections/<type>/`, **42 rasters** `public/images/editorial/`, **28 paires duotone** `public/images/illustrations/ds/*-{ink,paper}.webp`, **12 line-art** `public/images/line-art/`, + dossiers `dashboards/ cas/ cases/ besoins/ textures/ themes/`.

### H. Cadre de variation enrichi (augmenter les possibilités, sortir des défauts)
Objectif : composition d'auteur, pas « 2 colonnes / 3 cartes ». Tout type ou variante peut explorer LIBREMENT ces axes, **dans les tokens DS** :

1. **Grille** : 1 à 12 colonnes + grilles custom (5/7, 8/4, 9/3, 2/3/7), grilles nichées (subgrid), grille brisée (broken grid, décalage maîtrisé). Pas que du 6/6.
2. **Spans variables** : `col-span` ET `row-span` libres par item (une carte 4 col à côté de deux cartes 2 col ; un item sur 2 rangées). Bento asymétrique.
3. **Lignes (rows) variables** : nombre de rangées libre, hauteurs différentes (`auto` / `fr` / `clamp`), rangées de densité différente dans une même section.
4. **Proportions non conventionnelles** : 10/90 jusqu'à 90/10, 1/5, 1/3, 2/3, 70/30, 62/38 (nombre d'or). Un média peut ne prendre QU'1/5 pour habiller un vide sans le remplir.
5. **Ratios d'image** : 1:1, 4:3, 3:2, 16:9, 21:9 (cinémascope), 9:16 (portrait), 4:5. Choisir le ratio par le RÔLE (climax cinémascope, vignette carrée, portrait éditorial).
6. **Gaps variables** : serrés (contact-sheet, densité) vs larges (respiration, luxe) ; gap non uniforme entre rangées.
7. **Vide actif (active whitespace)** : le blanc / le fond comme matière, pas un reste. Habiller un espace d'une rangée avec un fond, une texture (`public/images/textures/`), un line-art ou un média 1/5 plutôt que de l'étirer.
8. **Densité (crans `--section-tight/base/loose/grand`)** : alterner pour le rythme inter-section.
9. **3 niveaux d'expression par famille** (étage créatif §C) : **sobre** (classique fiable, déjà prod) / **expressive** (composition travaillée, média habillé) / **signature** (climax, 1 par page max, effet mémorable). La signature porte l'audace ; tout le reste reste discipliné (restraint, réf §A).

### I. Le « bloc » : contraintes dures de CHAQUE section/variante (non négociable, à coller dans le brief)
- **Compatible SYSTÈME + LIBRARY** : toute section/variante = composant catalogue (5 touchpoints schema/demo/registry/component/manifest, OU module co-loc `src/sections/<type>/`). JAMAIS de markup orphelin inline dans une page ou un template (règle d'or anti-orphelin, CLAUDE.md). Une variante = un champ d'enum / des props sur le composant, rendu via `section-registry`.
- **DS-DRIVEN** : 100 % `var(--token)`. **0 nouveau token DS. 0 valeur hardcodée** (couleur, espacement, radius, durée, ratio de rythme). Valeurs Tailwind / calculs / transparences SUR tokens existants = OK. Si une idée EXIGE un nouveau token ou une nouvelle primitive : la **signaler explicitement**, ne pas hardcoder en douce (rule 60).
- **IMAGES RÉELLES DU REPO** : représentations crédibles et propriétaires, **pas de placeholder générique**. Mapper chaque pattern à un asset réel (éditorial surréaliste coral/teal, duotone ink/paper, line-art SVG, dashboards, cas). Si une représentation réelle existe, l'utiliser. Mapping §K.
- **RESPONSIVE BY DESIGN** : mobile REPENSÉ, pas rétréci. bento -> stack ; sticky-rail -> stepper ; hover -> tap / état visible ; rail horizontal -> swipe ; 2 col -> 1 col hiérarchisée. Tester desktop + tablette + mobile (GF-1).
- **PURPOSE-DRIVEN** : chaque section sert (expliquer / prouver / rythmer / convertir / orienter / hiérarchiser / rassurer / différencier / mémoriser). L'effet sert le contenu, jamais décoratif gratuit (§A, §D).
- **CMS-SAFE** : contenu = props / frontmatter / collections, variable en longueur. La composition tient avec 2 items comme avec 6, titre court comme long.
- **COPY** : 0 tiret cadratin U+2014 (gate `check-no-emdash`, rule 58). Sentence case, voix active.
- **PREUVE GF-1** : pas « fini » sans screenshot above-fold + `getComputedStyle` (opacity ≠ 0, transform neutre), desktop + mobile, sur preview / `dist`.

### J. Taxonomie des ~130 patterns mappée au catalogue (GF-4, vérifié contre `src/sections/`)
Légende : **✅ EXISTE** (famille présente) · **◐ VARIANTE** (étage créatif à ajouter sur une famille existante, via DS Studio + sync) · **✦ GAP** (nouvelle famille à créer, tâche #80).

**Grilles & structure**
- Bento / bento asymétrique : ✅ `bento-grid`, `media-bento`, `stats-bento` (◐ spans/rows variables, ratios mixtes)
- Mosaïque / contact-sheet : ✅ `gallery-masonry`, `photo-cluster`
- Grille suisse 12 col / éditoriale : ✅ `hero-grid-12`, `editorial-split-grid` (◐ grilles custom 5/7, 8/4)
- Grille brisée (broken grid) : ◐ `asymmetric-services`, `hero-asymmetric-grid`
- Vide actif / remplissage asymétrique (1/5) : ◐ AXE de variation (§H.4/H.7), pas une famille
- Cartes flottantes / cadre brutaliste : ◐ axes (ombre éditoriale subtile, cadre hairline) sur `feature-grid`, card-grids

**Split & média**
- Split éditorial : ✅ `editorial-split-grid`, `feature-split-media`, `case-split`, `tech-positioning-split`
- Full-bleed / média pleine largeur : ✅ `hero-full-bleed`, `media-block` (◐ 21:9, overlay texte)
- Image-dominante / texte-dominant : ◐ axes de dosage sur `feature-split-media` / `media-bento`
- Duotone treatment : ✅ asset `illustrations/ds/*-{ink,paper}` + idiome `[data-bg=ink]`
- Avant / après : ◐ `comparison-duo`, `metric-shift` (✦ slider visuel avant/après = variante motion optionnelle)
- Signal vs bruit : ◐ variante `comparison-duo` / `objection-handler`

**Narratif & scroll (coeur de la demande awwwards)**
- Sticky scroll storytelling (rail texte sticky + média qui change au scroll, le « menu sticky ») : **✦ GAP -> `sticky-scroll-storytelling`** (#80)
- Hover reveal on words (mot -> image dans un rectangle, suit le curseur) : **✦ GAP -> `hover-reveal-words`** (#80). NOTE : `hover-reveal-list` existe mais c'est une LISTE, pas le reveal au niveau du mot.
- Scroll-synced tabs : ◐ `feature-tabs` + sync scroll (primitive motion #80)
- Mask reveal / scroll zoom / parallaxe / image sequence / container expansion : **✦ PRIMITIVES MOTION** réutilisables (#80, §D), `prefers-reduced-motion`
- Marquee / ruban défilant : ✅ `marquee-band`, `logo-marquee`

**Preuve & données**
- Proof strip / spec bar : ✅ `proof-bar`, `spec-bar`, `trust-badges-band`
- Data cards / mini-dashboard / matrice : ✅ `key-metric-grid`, `stats-bento`, `data-table` (+ assets `dashboards/`)
- Bandeau métriques massives : ✅ `metric-callout-band`, `roi-band`, `stat-block`, `stat-counter`
- Mur de livrables / wall of outputs : ✅ `deliverables-grid`, `product-reel` (◐ traitement mur dense)
- Document stack / pile de documents : ✅ `stack-cards` (◐ variante pile avec assets `cas/`)
- Carte de maturité / stades : ✅ `maturity-pyramid`, `diagnostic-stages`, `tier-pyramid-svg`
- Témoignages chiffrés / réassurance : ✅ `testimonial-metrics`, `testimonial-logo-metric`, `eeat-panel`, `trust-badges-band`

**Système & produit**
- Blueprint / system map : ✅ `architecture-diagram`, `system-flow`, `tech-integration-flow`
- Operating system visual : ✅ `operating-layer`, `agentic-terminal`
- Browser / device mockup : ✅ `terminal-mockup`, `code-showcase`, `product-reel` (◐ device-frame variante)
- Flux / process : ✅ `method-stepline`, `method-timeline`, `process-steps`, `journey-steps`, `steps-horizontal`

**Éditorial & rythme**
- Manifesto : ✅ `manifesto-act`, `manifesto-block`, `manifesto-statement`
- Timeline : ✅ `editorial-timeline`, `timeline-block`, `timeline-horizontal`
- Case study preview : ✅ `case-featured-grid`, `case-spotlight`, `editorial-preview`
- Project / use-case index : ✅ `use-case-index`, `list-index-section`, `service-catalog-list`
- Visual menu : ◐ `hero-detail-menu`, `tunnel-step-nav` (◐ variante menu visuel illustré)
- Dropcap / prose / dingbat : ✅ `editorial-dropcap-prose`, `editorial-prose`, `editorial-dingbat-rule`
- Pull quote / quote spotlight : ✅ `pull-quote-block`, `quote-spotlight`

**Hero** : ~45 types ✅ (exhaustif, étage signature déjà présent : `hero-media-medallion`, `hero-masthead-card`, `hero-magazine-cover`, `hero-numeral-cover`, etc.)

**BILAN** : sur ~130 familles demandées, la grande majorité **existe (✅)** ou relève de **l'étage créatif / variante (◐)** d'une famille présente. Les vrais **GAP (✦)** sont peu nombreux et concentrés sur le **narratif scroll** : `sticky-scroll-storytelling`, `hover-reveal-words`, + un socle de **primitives motion réutilisables** (#80). Donc le travail = surtout **ENRICHIR** (étage créatif §C : variantes via DS Studio + sync 5 touchpoints, spans/rows/ratios variables, assets réels) + **construire 2-3 familles narratives manquantes**, PAS réinventer 130 sections.

### K. Mapping family -> assets réels du repo (extrait, à compléter par famille)
- **Surréaliste coral/teal** (`public/images/editorial/`, 42) : héros signature, `case-spotlight`, `manifesto`, full-bleed climax. Ex : `burning-boat-style` (transformation), `chess-style-16` (stratégie), `stylemoneymoney`/`moneyinthepig` (ROI), `nonoyes` (décision), `womancomputer17` (IA au travail), `peopleandicecreamcar` (équipe).
- **Duotone ink/paper** (`public/images/illustrations/ds/`, 28 paires) : sections bicolores selon `background` (paper -> `*-paper`, ink -> `*-ink`). Idéal `media-bento`, `feature-split-media`, `hover-reveal-words`. Ex : `chess`, `men-on-hand`, `car-on-the-road`, `computer-crash-landscape`, `no-no-yes`, `money-money`.
- **Line-art SVG** (`public/images/line-art/`, 12) : schémas système, livrables, problèmes. `dispositif-flow`, `orbit-network`, `livrable-*`, `probleme-*`. Pour `architecture-diagram`, `system-flow`, `deliverables-grid`, `statement-orbit`. Footgun `currentColor` via `<img>` : couleur explicite DANS le SVG (cf memory `svg-currentcolor-ink-img-footgun`).
- **`dashboards/`** : mini-dashboard, data-cards, `stats-bento` (représentations produit crédibles).
- **`cas/` + `cases/`** : document stack, case preview, wall of outputs.
- **`textures/` + `themes/`** : fonds de vide actif (§H.7).

### L. Plan de build (décomposé, worktree-isolé, GF-1 par livraison)
1. **#80 GAP narratif** (priorité, coeur de la demande) : `sticky-scroll-storytelling` + `hover-reveal-words` + primitives motion réutilisables (`prefers-reduced-motion`).
2. **◐ Étage créatif** : enrichir les familles media-first aux 3 niveaux (sobre / expressive / signature) avec spans/rows/ratios variables + assets réels, via DS Studio + sync 5 touchpoints.
3. **#81 Recomposer SWI** en 3 dosages (sélectif / riche / intermédiaire) à `/preview-swi/a|b|c`, en piochant l'étage par rôle de slot (signature aux climax, sobre aux respirations). Comparaison locale, Simon choisit.
4. **Polish** : rythme inter-section (alternance ink/paper, densité, statique/animé), GF-1 section-par-section desktop + mobile.
