#!/usr/bin/env bash
# « Ignored Build Step » de Vercel (vercel.json > ignoreCommand).
# Code de sortie 0 = Vercel saute le déploiement ; 1 ou plus = Vercel déploie.
#
# But : ne payer que les builds utiles (décision de Simon du 6 novembre 2026).
#
# 1. Aucune preview (décision de Simon du 10 novembre 2026 : on ne construit que la production).
#    vercel.json > git.deploymentEnabled ne déploie que `main`. Ce script en est la ceinture : il
#    saute tout déploiement hors production, quelle que soit la branche.
# 2. Pas de build pour un changement sans effet sur le site. On ne saute le déploiement que s'il
#    est PROUVÉ que tous les fichiers modifiés depuis le dernier déploiement réussi de la branche
#    sont sous un chemin que le build ne lit pas (SANS_EFFET). Au moindre doute (pas de
#    déploiement précédent, liste des fichiers introuvable, erreur), on déploie.
#
# Le clone de Vercel est superficiel : le commit du dernier déploiement n'y figure presque jamais
# (mesuré le 25 octobre 2026 : « commit 7f1301a… absent du clone » sur le commit d'état IndexNow, qui a
# donc été déployé pour rien). Dans ce cas, la liste des fichiers vient de l'API publique de GitHub
# (comparaison entre le dernier déploiement et ce commit), le dépôt étant public. Si l'API ne répond
# pas, répond autre chose que 200, ou tronque sa liste, on déploie : jamais l'inverse.
set -u

# Chemins que le build ne lit pas, vérifié le 6 novembre 2026 : aucun import, glob ni loader de
# src/content.config.ts, astro.config.mjs, src/ ou packages/ n'y pointe. N'ajouter un chemin
# qu'après la même vérification. scripts/, public/, private/ et les JSON racine en sont exclus :
# le build les lit.
SANS_EFFET='^(docs/|tasks/|\.claude/|\.agents/|\.github/|tests/|scripts/tests/|[^/]+\.md$|[^/]+\.(png|jpe?g)$)'

deploy() {
  echo "vercel-ignore-build : déploiement ($1)"
  exit 1
}

skip() {
  echo "vercel-ignore-build : déploiement sauté, $1"
  exit 0
}

# Fichiers modifiés entre $1 et $2 d'après l'API GitHub, un par ligne. Échoue (code non nul) si la
# réponse n'est pas un 200 complet : plus de 300 fichiers = liste tronquée = on ne se prononce pas.
github_changed_files() {
  local owner="${VERCEL_GIT_REPO_OWNER:-}" repo="${VERCEL_GIT_REPO_SLUG:-}" body
  [ -n "$owner" ] && [ -n "$repo" ] || return 1
  command -v curl >/dev/null 2>&1 && command -v node >/dev/null 2>&1 || return 1
  # -f : tout code HTTP >= 400 (dépôt introuvable, limite de débit atteinte) fait échouer curl.
  body="$(curl -fsS --max-time 15 -H 'accept: application/vnd.github+json' -H 'user-agent: waimia-ignore-build' \
    "https://api.github.com/repos/${owner}/${repo}/compare/${1}...${2}")" || return 1
  printf '%s' "$body" | node -e '
    let raw = "";
    process.stdin.on("data", (c) => (raw += c)).on("end", () => {
      try {
        const files = JSON.parse(raw).files;
        if (!Array.isArray(files) || files.length === 0 || files.length >= 300) process.exit(1);
        process.stdout.write(files.map((f) => f.filename).join("\n") + "\n");
      } catch {
        process.exit(1);
      }
    });
  '
}

if [ -n "${VERCEL_ENV:-}" ] && [ "$VERCEL_ENV" != "production" ]; then
  skip "pas de preview pour la branche « ${VERCEL_GIT_COMMIT_REF:-} » : seule la production se construit"
fi

prev="${VERCEL_GIT_PREVIOUS_SHA:-}"
[ -n "$prev" ] || deploy "aucun déploiement réussi précédent connu pour cette branche"

if git cat-file -e "${prev}^{commit}" 2>/dev/null; then
  changed="$(git diff --name-only "$prev" HEAD 2>/dev/null)" || deploy "git diff a échoué"
else
  head_sha="${VERCEL_GIT_COMMIT_SHA:-$(git rev-parse HEAD 2>/dev/null || true)}"
  [ -n "$head_sha" ] || deploy "commit ${prev} absent du clone et SHA courant inconnu"
  changed="$(github_changed_files "$prev" "$head_sha")" || deploy "commit ${prev} absent du clone et liste GitHub indisponible"
fi
[ -n "$changed" ] || deploy "aucun fichier modifié détecté"

other="$(printf '%s\n' "$changed" | grep -Ev "$SANS_EFFET" || true)"
[ -n "$other" ] || skip "seuls des fichiers sans effet sur le site ont changé depuis ${prev}"
deploy "des fichiers lus par le build ont changé, dont $(printf '%s\n' "$other" | head -n 1)"
