# ▶️ Reprise Claude Code — merge des docs Cowork + exécution

> Le travail Cowork (toute la stratégie/doc) est **déjà sur le disque local** dans le working
> tree de `waimia-web`, **non commité**. Étape 1 = committer/merger ces docs sur `main` proprement,
> **sans écraser** le travail en cours de Claude Code. Étape 2 = exécuter. Copier-coller le bloc ci-dessous.

---

```
Tu reprends waimia-web. Une session Claude Cowork a produit toute la stratégie/doc dans docs/
(non commitée, dans le working tree). Objectif de cette session : (1) merger ces docs sur main
sans rien casser ni écraser ton propre travail, (2) reprendre l'exécution.

ÉTAPE 0 — Lire
1. CLAUDE.md (garde-fous GF-1..GF-6, règles prod/branches).
2. docs/README.md (index maître).
3. docs/state/02-plan-execution-claude-code.md (BACKLOG MAÎTRE, tâches en attente).
4. docs/state/RESUME-CLAUDE-CODE.md (ce doc).

ÉTAPE 1 — Merger les docs Cowork sur main (sûr, ~130 changements non commités déjà présents en local)

⚠️ DANGER — NE JAMAIS, avant d'avoir commité : `git reset --hard`, `git checkout -- .`,
`git restore .`, `git clean -fd`, ni `git stash` non suivi de `git stash pop`. N'IMPORTE laquelle
DÉTRUIRAIT les ~130 changements Cowork non commités (réorg + renumérotation + nouveaux docs). Commit D'ABORD.

1. `git status` : tu verras ~130 changements. Quasi tout sous docs/ : des **renommages (R)** (réorg
   en dossiers + renumérotation 01..N), des **suppressions (D)** (32 docs archivés + anciens chemins),
   des **ajouts** (strategy/marketing/business/state/specs) + le pointeur README.md racine. C'est NORMAL :
   les `D`/`R` = le nettoyage et la renumérotation, pas une perte (le contenu est aux nouveaux chemins / dans archive/).
2. Si TU (Claude Code) as du WIP non commité hors docs/ (src/, etc.) : le committer sur TA branche
   à part AVANT, OU `git stash push -m wip -- <tes fichiers précis>` (jamais un stash global).
3. Brancher : `git switch -c chore/cowork-strategy-docs`.
4. Stager la doc **avec capture des renommages/suppressions** (scoped, pas de `-A` global) :
   `git add -A docs/ README.md` (le `-A docs/` capte ajouts **+ renames + deletions** dans docs/).
   `CLAUDE.md` seulement s'il ne contient que des corrections de pointeurs (`git diff --staged CLAUDE.md`).
5. Contrôle : `git status` → seuls docs/ + README.md stagés ; vérifier la présence des `D` (suppressions
   bien prises en compte) et des `R` (renommages). Si une suppression manque → `git add -A docs/` à nouveau.
6. `npx -y pnpm@9.15.0 build` + `astro check` → vert (les .md ne sont pas importés, preuve que rien ne casse).
7. `git commit -m "docs: stratégie Cowork — SEO/GEO, archi 3 piliers, marketing, business, finances + nettoyage/renumérotation"`.
8. Push : `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin chore/cowork-strategy-docs`
9. Merger main : `git switch main` → `git pull --no-rebase origin main` (récupère l'éventuel distant
   SANS écraser, conflits par fichier) → `git merge --no-ff chore/cowork-strategy-docs` → `git push origin main`.
   Puis `git stash pop` si tu avais stashé ton WIP. Conflits éventuels = sur des docs que TU avais aussi
   touchés → garder la version Cowork pour la stratégie.
10. **Après le merge** : `rm -f /Users/simonberos/waimia-web/*.jpeg /Users/simonberos/waimia-web/*.png`
    (52 images-preuves racine, gitignorées → aucun effet git, juste du ménage local).

ÉTAPE 2 — Exécuter (cf state/02-plan-execution, phases P0→P4)
MÉTHODE PAR TÂCHE (non dirigiste) : chaque tâche du plan est un POINT DE DÉPART. Pour chacune →
  (1) investigue (grep + git log/show + read + build + screenshot) ; (2) pose-toi les bonnes questions
  (qu'est-ce qui est déjà fait/ghosté ? vraie valeur ? pattern figé du DS ? risque de dette ?) ;
  (3) mesure avec les outils/gates AVANT d'agir ; (4) agis au pattern figé ; (5) prouve GF-1 + capitalise
  (coche [x] + commit + note le constat). Ne JAMAIS supposer « fait » sans preuve (GF-4).
DÉCISIONS FIGÉES (ne pas rediscuter) :
- Architecture : specs/02-adr-architecture-site.md + strategy/02-site-etat-final §0bis = 1 silo SEO
  « Site web IA » (+ cluster d'articles) + 3 piliers vitrine LÉGERS à sections ancrées (Growth System
  IA /offres/growth-system-ia, Data & Analytics /solutions/data-analytics, Automatisation & Agents IA
  /solutions/automatisation-agents-ia), JAMAIS référencés offensivement. Méga-menu → ancres sauf Site
  web IA → page silo.
- Voix de marque : business/00-references (signatures manifeste réel : « X. Pas Y. », « vous » +
  douleur chiffrée, fragments secs).
- Phase démarrage CASH-FIRST : business/11-cash-first-90-jours = priorité.
- GEO FR : AI Overview Google INACTIF en FR → viser ChatGPT/Perplexity/Claude direct (strategy/03, business/14).

ORDRE :
P0.1 (BLOQUANT avant toute prospection) : rendre le site HONNÊTE — pricing prod 7 900 € → 3 000 € HT,
  supprimer trust-center (fausses certifs) + cas fictifs, publier mentions légales + RGPD.
P0.2 : reliquats doc — CONSOLIDATION-MANIFEST (fusions 07→01, 46/47→03, DS-COHERENCE→01), alléger
  CLAUDE.md, retirer emojis (state/04), rm ~52 images racine (`rm -f *.jpeg *.png` à la racine).
P0.3 : assainissement site (strategy/02 §2-§3) sur feat/*, recâbler les sections sur section-demos.ts
  (ne JAMAIS supprimer un composant catalogué — gate check-touchpoints).
P0.4 : construire silo Site web IA + 3 piliers à sections ancrées + méga-menu sur les ancres.
P1 : SEO/GEO (recherche KW strategy/03, H1, cluster d'articles Site web IA only, GEO/schema/llms.txt/GBP).
P2 : DESIGN / refonte DS (state/05-design-refonte + state/02 PHASE P2) — LE DESIGN N'EST PAS FINI.
  D'ABORD P2.0 : reconstituer ce que TU as fait/ghosté en design (git show 5924d29, branches @theme,
  section-presets, stash feat/library-heroes-enrich, tokenCount 106 vs 115) via tes logs/history/cache.
  P2.1 : couverture des captures (probablement INCOMPLÈTE — sections/templates oubliés) + maintenir
  docs/visual-audit à CHAQUE itération (recapture/remplace/supprime) + corriger le gitignore (sweep /tmp
  → docs/visual-audit). Puis P2.2 socle DS, @theme inline, V-TYPO transverse, awwwards W1/W3/W4,
  variation+presets (#14), passe finale Claude Design. Le gros volume attend les sections finales (P0).
P3 : Firecrawl + scoring (business/09).
P4 : long terme figé (boilerplate, CMS lite + TinaCMS, dashboard, agents = Claude Code/Cowork + .claude, usage).

EN PARALLÈLE (non-code, le plus de-risquant) : Simon lance les 5 entretiens de validation
(business/15-validation-client) — la stratégie ne se fige qu'après. Modèle financier à renseigner :
business/13 (Simon plugge ses vrais chiffres).

RÈGLES : 1 scope = 1 branche feat/* ; jamais sur main sans preuve GF-1 (build vert + écran above-fold)
pour les changements de SITE ; anti-orphelin (éditer le composant, pas inliner) ; build `npx -y
pnpm@9.15.0 build` + astro check. Commence par l'ÉTAPE 1 (merge docs), puis P0.1.
```

---

## Récap des docs produits cette session Cowork (tous dans `docs/`)
- **strategy/** : 01 silo · 02 état final site (+ §0bis archi 3 piliers) · 03 recherche SEO/GEO (+ correction GEO-FR) · 04 GEO-AIO · 05 stack.
- **marketing/** : 01-05 (positionnement, GTM, contenu, canaux, boilerplate produit) — alignés architecture + cash-first.
- **business/** : 00 références canoniques (voix manifeste) · 01 BP (+ renvoi 13) · 02 marché (+ renvoi 14) · 03 prospection · 04 comm · 05 sales enablement · 06 fiches · 07 pitch · 08 quick wins · 09 leadsourcing+scoring · 10 présentations · 11 cash-first · 12 competitive · **13 modèle financier** · **14 marché données réelles** · **15 validation client**.
- **state/** : 01 chantiers · 02 plan-execution (backlog maître, phases P0→P4) · 03 critique · 04 brand-review · **05 design-refonte (détail PHASE P2)** · PROCHAIN-CHANTIER · RESUME (ce doc).
- **specs/** : 01 ecosystem-partners · 02 ADR architecture site.

## Reliquats connus (dans le backlog, rappel)
Fusions de contenu (CONSOLIDATION §2) ; allègement CLAUDE.md ; retrait emojis (state/04) ;
`rm` 52 images racine (sandbox bloquait) ; supprimer les 3 manifestes une fois exécutés ;
nom pilier Opérer « Automatisation & Agents IA » (à confirmer Simon).
