---
name: ecrire-un-brief
description: Rédiger le brief d'un worker du site waimia-web : sha de base, arbre .worktrees, chemins possédés, interdits, preuves sans build, rouges attendus, clause de refus, rôle explicite.
---

# Écrire un brief

Un brief est autonome et court. Un petit correctif reste local ; déléguer ce qui est indépendant.

## Ce que le brief porte

1. Sha de base et chemin ABSOLU de l'arbre `/Users/simonberos/waimia-web/.worktrees/<slug>`. Première commande : `git -C <arbre> log -1 --oneline`, arrêt s'il diffère du sha.
2. Chemins d'écriture possédés, et eux seuls. Deux writers : worktrees distincts (ports, `dist`, caches).
3. Interdits, énoncés tels quels : git de mutation (add, commit, checkout, stash, reset), build, `pnpm install`, Playwright, sous-délégation. Le parent construit et intègre.
4. Preuves SANS build, avec code de sortie attendu :
   - `node -e "JSON.parse(require('fs').readFileSync('<f>','utf8'))"` pour chaque JSON touché ;
   - `node scripts/check-no-emdash.mjs` et `node scripts/check-jargon.mjs` ;
   - `node scripts/check-silos.mjs` si `category` ou le maillage bougent.
5. Plafonds de schéma à donner dans le brief : `packages/ds-kernel/src/schemas/sections.ts`, `description` ≤ 175. Une green-list d'URLs vérifiées dans `dist/` pour tout lien.
6. Rouges attendus, annoncés : dérouler ce que le lot casse (une porte textuelle peut rougir sur la prose qui explique son sujet).
7. Clause de refus : « Refais cette mesure toi-même avant de corriger : si elle est fausse, dis-le et n'écris rien. » Aucun chiffre d'audit recopié sans rejeu.
8. Rôle explicite (`AGENTS.md#rôles-des-workers`) : `checker`, `explorer`, `editor`, `coder`, `analyst`, `designer`, `reviewer`, `rescue`, avec modèle passé explicitement. `designer` et `reviewer` : exiger `fichier:ligne`.
9. Rapport de 300 mots au plus : fichiers, commandes, codes de sortie, limites. Un défaut hors périmètre est signalé, pas corrigé.

## À la réception

Le rapport est une hypothèse : rejouer la preuve critique (skill `integrer-un-lot`). « Je n'ai rien écrit » sur une mesure fausse est un succès. Au retour : `git status` du dépôt principal et `ps aux | grep 'claude -p'`.
