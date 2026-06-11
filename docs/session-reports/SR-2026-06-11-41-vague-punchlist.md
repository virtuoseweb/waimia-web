# SR-2026-06-11-41 · Vague punch-list Awwwards : 5 missions (templates, offres, cas, DS Studio, ressources/méthode)

> Issue de la critique visuelle réelle (16 pages prod naviguées, screenshots lus, PUNCHLIST 5 chantiers C1-C5). Mandat Simon : « itérer en critiquant visuellement, recomposer les templates, casser la monotonie (fonds, images habillées), améliorations significatives du DS Studio, design parfait pas passable ». 5 workers Opus parallèles, worktrees disjoints, base 9596ffc. Contre-vérifiés (scope diff + gates re-run orchestrateur), mergés, astro check 0 errors + 6 gates PASS sur l'état combiné.

## tpl-recomp (C2+C1+C5) : 5 pages d'un coup

SolutionsDetailTemplate recomposé sur le rythme maquette finance : friction → workflow-table paper-2 → impact INK → case-spotlight INK (image cas + métriques latérales + citation barre accent) → feature-split-media (SVG héros enfin habillés) → diagnostic-stages « Où en êtes-vous ? » → 3-cas (slot préservé) → trust strip INK → FAQ condensée → CTA INK. Props optionnelles backward-compat ; les sections sont construites dans la page secteurs (content.config hors scope). Singularité par secteur (fin du « clone exact »). GF-1 : 3 ink/page sur les 5, computed opacity 1, auto-critique vs maquette.

## offres-polish : 2 P1 résolus + 4 pages

- P1 site-web-ia : le bloc ink « Un exemple en ligne » était un placeholder vide → TerminalMockup réel (console agent éditeur).
- P1 hub /offres : la zone vide n'était PAS un bug reveal (vérifié) mais une fin creuse → related-cards-band 3 cas + CTA ink.
- growth-system + activation : hero ink, proof-bar, testimonial-metrics ink, trust strip, 3 ink/page.
- Auto-critique exemplaire : stat-block en ink rendait la citation invisible (ink-sur-ink) → remplacé par testimonial-metrics. **Dette signalée : le mode ink du stat-block split-quote est cassé** (tâche composant dédiée).

## cas-upgrade (C4) : 4 cas

feature-split-media en ouverture (fin du media-block brut), metric-callout-band ink 104px, citation ink barre accent (rôles réels, 0 nom inventé), CTA ink, respiration distincte par cas, 0 alt vide. Découverte : les cas passent par le chemin composable (CaseStudyTemplate non touché).

## ds-studio-feat : 3 fonctionnalités

Inspecteur de token (clic token → sections consommatrices via les 4001 refs du manifest → preview chargée avec overrides live), thèmes nommés (export/import JSON + 3 presets démo), comparateur baseline-hold (touche B). E2E fonctionnel 12/13 (13ᵉ = 404 hreflang locale préexistante).

## res-methode : 2 dernières pages faibles

/ressources : featured réel (livre blanc), grille à compteurs honnêtes calculés au build (13 articles, 3 field-notes…), 6 articles récents, 2 bandes ink, 0 lien mort. /agence/methode : SpecBar cadence, impact ink (chiffres canoniques proof-points.ts), VirtuoseOS relevé.

## Incident capitalisé

Conflit sémantique inter-branches : agence/index.astro (base pré-sections-gap) ne passait plus astro check après merge (`variant` requis au type de sortie zod). Build OK mais typecheck rouge ; fix 1 ligne. Leçon (tasks/lessons.md) : **astro check complet après CHAQUE merge**, le build seul ne détecte pas ces conflits.

## Preuves d'intégration (orchestrateur)

astro check `- 0 errors` · build `Complete!` · check-touchpoints/no-emdash/token-purity/section-rhythm/content-refs/usage-manifest PASS (re-run sur main mergé). GF-1 prod après push (SR suivant ou addendum).
