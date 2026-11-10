---
name: integrer-un-lot
description: Intégrer le travail d'un worker dans waimia-web : patch du worktree, régénérations, un seul build, portes check:*, astro check, board, commit, push, PR, CI et contrôle de la production après merge.
---

# Intégrer un lot

Le parent intègre seul. Un worker ne builde pas, ne commite pas.

## Procédure

1. Lire le diff du lot : `git -C /Users/simonberos/waimia-web/.worktrees/<slug> diff <sha>` (toujours `git -C <chemin absolu>`, jamais `cd &&`). Appliquer en patch sur la branche du scope, un lot après l'autre.
2. Rejouer la preuve critique du lot, sans lui faire confiance (rapport = hypothèse).
3. Régénérations : le `prebuild` régénère les agrégats et contrôle `check:content-refs`. Ne pas éditer à la main un fichier généré.
4. UN SEUL build, en fond, un lourd à la fois (crochet-ressources) :
   `WAIMIA_INTERNAL_TOOLS=0 npx -y pnpm@9.15.0 build`
5. Portes (npm run, après build) : `check:seo`, `check:schema`, `check:jsonld`, `check:head`, `check:sitemap`, `check:internal-links`, `check:internal-mesh`, `check:silos`, `check:no-emdash`, `check:jargon`, `check:content-refs`, `check:redirects`, `check:static-quality`. Puis `npx -y pnpm@9.15.0 exec astro check`, complet après tout merge multi-branches.
6. Si `docs/state` est touché : `node scripts/sync-board.mjs --regen` puis `npm run check:board`.
7. Un commit par lot, pas de `git add -A` global ; message avec la preuve.
8. Push : `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>`. Aucune branche ne déclenche de build Vercel, seulement la CI GitHub : seule la fusion sur `main` construit la production.
9. PR vers `main`, jamais d'auto-merge (exception : la PR quotidienne de la routine SEO, voir plus bas). Avant merge : CI verte (build, build de production, e2e et GF-1 sur build servi) et preuve locale sur le build de production servi (skill `prouver-une-page`). Après merge : contrôler waimia.com (marqueur du commit, parcours touché). Secrets de bypass masqués.

## Plusieurs PR de la routine SEO en attente

Ne jamais les fusionner une par une : chaque fusion sur `main` déclenche un build de production. Les intégrer dans une seule branche :

1. Worktree propre depuis `origin/main` : `git -C /Users/simonberos/waimia-web worktree add -b integ/seo-<du>-a-<au> .worktrees/integ-seo origin/main`.
2. Dans ce worktree : `node scripts/seo-routine/integrer-prs.mjs` (toutes les PR ouvertes `feat/seo-*`, par numéro) ou `node scripts/seo-routine/integrer-prs.mjs 157 158`. Le calendrier se fusionne entrée par entrée par `id` (une entrée ne recule jamais de statut), le journal garde l'entrée la plus récente en haut, `keywords.json` et `internal-mesh.ts` gardent les lignes ajoutées des deux côtés et refusent un doublon, les fichiers générés sont régénérés. Tout autre conflit l'arrête : le résoudre, `git add`, `git commit --no-edit`, puis relancer avec `--continue`.
3. Contrôles : `node scripts/seo-routine/check-calendar.mjs`, `node scripts/seo-routine/check-config.mjs`, puis la procédure ci-dessus à partir de l'étape 4 (un build, portes, `astro check`).
4. Une PR d'intégration vers `main` qui liste les PR intégrées ; sa fusion ferme ces PR (leurs commits sont dans `main`) et ne déclenche qu'un build de production.

Fusion directe de la routine SEO : sa PR du jour se fusionne une fois tous les checks requis verts (`gh pr checks <n> --watch`, puis `gh pr merge <n> --merge`), une par jour au plus donc un build de production par jour. Elle reste ouverte avec la mention « Pour Simon » pour une suppression, redirection ou dépublication de page, un check rouge après correction, ou une PR d'un jour précédent encore ouverte (intégrer d'abord les PR en attente par la procédure ci-dessus). Interdits : push direct sur `main`, `vercel deploy`, API Vercel, auto-merge. Après fusion : nouvelles URL en 200 et marqueur du commit sur waimia.com.

## Illustration de hero de chaque contenu

Tout contenu publié dans un hub (blog, guides, comparatifs, outils, actualités) a sa propre illustration de hero, jamais partagée, et sa carte affiche exactement cette image. Pour un contenu neuf : dessin avec le skill `waimia-illustration`, **moteur B seulement** (`render-svg.mjs`, jamais `generate.mjs` ni l'API OpenAI d'images), enregistré par `add-illustration.mjs --no-fallback` sous `<deux premiers segments du slug>-<motif>`, puis `heroIllustration` (`src`, `alt_fr`, `alt_en`, `side`) dans le JSON. Porte : `npm run check:hero-illustrations` (baseline de transition qui ne peut que diminuer ; une entrée devenue inutile la fait échouer).

## Pièges

- Un rouge de porte n'est pas toujours du lot : `git log -S` avant d'imputer.
- Retrait ou renommage de pages : `rg` des liens entrants, 301 seulement si la page était en prod, prouvée dans `.vercel/output/config.json`.
- Déployer par `git push` seulement, jamais `vercel deploy`.
