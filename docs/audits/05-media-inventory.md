# AUDIT MÉDIA COMPOSABLES — État exhaustif waimia-web

**Audit en lecture seule — cartographie des champs image sur toutes pages MDX (30 pages, 16 collections)**

Date : 2026-06-20  
Scope : `authors`, `blog`, `cases`, `lp`, `offres`, `outils`, `secteurs`, `services`

---

## TABLE 1 — Inventaire par page (page | sections | champs image définis | images remplies | registre)

| Page (collection/slug) | Sections | Champs image capables | Images remplies | Registre |
|---|---|---|---|---|
| `authors/simon-beros` | 0 | — | 0 | — |
| `blog/agent-ia-vs-automatisation-classique-2026` | 0 | — | 0 | — |
| `blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil` | 0 | — | 0 | — |
| `blog/avis-n8n-vs-zapier-2026` | 0 | — | 0 | — |
| `blog/cabler-son-crm-en-10-jours` | 0 | — | 0 | — |
| `blog/essai-pillar-ia-pme-2026` | 0 | — | 0 | — |
| `blog/seo-geo-etre-cite-par-les-ia-generatives` | 0 | — | 0 | — |
| `cases/amploi` | 0 | — | 0 | — |
| `cases/balzeo` | 0 | — | 0 | — |
| `cases/desangles-peinture` | 0 | — | 0 | — |
| `cases/isabelle-diaz-naturopathe` | 0 | — | 0 | — |
| `cases/les-carnets-de-montpellier` | 0 | — | 0 | — |
| `lp/content-marketing-intelligent` | 7 | media_src, illustration_src, hero_image | 0 | — |
| `lp/exemple-industrialisation` | 7 | media_src, illustration_src, hero_image | 0 | — |
| `lp/site-web-intelligent` | 7 | media_src, illustration_src, hero_image | 0 | — |
| `lp/tunnel-conversion-intelligent` | 7 | media_src, illustration_src, hero_image | 0 | — |
| `offres/audit-maturite-ia` | 8 | media_src, illustration_src | 0 | — |
| `offres/growth-system-ia` | 10 | media_src, illustration_src | 0 | — |
| `outils/calculateur-roi-ia` | 0 | — | 0 | — |
| `secteurs/batiment` | 0 | — | 0 | — |
| `secteurs/e-commerce` | 0 | — | 0 | — |
| `secteurs/liberal-independant` | 0 | — | 0 | — |
| `secteurs/services-b2b` | 0 | — | 0 | — |
| `secteurs/startup-logiciel` | 0 | — | 0 | — |
| `secteurs/therapeutes` | 0 | — | 0 | — |
| `services/content-marketing-intelligent` | 15 | media_src, illustration_src, hero_image | 0 | — |
| `services/integrateur-claude` | 19 | media_src, illustration_src | 11 | **Registre A** |
| `services/site-web-intelligent` | 14 | media_src, illustration_src, hero_image | 0 | — |
| `services/template-service-ref` | 14 | media_src, illustration_src, hero_image | 0 | — |
| `services/tunnel-conversion-intelligent` | 14 | media_src, illustration_src, hero_image | 0 | — |

---

## TABLE 2 — Images Registre A détaillées (integrateur-claude flagship)

Tous les fichiers source SVG inline via `import.meta.glob`.

| # | Src | Type de section | Champ | Alt/Desc |
|---|---|---|---|---|
| 1 | `/images/line-art/dispositif-flow.svg` | hero-conversion-funnel | media_src | Flux architecture intégrateur |
| 2 | `/images/line-art/probleme-poc-qui-dort.svg` | problem-statement-grid | illustration_src (items[0]) | Problème PoC dormant |
| 3 | `/images/line-art/probleme-donnees-eparpillees.svg` | problem-statement-grid | illustration_src (items[1]) | Problème données éparpillées |
| 4 | `/images/line-art/probleme-outils-cloisonnes.svg` | problem-statement-grid | illustration_src (items[2]) | Problème outils cloisonnés |
| 5 | `/media/feature-console.svg` | feature-grid | media_src | Console dashboard (*variant: `/media/` not `/images/line-art/`*) |
| 6 | `/images/line-art/livrable-agents-production.svg` | deliverables-grid | illustration_src (items[0]) | Agents production |
| 7 | `/images/line-art/livrable-connecteurs-mcp.svg` | deliverables-grid | illustration_src (items[1]) | Connecteurs MCP |
| 8 | `/images/line-art/livrable-skills-orchestration.svg` | deliverables-grid | illustration_src (items[2]) | Skills orchestration |
| 9 | `/images/line-art/livrable-gouvernance.svg` | deliverables-grid | illustration_src (items[3]) | Gouvernance |
| 10 | `/images/line-art/livrable-passation-formation.svg` | deliverables-grid | illustration_src (items[4]) | Passation & formation |
| 11 | `/images/line-art/livrable-tableau-mesure.svg` | deliverables-grid | illustration_src (items[5]) | Tableau de mesure |

