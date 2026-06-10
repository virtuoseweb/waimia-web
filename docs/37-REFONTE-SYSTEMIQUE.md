# 37 · Refonte systémique Waimia : architecture cible + plan de migration

> Mission stratégique Simon (2026-06-10) : refonte simultanée de l'architecture de contenu, des collections, des templates, de la navigation, des mega menus, du catalogue, du Design System et des conventions. Objectifs : simplification, cohérence, scalabilité. Contraintes absolues : DA intacte, DS existant conservé et amélioré (pas recréé), continuité des conventions, aucune architecture parallèle.
>
> **Ce doc est le plan directeur.** Les faits viennent des 5 audits frais committés dans `docs/audit-refonte/` (collections, templates, design-system, navigation, editorial), chacun vérifié contre le code avec deltas fichier:ligne. Les anciens docs de cartographie (13, 17, 18, 26, 31, 32, 33) sont partiellement périmés : bannières ajoutées, ils restent la trace historique. Source de vérité du progrès = git + gates + ce plan.

## 0. Doctrine (les 3 règles d'arbitrage imposées par Simon, à appliquer partout)

1. **Réutiliser > adapter > étendre > créer.** La librairie est la source de vérité. Toute nouvelle brique doit être cataloguée, documentée, réutilisable, conforme aux conventions. Interdits : one-shot, hors catalogue, conventions CSS isolées, hardcodes, duplication.
2. **Qualité-first, pas fréquence-first.** Quand des variables/classes/variantes se recouvrent, on garde la MEILLEURE version pour un site de classe Awwwards (magnifique, qui convertit, performant), pas la plus fréquente. La version minoritaire gagne quand elle est meilleure (cas prouvé : les crans fixes `--section-*` battent les clamps fluides majoritaires, cf audit DS §2-T3).
3. **Uniformisation par familles pilotées par variables.** Le catalogue converge vers des archétypes canoniques par catégorie + presets de données. Modifier la bonne variable dans DS Studio doit repeindre TOUTE la famille d'une catégorie. Qualité > quantité : une section qui ne tient pas dans un bon design est de la dette (un hero qui ne remplit pas l'above-fold se corrige ou se supprime). Horizon : le catalogue devient un blueprint duplicable pour de futurs sites (changer les valeurs, repiocher les sections, génération IA minimale = économie de tokens).

## 1. État vérifié (synthèse des 5 audits, 2026-06-10)

- **Collections** : 32 déclarées, ~200 MDX. 10 mortes ou dormantes (produits, abonnements, landingPages, welcomePages, newsletter = 0 entrée ; painPoints 12, proofPoints 15, knowledgeBase 10, guarantees 5, brandVoice 1 = peuplées, 0 consommateur). Doc 26 exécuté à moitié : fieldNotes/veilleIA dupliquées dans blog = duplicate content SEO en prod. Cards des cas clients incohérentes avec leurs corps (3/4). Détail : `audit-refonte/collections.md`.
- **Templates** : 17 réels (8 899 LoC), héros 17/18 migrés (Solutions = veto), 2 templates MORTS (ServiceDetail 312 + Hub 307 LoC, 0 consommateur), bodies legacy quasi éteints sur Offres/Tech (100 % du contenu live est composable, les templates ne servent que des stubs du catch-all). 53 pages orphelines en 6 familles. Détail : `audit-refonte/templates.md`.
- **DS / catalogue** : 110 tokens, 96 composants sections, 108 types. Fragmentation verticale (~9 rythmes concurrents), famille Hero sur-fragmentée (33 fichiers), labels mono caps stylés de 4 façons, `paper-3` et `.sec-dark` sous-exploités pour l'alternance. Détail : `audit-refonte/design-system.md`.
- **Navigation** : 5 mega menus + CTA. Bug i18n réel (hrefs FR dans les panels EN). Manifesto et Console inaccessibles en prod. Double source nav (mega-menu.ts + sitemap.ts). Détail : `audit-refonte/navigation.md`.
- **Éditorial** : 8 composants éditoriaux riches, 0 utilisé par le contenu MDX. 3 cas clients sur 4 = pavés MDX bruts (~4 100 mots) avec timeline vide. CaseStudyTemplate déjà prêt à les recevoir (champs optionnels en place). Détail : `audit-refonte/editorial.md`.
- **Fatigue visuelle prouvée** : 7/9 offres, 8/8 solutions et 2/2 technologies enchaînent une séquence de sections strictement identique au sein de leur famille. Contre-exemples réussis : `conseil` et `plateau`.

