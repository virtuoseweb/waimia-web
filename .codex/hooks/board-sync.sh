#!/usr/bin/env bash
# Commandes git simples seulement ; pour une commande shell composée, régénérer explicitement.
exec python3 - "$0" 3<&0 <<'PY'
import json
import os
from pathlib import Path
import shlex
import subprocess
import sys


def warning(message):
    print(json.dumps({"systemMessage": f"board-sync : {message}"}, ensure_ascii=False))


def run(args, cwd):
    return subprocess.run(args, cwd=cwd, capture_output=True, text=True,
                          timeout=15, check=True)


def main():
    try:
        with os.fdopen(3) as stream:
            payload = json.load(stream)
        if not isinstance(payload, dict):
            raise ValueError("objet attendu")
    except (OSError, ValueError):
        warning("entrée JSON invalide.")
        return
    tool_input = payload.get("tool_input", {})
    if not isinstance(tool_input, dict):
        warning("tool_input invalide.")
        return
    command = tool_input.get("command") or tool_input.get("cmd")
    if not isinstance(command, str) or not command.strip():
        return
    try:
        lexer = shlex.shlex(command, posix=True, punctuation_chars=";&|()")
        lexer.whitespace_split = True
        lexer.commenters = ""
        tokens = list(lexer)
    except ValueError:
        warning("commande impossible à analyser.")
        return
    if not tokens or Path(tokens[0]).name != "git":
        return
    if any(t and all(c in ";&|()" for c in t) for t in tokens):
        return
    cwd = tool_input.get("workdir") or payload.get("cwd")
    if not isinstance(cwd, str) or not Path(cwd).is_absolute():
        warning("cwd absolu absent du payload.")
        return
    target = Path(cwd).resolve()
    index = 1
    while index < len(tokens):
        token = tokens[index]
        if token in ("-C", "-c"):
            if index + 1 >= len(tokens):
                return
            value = tokens[index + 1]
            if token == "-C" and value:
                target = (target / value).resolve()
            index += 2
        elif token.startswith("-C") and len(token) > 2:
            target = (target / token[2:]).resolve()
            index += 1
        elif token.startswith("-c") and len(token) > 2:
            index += 1
        elif token in ("--no-pager", "--paginate"):
            index += 1
        else:
            break
    if index >= len(tokens) or tokens[index] != "commit":
        return
    if any(t in ("--dry-run", "--help", "-h") for t in tokens[index + 1:]):
        return
    allowed = Path(sys.argv[1]).resolve().parents[2]
    try:
        root = Path(run(["git", "rev-parse", "--show-toplevel"], target).stdout.strip()).resolve()
        if root != allowed:
            return
        script = root / "scripts" / "sync-board.mjs"
        if not script.is_file():
            warning("scripts/sync-board.mjs absent ; synchronisation impossible.")
            return
        for mode in ("--regen", "--check"):
            run(["node", str(script), mode], root)
    except subprocess.TimeoutExpired:
        warning("délai de 15 s dépassé ; synchronisation non vérifiée.")
    except subprocess.CalledProcessError as error:
        warning(f"{Path(error.cmd[0]).name} a échoué (code {error.returncode}).")
    except OSError:
        warning("exécutable ou répertoire inaccessible.")


main()
PY
