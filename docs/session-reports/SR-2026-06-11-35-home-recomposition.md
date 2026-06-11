# SR-2026-06-11-35 · V-F2 : recomposition home (1 information = 1 représentation)

> Worker Fable 5 (worktree homerecomp, branche `feat/home-recomposition` `fd25577`, rattrapage main `f8df9fc`, mergée `d156eb5`, push idem). Contre-vérifié orchestrateur : scope exact (14 fichiers + 25 screenshots), gates relancés 8/8 PASS post-rattrapage, fullpage inspectée.

## 1. Livré (directive Simon : sections en actes incohérentes, décoratif répétant 3× la même info)

- **Séquence 12 110 → 10 376 px** (contenu ≈ 8 900 px) : FeatureGrid absorbé par ArchitectureDiagram (exemples → tooltips SVG + animation draw au scroll), UseCaseIndex absorbé par ServicesGrid (liens cas d'usage par cellule + foot_links), interludes 8 → 3.
- **Redondances éliminées (grep DOM build)** : « 12h » ×1 (était ×3), « 840 » ×1, « Cartographier » ×1 (taxonomie était ×5), dispo harmonisée hero = BookSession.
- **MaturityPyramid** : variant cards-only, 4 paliers = 4 portes d'entrée avec stage, prix réels TOUS sourcés (FAQ Q.01, productivite-operationnelle-ia.mdx:18, growth-system-ia.mdx, infrastructure-ia.mdx:18) + jauge 25→100 %.
- **QuoteSpotlight** : existait au catalogue (pas créé, upgradé : attribution mono, fond ink) ; testimonial plateau-saas-coo (chiffré + objection levée + cohérent avec le case 01 dessous). **BookSession** en ink. 2 blocs sombres = parole client + action (directive contraste).
- **Typo docs/41 appliquée hors hero** : couche `.home-typo` (masse en Instrument Sans medium, serif réservé aux fragments de relief, gras > italique). 18 `!important` assumés (scoping Astro par attributs bat toute couche page) : skin transitionnelle, généralisation DS = V-TYPO.
- Hero intouché : computed avant (prod) / après (local) strictement identiques ; mobile : CTA bottom 605 ≤ 844 via `order` minimap ≤ 900px.

## 2. Preuves

astro check 0 errors · build Complete! · gates 8/8 PASS (post-rattrapage main, contre-vérifiés orchestrateur) · 0 erreur console (2 404 préexistants corrigés : /en/secteurs, /ressources/cas) · reveals 17/17 · consumers catalogue intacts (preview/maturity-pyramid full, services-grid, quote-spotlight, architecture-diagram, faq) · 25 screenshots `docs/visual-audit/home/after-v1/` FR+EN+mobile.

## 3. Tradeoffs / restes

Contenu ~8 900 px vs cible 8 300 (l'écart porte des infos ajoutées : prix, CTA mid-page, liens cas d'usage ; compressible si souhaité). paper-3 remplacé par ink sur la quote (directive contraste prime sur le README d'audit). Couche `.home-typo` à généraliser dans le DS en V-TYPO. Bannière cookies visible sur les captures section (artefact).

> **Addendum GF-1 PROD (02:04)** : push `d156eb5`, live 02:02. Sondes waimia.com : « 12h » ×1 (était ×3), « DISPONIBLE » ×1, « Dès 1 500 » ×1 ; h1 opacity 1 transform neutre ; reveals 11/11 révélés après parcours complet ; section quote fond ink rgb(12,11,9) ; 0 erreur console ; screenshot above-fold `docs/visual-audit/home/after-v1/prod-above-fold-d156eb5.jpeg` (hero intact).
