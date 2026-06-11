# SR-2026-06-11-46 · Fix bloquant it.5 : reveal mobile des essais + incident webhook Vercel

> Critique it.5 : 3,9/5 à cause d'un BLOQUANT mobile (corps des essais blog opacity:0 à 390px, pages blanches) alors que le desktop atteint 4,8/5 (manifeste pinné jugé « soumission Awwwards crédible »).

## Cause-racine (triangulée orchestrateur, confirmée worker)

`scroll-reveal.ts` : IntersectionObserver unique `threshold: 0.08` + `rootMargin -10 %`. Ratio d'intersection max d'un élément ≈ `0.9 × viewport / hauteur` → seuil inatteignable dès ~9 495px de haut en 390×844. Le corps d'essai `.essay-prose` (~11 000px) ne se révélait JAMAIS sur mobile ; desktop passait (corps ~6 700px). Le bug datait de la vague ressarticles : ses GF-1 étaient desktop only (leçon lessons.md : passe mobile 390 obligatoire sur contenu nouveau).

## Fix (niveau système, 1 fichier)

2 observers (standard 0.08 + tall threshold 0), routage `isTall` à l'observe + re-routage rAF au resize/orientation. Audit worker 421 routes : **22 routes condamnées** (11 essais FR + 11 EN via EssayTemplate), aucun autre template touché (reveals segmentés). Après fix : 0 reveal < 0.95 opacity mobile ET desktop, pas de déclenchement prématuré desktop, manifeste pinné + count-up non-régressés.

## Incident deploy capitalisé (2 leçons lessons.md)

1. Mon poll deploy sortait `exit 0` sur TIMEOUT → la notification a été lue comme succès → GF-1 prod exécuté sur l'ANCIENNE prod (faux `opacity:0`). Règle : poll `exit 1` sur timeout + lire la sortie avant d'enchaîner.
2. **Le webhook GitHub→Vercel n'a pas tiré** sur 2 pushes consécutifs (diagnostic MCP Vercel `list_deployments` : aucun build pour cbf19e8/f0a4f1b/cdc0249). Remède : commit vide + push → build reparti (`1e61599`).

## Coordination inter-sessions

La session parallèle a livré sur main pendant la vague : `cbf19e8` (hero-detail aligné, 21px d'asymétrie) + `cdc0249` (les 2 SVG 404 documentés dans mes findings de 11:45). Empilement propre, zéro conflit.

## Preuves (orchestrateur, rule 09)

- astro check `- 0 errors` + build `Complete!` + gates PASS post-merge.
- GF-1 local : prose opacity 0→1 mobile, screenshot mi-article dense.
- **GF-1 PROD PASS (deploy 1e61599 vérifié live par marqueur SVG 404→200)** : 2 articles mobile prose opacity 1 + 0 reveal caché + screenshot texte dense ; pin /agence présent ; hero secteur opacity 1 ; les 2 SVG 200.

## Découverte → tête de queue

Pré-existant sur TOUTES les pages essais : le corps MDX bilingue (FR + `---` + EN) est rendu EN ENTIER sur les 2 locales (l'anglais suit le français sur la page FR, vérifié aussi sur les anciens articles). Double la hauteur des pages (a aggravé ce bug reveal). Chantier suivant : split par locale dans la route/EssayTemplate.
