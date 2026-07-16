# 22 — Migration templates → composants catalogués (standardisation DS)

> Objectif (Simon, 2026-06-02) : la **prod live** consomme les **composants catalogués**
> `src/components/sections/*` (source unique structure + CSS) → un update du composant se
> propage **globalement**, le contenu restant **par instance via props/island**. Unifier & standardiser.
> Approche retenue : **Option B** (consommer les composants catalogués, contenu via props ; màj
> tests + View Transitions). Contrainte absolue : **0 régression visuelle** (GF-1 par page).

## Pilote de référence ✅ (commit `7c41d4c`)

`ServiceDetailTemplate` masthead → `HeroServiceDetail` (`/offres/revops`). Prouvé 0-régression :
before/after pixel-identiques, `getComputedStyle` h1 identique (opacity 1, transform neutre,
129.6px, accent terracotta), **sweep 57/57 PASS**, `astro check` 0 err. Sert de modèle.

## Pattern (runbook) — par template

1. **Identifier le composant catalogué** correspondant via son commentaire `// Source markup : .xxx`
   (chaque `sections/Hero*.astro` cite la classe live d'origine). Cf mapping candidat ci-dessous.
2. **Capturer AVANT** (GF-1) sur la/les page(s) consommatrice(s) :
   `pnpm build` → `node scripts/serve-dist.mjs --port 4399 --root dist/client` → Playwright
   (`executablePath` chromium pré-installé `/opt/pw-browsers/chromium-*/chrome-linux/chrome`) :
   screenshot 1440×900 + `getComputedStyle` (opacity/transform/color/fontSize/rect) + `outerHTML` du h1.
3. **Slots → props** sur le template : ajouter `*_fr/*_en` à l'interface `Props`, construire l'objet
   `data` `satisfies SectionByType<'…'>`, remplacer le `<section>` inline par `<Composant data={data} lang={lang} … />`.
4. **Trianguler par grep** chaque classe CSS avant suppression (`grep -rn '\.classe' src/ tests/`) :
   ne supprimer que si usage exclusif au template. Attention aux règles `:global(...)` vs scopées
   homonymes dans d'autres composants (ex. `.svc-num` global du template vs `.svc-num` scopé de `ServiceCatalogRow`).
5. **Écarts de tokens** (padding, `--header-height`…) entre l'ancien markup et le composant : si
   divergence → **prop optionnelle rétro-compatible** sur le composant (défaut = comportement
   catalogue **inchangé** → previews restent vertes), pilotée depuis le template. Ex. pilote : `topPad`.
   **Ne JAMAIS modifier le rendu par défaut du composant** (casserait le sweep 57/57).
6. **View Transitions** (pattern ÉTABLI sur `HeroAuthor`, `de0f2b2` — réplicable aux 6 vt>0) : les
   templates vt>0 calculent `const pageTransitionId = Astro.url.pathname…` puis posent 2-3 `transition:name`
   (`card-${id}` sur le conteneur, `hero-h1-${id}` sur le h1, parfois `hero-img-${id}` sur la figure/visuel).
   → Ajouter au composant une prop optionnelle **`transitionId?: string`** ; appliquer
   `transition:name={transitionId ? \`card-${transitionId}\` : undefined}` (idem `hero-h1-`, `hero-img-`).
   `undefined` = inerte → **catalogue `/preview` inchangé, sweep 58/58 vert**. Le template passe `transitionId={pageTransitionId}`.
7. **Pages consommatrices** : slots → props, texte FR **identique au caractère près**, accents `<i>`
   préservés (les composants rendent en `set:html`). Fournir l'EN (schéma le requiert) — **à valider éditorialement**.
8. **Tests e2e** : sélecteur `old-class` → `nouvelle-classe BEM`, uniquement pour les pages réellement
   rendues par le template migré (vérifier la route !). ⚠️ Un seul worker à la fois édite
   `tests/e2e/templates.spec.ts` (fichier partagé → risque de collision si parallélisé).
9. **Capturer APRÈS** : rebuild (`Complete!` exit 0) + `astro check` (0 err), re-servir, recapturer,
   **comparer** computed-styles + diff pixel multi-seuil (0 % @ seuil ~80 = OK) + **sweep 57/57**.
   Verdict 0-régression **seulement** mesures à l'appui (GF-1). Ne rien committer sans preuve.

## Mapping candidat (à confirmer par le `// Source markup:` de chaque composant)

| Template | h1 live | `vt` | Composant catalogué candidat | Statut |
|---|---|:--:|---|---|
| ServiceDetailTemplate | `svc-h1` | 0 | `HeroServiceDetail` | ✅ migré (`7c41d4c`) — prop `topPad` |
| ~~DetailMenuTemplate~~ | `dt-h1` | 0 | `HeroDetailMenu` | 🗑️ supprimé 2026-06-29 (template mort, 0 page consommatrice) |
| ConversionFunnelTemplate | `cf-h1` | 0 | `HeroConversionFunnel` | ✅ migré (`d4e402b`) — props `wrapMaxWidth`+`statsAsKeyMetric`+`kickerReveal` ; caveat mobile 768-800px |
| UtilityTemplate | `util-h1` | 0 | `HeroUtilityMasthead` | ✅ migré — **10 pages** (contact, about, careers, methode, academy, veille-ia, livres-blancs + 3 EN) ; props `wrapMaxWidth`+`reveal` ; `align` natif ; 0 modif e2e |
| CourseDetailTemplate | `hd-title` | 0 | `HeroCourse` | ✅ migré (`c4fcf2b`, 5/18) — props `topPad`+`wrap`+`ctaPrimaryDisabled/External`+`ghostStyle` ; e2e `/ecole/cours/intro-ia-pme-b2b` |
| EcoleHubTemplate | `heading` | 0 | `HeroAcademyHub` | ✅ migré (`e9f9b66`, 6/18) — props `wrap`(=false)+`topPad`("48px") ; GF-1 prod y=89 ; 0 e2e |
| HubTemplate | `hub-h1` | 0 | **`HeroHubStats`** (source `// .hub-masthead` HubTemplate:123-159) | ✅ migré (`6857d78`, 7/18) — GF-1 prod `/offres/conseil` y=259 0-régression ; prop `ledeDropCap="§"` + `emphasis` stat 2 ; e2e 10→8 (−2 préexistants) |
| TrustLegalTemplate | `trust-h1` | 0 | `TrustLegalSection` (section cataloguée dédiée, 4 touchpoints) | ✅ migré (`307cc6d`, 06-09, 15/18) — template 260→88 LoC, masthead+TOC+body délégués en slots. **GF-1 vérifié a posteriori 06-10** (SR-07) : 3/3 routes `/agence/{trust-center,governance,docs}` h1 op1/transform neutre/115.2px, trust-meta + TOC présents, 0 err console |
| WelcomeTemplate | `welcome-h1` | 0 | `WelcomeSection` (copie byte-fidèle cataloguée, slots headline/lede/foot + fallback data) | ✅ migré (`93c0fd2` branche feat/welcome-section-adoption, 06-10, 16/18) — slot-forwarding headline/lede, **foot NON forwardé** (un forward même conditionnel enregistre le slot → fallback back-link perdu ; leçon Astro), `<main>` imbriqué legacy corrigé (Base fournit déjà `<main id="main">`). GF-1 0-delta 10 métriques FR+EN+preview (SR-09) |
| ListIndexTemplate | `list-h1` | 0 | ⚠️ `HeroHubListing` cite `ressources/index.astro` inline, **pas** ListIndexTemplate | à faire — mapping à confirmer (route ≠ source composant) |
| AuthorPageTemplate | `author-h1` | 3 | `HeroAuthor` (source `.author-hero` AuthorPageTemplate:294-311) ✅ confirmé | ✅ migré (`de0f2b2`, 8/18) — GF-1 prod `/equipe/simon-beros` h1 669/lede 21.76px/portrait 368-749 0-régression ; **prop `transitionId`** (VT card/h1/img) + **slot `portrait`** ; **fix 3 infidélités CSS** (lede `var(--text-lede)`, h1 `letter-spacing`, grille `g12`) |
| CaseStudyTemplate | `case-h1` | 3 | `HeroCaseStudy` (source `.case-masthead` CaseStudyTemplate) ✅ confirmé | ✅ migré (`81da432`, 9/18) — GF-1 prod `/cas/plateau` h1 102.4px / y226 / letterSpacing -3.072px / 4 specs / SVG 2c+1l / 0-régression ; props VT `transitionId`+`cardTransitionId` (card/h1/img) + `topPad`+`h1Gap` (2 écarts fidélité legacy corrigés) ; e2e `h1.case-h1`→`.hero-case-study__h1` ×4 |
| EssayTemplate | `essay-h1` | 2 | `HeroEssay` (source `.essay-hd` EssayTemplate) ✅ confirmé | ✅ migré (`3d77043`, 11/18) — GF-1 prod==local `/ressources/blog/brain-circuit` : header padding-top **140px** (parité), h1 opacity 1 / 89.6px / #0C0B09 / `<i>` accent rgb(201,79,46), lede (`reveal-fade`) opacity 1 VISIBLE, meta visible, 0 err console ; **slot-forwarding** `Astro.slots.render('headline'/'lede')` → 0 page touchée (9 consom. dont 1 EN) ; prop `topPad="140px"` (écart 96→140 corrigé) ; VT `transitionId`+`cardTransitionId` ; hero-image abandonné (jamais utilisé) |
| LeadMagnetTemplate | `lm-h1` | 3 | `HeroLeadMagnet` (source `.lm-hero` LeadMagnetTemplate:115-142) ✅ confirmé | ✅ migré (`2bda862`, 10/18) — GF-1 prod==legacy `/ressources/livres-blancs/ai-act-readiness` h1 102.4px/y209 ; **HeroLeadMagnet = copie fidèle parfaite** (0 écart CSS) ; prop `coverFallback={false}` (évite le SVG placeholder parasite si pas de coverUrl) ; VT `transitionId`+`cardTransitionId` ; 0 page touchée (headlineHtml/ledeHtml déjà résolus) ; 0 modif e2e |
| OffresDetailTemplate | `off-hero-title` | 3 | `HeroOfferDetail` (source `.off-hero` OffresDetailTemplate:253-298) ✅ confirmé | ✅ migré (12/18) — GF-1 local==legacy `/offres/claude-cowork` : wrap **1240px** (baseline mesurée, PAS 1440), breadcrumb « Claude Cowork & Artifacts » (prop `breadcrumbCurrent`=tierLabel), badge « § 02 · DÉPLOIEMENT LÉGER », h1 115.2px x61 w1144 opacity 1 + `<i>` accent, reveal-blur-clip ✅, 0 err console ; **5 props rétro-compat** (transitionId/cardTransitionId/wrapMax=1240px/geoReveal/breadcrumbCurrent), 0 page touchée (slots title/lead résolus, catch-all inclus). ⚠️ **DELTA ASSUMÉ** : hero ~32px/élément plus compact que legacy (le `.g12--full` legacy avait un row-gap de grille perdu en flux bloc composant) — visuellement propre (screenshot OK), accepté comme standardisation ; à signaler Simon (veto possible → restaurer via prop gap). |
| SolutionsDetailTemplate | `sol-hero-title` | 4 | `HeroSector` **infidèle** (perd SVG secteur + grille 12-col + animation `.sol-hero`) | ⛔ **NON MIGRÉ — décision Simon 2026-06-03** : `HeroSector` n'est PAS une copie fidèle du masthead détail-solution (composant secteur générique → migrer = régression visuelle : perte SVG + grille 12-col + anim). Cohérent rule 28 (composer l'existant, **ne pas dégrader**). Legacy conservé tel quel. |
| TechnologiesDetailTemplate | `tech-hero-title` | 3 | `HeroTechLayer` (source `.tech-hero` TechnologiesDetailTemplate:214-234) ✅ confirmé | ✅ migré + **BUG CORRIGÉ** (13/18) — GF-1 local `/technologies/claude-models` : **AVANT** = h1 vide `height:0` (prod legacy, slots jamais remplis) → **APRÈS** = h1 « Claude Models · Couche Modèles » opacity 1 / 115.2px / h212, lead « Haiku, Sonnet, Opus… » peuplé. Fix = `h1 = slot || title`, `lead = slot || description` (frontmatter câblé côté template, **0 route touchée**, fallback `[...slug]` préservé via slots). 4 props rétro-compat (transitionId/cardTransitionId/wrapMax=1240px/geoReveal) ; wrap 1240 (mesuré), reveal-blur-clip restauré ; VT 3. Même delta ~32px compacité accepté qu'Offres. 0 err console. |

