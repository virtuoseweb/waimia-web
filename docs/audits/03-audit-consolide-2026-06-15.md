# Audit consolidé waimia-web · 2026-06-15

> Synthèse sévère et priorisée de 5 audits parallèles (chacun ancré dans une preuve EMPIRIQUE : lecture
> de code **+** chromium headless réel sur `localhost:4321`, screenshots + probes runtime + mesures
> `getComputedStyle`). Branche `feat/seo-etat-final`. Read-only, aucun fichier produit modifié.
>
> Sources : E1 hardcode/DS-sync · E2 santé catalogue · E3 DS Studio + a11y + animation ·
> E4 critique adversariale design/contenu · E5 architecture contenu GLOBAL vs INSTANCE + balayage
> visuel orchestrateur. Audits antérieurs croisés : `docs/audits/02-token-coherence.md`,
> `docs/audit-refonte/collections.md`.

---

## Lecture en 30 secondes

Le **squelette technique est sain** : catalogue de 156 types à 5 touchpoints **0 désync**, reveal
above-fold réparé (fix C1), `prefers-reduced-motion` excellent, SSG propre, 0 tiret cadratin, DA
distinctive et sur-marque. Les **pages enfants du silo** (`/services/*`, `/acquerir`, `/secteurs/*`,
`/cas-clients/*`) sont sur-stratégie et bien écrites.

Mais **trois fractures structurelles** restent, chacune = UN chantier (pas N bugs épars) :

1. **La home + la nav + le footer n'ont jamais été migrés** vers le positionnement / pricing / silo
   ADR-003 que les pages enfants portent déjà → contradictions de promesse, **2 grilles de prix
   live**, liens 404. **Bloquant prospection.**