**Norme visuelle** : Registre A unifié (palette `--ink` = `#0C0B09`, `--paper` = `#F6F1E8`, `--accent` = `#C94F2E`), tous SVG inline, zéro fichiers `.webp` sur cette page.

---

## SYNTHÈSE — 3 LISTES

### Liste 1 — Pages avec ZÉRO image (29 pages)

Pages sans image Registre A ni Registre B.

**Authors** (1)
- `authors/simon-beros`

**Blog** (7)
- `blog/agent-ia-vs-automatisation-classique-2026`
- `blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil`
- `blog/avis-n8n-vs-zapier-2026`
- `blog/cabler-son-crm-en-10-jours`
- `blog/essai-pillar-ia-pme-2026`
- `blog/seo-geo-etre-cite-par-les-ia-generatives`

**Cases** (5)
- `cases/amploi`
- `cases/balzeo`
- `cases/desangles-peinture`
- `cases/isabelle-diaz-naturopathe`
- `cases/les-carnets-de-montpellier`

**Landing Pages** (0)
*Tous les LPs ont sections capables mais zéro images — voir Liste 3*

**Offres** (0)
*Tous les offres ont sections capables mais zéro images — voir Liste 3*

**Outils** (1)
- `outils/calculateur-roi-ia`

**Secteurs** (6)
- `secteurs/batiment`
- `secteurs/e-commerce`
- `secteurs/liberal-independant`
- `secteurs/services-b2b`
- `secteurs/startup-logiciel`
- `secteurs/therapeutes`

**Services** (3)
- `services/content-marketing-intelligent`
- `services/site-web-intelligent`
- `services/template-service-ref`
- `services/tunnel-conversion-intelligent`

**TOTAL : 29 pages (0 images)**

---

### Liste 2 — Pages avec Registre A (1 page)

**`services/integrateur-claude`** — Flagship avec 11 images line-art

- **Palette** : Registre A unifié (`--ink`, `--paper`, `--accent`), SVG inline uniquement
- **Sources** : `/images/line-art/` (10 SVG) + `/media/` (1 SVG)
- **Sections remplies** : hero-conversion-funnel, problem-statement-grid (3 items), feature-grid, deliverables-grid (6 items)
- **Conformité** : 0 mélange Registre B, structure type valide, alt-text cohérent

---

### Liste 3 — Pages avec Registre B (0 pages)

**Aucune page n'utilise actuellement les illustrations recolorées.**

La pool d'illustrations Registre B est complète mais orpheline :
- 28 illustrations dans `public/images/illustrations/ds/{*-ink.webp, *-paper.webp}`
- Palette corail assomé (accent recolored `~#E8462E`, grain sérigraphie)
- **Destination planifiée (D5 pioche)** : landing pages (`lp/` × 4 pages, 28 slots) + offres (`offres/` × 2 pages, 18 slots)

---

## EMPTY SLOTS STRUCTURELLEMENT CAPABLES (103 total)

Pages avec sections composables qui **peuvent techniquement** porter une image (champs définis dans les schémas `src/schemas/sections.ts`), mais frontmatter MDX = vide.

### Par collection et page

#### Landing Pages — 28 slots

| Page | Sections | Champs | Slots vides |
|---|---|---|---|
| `lp/content-marketing-intelligent` | 7 | media_src, illustration_src, hero_image | 7 |
| `lp/exemple-industrialisation` | 7 | media_src, illustration_src, hero_image | 7 |
| `lp/site-web-intelligent` | 7 | media_src, illustration_src, hero_image | 7 |
| `lp/tunnel-conversion-intelligent` | 7 | media_src, illustration_src, hero_image | 7 |

