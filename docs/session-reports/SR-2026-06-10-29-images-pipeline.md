# SR-2026-06-10-29 · Pipeline images gpt-image-2 + media TinaCMS repo-based (mission Simon)

> **Addendum GF-1 PROD (22:46)** : push `5da0c31`, live 22:45. `https://waimia.com/images/besoins/besoin-acquerir.webp` → 200.

> Worker **Fable 5** (worktree `.worktrees/images`, branche `feat/images-pipeline` `376f653`) + subagent Sonnet (conversion WebP). Contre-vérifié orchestrateur : clé absente du repo (grep), dimensions sips 16/16, inspection visuelle 6/16 (DA conforme : parchemin, encre, accent terracotta unique, zéro texte).

## 1. Architecture media (réponse à « props ou TinaCloud, le moins de complications »)

**Repo-based media** : fichiers dans `public/images/<categorie>/<slug>.webp`, référencés par des strings `src`/`alt` en props ou frontmatter MDX. C'est nativement le modèle media de TinaCMS : en local, media filesystem (`publicFolder: 'public'`, `mediaRoot: 'images'`, posé dans `tina/config.ts`) ; sur TinaCloud, le même media store repo-based fonctionne **sans bascule de chemins**. Aucune BDD, aucune couche supplémentaire : quand TinaCMS sera configuré, les champs image des sections seront éditables et pointeront sur ces mêmes fichiers.

## 2. Livrables

- `scripts/generate-images.mjs` : Node natif (fetch), lit `src/data/image-manifest.json`, POST `/v1/images/generations` (gpt-image-2, quality medium), **sortie WebP q82 via sharp** (-97 % : 35,9 Mo PNG → 1,09 Mo), `--force/--only/--png`, retry ×2. Clé lue depuis l'env ou `.env.openai` (gitignoré, **jamais dans le repo**).
- `src/data/image-manifest.json` : 16 briefs avec stylePrefix DA commun (parchemin #f6f1e8, encre, UN accent terracotta, print constructiviste, no text) + alt fr/en.
- **Lot 1 généré (16/16, 0 échec)** : 3 illustrations besoin (acquerir/piloter/operer, 1536×1024), 4 covers cas (ancrées au métier réel de chaque cas, ex. plateau = entonnoir pipeline avec goutte terracotta), 6 thèmes (1024×1024), 3 textures de fond quasi invisibles (extremely low contrast).
- `docs/38-IMAGES-PIPELINE.md` : charte de prompt, inventaire avec usage prévu par image (base du wiring).

## 3. Suite

Le **wiring** des images dans les sections (props image des heros split, covers CaseCardGrid, textures en fond) est différé à la vague visuelle/recomposition (en cours sur la home) pour éviter les collisions. Chaque usage devra servir le contenu (pas de décoratif gratuit, directive Simon).
