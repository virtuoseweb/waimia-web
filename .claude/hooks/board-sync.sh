#!/usr/bin/env bash
# Implémentation commune et fixtures : .codex/hooks/board-sync.sh et test-board-sync.py.
repo="$(cd "$(dirname "$0")/../.." && pwd)" || exit 1
exec bash "$repo/.codex/hooks/board-sync.sh"
