---
name: page-compose
description: |
  Genere une nouvelle page composable Waimia en piochant des sections du
  catalogue (registry), sans inventer de markup. Protocole rapide et concluant :
  (1) choisir une recette d'archetype dans src/data/page-recipes.json (service,
  landing, offer, case, secteur-hub, home) OU composer une sequence de types a
  la main ; (2) lire les props EXACTES de chaque type dans
  src/data/section-quickref.json (requiredProps + optionalProps + demo pret a
  coller) ; (3) ecrire le fichier de contenu (src/content/<collection>/<slug>.mdx
  avec frontmatter `sections: [...]`, ou une page .astro inline pour un hub) avec
  un copy reel ; (4) prouver le resultat (GF-1) via build (gate : throw si
  sections vide), check:touchpoints et check-internal-links.

  Invoque ce skill des qu'on veut creer/scaffolder une page, generer un nouveau
  site/parcours en assemblant le catalogue, ou tester "generer un site en
  piochant les sections". Declencheurs : nouvelle page, page composable,
  scaffolding, generer un site, recette, archetype, sections frontmatter,
  SectionsRenderer, registry.
user-invocable: true
---

# Skill page-compose

## Role

Tu composes une page Waimia en ASSEMBLANT des sections cataloguees, jamais en
ecrivant du markup neuf. Le rendu composable existe deja : un frontmatter MDX
`sections: [...]` est rendu par `<SectionsRenderer>` qui dispatch chaque
`section.type` vers `src/lib/section-registry.ts`. Ton seul travail = choisir les
bons types, dans le bon ordre, avec les bonnes props, et le prouver.

Anti-orphelin (regle d'or repo) : tu n'inlines JAMAIS de HTML/CSS dans une page
ou un template. Si une section manque, ce n'est PAS a toi de la creer ici (c'est
une tache DS dediee, 4 touchpoints synchronises) : choisis le type catalogue le
plus proche.

## Sources de verite (lire, ne pas dupliquer)

- `src/data/page-recipes.json` : recettes d'archetypes (sequences de types
  reelles, derivees des pages composables existantes). Lookup d'une sequence
  prete a poser.
- `src/data/section-quickref.json` : par type, `requiredProps`, `optionalProps`
  (avec contraintes enum/min/max) et `demo` (extrait de frontmatter pret a
  coller). C'est le lookup one-shot des props exactes.
- `src/data/ds-section-manifest.json` : detail complet (tokens, classes,
  agentGuide) si le quickref ne suffit pas.
- `docs/DS-SECTION-CATALOG.md` : meme info en lisible humain.

Si quickref ou recipes sont absents ou perimes, regenere-les :
`npm run gen:section-manifest && npm run gen:section-quickref`.

## Collections composables (ou ecrire)

Champ `sections:` present (rendu composable possible) :
`services`, `lp`, `cases`, `offres`. Routes :
- service  -> `src/content/services/<slug>.mdx`  -> `/services/<slug>`
- landing  -> `src/content/lp/<slug>.mdx`         -> `/lp/<slug>`
- offer    -> `src/content/offres/<slug>.mdx`     -> `/offres/<slug>`
- case     -> `src/content/cases/<slug>.mdx`      -> `/realisations/<slug>`

Un hub de secteur (`secteur-hub`) n'a PAS de collection composable : c'est une
page `src/pages/<slug>.astro` qui passe un tableau `sections` INLINE a
`<SectionsRenderer>` (modele : `src/pages/acquerir.astro`). La home est bespoke
(organisms hors catalogue) : la recette `home` est une cible de migration.

## Protocole (4 etapes)

### 1. Choisir la sequence

- Cas rapide : prends l'archetype le plus proche dans `page-recipes.json` et
  reutilise sa `sections` telle quelle.
- Cas sur mesure : pioche des `type` dans le quickref (filtre par `categorySlug`
  pour trouver hero / proof / pricing / faq / cta...). Garde un ordre narratif :
  hero -> contexte/probleme -> preuve -> methode/offre -> prix -> faq -> cta.

### 2. Lire les props exactes

Pour chaque type retenu, ouvre son entree dans `section-quickref.json` :
- `requiredProps` = a fournir OBLIGATOIREMENT (sinon le schema Zod casse le
  build). Les champs bilingues sont separes : `h1_fr` + `h1_en`, etc.
- `demo` = un extrait pret a coller (valeurs reelles) : pars de la et remplace
  le copy par le contenu reel de la page.
- `optionalProps` avec `constraint` enum (ex. `background: paper | paper-2 | ink`)
  = valeurs autorisees, ne pas inventer hors enum.

### 3. Ecrire le fichier

MDX (collection composable) :

```mdx
---
title_fr: "Titre FR"
title_en: "Title EN"
description_fr: "Meta description FR (150-160 c)."
description_en: "Meta description EN."
sections:
  - type: hero-conversion-funnel
    funnel_num: "01"
    h1_fr: "..."
    h1_en: "..."
    lede_fr: "..."
    lede_en: "..."
    cta_primary: { label_fr: "...", label_en: "...", href: "/contact", variant: "primary" }
  - type: problem-statement
    # ... props depuis quickref
  # ... reste de la sequence
---
```

Regles : `sections:` non vide (le gate `services/[...slug].astro` etc. throw
sinon). Reutilise les tokens/enums du DS (0 valeur hors enum, 0 hardcode). Tout
`href` interne doit pointer vers une page qui existe (sinon check-internal-links
echoue). Copy reel, 0 tiret cadratin U+2014 (rule 58).

Hub `.astro` : copie la structure de `src/pages/acquerir.astro`, remplace le
tableau `sections` inline, garde `<SectionsRenderer sections={sections} ... />`.

### 4. Prouver (GF-1, meme tour)

```bash
# 4a. Build = gate composable (throw si frontmatter sections vide/invalide,
#     erreur Zod si une prop requise manque)
npx -y pnpm@9.15.0 build           # attendu : Complete!

# 4b. Touchpoints DS synchronises
npm run check:touchpoints           # attendu : exit 0

# 4c. Liens internes (anti-404) sur le dist fraichement build
npm run check:internal-links        # attendu : OK, aucun lien interne casse
```

Preuve VISUELLE de la nouvelle page (obligatoire avant "fini") : Playwright
screenshot above-fold de `/services/<slug>` (preview Vercel ou `scripts/serve-dist.mjs`
en local) + `getComputedStyle` sur H1/CTA (opacity != 0, transform neutre).
"ca build" seul ne suffit pas.

## Definition de fait

- [ ] `sections:` non vide, tous les `type` existent dans le registry
- [ ] toutes les `requiredProps` de chaque type sont fournies (build vert)
- [ ] `check:touchpoints` exit 0
- [ ] `check:internal-links` OK (aucun href interne casse)
- [ ] screenshot above-fold + getComputedStyle H1/CTA prouves
- [ ] 0 markup inline, 0 hardcode, 0 valeur hors enum, 0 U+2014

## Exemple express : generer une landing en 6 sections

Recette `landing` (`page-recipes.json`) -> types + frontmatter (props requises
issues de `section-quickref.json`) :

1. `hero-conversion-funnel` (req : `funnel_num, h1_fr, h1_en, lede_fr, lede_en, cta_primary`)
2. `problem-statement`
3. `problems-grid`
4. `proof-bar`
5. `pricing-cards`
6. `faq-two-column`
7. `footer-cta-band` (req : `h2_fr, h2_en, buttons`)

Coller les `demo` de chaque type depuis le quickref, remplacer le copy, ecrire
`src/content/lp/<slug>.mdx`, builder. La landing repond a `/lp/<slug>`.
