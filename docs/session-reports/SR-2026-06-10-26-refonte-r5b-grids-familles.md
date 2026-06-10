# SR-2026-06-10-26 · Refonte R5b : familles grilles/stats/tables/CTA, 16 fichiers → 6 archétypes

> **Addendum GF-1 PROD (21:57)** : batch mergé et déployé (push `00c89c5`, live 21:55). Vérifié au computed sur waimia.com : home (h1+CTA opacity 1, proof-bar rendu 12h/sem · 23 · +€840K · 3,4×), /solutions/acquisition-ia (stack 7 lignes, cta-final ink avec h2 paper), /preview/cta-final (ligne disponibilité **JetBrains Mono** : le bug :where() est corrigé dans le build déployé). 0 erreur console.

> Worker **Fable 5** (worktree `.worktrees/r5grids`), branche **`feat/refonte-r5b-grids-familles`** commit `84603f5` (25 fichiers, +2 715/-1 797). Contre-vérifié orchestrateur (rule 09) : 4 gates relancés, grep orphelins indépendant (0/10), screenshot cta-final inspecté.

## 1. Résultat

Suite de R5a (heros), même méthode : **16 fichiers composants → 6 archétypes**, 17 type-ids intacts (anciens types = branches `data.type`), **0 MDX migré**, schémas/demos inchangés.

| Famille | Archétypes | Absorbés (10 fichiers supprimés, 0 orphelin) |
|---|---|---|
| Grilles | FeatureGrid, BentoGrid, FeatureZigzag | ProblemsGrid, DeliverablesGrid, CommitmentsGrid, IconTrio |
| Stats | StatBlock | ProofBarSection |
| Tables | EditorialTableBlock, ComparisonTable | TechModelsTable, DepartmentStack, PricingComparisonMatrix |
| CTA | CtaFinal, CtaBandSection | DepartmentCta, CtaInline (5 → 4, cible docs/37) |

Conservations motivées : actes signature home (CaseCardGrid, ServicesGrid, WhyStalls…), **StatsBento exprès** (son script hoisté serait injecté sur ~11 pages live = delta réel), RoiBand/WorkflowTable (signatures solutions), CourseCatalogTable (navigation ≠ table de données).

## 2. Le point clé : bug CSS attrapé par la vérif appariée

La technique « qualifier les sélecteurs nus par `:where(.racine)` » est **fausse sous Astro attribute-scoping** : compilée en `[data-astro-cid]:where(.cta-final) p[data-astro-cid]` (spécificité 0,2,1), elle battait `.cta-final__avail` (0,2,0) → la ligne disponibilité passait de mono à sans. **Invisible au diff HTML**, attrapé par les 66 comparaisons computed appariées new vs référence. Correctif : noyau cta-final restauré verbatim + `color: var(--paper)` explicite sur `.sol-cta-final h2`. Leçon réutilisable pour toutes les vagues suivantes : **le diff structurel ne suffit pas sur une fusion CSS, il faut du paired computed**.

## 3. Preuves GF-1

- Diff structurel **672/672 HTML** : 478 stricts + 193 modulo espaces + 1 delta réel justifié (compteur ds-studio « 201→194 », dérivé des 10 suppressions). **Aucun delta sur les pages live.**
- **66 paired computed** new vs dist-ref (16 previews + 4 pages live) = 0 divergence.
- 22 screenshots 1440×900 (`/tmp/wmission/r5grids/`).
- Gates : astro check 0 errors · build Complete! (672 HTML) · touchpoints (106 types) · section-rhythm · no-emdash · token-purity PASS (4 relancés indépendamment par l'orchestrateur).

## 4. Restes assumés (vague visuelle)

StatsBento → bento après mutualisation du reveal script ; boutons custom ex-department-cta → atome Button ; h2 serif problems-grid vs display. Consignés dans docs/39.
