---
name: waimia-illustration
description: Génère une illustration Waimia (affiche éditoriale années 60, sérigraphie/riso) DIRECTEMENT dans la palette finale du site — duotone terracotta/crème ou tritone avec le bleu #75B0D7 — avec des distributions de couleurs variées (le bleu en fond, en sol ou en simple touche), en variantes paper + ink, via GPT (moteur A) ou dessinée en SVG par Claude lui-même quand GPT est indisponible (moteur B), vérifie la palette, l'ajoute à la bibliothèque src/data/illustrations.json et l'utilise pour remplacer une image générique ou un placeholder. À utiliser quand Simon demande « génère une illustration », « remplace cette image », « il manque un visuel », ou qu'une section affiche une image hors-sujet / répétée.
---

# Skill · Illustrations Waimia

Le rendu visé est **le visuel final du site**, pas une image couleur à filtrer ensuite :
le moteur génère directement en duotone ou tritone. Le filtre `duotone.mjs` n'est qu'un
secours manuel (jamais l'étape par défaut).

**Deux moteurs, une même DA** (mêmes palettes, mêmes distributions, même contrôle) :
- **Moteur A · GPT** (`generate.mjs`) : rendu peint/gravé le plus proche des 28 originaux.
  Nécessite une clé OpenAI (§0).
- **Moteur B · Claude dessine** (`render-svg.mjs`) : Claude écrit le SVG lui-même, rendu
  affiche sérigraphiée vectorielle + grain. Toujours disponible, aucune clé, déterministe,
  éditable. À utiliser quand GPT est indisponible, ou par choix pour les métaphores
  géométriques (phare, standard, pile, flux). §3 bis.

**Varier les couleurs, garder la DA** : chaque illustration choisit une *distribution*
(§2 bis) selon le message de sa section. N'importe quelle couleur peut être le fond, le sol,
la grande forme, le sujet ou un détail ; le bleu peut être tout le ciel ou une seule touche.
Un même dessin peut être enregistré en plusieurs distributions (champ `drawing`) : plus de
diversité affichée, sans jamais deux variantes du même dessin dans une section.

## 0. Prérequis (mission locale)

Ce skill appelle l'API Images d'OpenAI. Il tourne là où Claude a accès à GPT :
- **Clé** : `OPENAI_API_KEY` dans l'environnement, ou `.env.openai` à la racine
  (`OPENAI_API_KEY=...`, gitignoré). Ne jamais afficher ni commiter la clé.
- **Modèle** : `OPENAI_IMAGE_MODEL` (défaut `gpt-image-2`, comme `scripts/generate-images.mjs`).
- **Codex CLI** (variante) : si la clé n'est disponible que dans Codex, déléguer l'appel :
  `codex exec "Run: node scripts/illustrations/generate.mjs <slug> '<subject>' --palette duotone"`
  depuis la racine du repo ; Codex exécute le même script avec sa propre clé. Le reste du
  skill (contrôle, registre, câblage) est fait par Claude.
- Dépendances : `npx -y pnpm@9.15.0 install` (sharp vient d'astro).
- En cloud (claude.ai/code) : `api.openai.com` est bloqué par défaut. Il faut l'autoriser
  dans *Network access* de l'environnement et ajouter `OPENAI_API_KEY` en variable d'env.

## 1. Le style (rétro-ingénierie des 28 illustrations existantes)

**Lire d'abord `references/style-observations.md`** : grammaire commune (technique,
composition, personnages, ton, interdits) + les 28 illustrations analysées et 5 types de composition (ce qu'elles
montrent, comment elles sont faites, ce qui s'en dégage, prompt inverse). `computer-health`
est la référence du tritone (son ciel `#76B2D9` est l'origine du bleu `#75B0D7`).

Source unique : `scripts/illustrations/style.json` (lu par les scripts, ne pas dupliquer).
- **Dessin** : illustration éditoriale de magazine années 60, sérigraphie/risographie,
  aplats nets, grain papier fin, légère trame, repérage imparfait. Une métaphore visuelle
  forte, un peu surréaliste, sans mots. Petites silhouettes en tenue de bureau sobre années
  60, souvent de dos ou au loin, face à une grande forme simple (échelle). Panoramique 7:3,
  sujet dans la bande centrale, beaucoup d'espace vide, un seul point focal.
- **Palettes finales** (mesurées sur les variantes du site, LUT dans `duotone-lut.json`) :
  | palette | couleurs | usage |
  |---|---|---|
  | `duotone-paper` | terracotta `#C85130` → crème `#F7F0E7` (+ teintes intermédiaires) | fond paper / paper-2 / paper-3 |
  | `duotone-ink` | brun encre `#100B08` → terracotta `#BA5032` → crème `#F8EFE5` | fond ink, blocs inversés |
  | `tritone-paper` | duotone-paper + bleu `#75B0D7` en aplats sur 6–75 % de l'image (référence : le ciel de computer-health) | fond clair avec un point froid |
  | `tritone-ink` | duotone-ink + bleu `#75B0D7` | fond sombre avec un point froid |
- Le bleu `#75B0D7` est une couleur d'**illustration**, pas un token CSS : ne pas l'ajouter
  à `packages/ds-tokens` (régime DS : 0 nouvelle variable).
- Choisir tritone quand le sujet a un élément naturellement froid (ciel, écran, eau,
  fenêtre, reflet) ou pour distinguer une illustration voisine sur la même page.

## 2. Écrire le sujet (la seule partie à rédiger)

Le sujet est en anglais, 2 à 4 phrases, et décrit **la métaphore**, pas le concept :
- Partir du message de la section (h2/h3 + body) → trouver une image concrète.
  « Centraliser ses données » → *a tiny figure gathering scattered paper sheets blowing
  across a vast plain into one tall neat stack*.
- Nommer : le sujet principal, l'échelle (petites silhouettes / grande forme), où est la
  zone sombre et où est la zone claire (le contraste de valeurs fait la lisibilité en deux
  tons), et pour tritone ce qui est bleu.
- Interdits (déjà dans `negative_prompt`) : texte, logos, robots, cerveaux lumineux,
  circuits, photo-réalisme, 3D, nourriture.
- Vérifier d'abord la bibliothèque : `src/data/illustrations.json` (tags + alt). Si une
  illustration existante couvre le besoin et n'est pas déjà utilisée sur la page, la
  réutiliser au lieu de générer.

## 2 bis. Choisir la distribution de couleurs

Source : `style.json` → `casts`. Rôles : `field` fond · `ground` sol / second plan ·
`shape` grande forme · `subject` sujet, silhouettes · `detail` petits éléments. Un rôle peut
être une couleur ou un dégradé en bandes (`gradient:mid:pale`).

| distribution | famille | quand | référence |
|---|---|---|---|
| `terracotta-plein` | duotone | défaut, calme éditorial | woman-computer |
| `creme-aere` | duotone | pédagogie, clarté, avant/après | fruits |
| `contre-jour` | duotone | tension, nuit, urgence, révélation | style-13 |
| `degrade-aube` | duotone | progression, lancement, horizon | style-17 |
| `ciel-bleu` | tritone | sérénité, vue d'ensemble, contrôle | computer-health |
| `touche-bleue` | tritone | UN élément à remarquer (lien, outil, idée) | — |
| `objet-bleu` | tritone | le sujet principal est la solution (fond crème) | parapluie-cadre-creme |
| `objet-bleu-terracotta` | tritone | l'objet central en bleu au premier plan, fond chaud | parapluie-cadre |
| `forme-bleue` | tritone | la grande forme centrale (disque, panneau) porte le message | mcp-standard-bleu |
| `sol-bleu` | tritone | eau, flux, fondation | — |
| `degrade-bleu` | tritone | ouverture, futur | — |

Sur une même page, alterner les distributions d'une section à l'autre (pas trois
`terracotta-plein` d'affilée). Une distribution peut ne pas convenir à un dessin (ex.
`objet-bleu` quand le « sujet » n'est qu'une petite silhouette) : le contrôle le signale
(part de bleu trop faible), changer de distribution plutôt que forcer.

## 3. Générer (moteur A · GPT)

```bash
node scripts/illustrations/generate.mjs <slug> "<subject>" --cast touche-bleue   # ou --palette duotone|tritone (distribution par défaut)
```
- Produit `public/images/illustrations/ds/<slug>-paper.webp` (1456 px, 7:3, WebP q82),
  puis `<slug>-ink.webp` par **édition** de la version claire (même dessin, recoloré par
  le modèle — pas de filtre). `--no-ink` si la variante sombre n'est pas utile.
- Chaque variante passe `palette-check` (ΔE Lab moyen ≤ 9, ≥ 90 % des pixels dans la
  palette, part de bleu 6–75 % en tritone). Non conforme → régénération auto (`--attempts 3`).
  Après 3 échecs : reformuler le sujet (plus de contraste, zones bleues explicites),
  **ne pas** passer par `duotone.mjs` sauf accord de Simon.
- Slug en kebab-case descriptif (`donnees-centralisees`, pas `image-3`).

## 3 bis. Générer (moteur B · Claude dessine, sans GPT)

1. Écrire `scripts/illustrations/svg/<dessin>.svg`, `viewBox="0 0 1456 624"`, en n'utilisant
   que les variables de couleur (jamais d'hex en dur) :
   - rôles de composition `{{field}} {{ground}} {{shape}} {{subject}} {{detail}}` pour tout
     ce qui doit changer de couleur selon la distribution ;
   - tons fixes `{{shadow}} {{deep}} {{mid}} {{soft}} {{pale}} {{light}}` pour ce qui garde sa
     valeur (papier des feuilles, nuage crème, ombres internes). `{{blue}}` en dur seulement
     si le bleu est indispensable au dessin (sinon passer par un rôle).
2. Grammaire de dessin (cf `references/style-observations.md`) : grand aplat de fond,
   horizon bas franc, une grande forme géométrique (disque, panneau, faisceau), petites
   silhouettes années 60 en `<g id="man">` réutilisées par `<use transform="translate() scale()">`,
   aplats nets, aucun texte. Modèles : `svg/donnees-pile-unique.svg`, `svg/mcp-standard.svg`,
   `svg/seo-phare.svg`, `svg/parapluie-cadre.svg` (objet central bleu).
3. Rendre et contrôler :
   ```bash
   node scripts/illustrations/render-svg.mjs scripts/illustrations/svg/<dessin>.svg <slug> --cast <distribution>
   ```
   → `ds/<slug>-paper.webp` + `-ink.webp` (même dessin, tons ink), grain risographie 2×2 px,
   WebP q78 (~70 Ko), palette-check sur chaque variante. `--out-dir` pour essayer des
   distributions sans toucher la bibliothèque.
4. Lire les WebP (Read) : silhouettes bien assemblées, rien de flottant, lisible en vignette.
   Un défaut de dessin se corrige dans le SVG, puis on relance.

## 4. Contrôle visuel (obligatoire, GF-1)

Ouvrir les deux WebP avec l'outil Read et vérifier : style conforme (aplats, grain, pas de
3D), **aucun texte ni pseudo-lettre**, sujet lisible en vignette, rien d'important coupé
par le recadrage 7:3, bleu présent uniquement en tritone. Sinon régénérer.

## 5. Enregistrer dans la bibliothèque

```bash
node scripts/illustrations/add-illustration.mjs <slug> --palette duotone --cast creme-aere \
  --drawing <dessin> --source claude-svg|gpt-image-2 \
  --alt-fr "Ce que montre l'image, concrètement" --alt-en "What the image shows" \
  --tags donnees,centralisation,organisation
```
- `alt` = description honnête de l'image (pas du mot-clé SEO bourré), ≤ 125 caractères.
- Tags = 3 à 6 slugs FR sans accents ; ils servent au choix automatique de
  `FeatureZigzag` (`src/lib/illustration-pick.ts`). `--no-fallback` pour une
  illustration trop spécifique pour le pool automatique.

## 6. Utiliser l'illustration

- **feature-zigzag** : `media_src` = `/images/illustrations/ds/<slug>-paper.webp` (ou `-ink`
  si la section/bloc est en ink) + `media_alt_fr` / `media_alt_en`. Sans `media_src`, le
  composant choisit seul une illustration de la bibliothèque par tags.
- **hero-split-media** : `illustration.src` + `alt_fr` / `alt_en`.
- **editorial-prose** : `figures[]`.
- Autres sections : passer par leur champ image existant. Jamais de `<img>` inline dans
  une page (règle anti-orphelin, cf CLAUDE.md).
- Une illustration ≠ deux fois sur la même page. Fond paper → `-paper`, fond ink → `-ink`.

## 7. Valider et livrer

```bash
npx -y pnpm@9.15.0 exec astro check   # 0 errors
npx -y pnpm@9.15.0 build              # Complete!
# Si un contenu (title, description, alt, liens) a changé : rejouer les gates du job CI
# « SEO (build de production) » sur un build WAIMIA_INTERNAL_TOOLS=0 :
WAIMIA_INTERNAL_TOOLS=0 npx -y pnpm@9.15.0 build
for g in check-head check-jsonld check-sitemap check-seo check-static-quality; do node scripts/$g.mjs || break; done
```
Leçons PR #73 (build et `astro check` passaient, le CI non) :
- `description_fr` à 176 caractères → `check-head` rouge (max 160) ;
- lien `link_href` vers `/services/agents-ia/agent-support-client` : listé dans
  `site-pages.generated.ts` mais non généré → `check-static-quality` rouge. Une cible de lien
  se vérifie dans `dist/client/<chemin>/index.html`, pas dans une liste de pages.
Puis capture Playwright de la page concernée (illustration visible, pas de déformation),
commit sur la branche de travail : les WebP + `src/data/illustrations.json` + le contenu
modifié. Ne jamais commiter `.illustrations-tmp/`.

## Fichiers

| fichier | rôle |
|---|---|
| `scripts/illustrations/style.json` | prompt de dessin, palettes, seuils de contrôle |
| `scripts/illustrations/generate.mjs` | moteur A : génération GPT directe paper + ink (édition), contrôle, retry |
| `scripts/illustrations/render-svg.mjs` + `svg/*.svg` | moteur B : dessins SVG de Claude rendus par distribution |
| `scripts/illustrations/palette-check.mjs` | contrôle ΔE d'une image contre une palette |
| `scripts/illustrations/add-illustration.mjs` | contrôle + enregistrement dans la bibliothèque |
| `scripts/illustrations/duotone.mjs` + `duotone-lut.json` + `fit-lut.py` | secours : filtre reproduisant les variantes existantes (écart moyen < 4/255) |
| `src/data/illustrations.json` | bibliothèque (source unique) |
| `src/lib/illustration-pick.ts` | choix automatique par tags pour FeatureZigzag |