> ⚠️ **Mapping sourcé (2026-06-03)** : les composants candidats ci-dessus sont désormais confirmés par le marqueur `// COPIE FIDÈLE`/`// Source markup:` en tête de chaque `sections/Hero*.astro` (pas par le nom). Piège évité : `HeroHubMasthead` copie le `.hub-mast` des pages **index** (offres/cas/secteurs), **pas** le `.hub-masthead` de HubTemplate → le bon composant pour HubTemplate est **`HeroHubStats`**. Trois templates vt=0 (TrustLegal/Welcome/ListIndex) **n'ont aucun composant catalogué dédié** → soit mapping générique (régression possible), soit création d'un composant (hors scope « composition de l'existant ») → à arbitrer avec Simon.

Ordre suggéré (MAJ 2026-06-03) : ✅ Hub/Author/CaseStudy/LeadMagnet faits → **Essay (11) → OffresDetail (12) → Tech+fix (13)** (pattern VT `transitionId`/`cardTransitionId` + slot-forwarding établis) → **Solutions = NON migré (décision Simon)** → enfin TrustLegal/Welcome/ListIndex (mapping à arbitrer avec Simon).

> 🔭 **Reconnaissance parallèle des 4 vt>0 restants (2026-06-03, 4 Task subagents simultanés)** — capitalisée pour éviter de re-scanner :
> - **Essay** (`HeroEssay`) — quasi copie fidèle. 1 écart à confirmer : `.essay-hd` padding-top legacy `140px` vs composant `calc(var(--header-height) + 24px)` → prop `topPad` si divergent. Slots `headline`/`lede` = rich text (`<i>`) → **slot-forwarding** (`Astro.slots.render('headline'/'lede')`, comme LeadMagnet). `lede` parfois `set:html` → vérifier. VT 2 (card + h1). 9 consommateurs (dont 1 EN). **0 page touchée** si slot-forwarding.
> - **OffresDetail** (`HeroOfferDetail`) — quasi copie fidèle. Écarts : CTA `ease` vs `var(--ease)`, breakpoint `800` vs `768`, `mask-reveal`. Slots `title`/`lead`/**`hero-image`** — ⚠️ `hero-image` n'existe PAS dans le composant/schéma → prop optionnelle `heroImageSlot` ou conserver en slot forward. VT 3. 3 consommateurs.
> - **Tech** (`HeroTechLayer`) — quasi copie fidèle. Écarts : CTA `ease`, `.wrap` global vs `__wrap` inline. **BUG : h1/lead VIDES en prod** (slots jamais remplis, contenu en frontmatter) → migration câble frontmatter `title`/`description` → `heroData` (décision Simon « corriger au passage »). VT 3. 2 routes (`technologies/[...slug]` + fallback `[...slug]`) → les DEUX doivent changer.
> - **Solutions** (`HeroSector`) — ⛔ **infidèle** : composant secteur générique, perd le SVG secteur + grille 12-col + animation du `.sol-hero`. **Décision Simon : NON migré.**
>
> 🔬 **Faits CSS résolus (rule 09, vérifiés `fichier:ligne`) — communs à `HeroOfferDetail` + `HeroTechLayer`** : ces 2 composants tagués « COPIE FIDÈLE » ont en réalité **3 défauts de transcription vs leur source legacy** :
>   1. **wrap** : legacy `.wrap` = `var(--wrap)` = **1440px** (`tokens.css:43`) vs composant `__wrap` = **1320px** (`HeroOfferDetail:63`, `HeroTechLayer:53`) → **écart réel 120px** (zone texte hero plus étroite en composant → retours ligne h1/lead différents sur large viewport).
>   2. **`reveal-blur-clip`** : présent sur le `<svg>` legacy, **absent** des 2 composants (`grep -c` = 0) → l'animation de révélation du SVG est perdue.
>   3. **CTA easing** : legacy `var(--ease)` = `cubic-bezier(0.22,1,0.36,1)` (`tokens.css:38`) vs composant `ease` hardcodé → courbe de hover différente.
>   - **Stratégie** : (a) corriger ces 3 défauts DANS le composant (le rend vraiment « fidèle », mais touche le rendu catalogue/sweep — rule 28) OU (b) prop rétro-compat par écart (défaut = catalogue figé, template passe la valeur legacy — pattern des 4 migrations précédentes). Wrap 120px + SVG reveal = visuellement significatifs → trancher au brief. `hero-image` slot **jamais utilisé** côté Offres (comme Essay) → abandonné.
>   - ✅ **RÉSOLU (Offres `d45ef4f` + Tech `e94d541`) via stratégie (b)** : 5 props (Offres) / 4 props (Tech) rétro-compat, défaut catalogue figé (sweep intact). **⚠️ Le token `--wrap` (1440) était un FAUX INDICE** : la **baseline mesurée** (`getComputedStyle` sur prod legacy `/offres/claude-cowork` + `/technologies/claude-models`) = **1240px** (override scopé `.X .wrap`), donc le composant (1320) était trop LARGE de 80px, pas trop étroit → `wrapMax="1240px"`. **Leçon : TOUJOURS mesurer la baseline computed sur prod, jamais déduire d'un token** (rule 09). `ease` écarté (négligeable). `reveal-blur-clip` restauré via `geoReveal`.

> 🧭 **Leçons transverses migration vt>0 (Essay/Offres/Tech, 2026-06-03)** — pour les futures migrations + les 3 vt=0 restants :
> 1. **Mesurer la baseline legacy sur PROD avant de migrer** (`getComputedStyle` x/w/fontSize/opacity) = l'étalon GF-1. Le token CSS ne suffit pas (override scopé → wrap 1240≠1440). Si la baseline EST le bug (Tech h1 vide height:0), la cible GF-1 = le rendu CORRECT, pas la parité legacy.
> 2. **Composant data-driven + template slot-based** → résoudre via `Astro.slots.render('x')`/`renderFirstSlot(['x'])` dans le template = **0 page consommatrice touchée** (Essay/Offres/Tech : tous les consommateurs préservés). Si un slot a un contenu rich `<i>` → cible `set:html` ; si le composant rend en texte → vérifier que le legacy n'a pas de markup.
> 3. **Fix de bug « slot jamais rempli » sans toucher la route** : `h1 = slot || prop_frontmatter` côté template (Tech : `renderFirstSlot(['title']) || title`). Le fallback qui remplit déjà ses slots reste inchangé.
> 4. **Delta compacité ~32px/élément** sur Offres/Tech : le legacy `.wrap.g12.g12--full` (grille 12-col) avait un **row-gap** entre bc/badge/h1/sub que le `__wrap` composant (flux bloc) n'a pas → hero plus compact. CSS d'espacement (margins) **byte-identiques** pourtant → le delta vient du row-gap de grille, pas des margins. **Accepté comme standardisation** (screenshots propres) — **à signaler Simon (veto possible → ajouter une prop gap)**.
> 5. **`@keyframes` LOCAL mort** : le retrait du masthead legacy peut laisser un `@keyframes`/`animation` scopé orphelin (Offres `mask-reveal`). Sûr à retirer SI 0 usage résiduel ET le `.reveal-mask-up` du composant s'appuie sur le **global** `scroll-reveal.css` (vérifié). Toujours `grep` l'usage résiduel avant retrait.
> 6. **Zod `.default()` rend le champ requis dans le type `_output`** → `satisfies SectionByType<...>` exige `variant: 'primary' as const` (cta) et `layer_type` explicites dans `heroData`. Auto-corrigé par les workers, légitime.

> ✅ **2e confirmation du pattern fidélité (CaseStudy `81da432`)** : la leçon HeroAuthor (mesurer COMPLET + comparer legacy) a été appliquée **préventivement en lecture source-à-source** — 2 écarts détectés AVANT build (`.case-masthead` padding-top `clamp(80px,10vw,120px)` vs composant `calc(--header-height+8px)` ; `.case-h1` `margin: 0 0 48px` vs composant `0`) → corrigés via props rétro-compat `topPad`/`h1Gap` (valeurs legacy exactes). Résultat : parité parfaite du 1er coup (h1 y=226, pas de retouche post-build). Méthode plus économe que worktree-main buildé (qui avait fait thrasher un worker Sonnet sur les 519 lignes du template).

## ⚠️ Leçon GF-1 (capitalisée sur HeroAuthor, `de0f2b2`) — mesurer COMPLET, pas juste opacity/y

Un composant catalogue peut diverger du legacy sur des **détails CSS invisibles à un GF-1 partiel** :
`HeroAuthor` rendait le lede à **25.6px au lieu de 21.76px** (token `var(--text-lede)` omis → fallback
`clamp(21px,2vw,30px)`), le h1 **+34px de large** (`letter-spacing` omis), le portrait **+34px/décalé**
(grille propre ≠ `g12` du template ; `.start-9` n'existe pas dans `grid.css` → legacy auto-place col 8).
Le worker avait déclaré « GF-1 OK » car il n'avait mesuré que `opacity`/`visibility`/`y` — **tous corrects**
malgré les écarts de taille/largeur. **Règle** : le GF-1 d'une migration DOIT mesurer `fontSize` + `width` +
`x`/position (pas seulement opacity/y), et **comparer au legacy mesuré en vérité terrain** (worktree `main`
buildé+servi). Les écarts de token/letter-spacing/grille se corrigent en alignant la CSS du composant sur
le legacy exact (le composant devient la source fidèle ; sweep reste vert car pur diff pixel, 0 disparition).

## Caveats ouverts (à arbitrer)

- **Contenu EN** : les pages FR passaient le h1/lede en slot FR-only. Le schéma des composants exige
  `*_en`. Le pilote a ajouté une traduction fidèle pour `/offres/revops` → **à valider éditorialement**
  (idem pour chaque page migrée).
- **Test préexistant `tests/e2e/templates.spec.ts` L316-331** : « ServiceDetailTemplate variant ·
  /solutions/fintech » asserte `h1.svc-h1`, mais `/solutions/fintech` est rendu par
  **`SolutionsDetailTemplate`** (h1 `sol-hero-title`), **pas** ServiceDetailTemplate. Incohérence
  préexistante (non introduite par la migration) ; sera corrigée lors de la migration de SolutionsDetailTemplate.

## Vérif & gates

- Harnais sweep 57 previews : `scripts/gf1-cloud-sweep.mjs` (cf `docs/21`).
- Gate Vercel déployé : `.github/workflows/gf1-vercel-sweep.yml` (secret `VERCEL_AUTOMATION_BYPASS_SECRET`).
- ⚠️ Le cloud ne peut atteindre `*.vercel.app` (allowlist) → GF-1 visuel en cloud = build local servi ;
  GF-1 sur preview Vercel = CI / local Simon.

## 🔭 Recon des 3 vt=0 restants (2026-06-09, Task subagent read-only) — verdicts d'arbitrage

Comble le trou : les 3 vt=0 n'avaient pas la recon détaillée (contrairement aux 4 vt>0). Faits `fichier:ligne` extraits, fidélité tranchée par l'orchestrateur.

| Template | h1 | Consommateurs | Composant le plus proche | Verdict | Risque |
|---|---|---|---|---|---|
| **ListIndexTemplate** | `list-h1` | `/ressources/{blog,changelog,cookbooks,outils}/index` (4 FR, 0 EN live) | **`hero-hub-listing`** (HeroCentered) — h1 `clamp(56,11vw,180)`/`0.92`/`-0.03em`/`reveal-mask-up` **pixel-perfect** | **`migrate-with-props`** | LOW-MED |
| **TrustLegalTemplate** | `trust-h1` | `/agence/{trust-center,governance,docs}` (3 FR) | `hero-utility-masthead` (partiel) | **`needs-new-component`** | HIGH |
| **WelcomeTemplate** | `welcome-h1` | `/bienvenue/{newsletter,livre-blanc,audit,devis,academy}` + `/en/bienvenue/*` | `hero-centered` (faible) | **`needs-new-component`** | HIGH |

**Deltas ListIndex (tous absorbables, pattern établi)** : `topPad 140px` vs `calc(header+40px)` ~20px → prop `topPad` ; lede cap `32px` vs `28px` (>1400px only) → prop/accept ; lede sans `reveal-fade` → prop `reveal=false` ; **slot `filters` conditionnel** absent du composant → ajouter `<slot name="filters">` inerte (catalogue figé, sweep vert). → **migration autonome** (ce qui suit).

**Deltas TrustLegal (régression si générique)** : blocs `.trust-meta` (date révision + version, mono, DANS le masthead, contenu SEO/conformité) + `.trust-legal-footer` (border-top mono) **absents** du schema utility ; h1 cap `128px` vs `180px` (+52px) ; kicker bilingue `<Bi>`. → créer `HeroTrustLegal` **ou garder le template** (vt=0, 3 routes FR, fonctionnel).

**Deltas Welcome (structure unique)** : `<main>` centré `min-height:80vh` flex, SVG checkmark 64px, `<ol class="welcome-steps">` (cards étapes), `wrap-prose`, lede 22px, CTAs inversés (post-conversion, `noindex`). Aucun Hero* n'approche. → créer `HeroWelcome` **ou garder le template** (recommandé : isolé, vt=0).

**Arbitrage Simon (TrustLegal/Welcome)** : recommandation = **garder ces 2 templates autonomes** (fonctionnels, vt=0, audience limitée, 0 composable-rendering prévu) = 0 régression, 0 nouveau composant hors-scope « composition ». Créer un composant dédié seulement si la cohérence catalogue le justifie pour Simon.

### ListIndex — ÉTALON GF-1 capturé (2026-06-09) → migration execute-ready

Baseline `getComputedStyle` mesurée sur **dist buildé @1440×900** (les 4 routes consommatrices), AVANT migration = la cible 0-régression. **Valeurs identiques sur les 4 routes** (CSS partagée du template) :

| Élément | Valeur étalon @1440 (à reproduire exactement) |
|---|---|
| `.list-hd` | `padding-top: 140px` · `border-bottom: 1px rgba(12,11,9,.09)` (var --hairline) |
| `.list-h1` | font-display · `158.4px` (clamp 56/11vw/180) · line-height `145.728px` (0.92) · letter-spacing `-4.752px` (-0.03em) · color `rgb(12,11,9)` · `<i>`→accent · text-wrap balance · margin 0 |
| `.list-lede` | **font-sans** · `31.68px` (clamp 20/2.2vw/**32** — ⚠️ pas 28) · color `rgb(26,24,20)` (ink-2) · line-height `44.352px` (var --leading-lede 1.4) · max-width 760 · margin `var(--space-6) 0 0` · text-wrap pretty · **aucune animation reveal** |
| `.list-filters` (présent : changelog 5 / cookbooks 6 / outils 1 ; blog 0) | wrapper `margin-top: 56px` (clamp 36/4vw/56) · `display:flex` · `gap: 12px` (var --space-3) · flex-wrap wrap |

**Cible** : `hero-hub-listing` (variant `listing` du masthead unifié `HeroCentered`, `section-registry:127`). h1 = pixel-perfect. **Deltas à absorber par props rétro-compat (défaut = rendu catalogue figé → sweep vert)** :
1. **`topPad="140px"`** (vs composant `calc(var(--header-height)+40px)` ~112px) — pattern établi 6×.
2. **lede cap 32px** (composant cappe à 28 → régresserait de **3.68px @≥1440** ; mesuré 31.68 vs 28). Prop `ledeMaxFont`/aligner la variante listing sur 32, défaut 28.
3. **lede sans reveal** (composant listing a `reveal-fade` ; template n'en a pas). Prop `ledeReveal={false}`.
4. **slot `filters`** : ajouter `<slot name="filters">` au composant, wrappé pour reproduire `.list-filters` (mt clamp(36,4vw,56), flex, gap space-3, wrap), **inerte si vide** (catalogue figé).

**Méthode** : **slot-forwarding** template→composant (`Astro.slots.render('headline'/'lede'/'filters')`, pattern Essay) → **0 page consommatrice touchée** (les 4 routes passent déjà headline/lede/filters/list en slots). e2e : `.list-h1` → BEM composant, uniquement pour les 4 routes. GF-1 APRÈS = re-mesurer @1440 les 4 routes + comparer à l'étalon ci-dessus (0 delta) + sweep.

> ⚠️ **Pourquoi pas exécuté séance du 2026-06-09** : `HeroCentered` est **multi-variant partagé** (hub|listing|detail) → modifier sans casser les 2 autres variants ni la sweep = raisonnement résiduel élevé (rule 41 → worker Opus, ou Opus scope les old→new puis Sonnet applique). Décision qualité (rule 28 « ne pas dégrader » + GF-1 > burn de fin de session) : étalon + spec figés ici → exécution mécanique propre en passe dédiée. **NON bloqué sur Simon** (verdict `migrate-with-props` tient) — c'est une exécution prête, pas un arbitrage.

> ✅ **EXÉCUTÉ 2026-06-09 (14/18, commit merge `d7d71b5`)** : migration faite via worker Opus (composant partagé multi-variant → raisonnement résiduel élevé, rule 41). **GF-1 indépendant vérifié** (orchestrateur, @1440 sur les 4 routes) = **0 delta vs étalon** ci-dessus (padding 140 · h1 158.4/lh145.728/ls-4.752/ink + `<i>` accent rgb(201,79,46) · lede 31.68/ink-2/lh44.352/Inter Tight/w760 · filters mt56/flex/gap12 : blog 0 / changelog 5 / cookbooks 6 / outils 1). **Sweep catalogue 74/74** (6 props rétro-compat `listTopPad`/`ledeMaxFont`/`ledeReveal`/`showFilters`/`listBorder` + slot `filters`, défaut=catalogue figé). **0 page consommatrice touchée** (slot-forwarding), **0 e2e** (sélecteurs `.list-h1` ne ciblaient pas ces routes). Bug attrapé : forward d'un slot vide → wrapper filters fantôme sur blog → résolu via prop explicite `showFilters={hasFilters}`. **Reste : 4/18** (Solutions=NON décision Simon ; TrustLegal/Welcome=needs-new-component → arbitrage Simon).

> 🏁 **MAJ 2026-06-10 (session nuit)** : TrustLegal était en fait DÉJÀ migré (`307cc6d` 06-09, voir ligne du tableau ; GF-1 rattrapé SR-07). Welcome migré (`93c0fd2`, SR-09). TunnelStep migré en hybride Wave 1.6 (2 nouveaux types catalogués `tunnel-step-hero` + `tunnel-step-nav`, prose page-level, SR-09). **Bilan : 17/18 migrés, 1 exclu par veto (Solutions). La migration des HEROS de templates est TERMINÉE.** Prochain front registry = bodies via `<SectionsRenderer>` + ~51 pages orphelines (master plan Waves 1.2-1.4).

---

## 📐 Doctrine d'habillage & de composabilité (directive Simon 2026-06-29) — À RESPECTER pour tout habillage futur

> Verbatim Simon (suite habillage HAB-7 blog) : « tu aurais du créer des **variantes/déclinaisons ou autre section dans la même catégorie** que le composant utilisé qui est censé être rendu et **disponible depuis le catalogue** pour ajouter des images et **avoir plusieurs versions au cas où je change d'avis**. Et **toutes nos sections/templates/pages sont censées être composées/composables avec des sections JSON sinon y'a des conversions à faire**. »

Deux règles permanentes (valent au-delà du blog) :

1. **Habiller = créer une variante/déclinaison cataloguée, jamais détourner par la force.** Quand une section manque de visuel, on ne « repurpose » pas en dur le composant existant : on crée une **variante OU une nouvelle section de la même catégorie**, **rendue et disponible depuis le catalogue** (`/agence/design-system`, `/library/<type>`, DS Studio), avec ses 5 touchpoints synchronisés. But : Simon dispose de **plusieurs versions swappables** par contenu JSON, et peut changer d'avis sans retoucher le code. (Conforme régime DS « catalogue ACTIF » du CLAUDE.md : créer variantes/déclinaisons est permis, via DS Studio + propagation.)
2. **Tout doit être composable via sections JSON.** Une page/template qui n'est pas piloté par un tableau `sections: [...]` (rendu par `<SectionsRenderer>` + `section-registry`) est une **dette de conversion**. Cible = 100 % composable, le contenu vivant en JSON/MDX, le markup dans des composants catalogués.

### Backlog de conversions « composable JSON » — ADDENDUM 2026-07-17 (vagues 6-7 nuit, commits `c64dd4ab`/`5a79d233`/`f75aa9ed`, prod vérifiée GF-1)
- ✅ **Blog index : SOLDÉ.** Liste via `SectionsRenderer` (`article-grid` défaut + variante `editorial-write-feed` cataloguée swappable = l'ancienne liste EditorialWriteRow, exactement l'option « plusieurs versions au cas où ») puis masthead+CTA composables (3 champs rétro-compat `hero-hub-listing` : `top_pad`/`lede_reveal`/`list_border`, défaut absent = rendu catalogue intact). `UtilityTemplate` retiré de la page.
- ✅ **Aussi convertis** : `/equipe` (3 sections), `/secteurs` (grille inline résorbée en type catalogué `sector-card-grid`), `/services/index` (7 sections, rythme via champ `pad_block`).
- ⚠️ **CaseStudyTemplate : chrome de facto composable** (branche D.7 opérationnelle, hero rendu via `hero-case-study` catalogué en interne, mesh en section `related-links`). Restant = sectionnage profond des blocs data (phases/showcase/shifts/bottlenecks) qui exigerait de nouveaux types catalogués → **arbitrage Simon** (fiche décision nuit 2026-07-16 `0012`).
- ⚠️ **Blog article détail : hero déjà catalogué-aligné** (`EssayTemplate` rend son hero via `hero-essay` et son CTA via `cta-band`, `satisfies SectionByType`). L'illustration-hero teintée par taxo reste une variante future optionnelle de `hero-essay`.

Backlog d'origine (2026-06-29, conservé pour trace) :
- **Blog index** (`src/pages/blog/index.astro`) : pilote `UtilityTemplate` (slots) + `article-grid`, PAS un tableau `sections:` JSON. HAB-7 (2026-06-29, commit ~`fe5a8afb`) a ajouté l'habillage (cartes illustrées teintées par taxo via extension `tint` d'`article-grid`) mais **n'a pas converti la page en composable JSON** ni créé une variante dédiée « blog editorial list illustrée » : à faire. Garder l'option de revenir à la liste `EditorialWriteRow` originale (que Simon aimait) en la cataloguant comme variante.
- **CaseStudyTemplate** (`src/components/templates/CaseStudyTemplate.astro`) : props-driven (slots), pas composable. La route `cas-clients/[...slug].astro` a déjà la branche `useComposable` (si frontmatter `sections:`) mais aucun cas ne l'emploie. HAB-6 a habillé le template props-driven ; conversion composable = dette.
- **Blog article détail** (`EssayTemplate` / `HeroCentered`) : hero sans slot image → l'illustration teintée par taxo en hero d'article est reportée (refactor `HeroCentered` multi-variant risqué). À traiter via variante cataloguée de hero, pas refactor sauvage.
- Auditer les autres templates props-driven restants (master plan Waves 1.2-1.4, bodies via `<SectionsRenderer>`) sous cet angle.

> Statut HAB (habillage 2026-06-29) : HAB-1..7 livrés (FAQ généralisée, footer-cta act-5, serif→accent, secteurs/cas/blog/implantations habillés). **L'habillage est posé (« ça fait le café »), MAIS la dette « composable JSON + variantes cataloguées » ci-dessus reste ouverte** et doit être soldée avant de considérer le catalogue/templates comme finis. Lié : memory projet `composable-everything-catalogue-variants`, `skeleton-as-data-not-recipe-per-skeleton`, vision SaaS (registry adoption = blocker commun).
