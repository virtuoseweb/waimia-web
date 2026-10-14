---
name: prouver-une-page
description: Prouver le rendu réel d'une page waimia-web sur le build servi : Playwright mobile puis bureau, reveal, styles calculés, CTA, JSON-LD, Lighthouse.
---

# Prouver une page

Build, Lighthouse et HTTP 200 ne prouvent pas un parcours. Servir le build, jamais le dev.

## Procédure

1. Build fait (skill `integrer-un-lot`), puis servir : `node scripts/serve-dist.mjs --root dist/client --port <p>` en fond. Un port par session.
2. UN SEUL navigateur à la fois (RAM 24 Go). Captures hors dépôt (scratchpad), jamais à la racine.
3. Mobile 390×844 d'abord, puis bureau 1440×900. Naviguer, scroller toute la page, attendre la fin des animations `.reveal` avant de mesurer.
4. Styles calculés (`getComputedStyle`) : `opacity` et `transform` du H1 et du CTA principal ; `opacity` ≠ 0 et transform neutre.
5. Hero : bas des CTA (`getBoundingClientRect().bottom`) ≤ 844 px à 390×844 ; un seul lede.
6. Capture au-dessus de la ligne de flottaison, puis jugement écrit : hiérarchie, équilibre, débordements (`scrollWidth` ≤ largeur).
7. SEO rendu : compter les `"@type"` dans le HTML (`FaqAccordion` et `Breadcrumb` émettent déjà le leur), title, description, canonical, un seul H1.
8. Console sans erreur ; réseau sans 404 sur les ressources de la page.
9. Lighthouse mobile, UNE page à la fois, après les mesures Playwright. Annoncer que la mesure locale n'est pas la prod.
10. Arrêter le serveur et le navigateur en fin de preuve.

## Pièges

- Bug visible seulement en prod : lire la donnée servie (HTML, env, `iframe.src` après hydratation) avant de toucher le code.
- Un écran de liste vide mesure l'état vide ; vérifier le contenu réel.
- Annoncer les abstentions (parcours non joués, viewport non mesuré).
