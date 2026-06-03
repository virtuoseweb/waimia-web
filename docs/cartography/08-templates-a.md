# 08A — Templates (groupe A)

> Inventaire structuré des 9 premiers templates (`src/components/templates/`).
> Lecture : markup uniquement (séquence des blocs, pas CSS). Écriture unique dans ce fichier.
> Date : 2026-06-04.

---

## 1. AuthorPageTemplate

- **name** : `AuthorPageTemplate`
- **file** : `src/components/templates/AuthorPageTemplate.astro` (977 lignes)
- **route** : `/equipe/[...slug].astro`
- **hero** : `HeroAuthor` — type `hero-author`
- **section_sequence** :
  1. `HeroAuthor` + `PortraitSimon` (slot "portrait")
  2. `section.author-expertise` — tags expertise (conditionnel si tableau non vide)
  3. `section.author-why` — slot prose MDX "pourquoi Waimia"
  4. `section.author-pullquote` — blockquote manifeste
  5. `section.author-essays` — liste d'essais (conditionnel)
  6. `section.author-method` — `MethodeProcessDiagram` SVG + liste méthode 5 étapes
  7. `section.author-curriculum` — `Timeline` expérience/formation/récompenses (conditionnel)
  8. `section.author-publications` — `Callout` manifeste + liste publications + index ressources 8 items + lien "voir tout"
  9. `section.author-social` — liens sociaux (conditionnel)
  10. `section.author-cta` — bloc CTA sombre "Câbler mon système →"
- **page_objective** : `information` — page profil auteur, SEO People/ProfilePage (JSON-LD Person + ProfilePage + BreadcrumbList), découverte de la vision et de la méthode
- **redondance** : aucune — template unique (1 auteur = Simon Beros)
- **notes** : Volume élevé (977 lignes), très monolithique. Sections `author-publications` et `author-curriculum` pourraient devenir des composants catalogués si un second auteur est ajouté.

---

## 2. CaseStudyTemplate

- **name** : `CaseStudyTemplate`
- **file** : `src/components/templates/CaseStudyTemplate.astro` (459 lignes)
- **route** : `/cas/[...slug].astro`, `/en/cas/[...slug].astro`
- **hero** : `HeroCaseStudy` — type `hero-case-study`
- **section_sequence** :
  1. `Breadcrumb` (Accueil → Cas clients → case)
  2. `HeroCaseStudy` (masthead + barre de specs)
  3. `div.case-hero-image` — slot "hero-image" (conditionnel)
  4. `section.case-context` — `ChapterLabel` + slot "context" (§01)
  5. `section.case-approach` — `MethodTimeline` avec étapes (§02)
  6. `section.case-proof` — blockquote témoignage (§03)
  7. `section.case-key-metrics` — `KeyMetric` × N (fond sombre, conditionnel si `proofMetrics.length > 0`)
  8. `section.case-stack` — `TechPillRow` (§04)
  9. `section.case-related-offres` — offres liées (conditionnel)
  10. `section.case-related` — `RelatedCards` grille (§ Autres cas)
  11. `CtaFinal` (composant section catalogué)
  12. slot "body-end"
- **page_objective** : `seo` — preuve sociale + autorité ; JSON-LD BreadcrumbList ; storytelling résultat client pour conversion long-terme
- **redondance** : aucune — structure narrative cas client spécifique
- **notes** : Bien structuré, slot "hero-image" peu utilisé (0 image sur les cas actuels). `case-related-offres` (conditionnel) pourrait être uniformisé avec le `hub-fit` du HubTemplate.

---

## 3. ConversionFunnelTemplate

