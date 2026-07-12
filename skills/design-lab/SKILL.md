---
name: design-lab
description: |
  Cycle iteratif de conception de pages Waimia avec variantes A/B et validation
  humaine par etapes : (0) bonnes questions + consultations approfondies,
  (0bis) cartographie factuelle de la library, (1) squelette structure/rythme/
  contenu, (2) maquette statique HTML/CSS rapide servie sur /lab/<page>-<v>,
  (3) conversion des sections validees en items library (schema, tags, famille,
  JSON), (4) recomposition composable /preview-v/<page>/<v>, (5) remplacement
  de la page live sur confirmation. Alimente le catalogue a chaque iteration.
  Declencheurs : nouvelle proposition de design, variante de page, A/B test,
  design lab, maquette, wireframe, redesign home/service/landing, decliner une
  section, enrichir la library.
user-invocable: true
---

# Skill design-lab · proposer, valider, capitaliser

## Principe

On concoit une page complete EN DIRECT (HTML/CSS simple, un seul fichier) pour
s'impregner du squelette, du contenu et du design d'ensemble, PUIS on convertit
les sections validees en items de la library, PUIS on recompose la page depuis
la library. Le lab est le SEUL endroit du repo ou le markup inline est permis :
tout ce qui est valide finit catalogue (le skill `page-compose` prend le relais
pour assembler). Chaque iteration enrichit la library : rien n'est jetable.

Complementaire de `page-compose` (assemblage catalogue pur) et de
`waimia-web-patterns` (conventions repo) : les lire avant d'executer.

## Etape 0 · Brief et bonnes questions (OBLIGATOIRE, avant tout code)

Repondre par ecrit (dans le rapport d'etape) a :
- **Contexte** : quelle page, quel role dans le parcours (1re impression ?
  money page ? hub ?), qu'est-ce qui ne va pas dans la version actuelle ?
- **Audience & objectif** : qui lit, quelle action attendue, quel arc narratif
  (ex : promesse, preuve, methode, tension, offre, confiance, action) ?
- **Contenu** : quels messages/chiffres/preuves existants sont BONS et doivent
  etre gardes/adaptes ? Lesquels sont des doublons a fusionner ?
- **Structure & rythme** : quel modele de page (une home n'est PAS un template
  service : meme DA mais rythme, structure et style visuel propres) ? Quelle
  alternance paper/ink (jamais 2 ink adjacents) ? Ou est le climax ?
- **Design final** : qu'est-ce qui distingue cette variante des precedentes ?

Consultations obligatoires (approfondir si besoin, jamais de memoire) :
- **`src/styles/global.css` EN ENTIER** (couche SEMANTIC TYPE, utilitaires,
  classes reveal) + les fichiers tokens (`src/styles/tokens*.css`) : COMPRENDRE
  le DS avant d'ecrire une ligne. Le lab n'utilise QUE les variables `var(--*)`
  du DS : couleurs, espacements, tailles, radius, durees, easings. Zero valeur
  en dur (px/hex arbitraires) : si un role manque, le signaler, pas improviser.
- `docs/DS-SECTION-CATALOG.md` · `src/data/section-quickref.json` ·
  `src/data/ds-section-manifest.json` (usage reel) · la page live actuelle ·
  les variantes existantes `src/data/page-variants/<page>/*.json` ·
  la directive typo (docs/41).

## Etape 0bis · Cartographie factuelle de la library

Le choix des pieces n'est JAMAIS aleatoire : produire une VUE D'ENSEMBLE
complete avant de piocher.
1. Lister TOUTES les categories/familles de sections (manifest + catalogue) et
   leurs variantes/declinaisons, avec leur usage reel (quelles pages).
2. Pour chaque slot du squelette, decider factuellement :
   `reutiliser tel quel` | `adapter (contenu/props)` | `decliner (variante d'un
   type existant)` | `creer` (dernier recours, rule 60 : prouver qu'aucun type
   ne couvre le role).
3. Livrer une table de sourcing : slot -> type/source -> decision -> raison (1 ligne).

## Etape 1 · Squelette (plan valide AVANT la maquette)

- Sequence des slots avec role narratif, fond (paper/paper-2/ink/accent) et
  source (table de sourcing).
- Anti-doublon strict : chaque information, chiffre ou preuve apparait UNE fois
  sur la page. Fusionner ou supprimer les repetitions.
- **GATE A (humain)** : presenter squelette + table de sourcing. Sautable
  uniquement si le brief humain contient deja les directives de composition.

## Etape 2 · Maquette statique rapide · /lab/<page>-<v>

- Fichier : `src/pages/lab/<page>-<v>.astro` (URL `/lab/<page>-<v>`, ex :
  `/lab/home-d`). Nommage impose : [nom-de-page]-[lettre/numero de variante].
- `prerender = true`, `noindex`, hors nav et hors sitemap.
- Code DIRECT : HTML + CSS scoped dans le fichier, PAS d'islands, pas de
  composants-section a creer. Objectif : rapidite d'iteration + impregnation
  des valeurs DS (100 % `var(--token)`, zero valeur en dur) et des parametres
  qu'exposera la future section.
- **SVG inline** des que le design le demande (line-art, diagrammes, schemas,
  illustrations geometriques, signatures visuelles) : le DS Waimia est riche en
  SVG dessines, une maquette sans eux est plate.
- **JS leger pour les animations/interactions** qui portent le design (scroll-linked,
  hover, compteurs, sequences) : reutiliser d'abord les primitives existantes
  (classes reveal de scroll-reveal.css, `[data-par]`, `[data-mag]`, GSAP lazy
  deja charge), sinon un petit script inline dedie. Toujours respecter
  `prefers-reduced-motion`.
- Les sections CONSERVEES telles quelles (ex : un hero live garde) peuvent etre
  rendues via leurs composants existants au milieu du HTML direct : fidelite et
  vitesse d'abord.
- Contenu REEL (jamais de lorem), typo DA (masse sans, serif italique sur 1-3
  mots via <i>), 0 cadratin U+2014.
- Preuve : build vert + screenshots above-fold desktop et mobile + 0 erreur
  console + **grep anti-hardcode** (aucun hex ni px arbitraire hors tokens :
  `grep -nE '#[0-9a-fA-F]{3,6}|[0-9]+px' <fichier>` et justifier chaque hit restant).
- **Notification de fin (chaque gate)** : prevenir l'humain que la generation
  est terminee, via notification macOS :
  `osascript -e 'display notification "design-lab : maquette prete (gate B)" with title "Waimia design-lab" sound name "Glass"'`
  (adapter le message par etape ; egalement a la fin des etapes 3, 4 et 5).
- **GATE B (humain)** : livrer le lien /lab/<page>-<v> + screenshots. Issues :
  a) corrections -> iterer sur la maquette (rester en etape 2) ;
  b) cherry-pick (« ajoute les sections x, y du variant b ») -> ne convertir
     que ces sections en etape 3 ;
  c) confirmation complete -> etape 3 sur toute la page.