2. **Le contenu réutilisable est INSTANCE-dupliqué** là où il devrait être GLOBAL (prix copiés 3×,
   double source de cas qui **divergent déjà à l'écran**) → le DS Studio ne pilote que les tokens,
   pas ces contenus.
3. **Les littéraux hardcodés (~73) court-circuitent la sync DS Studio** (rule 60) + dette d'a11y
   (focus, contraste ink) + double-observer JS encore actif.

---

## P0 · Bloquant (à traiter avant toute prospection / cutover)

### P0-1 · Deux grilles tarifaires LIVE sur le même site
**Preuve.** Pages service/LP portent la grille validée **2 000 / 4 000 / 7 000 / 10 000 €**
(`src/content/services/*.mdx`, `src/content/lp/*.mdx`). Mais **home** affiche « Dès 1 500 € HT »,
« 6 à 25 k€ », « Dès 5 000 € HT » (`src/pages/index.astro:185-187,231,239`) et **`/offres/audit-maturite-ia`**
affiche « À partir de 8 000 € HT ». Un prospect voit 1 500 € sur la home et 2 000 € sur la page service.
**Racine (E5).** Aucun store de prix : la grille est copiée **3× à l'identique** dans
`lp/{content-marketing,site-web,tunnel-conversion}-intelligent.mdx:123-178` + ré-écrite dans les `lede`.
**Bonne manière.** Créer `src/data/pricing.ts` (source unique `{ tier, price, period, currency }`),
référencé par les LP + offres + home via props de section. Aligner home + audit dessus, supprimer les
3 copies. → store GLOBAL, conforme au double-état voulu par `CLAUDE.md:50`.

### P0-2 · Liens MORTS (404) dans le footer global et la home
**Preuve (curl).** `Footer.astro:209-211` → `/solutions/sante`, `/solutions/ventes-marketing`,
`/solutions/it-engineering` = **404** (+ home liste `/solutions/finance`, `/solutions/fintech`). La
stratégie (`strategy/02 §2C`) a supprimé toutes les `/solutions/*`. Le footer affiche même les slugs
bruts non rédigés (« sante », « ventes-marketing »). Viole la « règle d'or : zéro lien vers une page
inexistante » (`strategy/00 §3`).
**Bonne manière.** Purger ces entrées de `Footer.astro` + des « domaines » home ; router vers les hubs
verbes existants (`/acquerir` `/piloter` `/operer`) ou les pages réelles.

### P0-3 · La home porte encore l'ANCIEN positionnement
**Preuve (screenshots).** H1 home = « L'IA dans vos outils. Des résultats dans vos chiffres. » +
« On **câble** l'IA dans vos outils » ; `<title>` = « Systèmes IA pour PME et ETI » ; meta = « Studio IA
solo ». La stratégie (`strategy/00 §1`, `03 §7`) impose H1 « cabinet qui fait tourner votre PME à l'IA »
et **bannit** le vocabulaire d'intégrateur. La page la plus importante mène par « câbler des outils » =
posture agence que le pivot veut quitter.
**Bonne manière.** Réécrire hero home sur le H1 stratégique + corriger title/meta vers « cabinet
d'orchestration IA ». Remplacer « câbler » comme mot d'ordre par « orchestrer / mettre en production ».

### P0-4 · Cible incohérente : ETI/8k€ + « suisse » sur home & audit vs doctrine PME-FR
**Preuve.** Home FAQ « PME et ETI françaises **et suisses** » (`index.astro:~235`) alors que la doctrine
(`strategy/02 §0`) acte une identité véridique studio/cabinet solo, lancement FR, **pas d'agence Genève**.
`/offres/audit-maturite-ia` positionné enterprise (« 47 critères », « DPO/CFO », « budget IA 380 k€ »,
« dès 8 000 € HT ») alors que l'audit-produit-d'appel voulu = « Diagnostic IA PME, 3 actions chiffrées,
aides Osez l'IA mobilisables » (`strategy/03 §7`).
**Bonne manière.** Retirer « suisse » ; soit créer le diagnostic PME léger promis, soit re-cadrer cette
page comme « audit ETI » et ne pas l'utiliser comme produit d'appel home.

### P0-5 · Double source de cas clients → récits divergents à l'écran
**Preuve (screenshots E5).** Home affiche via `CASE_FEED` (`src/data/sitemap.ts:482`) des domaines
génériques non cliquables (« Acquisition B2B / 10 sem », « VirtuoseOS », `slug:''`) ; `/cas-clients` +
secteurs affichent la collection `cases` (vrais projets Amploi/Balzeo/Carnets). **Deux récits
déconnectés sur le même site.**
**Bonne manière.** Faire consommer `getCollection('cases')` par la home (remplacer `CASE_FEED` /
`case-card-grid-data.ts`), OU acter que la home montre des domaines génériques et **renommer** pour lever
l'ambiguïté. → source unique.

> **Racine commune P0-1/2/3/4 (E4).** Home + nav + footer n'ont jamais été migrés vers l'architecture
> ADR-003 alors que les pages enfants l'ont été. **C'est UN chantier** (refonte home + nav + footer sur
> nouveau positionnement/pricing/silo), localisé : `src/pages/index.astro`, `src/data/mega-menu.ts`,
> `src/components/header/Header.astro`, `src/components/footer/Footer.astro`, `src/data/sitemap.ts`.

---

## P1 · Important (qualité perçue, cohérence, sync DS)

### P1-1 · Hardcodes qui cassent la sync DS Studio (rule 60) : ~73 violations / ~40 fichiers (E1)
**Preuve runtime.** `CaseCardGrid.astro:116` `font-size:32px` hardcodé → mesuré 51,84px (featured) vs
25,92px (row), discordance confirmée au runtime ; `WorkflowTable.astro:141` même pattern. Couleurs hex
brutes : `TechPillRow.astro:70` `#2aa876` (→ `--accent`), `NewsletterSignup.astro:111,115` `#c0392b`.
Border-radius `14px/16px` désynchronisés (cluster pricing). ~13 font-size + ~48 spacing en dur.
**Lien E3.** Tant que ces littéraux existent, le DS Studio **ne peut pas piloter le DS** : éditer
`--accent` ne les bouge pas. C'est la cause directe du « studio = demi-source-de-vérité ».
**Bonne manière.** Router chaque littéral vers `var(--token)` du rôle. Rôles **sans** token (à valider
par Simon AVANT création, rule 60 §A) : `14px`/`18px` spacing (10+/8+ fichiers), `22px` font-size
(4+ composants), padding CTA `14px 28px`. Décider : harmoniser sur token voisin OU créer le token de rôle.

### P1-2 · Double-observer JS reveal toujours actif (E3)
**Preuve.** Le fix C1 a unifié le **CSS** (`.in` ≡ `.is-visible`) mais **les deux observers JS tournent
en parallèle** : module `scroll-reveal.ts` (ajoute `.is-visible`, logique tall/resize anti-bug-mobile) +
script inline `Base.astro:186-229` (ajoute `.in`, sélecteur **plus large** : `.reveal-up/.scale-in/
.hair-draw/.row-lines`, + fallback `setTimeout(1300)`). Conséquences : chaque élément observé 2× ;
**les variantes étendues n'ont PAS la protection tall-mobile** (couverte que par l'inline) ; risque de
divergence future.
**Bonne manière.** Fusionner en UN observer : garder la logique tall/resize de `scroll-reveal.ts`,
y intégrer le sélecteur élargi + le fallback, supprimer le script inline. Re-vérifier reduced-motion.

