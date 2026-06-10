# SR-2026-06-10-24 · Refonte R2-P2 : éditorial premium des 3 pages secteurs

> **Addendum GF-1 PROD (21:57)** : live sur waimia.com/secteurs/finance-compta : h1 opacity 1 transform neutre, faqMarker present, faqItems 7, caseResults 3, premier wf-row present, CTA visible, 0 erreur console.

> Worker **Fable 5** (worktree `.worktrees/r2secteurs`), branche **`feat/refonte-r2p2-secteurs`** commit `0b06ffd` (4 fichiers, +79/-48). Contre-vérifié orchestrateur (rule 09) : scope diff conforme, gates relancés, screenshots inspectés.

## 1. Problème (identique sur les 3 pages secteurs)

La route dumpait `<Content/>` entier dans le slot `workflows` : en-têtes de table suivis de 3 essais h2 avant les vraies lignes ; la section Case Study Split rendait à moitié vide (caseRef ignoré) ; **les 7 Q/A de FAQ présentes dans le frontmatter n'étaient jamais rendues** (slot `faq` jamais câblé) ; h1 = titre SEO long.

## 2. Résultat (0 invention, redistribution traçable du contenu existant)

Hero (h1 court, le titre long reste dans `<title>` SEO) → Pain points → **table workflows cohérente** (6 lignes sous leur header) → éditorial structuré (3 h2-questions GEO < 90 mots + pull-quote attribuée) → ROI band → **Case Study split rempli** (cas lié réel + 3 métriques via `caseRef`) → **FAQ éditoriale 7 Q/A** (layout 2 colonnes) → Stack → CTA.

Fichiers : `src/pages/secteurs/[...slug].astro` (+41/-5, slots faq + case câblés) · 3 MDX secteurs (réordonnancement). **Aucun composant, schéma ou style touché.**

## 3. Preuves GF-1

- `astro check` 0 errors (380 fichiers) · build `Complete!` · `check-no-emdash` PASS · `check-touchpoints` PASS (106 types).
- 9 screenshots 1440×900 (`/tmp/wmission/r2secteurs/`) + computed sur les 3 pages : h1 opacity 1 transform neutre, premier enfant du body workflows = `wf-row` ×3, faqItems 7×3, caseResults 3×3, plus long bloc prose 87 mots.
- Orchestrateur : screenshots above-fold + FAQ inspectés visuellement (hero net, FAQ structurée dans la DA).
- Seul 404 console = prefetch `/ressources/cas` (lien hardcodé pré-existant du template, redirect Vercel en prod, pas une régression).

## 4. Restes signalés (hors propriété du worker, arbitrés orchestrateur)

1. Schéma secteurs sans `sections:` (voie full-composable impossible sans champ) → **R6/R7b**.
2. Section Stack = `defaultToolRows` génériques sur les 3 secteurs → champ `stack` sectoriel candidat **R7b**.
3. CTA case split hardcodé `/ressources/cas` dans le template (1 ligne) → **vague visuelle**.
4. Pas de routes `/en/secteurs` alors que les champs `*_en` existent → décision d'architecture à arbitrer avec Simon (hub EN + nav inexistants aussi) : **backlog, pas de décision unilatérale**.