## Etape 3 · Conversion en items library (uniquement le VALIDE)

Pour chaque section validee, suivre le workflow catalogue (waimia-web-patterns) :
1. Variante d'un type existant -> etendre le schema/preset du type (champ ou
   variante), PAS de nouveau type doublon (rule 60).
2. Nouveau type -> `packages/ds-kernel/src/sections/<type>/schema.ts` (Zod) +
   `src/sections/<type>/{Component.astro, demo.ts, meta.ts, index.ts}`.
3. Ranger CORRECTEMENT : bons tags, bonne categorie/famille/variante dans
   meta.ts, demo representative -> la section doit etre VISIBLE et trouvable
   dans le catalogue (`/preview/<type>`, library, DS-SECTION-CATALOG.md).
4. Renseigner les parametres JSON exacts qui reproduisent la maquette.
5. Regenerer les agregats + build.

## Etape 4 · Recomposition depuis la library

- Ecrire `src/data/page-variants/<page>/<v>.json` (sections + props JSON) rendu
  par la route composable `/preview-v/<page>/<v>`.
- Verifier la FIDELITE maquette vs recomposition : screenshots compares, memes
  contenus, meme rythme. Ecart = bug de conversion a corriger.

## Etape 5 · Remplacement du live (sur confirmation explicite)

- **GATE C (humain)** : « je confirme la variante <v> » -> la page live consomme
  la composition validee (JSON ou page composable), jamais un fork.
- Gates repo (build Complete!, token-purity, no-emdash, internal-links) +
  GF-1 prod apres deploy. Commits par scope (library / page / docs).

## Anti-patterns

- Recomposer une home avec le rythme/les sections d'un template service.
- Piocher des sections sans cartographie prealable (choix aleatoire).
- Convertir en library des sections non validees par l'humain.
- Valeur en dur dans la maquette (elle deviendra une section : tokens direct).
- Repeter un chiffre/message dans 2 sections de la meme page.
- Sauter les gates : le skill est INTERACTIF par construction.
