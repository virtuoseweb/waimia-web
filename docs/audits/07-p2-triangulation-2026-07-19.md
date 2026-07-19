# P2.0 — Triangulation de l'état réel du design (GF-4)

> Worker `w-p20-triangulation` · 2026-07-19 · lecture seule.
> Repo à HEAD `56344855` (worktree 60089, à jour de main). Preuves : sha commit + fichier:ligne.
> Méthode : `git log --all --grep`, état code (`rg`/`grep`), `git branch -a`, `git stash list`, `git worktree list`.

## Contexte de mesure (chiffres bruts vérifiés)

- **Tokens `tokens.css`** (`packages/ds-tokens/tokens.css`, PAS `src/styles/`) : **120 tokens `:root`** + **15 tokens dans le bloc `@theme`** (l.296) = 135 déclarations totales. Cible plan ~92. La mesure « 122 » du plan (2026-06-21) et « 115 » du titre sont sous-comptes/anciennes ; le chiffre honnête aujourd'hui = **~120 root + 15 @theme**. 25 littéraux hex subsistent dans `tokens.css`.
- **`@theme`** : présent tel quel (`@theme {` l.296), **jamais** passé en `@theme inline`. Aucune branche `*theme*` (`git branch -a | grep -i theme` = vide).
- **`section-presets.ts`** : `packages/ds-kernel/src/lib/section-presets.ts` (PAS `src/lib/`), 186 entrées de type dans ce fichier ; le board compte 823 presets tous types confondus (généré). Va bien au-delà de hero (fan-out P2.9 des 12 vagues soldé, sha `14d55274`).
- **`5924d29`** « harmonisation Batch 1 » = scope étroit : tokens fantômes (`--text-secondary/#444`, `--text-muted/#888`) → `var(--muted)`/`var(--ink)` sur `CourseDetailTemplate` + `TunnelNav` + 3 SVG + 6 sections (hairlines imperceptibles → `var(--hairline)`). 11 fichiers. GF-1 prouvé (coolGhostCount 21→0). = P0-tier cleanup, pas un chantier P2 ouvert.
- **Stash** : `stash@{0}` `feat/fluid-scale` (working tree périmé, superseded seo-etat-final), `stash@{1}` `feat/library-heroes-enrich` (handoff-auto). Aucun ne porte de travail P2 non intégré vivant. **Branches résiduelles** `feat/ds-coherence-v4b-phantom-color` etc. = anciennes, non mergées, contenu recouvert par le travail de main.

## Verdict par tâche

| Tâche | Verdict | Preuve / détail |
|---|---|---|
| **P2.0** (méta triangulation) | **FAIT** (méta, garder ouvert) | Ce rapport + `RECONCILIATION-REPORT.md` 2026-06-13. Reconstitution faite, rien refait sans mesure. |
| **P2.1-a** couverture réelle | **PARTIEL** | Sweeps livrés : `52e2c79` (preview-level, 186 `/preview/<type>` desktop+mobile, `coverage-report.md`) + `a1d54de` (59 pages site FR live). **Manque** : l'inventaire templates × sections croisé. |
| **P2.1-b** 1 capture/section/template | **GHOSTÉ** | Aucun commit. Dépend de l'inventaire P2.1-a. Captures versionnées inexistantes (cf P2.1-c). |
| **P2.1-c** gitignore/pipeline captures | **GHOSTÉ** | `.gitignore:42` ignore encore `design-system-*.png`, `:73-74` ignore `gf1-*.png/.jpeg`. Sweep (`scripts/gf1-cloud-sweep.mjs` existe) écrit toujours hors `docs/visual-audit/`. Non redirigé. |
| **P2.1-d** maintenance permanente | **OUVERT par nature** | Ne se ferme jamais (chantier vivant tant que le design évolue). |
| **P2.2** mesurer PUIS consolider | **PARTIEL (mesuré, purge non faite)** | MESURE faite : ~120+15 tokens, **A2 serif ✅**, **A3 `.sec*` ✅** (global.css:1417-1530), **A6 ✅** (0 `spacing-section`). **A4 purge = GHOSTÉ** (en attente arbitrage `@theme`, faux-orphelins confirmés). 380 groupes scoped dupliqués (`gen-ds-registry.mjs`, cible <50) = **effort cross-composant séparé, GHOSTÉ**. |
| **P2.3** `@theme` mort → `@theme inline` | **GHOSTÉ** | `@theme {` (l.296) littéral, 25 hex non extraits, aucune branche. **Rôle de blocker surestimé** : P2.7 (presets) ET P2.8 (save preset dev-only) ont shippé sans lui. Sa vraie valeur restante = repaint des utilities Tailwind par le builder. |
| **P2.4-a** vagues perceptibles V9d–h | **PARTIEL** | **V9d SHIPPÉ** (`74ce5c1a` snap demi-pixels font-size). **V9e (line-height) / V9f (tracking) / V9g (durées) / V9h (collapses) = GHOSTÉ par design** : arbitrés dans `docs/audits/06-token-coherence.md` (§ l.222-226) comme changements *perceptibles* → décision Simon requise, jamais auto-exécutés. Bloqué sur arbitrage, pas sur effort. |
| **P2.6** W1 typo / W3 recompo secteurs+offres / W4 images / re-critique it.13 | **PARTIEL / SUPERSEDED** | **W1 FAIT** (`c332efd1` hubs&cards CTA→CtaFinal + typo, + `cbae62d5` sweep typo 195 fichiers). **W3 recompo FAIT** (`adaba1cb` home overhaul, `f52d5042` template secteur propagé aux 12, `436ccc0d` offres template-as-data). **W4 images stylisées + re-critique it.13 post-deploy = GHOSTÉ.** La part « sections pauvres/monotones » est largement **SUPERSEDED par P2.9** (790 presets, styles 2010→2026) et recoupe **P2.10**. |
| **P2.10** passe design finale | **GHOSTÉ / RESTE** | Aucun commit `design:*` / `passe design`. C'est le capstone actif suivant (critique structurée → corrections → GF-1 sur whitelist `strategy/02 §1`). |
| **P2.11-d** hover `data-hover="surface|tint|lift"` | **GHOSTÉ par design (légitime)** | Standard documenté (`design-system/03 §9.6`), implémentation globale `global.css` **volontairement différée à l'adoption** (rule 60 anti-abstraction spéculative). Le pattern `data-hover` existe déjà localement (`HoverRevealList`, `CaseCardGrid`, `section-layouts.css:743-756`). À implémenter globalement quand une variante l'adopte. |