### P1-3 · A11y : manques WCAG 2.2 AA (E3)
**Preuve.** `outline:none` sans `:focus-visible` de secours dans **7 endroits** (formulaires :
`ContactForm:140`, `CtaFormInline:94`, `NewsletterBand:120`, `CtaNewsletterFooter:107`, pire : annulé
DANS le bloc `:focus-visible`, `ressources/index:443`, `ConversionFunnelTemplate:643`,
`LeadMagnetTemplate:299`) → viole 2.4.7/2.4.11. Contraste ink : `NewsletterBand` hint `rgba(paper,0.35)`
≈ 2,8:1 (FAIL), lead `0.55` ≈ 4,4:1 (borderline). `NewsletterBand` n'annonce aucune erreur (ni
`aria-live` ni `role=alert`) → 3.3.1/4.1.3 FAIL. ~13 `<section>` sans `aria-label`. `alt = ?? ''`
transforme des portraits nommés en images décoratives.
**Bonne manière.** Pattern de réf déjà présent : `NewsletterSignup.astro:106` (`outline:2px solid
var(--ink)` sous `:focus-visible`). Contraste ink → `var(--muted)`. Ajouter `role=alert` aux erreurs de
formulaire. Nommer les landmarks (réf `HeroHome.astro:19`).

### P1-4 · Bouton « Enregistrer (déployer) » du DS Studio MORT en prod (E3)
**Preuve.** `/api/ds/save` n'existe que sous `astro dev` (middleware `ds-save-dev.mjs`, `output:'static'`).
Le studio s'affiche en prod (`prerender` + `noindex`) → le bouton POST → **404 systématique** → overlay
« Réseau indisponible ».
**Bonne manière.** Masquer `.studio-save` quand `!import.meta.env.DEV`, ou afficher « persistance dispo
en local seulement ». (Couches A/C de persistance git = par ailleurs **bien sécurisées** : refus push
`main`, `allowNew:false`, args git en tableau, keyword jamais loggé.)

### P1-5 · Catalogue : orphelins & doublon (E2)
**Preuve.** 156 types, **0 désync touchpoints** (sain). Mais : organismes `AtlasGrid`/`PersonaSwitcher`
référencés alors que leur page hôte (`atlas.astro`) n'existe pas → orphelins ; `tunnel-step-hero` ≈
`hero-tunnel-step` = doublon de type ; `hero-full-bleed` utilise un `background_kind` non standard ;
19 sections sans champ `background`.
**Bonne manière.** Retirer les organismes orphelins (rule 28), fusionner le doublon de hero tunnel,
normaliser `background_kind`. Régénérer `ds-registry.json` au build (cf P2-4).

### P1-6 · Références à des offres supprimées (E4)
**Preuve.** Hero home « Voir Growth System IA » + featured méga-menu (`mega-menu.ts:321`) pointent
`/offres/growth-system-ia` (à recycler en `/acquerir`) ; la pyramide home source `offres/activation-ia`
+ `offres/productivite-operationnelle-ia` = **404**. Nav top-level = « Solutions » (`mega-menu.ts:160`)
au lieu d'exposer les verbes Acquérir/Piloter/Opérer (`strategy/00 §3`).
**Bonne manière.** Repointer le featured vers `/acquerir` (ou un cas client), purger les sources d'offres
mortes, et trancher le label nav « Solutions » vs verbes.

---

## P2 · Cohérence éditoriale & rythme

- **P2-1 (E4 F5/F16).** Titres home cryptiques (« Une seule architecture. Six entrées, quatre sorties… »,
  « Stop le théâtre. Câbler. ») : garder l'esthétique éditoriale (différenciante) mais réécrire en
  promesses lisibles ; « câbler » = jargon d'intégrateur, à remplacer.
- **P2-2 (E4 F19).** Home trop longue : **18 896 px mobile (~22 écrans)**. L'offre est dite **3×** (Acte II
  « 6 services » + Acte III pyramide + Acte IV « 4 domaines »). Viser ~12 écrans.
