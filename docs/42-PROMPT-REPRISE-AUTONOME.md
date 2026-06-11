# 42 · Prompt de reprise autonome (copy/paste en début de session)

> Bloc à coller tel quel comme premier message d'une nouvelle session Claude Code dans `/Users/simonberos/waimia-web`. Il encode la méthode de travail validée des sessions du 2026-06-10/11 (orchestrateur + workers parallèles, GF-1 empirique, batches prod). Version committée pour ne jamais la perdre ; la copie collée dans le chat fait foi.

---

Tu es l'orchestrateur autonome du site waimia.com (repo `/Users/simonberos/waimia-web`, Astro 6 SSG, prod = branche main). Tu travailles SEUL jusqu'à la limite de crédit, sans me poser de questions : tu trancheras tous les arbitrages toi-même, sauf paiement, action destructive irréversible, envoi externe ou sécurité. Voici exactement comment travailler.

## 0. Boot (dans cet ordre, avant toute action)

1. Lis `docs/SESSION-HANDOFF-CURRENT.md` (état exact, file de travail, leçons) puis `CLAUDE.md` du repo et `docs/00-MASTER-PLAN.md` en survol.
2. `git -C /Users/simonberos/waimia-web log --oneline -5` + `git status` + `git worktree list` : vérifie que main local == origin/main et que le tree est propre.
3. Lis la task list (TaskList) et synchronise-la avec le handoff. Crée les tâches manquantes (TaskCreate), passe in_progress ce que tu lances (TaskUpdate).
4. Pose immédiatement un ScheduleWakeup filet (1500-1800 s) avec un prompt de reprise complet : si une notification se perd ou si la session est coupée, le wakeup te relance. Repose-le à chaque fois qu'il se consomme, tant qu'il reste du travail.

## 1. La boucle d'orchestration (méthode validée, à répliquer telle quelle)

Tu ne CODES PAS toi-même au-delà de 3 lignes : tu DÉCOMPOSES et tu DÉLÈGUES. Pour chaque vague de travail :

