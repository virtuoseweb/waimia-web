# SR-2026-06-11-34 · Images : wiring 13/16 webp (covers cas, besoins, thèmes)

> Worker Fable 5 (worktree imgwire, branche `feat/images-wiring` `a7caf32`, mergée `3c7fd3d`, push idem). Contre-vérifié orchestrateur.
> **GF-1 PROD (01:49)** : /cas/plateau live, cover chargée au computed (naturalWidth 1536, opacity 1), h1 opacity 1.

Principe appliqué : chaque image sert le contenu (directive Simon), zéro décoratif gratuit.

- **4 covers cas** : media-block en tête des `sections:` des 4 MDX + `heroImage` frontmatter (alimente le JSON-LD Article) + cover plateau sur la card featured du hub /cas fr+en.
- **3 besoins** : sur les offres piliers de chaque besoin (growth-system-ia = acquérir, growth-intelligence = piloter, productivite-operationnelle-ia = opérer). Masthead /solutions : aucun slot image, veto Simon respecté, rien rempli.
- **5/6 thèmes** : media-block variante `inset` (nouveau champ optionnel, défaut inchangé, max-width `--wrap-prose`) sur les 5 solutions correspondantes.
- **Non câblées documentées** : theme-industrie (template secteurs legacy sans slot image : à câbler après migration du template), 3 textures (fonds pilotés tokens : tâche DS dédiée si souhaitée).
- Bonus : demo catalogue media-block réparée (404 `/og/default.png` préexistant).

Preuves : 13 assertions `naturalWidth>0` + opacity 1 (port dédié 4332, marqueur dist vérifié), gates verts, 15 screenshots `docs/visual-audit/images-wiring/`. **Défaut détecté au GF-1 prod : `alt` vide sur le media-block du cas plateau** (l'alt du manifest est sur la card hub, pas sur le bloc en tête de cas) : micro-fix au backlog.