- **name** : `ConversionFunnelTemplate`
- **file** : `src/components/templates/ConversionFunnelTemplate.astro`
- **route** : `/offres/site-web-ia.astro`
- **hero** : `HeroConversionFunnel` — type `hero-conversion-funnel`
- **section_sequence** :
  1. `Breadcrumb` (Accueil → Offres → title)
  2. `HeroConversionFunnel` (`wrapMaxWidth="var(--wrap-wide)"`, `statsAsKeyMetric`, `kickerReveal`)
  3. `section#demo.cf-demo` — slot mockup + `Callout` manifeste (§N.1 La démo)
  4. `section.cf-features` — `Timeline` vertical numéroté (§N.2 Comment ça marche)
  5. `section#pricing.cf-pricing` — `PricingTier` × N (§N.3 Tarifs)
  6. `section.cf-proof` — `PullQuote` + `KeyMetric` métriques (§ Preuve · ROI)
  7. `section.cf-stack` — `TechPillRow` + `Callout` info (§N.4 La stack)
  8. `section.cf-before-after` — tableau comparatif avant/après (§N.5 Avant/après)
  9. `section.cf-faq` — `<details>`/`<summary>` liste FAQ (§N.6 Questions courantes)
  10. `section#devis.cf-devis` — formulaire inline (société/email/budget/brief) POST `/api/devis` (§N.7 Demande de devis)
  11. `section.cf-related` — `Dingbat` + `RelatedCards` (§N.8 Connexes)
  12. `aside.cf-sticky-cta` — CTA sticky (conditionnel)
- **page_objective** : `conversion` — tunnel de vente complet avec ancre `#pricing`, formulaire devis intégré, FAQ, JSON-LD FAQPage + Service + Offer
- **redondance** : structure proche de `DetailMenuTemplate` (toutes deux servent des offres de service), mais ConversionFunnel ajoute pricing/FAQ/formulaire devis → différenciées par la profondeur de conversion
- **notes** : Template le plus complet en conversion. Le formulaire POST `/api/devis` inline est unique parmi les templates. Sticky CTA peut créer des conflits sur mobile — à surveiller.

---

## 4. CourseDetailTemplate

- **name** : `CourseDetailTemplate`
- **file** : `src/components/templates/CourseDetailTemplate.astro`
- **route** : `/ecole/cours/[slug].astro`, `/ecole/[type]/[slug].astro`
- **hero** : `HeroCourse` — type `hero-course`
- **section_sequence** (conditionnel par `data.course_type`) :
  1. `Breadcrumb` (noJsonLd)
  2. `HeroCourse` (`wrap=false`, `topPad=0`, `ghostStyle="legacy"`)
  3. **Si `formation`** :
     - section "Ce que vous allez apprendre" (liste objectifs)
     - section#programme "Programme détaillé" (tableau modules num/titre/durée/type)
     - section "Prérequis" (conditionnel)
  4. **Si `parcours`** :
     - section "Ce que vous allez accomplir" (outcomes)
     - section "Cours inclus" (liens chaîne de cours)
  5. **Si `atelier`** :
     - section "Informations pratiques" (date/durée/format/places/replay dl)
  6. **Si `certification`** :
     - section "Modalités d'examen" (méthode validation/format/durée/score/validité)
     - section "Prérequis" (conditionnel)
     - section "Formations recommandées" (conditionnel)
  7. `section.mdx-body` — slot MDX (toujours présent)
  8. `div.cta-finale` — bouton inscription (lien Stripe) ou "coming soon"
- **page_objective** : `acquisition` — inscription à un cours/certification, JSON-LD Course + BreadcrumbList via `buildCourseSchema()` / `buildBreadcrumbList()`
- **redondance** : aucune — seul template gérant des types de contenu pédagogique
- **notes** : Ramification `course_type` rend ce template multi-layout en un seul fichier. Refactor possible : extraire chaque `course_type` en sous-layout dédié (4 variantes = 4 composants) pour réduire la complexité conditionnelle.

---

## 5. DetailMenuTemplate

