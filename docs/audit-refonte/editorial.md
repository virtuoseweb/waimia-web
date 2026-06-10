# Audit mise en forme éditoriale : waimia-web (2026-06-10, read-only)

Règle cible (mission Simon) : aucun contenu important rendu comme bloc MDX brut ; tout corps long passe par des composants éditoriaux ou des sections cataloguées. Référence du pattern : `docs/25-EDITORIAL-REFONTE-CASE-STUDY-LEGAL.md` (refonte Plateau + légal).

## 1. Inventaire des composants éditoriaux (`src/components/editorial/`, 8 fichiers, 915 lignes)

| Composant | LoC | Importé par (hors editorial/) | Utilisé dans du MDX contenu ? |
|---|---|---|---|
| Callout.astro | 132 | 15 fichiers : 5 sections (DepartmentStack, TechPositioningSplit, FitColumnsSection, WorkflowTable, PainPoints), 7 templates (AuthorPage, SolutionsDetail, Hub, OffresDetail, LeadMagnet, TechnologiesDetail, ConversionFunnel), 3 pages (`agence/governance`, `agence/trust-center`, `agence/docs`) | NON |
| EditorialTable.astro | 143 | 8 : TerminalTable (molecule), 3 sections (DepartmentStack, EditorialTableBlock, TechModelsTable), 3 templates, trust-center | NON |
| KeyMetric.astro | 94 | 9 : 3 sections (HeroConversionFunnel, RoiBand, HeroHubStats), 6 templates dont CaseStudyTemplate | NON |
| Timeline.astro | 163 | 9 : 2 sections (TechIntegrationFlow, PainPoints), 5 templates, `agence/methode` FR+EN | NON |
| PullQuote.astro | 133 | 6 : 2 sections (StatBlock, PullQuoteBlock), 4 templates | NON |
| Dingbat.astro | 92 | 7 : 2 sections, 5 templates | NON |
| DropCap.astro | 58 | 3 : ProblemStatement, HeroHubStats, OffresDetailTemplate | NON |
| Sidenote.astro | 100 | **0 import. Composant orphelin.** | NON |