## Séquencement recommandé des vagues restantes

Dépendances réelles : P2.3 (décision `@theme`) débloque la purge P2.2-A4. P2.1-c (S) débloque les captures versionnées P2.1-b/d. P2.4-a V9e-h et P2.2-A4 sont **bloquées sur arbitrage Simon**, pas sur effort. P2.10 est le capstone (sections + presets déjà figés via P2.9 soldé).

| Ordre | Tâche | Effort | Pourquoi ici |
|---|---|---|---|
| 1 | **P2.3 `@theme inline`** (décision + impl) | **M** | Fondation : débloque purge P2.2-A4 + repaint utilities du builder. Faux-blocker de P2.7/P2.8 (déjà shippés) mais vrai prérequis du repaint Tailwind. |
| 2 | **P2.2-A4 purge tokens** (post-décision @theme) | **M** | Ne se fait qu'une fois la stratégie `@theme` tranchée (faux-orphelins). Purge ciblée, GF-1 = 0 changement de rendu. |
| 3 | **P2.1-c gitignore/pipeline** | **S** | Cheap, dé-ignore `design-system-*.png`/`gf1-*`, redirige le sweep → `docs/visual-audit/`. Débloque tout le reste de P2.1. |
| 4 | **P2.1-a inventaire + P2.1-b captures** | **M** | Une fois le pipeline versionné (3) : inventaire templates × sections puis 1 capture above-fold/section. |
| 5 | **P2.4-a V9e/f/g/h** | **S-M/vague** | Nécessite d'abord l'arbitrage Simon (perceptible : line-height/tracking/durées/collapses). Chaque vague petite une fois décidée, GF-1 séparé (jamais mêlée à du byte-équiv). |
| 6 | **P2.11-f scoped-dup consolidation** (380→<50) | **L** | Gros effort cross-composant, faible risque visuel mais volume. Après le socle tokens (1-2) stabilisé. *(recoupe la dette P2.2.)* |
| 7 | **P2.6 (W4/it.13) + P2.10 passe finale** | **L** | Capstone design. Sections + presets déjà figés (P2.9 soldé) → conditions réunies. Critique structurée `design:*` → corrections → GF-1 whitelist. Absorbe la part « sections pauvres » de P2.6. |
| 8 | **P2.11-d hover global** | **S** | À déclencher **uniquement** quand une variante adopte `surface|tint|lift` (rule 60). Pas de travail spéculatif. |

## Notes GF-4

- Le plan `state/02` (l.632-761) porte déjà des notes « réconcilié 2026-07-19 » alignées sur ces verdicts ; ce rapport les **confirme par la source** et lève 2 imprécisions : (a) `section-presets.ts` est sous `packages/ds-kernel/src/lib/`, pas `src/lib/` ; (b) `tokens.css` est sous `packages/ds-tokens/`, pas `src/styles/` (mesure de tokens à faire là).
- Aucun travail P2 vivant n'est piégé dans un stash/branche non mergé : les stash/branches résiduels sont périmés ou recouverts par main.
