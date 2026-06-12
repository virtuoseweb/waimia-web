# 38 : Pipeline d'images génératives (gpt-image-2) + architecture media

## Architecture media : repo-based, compatible Tina local ET TinaCloud

Le repo n'a pas de BDD ni de bucket externe. Les images vivent **dans le repo** :

- Fichiers : `public/images/<category>/<slug>.webp` (servis statiquement par Astro à `/images/...`).
- Format : **WebP qualité 82** (via sharp). Poids total lot 1 : **1 091 172 octets (1,04 Mo)** vs 35 857 293 octets PNG d'origine (-97,0 %).
- Références : strings `src` + `alt_fr`/`alt_en` en props de sections (`media-block`, `hero_image`) ou frontmatter MDX. Aucune couche d'indirection.
- TinaCMS : `tina/config.ts` déclare `media: { tina: { publicFolder: 'public', mediaRoot: 'images' } }`. En local, Tina lit/écrit le filesystem (`public/images`). En TinaCloud, le **même media store repo-based** opère via l'API GitHub : mêmes chemins `/images/...`, zéro bascule de configuration entre les deux environnements.

## Générer / régénérer

```bash
node scripts/generate-images.mjs              # génère les entrées dont le WebP manque (sortie .webp q82)
node scripts/generate-images.mjs --force      # régénère tout
node scripts/generate-images.mjs --only cas-plateau   # régénère un slug précis
node scripts/generate-images.mjs --png        # conserve le PNG brut (debug)
```

- Clé API : `OPENAI_API_KEY` (env) sinon parsée depuis `/Users/simonberos/waimia-web/.env.openai` (fichier local, ignoré par git, jamais commité).
- Endpoint : `POST https://api.openai.com/v1/images/generations`, modèle `gpt-image-2`, réponse `data[0].b64_json` décodée en PNG.
- Tailles valides : `1024x1024`, `1536x1024` (paysage), `1024x1536` (portrait). Qualité du lot 1 : `medium`.
- Retry x2 sur erreur réseau/5xx, délai 2 s entre appels, récapitulatif final (générées/skippées/échouées).

## Ajouter un brief au manifeste

Éditer `src/data/image-manifest.json` : objet `{ stylePrefix, images[] }`. Chaque entrée :

```json
{
  "slug": "theme-exemple",
  "category": "themes",
  "size": "1024x1024",
  "quality": "medium",
  "alt": { "fr": "...", "en": "..." },
  "prompt": "Subject: ... (uniquement la variation sujet, le style commun vient de stylePrefix)"
}
```

Le script concatène `stylePrefix + prompt`. Sortie : `public/images/<category>/<slug>.webp` (q82) — ou `.png` avec `--png`.

## Charte de prompt (DA print éditoriale)

Le `stylePrefix` verrouille la DA, ne pas le dupliquer dans les sujets :

- Fond parchemin `#f6f1e8`, linework encre noire, formes géométriques plates.
- **Un seul** élément accent terracotta `#c94f2e` (les textures peuvent n'en avoir aucun).
- Esthétique print constructiviste, grain papier subtil, large negative space.
- Interdits : dégradés, photo-réalisme, et surtout **tout texte, lettre, chiffre, mot ou logo**.
- Les sujets décrivent des métaphores géométriques (flux, nœuds, jauges, engrenages), jamais des scènes réalistes.

Contrôle qualité post-génération : `sips -g pixelWidth -g pixelHeight <webp>` + inspection visuelle (texte parasite, couleurs hors charte) ; régénérer avec prompt corrigé si besoin (`--only <slug>`). Les dimensions du fichier WebP sont identiques à celles du PNG source (vérifiées : `cas-plateau` 1536x1024, `theme-finance` 1024x1024).

## Inventaire lot 1 (16 images) et usage prévu

Le wiring (références dans MDX/props) viendra dans une vague ultérieure : cette colonne est la cible.

Conversion WebP q82 effectuée le 2026-06-10 : total PNG 35 857 293 octets, total WebP 1 091 172 octets (-97,0 %).

| Slug | Fichier | Dims | WebP (octets) | Usage prévu |
| --- | --- | --- | --- | --- |
| `besoin-acquerir` | `public/images/besoins/besoin-acquerir.webp` | 1536x1024 | 77 630 | Colonne « Acquérir » du mega-menu Solutions / futures pages besoin (media-block ou hero `right_block`) |
| `besoin-piloter` | `public/images/besoins/besoin-piloter.webp` | 1536x1024 | 104 102 | Colonne « Piloter » (pilotage, dashboards) : solutions finance / productivité |
| `besoin-operer` | `public/images/besoins/besoin-operer.webp` | 1536x1024 | 103 608 | Colonne « Opérer » : offres productivité opérationnelle / infrastructure IA |
| `cas-caserne` | `public/images/cas/cas-caserne.webp` | 1536x1024 | 76 380 | Cover du cas `caserne` (industrie 3 sites, goulots inter-sites) : card hub `/cas` + tête de cas |
| `cas-halcyon` | `public/images/cas/cas-halcyon.webp` | 1536x1024 | 96 562 | Cover du cas `halcyon` (conseil, production documentaire) |
| `cas-northbound` | `public/images/cas/cas-northbound.webp` | 1536x1024 | 64 368 | Cover du cas `northbound` (gestion d'actifs, clôture mensuelle) |
| `cas-plateau` | `public/images/cas/cas-plateau.webp` | 1536x1024 | 46 052 | Cover du cas `plateau` (SaaS B2B, pipeline RevOps récupéré), cas featured |
| `theme-acquisition` | `public/images/themes/theme-acquisition.webp` | 1024x1024 | 35 652 | Solution `acquisition-ia` (media-block, cards) |
| `theme-contenu-seo` | `public/images/themes/theme-contenu-seo.webp` | 1024x1024 | 75 578 | Solution `contenu-seo-geo-ia`, articles blog SEO |
| `theme-support-client` | `public/images/themes/theme-support-client.webp` | 1024x1024 | 48 388 | Solution `support-client-ia` |
| `theme-finance` | `public/images/themes/theme-finance.webp` | 1024x1024 | 43 678 | Solutions `finance` / `fintech`, contenus clôture et facturation |
| `theme-industrie` | `public/images/themes/theme-industrie.webp` | 1024x1024 | 51 076 | Secteur industrie, renvois vers le cas Caserne |
| `theme-productivite` | `public/images/themes/theme-productivite.webp` | 1024x1024 | 58 190 | Solution `productivite-ia`, offre `productivite-operationnelle-ia` |
| `texture-trame-01` | `public/images/textures/texture-trame-01.webp` | 1536x1024 | 126 138 | Fond de section discret (trame de points), bandes éditoriales |
| `texture-grille-02` | `public/images/textures/texture-grille-02.webp` | 1536x1024 | 25 548 | Fond de section discret (grille technique), blocs process |
| `texture-topo-03` | `public/images/textures/texture-topo-03.webp` | 1536x1024 | 58 222 | Fond de section discret (courbes topographiques), CTA bands |

## Sécurité

- `.env.openai` est dans `.gitignore` ; la clé n'apparaît ni dans le manifeste, ni dans les logs commités, ni dans cette doc.
- Le script lit la clé en mémoire uniquement (env ou parse du fichier local).