Constat clé : la palette éditoriale est riche et bien irriguée côté sections/templates, mais **0 fichier MDX de contenu n'importe un composant editorial/**. Le seul composant JSX présent dans le contenu est l'atome `Bi` (bilingue) dans les 3 cas legacy (`caserne`, `halcyon`, `northbound`) et `PremiumBadge` dans 1 article blog. Le levier MDX `components={...}` (mapping d'éléments) n'est utilisé nulle part (`grep "components={"` sur src/pages : 0 résultat).

## 2. Cartographie brut vs structuré (corps MDX, mots du body)

### 2.1 Déjà premium (composable, body vide, frontmatter `sections:` -> SectionsRenderer)
- `cases/plateau.mdx` : 10 sections (hero-case-study, problem-statement, problems-grid, method-timeline, deliverables-grid, **metric-shift** (créé, registry:519, `MetricShift.astro` existe), stat-block, pull-quote-block, tech-stack-band, cta-final). C'est l'exemple complet du pattern docs/25.
- `offres/*.mdx` (9/9) : tous composables. `conseil.mdx` inclus (body = 0 mot).
- `solutions/*.mdx` (8/8), `technologies/*.mdx` (2/2) : composables.

### 2.2 MDX brut a fort enjeu (paragraphes nus, aucun composant éditorial)
| Fichier | Body | Rendu actuel |
|---|---|---|
| `cases/caserne.mdx` | ~1 564 mots, 5 h2 | `cas/[...slug].astro:155` : `<Content/>` dumpé dans le slot `context` de CaseStudyTemplate + `steps={[]}` (ligne 131) = husk timeline vide. Effet pavé identique au diagnostic Plateau de docs/25 §1.1 |
| `cases/northbound.mdx` | ~1 329 mots, 5 h2 | idem |
| `cases/halcyon.mdx` | ~1 214 mots, 5 h2 | idem |
| `blog/essai-pillar-ia-pme-2026.mdx` | ~5 522 mots | EssayTemplate `.essay-prose` (typo premium : drop cap CSS, h2 numérotés, blockquote stylé) mais zéro callout/metric/table/timeline sur 5 500 mots |
| `blog/*` (14 autres, 90 a 2 265 mots) | ~16 000 mots cumulés | idem : prose stylée, aucun composant |
| `knowledge-base/*.mdx` (10 × ~900-1 050 mots) | ~9 600 mots | **non rendus en pages** (collection RAG-ready, `content.config.ts:1234` ; aucun `getCollection('knowledge-base')` dans src/pages). Hors scope affichage |
| `tunnels/*.mdx` (20 × ~290-600 mots) | ~8 400 mots | TunnelStepTemplate, prose hybride assumée (commentaire ligne 89). Brut mais court |
| `secteurs/*.mdx` (3 × ~410-440 mots) | `<Content/>` dans le slot `workflows` de SolutionsDetailTemplate : pavé au milieu d'un template par ailleurs structuré |
| `glossary/*` (~35 × ~130-270 mots) | page dédiée structurée (term, définition, exemples) + `<Content/>` résiduel stylé minimal. Acceptable |
| `commerce/*` (14 × ~110-180 mots) | `<Content/>` ligne 115, brut mais court |
| `field-notes/*` (3 × ~55-110 mots) | `fieldnote-detail__content` nu. Court, mineur |
| `prompts/schema-generator.mdx` | 811 mots | brut |
| `ecole` (2 cours) | `<Content/>` passé tel quel a CourseDetailTemplate |
| `comparisons/*` (10 × ~12 mots) | tout en frontmatter data, OK |
| `cookbooks`, `livres-blancs`, `veille-ia`, `outils`, `pages` | 1-2 entrées courtes chacun ; livres-blancs a un `.lm-extra-prose` stylé |

## 3. Le pattern docs/25 (résumé et généralisation)

Fait (vérifié dans le code) :
- Diagnostic Playwright du pavé `/cas/plateau` (5 h2 + 4011 chars dumpés) + husk `steps=[]`.
- Création de la seule section manquante `metric-shift` (avant -> après magnifié) : `src/components/sections/MetricShift.astro` + registry `section-registry.ts:519`.
- Recomposition de Plateau en 10 sections cataloguées pilotées par frontmatter (body MDX = 0 mot).
- CaseStudyTemplate étendu avec champs optionnels (contextStatement, contextStats, bottlenecks, phases, deliverableCards, shifts, pullQuote) a dégradation gracieuse : la voie legacy peut devenir premium par simple migration de frontmatter, sans refonte de template.
- Légal migré vers TrustLegalSection (tâches #1 complétées).

Généralisable directement a : les 3 autres cas clients (même collection, même template, mêmes types de contenu : contexte, goulots, audit, livrables, résultats chiffrés) ; puis aux secteurs (slot workflows) ; puis au blog long-form (via mapping de composants MDX plutôt que sections frontmatter, car le corps narratif doit rester du MDX).

## 4. Plan de mise en forme priorisé (impact business : cas > offres > ressources)

### P1 : cas clients restants (caserne, northbound, halcyon) : impact preuve commerciale maximal
Deux voies possibles, la voie A est la plus alignée avec docs/25 :
- **Voie A (recommandée)** : migrer le frontmatter vers les champs déjà supportés par CaseStudyTemplate (contextStatement + contextStats, bottlenecks, phases pour tuer le husk `steps=[]`, deliverableCards, shifts, pullQuote). Le contenu existe déjà dans les bodies (ex. northbound : 42 questions / 4 catégories -> problems-grid ou bottlenecks ; 80 %, -2 j, 5 j -> shifts/metric-shift ; 3 livrables en bullets -> deliverableCards ; audit J1 -> phases). Réduire le body au narratif résiduel court.
- Voie B (full composable comme plateau) : body 0 mot + `sections:`. Plus de travail, même résultat visuel.
- Composants/sections mobilisés : problem-statement, problems-grid, method-timeline, deliverables-grid, metric-shift, stat-block, pull-quote-block (tous existants).

### P2 : secteurs (3 fichiers) : `<Content/>` dans slot workflows
Remplacer le dump par frontmatter structuré (workflows en liste -> WorkflowTable ou EditorialTable existants) ou au minimum mapper le MDX. Court (~430 mots chacun) donc rapide.

### P3 : blog long-form (15 entrées, ~21 500 mots cumulés)
La typo `.essay-prose` est déjà premium ; le manque est le rythme éditorial sur les pièces > 1 500 mots (8 entrées). Levier le moins coûteux : exposer les composants editorial/ au MDX :
- soit imports directs dans les MDX (Callout, PullQuote, KeyMetric, EditorialTable, Sidenote),
- soit mapping global `components={{ blockquote: PullQuote, table: EditorialTable }}` sur `<Content/>` dans `ressources/blog/[...slug].astro` (zéro modif de contenu pour tables/citations).
- Priorité interne : `essai-pillar-ia-pme-2026` (5 522 mots), puis les 7 pièces > 1 700 mots.
- Sidenote (orphelin, 0 usage) trouve ici son emploi naturel (apartés, sources, chiffres).

### P4 : tunnels (20), commerce (14), prompts, ecole
Corps courts ; un passage Callout/KeyMetric ponctuel suffit (tunnel = 1 idée/étape, commerce = fiche produit). Pas de refonte structurelle nécessaire. knowledge-base : ne rien faire (non rendu).

## 5. Manques réels dans la palette (réutiliser avant créer)

- **Aucun manque bloquant** : docs/25 §1.3 l'avait déjà conclu (le pavé est un défaut de composition, pas d'outillage) et la seule section manquante identifiée (metric-shift) a depuis été créée et cataloguée.
- Vrai manque transversal : **un mécanisme d'exposition des composants éditoriaux au MDX** (mapping `components` sur `<Content/>` ou un préambule d'imports documenté). C'est de la plomberie, pas un nouveau composant.
- Manque d'usage, pas de palette : Sidenote orphelin (0 import) ; DropCap dupliqué en CSS pur dans `.essay-prose` (first-letter), cohabitation a documenter.
- Si un besoin émerge en P3 : un wrapper « ComparisonCard » pour le blog avis/versus pourrait être couvert par EditorialTable existant ; ne créer que sur preuve d'insuffisance.

## 6. Synthèse chiffrée
- 8 composants éditoriaux, 7 utilisés (sections/templates/pages), 0 utilisé par le contenu MDX.
- 20 entrées composables premium (1 cas + 9 offres + 8 solutions + 2 technologies).
- ~110 entrées a corps MDX brut, dont 3 cas clients a fort enjeu (~4 100 mots) et 8 blogs > 1 500 mots.
- Le template CaseStudy est déjà prêt a recevoir la migration des 3 cas restants (champs optionnels en place).