- **name** : `DetailMenuTemplate`
- **file** : `src/components/templates/DetailMenuTemplate.astro` (285 lignes)
- **route** : `/offres/audit-maturite-ia.astro` (aussi `/offres/conseil.astro` → `HubTemplate`, pas ce template)
- **hero** : `HeroDetailMenu` — type `hero-detail-menu`
- **section_sequence** :
  1. `HeroDetailMenu` (`wrapMaxWidth="var(--wrap-wide)"`)
  2. `section.dt-problem` — slot "problem" + stats inline
  3. `section.dt-approach` — slot "approach-headline" + slot "approach-aside" + contenu approche
  4. `section.dt-deliverables` — slot "deliverables-headline" + slot "deliverables-aside" + slot "deliverables"
  5. `section.dt-proof` — `ProofBand` (témoignage/métriques)
  6. `section.dt-stack` — `TechPillRow` + slot "stack-lead"
  7. `section.dt-related` — liens offres connexes
  8. `CtaFinal` (composant section catalogué)
- **page_objective** : `conversion` — page offre de service B2B, détail de la prestation, preuve et stack technique pour décision d'achat
- **redondance** : proche de `ConversionFunnelTemplate` (offres B2B) mais sans pricing/FAQ/formulaire intégré — DetailMenu = offre sur-mesure (pas de tarif affiché)
- **notes** : Template bien dimensionné (285 lignes). `dt-proof` avec `ProofBand` est un pattern propre réutilisable. 1 seule page l'utilise actuellement — vérifier si d'autres offres (formation, conseil tech) pourraient l'adopter.

---

## 6. EcoleHubTemplate

- **name** : `EcoleHubTemplate`
- **file** : `src/components/templates/EcoleHubTemplate.astro` (286 lignes)
- **route** : `/ecole/index.astro` → `/ecole`
- **hero** : `HeroAcademyHub` — type `hero-academy-hub`
- **section_sequence** :
  1. `HeroAcademyHub` (`wrap=false`, `topPad="48px"`)
  2. `section.ecole-hub` > `div.catalogue` — tableau des formations (formation/parcours/atelier/certification)
  3. `div.catalogue-table` — `div.table-header` + lignes du catalogue par type de cours
  4. `div.parcours-section` — `div.parcours-list` + items parcours (liens vers cours inclus)
  5. `div.cta-finale` — bouton CTA inscription / contact
- **page_objective** : `hub` — index de l'École Waimia, entrée de navigation vers les cours, SEO thématique IA/formation
- **redondance** : proche de `HubTemplate` dans la fonction (index/hub) mais spécialisé école ; `HubTemplate` est plus générique (catalogue, fit, related, pullquote)
- **notes** : Peu de composants catalogués dans cette section (pas de `RelatedCards`, `PullQuote`, `CtaFinal` sectionné). Le `div.cta-finale` inline est un anti-pattern par rapport au composant `CtaFinal` utilisé ailleurs — candidat à la standardisation.

---

## 7. EssayTemplate

- **name** : `EssayTemplate`
- **file** : `src/components/templates/EssayTemplate.astro` (649 lignes)
- **route** : `/ressources/blog/[...slug].astro`, `/ressources/veille-ia/[...slug].astro`, `/ressources/cookbooks/[...slug].astro`, `/ressources/outils/[...slug].astro`, `/en/ressources/blog/[...slug].astro`
- **hero** : `HeroEssay` — type `hero-essay`
- **section_sequence** :
  1. `Breadcrumb`
  2. `HeroEssay`
  3. `div.essay-body` — corps de l'article avec layout conditionnel 1/2/3 colonnes :
     - [si headings ≥ 2] `aside.essay-toc` — `TableOfContents` (conditionnel)
     - `div.essay-prose` — slot "body" (MDX) + `ShareButtons` + `TagPills`
     - [si sources] `aside.essay-sources` — liste sources (conditionnel)
  4. [si cluster] `div.essay-related-cluster` — `RelatedByCluster` (conditionnel)
  5. `footer.essay-footer` :
     - `div.essay-footer-related` — `Kicker` + `section.essay-related-cross` (cas/offres liés) + `RelatedCards`
     - [si authorSlug] `div.essay-footer-author` — `AuthorCard` variant "mini" (conditionnel)
     - `div.essay-footer-cta` — lien "Discutons-en →" vers `/contact`
  6. `CtaBandSection` (composant section catalogué)
