# Inventaire templates × sections (P2.1-a / P2.1-b)

Couverture visuelle **template-level** : pour chaque template du site, 1 capture above-fold
par section top-level, prise sur une page instance représentative, avec l'assemblage réel
du template (chrome global inclus). Complète le sweep **preview-level** (`docs/visual-audit/previews/`,
1 capture par composant catalogué isolé) : ici on voit chaque section DANS son template monté.

- Généré par `scripts/gf1-template-sections-capture.mjs` (Playwright, viewport 1440×900).
- Détection : enfants top-level de `<main id="main">` (Base.astro), height > 40px, ancres height:0 exclues.
- Reveals latchés déterministe (`.is-visible`/`.in`, cf `src/lib/animations/scroll-reveal.ts`) avant capture.
- Sections plus hautes que ~1,5 viewport (corps bespoke monolithiques) découpées en tranches `-pN`.
- Servi via `node scripts/serve-dist.mjs --port 4660 --root dist/client` sur le build du dernier commit.
- Dernière capture : 2026-07-19. Total : **62 PNG** sur **7 templates joignables**.

## Reproduire

```bash
node scripts/serve-dist.mjs --port 4660 --root dist/client &
node scripts/gf1-template-sections-capture.mjs --base http://localhost:4660 \
  --url /cas-clients/amploi --label case-study
```

Chaque run écrit `docs/visual-audit/templates/<label>/<NN>-<slug>.png` + `<label>/sections.json`
(manifest : url, sections ordonnées, slices, consoleErrors, heightPx).

## Roster templates

| Template | Nature | Instance représentative | Sections top-level | PNG | Capture présente | consoleErrors |
|---|---|---|---|---|---|---|
| case-study | template-as-data (`src/lib/templates/case-study.ts`) | `/cas-clients/amploi` | 15 | 15 | oui | 0 |
| sector | template-as-data (`src/lib/templates/sector.ts`) | `/secteurs/batiment` | 13 | 15 | oui | 0 |
| author-page | bespoke (`src/components/templates/AuthorPageTemplate.astro`) | `/equipe/simon-beros` | 1 (monolithe 7833px) | 10 | oui (10 tranches) | 0 |
| essay | bespoke (`EssayTemplate.astro`), props via `src/lib/templates/essay.ts` | `/blog/agent-ia-vs-automatisation-classique-2026` | 3 | 8 | oui | 0 |
| trust-legal | bespoke (`TrustLegalTemplate.astro`) | `/mentions-legales` | 4 | 7 | oui | 0 |
| utility | bespoke (`UtilityTemplate.astro`) | `/contact` | 4 | 6 | oui | 0 |
| welcome | bespoke (`WelcomeTemplate.astro`) | `/bienvenue/newsletter` | 1 (1314px) | 1 | oui | 0 |
| **TechnologiesDetailTemplate** | bespoke (`TechnologiesDetailTemplate.astro`) | AUCUNE (voir Manques) | 0 | 0 | **non joignable** | n/a |

## Détail par template

### case-study (`/cas-clients/amploi`) - 15 sections

Séquence résolue par `resolveTemplate(caseStudyTemplate, ...)` puis rendue via `section-registry`.

