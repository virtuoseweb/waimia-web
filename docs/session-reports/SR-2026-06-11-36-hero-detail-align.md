# SR-2026-06-11-36 · Hero détail solutions/secteurs : image centrée + CTA/meta alignés

> Demande Simon (screenshot /solutions/acquisition-ia, 10:07) : image de droite centrée entre le h1 et le paragraphe, bouton sous l'image aligné avec la meta. Worker Opus (worktree heroalign, branche `feat/hero-detail-align` `cf227bd`, mergée `14a985b`, push idem). Contre-vérifié orchestrateur : main intact, scope 1 fichier, screenshot après inspecté.

## Livré (CSS only, `HeroOfferDetail.astro`, +12/-5)

- `.hero-detail__art` passe en `flex: 1 1 auto` : l'illustration occupe l'espace vertical de la colonne droite et se centre optiquement au niveau du lead/tags (avant : flottait en bas, centre à -46px).
- `.hero-detail__actions` passe de colonne empilée à **ligne baseline** : bouton à gauche, meta poussée à droite (`margin-inline-start: auto`), wrap propre si meta longue. Delta bouton/meta : -44px → 0.
- Mobile ≤ 880px : art pleine largeur, actions en ligne ; dark `ink` orthogonal (overrides couleur uniquement) ; `hero-tech-layer` non touché ; variants showcase/encadre sans consumer prod (grep dist), non régressés.

## Preuves

- Worker : astro check 0 errors, build Complete!, gates no-emdash/token-purity/touchpoints PASS, 6 screenshots avant/après (`docs/visual-audit/hero-align/`), consumers vérifiés (acquisition-ia, secteur finance-compta, 2 offres, mobile 390, previews).
- **GF-1 PROD (10:34, push `14a985b`)** : computed sur waimia.com/solutions/acquisition-ia : `artFlex = 1 1 auto`, `btnMetaDelta = -1px` (même ligne), `artVsSubDelta = -40px` (centré au niveau du paragraphe), h1 et sumie opacity 1 ; screenshot `prod-acquisition-14a985b.jpeg` conforme à la demande.
