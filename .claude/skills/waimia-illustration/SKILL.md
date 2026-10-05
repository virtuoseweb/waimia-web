---
name: waimia-illustration
description: Génère une illustration Waimia (affiche éditoriale années 60, sérigraphie/riso) DIRECTEMENT dans la palette finale du site — duotone terracotta/crème ou tritone avec le bleu #75B0D7 — en variantes paper + ink, vérifie la palette, l'ajoute à la bibliothèque src/data/illustrations.json et l'utilise pour remplacer une image générique ou un placeholder. À utiliser quand Simon demande « génère une illustration », « remplace cette image », « il manque un visuel », ou qu'une section affiche une image hors-sujet / répétée.
---

# Skill · Illustrations Waimia

Le rendu visé est **le visuel final du site**, pas une image couleur à filtrer ensuite :
le modèle d'image génère directement en duotone ou tritone. Le filtre `duotone.mjs`
n'est qu'un secours manuel (jamais l'étape par défaut).

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
composition, personnages, ton, interdits) + 11 illustrations analysées (ce qu'elles
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

## 3. Générer

```bash
node scripts/illustrations/generate.mjs <slug> "<subject>" --palette duotone   # ou tritone
```
- Produit `public/images/illustrations/ds/<slug>-paper.webp` (1456 px, 7:3, WebP q82),
  puis `<slug>-ink.webp` par **édition** de la version claire (même dessin, recoloré par
  le modèle — pas de filtre). `--no-ink` si la variante sombre n'est pas utile.
- Chaque variante passe `palette-check` (ΔE Lab moyen ≤ 9, ≥ 90 % des pixels dans la
  palette, part de bleu 6–75 % en tritone). Non conforme → régénération auto (`--attempts 3`).
  Après 3 échecs : reformuler le sujet (plus de contraste, zones bleues explicites),
  **ne pas** passer par `duotone.mjs` sauf accord de Simon.
- Slug en kebab-case descriptif (`donnees-centralisees`, pas `image-3`).

## 4. Contrôle visuel (obligatoire, GF-1)

Ouvrir les deux WebP avec l'outil Read et vérifier : style conforme (aplats, grain, pas de
3D), **aucun texte ni pseudo-lettre**, sujet lisible en vignette, rien d'important coupé
par le recadrage 7:3, bleu présent uniquement en tritone. Sinon régénérer.

## 5. Enregistrer dans la bibliothèque

```bash
node scripts/illustrations/add-illustration.mjs <slug> --palette duotone \
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
```
Puis capture Playwright de la page concernée (illustration visible, pas de déformation),
commit sur la branche de travail : les WebP + `src/data/illustrations.json` + le contenu
modifié. Ne jamais commiter `.illustrations-tmp/`.

## Fichiers

| fichier | rôle |
|---|---|
| `scripts/illustrations/style.json` | prompt de dessin, palettes, seuils de contrôle |
| `scripts/illustrations/generate.mjs` | génération directe paper + ink (édition), contrôle, retry |
| `scripts/illustrations/palette-check.mjs` | contrôle ΔE d'une image contre une palette |
| `scripts/illustrations/add-illustration.mjs` | contrôle + enregistrement dans la bibliothèque |
| `scripts/illustrations/duotone.mjs` + `duotone-lut.json` + `fit-lut.py` | secours : filtre reproduisant les variantes existantes (écart moyen < 4/255) |
| `src/data/illustrations.json` | bibliothèque (source unique) |
| `src/lib/illustration-pick.ts` | choix automatique par tags pour FeatureZigzag |
