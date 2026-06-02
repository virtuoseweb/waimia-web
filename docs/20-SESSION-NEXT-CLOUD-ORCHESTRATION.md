# 20 — Session NEXT : reprise cloud + local, orchestration multi-agents haut niveau

> Rédigé 2026-06-02 en fin de session. **Lire EN PREMIER** au démarrage de la prochaine session.
> Repo standalone : `virtuoseweb/waimia-web` · prod `waimia.com` (Vercel `waimia-web`, projectId `prj_MHc3bkMf2mxa5U2gFCiaH7RlbuWj`).
> ⚠️ NE PAS toucher `virtuoseweb/waimia-v2` (monorepo agrégateur) — waimia.com prod tourne sur **waimia-web** depuis le cutover R4.

## 0. État à la reprise (point d'arrêt)

- **Branche active** : `feat/library-heroes-enrich` (poussée sur `origin`). Base = `main` (HEAD pré-session `7597e02`).
- **3 commits livrés** (build vert à chaque bloc) :
  - `32deb1d` — Bloc 1 heroes (home / landing / problem-index / sector / utility-masthead / academy-hub)
  - `7cdf5aa` — Bloc 2 heroes templates/pages (hub-masthead / offer-detail / tech-layer / conversion-funnel / hub-stats / service-masthead / detail-menu / author / lead-magnet / course / tunnel-step)
  - `a786e24` — Bloc 3 sections non-hero (marquee-band / problems-grid + organisms why-stalls / how-we-ship / operating-layer / manifesto-block)
- **Catalogue** : registry passé à **57 types** (heroes 8 → 25). Bijection parfaite `discriminatedUnion` ↔ `SectionType` ↔ clés `SECTIONS` ↔ `section-demos` ↔ `/preview/[type]`.
- **Preuve empirique (GF-1) ✅** : `astro check` 0 erreur / 0 warning (316 fichiers) · `pnpm build` `Complete!` exit 0 · **57/57 pages `/preview/<type>` générées** · Playwright sur `/preview/hero-sector` : H1 + CTA `opacity:1`, `transform:none`, hero 704px, 0 erreur console · `/agence/design-system` : H1 visible, **12/12 nouveaux types présents**, 0 erreur console. Screenshots : `/tmp/wmission/lib-heroes/gf1/`.
- Note build : les lignes `❌ File not found: dist/client/preview/<type>/index.html` pendant le build sont un **artefact d'ordre de build** (la page catalogue lit un preview pas encore écrit sur disque) — inoffensif, le `dist/` final contient les 57. À nettoyer (cosmétique) un autre jour.

## 1. Reste à faire — bibliothèque + phases suivantes

| Priorité | Chantier | Détail |
|---|---|---|
| P1 | **Migration des templates** vers les composants catalogués | Les `Hero*.astro` ont été créés en **copies fidèles** (rule 28, DS figé) ; les templates/pages live ne les **consomment pas encore**. Refactor : `src/components/templates/*` → importer les `Hero*`/sections du registry. 0 régression visuelle (GF-1 par page touchée). |
| P1 | **GF-1 visuel exhaustif sur preview Vercel** | Déployer la branche en **preview Vercel** → sweep Playwright sur les 57 `/preview/<type>` (screenshot + `getComputedStyle` opacity≠0) + `/agence/design-system` + `/components/[type]`. Le sample de cette session (hero-sector + catalogue) est vert ; faire le balayage complet. |
| P2 | `hero-liquid` (manifesto React `LiquidHero.tsx`) | Skippé cette session (intégration React dans le preview à risque) — décider : cataloguer ou non. |
| P2 | Reste enrichment / autres phases | Cf `docs/14-MASTER-PLAN-SESSION-NEXT.md` + `docs/16-EXECUTION-TRACKER.md`. |
| P3 | Nettoyer le bruit build `❌ File not found` | Rendre la lecture preview tolérante à l'ordre de build (fallback iframe runtime). |

## 2. Setup orchestration NEXT session (vision Simon 2026-06-02)

