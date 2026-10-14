---
name: integrer-un-lot
description: Intégrer le travail d'un worker dans waimia-web : patch du worktree, régénérations, un seul build, portes check:*, astro check, board, commit, push, PR et preview Vercel.
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
8. Push rare (chaque push = un build Vercel facturé) :
   `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin <branche>`
9. PR vers `main`, jamais d'auto-merge. Preview Vercel prouvée (parcours réel, skill `prouver-une-page`) avant merge ; une preuve locale ne la remplace pas. Secrets de bypass masqués.

## Pièges

- Un rouge de porte n'est pas toujours du lot : `git log -S` avant d'imputer.
- Retrait ou renommage de pages : `rg` des liens entrants, 301 seulement si la page était en prod, prouvée dans `.vercel/output/config.json`.
- Déployer par `git push` seulement, jamais `vercel deploy`.