- **P2-3 (E4 F10/F18).** 6 formulations de CTA pour 2 intentions (« Réserver un audit / Cadrer ma
  boutique / Câbler / Voir Growth System IA / Parler de votre projet / Réserver un diagnostic »).
  Système à 2 verbes max (1 primaire diag, 1 secondaire explorer). Trancher « Audit gratuit » vs
  « Réserver un audit » (le mot « gratuit » réduit la friction).
- **P2-4 (E3).** Compteur de doublons/dette DS Studio = statique (`ds-registry.json` build-time) → peut
  mentir s'il n'est pas régénéré. Afficher la date de génération ou régénérer au build.
- **P2-5 (E5 P1).** `cases/*.mdx` : champs dupliqués root vs `card.*` (listing lit `card.*`, secteurs
  lisent root), concordants aujourd'hui mais rien ne force la parité → dériver l'un de l'autre.
  Proof-points référencés par id sur 2 pages seulement ; littéraux ailleurs (`8/sem`, `1 500 €`) → étendre
  la réf par id partout.
- **P2-6 (E4 F11/F17).** Libellé « intelligent » (la marque catégorielle) absent du menu (« Tunnel de
  conversion » vs page « …intelligent »). H1 service à 22 mots → raccourcir, déporter la définition en
  sous-titre.

---

## P3 · Cosmétique / à vérifier

- **P3-1 (E4 F20).** Alternance Paper ↔ Ink et langage d’interaction
L’alternance Paper ↔ Ink n’est pas un effet visuel optionnel mais un principe fondamental du système.
Le constat actuel est incorrect : certaines transitions entre pages semblent non intentionnelles (ex. Home claire → Service flagship sombre), alors qu’il s’agit précisément du comportement recherché.
L’objectif est de créer un rythme éditorial fort permettant :
* d’améliorer la scannabilité ;
* de renforcer la hiérarchie visuelle ;
* de segmenter clairement les différentes parties du site ;
* de limiter l’effet de “mur de contenu” ;
* de créer des respirations visuelles entre les grands sujets.
La rupture entre univers clairs (Paper) et univers sombres (Ink) est volontaire et doit être assumée.
Le template Site Web Intelligent devient la référence à suivre pour les futures pages Services, Solutions, Offres et contenus éditoriaux.
Principe de construction
Les pages ne doivent pas être conçues comme une succession uniforme de sections identiques.
Elles doivent alterner :

* sections Paper ;
* sections Ink ;
* sections accent ;
* moments immersifs ;
* moments de lecture dense ;
* moments de respiration.
L’objectif est de produire un rythme proche d’une publication éditoriale premium plutôt qu’une landing page SaaS classique.
⸻
Transitions entre sections

Même lorsque la rupture visuelle est forte, les transitions doivent rester fluides.
Cette continuité doit être assurée simultanément par :
Le contenu
* transition logique des sujets ;
* accroches préparant la section suivante ;
* éléments narratifs ;
* continuité du storytelling.
Le design
* continuité des alignements ;
* cohérence des espacements ;
* gestion progressive des contrastes ;
* utilisation d’animations discrètes.

Langage d’animation à retenir

Les animations doivent rester sobres, premium et éditoriales.

Éviter les effets démonstratifs ou purement décoratifs.

Les animations doivent servir la compréhension, la hiérarchie et le rythme.

⸻

Effets validés à intégrer au Design System Studio

Container Expansion

Une section démarre comme une carte ou un conteneur contenu.

Au scroll :

* elle s’agrandit progressivement ;
* les marges diminuent ;
* les bordures ou le radius disparaissent ;
* elle occupe tout ou presque tout le viewport.

Usage :

* sections immersives ;
* études ;
* dashboards ;
* cas clients ;
* grands blocs narratifs.

⸻

Sticky Editorial Sections

Le titre ou le sujet principal reste fixe pendant que le contenu se déroule.

Usage :

* méthodologie ;
* explication de concepts ;
* systèmes ;
* processus ;
* storytelling.

⸻

Progressive Reveal

Animation discrète d’apparition.

Autorisé :

* légère variation d’opacité ;
* légère translation verticale.

Interdit :

* fades agressifs ;
* animations systématiques sur chaque élément ;
* effets excessifs.

L’effet doit être presque imperceptible.

⸻

Scroll Morph

Transformation progressive d’un élément en un autre.

Exemples :