**Mode cible** : session **cloud activée** + travail aussi sur les **repos locaux** ; décider d'exécuter certaines tâches sur des **branches git isolées** avec **plusieurs agents**. L'orchestrateur (Claude Code dans l'app Desktop) **lance des terminaux locaux** (claude-yolo) avec **tmux** (iTerm2 `-CC` ou Terminal + `tmux`) et orchestre comme un **ingénieur senior**.

**Primitives à utiliser (matrice « bon mode au bon moment » — rule 57 globale)** :
- **Branches isolées + N agents** : `git worktree` par scope OU sous-agents `isolation: worktree` (frontmatter) OU sessions `claude --bg` (auto-worktree `.claude/worktrees/`). 1 scope = 1 branche `feat/<scope>` (jamais `git add -A` global).
- **Agent teams split-panes** (debate/cross-layer) : lancer Claude **dans une session tmux** → `teammateMode: "auto"` bascule en split-panes. Sinon in-process (Shift+Down). `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` déjà posé.
- **Workflows dynamiques** (≥ 2.1.154, dispo) : pour un balayage à grande échelle (ex. GF-1 sur 57 previews, audit codebase-wide) → mot « workflow » ou `/effort ultracode`.
- **`claude --bg`** : missions longues supervisées (`claude agents` pour piloter ; `respawn --all` après update binaire).
- **Codex** : exécution longue, compteur séparé, si crédits dispo.

**Découpe suggérée NEXT (parallélisable, branches isolées)** :
1. `feat/templates-consume-registry` — migration templates (worker/agent dédié).
2. `feat/lib-gf1-sweep` — workflow GF-1 sur les 57 previews (preview Vercel).
3. Garder `feat/library-heroes-enrich` comme base à merger en premier (ou rebaser les 2 ci-dessus dessus).

## 3. Garde-fous (NON négociables)

- **GF-1** : aucun « validé/parfait » sans Playwright screenshot above-fold + `getComputedStyle` (opacity≠0, transform neutre) sur la **preview/prod déployée**. Lighthouse ne suffit jamais.
- **Prod** : `waimia.com` sert `waimia-web`. Ne merger sur `main` (→ prod) qu'après GF-1 sur preview. **Auto-merge GitHub = OFF.**
- **Push** : `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>`.
- **GitHub** : org **`virtuoseweb`** (waimia-web / waimia-cal / waimia-v2). ≠ Amploi (`vigiscope-site`). Ne jamais confondre.
- **Délégation** : Opus orchestre (≤ 3 LoC applicatif), workers exécutent (rule 23). Codex out-of-credits = fallback Opus/Sonnet, ne pas retenter Codex soi-même.

## 4. Config Claude Code (état 2026-06-02 — prête)

- Version **2.1.160** · `teammateMode: "auto"` · `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` · workflows ON · typescript-lsp ON · install npm orpheline purgée.
- Matrice de sélection des modes = **rule 57** (`~/.claude/rules-library/57-orchestration-mode-selection.md`) ; commandes = rule 53 ; modèle/effort = rules 41/52.
- ⚠️ **Dès 2026-06-15** : `claude -p` / Agent SDK puisent dans un **crédit Agent SDK mensuel séparé** des limites interactives Max (favorise la délégation). `--bare` saute l'OAuth → jamais pour worker abonnement.
- **macOS** : accorder **Accès complet au disque** à « Claude Code » (Réglages Système ▸ Confidentialité) pour que les sessions `claude --bg` lisent `~/Desktop`/`~/Documents`/`~/Downloads`.
- **`/config`** = commande du **terminal Claude Code** (pane terminal dans Desktop), pas le chat Desktop.

## 5. Reprise — commandes

```bash
# 1. Cloner/mettre à jour la branche (depuis GitHub)
gh repo clone virtuoseweb/waimia-web   # ou: cd ~/waimia-web && git fetch origin
cd ~/waimia-web && git checkout feat/library-heroes-enrich && git pull

# 2. Installer + vérifier l'état vert
npx -y pnpm@9.15.0 install
npx -y pnpm@9.15.0 exec astro check        # attendu : 0 errors
npx -y pnpm@9.15.0 build                    # attendu : Complete!

# 3. Migrer les sous-modes d'orchestration (exemples)
tmux new -s waimia                          # puis `claude` → teammateMode auto = split-panes
claude agents                               # piloter les sessions --bg
```

## 6. Initialisation hooks/garde-fous — CLOUD vs LOCAL (lire impérativement)

⚠️ **Distinction critique** (source : `code.claude.com/docs/en/claude-code-on-the-web` → « What's available in cloud sessions ») :
une session **cloud** (Claude Code on the web) démarre d'un **clone frais du repo** dans une VM Anthropic. Le `~/.claude` global de Simon (ses 10 rules fondamentales, les 46 situationnelles, `rules-enforcer.sh`, ecc, les plugins `enabledPlugins` user, les MCP ajoutés via `claude mcp add`) **NE SONT PAS clonés** → **ils ne s'exécutent PAS en cloud**. Verbatim doc : *« user-level settings don't carry over to cloud sessions. In the cloud, only hooks committed to the repo run. »*

| Élément | Cloud | Local | Source |
|---|:---:|:---:|---|
| Repo `CLAUDE.md` (garde-fous inline) | ✅ | ✅ | part of the clone |
| Repo `.claude/settings.json` (env teams, teammateMode, hooks) | ✅ | ✅ (merge avec global) | part of the clone |
| Plugin `vw-guardrails` déclaré dans `.claude/settings.json` (hook SessionStart + agent `visual-proof-reviewer` + cmd) | ✅ | ✅ | installé au boot depuis le marketplace public |
| `~/.claude/CLAUDE.md` + rules + `rules-enforcer.sh` + ecc | ❌ | ✅ | user-scoped, hors clone |
| Plugins user `enabledPlugins` / MCP `claude mcp add` | ❌ | ✅ | user-scoped |

**Ce qui a été commité pour que le cloud s'initialise correctement** (fait le 2026-06-02, MAJ plugin) :
- `.claude/settings.json` → `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `teammateMode: "auto"` + **`extraKnownMarketplaces` (virtuoseweb) + `enabledPlugins` (vw-guardrails@virtuoseweb)**. Au démarrage de session cloud, Claude Code **installe le plugin** depuis `github.com/virtuoseweb/claude-config` (public).
- **Plugin `vw-guardrails`** (source unique partagée par TOUS les repos) fournit : hook SessionStart (GF-1..GF-6, full en cloud / 1-ligne en local + détection surface), agent `visual-proof-reviewer` (preuve visuelle ET fonctionnelle), commande `/vw-guardrails:guardrails`. Plus d'inline `.claude/hooks` ni `.claude/agents` dans le repo → zéro duplication, mise à jour centralisée (push + bump version sur claude-config).
- `CLAUDE.md` repo → garde-fous inline = **fallback** si le réseau cloud bloque l'install du plugin.
- **`.mcp.json`** repo → déclare le MCP **Playwright** (`npx @playwright/mcp`) → dispo en cloud pour la preuve GF-1 visuelle (sinon aucun MCP en cloud). Neon/computer-use restent absents en cloud (à ajouter au `.mcp.json` si besoin).
- **Plugin v0.2.0** : en cloud le hook injecte AUSSI la discipline d'orchestration/qualité condensée (délégation, preuve-avant-validé, no-passive, source-before-claim, plan, branches isolées) — car les 10 rules fondamentales du `~/.claude` ne sont PAS en cloud.

**Ce que le cloud N'A PAS (assumé)** : les 46 rules situationnelles, le routage `rules-enforcer` (pas d'injection auto par mot-clé), l'apprentissage ecc, MEMORY.md, les MCP perso non déclarés. Le cloud = GF + discipline condensée + projet ; le **gros du raisonnement orchestré + la preuve visuelle lourde se font mieux en LOCAL**.

**En cloud, NE PAS compter sur** : le routage `rules-enforcer` (pas de surfaçage auto de l'arsenal), les 56 rules globales, les MCP perso (Playwright/Vercel/Neon… via `claude mcp add`). En cloud, les **outils GitHub intégrés** remplacent `gh` (non pré-installé) ; pour Playwright/MCP en cloud, les déclarer dans un `.mcp.json` repo (non fait — le sweep GF-1 visuel se fait donc plutôt en **local** ou via un `.mcp.json` à ajouter).

### Checklist de vérification d'init au démarrage de la PROCHAINE session

**LOCAL** (terminal / Desktop) — vérifier en début de session :
1. Le bloc « Session resume » + GF-1→GF-6 + instinct est injecté (= `session-start.sh` + `session-resume-context.sh` ont tourné). Sinon : `bash -n ~/.claude/hooks/session-start.sh` et vérifier `settings.json` `hooks.SessionStart`.
2. Le hook du plugin `vw-guardrails` ajoute une ligne « vw-guardrails actif (💻 LOCAL) ».
3. Sur le 1er prompt à mots-clés (ex. « workflow », « gf-1 », « déléguer »), `rules-enforcer.sh` injecte les rules pertinentes (bandeau « 🤖 / 📐 »). Sinon : `bash -n ~/.claude/hooks/rules-enforcer.sh`.
4. Canari : `grep CANARY_CLAUDE_GLOBAL_SIMON_V19 ~/.claude/CLAUDE.md` (présent = global chargé).

**CLOUD** (claude.ai/code) — vérifier en début de session :
1. Le repo `CLAUDE.md` est lu (Claude cite les garde-fous waimia-web).
2. Le hook du plugin `vw-guardrails` injecte le bloc complet « Garde-fous VirtuoseWeb » avec surface = `☁️ CLOUD` (= preuve que le plugin s'est installé depuis le marketplace + que le SessionStart tourne). Si absent → vérifier `claude plugin list` (le plugin doit apparaître) ; sinon le réseau a bloqué l'install → le `CLAUDE.md` repo reste le fallback.
3. `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` actif (teams dispo) — sinon vérifier que le repo `.claude/settings.json` a bien été cloné (committé sur la branche lancée).
4. **Conscience que les rules/hooks globaux NE tournent PAS** → s'auto-discipliner via le repo CLAUDE.md + ce doc (pas d'attente du routage `rules-enforcer`).

Si un de ces points échoue → le corriger AVANT de produire (rule 10 session-start-audit côté local ; côté cloud, vérifier que la branche lancée contient bien `.claude/`).

## 7. Autonomie / permissions (cloud + local) — source : `code.claude.com/docs/en/permissions`

L'autonomie totale (zéro prompt de permission) est **déjà active**, par config — **rien à taper** (`--dangerously-skip-permissions` / claude-yolo redondants) :

- **LOCAL** : `~/.claude/settings.json` a **déjà** `permissions.defaultMode: "bypassPermissions"` + un `allow` exhaustif (`Bash(*)`, `Edit(*)`, `mcp__*`, `Agent(*)`…). Mode `bypassPermissions` = *« Skips all permission prompts »* (seul `rm -rf /` ou `~` re-prompte, circuit-breaker). S'applique à **tous les projets locaux** (réglage user-scoped) → lancer simplement `claude` (binaire `/Users/simonberos/.local/bin/claude`), l'autonomie est héritée. Ne PAS passer par un wrapper qui surcharge le mode.
- **CLOUD** (claude.ai/code) : la VM Anthropic est **isolée par design** → la doc cadre les sessions cloud comme **exécution autonome** (*« letting Claude execute autonomously in the cloud »*, pattern `claude --remote "..."`). Pas besoin de committer `bypassPermissions` dans le repo (et on évite de le faire : commiter un mode bypass dans un repo = mauvais signal si le repo est partagé). L'isolation sandbox EST la ceinture de sécurité.
- **Ne PAS** mettre `permissions.disableBypassPermissionsMode` (verrouillerait l'autonomie). Vérif locale : `grep -A2 defaultMode ~/.claude/settings.json`.
- Pour piloter une exécution cloud depuis le terminal local : `claude --permission-mode plan` (cadrer le plan) → commit/push → `claude --remote "exécute le plan docs/<...>"` (exécution autonome cloud). Plusieurs `--remote` = sessions cloud parallèles.
