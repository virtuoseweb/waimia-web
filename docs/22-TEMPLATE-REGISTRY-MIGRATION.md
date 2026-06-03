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
| DetailMenuTemplate | `dt-h1` | 0 | `HeroDetailMenu` | ✅ migré (`d582554`) — props `topPad`+`wrapMaxWidth` ; 0 modif e2e |
| ConversionFunnelTemplate | `cf-h1` | 0 | `HeroConversionFunnel` | ✅ migré (`d4e402b`) — props `wrapMaxWidth`+`statsAsKeyMetric`+`kickerReveal` ; caveat mobile 768-800px |
| UtilityTemplate | `util-h1` | 0 | `HeroUtilityMasthead` | ✅ migré — **10 pages** (contact, about, careers, methode, academy, veille-ia, livres-blancs + 3 EN) ; props `wrapMaxWidth`+`reveal` ; `align` natif ; 0 modif e2e |
| CourseDetailTemplate | `hd-title` | 0 | `HeroCourse` | ✅ migré (`c4fcf2b`, 5/18) — props `topPad`+`wrap`+`ctaPrimaryDisabled/External`+`ghostStyle` ; e2e `/ecole/cours/intro-ia-pme-b2b` |
| EcoleHubTemplate | `heading` | 0 | `HeroAcademyHub` | ✅ migré (`e9f9b66`, 6/18) — props `wrap`(=false)+`topPad`("48px") ; GF-1 prod y=89 ; 0 e2e |
| HubTemplate | `hub-h1` | 0 | **`HeroHubStats`** (source `// .hub-masthead` HubTemplate:123-159) | ✅ migré (`6857d78`, 7/18) — GF-1 prod `/offres/conseil` y=259 0-régression ; prop `ledeDropCap="§"` + `emphasis` stat 2 ; e2e 10→8 (−2 préexistants) |
| TrustLegalTemplate | `trust-h1` | 0 | ⚠️ aucun composant ne cite `trust-h1`/TrustLegalTemplate | à faire — **pas de copie fidèle catalogue** ; header atypique → mapping générique (`HeroUtilityMasthead` ?) à arbitrer |
| WelcomeTemplate | `welcome-h1` | 0 | ⚠️ aucun composant dédié | à faire — **pas de copie fidèle** ; à déterminer |
| ListIndexTemplate | `list-h1` | 0 | ⚠️ `HeroHubListing` cite `ressources/index.astro` inline, **pas** ListIndexTemplate | à faire — mapping à confirmer (route ≠ source composant) |
| AuthorPageTemplate | `author-h1` | 3 | `HeroAuthor` (source `.author-hero` AuthorPageTemplate:294-311) ✅ confirmé | ✅ migré (`de0f2b2`, 8/18) — GF-1 prod `/equipe/simon-beros` h1 669/lede 21.76px/portrait 368-749 0-régression ; **prop `transitionId`** (VT card/h1/img) + **slot `portrait`** ; **fix 3 infidélités CSS** (lede `var(--text-lede)`, h1 `letter-spacing`, grille `g12`) |
| CaseStudyTemplate | `case-h1` | 3 | `HeroCaseStudy` (source `.case-masthead` CaseStudyTemplate) ✅ confirmé | ✅ migré (`81da432`, 9/18) — GF-1 prod `/cas/plateau` h1 102.4px / y226 / letterSpacing -3.072px / 4 specs / SVG 2c+1l / 0-régression ; props VT `transitionId`+`cardTransitionId` (card/h1/img) + `topPad`+`h1Gap` (2 écarts fidélité legacy corrigés) ; e2e `h1.case-h1`→`.hero-case-study__h1` ×4 |
| EssayTemplate | `essay-h1` | 2 | `HeroEssay` (source `.essay-hd` EssayTemplate) ✅ confirmé | ✅ migré (`3d77043`, 11/18) — GF-1 prod==local `/ressources/blog/brain-circuit` : header padding-top **140px** (parité), h1 opacity 1 / 89.6px / #0C0B09 / `<i>` accent rgb(201,79,46), lede (`reveal-fade`) opacity 1 VISIBLE, meta visible, 0 err console ; **slot-forwarding** `Astro.slots.render('headline'/'lede')` → 0 page touchée (9 consom. dont 1 EN) ; prop `topPad="140px"` (écart 96→140 corrigé) ; VT `transitionId`+`cardTransitionId` ; hero-image abandonné (jamais utilisé) |
| LeadMagnetTemplate | `lm-h1` | 3 | `HeroLeadMagnet` (source `.lm-hero` LeadMagnetTemplate:115-142) ✅ confirmé | ✅ migré (`2bda862`, 10/18) — GF-1 prod==legacy `/ressources/livres-blancs/ai-act-readiness` h1 102.4px/y209 ; **HeroLeadMagnet = copie fidèle parfaite** (0 écart CSS) ; prop `coverFallback={false}` (évite le SVG placeholder parasite si pas de coverUrl) ; VT `transitionId`+`cardTransitionId` ; 0 page touchée (headlineHtml/ledeHtml déjà résolus) ; 0 modif e2e |
| OffresDetailTemplate | `off-hero-title` | 3 | `HeroOfferDetail` (source `.off-hero` OffresDetailTemplate:253-298) ✅ confirmé | à faire (+ VT) |
| SolutionsDetailTemplate | `sol-hero-title` | 4 | `HeroSector` **infidèle** (perd SVG secteur + grille 12-col + animation `.sol-hero`) | ⛔ **NON MIGRÉ — décision Simon 2026-06-03** : `HeroSector` n'est PAS une copie fidèle du masthead détail-solution (composant secteur générique → migrer = régression visuelle : perte SVG + grille 12-col + anim). Cohérent rule 28 (composer l'existant, **ne pas dégrader**). Legacy conservé tel quel. |
| TechnologiesDetailTemplate | `tech-hero-title` | 3 | `HeroTechLayer` (source `.tech-hero` TechnologiesDetailTemplate:214-234) ✅ confirmé | à faire (+ VT) — **+ corriger bug h1 vide en prod (décision Simon 2026-06-03 « corriger au passage »)** : `technologies/[...slug]` ne remplit jamais les slots `headline`/`lede` (contenu en frontmatter `title`/`description`, non câblé) → h1 vide en prod. La migration câble frontmatter → `heroData`. Écarts à corriger : CTA `ease`→`var(--ease)`, `.wrap` global vs `__wrap` inline. |

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