- **page_objective** : `editorial` — contenu long format (blog, veille IA, cookbooks, outils), SEO article (JSON-LD Article), maillage interne via related/cluster/cross
- **redondance** : aucune — template editorial unique, couvre 5 routes différentes
- **notes** : Template très polymorphe (5 routes, 3 layouts conditionnels). 649 lignes dont beaucoup de CSS. Le layout 3-col (prose + ToC + sources) est une feature avancée rare. Refactor possible : extraire le footer 3-col en composant `EssayFooter` réutilisable.

---

## 8. HubTemplate

- **name** : `HubTemplate`
- **file** : `src/components/templates/HubTemplate.astro` (307 lignes)
- **route** : `/offres/conseil.astro` → `/offres/conseil`
- **hero** : `HeroHubStats` — type `hero-hub-stats`
- **section_sequence** :
  1. `Breadcrumb`
  2. `HeroHubStats` (`ledeDropCap="§"`)
  3. `section.hub-manifesto` — `Callout` variant "manifesto" size "lg" + slot "manifesto"
  4. `section.hub-catalog` — `Kicker` + slot "catalog-meta" + `div.hub-catalog-list` + slot "catalog"
  5. `section.hub-fit` — slot "fit-headline" + `Callout` variant "info" size "sm"
  6. `section.hub-related` — `RelatedCards`
  7. `section.hub-closing` — `PullQuote` variant "centered" attribution "Waimia"
  8. `CtaFinal` (composant section catalogué)
- **page_objective** : `pillar` — page pilier offres de conseil, entrée principale du catalogue de services, maillage interne vers les offres détaillées
- **redondance** : proche de `EcoleHubTemplate` dans la fonction (hub/index), mais HubTemplate est plus riche en composants catalogués et suit mieux le pattern DS (CtaFinal, RelatedCards, PullQuote)
- **notes** : Bon équilibre composants catalogués / slots. Le slot "catalog" reçoit des `ServiceCatalogRow` × 7 depuis la page — pattern propre. Candidat à être utilisé comme modèle pour d'autres hubs (ressources, secteurs).

---

## 9. LeadMagnetTemplate

- **name** : `LeadMagnetTemplate`
- **file** : `src/components/templates/LeadMagnetTemplate.astro` (366 lignes)
- **route** : `/ressources/livres-blancs/[...slug].astro`, `/ressources/livres-blancs/ai-act-readiness.astro`
- **hero** : `HeroLeadMagnet` — type `hero-lead-magnet`
- **section_sequence** :
  1. `Breadcrumb`
  2. `HeroLeadMagnet`
  3. `section.lm-abstract` — `KeyMetric` × N (métriques du livre blanc) + `KeyMetric` "chapitres structurés"
  4. `section.lm-body` — formulaire de capture (prénom/email/société) + `Timeline` TOC numéroté + `Callout` manifeste + `Dingbat` + prose extra (slot `extraHtml`)
  5. `section.lm-footer-cta` — `PullQuote` variant "inline" + CTA download `#lead-magnet-form`
- **page_objective** : `acquisition` — capture de lead (livre blanc / PDF), formulaire email inline, preuve valeur via métriques et TOC
- **redondance** : aucune — seul template lead magnet, logique de capture unique
- **notes** : Formulaire de capture inline (pas de POST API explicite — vérifier le handler côté client). `Dingbat` utilisé ici comme séparateur visuel, pattern rare dans les templates. Candidat à ajouter un `CtaFinal` en fin de page pour uniformiser le pattern de sortie.

