#!/usr/bin/env bash
# board-sync.sh — régénère le board de progression après chaque `git commit`.
# Hook PostToolUse (matcher "Bash"). Ne fait RIEN sauf si la commande Bash était un git commit.
# Sémantique : le board (docs/state/00-BOARD.md) doit refléter git APRÈS le commit ; il est
# régénéré ici et reste en working tree, capté par le commit suivant. Non bloquant (exit 0 toujours).
# Inerte tant que scripts/sync-board.mjs n'existe pas (transition / autres repos).

input=$(cat)

# Extrait la commande Bash exécutée depuis le JSON PostToolUse (python3 dispo sur macOS).
cmd=$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)

case "$cmd" in
  *"git commit"*)
    root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
    cd "$root" || exit 0
    [ -f scripts/sync-board.mjs ] || exit 0
    node scripts/sync-board.mjs --regen >/dev/null 2>&1 || true
    # Avertit (sans bloquer) si une case [x] n'est pas adossée à un commit réel.
    if ! node scripts/sync-board.mjs --check >/dev/null 2>&1; then
      echo "⚠ board désync détectée (case [x] sans commit prouvé) — voir docs/state/00-BOARD.md §Désyncs" >&2
    fi
    ;;
esac

exit 0
