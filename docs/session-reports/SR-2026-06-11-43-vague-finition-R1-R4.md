# SR-2026-06-11-43 · Vague finition punch-list it.2 (R1-R4) + liens morts

> Issue de la critique visuelle itération 2 (`PUNCHLIST2`, site évalué ~4/5, C1-C5 tous adressés). 5 workers Opus parallèles, worktrees disjoints, base 989ce3a, mergés `ad4af90` (0 conflit), poussés, GF-1 prod PASS.

## R1 (HAUT) · 12 solutions différenciées et approfondies

- **R1a, 5 Piloter** (604 insertions) : compositions distinctes 9-10 sections (comparison-duo, metric-shift, branded-callout, stats-bento, feature-split-media selon l'angle), 33 intertitres à 0 doublon, les 4 libellés clonés disparus. Halcyon recadré sur son narratif réel (120 h, −57 %, 3/3) au lieu d'une fiction préexistante.
- **R1b, 7 Acquérir/Opérer** (786 insertions) : 7 signatures propres (cascade éditoriale, data avant/après, architecture tunnel, journée de l'agent, frontière auto/humain, souveraineté juridique, multi-agents), 41 intertitres uniques. Cas réels sur pages reliées, anonymisés sur RH/légal/agents-métiers.
- « Claude Opus 4.7 » → « 4.8 » dans les 12 fichiers (0 restant).
- Résiduel assumé : « Outils déployés » (titre du bloc stack) partagé par 15 MDX dont les étalons = convention site-wide, conservé sciemment ; à juger en critique it.3.

## R2 · Composition distincte par secteur

`SolutionsDetailTemplate` : 2 props optionnelles (`recompoOrder`, `recompoAfterStack`, fallback `LEGACY_ORDER`) ; ordre par secteur dans `SectorRecipe`. Finance ouvre impact ink · services-b2b ouvre diagnostic (impact après stack) · industrie ouvre feature, séquence resserrée. Non-régression solutions legacy prouvée (séquence inchangée + seul consommateur live = page secteurs).

## R3+R4 · Hero qui respire + cookie discret

- Cause-racine R3 : `.hero-detail` forçait `min-height: 100svh` + centrage flex → vide variable sous le contenu. Remplacé par padding tokens (clamp space-9/11). Gap homogène mesuré 96px sur secteurs et solutions, hero hugge son contenu (27 pages impactées, home intouchée par construction).
- R4 : CookiesBanner 67px, z-index 80 (sous menu mobile), paper-2, pilules mono, Refuser = Accepter ; mécanisme de consentement intact.

## Liens morts (dette SR-42)

Cause-racine i18n : ds-studio + hero-lab ajoutés à `FR_ONLY_STATIC` → toggle désactivé (convention des ~35 autres FR-only ; audit exhaustif : exactement 2 pages affectées). Route fantôme `/offres/site-web-ia-tunnel` → `/offres/site-web-ia/tunnel/1` (3 occurrences, grep dist = 0).

## Preuves d'intégration (orchestrateur, rule 09)

- astro check `- 0 errors` + build `Complete!` POST-merge (état combiné) · **7 gates PASS** (no-emdash, token-purity, section-rhythm, content-refs, touchpoints, usage-manifest, form-endpoints).
- GF-1 local 17 pages (serve-dist 4418, scroll lent 450px/260ms) : h1 opacity 1 + transform neutre partout, 0 reveal caché, intertitres croisés 12 solutions = 0 doublon (hors convention stack), screenshots fullpage.
- Push `f1c8580..ad4af90` (incluait SR-42 + addendum). Poll marqueur « cinq minutes lues » vérifié 0 sur prod avant usage (leçon SR-42).
- **GF-1 PROD PASS** (9 sondes waimia.com) : 200 partout, h1 1, 0 reveal caché, heroGap 96px homogène (agent-analytique 0 = padding propre de sa 1ʳᵉ section, screenshot vérifié), cookie 67px z-80, 0 lien EN mort, tunnel/1 200, route morte 0. Screenshots prod above-fold.

## Queue

- Arbitrage éditorial : cas Caserne porté avec un narratif dashboard/données préexistant dans 2 pages Piloter alors que le cas réel = audit de flux industriels (vrai cas Piloter à produire ou anonymiser).
- R5 éditorial : /ressources mince en articles réels.
- R4 résiduel éventuel : opportunité d'un refus persistant plus fin (hors scope CSS).
