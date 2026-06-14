# Preserved assets : SEO « état final » (Wave 1)

Sauvegarde défensive des images/SVG liés aux contenus supprimés (spec `docs/strategy/02-site-etat-final.md`).
Consigne Simon : « récupérer et mettre de côté les images et svg de ce qui va être delete pour pas le perdre ».

## Constat important (méthode)
- Aucun contenu supprimé n'**importe** une image (`import x from '...svg|png'`) ni ne contient de `<svg>` inline notable :
  tous les visuels sont référencés par **chemin string vers `public/`** (servis par URL, ex. `/images/...`).
- Supprimer un `.mdx`/route ne supprime donc **jamais** le fichier `public/` correspondant.
- **Aucun asset original n'est supprimé** dans cette Wave (préservation prime, règle « en cas de doute on garde »).
  Les copies ci-dessous sont une sauvegarde redondante des visuels rattachés au contenu fictif/supprimé.

## Tableau asset préservé, origine, type

| Asset préservé (`_preserved-assets/seo-ef/`) | Origine repo (`public/`) | Rattaché à (contenu supprimé / fictif) | Type réf |
|---|---|---|---|
| `cas/cas-plateau.webp` | `public/images/cas/cas-plateau.webp` | case fictif « Plateau » (collection `cases`, §2H) | string (image-manifest.json) |
| `cas/cas-caserne.webp` | `public/images/cas/cas-caserne.webp` | case fictif « Caserne » (§2H) | string |
| `cas/cas-halcyon.webp` | `public/images/cas/cas-halcyon.webp` | case fictif « Halcyon » (§2H) | string |
| `cas/cas-northbound.webp` | `public/images/cas/cas-northbound.webp` | case fictif « Northbound » (§2H) | string |
| `cases/finance-close.svg` | `public/images/cases/finance-close.svg` | illustration case finance fictif (§2H) | string |
| `themes/theme-acquisition.webp` | `public/images/themes/theme-acquisition.webp` | solutions `acquisition-ia`/`agent-marketing-commercial` (§2C / enfants Acquérir) | frontmatter `src:` |
| `themes/theme-contenu-seo.webp` | `public/images/themes/theme-contenu-seo.webp` | solutions `contenu-seo-geo-ia`/`content-marketing-ia` | frontmatter `src:` |
| `themes/theme-finance.webp` | `public/images/themes/theme-finance.webp` | solution `finance` (§2C) | frontmatter `src:` |
| `themes/theme-productivite.webp` | `public/images/themes/theme-productivite.webp` | solutions `productivite-ia`/`agent-analytique` (§2C), AUSSI utilisé par `section-demos.ts` (survit) | frontmatter `src:` |
| `themes/theme-support-client.webp` | `public/images/themes/theme-support-client.webp` | solution `support-client-ia` (§2C) | frontmatter `src:` |
| `themes/theme-industrie.webp` | `public/images/themes/theme-industrie.webp` | secteurs (vidés), réf restante dans `secteurs/[...slug].astro` | string |
| `besoins/besoin-acquerir.webp` | `public/images/besoins/besoin-acquerir.webp` | offres, AUSSI utilisé par `growth-system-ia.mdx` (survit) | frontmatter `src:` |
| `besoins/besoin-piloter.webp` | `public/images/besoins/besoin-piloter.webp` | offres/solutions secondaires | frontmatter `src:` |
| `besoins/besoin-operer.webp` | `public/images/besoins/besoin-operer.webp` | offres/solutions secondaires | frontmatter `src:` |
| `media/portrait-camille-rousseau.svg` | `public/media/portrait-camille-rousseau.svg` | persona/testimonial fictif (demo) | string (`section-demos.ts`) |
| `media/feature-console.svg` | `public/media/feature-console.svg` | feature `/console` fantôme (§2D, demo) | string (`section-demos.ts`) |
| `logos-clients/client-atlas.svg` | `public/logos/client-atlas.svg` | client fictif (social proof demo) | string (`section-demos.ts`) |
| `logos-clients/client-lumen.svg` | `public/logos/client-lumen.svg` | client fictif (demo) | string |
| `logos-clients/client-kairo.svg` | `public/logos/client-kairo.svg` | client fictif (demo) | string |
| `logos-clients/client-vela.svg` | `public/logos/client-vela.svg` | client fictif (demo) | string |
| `logos-clients/client-nordis.svg` | `public/logos/client-nordis.svg` | client fictif (demo) | string |
| `logos-clients/client-orio.svg` | `public/logos/client-orio.svg` | client fictif (demo) | string |

## Note
`besoin-*` et plusieurs `theme-*` sont aussi consommés par du contenu **survivant** (pilier `growth-system-ia.mdx`, `section-demos.ts`) :
ils restent dans `public/` (non orphelins). Préservés ici par sécurité uniquement.
