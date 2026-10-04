#!/usr/bin/env bash
# « Ignored Build Step » de Vercel (vercel.json > ignoreCommand).
# Code de sortie 0 = Vercel saute le déploiement ; 1 ou plus = Vercel déploie.
#
# But : la collecte SEO hebdomadaire commite des fichiers sous docs/seo/data/ sur main. Ces
# fichiers ne changent rien au site : inutile de redéployer la production pour eux.
#
# Règle : on ne saute le déploiement que s'il est PROUVÉ que tous les fichiers modifiés depuis
# le dernier déploiement réussi de la branche sont sous docs/seo/data/. Au moindre doute
# (pas de déploiement précédent, commit absent du clone superficiel, erreur git), on déploie.
set -u

deploy() {
  echo "vercel-ignore-build : déploiement ($1)"
  exit 1
}

prev="${VERCEL_GIT_PREVIOUS_SHA:-}"
[ -n "$prev" ] || deploy "aucun déploiement réussi précédent connu pour cette branche"
git cat-file -e "${prev}^{commit}" 2>/dev/null || deploy "commit ${prev} absent du clone"

changed="$(git diff --name-only "$prev" HEAD 2>/dev/null)" || deploy "git diff a échoué"
[ -n "$changed" ] || deploy "aucun fichier modifié détecté"

other="$(printf '%s\n' "$changed" | grep -v '^docs/seo/data/' || true)"
if [ -z "$other" ]; then
  echo "vercel-ignore-build : déploiement sauté, seuls des fichiers sous docs/seo/data/ ont changé depuis ${prev}"
  exit 0
fi
deploy "des fichiers hors docs/seo/data/ ont changé"
