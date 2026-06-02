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
| ServiceDetailTemplate | `svc-h1` | 0 | `HeroServiceDetail` | ✅ migré (`7c41d4c`) |
| UtilityTemplate | `util-h1` | 0 | `HeroUtilityMasthead` | à faire (multi-instances : /contact, /agence/about, /agence/careers) |
| DetailMenuTemplate | `dt-h1` | 0 | `HeroDetailMenu` | à faire |
| ConversionFunnelTemplate | `cf-h1` | 0 | `HeroConversionFunnel` | à faire |
| HubTemplate | `hub-h1` | 0 | `HeroHubMasthead` / `HeroHubStats` / `HeroPillarHub` (selon variante page) | à faire (vérifier variantes) |
| TrustLegalTemplate | `trust-h1` | 0 | `HeroUtilityMasthead` (?) | à faire (header atypique) |
| WelcomeTemplate | `welcome-h1` | 0 | à déterminer (confirmation tunnel) | à faire |
| CourseDetailTemplate | `hd-title` | 0 | `HeroCourse` | à faire |
| EcoleHubTemplate | `heading` | 0 | `HeroAcademyHub` | à faire |
| ListIndexTemplate | `list-h1` | 0 | `HeroHubListing` / `HeroHubMasthead` | à faire |
| AuthorPageTemplate | `author-h1` | 3 | `HeroAuthor` | à faire (+ View Transitions) |
| CaseStudyTemplate | `case-h1` | 3 | `HeroCaseStudy` | à faire (+ VT) |
| EssayTemplate | `essay-h1` | 2 | `HeroEssay` | à faire (+ VT) |
| LeadMagnetTemplate | `lm-h1` | 3 | `HeroLeadMagnet` | à faire (+ VT) |
| OffresDetailTemplate | `off-hero-title` | 3 | `HeroOfferDetail` | à faire (+ VT) |
| SolutionsDetailTemplate | `sol-hero-title` | 4 | `HeroSector` / `HeroServiceDetail` (?) | à faire (+ VT, mapping à confirmer) |
| TechnologiesDetailTemplate | `tech-hero-title` | 3 | `HeroTechLayer` | à faire (+ VT) |

Ordre suggéré : d'abord les **`vt=0`** (plus simples, pas de View Transition à réintégrer), puis les `vt>0`.

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
