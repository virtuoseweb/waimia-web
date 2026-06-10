# SR-2026-06-10-15 · Refonte systémique : audits, architecture cible, plan R0-R7 (kickoff)

> Mission stratégique Simon reçue en cours de session nuit (refonte architecture contenu + collections + templates + navigation + catalogue + DS + conventions). Trois addenda intégrés : (1) anti-dédoublonnage doc (réutiliser/mettre à jour l'existant), (2) rationalisation qualité-first (meilleure version Awwwards, pas la plus fréquente), (3) uniformisation par familles pilotées par variables + qualité > quantité + catalogue-blueprint.

## 1. Ce qui a été produit

- **5 audits read-only parallèles** (4 Sonnet + 1 Opus, ~860K tokens cumulés, ~7 min wall-clock), chacun ancré sur les docs existants et vérifié contre le code avec deltas fichier:ligne : `docs/audit-refonte/{collections,templates,design-system,navigation,editorial}.md`. Ils SONT les cartographies à jour (livrables 1-4 de la mission).
- **Plan directeur** : `docs/37-REFONTE-SYSTEMIQUE.md` (doctrine, architecture cible, vagues R0-R7, 9 arbitrages tranchés avec options écartées, contraintes). Livrables 5-6.
- **Bannières « partiellement périmé »** sur les 7 anciens docs de cartographie (13/17/18/26/31/32/33) pointant vers les audits frais : pas de réécriture (trace historique conservée), pas de doublon.

## 2. Découvertes majeures des audits (détail dans audit-refonte/)

- 10 collections mortes ou dormantes ; duplicate content SEO réel (fieldNotes/veilleIA dupliqués dans blog) ; cards de cas clients contredisant leurs corps (3/4).
- 2 templates MORTS (619 LoC, 0 consommateur) ; bodies legacy quasi éteints (100 % du contenu cœur est composable) ; 53 orphelines en 6 familles.
- Fatigue visuelle prouvée : 7/9 offres, 8/8 solutions, 2/2 technologies = séquences de sections strictement identiques par famille.
- Hero sur-fragmenté (33 fichiers pour ~5 archétypes réels) ; ~9 rythmes verticaux concurrents ; cas MINORITÉ-GAGNE : crans fixes --section-* (10 occ.) battent les clamps fluides (28+ occ.) pour la hiérarchie.
- Manifesto et Console inaccessibles en prod ; bug i18n réel : tous les liens des mega menus EN pointent vers les pages FR.
- 8 composants éditoriaux riches, 0 utilisé par le contenu MDX ; les 3 cas restants sont des pavés bruts alors que le template est déjà prêt à les recevoir.

## 3. Arbitrages structurants (résumé ; les 9 avec options écartées : docs/37 §4)

- Solutions/Offres : 2 couches reliées (besoin → exécution), PAS de fusion dure de collections.
- Rythme vertical : crans fixes minoritaires choisis contre les clamps fluides majoritaires (qualité-first).
- Hero : archétypes + presets de données, pas 33 composants.
- Nav : Offres fusionnée dans le panel Solutions par besoin (Acquérir/Piloter/Opérer), hub /offres conservé.
- Pages signature jamais templatisées (qualité > uniformité).
- Croissance du catalogue (tendances, créations) APRÈS consolidation, pas avant.

## 4. Exécution lancée dans la même session

- **R0 quick wins** (worker Sonnet, worktree r0) : purge collections mortes, suppression templates morts, fixes lock/DropCap. GF-1 = byte-identité.
- **R3 navigation** (worker Opus, worktree r3nav, fichiers disjoints de R0) : mega menus cible + fix i18n + aria-current + footer sync. GF-1 = screenshots 4 panels + DOM EN + mobile.
- R1/R2 puis R4-R7 enchaînent (dépendances dans docs/37 §3).

## 5. Ordonnancement vs chantiers en cours

Décision : démarrage immédiat. Le batch #2 de la nuit était clos et prouvé en prod avant le kickoff ; la branche Tina (non mergée) est disjointe ; la phase d'audit était read-only par construction. La vague Wave 1.4 du master plan (orphelins) est ABSORBÉE par la refonte (R6) au lieu d'être doublonnée.