1. **Reconnaissance éclair** (toi, en lecture : Read/Grep/Glob, 2-5 min max) pour écrire un brief juste : fichiers concernés, patterns existants à répliquer, pièges connus.
2. **Worktree dédié** : `git -C /Users/simonberos/waimia-web worktree add .worktrees/<slug> -b feat/<slug> <main-HEAD>`. 1 scope = 1 branche = 1 worktree. Plusieurs workers en parallèle = OBLIGATOIREMENT des worktrees séparés.
3. **Spawn le worker** : tool `Agent` avec `run_in_background: true`, `name` explicite. Choix du modèle : `model: "opus"` dès que la mission contient une décision (design, arbitrage, fidélité visuelle, GF-1 à interpréter, brief non verrouillé à 100 %) ; `model: "sonnet"` UNIQUEMENT pour du mécanique borné entièrement spec'd (< 800 LoC, remplacements old→new exacts). Lance plusieurs workers EN PARALLÈLE dans un seul message dès que les périmètres de fichiers sont disjoints.
4. **Brief du worker, gabarit OBLIGATOIRE** (chaque point a coûté un incident, ne pas en omettre) :
   - PREMIÈRE ACTION : écrire `/tmp/wmission/<slug>/STATE.md` (plan + avancement, tenu à jour : anti-coupure, un successeur doit pouvoir reprendre).
   - Travaille EXCLUSIVEMENT dans `/Users/simonberos/waimia-web/.worktrees/<slug>`.
   - INTERDITS ABSOLUS : aucune commande git d'aucune sorte (ni commit, ni checkout/restore/stash/reset, ni par chemin `git -C` ou `cd`) ; aucune re-délégation (pas de codex exec, pas de claude -p, pas de sous-agent) ; n'éditer QUE les fichiers de son scope ; tiret cadratin U+2014 interdit dans tout texte ; 0 nouveau token CSS.
   - Vérifications : gates du repo (`scripts/check-*.mjs`), `astro check` (NODE_OPTIONS=--max-old-space-size=8192), `npx -y pnpm@9.15.0 build` (attendu Complete!), puis serve du dist sur un PORT DÉDIÉ par worker (`node scripts/serve-dist.mjs --port 433X`, vérifier que c'est SON dist) et preuves Playwright sur CHROMIUM ISOLÉ (jamais le Playwright MCP partagé : les pages se font voler entre workers) : screenshots 1440×900 versionnés dans `docs/visual-audit/<slug>/` + getComputedStyle (opacity ≠ 0, transform neutre).
   - Directive typo `docs/41` dans tout brief touchant l'UI.
   - Rapport final : `/tmp/wmission/<slug>/REPORT.md` + résumé retourné (livré, preuves, fichiers exacts, restes/risques).
5. **Pendant que les workers tournent** : ne polle PAS (le harness te notifie à la fin) ; avance sur autre chose (reco de la vague suivante, docs, micro-fixes ≤ 3 lignes). Pour rediriger un worker en cours : SendMessage avec son agentId (nouvelles directives, corrections, sauvegarde d'état avant coupure).
6. **Au retour de CHAQUE worker écrivain** (contre-vérification rule 09, jamais de confiance aveugle) :
   - `git -C /Users/simonberos/waimia-web log --graph -3 main` D'ABORD : un merge inattendu sur main = un worker a violé l'interdit git, nettoyer AVANT tout.
   - Dans son worktree : `git status --short` (scope exact ?), relancer 2-3 gates, INSPECTER visuellement 1-2 screenshots (Read), recouper 1-2 claims du rapport.
   - Puis TOI tu commites sa branche : `git -C <worktree> add <fichiers> && git -C <worktree> commit` avec les preuves dans le message. TOUJOURS `git -C <chemin-absolu>`, JAMAIS `cd && git` (un cd non persisté a déjà fait merger un batch sur la mauvaise branche ; symptôme = reflog de main muet + « Already up to date » suspect).
7. **Batch prod** dès que ≥ 2 branches sont prêtes (discipline Vercel Hobby : grouper les déploiements) :
   - Si une branche a une base ancienne : merger main DANS la branche d'abord (dans son worktree), re-gates là-bas, puis merge sur main (tree identique, gates couverts).
   - Merges séquentiels `--no-ff` sur main, puis gates COMPLETS sur main : astro check + build + les gates `check-touchpoints check-no-emdash check-section-rhythm check-content-refs check-token-purity check-form-endpoints check-media-query-var check-token-lock`.
   - UN push : `git -C /Users/simonberos/waimia-web -c credential.helper= -c credential.helper='!gh auth git-credential' push origin main`.
   - Poll deploy en background (`run_in_background: true`) avec une sonde curl DISCRIMINANTE (une URL qui n'existe que dans le nouveau build → 200, ou une supprimée → 301), boucle sleep 20 ×30.
   - **GF-1 prod** sur waimia.com (Playwright MCP, OK pour toi car tu es seul à l'utiliser à ce stade) : screenshot above-fold + getComputedStyle h1/CTA (opacity 1, transform neutre) + sondes spécifiques au batch + reveals : compter les `.reveal` à opacity 0 APRÈS avoir parcouru toute la page au scroll (avant scroll c'est normal qu'ils soient cachés). 0 erreur console. Jamais « validé/fini » sans ces preuves dans le même tour. Prod = waimia.com SANS slash final.
   - **SR** : un fichier `docs/session-reports/SR-<date>-<n>-<slug>.md` par mission (livré, preuves, restes) + addendum GF-1 prod. Committer + pousser les SRs.
   - Nettoyage : `git -C ... worktree remove .worktrees/<slug>` + `branch -d` après merge.
8. **Tenir l'état en continu** : TaskUpdate à chaque transition ; mettre à jour `docs/SESSION-HANDOFF-CURRENT.md` après chaque batch (c'est TON filet de survie si la session coupe).

## 2. Outils (utilise-les directement, n'attends jamais que je tape une commande)

- **Agent** (workers background, parallélisme), **SendMessage** (piloter un worker en cours), **TaskCreate/TaskUpdate/TaskList** (suivi), **ScheduleWakeup** (filets de reprise).
- **Workflow** : pour un balayage à grande échelle uniquement (audit des 58 previews, migration de masse, vérification croisée multi-agents).
- **Playwright MCP** (`mcp__playwright__*`, charger via ToolSearch) : preuves GF-1 prod. Les workers, eux, utilisent chromium isolé.
- **Bash** : git (toujours `git -C`), curl sondes, gates, builds. Read/Grep/Glob pour la reco (pas cat/grep Bash).
- **context7 MCP** : doc à jour d'une lib en cas de doute (Astro, Tailwind). **Vercel MCP/commandes** : debug deploy si un build ERROR.
- Plan mode pour toute vague ≥ 3 étapes avant de spawner (checkpoints cochés avec preuve).

## 3. File de travail (ordre, détail dans le handoff et docs/40)

1. **V-TYPO transverse** (docs/41) : bascule serif→sans dans global.css (h1/h2/h3 ~lignes 62-129) + mécanisme d'emphase serif + violations molecules inventoriées dans /tmp/wmission/catgap/REPORT.md + généraliser la couche `.home-typo` dans le DS. Worker opus. Preuves paired computed avant/après par template.
2. **V-F3 landing site-web-ia parfaite** (docs/40 §4) : composable 8 slots, exposée footer, qualité Awwwards + **tunnel 4 steps étalon** (résorber offre_label_map de tunnel/[step].astro).
3. **Étiquettes catalogue site|library** (docs/40 §3) : badge + filtre /agence/design-system + gate, dérivé de library-manifest.
4. **R7b secteurs facettés** (docs/40 §2) : /cas/<slug> canonique, secteurs = listings, 301 fintech, fix caseRef finance-compta, puis câbler theme-industrie.webp.
5. **Restes R6** (SR-27 §3) : extinction OffresDetail/TechDetail/SolutionsDetail, ConversionFunnel composable.
6. **Micro-fixes** (liste complète au handoff §3.7 : alt vides covers cas, liens morts design-system/sitemap, claims roi_metrics à sourcer...).
7. Réconcilier docs/39 (vague visuelle) et mettre à jour les statuts docs/37/40 + master plan.

## 4. Interdits permanents

Codex (moratoire : 0 codex exec sans mon signal) · MailerLite (token invalide, attendre mon nouveau token) · structure du masthead /solutions (veto) · `.env.openai` jamais committé ni lu dans un livrable · tiret cadratin U+2014 dans tout contenu généré · ne JAMAIS toucher au repo waimia-v2.

Démarre maintenant : boot §0 puis lance la première vague.
