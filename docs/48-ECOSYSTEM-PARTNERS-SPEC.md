# 48 — Écosystème partenaires : logos unifiés + méga-menu + hub technologies

> Tâche dédiée Simon (2026-06-11). Branche `feat/ecosystem-partners`. Source logos :
> `~/Downloads/logo a renommer avant ajouter et convertir si besoin/` + 4 SVG CDN Power Platform.

## 1. Décision DA/DS — rendu unifié (PROUVÉ empiriquement)

**Technique unique : CSS `mask-image` + `background: currentColor`.**
Chaque logo est un **masque alpha** ; la couleur vient du CSS (`currentColor`), donc :
- tous les logos rendent dans **une seule couleur uniforme** (exigence « tous de la même couleur ») ;
- **theme-aware** : `var(--muted)`/`var(--ink)` en clair, `var(--paper)` sur `[data-bg='ink']` ;
- décolore automatiquement les sources colorées (France Num, Meta, coins) — pas de retouche pixel par logo.

Preuve : `/tmp/qc2-light.png` (ink sur paper) + `/tmp/qc2-dark.png` (paper sur ink) — 16 logos uniformes, lisibles, cohérents.

### CSS de référence (à implémenter dans l'atome)
```css
.partner-logo{
  display:inline-block;
  width:var(--logo-w, auto); height:var(--logo-h, 28px);
  -webkit-mask:var(--logo) center/contain no-repeat;
          mask:var(--logo) center/contain no-repeat;
  background:currentColor;
  color:var(--muted);
  transition:color .2s ease, opacity .2s ease;
}
.partner-logo:hover{ color:var(--ink); }
[data-bg='ink'] .partner-logo{ color:var(--paper); }
[data-bg='ink'] .partner-logo:hover{ color:#fff; }
```
> `--logo` = `url(/logos/partners/partner-<slug>.png|svg)`. `mask-size:contain` gère tous ratios.
> Largeur intrinsèque variable → fixer `height` (≈26-30px marquee, ≈40px grille), `width:auto` via aspect.

## 2. Assets normalisés (déjà générés + commités) — `public/logos/partners/`

16 fichiers, masques alpha (PNG pour rasters, SVG `currentColor` pour vecteurs) :

| slug | source | type | note |
|---|---|---|---|
| aws | Accenture-aws-logo.webp | PNG | blanc→masque (aucun wordmark Accenture, juste renommé SEO) |
| google | Accenture-google-logo.webp | PNG | idem |
| microsoft | Accenture-microsoft-logo.webp | PNG | idem |
| salesforce | Accenture-salesforce-logo.webp | PNG | idem |
| sap | Accenture-SAP-logo-1.webp | PNG | idem |
| openai | openai-logo.webp | PNG | |
| hubspot | logo-hubspot.png | PNG | |
| claude | claude-logo-3.webp | PNG | astérisque + wordmark, masque uniformise |
| claude-mark | claude favicon.webp | PNG | astérisque seul (variante compacte) |
| meta-business | meta-business-partner-seeklogo.png | PNG | « ∞ Meta Business Partner » monochrome |
| france-num | …Activateur…jpg | PNG | white→transparent threshold ; badge « Activateur France Num » mono |
| github | github.svg | SVG | `currentColor` |
| power-bi | arcticons/microsoft-power-bi | SVG | glyphe mono (coins gradient CDN inexploitables = raster embarqué) |
| power-apps | arcticons/microsoft-power-apps | SVG | idem |
| power-automate | arcticons/microsoft-power-automate | SVG | idem |
| copilot | arcticons/microsoft-copilot | SVG | idem |

> Les 4 « coins » Power Platform du CDN Webflow sont des badges gradient + **raster embarqué** (glyphe non vectoriel) → masque = cercle plein inutilisable. Remplacés par les glyphes **arcticons** monochromes (même produit, line-style, `currentColor`) → unifiés avec le reste. Script de génération reproductible : `/tmp/gen-partner-assets.sh`.

## 3. Données — `src/data/partners.ts`

Array typé. Catégories pour grouper dans la grille hub + le méga-menu :
```ts
export type PartnerCategory = 'ai' | 'cloud' | 'data' | 'crm' | 'microsoft' | 'certification';
export interface Partner {
  slug: string;            // = nom de fichier asset (partner-<slug>.*)
  name: string;            // libellé affiché / alt
  asset: string;           // '/logos/partners/partner-<slug>.png|svg'
  category: PartnerCategory;
  href?: string;           // page interne /technologies/<x> SI elle existe, sinon URL officielle, sinon ancre hub. JAMAIS un 404.
  external?: boolean;      // true si href externe (target _blank rel noopener)
}
```
Mapping catégories : ai = claude, openai, copilot ; cloud = aws, google, microsoft ; data = power-bi, snowflake(existant) ; crm = salesforce, hubspot ; microsoft = power-apps, power-automate, power-bi, copilot ; certification = meta-business, france-num. (un partenaire peut apparaître 1× ; choisir la catégorie principale.)

