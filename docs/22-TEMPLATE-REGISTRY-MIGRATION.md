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
6. **View Transitions** : si le template avait `transition:name` sur le h1 (cf colonne `vt` ci-dessous),
   ajouter une prop optionnelle `transitionName?` au composant qui la forwarde (défaut : absente).
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
| HubTemplate | `hub-h1` | 0 | **`HeroHubStats`** (source `// .hub-masthead` HubTemplate:123-159) | 🔄 en cours (`feat/template-hub-herohubstats`, 7/18) — 1 page `/offres/conseil` ; slots→props (approche A) + prop `ledeDropCap` + EN à valider |
| TrustLegalTemplate | `trust-h1` | 0 | ⚠️ aucun composant ne cite `trust-h1`/TrustLegalTemplate | à faire — **pas de copie fidèle catalogue** ; header atypique → mapping générique (`HeroUtilityMasthead` ?) à arbitrer |
| WelcomeTemplate | `welcome-h1` | 0 | ⚠️ aucun composant dédié | à faire — **pas de copie fidèle** ; à déterminer |
| ListIndexTemplate | `list-h1` | 0 | ⚠️ `HeroHubListing` cite `ressources/index.astro` inline, **pas** ListIndexTemplate | à faire — mapping à confirmer (route ≠ source composant) |
| AuthorPageTemplate | `author-h1` | 3 | `HeroAuthor` (source `.author-hero` AuthorPageTemplate:294-311) ✅ confirmé | à faire (+ View Transitions) |
| CaseStudyTemplate | `case-h1` | 3 | `HeroCaseStudy` (source `.case-masthead` CaseStudyTemplate) ✅ confirmé | à faire (+ VT) |
| EssayTemplate | `essay-h1` | 2 | `HeroEssay` (source `.essay-hd` EssayTemplate) ✅ confirmé | à faire (+ VT) |
| LeadMagnetTemplate | `lm-h1` | 3 | `HeroLeadMagnet` (source `.lm-hero` LeadMagnetTemplate:115-142) ✅ confirmé | à faire (+ VT) |
| OffresDetailTemplate | `off-hero-title` | 3 | `HeroOfferDetail` (source `.off-hero` OffresDetailTemplate:253-298) ✅ confirmé | à faire (+ VT) |
| SolutionsDetailTemplate | `sol-hero-title` | 4 | `HeroSector` (source `.sol-hero` SolutionsDetailTemplate:248-276) ✅ confirmé | à faire (+ VT) |
| TechnologiesDetailTemplate | `tech-hero-title` | 3 | `HeroTechLayer` (source `.tech-hero` TechnologiesDetailTemplate:214-234) ✅ confirmé | à faire (+ VT) |

> ⚠️ **Mapping sourcé (2026-06-03)** : les composants candidats ci-dessus sont désormais confirmés par le marqueur `// COPIE FIDÈLE`/`// Source markup:` en tête de chaque `sections/Hero*.astro` (pas par le nom). Piège évité : `HeroHubMasthead` copie le `.hub-mast` des pages **index** (offres/cas/secteurs), **pas** le `.hub-masthead` de HubTemplate → le bon composant pour HubTemplate est **`HeroHubStats`**. Trois templates vt=0 (TrustLegal/Welcome/ListIndex) **n'ont aucun composant catalogué dédié** → soit mapping générique (régression possible), soit création d'un composant (hors scope « composition de l'existant ») → à arbitrer avec Simon.

Ordre suggéré : Hub (7/18, en cours) → vt>0 à copie fidèle confirmée (Author/CaseStudy/Essay/LeadMagnet/OffresDetail/Solutions/Tech — réintégrer View Transitions via prop `transitionName?`) → enfin TrustLegal/Welcome/ListIndex (mapping à arbitrer).

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
