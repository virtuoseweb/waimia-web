#!/usr/bin/env bash
# session-guardrails.sh — hook SessionStart REPO-LEVEL (waimia-web)
# But : recharger les garde-fous au boot, EN CLOUD comme EN LOCAL.
# Pourquoi repo-level : en cloud (Claude Code on the web) le ~/.claude global de Simon
# n'est PAS cloné → seuls les hooks commités dans le repo s'exécutent
# (doc : code.claude.com/docs/en/claude-code-on-the-web → "only hooks committed to the repo run").
# Portable : bash + python3 uniquement (tous deux présents dans le sandbox cloud). Aucun chemin ~/.claude.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT" 2>/dev/null || true

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
LAST="$(git log -1 --pretty='%h %s' 2>/dev/null || echo '?')"

# Détecte la surface : cloud (VM Anthropic) vs local
if [ -n "${CLAUDE_CODE_REMOTE_SESSION_ID:-}" ]; then
  SURFACE="☁️  CLOUD (VM Anthropic) — seuls le repo CLAUDE.md + ce .claude/ s'appliquent (PAS le ~/.claude global)"
else
  SURFACE="💻 LOCAL — repo .claude/ + ~/.claude global de Simon (hooks/rules/GF) tous deux actifs"
fi

CTX="## 🛡️ Garde-fous waimia-web rechargés (hook repo SessionStart)

Surface : $SURFACE
Branche : \`$BRANCH\` · dernier commit : \`$LAST\`

**GF-1 (preuve visuelle)** — jamais « validé / fini / parfait » sur du rendu sans Playwright screenshot above-fold + \`getComputedStyle\` (opacity≠0, transform neutre) sur la **preview/prod déployée**. Lighthouse ne suffit JAMAIS. Reviewer dédié : agent \`visual-proof-reviewer\`.
**Prod** — \`waimia.com\` sert \`main\`. Ne merger sur \`main\` qu'après GF-1 sur une preview Vercel. **Auto-merge GitHub = OFF.**
**Branches isolées** — 1 scope = 1 branche \`feat/<scope>\`, jamais \`git add -A\` global. Push :
\`git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>\` (local) ou outils GitHub intégrés (cloud).
**DS figé** — on catalogue/compose l'existant ; 0 nouveau token CSS ; les 4 touchpoints (schema/demo/registry/composant) restent synchronisés.
**Orchestration** — décomposer en sous-agents + branches isolées (workflows / agent teams / worktrees), ne pas tout faire en mono-bloc.

➡️ **Reprise** : lire \`docs/20-SESSION-NEXT-CLOUD-ORCHESTRATION.md\` EN PREMIER (état + plan + reste à faire P1)."

export CTX
python3 -c '
import os, json
print(json.dumps({
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": os.environ.get("CTX", "")
  }
}))
'
