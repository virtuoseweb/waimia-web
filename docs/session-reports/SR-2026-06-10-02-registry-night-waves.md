# Rapport de session — Nuit autonome 2026-06-10 · Registry adoption (Phase 1)

> **Mandat (Simon, verbatim)** : « me demande pas de trancher, fais une reco que tu peux vérifier et faire fonctionner ; tu tranches ; dans le rapport tu diras les options qu'on avait et ce que tu as choisi, ajouté au repo pour vérifier dans 12h ; pour tout le travail autonome pendant que je dors, sans être bloqué. »
>
> Ce rapport trace **chaque décision d'arbitrage** prise sans validation : options envisagées → choix retenu → pourquoi → preuve. Mis à jour à chaque vague. Source de vérité du progrès = git + gates + GF-1.

## Objectif de la nuit
Boucler l'adoption registry (blocker #1, Phase 1 du master plan) : faire passer les templates legacy au rendu composable data-driven (`SectionsRenderer` + `sections:[]`), en mergeant chaque vague GF-1'd en prod (blast radius minimal).

## Contrainte d'architecture (explique le séquencement)
Créer un nouveau type catalogue touche 4-5 **fichiers partagés** (`src/schemas/sections.ts`, `src/lib/section-demos.ts`, `src/lib/section-registry.ts`, `src/lib/library-manifest.ts`). Deux workers qui créent des types en parallèle collisionnent sur ces fichiers. → **Les vagues qui créent des types sont séquentielles** ; la parallélisation n'est sûre que sur des file-sets disjoints (démontré Wave 1.2 : revops sans nouveau type + Technologies = disjoints). De plus, un `git checkout`/merge pendant qu'un worker édite le working tree corromprait son travail → **git ops uniquement entre deux workers**, jamais pendant. C'est un choix de correctness (leçon collision 2026-06-10), pas un manque de parallélisme.

## Modèle d'orchestration retenu
Workers = **Task subagents** (`Agent` tool) qui font le travail EUX-MÊMES (0 Codex, 0 git, 0 re-délégation côté worker — briefs iron-clad). L'orchestrateur (moi) : décide les arbitrages, vérifie indépendamment (rule 09, intercepte les inventions), GF-1, commit, merge, rapport. Modèle par worker = Sonnet si raisonnement déporté dans le brief, Opus si raisonnement résiduel élevé.

## Méta — organisation des rapports (décision tranchée 2026-06-10)
Demande Simon : « organise bien dans un dossier les rapports et nomme les biens. » **Choix retenu** : dossier `docs/session-reports/` (conservé) + convention `SR-YYYY-MM-DD-NN-<slug>.md` (`NN` = séquence zéro-paddée pour départager plusieurs sessions le même jour → tri chronologique par `ls`) + un `README.md` index (point d'entrée unique, table date/scope/branche/statut/commits/GF-1). Renommages appliqués : `SR-2026-06-10-registry-adoption.md` → `SR-2026-06-10-01-registry-pilote-offres.md` (session diurne, branche pilote, non mergée) ; `SR-2026-06-10-night-autonomous.md` → `SR-2026-06-10-02-registry-night-waves.md` (ce rapport, session nocturne mergée prod). **Options écartées** : sous-dossiers par date (`2026-06-10/…`, sur-ingénierie à 2 fichiers) ; à plat sans index (pas d'orientation). 0 référence externe cassée (vérifié `grep`).

---

## Wave 1.1 — 8 offres + cas/plateau (MERGÉ PROD `38c2d3e`)
- 8/8 offres + cas/plateau composables ; 2 nouveaux types (`service-catalog-list`, `fit-columns`) ; enrichissement `problem-statement.dropcap` + `stat-block` layout `split-quote`.
- **Décision** : enrichir le catalogue de variantes data-driven (hybride) plutôt que dupliquer du CSS bespoke ou accepter une perte éditoriale. Réutilisation forte (DropCap/PullQuote/ServiceCatalogRow/molécule FitColumns), 0 nouveau token.
- **GF-1 prod live** : `waimia.com/cas/plateau` h1 op 1, breadcrumb+author+tech-stack, 17/18 reveal, 0 stuck.

## Wave 1.2 — ServiceDetail/revops + Technologies (MERGÉ PROD `681ca40`)
Catalogue 89 → **94 types**.

### revops (ServiceDetail) — 0 nouveau type
- **Décision clé** : le bloc « Proof » (quote | métriques côte à côte) du legacy → réutilise le type **`stat-block` layout `split-quote`** (bâti en Wave 1.1) au lieu de créer un `proof-band-section`. Option écartée : nouveau type wrappant la molécule ProofBand (dédup inutile, le split-quote couvre déjà le layout). 7 sections, toutes sur des types existants.
- **Deltas documentés** (parité) : SVG décoratif `RevOpsFunnel` abandonné (pas de slot en composable) ; `topPad=140px` hero non porté (rythme above-fold mineur) ; EN de l'approach comblé par **traduction littérale fidèle** (legacy FR-only en slot).

