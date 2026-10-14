---
name: lire-un-gros-volume
description: Lire un document ou un corpus trop gros pour un contexte : section par plage de lignes, ou lecture fractionnée par agents parallèles avec synthèse en fichier.
---

# Lire un gros volume

Ne jamais lire en entier ce qui dépasse une unité utile ; une lecture trop grosse se découpe.

## Une section suffit

1. Trouver : `rg -n '^#{1,4} ' <fichier>` ou `rg -n '<terme>' <fichier>`.
2. Mesurer : `wc -l`, `wc -c`.
3. Lire la plage seulement : Read avec `offset` et `limit` (Claude), `sed -n '<debut>,<fin>p'` (Codex, shell).
4. Docs du site : `docs/README.md` d'abord, puis les seules sources de la mission. Journaux (`tasks/ORCH-STATE.md`, `docs/seo/journal.md`) : jamais en entier, par plage récente.
5. Code long : `rg -n 'export ' <f>` puis la plage. Données JSON volumineuses : `node -e` qui extrait les champs utiles.

## Le volume dépasse un contexte

1. Découper en parts bornées (plages ou liste de fichiers), mesurées avant.
2. Une part par agent parallèle (`explorer` lit, `checker` compte, `analyst` synthétise), chacun écrit sa synthèse dans son scratchpad. Consigne : signaler un constat grave aussitôt, citer `fichier:ligne`, ne rien modifier, 300 mots au plus. 3 workers lourds au plus.
3. L'orchestrateur fusionne, puis REVÉRIFIE par lecture directe ce qui fonde une décision : une synthèse est une hypothèse.
4. Une question de convention se tranche par un compte (`rg -c`), pas par deux lignes voisines.

## Pièges

- Un `rg` à 0, un pipe qui avale le code de sortie ne mesurent rien : exiger un témoin positif. `rg` est une fonction de shell : en script, utiliser `grep` ou un chemin explicite.
- `git grep` ignore les fichiers non suivis.
- Un nom de colonne ou de titre n'est pas sa définition : lire le site. Un compte du contexte non daté se périme : le remesurer.
