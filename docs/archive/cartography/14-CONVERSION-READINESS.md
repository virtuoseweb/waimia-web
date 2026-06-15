# 14 — CONVERSION-READINESS : home (9 organismes) → data-driven

> Prérequis de la conversion data-driven de `src/pages/index.astro` (+ en/). Verdict de fidélité organism↔jumeau catalogué, source-vérifié (agent 2026-06-04). Décide AVANT de convertir : un jumeau DÉRIVÉ converti = rendu de la home modifié.
> Règle : ne convertir un organism vers son jumeau que si **FIDÈLE** (byte-équivalent) OU après alignement/arbitrage explicite.

## Verdict par paire

| # | organism | jumeau (type-id) | verdict | action |
|---|---|---|---|---|
| 1 | Hero | HeroHome (`hero-home`) | **FIDÈLE** | Convertible. ⚠️ porter `transition:name` (VT inter-pages) absent du jumeau. |
| 3 | SixServices | ServicesGrid (`services-grid`) | **FIDÈLE** | Convertible (grille 3×2 byte-identique). |
| 6 | Cases | CaseCardGrid (`case-card-grid`) | **FIDÈLE** | Convertible (table 6-col byte-identique). |
| 2 | SystemArchitecture | ArchitectureDiagram (`architecture-diagram`) | **DÉRIVÉ léger** | SVG recentré (+6/+11px). Décision : figer la math sur l'organism, ou accepter le shift. |
| 4 | Pyramid | MaturityPyramid (`maturity-pyramid`) | **DÉRIVÉ moyen** | Header `SectionHeader`→inliné, bullet `§`→`·`, métriques. Aligner le jumeau ou accepter le restyle. |
| 5 | Departments | UseCaseIndex (`use-case-index`) | **DÉRIVÉ moyen** | Header divergent + colonne num 70→110px. Idem. |
| 7 | FieldNotes | EditorialPreview (`editorial-preview`) | **DÉRIVÉ moyen** | Header sans roman/aside, gaps/hover/breakpoint divergents. Idem. |
| 8 | BookSession | CtaFinal (`cta-final`) | **DÉRIVÉ fort** | **Mauvais composant cible** : jumeau = CTA générique gauche ; organism = climax centré (dispo + radius-morph). **Arbitrage Simon** : créer/garder un type CTA-climax dédié, ou restyler. |
| 9 | FooterMarquee | MarqueeBand (`marquee-band`) | **DÉRIVÉ fort** | Jumeau = marquee de landing (`.lp-marquee`), pas le footer. Bordure/couleur/vitesse divergentes. **Arbitrage Simon**. |

## Synthèse
- **3 FIDÈLES** (convertibles sûrs, sous réserve de fournir les données exactes via `sections:`) : hero-home, services-grid, case-card-grid.
- **1 DÉRIVÉ léger** (ArchitectureDiagram) : quasi-sûr après micro-décision SVG.
- **3 DÉRIVÉS moyens** (Pyramid/Departments/FieldNotes) : header + layout divergent → aligner le jumeau sur l'organism, OU accepter le restyle de la home.
- **2 DÉRIVÉS forts** (BookSession/FooterMarquee) : le jumeau n'est PAS le bon composant → décision Simon (ne pas convertir tel quel).
- **0 sans jumeau** : tous ont un type-id + schéma Zod.

## Recommandation de séquencement (anti-hybride mais sans casse)
1. **Décision Simon** : pour les 6 dérivés, choisir par paire « aligner le jumeau sur l'organism » (→ conversion byte-identique ensuite) vs « accepter le restyle » vs « garder bespoke / créer le bon type » (cas 8/9).
2. Une fois les jumeaux alignés, convertir la home **en une fois** (éviter une home moitié data-driven / moitié organism = hybride local pire).
3. Chaque conversion home = GF-1 STRICT above-fold + chaque section (opacity≠0, ordre préservé, 0 erreur, VT pour hero-home).

## Données requises par jumeau (à fournir via frontmatter `sections:`)
- hero-home : `h1`, `lede`, `minimap[6]{label,items}`, `proofs[3]{num,label}`, 3 CTA + `cta_sub`.
- services-grid : `fig/h2`, `connectors_label`, `services[6]{fig,metric,label,body,connectors}`.
- case-card-grid : `fig/h2`, labels, `cases[]{client,sector,stack,impact,duration,href}`, `all_href/label`.
- (autres : cf schéma `src/schemas/sections.ts` par type-id.)

> Tant que ces décisions ne sont pas prises, la home reste en organismes bespoke (état actuel, fonctionnel). La conversion est PRÊTE à exécuter dès arbitrage, pas bloquée techniquement.