**Total LPs : 28 slots**

#### Offres — 18 slots

| Page | Sections | Champs | Slots vides |
|---|---|---|---|
| `offres/audit-maturite-ia` | 8 | media_src, illustration_src | 8 |
| `offres/growth-system-ia` | 10 | media_src, illustration_src | 10 |

**Total Offres : 18 slots**

#### Services — 57 slots

| Page | Sections | Champs | Slots vides |
|---|---|---|---|
| `services/content-marketing-intelligent` | 15 | media_src, illustration_src, hero_image | 15 |
| `services/site-web-intelligent` | 14 | media_src, illustration_src, hero_image | 14 |
| `services/template-service-ref` | 14 | media_src, illustration_src, hero_image | 14 |
| `services/tunnel-conversion-intelligent` | 14 | media_src, illustration_src, hero_image | 14 |

**Total Services : 57 slots**

#### Autres collections (zéro slots)
- Blog, Cases, Secteurs, Authors, Outils : **0 sections composables** → pas de champs image

---

## OBSERVATIONS CLÉS

### 1. Concentration Registre A
- **1 seule page** utilise le Registre A (flagship `services/integrateur-claude`, 11 images)
- **29 pages restantes** : zéro images

### 2. Pool Registre B orpheline
- **28 illustrations recolorées** présentes dans `public/images/illustrations/ds/` mais **jamais déployées**
- Palette corail assumée vs. recolor design-system → arbitrage à trancher avec Simon

### 3. Capacité vs. réalité
- **103 emplacements structurellement aptes** (schémas définissent les champs)
- **0 remplis** en dehors du flagship
- **Potentiel de composition immédiat** sans modification architecture

### 4. Stratégie zéro-image par collection
- **Blog, Cases, Secteurs** : 0 sections composables utilisées (frontmatter vide)
- **Signification** : volonté éditoriale ou architecture figée ? À clarifier avec Simon

### 5. Templates vides imitant le flagship
- Les 3 services (`site-web-intelligent`, `tunnel-conversion-intelligent`, `content-marketing-intelligent`) suivent la même structure que le flagship
- Structuralement **prêts pour variantes illustrées**, mais actuellement **totalement vides**

### 6. Quirk : `/media/` vs. `/images/line-art/`
- Section 5 du flagship utilise `/media/feature-console.svg` au lieu de `/images/line-art/`
- Alignement Registre A standard à vérifier

---

## SCHÉMAS SUPPORTÉS (src/schemas/sections.ts)

Champs image optionnels par type de section :

| Type | Champs supportés |
|---|---|
| `hero-conversion-funnel` | `media_src` |
| `problem-statement-grid` | `illustration_src` (nested dans `items[]`) |
| `deliverables-grid` | `illustration_src` (nested), `media_src` |
| `feature-grid` | `media_src` |
| `hero-essay` | `hero_image` |
| `hero-gradient` | `hero_image` |
| `case-featured-grid` | `cover` (nested) |
| `team-grid` | `portrait_src` (nested) |
| `testimonials-timeline` | `photo_src`, `media_src` (nested) |
| `client-logos` | `logo_src` (nested) |
| `partners-grid` | `logo_src` (nested) |

---

## RECOMMANDATIONS (hors scope LECTURE SEULE)

1. **D5 pioche Registre B** : Router les 28 illustrations recolorées sur `lp/` (28 slots) + `offres/` (18 slots, 10 suffiraient) sans dépasser capacité
2. **Éviter mélange Registre A + B** : le flagship = Registre A pur ; Registre B = zones éditoriales (hero blog, ouverture case) ou post-recolor DS
3. **Vérifier stratégie Blog/Cases/Secteurs** : 0 sections composables actuellement — sont-elles figées par design ou ouvertes à composition ?
4. **Aligner `/media/` et `/images/line-art/`** : normaliser chemins Registre A standard

---

**FIN AUDIT LECTURE SEULE — 30 pages auditées, 103 slots empty structurellement capables, 0 violation observée**