| # | Type / classe | Titre | Capture |
|---|---|---|---|
| 00 | masthead-bar | (fil d'Ariane) | `case-study/00-div-masthead-bar.png` |
| 01 | hero-case-study | § Cas client | `case-study/01-cas-client.png` |
| 02 | provenance-chip | (puce provenance) | `case-study/02-section-provenance-chip.png` |
| 03 | case-author-band | (byline auteur) | `case-study/03-section-case-author-band.png` |
| 04 | problem-statement | § Le contexte | `case-study/04-le-contexte.png` |
| 05 | problems-grid | Trois attentes pour le site. | `case-study/05-trois-attentes-pour-le-site.png` |
| 06 | method-timeline | § 02 · L'approche | `case-study/06-02-l-approche.png` |
| 07 | deliverables-grid | § Livré | `case-study/07-livre.png` |
| 08 | site-showcase | Le résultat, en ligne | `case-study/08-le-resultat-en-ligne.png` |
| 09 | pull-quote-block | (citation) | `case-study/09-section-pull-quote-block.png` |
| 10 | tech-stack-band | § 04 · La stack | `case-study/10-04-la-stack.png` |
| 11 | case-author-card-band | § Écrit par | `case-study/11-ecrit-par.png` |
| 12 | related-cards-band | § Autres cas | `case-study/12-autres-cas.png` |
| 13 | footer-cta-band | § Travaillons ensemble | `case-study/13-travaillons-ensemble.png` |
| 14 | related-links | Explorer aussi | `case-study/14-explorer-aussi.png` |

### sector (`/secteurs/batiment`) - 13 sections

| # | Type / classe | Titre | Capture |
|---|---|---|---|
| 00 | masthead-bar | (fil d'Ariane) | `sector/00-div-masthead-bar.png` |
| 01 | hero-sector | § Secteur | `sector/01-secteur.png` |
| 02 | pain-severity-list | § Friction | `sector/02-friction.png` |
| 03 | feature-zigzag | § Ce qu'on câble | `sector/03-ce-qu-on-cable-p1..p3.png` |
| 04 | metric-callout-band | (bande métrique marché) | `sector/04-section-metric-callout.png` |
| 05 | (cases band) | Un cas concret. | `sector/05-un-cas-concret.png` |
| 06 | diagnostic-stages | § Les 5 niveaux | `sector/06-les-5-niveaux.png` |
| 07 | tech-stack-band | § La stack | `sector/07-la-stack.png` |
| 08 | editorial-prose | Le marché du bâtiment, en chiffres | `sector/08-le-marche-du-batiment-en-chiffres.png` |
| 09 | faq-accordion | § Questions fréquentes | `sector/09-questions-frequentes.png` |
| 10 | related-links | Explorer aussi | `sector/10-explorer-aussi.png` |
| 11 | footer-cta-band | § Votre terrain | `sector/11-votre-terrain.png` |
| 12 | trust-badges-band | Réassurance | `sector/12-reassurance.png` |

### author-page (`/equipe/simon-beros`) - 1 élément monolithe (7833px, 10 tranches)

Template bespoke : tout le corps est un seul wrapper top-level. Couverture par tranches
verticales `-p1` à `-p10` (`author-page/00-fondateur-architecte-systemes-ia-pour-pme-pN.png`).
Sous-blocs visibles dans les tranches : hero fondateur, bio, expertises, méthode, liste des
articles de l'auteur, bande CTA finale.

### essay (`/blog/agent-ia-vs-automatisation-classique-2026`) - 3 sections

`EssayTemplate` partagé blog + `/ressources/outils`. Le corps `essay` (4643px) est découpé en 6 tranches.

| # | Type / classe | Titre | Capture |
|---|---|---|---|
| 00 | masthead-bar | (fil d'Ariane) | `essay/00-div-masthead-bar.png` |
| 01 | essay (corps éditorial) | § Blog · gouvernance | `essay/01-blog-gouvernance-p1..p6.png` |
| 02 | cta-band | (bande CTA bas de page) | `essay/02-div-cta-band.png` |

### trust-legal (`/mentions-legales`) - 4 sections

Le corps légal `trust-body` (2966px, sommaire + articles) est découpé en 4 tranches.

| # | Type / classe | Titre | Capture |
|---|---|---|---|
| 00 | masthead-bar | (fil d'Ariane) | `trust-legal/00-div-masthead-bar.png` |
| 01 | trust-hd | Mentions légales | `trust-legal/01-mentions-legales.png` |
| 02 | trust-body | Sommaire + corps | `trust-legal/02-sommaire-p1..p4.png` |
| 03 | cta-band | (bande CTA bas de page) | `trust-legal/03-div-cta-band.png` |

### utility (`/contact`) - 4 sections

Shell générique réutilisé par 6 pages (voir Manques pour la variance). Corps `util-body` (1697px) en 3 tranches.

| # | Type / classe | Titre | Capture |
|---|---|---|---|
| 00 | util-crumbs | (fil d'Ariane) | `utility/00-div-util-crumbs.png` |
| 01 | hero-utility | § Contact | `utility/01-contact.png` |
| 02 | util-body | Ou directement (formulaire + coordonnées) | `utility/02-ou-directement-p1..p3.png` |
| 03 | cta-final | Besoin d'un cadre avant de réserver ? | `utility/03-besoin-d-un-cadre-avant-de-reserver.png` |

### welcome (`/bienvenue/newsletter`) - 1 section (1314px)

Page de confirmation post-conversion. `welcome/00-newsletter-confirmation.png`.

## Manques résiduels et notes

1. **TechnologiesDetailTemplate : non joignable, 0 capture.** Seul `src/pages/[...slug].astro`
   l'importe, et son `getStaticPaths` ne produit que `ressources/cas` et `ressources/blog`.
   Ces deux routes sont **301-redirigées** dans `astro.config.mjs` (`/ressources/cas` → `/cas-clients`,
   `/ressources/blog` → `/blog`). Le template n'a donc aucune page publiée rendable. À recapturer
   seulement si une route réelle le remonte (sinon candidat à retrait, template placeholder).

2. **UtilityTemplate : variance non couverte.** Le shell est réutilisé par 6 pages au contenu
   très différent (`/404`, `/contact`, `/agence/methode`, `/blog` index, `/ressources/academy`,
   `/ressources/outils` index). Seule `/contact` est capturée ici (1 instance par template).
   Si l'itération design vise une de ces variantes (ex. la liste blog index), recapturer avec
   `--url /blog --label utility-blog-index` (nouveau label pour ne pas écraser).

3. **Templates bespoke = corps monolithique.** author-page, essay, trust-legal, utility rendent
   leur contenu dans un seul wrapper top-level (pas une liste de sections cataloguées comme
   case-study / sector). La granularité « 1 capture par section » y est approximée par le
   découpage en tranches verticales `-pN`. Pour une vraie granularité par sous-bloc, ces
   templates devraient être migrés vers `SectionsRenderer` (hors scope P2.1).

4. **essay template-as-data.** `src/lib/templates/essay.ts` n'est pas une séquence rendue par
   SectionsRenderer : c'est un builder de props pour le composant bespoke `EssayTemplate.astro`.
   La capture porte donc sur le rendu `EssayTemplate`, pas sur une liste de sections registry.

5. **Source servie = dist du dernier commit** (`2c122489`, build 18:29). Les redirects
   `astro.config` ne sont pas appliqués par `serve-dist.mjs` (statique pur) ; sans effet sur les
   7 templates joignables, mais explique le 404 local sur les routes tech-detail redirigées.
