# 23 — Industrialisation des sites · vision long terme + triage qualité visuelle

> Cadre stratégique (Simon, 2026-06-02). À **garder en tête** pour toute décision d'archi afin
> d'éviter une grosse refacto future et tendre vers un **boilerplate parfait** réutilisable cross-projet.
> Ce doc = (A) la vision, (B) les principes à respecter dès maintenant, (C) le triage visuel des
> sections/pages faibles, (D) le backlog « variations de sections ». La SPA IA + TinaCMS = **plus tard**,
> mais l'archi actuelle doit déjà être compatible.

## A. Vision (north star)

1. **Bibliothèque = Design System.** Les valeurs de la librairie (tokens + composants catalogués)
   SONT le design system. Catalogue actuel : `src/lib/section-registry.ts` (57 types), schémas Zod
   `src/schemas/sections.ts`, démos `src/lib/section-demos.ts`, previews `/preview/<type>`.
2. **DS fermé, piloté par la donnée.** Un design system **fermé** (renseigné dans `/agence/design-system`)
   dont on modifie les **valeurs** pour restyler **globalement** les composants. Les pages live
   consomment ces composants (← migration en cours, `docs/22`) ; le contenu reste **par instance via props**.
3. **Génération IA du DS (SPA, plus tard).** Une SPA de génération de design system pilotée par l'IA
   (Claude Code / Codex avec le jeton Codex) produira/modifiera les **valeurs** du DS → restyle direct
   des composants, pour générer des design systems par site. **Pas encore construit** — mais l'archi
   doit l'anticiper (cf §B).