* une carte devient une section ;
* une image devient un écran ;
* un mockup devient une interface ;
* un aperçu devient un dashboard complet.

⸻

Effets déjà présents

Le catalogue contient déjà plusieurs effets compatibles avec cette direction :

* sections Terminal ;
* terminaux animés ;
* effets de saisie ;
* interactions système.

Ces éléments doivent être conservés.

⸻

Mission

Identifier les effets déjà disponibles dans le catalogue.

Comparer avec la liste d’effets validés ci-dessus.

Ajouter uniquement les effets manquants afin de constituer un langage d’interaction cohérent, réutilisable et standardisé pour l’ensemble des futurs templates et pages.

Un mockup devient une interface.

Anthropic adore ça.
  sombre = rupture brutale). Décider une règle de parcours.
- **P3-2 (E4 F22).** Titre home révélé : mot « architecture » en terracotta pâle sur paper = contraste à
  valider en `getComputedStyle` au repos.
- **P3-3 (E3).** 504 « Outdated Optimize Dep » Vite sur chaque page en **dev** (absent du build prod) ;
  pollue la console. Un `pnpm dev` frais le résout.
- **P3-4 (E3).** Atelier de section DS Studio : `applyTexts()` fait `textContent` → **détruit l'italique
  `<i>` des titres** ; classes `is-variant-*` génériques sans garantie CSS (boutons potentiellement sans
  effet). L'atelier est **export-only** (génère un snippet JSON à coller, n'écrit rien).
- **P3-5 (E3).** Fallback `setTimeout(1300)` magique (anti-BootSplash) : délai non corrélé à
  `--dur-reveal` ; `BootSplash` introuvable au grep → possible code mort.
- **P3-6 (E5 P2).** `pain-points.ts` = store **orphelin** (0 consommateur au rendu) : soit le câbler, soit
  le réduire à son rôle de taxonomie + documenter.

---

## Ce qui est réellement bien fait (à préserver, ne pas régresser)

1. Pages silo `/services/*` + `/acquerir` + `/secteurs/*` sur-stratégie, mécanisme clair.
2. **Cadrage honnête des chiffres** (secteur e-commerce, `/acquerir`) : « chiffres de marché reportés,
   pas nos résultats », sources nommées (Baymard/McKinsey/Adobe) = **modèle E-E-A-T à généraliser à la home**.
3. Cas clients réels et véridiques (Amploi/Balzeo/Carnets), pas de témoignage mis en scène.
4. Catalogue 156 types **0 désync touchpoints** ; reveal above-fold réparé (fix C1) ;
   `prefers-reduced-motion` couvert CSS+JS ; édition de token DS Studio + héritage iframe **prouvés
   fonctionnels** ; persistance git du studio bien sécurisée.
5. 0 tiret cadratin, 0 overflow horizontal mobile, SSG propre, DA distinctive (serif éditorial,
   terracotta/paper/ink, illustrations sur-mesure).

---

## Cartographie des chantiers (pour décision de priorisation)

| Chantier | Couvre | Fichiers | Tier conseillé |
|---|---|---|---|
| **A · Migration home+nav+footer ADR-003** | P0-1,2,3,4,5 + P1-6 | `index.astro`, `mega-menu.ts`, `Header.astro`, `Footer.astro`, `sitemap.ts` + `src/data/pricing.ts` (nouveau) | Opus (réflexion contenu+archi) |
| **B · Migration hardcodes → tokens** | P1-1 (+ débloque DS Studio) | ~40 composants `sections/`+`ui/` | Sonnet mécanique (après arbitrage tokens Simon) |
| **C · Fusion double-observer reveal** | P1-2 | `scroll-reveal.ts`, `Base.astro` | Sonnet (bug spec'd) + GF-1 |
| **D · A11y AA** | P1-3 | 7 formulaires + sections sans landmark | Sonnet + a11y-architect en revue |
| **E · Hygiène catalogue + DS Studio** | P1-4,5 + P2-4 + P3-4,5 | catalogue, `ds-studio.astro`, `ds-save-dev` | Sonnet |
| **F · Unification contenu GLOBAL** | P0-5, P2-5, P3-6 | stores `src/data/*`, `cases/*.mdx` | Opus (modèle) → Sonnet (exéc) |

Décision Simon attendue : ordre des chantiers + arbitrage des tokens-de-rôle (P1-1) avant migration.
Aucun fix n'est lancé avant cette validation.