## 4. Section cataloguée `ecosystem-partners` (4 touchpoints synchronisés)

Nouveau type composable (respecte la vision bibliothèque). Les 4 touchpoints OBLIGATOIRES (sinon build cassé) :
1. `src/schemas/sections.ts` — `z.object` `{ type:'ecosystem-partners', title?, subtitle?, partners:[{name,asset,href?,category?}], layout?: 'wall'|'grid'|'marquee', background? }` + ajout à l'union `SectionType` + `discriminatedUnion`.
2. `src/lib/section-demos.ts` — données bilingues fr/en (réutiliser quelques partners).
3. `src/lib/section-registry.ts` — import + entrée `SECTIONS`.
4. `src/components/sections/EcosystemPartners.astro` — rend une grille/mur de `.partner-logo` (atome `PartnerLogo.astro` ou inline), groupé par catégorie en `layout:'grid'`, défilant en `layout:'marquee'`. Variante dark via `background:'ink'` + `[data-bg='ink']` (idiome BentoGrid).
   - Atome : `src/components/ui/atoms/PartnerLogo.astro` (props `name, asset, href?, external?, h?`) → `<a|span class="partner-logo" style={`--logo:url(${asset});--logo-h:${h}`} aria-label={name}>`.

> Ne PAS oublier le manifest si présent (5ᵉ touchpoint évoqué CLAUDE.md). Vérifier `scripts/check-*.mjs` verts.

## 5. Méga-menu « Agence » — colonne « Écosystème partenaires »

`src/data/mega-menu.ts`, objet `AGENCE.columns` (~L446) : ajouter une 4ᵉ colonne
```
{ kicker:{fr:'ÉCOSYSTÈME',en:'ECOSYSTEM'}, title:{fr:'Partenaires technologiques',en:'Technology partners'},
  goal:{fr:'Stack éprouvée · partenaires certifiés',en:'Proven stack · certified partners'},
  links:[ → /technologies (hub) + 3-4 sous-pages techno clés ] }
```
Rendu par `src/components/header/Header.astro` (L101-168, mappe `columns`) — vérifier que `data-cols` gère 4 colonnes (CSS `global.css`). Option : afficher une mini-rangée de `.partner-logo` dans la colonne (logos masqués, hauteur ~18px).

## 6. Hub technologies `/technologies/index.astro`

Ajouter une section `EcosystemPartners` (layout grid, groupé par catégorie) qui **liste les partenaires en cartes/logos cliquables** → chaque carte mène à sa sous-page techno (`href`). Les partenaires sans sous-page dédiée pointent vers l'URL officielle (`external`) ou une ancre — **jamais de 404** (GF anti-lien-mort).

## 7. Sous-pages « type techno » (comme la logique Accenture)

- Existantes : `src/content/technologies/{claude-models,virtuoseos}.mdx` (composable `sections:`).
- Créer **1 exemplaire** « Microsoft Power Platform » (`src/content/technologies/microsoft-power-platform.mdx`) qui met en scène les 4 glyphes (copilot/power-apps/power-bi/power-automate) → prouve le pattern « page spécifique techno ».
- Les autres partenaires : carte hub → page si elle existe, sinon lien officiel. **Full set de sous-pages par partenaire = follow-up** (noté ici, hors scope v1 pour éviter 14 pages minces).

## 8. Preuve GF-1 (obligatoire avant « validé »)

Build prod-parity (`pnpm build` + `serve-dist`) puis Playwright + `getComputedStyle` sur :
- `/technologies` (section ecosystem-partners) : chaque `.partner-logo` → `backgroundColor` ≠ transparent, `maskImage` ≠ none, taille > 0, **0 logo invisible** (opacity≠0). Compter `.partner-logo` rendus = nombre attendu.
- Méga-menu Agence ouvert : colonne « Écosystème » visible.
- Page `/technologies/microsoft-power-platform` rend les 4 glyphes.
- Variante dark (`[data-bg='ink']`) : couleur = paper (logos clairs sur fond ink).
- `astro check` 0 errors + tous les `scripts/check-*.mjs` verts (catalogue synchronisé).