4. **Édition WYSIWYG « Gutenberg » via TinaCMS (autre projet, plus tard).** Exposer les blocs/éléments/
   composants UI de la librairie **directement dans TinaCMS** pour une édition visuelle WYSIWYG. ⚠️ Cela
   concerne le projet **`vigiscope-site`** (repo + compte **Vercel/GitHub séparés**, où TinaCMS + édition
   visuelle ont été mis en place), **PAS** le repo `virtuoseweb/*` ni le « amploi » de virtuoseweb. Hors
   scope de cette session (pas d'accès au repo ici) — documenté pour l'alignement archi. Version
   ultérieure, **après la mise en ligne** du site.
5. **Boilerplate cross-projet.** La librairie s'étend **petit à petit** et devient réutilisable sur
   d'autres sites (industrialisation).

## B. Principes à respecter DÈS MAINTENANT (pour éviter la refacto future)

Pour que la SPA-DS-IA et l'intégration TinaCMS s'enfichent sans tout refondre, le travail actuel doit
tenir ces invariants — **à vérifier à chaque nouveau composant / migration** :

1. **Zéro valeur hardcodée dans les composants** : couleurs/espacements/typo via **tokens CSS** (`var(--…)`),
   jamais de hex/px magiques. → un changement de DS = changement de tokens, propagé partout. (Plusieurs
   composants catalogués respectent déjà ; à auditer systématiquement — cf backlog.)
2. **Schéma Zod = contrat unique** par section (`SectionByType<'x'>`). C'est lui qui pilotera et la
   validation, et la génération des **blocs TinaCMS**, et les **champs éditables** de la SPA. → tout
   nouveau champ de contenu passe par le schéma, jamais par un slot non typé.
3. **Contenu par props, structure par composant** (← Option B, `docs/22`). Les slots non typés sont
   convertis en props typées → indispensable pour l'édition visuelle (Tina/SPA) et la réutilisation.
4. **Registry = source unique** : un composant = 4 touchpoints synchronisés (schéma + démo + registry +
   `.astro`) + preview. Les générateurs (Tina blocks, SPA) liront le registry → ne jamais court-circuiter.
5. **Props de variation rétro-compatibles** : toute adaptation d'un composant à un cas live se fait par
   **prop optionnelle** au défaut inchangé (pattern `topPad`/`wrapMaxWidth`/`statsAsKeyMetric`/`kickerReveal`
   déjà établi) → le catalogue/preview ne régresse jamais, et les variations deviennent des **options DS**.
6. **Séquencement** : (1) **standardiser** (migrer les templates → composants, 0 régression) ; (2) **corriger/
   redessiner** les composants faibles (une fois componentisés, 1 fix = fix partout) + **ajouter des variations** ;
   (3) DS-as-data + SPA IA ; (4) blocs TinaCMS. Faire (1) avant (2) garantit qu'un redesign profite à toutes les instances.

> ⚠️ **Évolution du « DS figé »** (CLAUDE.md) : on conserve **0 nouveau token CSS** (le DS de valeurs reste
> fermé/stable), MAIS on **ouvre** désormais l'ajout de **nouvelles sections / variations** composées à partir
> des tokens existants, et la **correction** des layouts faibles. C'est compatible : on enrichit le catalogue,
> pas la palette de tokens.

## C. Triage qualité visuelle (sections/pages faibles à revoir) — backlog

Signalé par Simon (2026-06-02). À **valider visuellement** (GF-1) puis corriger sur le **composant** (post-
standardisation) pour propager partout. Sévérité indicative.

| # | Page(s) | Symptôme observé | Cause probable / piste | Sévérité |
|---|---|---|---|---|
| V1 | `/cas/plateau` (et autres cas) | **Markdown `**gras**` affiché littéralement** dans les livrables | `src/content/cases/plateau.mdx:83` passe `**…**` **dans une string** au prop `<Bi fr="…">` → rendu texte brut, markdown non parsé. Fix : `<strong>`/`set:html` ou Bi qui parse, ou restructurer le contenu. | **haute** (bug visible) |
| V2 | `/solutions/finance`, `/solutions/contenu-seo-geo-ia` | Hero « DÉPARTEMENT » **trop vide** : petite carte CTA noire en haut-gauche, vaste vide beige, mini-SVG courbe flottant à droite → déséquilibre, espace gâché | Hero secteur/département sous-rempli pour ce gabarit de contenu court. Piste : variation de hero plus dense, ou meilleure occupation (visuel/preuves), ou recentrage. | moyenne-haute |
| V3 | `/secteurs/services-b2b` | **h1 surdimensionné qui déborde/casse** (« Services B2B·IA pour cabinets, agences et… ») ; bloc « Système IA pour cabinets… » centré au rendu étrange | `clamp()` h1 trop agressif pour titres longs + gestion de l'alignement/longueur. Piste : borne `clamp` adaptative, `text-wrap:balance`, variation hero titres longs. | haute |
| V4 | `/offres/growth-system-ia` | Section **avant/après** visuellement défaillante | Section comparaison/avant-après à revoir (à inspecter en détail). | moyenne |
| V5 | Home — « Acte 2 · pyramide d'engagement » | **Redondance** : un schéma qui fait exactement la même chose que la grille → n'apporte rien ; espace mal utilisé, **trop horizontal**, grosses lignes monotones sans variation/alternance → **lassitude** | Composition à retravailler : supprimer la redite schéma↔grille, alterner les rythmes (vertical/horizontal, densités), introduire de la variation. | moyenne-haute |

> Méthode de correction (par item) : GF-1 AVANT (screenshot + mesures) → corriger **sur le composant**
> catalogué (ou nouvelle variation) → GF-1 APRÈS + sweep 57/57 → valider visuellement avec Simon avant prod.
> ⚠️ La correction visuelle = **jugement de design** : nécessite l'œil de Simon (ne pas déclarer « beau » sans validation humaine).

## D. Backlog « variations de sections » (étendre la librairie)

Besoin : **plus de variété** pour éviter la monotonie (cf V5) et **piocher** la bonne section par page/template.
Principe : nouvelles sections/variations **composées des tokens existants**, schéma + démo + registry + preview
(4 touchpoints), preview GF-1. Pistes initiales (à prioriser avec Simon) :
- Variations de **hero** denses pour contenus courts (cas finance/contenu — V2) et pour **titres longs** (V3).
- Variations de **rythme** pour casser l'horizontalité monotone (V5) : sections asymétriques, alternance
  pleine largeur / colonnes, densités variables.
- Variation **avant/après** robuste (V4).
- (À compléter au fil de l'audit visuel de l'arbo complète.)

## E. État « fait / à adapter » (pour le boilerplate)

**Fait** : registry 57 sections + schémas + démos + previews · harnais GF-1 (`scripts/gf1-cloud-sweep.mjs`) ·
gate CI Vercel · migration templates→registry en cours (3/18, `docs/22`).
**À adapter / à faire (gardé en tête)** : audit « 0 hardcode / tokens-only » de tous les composants (pré-requis
DS-as-data) · corrections triage §C · variations §D · (plus tard) SPA génération DS IA · (plus tard, vigiscope-site)
export des blocs librairie vers TinaCMS. Documenter chaque ajout ici pour garder le boilerplate cohérent.