---

## Synthèse

### Tableau template → objectif → séquence résumée

| Template | Objectif | Sections principales (résumé) |
|---|---|---|
| `AuthorPageTemplate` | `information` | HeroAuthor → expertise → prose → pullquote → essays → method → curriculum → publications → social → CTA |
| `CaseStudyTemplate` | `seo` | Breadcrumb → HeroCaseStudy → context → approach → proof → metrics → stack → related offres → RelatedCards → CtaFinal |
| `ConversionFunnelTemplate` | `conversion` | Breadcrumb → HeroConversionFunnel → démo → features → pricing → proof → stack → avant/après → FAQ → formulaire devis → RelatedCards → sticky CTA |
| `CourseDetailTemplate` | `acquisition` | Breadcrumb → HeroCourse → [4 variantes par course_type] → MDX body → CTA inscription |
| `DetailMenuTemplate` | `conversion` | HeroDetailMenu → problem → approach → deliverables → ProofBand → stack → related → CtaFinal |
| `EcoleHubTemplate` | `hub` | HeroAcademyHub → catalogue formations → parcours → CTA inline |
| `EssayTemplate` | `editorial` | Breadcrumb → HeroEssay → prose+ToC+sources → RelatedByCluster → footer (related+author+CTA) → CtaBandSection |
| `HubTemplate` | `pillar` | Breadcrumb → HeroHubStats → manifesto → catalog → fit → RelatedCards → PullQuote → CtaFinal |
| `LeadMagnetTemplate` | `acquisition` | Breadcrumb → HeroLeadMagnet → abstract+métriques → body+formulaire+TOC → footer CTA |

### Paires redondantes / proximités fonctionnelles

| Paire | Nature de la redondance | Décision suggérée |
|---|---|---|
| `ConversionFunnelTemplate` ↔ `DetailMenuTemplate` | Toutes deux servent des offres B2B avec proof + stack + CtaFinal. CF ajoute pricing/FAQ/formulaire ; DM reste sur-mesure sans prix affiché | Conserver les 2 — différenciées par la profondeur de conversion (tarif affiché vs devis) |
| `EcoleHubTemplate` ↔ `HubTemplate` | Mêmes objectifs index/hub. HubTemplate est plus riche et suit mieux le DS (CtaFinal, RelatedCards, PullQuote). EcoleHub a un CTA inline non normalisé | Envisager d'aligner EcoleHubTemplate sur HubTemplate (migrer le `div.cta-finale` → `CtaFinal`) |
| `CourseDetailTemplate` ↔ `LeadMagnetTemplate` | Les deux sont `acquisition`. Structures différentes (cours vs PDF) — pas de refactor commun possible | Aucune action requise |

### Notes transversales

- **Pattern `CtaFinal` / `CtaBandSection`** : 6/9 templates l'utilisent — bon standard. Exceptions : `EcoleHubTemplate` (CTA inline) et `AuthorPageTemplate` (CTA inline custom `.author-cta`) → candidats à standardisation.
- **Pattern `Breadcrumb`** : absent de `AuthorPageTemplate`, `EcoleHubTemplate`, `ConversionFunnelTemplate` — à vérifier si intentionnel (SEO BreadcrumbList JSON-LD compensé ou absent).
- **Pattern `ProofBand` / `PullQuote`** : `DetailMenuTemplate` utilise `ProofBand` (seul cas dans ce groupe A), les autres utilisent `PullQuote`. À réconcilier si une charte "proof section" est souhaitée.
- **Templates les plus stables** : `CaseStudyTemplate`, `HubTemplate`, `LeadMagnetTemplate` — bien composés, faible dette.
- **Templates les plus complexes** : `EssayTemplate` (649 l, 5 routes, 3 layouts conditionnels), `AuthorPageTemplate` (977 l, très monolithique), `CourseDetailTemplate` (4 variantes `course_type`).