### Technologies (claude-models + virtuoseos) — +5 types `tech-*`
- 5 nouveaux types (CSS legacy verbatim, tokens only, réutilisant les molécules existantes) : `tech-positioning-split`, `tech-capabilities-specs`, `tech-models-table`, `tech-when-dual`, `tech-integration-flow`.
- **Arbitrages tranchés** :
  - **Models table (§4)** : type dédié `tech-models-table` (wrappe EditorialTable) pour parité stricte. Option écartée : réutiliser `comparison-table` générique (rendu divergent → risque parité GF-1).
  - **Ecosystem grid (§7)** : **non créé** (`ecosystem:[]` vide sur les 2 MDX → éviter un type orphelin).
  - **CTA (§9)** : réutilise `cta-final` (background ink) existant.
- **⚠️ Invention de contenu interceptée (rule 09)** : le worker avait peuplé `tech-when-dual.avoid_items` (claude-models) avec 2 items **inexistants dans la source** (`useWhen` ne donne que le côté « use »). **Vérité terrain** confirmée par GF-1 sur la page legacy live : la section « Quand l'utiliser ? » y rend **les titres sans items** (données dark). **Décision** : **omettre `tech-when-dual` de claude-models** (parité avec le legacy vide, 0 contenu inventé shippé). Options écartées : (a) garder les avoid inventés (interdit : copy IA non relu sur le site live) ; (b) garder use_items seuls (section duale asymétrique + nouveau contenu visible non relu = scope creep). La donnée `useWhen` reste en frontmatter pour une passe contenu délibérée ultérieure.
- **Delta documenté** : props layout hero (`geoReveal`/`wrapMax`/`transitionId`) non portées par SectionsRenderer → défauts composant. **Vérifié non-problématique** : screenshot GF-1 montre les triangles géométriques rendus, hero fidèle.

- **GF-1 prod live** : `waimia.com/technologies/claude-models` h1 op 1, breadcrumb+jsonLd, 5 types, when-dual absent, 8/10 reveal, 0 stuck.

## Wave 1.3 — Hub/conseil (TERMINÉ, branche `feat/registry-wave3`, GF-1 FR+EN PASS local)
Catalogue 94 → **96 types**. `/offres/conseil` (HubTemplate) → composable MDX.

