# 05 — Builder waimia : brief de vision (référence, EN COURS d'accumulation)

> ✅ **BRIEF COMPLET (2026-06-29, Simon : « J'ai terminé »).** Les 5 messages + toutes les captures sont
> cristallisés ci-dessous + re-scannés. Le cadrage produit est tranché (§Cadrage).
>
> 🛑 **PRIORISATION (Simon 2026-06-29, après cadrage)** : le **BUILD du builder = FUTUR chantier/projet/étape,
> PAS maintenant.** On **cristallise et on commence la planification / structure / infra / techno / ingénierie /
> design**, mais on **reste au niveau scope / contrat / vision / tests** (artefact de planification = `docs/specs/06`),
> **0 build, 0 refacto massif**. La **PRIORITÉ ACTUELLE = finaliser le site web waimia** (l'agence) avec les
> **fonctionnalités minimales à partir de l'existant**, sans gros refacto — « faire ce qu'il faut pour waimia
> pour le moment ». Le builder produit attendra son propre chantier dédié.
>
> Source amont à relier au moment de la synthèse : `docs/archive/47-DS-STUDIO-BUILDER-SPEC.md`
> (spec builder Phase 2 : save = git commit/push headless, 0 runtime serveur, Tina optionnel,
> 0 format parallèle, artefacts = `tokens.css` / `ds-presets.json` / frontmatter `sections:`).
> Colonne agentique = MCP `mcp/waimia-catalogue-server.mjs` (5 tools).

## Objectif maître
Refaire l'app builder **de la façon la plus propre possible pour ne pas hériter de dette.**

---

## Message 1 (2026-06-29) — nature du produit
Système **hybride** :
- À la fois **relume.io** + **webflow / wix / bricks builder**, mais **moins complexe/complet**
  qu'eux, tout en offrant une **aussi bonne expérience**.
- **Mode interactif avec un chat type lovable** : un chat in-app qui pilote la composition.
- Le chat **fonctionne via le MCP** : l'IA in-app utilise le serveur MCP waimia.
- Utilisable de **deux façons** : (a) chat IA **in-app** branché sur le MCP, OU (b) depuis une
  **autre app IA externe** (Claude, OpenAI…) capable de se connecter aux extensions/MCP, via des
  **commandes** et des **skills**.

---

## Message 2 (2026-06-29) — décryptage de Relume (réf. d'UX, images 1→5)

### Principe directeur
Relume = une app **« booster »** dont les **fonctionnalités IA sont FACULTATIVES** (optionnelles,
pas imposées). On peut tout faire à la main ; l'IA accélère quand on le veut. → **À répliquer :
l'IA est un accélérateur opt-in, jamais un passage obligé.**

### Socle technique observé
- App construite avec **leur propre bibliothèque de composants React**.
- Ils maintiennent aussi une **version Webflow** et une **version « Figma »** des mêmes composants.
  → parallèle direct avec notre catalogue (1 source → plusieurs cibles de rendu).

### Les 4 panneaux de l'app (onglets en haut)
1. **Sitemap** — arborescence des pages + sections.
2. **Wireframe** — structure/copie en wireframe sans distraction.
3. **Style Guide** — concepts de style générés, puis style gagnant appliqué partout.
4. **Design** — rendu final designé.

### Barre d'outils latérale gauche (2 boutons) — image 3 & 5
- **Crayon magique (✨)** = entrée des **fonctionnalités IA**. On décrit son projet + on définit le
  **nombre de pages** → génère une **première arborescence optimisée**. Métaphore Simon :
  **« préparer les pièces du puzzle »**. (Avertissement UI : « This will override all page sections
  and copy » → la génération IA écrase, c'est un point de garde.)
  - Au niveau **page** : champ *Name* + *Description* (prompt) → **Generate page** (régénère le
    layout + la copie de CETTE page).
  - Au niveau **projet** : *Description* + *Number of pages* (ex. 2-5) + *Language* (Français) →
    **Generate sitemap** (régénère TOUTE l'arbo).
- **Bouton + (Ajouter)** = ouvre le panneau **Add** (templates de pages + composants par catégorie).

### Comportement contextuel projet ⇄ page (récurrent, important)
Les boutons du coin haut-gauche ET le menu « … » (3 points) **agissent différemment selon la cible** :
- cible **Projet** → actions de niveau projet (générer sitemap, etc.).
- cible **Page** → actions de niveau page (générer page, dupliquer, supprimer, set as home…).
→ **À répliquer : un inspecteur/menu d'actions CONTEXTUEL (scope projet vs page vs section).**

### Panneau « Add » (image 4) — taxonomie des blocs insérables
**🌐 Global sections** (avec **compteur d'instances** affiché — c'est exactement notre demande de
« voir que N instances sont utilisées » + repère global, cf [[composable-everything-catalogue-variants]]) :
- **Pied de Page** — *7 instances*
- **Barre de navigation** — *7 instances*

**💾 Saved** :
- **Page Templates** — *0 saved* (l'utilisateur peut sauvegarder ses propres templates).

**📁 Categories** :
- Page Templates · Blank Section · About · Announcement Banner · Benefits · Blog List Header ·
  Blog List · Blog Post Body · Blog Post Header · Contact · CTA · Event Item Header · Events List ·
  FAQ · Feature · Features List · Footer · Gallery · Header · Hero Header · How It Works ·
  Job Listings · Logo List · Navbar · Portfolio Item Body · Portfolio Item Header · Portfolio List ·
  Pricing · Product Header · Products List · Stats · Team · Testimonial.
- Chaque entrée a un **+** pour l'insérer ; recherche en haut du panneau.

### Édition dans la vue Wireframe
- **Réordonner** les sections (drag), **insérer** de nouvelles, **supprimer**.
- **Menu d'options (« … » / clic droit)** qui **s'adapte** selon que la cible est le **projet** ou
  une **page** : *Ask AI, Duplicate (⌘D), Delete, Copy (⌘C), Cut (⌘X), Paste (⌘V), Add page,
  Add section, Save as template, Set as home page, Find page in wireframe*.
- Bouton **+** inline entre deux sections pour insérer au point voulu.
- Zoom du canvas (ex. 42 %), navigation projet en bas.

### Dashboard (image 2)
- Liste **Recent Projects**, recherche projet/composant, **Import from URL**, **New Project**.
- Bibliothèques accessibles : **Figma Library**, **Webflow Library**, **React Library**.
- Notion d'équipe (Personal / Create a team) + quotas (plan Free : « 0 projects left »).

### Captures source
Images 1→5 fournies par Simon dans la session (transcript 2026-06-29). Résumé textuel ci-dessus =
cristallisation fidèle ; rouvrir le transcript pour le pixel-perfect si besoin lors de la synthèse.

---

## Message 3 (2026-06-29) — vue Wireframe en détail (4 captures)

### Le canvas wireframe
- Toutes les **pages du projet** sont posées **côte à côte** sur un **plan de travail scrollable**
  (table/canvas infini). La page sélectionnée s'ouvre en **colonne wireframe haute** (sections empilées).
- **Zoom** : de **8 %** (dézoom max, vue d'ensemble de toutes les pages) jusqu'à **200 %**.
- **Navigation intuitive souris** : pincement (pinch), glissement (drag/pan), molette — commandes
  naturelles. → **À répliquer : canvas zoomable/pannable, pas une simple liste verticale.**

### Le crayon magique (✨) en vue Wireframe = contextuel à la cible
- **Cible = Page** (capture 1, panneau « Page ») : *Name* + *Description* (prompt) +
  **Save as Page Template** + **Shuffle components** (rebrasse les composants) + **Generate copy**
  (régénère la copie seule) + **Generate page** (régénère layout + copie, écrase tout).
- **Cible = Section** (capture 2, panneau « Section ») : ajoute/édite une section AVEC l'IA et un
  **sélecteur de variante de wireframe** + plusieurs champs *form/select* :
  - **Make a global section** (bouton vert) — promeut la section en globale (→ instances partagées).
  - *Name* (« Section En-tête Hero ») + *Description*/prompt (« Bienvenue sur le site sprinkler »).
  - **Sélecteur de composant/variante** : « **Header 15** » avec chevron → ouvre la liste des
    variantes de cette famille pour **choisir parmi les différents wireframes de section**.
  - **Asset** : bascule **image / vidéo**.
  - **Element** : bascule **Form / Button** (quel élément d'action la section embarque).
  - **Generate copy** (régénère la copie de la section).

### Insertion via + au niveau d'une section/colonne
- Quand on **clique sur une section** (= une « colonne » d'une page) puis sur **+**, on **choisit la
  catégorie de section** puis **parmi les différentes propositions** (variantes) de cette catégorie.
- C'est le même panneau **Add** que message 2, mais **scopé au point d'insertion** dans la page.

### Panneau Add enrichi (captures 3 & 4)
- **Global sections** : Pied de Page (*7 instances*), Barre de navigation (*7 instances*).
- **Saved** : **Components** + **Page Templates** (l'utilisateur sauvegarde composants ET pages).
- **Categories** : chaque catégorie a un **chevron →** qui ouvre ses **variantes**.
- **Recherche + onglets** : la recherche bascule entre **Sections** et **Pages**. Taper « f » →
  remonte **FAQ 6, FAQ 10, Portfolio 21, FAQ 7…** sous forme de **cartes d'aperçu visuel** (preview
  réel du wireframe), chacune avec une **icône bookmark** (sauvegarder en favori/Saved).
- → **À répliquer : recherche cross-variantes avec preview visuel + bookmark, onglets Sections/Pages.**

---

## Message 4 (2026-06-29) — Style Guide + Design + Export + mode Lovable (5 captures)

### Brand = panneau FIXE (plus dans le canvas scrollable)
Le **branding n'a plus besoin d'être dans le canvas zoomable** : c'est un **plan fixe** (panneau « Brand »,
bouton « L »). Contenu :
- **Logo** (aperçu nav Logo / Link One / Link Two) + bascule **clair/sombre**.
- **Logo Asset** : upload (suggestion **2× PNG** pour le meilleur rendu).
- **Logo height** : ex. **2rem · 32px** (sélecteur).
→ **À répliquer : le Brand/identité est un réglage GLOBAL fixe, pas un nœud du canvas.**

### Vue Style Guide (« aide à l'habillage »)
- Sélecteur **Concept 1 ▾** (plusieurs concepts de style sauvegardés) + **Pitch Concepts** (présenter) +
  **bouton shuffle global** (violet, rebrasse tout le concept).
- **Colors** : palette **Neutrals** (rampe de gris) + swatches nommés (**Venice Blue 0A5A8A — Main**,
  **Cinnabar E04B2D**, **Cream C… F2C94C**, **Sea Green 2F9A4A**) chacun avec **rampe de nuances** + un **+**
  pour ajouter. Bascule **clair/sombre** (☀/☾). **Shuffle C** (raccourci clavier **C**).
- **Typography** : **Heading = IBM Plex Mono**, **Body = Source Sans 3** (Google, Free), sélecteur de graisse
  (« Regular – medium ▾ »), **Shuffle T** (raccourci **T**).
- **UI Styling** : **Buttons & Forms** (🔒 verrouillable) + **Cards & Images**, **Shuffle U** (raccourci **U**).
- **Aperçu live** du site à droite, **mis à jour en direct** quand le scheme change.
- **Scheme shuffle (SPACE)** en bas = régénère un schéma complet ; chaque sous-système a SON shuffle + raccourci.
- **Undo/redo** (boutons bas-gauche) + bouton **feedback 👍/👎**.
→ **À répliquer : couche STYLE = scheme (couleurs+typo+UI) shufflable indépendamment, multi-concepts,
  preview live, mappe sur nos tokens DS + `[data-theme]`/`schemeId` (cf doc 47 + DS Studio).**

### Vue Design (rendu final éditable, avant publication/export)
- Chaque page rendue **avec les valeurs du Style Guide appliquées au wireframe**.
- **Cliquer chaque élément** → voir le rendu final + **éditer la section, ajouter les images, changer
  layout/position/assets** avant de publier/exporter.
- Inspecteur Section enrichi (vs wireframe) : ajoute un **sélecteur de Scheme** (« Scheme 2 ») + un bloc
  **Image — Assets and Image controls**, en plus de la variante (« Header 16 »), Asset, Element, Make global,
  Generate copy. (Noter : la variante peut changer entre Header 15 ↔ Header 16 selon l'état.)
- **AI feedback 👍/👎** flottant.
- → **Chez nous, cette étape Design/export = « créer la/les page(s) OU les modifier »** : matérialiser la
  composition en vrais fichiers (`src/content/**` frontmatter `sections:` + assets), pas un format à part.

### Export (menu Export)
Formats : **Figma** (coché par défaut), **Webflow**, **React**, **HTML**, **Export to Claude Design (New)**,
**Export to TXT**, **Export to CSV**, **Export to Excel (with pricing)**.
→ Confirme « 1 source → N cibles ». Chez nous la cible primaire = **nos fichiers de contenu/sections** ;
exports secondaires possibles plus tard.

### Mode Lovable (capture 5) — LE mode spécial qu'on veut proposer
Dashboard Lovable : prompt central **« What should we build, simon? »** (ex. tapé « site vitrine artisan »),
bouton mode **Build ▾**, **micro** (voix), **+** (pièces jointes), bandeau **« Connect all your tools »**
(Google/Slack/Gmail), **Connectors**, projets/templates, génère un projet (« Artisan Showcase »).
→ **C'est l'expérience chat-IA conversationnelle (un prompt → un site) qu'on veut offrir EN PLUS du builder
  manuel.** Chez nous : ce chat pilote le **MCP waimia** (catalogue/compose/preview) pour assembler depuis
  notre catalogue. Mode **opt-in** (cf principe « IA facultative »). Simon annonce d'autres captures Lovable
  + un aperçu **Webflow** pour inspiration.

---

## Message 5 (2026-06-29, « Suite et fin ») — expérience Lovable interactive + anatomie Webflow

### Lovable — preview live + édition interactive (le mode spécial, détaillé)
- **Preview live sans rechargement** : pendant le build, la preview charge ; **quand c'est prêt, le rendu
  s'affiche sans reload** (hot update). À droite = le site en cours, à gauche = le chat.
- **2 modes : Plan / Build** (sélecteur « Build ▾ ») — *plan* = raisonner/cadrer sans écrire, *build* = exécuter.
- **Toolbar contextuelle dans la preview** (en bas) : **cibler un élément HTML** (curseur select), **éditer
  le texte inline** (T), **dessiner une annotation** (crayon), **ajouter un commentaire pour l'agent IA** sur
  un élément (bulle), **… more**. (« Comments and visual edits moved … right from this toolbar. »)
- **Sélection → ciblage dans le chat** : sélectionner un élément l'**épingle dans le chat** avec un **aperçu
  miniature** de l'élément (« 1 selection » + « Ask Lovable to modify the selected element » + Clear).
- **Gate d'interaction agent↔preview** : « **Let the agent interact with the preview in your browser?** »
  (Ask each time / Skip / **Allow**). L'agent peut **exécuter des snippets JS dans la preview** pour
  **vérifier son propre travail** (ex. « Vérification que la page se charge » → `return document.body.innerHTML.length`).
  → **= une boucle GF-1 native** (l'IA prouve empiriquement que le rendu est là). À répliquer via notre MCP
  `preview_render` + une vérif DOM.
- **Réponse de l'agent** : onglets **Details / Preview** + résumé de ce qui a été créé (palette, 3 sections
  Hero/Services/Contact-CTA, nav sticky + footer, textes placeholder, « modifiez dans `src/routes/index.tsx` »)
  + **chips d'actions rapides** : « Remplacer les textes », « Ajouter un formulaire », « Optimiser le SEO »
  + feedback 👍👎 / copy / retry.
- **@ Reuse work from other projects** + **Add reference** (réutiliser/référencer d'autres projets).
- **Queue follow-up** (mettre des messages en file), **micro** (voix), **+** (pièces jointes).
→ **À répliquer : chat-IA piloté MCP, preview live no-reload, toolbar select/edit/annotate/comment,
  sélection→contexte chat, gate d'interaction + auto-vérif DOM, chips d'actions, mode plan/build, références.**

### Webflow — anatomie builder (capture, pour inspiration)
- **Centre = canvas live** avec **options de vue** : breakpoints (1172px / tablette / mobile), zoom, etc.
- **Sidebar gauche** = panneau **Add** (onglets **Elements / Layouts**) : *Structure* (Section, Container,
  Quick Stack, V Flex, H Flex, Page Slot), *Basic* (Div Block, List, List Item, Link Block, Button),
  *Typography* (Heading, Paragraph, Text Link…) + **rail d'icônes** (pages, navigator, **composants**, assets…).
- **Sidebar droite** = inspecteur **Style / Settings / Interactions** + **Style selector** (« Make a selection »).
- Onglets haut : **Design / CMS / Insights**. Notes Simon : **ajouter des champs**, **définir des variables**,
  **gérer les interactions**, **assets** (images…), **library** (voir les composants + **ajouter des libraries
  externes depuis un marketplace**).
→ **À retenir : inspecteur 3 onglets (style/réglages/interactions), variables, CMS/champs, assets manager,
  library extensible (marketplace). Niveau « pro » dont on prend les IDÉES, pas la complexité (cf « moins complet »).**

---

## Re-scan exhaustif des captures (détails rattrapés, demande Simon msg 4)

### Relume — homepage (msg 2, image 1)
- Positionnement en **3 piliers nommés** : **Plan → Sitemaps**, **Structure → Wireframes**,
  **Conceptualise → Style Guide** (la vue **Design** est la 4ᵉ étape, plus récente). C'est le **pipeline**
  conceptuel : planifier → structurer → habiller → designer. Hero = « Describe a company in a sentence or
  two… **Generate** » + **Launch →**. Chaque pilier a « Give it a try ».

### Relume — dashboard (msg 2, image 2)
- **Site Builder** + espace **Personal (Free)** + **Create a team** (multi-tenant/équipes).
- Bibliothèques distinctes : **Figma Library**, **Webflow Library**, **React Library** (la même biblio
  déclinée par cible). **Import from URL** (importer un site existant) + **New Project**.
- Quotas : « **0 projects left** / Upgrade to Pro » (modèle freemium par nombre de projets).

### Relume — Sitemap (msg 2, images 3 & 5)
- La génération IA projet prend **Description + Number of pages (2-5) + Language (Français)** → **Generate
  sitemap** ; avertissement **« This will override all page sections and copy »** (destructif).
- Le sitemap = **arbo de pages** (Accueil parent → enfants Compétences/Réalisations/Blog/Contact), chaque
  page = **colonne de cartes de section** empilées (Barre de navigation, Section En-tête Hero ×N, Section
  Liste de Fonctionnalités, About, Statistiques, Logos clients, CTA, Pied de Page…).
- **Slots vides** : des cartes « Section name » placeholder (emplacements à remplir) — le squelette tolère
  des trous.
- **Menu contextuel page** (« … ») : Ask AI, Duplicate (⌘D), Delete, Copy (⌘C), Cut (⌘X), Paste (⌘V),
  **Add page**, **Add section**, **Save as template**, **Set as home page**,
  **Find page in wireframe** (navigation croisée sitemap↔wireframe).

### Relume — Wireframe (msg 3)
- **Poignée de drag** (grip 6 points violet) à gauche de la section sélectionnée = **réordonner** par glisser.
- **Bouton + flottant** entre sections = insertion au point exact.
- Inspecteur Section : **Make a global section** (vert), name, prompt, **variante (Header 15 →)**, **Asset
  image/vidéo**, **Element Form/Button**, **Generate copy**.
- Add : **Saved = Components ET Page Templates** ; recherche à **onglets Sections/Pages** + **cartes preview
  réelles** (FAQ 6 / FAQ 10 / Portfolio 21 / FAQ 7) + **bookmark** pour sauver en favori ; filtres (icône
  réglages à droite de la recherche).
- Zoom **8 %→200 %**, pinch/drag.

### Relume — Style Guide / Design / Export (msg 4) — voir sections ci-dessus.

### Lovable (msg 4, image 5) — voir « Mode Lovable » ci-dessus.

---

## Patterns extraits à répliquer (running list, à confirmer au signal « toutes les infos »)
1. **IA opt-in** : tout faisable à la main, l'IA (chat MCP) accélère sans être obligatoire.
2. **4 vues** sitemap → wireframe → style guide → design (pipeline du squelette au rendu).
3. **Scope contextuel** projet / page / section → inspecteur + menu d'actions adaptatifs.
4. **Compteur d'instances + repère global** sur les sections globales (déjà notre demande C).
5. **Panneau Add** = templates de page + composants par **catégorie** + **recherche** + **Saved**.
6. **Édition wireframe** : drag-reorder, insert-between (+), delete, duplicate, save-as-template.
7. **1 source → plusieurs cibles** (React / Webflow / Figma chez eux ; chez nous : catalogue →
   `sections:` JSON → SSR + MCP). Anti-dette : 0 format propriétaire parallèle (cf doc 47).
8. **Génération IA destructive signalée** (« override all sections and copy ») → garde-fou UX.
9. **Canvas zoomable/pannable** (8 %→200 %, pinch/drag), pages côte à côte — pas une liste verticale.
10. **Inspecteur de section riche** : make-global, name, prompt, **sélecteur de variante** (Header 15
    → liste), asset image/vidéo, element form/button, generate-copy. Mappe sur notre `presetId` +
    `schemeId` + champs de section (cf `BuilderCanvas.tsx`).
11. **Insertion + scopée au point** (clic section → + → catégorie → variante).
12. **Recherche cross-variantes** avec **preview visuel** + **bookmark→Saved** + onglets Sections/Pages.
13. **Saved = Components ET Page Templates** (favoris réutilisables de l'utilisateur).
14. **Pipeline en 4 étapes nommées** : Sitemap (plan) → Wireframe (structure) → Style Guide (habillage)
    → Design (rendu final éditable) → publier/exporter. Étapes navigables, pas linéaires-bloquantes.
15. **Brand = réglage GLOBAL fixe** (logo + clair/sombre + hauteur logo), hors canvas.
16. **Couche STYLE shufflable** : scheme = couleurs (rampe + Main) + typo (heading/body Google) + UI
    (boutons/cards) ; shuffle global (SPACE) + par sous-système (C/T/U) ; **multi-concepts** (Concept 1▾,
    Pitch Concepts) ; **preview live**. → mappe sur tokens DS + `[data-theme]`/`schemeId` (doc 47 + DS Studio).
17. **Étape Design = éditer le rendu final** (sections, images, layout/position/assets, scheme par section)
    AVANT publication. Chez nous = **créer/modifier les vraies pages** (`src/content/**` `sections:`).
18. **Export 1→N** (Figma/Webflow/React/HTML/Claude Design/TXT/CSV/Excel-pricing). Cible primaire waimia =
    nos fichiers de contenu ; exports secondaires plus tard.
19. **Mode Lovable (chat-IA conversationnel, opt-in)** : un prompt → un site, via MCP + connecteurs.
    Mode SPÉCIAL à proposer EN PLUS du builder manuel (Simon : « un mode qu'on doit/veut proposer »).
20. **Import from URL** + **équipes/multi-tenant** + **freemium par projets** (idées modèle produit Relume).
21. **Slots vides tolérés** dans le squelette (« Section name » placeholder) — le wireframe accepte les trous.
22. **Navigation croisée** sitemap ↔ wireframe (« Find page in wireframe »).
23. **Preview live no-reload** + **toolbar select/edit-inline/annotate/comment** dans la preview.
24. **Sélection d'élément → contexte du chat** (épingle + miniature) pour « modifier cet élément ».
25. **Gate d'interaction agent↔preview** + **auto-vérif DOM par l'IA** (= boucle GF-1 native via MCP).
26. **Chips d'actions rapides** post-génération (Remplacer textes / Ajouter formulaire / Optimiser SEO).
27. **Modes Plan / Build** dans le chat (raisonner vs exécuter). **Références** entre projets (@/Add reference).
28. **Inspecteur 3 onglets** (Style / Settings / Interactions) + **variables** + **CMS/champs** + **assets**
    + **library extensible (marketplace)** — idées Webflow « pro », à prendre en version simplifiée.

## État du brief
- [x] Message 2 : Relume (principe IA-opt-in, 4 panneaux, Add/catégories, scope projet/page).
- [x] Message 3 : vue Wireframe (canvas zoom 8→200 %, inspecteur section, recherche+preview).
- [x] Message 4 : Style Guide + Design + Export + Brand-fixe + mode Lovable + re-scan exhaustif.
- [x] Message 5 (« Suite et fin ») : Lovable interactif (preview live, toolbar, sélection→chat, gate+auto-vérif,
      chips, plan/build, références) + anatomie Webflow (inspecteur 3 onglets, variables, CMS, assets, library marketplace).
- [x] **Brief CLOS** (« J'ai terminé »).

## Cadrage TRANCHÉ par Simon (2026-06-29) — pilote l'architecture
### Audience & modèle
- **Interne, SaaS-ready by design** : l'équipe waimia compose/industrialise les sites clients MAINTENANT.
  Pas de self-serve client en v1, MAIS archi qui **n'interdit pas le SaaS** plus tard → 0 dette auth/multi-tenant
  aujourd'hui, mais points d'extension prévus.
- **App forkable = boilerplate vendable** : le repo entier est un **boilerplate de site web** installable/forkable ;
  les fonctionnalités builder/studio sont pensées comme des **« plugins standalone »** — en réalité intégrées au
  repo et parfaitement connectées (pas un vrai découplage runtime), mais conçues comme des **extensions** qu'on
  pourrait à l'avenir mettre en **upsell/abonnement** (services complémentaires). v1 = simple, mais **bonnes bases
  pour éviter un gros refacto** plus tard.
- **UX/UI irréprochable dès le départ**, pour l'équipe interne ET pour **les clients de l'agence qui héritent**
  d'un projet bâti avec le système → doit être **intuitif, non chaotique**, niveau des apps citées (Relume/Webflow/Lovable).

### Contraintes techniques (non négociables)
- **Git-as-DB** : « base de données » = **fichiers JSON versionnés dans git**, PAS une vraie BDD. Save = commit
  (pattern `ds-save-dev.mjs` / doc 47). 0 format parallèle.
- **SSG par défaut** (Astro `output: 'static'`), **SSR/ISR ciblé** uniquement pour les sections qui en ont
  vraiment besoin. **Plug-and-play Vercel/Netlify** (« buy and play », simple/efficace/complet).

### Périmètre v1 (les 4 capacités + LE différenciateur)
- **Builder WYSIWYG quasi-complet** (Webflow/Wix) mais **simplifié**, à la **croisée Relume × Webflow**.
- ⭐ **DIFFÉRENCIATEUR vs Relume** : Relume limite l'édition à SON catalogue/wireframes/templates. **Nous, on va
  plus loin** : l'utilisateur **crée ses propres composants/sections**, les **utilise dans une page**, crée des
  **variantes/déclinaisons** et de **nouveaux éléments dans des catégories** servies par la **library** (= mode
  builder Webflow). C'est le cœur produit.
- **4 capacités v1, toutes retenues** : (1) **Builder manuel** (canvas + catalogue), (2) **Style guide shufflable**,
  (3) **Chat-IA in-app (MCP)**, (4) **Pilotage IA externe** (Claude/OpenAI via MCP).

### Base technique
- **Refonte propre complète** : nouvelle archi builder (UI + moteur), on ne **garde que les artefacts** (sections
  JSON, tokens DS, MCP déjà GF-1'd) — pas l'UI existante de `BuilderCanvas.tsx`.

→ Architecture détaillée : **`docs/specs/06-builder-architecture.md`** (en cours de rédaction, post-grounding).