## 2. Architecture cible

### 2.1 Contenu : 2 couches + 2 référentiels + 1 objet preuve

```
BESOIN (hub Solutions)          EXÉCUTION (Offres)         PREUVE (Cas clients)
Acquérir | Piloter | Opérer  →  pricing, méthode, tunnel ←  objet unique facetté
        ↑ douleurs = painPoints (référentiel unique)        (secteur, problème,
        ↑ chiffres = proofPoints (référentiel unique)        solution, résultat)
SECTEURS = axe transverse de filtrage (pas un 4e hub)
```

- `solutions` porte le besoin prospect : champ `need: acquerir|piloter|operer` (le `category` existant donne le mapping quasi gratuit, cf audit collections §5). La promesse et les douleurs vivent ICI.
- `offres` reste la couche d'exécution (le « comment + combien ») : pricing, method_steps, tunnels. Le prospect comprend son problème avant le packaging commercial.
- `cases` = objet unique : card = projection du corps (fin des divergences), facettes `pains`/`offres`/`results` pointant les référentiels. `painPoints` et `proofPoints` (27 MDX dormants) deviennent les sources uniques des douleurs et des chiffres : un chiffre ne vit qu'à un seul endroit.
- Fusions retenues (options détaillées dans l'audit) : blog absorbe fieldNotes + veilleIA (F1, 301) ; purge des 5 collections mortes (F2) ; offres hardcodées `.astro` migrent en MDX (F6, résout 2 tunnels orphelins) ; le premium part dans `commerce` (F7) ; `secteurs` reste LA taxonomie sectorielle, `solutions/fintech` la rejoint (F4-A).
- Fusion dure solutions+offres en 1 collection : REJETÉE (schémas trop différents, gain net faible, cf audit F3-B).

### 2.2 Navigation : 4 entrées + CTA

- Top-level : **Solutions · Cas clients · Ressources · L'Agence · CTA « Réserver un audit »**. L'entrée « Offres » disparaît du top-level, ses liens sont redistribués dans le panel Solutions par besoin (proposition complète 3 colonnes Acquérir/Piloter/Opérer dans `audit-refonte/navigation.md` §4, liens 100 % existants).
- Cas clients : 1 colonne 4 cas vedettes + « Voir tous les cas ». Suppression des filtres `?secteur=` du menu.
- Ressources : INTOUCHABLE (consigne).
- Agence : structure conservée, élagage (Hero Lab, DS Studio, Espace client, Newsletter sortent du menu) + **Manifesto, Console, Atlas entrent** (aujourd'hui inaccessibles en prod).
- Corrections techniques embarquées : hrefs des panels passés par `localizeHref()` (bug EN), `FOOTER_COLS` synchronisé, `aria-current` des pages `/offres/*` rattaché au hub Solutions.
- Navigations secondaires : TunnelNav, TOC légal, TableOfContents, Breadcrumb = valeur réelle, conservés. PagePill reste dev-only, TaxonomyMenu et ComingSoonPills supprimés.

### 2.3 Templates : 17 → ~8-9, le rendu vivant passe par SectionsRenderer

Cible : un template n'est plus qu'un shell mince (SEO + breadcrumb + slot sections). Ordre des extinctions (audit templates §3) : suppression des 2 morts (F1, -619 LoC) → DetailMenu composable (F2) → fusion ListIndex+Utility (F3) → purge stubs catch-all puis extinction bodies Offres/Tech (F4, -2 297 LoC) → secteurs et 3 cas composables (F5) → ConversionFunnel + landing (F6) → Essay+LeadMagnet en option (F7). Les 53 orphelines se résorbent par familles : 11 hubs d'index sur le pattern hub-masthead + card-grid, 8 hubs taxonomiques sur 1 squelette, pages signature (home, manifesto, console, atlas) JAMAIS templatisées : on catalogue leurs organisms.

### 2.4 DS / catalogue : familles canoniques pilotées par variables

- **Rythme vertical : 1 seule famille** `--section-tight(48)/base(96)/loose(160)/grand(256)`. Les `--spacing-*` fluides, les 8+ clamps bespoke et `.sec` sont mappés dessus (MINORITÉ-GAGNE prouvé : la hiérarchie nette bat l'écrasement fluide). C'est LE levier « 1 variable repeint la famille » : l'espacement inter-sections d'une catégorie entière se pilote par 1 token DS Studio.
- **Hero : 33 fichiers → ~5 archétypes** (HeroSplit, HeroCentered, HeroFullBleed + 1-2 signatures Home/Liquid) ; les variantes par collection deviennent des presets de données. Doublon de nom HeroTunnelStep/TunnelStepHero fusionné. **Critère qualité absolu : chaque hero remplit l'above-fold à 1440×900 et à 390×844, sinon corrigé ou supprimé.**
- **Autres familles** : grilles features/services 12 → 3 (BentoGrid distinctif + FeatureZigzag alternance + FeatureGrid régulier, le reste en presets) ; stats/proof 7 → 4 ; tables 5 → EditorialTableBlock + presets ; timeline 3 → 2 ; CTA 5 → 4.
- **Conventions** : labels mono caps canonisés sur l'atome `Kicker.astro` ; `--radius-xs/sm` renommés (échelle inversée) ; `--shadow-hairline` fusionné ; littéraux de global.css tokenisés ; gate token-purity étendu aux clamps verticaux bespoke.
- **Alternance des fonds** : prop `background: paper|paper-2|paper-3|ink` sur les sections, `paper-3` et `.sec-dark` réhabilités. Pas de gradient, pas de couleur hors palette (contrat doc 28 intact = DA intacte).
- **Cible catalogue : 108 types → ~60-70 canoniques + presets**, chaque survivant parfait UI/UX. La CROISSANCE future (classiques manquants, tendances, créations originales pour les futurs sites) ne reprend qu'APRÈS cette consolidation, sinon on fait grossir de la dette.

### 2.5 Éditorial : zéro pavé MDX brut sur le contenu important

P1 : les 3 cas clients (migration de frontmatter, template déjà prêt). P2 : secteurs (slot workflows). P3 : blog long-form via mapping MDX `components={{ blockquote: PullQuote, table: EditorialTable }}` + emploi de Sidenote (orphelin). P4 : tunnels/commerce ponctuels. Aucun composant à créer : c'est de la composition et de la plomberie d'exposition.

### 2.6 Variété visuelle contrôlée (anti-fatigue)

2-3 archétypes de séquence par famille au lieu d'1 (les 7 offres clones se répartissent), alternance des fonds via la prop `background`, 1-2 sections différenciantes par page (pull-quote, metric-shift, media) sur le modèle des 2 contre-exemples réussis (conseil, plateau). La cohérence prime sur l'originalité ; la variété vient du CHOIX dans le catalogue, jamais du bespoke.

## 3. Plan de migration (vagues R0-R7, chacune : worker(s) worktree + gates + GF-1 + SR)

| Vague | Contenu | Risque | Dépend de |
|---|---|---|---|
| **R0 · Quick wins** | Purge collections mortes du config + `_archived_formations` + `test-composable.astro` ; suppression ServiceDetail/Hub templates morts ; fix `tokenCount` lock + `--text-drop-cap` ; bannières docs périmés ; commit audits | Quasi nul | rien |
| **R1 · Cohérence contenu** | Cards des 3 cas réalignées sur leurs corps ; F1 blog absorbe fieldNotes/veilleIA (+301, ~10 consumers refactorés) ; F6 offres .astro → MDX (revops, site-web-ia, audit-maturite-ia) | Faible (301 à poser) | R0 |
| **R2 · Éditorial premium** | P1 trois cas clients en frontmatter structuré ; P2 secteurs ; P3 mapping MDX blog + Sidenote | Faible | R1 (cards cohérentes d'abord) |
| **R3 · Navigation** | Mega menus cible (4 entrées, Solutions par besoin, Cas simplifié, Agence + Manifesto/Console/Atlas) ; fix i18n hrefs ; source nav unifiée ; footer sync | Moyen (maillage SEO : compenser par footer) | rien (liens existants) |
| **R4 · DS familles** | Rythme vertical unifié ; renames radius/shadow ; Kicker canonique ; tokenisation littéraux global.css ; prop `background` + réhabilitation paper-3/sec-dark ; gates étendus | Moyen-fort (GF-1 visuel par vague, byte-diff quand attendu nul) | R0 |
| **R5 · Catalogue familles** | Hero 33→5 + presets ; grilles/stats/tables/CTA consolidées ; au-dessus du rythme R4 ; chaque archétype prouvé above-fold | Fort (visuel partout) : 1 famille = 1 vague GF-1 | R4 |
| **R6 · Templates extinction + orphelines** | Stubs catch-all purgés ; bodies Offres/Tech éteints ; fusion ListIndex+Utility ; ConversionFunnel composable ; hubs d'index sur sections cataloguées | Moyen | R4-R5 (sections consolidées d'abord) |
| **R7 · Hub par besoin + facettes** | `need` sur solutions, hub /solutions 3 portes, cas facettés (painPoints/proofPoints référentiels), F4 secteurs, redirections SEO complètes, maillage relatedOffres/relatedCases peuplé + script de vérif slugs | Moyen | R1, R3 |

Discipline transverse : Vercel Hobby (batcher, gates verts, UN push par vague) ; 1 scope = 1 branche/worktree ; workers = jamais de git, jamais de re-délégation, fichiers nommés ; GF-1 empirique (visuel : screenshot + getComputedStyle ; structurel : byte-diff quand le rendu attendu est inchangé) ; SR par vague dans `docs/session-reports/`.

## 4. Arbitrages tranchés (autonomes, avec options écartées)

| # | Décision | Option écartée et pourquoi |
|---|---|---|
| A1 | Audits frais committés dans `docs/audit-refonte/` + bannières sur les anciens docs | Réécrire les 8 docs périmés : double travail, perte de trace historique |
| A2 | Solutions/Offres : 2 couches reliées (need + relatedOffres) | Fusion en 1 collection : schémas incompatibles, migration 17 MDX pour gain faible |
| A3 | `secteurs` reste la taxonomie sectorielle (fintech la rejoint) | Fusionner secteurs dans solutions : 3 redirections de pages bien maillées pour rien |
| A4 | Rythme vertical : crans FIXES `--section-*` (minoritaires) | Clamps fluides majoritaires : écrasent la hiérarchie selon viewport (qualité-first) |
| A5 | Hero : archétypes + presets de données | Garder 33 composants : incohérence garantie, famille non pilotable par variable |
| A6 | Nav : Offres fusionnée dans Solutions par besoin, hub /offres conservé (footer + lien panel) | Garder 5 entrées : contredit la cible ; supprimer /offres : casse SEO et tunnels |
| A7 | Pages signature (home, manifesto, console, atlas) : organisms catalogués, pas de template | Templatiser : dégraderait des pages 5/5 uniques (qualité > uniformité) |
| A8 | Croissance du catalogue (tendances, créations originales) APRÈS consolidation | Créer maintenant : ferait grossir la dette (quantité mal faite) |
| A9 | Ordonnancement : R0-R2 immédiats (sans risque), R4-R5 en vagues GF-1 strictes | Tout exécuter d'un bloc : risque visuel non maîtrisable |

## 5. Ce que la refonte NE fait PAS (contraintes)

Pas de refonte graphique (DA, palette parchemin/encre/terracotta, typo, ton : intacts). Pas de nouveau DS. Pas d'architecture parallèle. Pas de modification du mega menu Ressources. Pas de toucher au héros Solutions (veto). Pas de gradient ni couleur hors palette. Le contrat `docs/28-DESIGN-SYSTEM-CONTRACT.md` reste loi.

## 6. Suivi

- Avancement : ce doc (statuts R0-R7 mis à jour par vague) + task list + SRs.
- Livrables mission ↔ état : audits 1-4 ✅ (`docs/audit-refonte/`) ; architecture cible + plan 5-6 ✅ (ce doc) ; 7-15 = vagues R0-R7.