- **Voie B** retenue : créer `src/content/offres/conseil.mdx` (collection offres, toggle composable déjà câblé) + supprimer la page standalone `src/pages/offres/conseil.astro`. Option écartée : voie A (garder la page + SectionsRenderer inline) — moins propre, n'élimine pas le template legacy. **Fait** : `git rm conseil.astro` → 0 WARN de collision de route au build (vérifié).
- **2 nouveaux types réutilisables** (CSS legacy verbatim, tokens only, bilingues) : `editorial-table-block` (wrappe EditorialTable, réutilisable Solutions/Technologies) pour le comparateur ; `decision-list` (kicker+heading+items `<ol>` numérotés, bilingue via `Bi`) pour l'arbre de décision. Option écartée : forcer le comparateur dans `comparison-table` (rendu divergent) et l'arbre dans un type list générique (perte du `<ol>` numéroté).
- **Vérification fidélité (rule 09) — analyse RÉVISÉE après lecture de HubTemplate.astro** : la plupart des « ajouts » du worker **reproduisent fidèlement le chrome hardcodé** de HubTemplate, ils ne sont PAS inventés : kicker manifesto `§ 02.0 · Stance` = `ChapterLabel` l.121 ; `intro_fr/en` fit = le Callout hardcodé l.154-155 (verbatim) ; section `pull-quote-block` = la PullQuote de clôture hardcodée l.177-181 (verbatim) ; section `cta-final` = le CtaFinal hardcodé l.84-103 (verbatim, hubLabel="Conseil, audit & stratégie") ; kickers `§ 02.F`/`§ 02.C` = hardcodés. **Seul vrai ajout** : le `heading` "Catalogue conseil"/"Advisory catalogue" (le type `service-catalog-list` exige un heading display ; HubTemplate n'avait qu'un ChapterLabel "Catalogue"). **Décision : accepter** (titre de section descriptif, on-brand, mineur) plutôt que rendre `heading` optionnel (ripple sur la demo + risque pour un gain de fidélité marginal). Signalé pour relecture optionnelle Simon.
- **Breadcrumb — corrigé (delta réel détecté + réparé)** : la branche composable de `offres/[...slug].astro` ne rendait **aucun breadcrumb**, alors que HubTemplate ET OffresDetailTemplate en rendent un → **les 8 offres de Wave 1.1 avaient déjà perdu leur breadcrumb en prod** (GF-1 ne le vérifiait pas). **Décision : restaurer le breadcrumb page-level** dans la branche composable offres (lang-aware, mirroring le pattern `cas/[...slug].astro` de Wave 1.1) → corrige conseil **ET rétroactivement les 8 offres** (gain SEO `BreadcrumbList` + nav). Option écartée : accepter la perte (régression réelle). Worker Sonnet, 1 fichier, astro check 0. **GF-1 confirme** : breadcrumb "ACCUEIL · OFFRES · CONSEIL…" (FR) / "Home · Services" (EN) rendu.
- **fit-columns rendu bilingue (amélioration vs legacy)** : les items `fit-columns` étaient FR-only (parité legacy : HubTemplate passait un seul array FR → la page EN affichait du français). Type utilisé **uniquement par conseil** → upgrade contenu : `yes_items_fr/_en` + `no_items_fr/_en` (schéma + section + demo + conseil.mdx, traductions EN fournies par l'orchestrateur = 0 invention). **Décision : améliorer** (page EN désormais pleinement anglaise) plutôt qu'accepter la parité FR-on-EN (défaut visible). Worker Sonnet, 4 fichiers, 4 gates verts. **GF-1 EN confirme** : items "You have a CRM no one believes…", colonnes "YOU'RE A FIT IF"/"WE'LL SAY NO IF".
- **Arbitrages tranchés** : `ConseilAuditDiagram` SVG décoratif → **abandonné** (pas de slot composable ; reste catalogué dans `ds-registry.json`, render-orphelin mais réutilisable) ; manifesto → `manifesto-block` ; comparateur/arbre EN → **traduction EN littérale fidèle** (legacy rendait du FR sur la page EN → la version composable est meilleure), marquée pour relecture Simon.
- **Limite connue documentée** : `fit-columns` reste un type conseil-only ; si réutilisé ailleurs, fournir `*_fr/_en`. `service-catalog-list` ajoute un heading display absent du legacy (accepté).
- **Gates** : astro check 0 err / touchpoints 96 / token-purity PASS / no-emdash PASS. **Build** Complete, pages conseil FR (136 KB) + EN (134 KB) générées, 0 collision.
- **GF-1 local (serve-dist parité prod, port 4331)** : FR — h1 op 1/transform neutre, CTA "Réserver un audit →" op 1, 20 revealed/2 animating/**0 trulyStuck**, screenshot above-fold fidèle (breadcrumb+kicker+§02+h1 display). EN — h1 "Consulting that begins by reading…" op 1, CTA "Book an audit →" op 1, comparateur+arbre+fit **en anglais**, 0 trulyStuck. **Reste** : GF-1 sur preview Vercel (FR+EN) avant merge prod.

---

## Décisions sur les pages NON migrées (tranchées, documentées)
- **DetailMenu / `audit-maturite-ia`** → **RESTE LEGACY**. Raison : son slot `deliverables` est trop bespoke (SVG `AuditMaturityTimeline` + bloc prix « À partir de 8 000 € HT » + cas typique chiffré) sans type catalogué fidèle ; migrer = perte de contenu OU 2 types mono-usage. L'adoption registry vise les pages dont le contenu est cataloguable ; cette page ne l'est pas. Option écartée : créer `price-block` + `case-typique` (types mono-usage, hors esprit catalogue).
- **Tunnel (20 steps)** → **RESTE LEGACY**. Raison : ~80% du contenu est de la prose long-form MDX (`<Content/>`) sans type catalogué fidèle ; l'option « hybride » ne cataloguerait que le hero (valeur marginale) tout en ajoutant de la complexité de route. Décision architecturale : le registry cible les pages structurées, pas la prose. Option écartée : hybride hero-section + prose page-level (ROI faible, pattern de route fragile).
- **ConversionFunnel / `site-web-ia`** → **DIFFÉRÉ**. Contient un vrai formulaire fonctionnel `POST /api/devis` (lead multi-champs) → migration exige un type `devis-form-band` + GF-1 fonctionnel (soumission réelle) + rédaction de contenu EN manquant. À traiter en vague dédiée après les pages structurées.
- **LeadMagnet / `livres-blancs`** → **DIFFÉRÉ + ⚠️ BUG PROD signalé**. Le form gaté poste `POST /api/lead-magnet` qui **n'existe pas** (site `output:'static'`, seuls `healthcheck.ts`+`og.png.ts` en `/api`) → **le formulaire 404 à la soumission sur le site live** (pré-existant, hors migration). **Décision** (no-blocking, no-secret) : je ne peux pas provisionner un provider email/lead (Resend/Formspree = saisie d'API key / création de compte = interdit par les règles sécu). **Reco implémentable sans secret quand j'y arriverai** : repointer le form vers la mécanique de booking Cal existante (`simonberos/audit`, capture de lead qui FONCTIONNE) en interim, et documenter l'option idéale (fonction serverless Vercel `/api/lead-magnet` + Resend) pour quand Simon fournira la clé. Je ne migre pas LeadMagnet en composable tant que son backend n'est pas réglé (GF-1 fonctionnel échouerait).

## Plan restant (séquencé)
1. Wave 1.3 conseil : vérif + GF-1 + merge (en cours).
2. Wave 1.4 Solutions : `workflow-table` + `case-split` (restructuration prose inline → data), pilote `finance.mdx` puis 8 MDX + secteurs.
3. Wave 1.5 Ecole : `course-catalog-table` (collection-driven, sections construites en code dans `/ecole/index.astro`).
4. Interim LeadMagnet (Cal booking) + arbitrage ConversionFunnel.
5. Polish : hrefs demo `service-catalog-list` (404 prefetch).

---
*Rapport vivant — mis à jour et committé à chaque vague.*
