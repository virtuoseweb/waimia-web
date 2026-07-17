# 14 — Carte mot-clé · intention · conversion par page (architecture V8, 2026-07-14)

> **Source de vérité du chantier « version finale exploitable »** (mandat Simon 2026-07-14 :
> qualité > quantité, un mot-clé/intention par page, citable par les IA, optimisée conversion,
> noindex accepté, sitemap final propre). Construite depuis l'état RÉEL du build (97 URLs du
> sitemap, extraction title/H1/H2/mots/CTA) + 4 analyses parallèles (money/contenus/preuve/périphérie).
> **Succède au volet « état par page » de `strategy/09`** (périmé : ancienne archi silo Acquérir).
> Méthode keyword : `strategy/03`. Doctrine double couche (H1 métier, « système » = marque) : `strategy/10 §0bis`.
> Inventaire brut : régénérable par script (extraction dist), non commité.

## 0. Règles transverses (appliquées à toute page)

1. **1 page = 1 mot-clé primaire + intention unique.** L'exact-match appartient à la page la plus
   commerciale du cluster ; les contenus prennent les variantes informationnelles.
2. **GEO** : phrase d'équivalence citable avec l'entité Waimia près de l'intro + FAQ autonomes.
3. **Conversion** : 1 CTA primaire par page (diagnostic/audit gratuit), chemin de lecture qui y mène.
4. **Index-on-quality** : une page passe `index` seulement si son contenu mérite sa place
   (règle secteurs déjà de facto : `index` ⟺ `caseRef` client réel ET cohérent avec l'ICP).
5. **Cohérence noindex↔sitemap** : toute page noindex sort du sitemap (`sitemap-noindex-exclude.ts`).

## 1. Money pages (home + 20 /services + /tarifs) — verdicts

| Page | kw primaire | Note | Action | Prio |
|---|---|---|---|---|
| `/` | studio IA PME · intégration IA Montpellier | fort | garder · activer le tab « Système commercial » (résidu « bientôt » désync) | P1 |
| `/services` (hub) | solutions IA PME | terne | réaligner (« Deux offres » = ancienne archi) + title kw | P1 |
| `/services/systeme-acquisition` | générer des leads B2B qualifiés | ok | dé-énumérer le title (liste les kw des enfants) | P1 |
| `/services/systeme-commercial` | développement commercial B2B | ok | dé-énumérer title · cohérence home (tab) | P2 |
| `/services/systemes-operationnels-ia` | automatiser ses processus avec l'IA | ok | dé-énumérer title · frontière vs module automatisations | P1 |
| `/services/site-web-ia` | site web IA / création site internet IA | fort | + FAQ | P1 |
| `/services/seo-geo-contenu` | agence SEO GEO PME / être cité par les IA | fort | + FAQ | P1 |
| `/services/landing-pages-tunnels` | landing page qui convertit / tunnel | fort | + FAQ | P2 |
| `/services/maintenance-growth` | maintenance site web PME / forfait TMA | ok | retitrer (« growth » jargon) + FAQ | P3 |
| `/services/prospection-automatisee` | prospection automatisée B2B / cold email | fort | + FAQ | P1 |
| `/services/crm-scoring-routing` | CRM lead scoring / routing des leads | ok | + FAQ | P2 |
| `/services/sequences-de-suivi` | relance automatisée / lead nurturing | ok | + FAQ | P3 |
| `/services/agents-ia` | agents IA pour PME | fort | + FAQ | P1 |
| `/services/integration-claude` | intégration Claude entreprise | fort | + FAQ (protégée : les contenus Claude ne doivent pas lui prendre son kw) | P1 |
| `/services/automatisations` | automatisation PME / automatiser processus métier | ok | H1 différencié du hub ops + FAQ | P1 |
| `/services/consultant-ia-claude` | consultant IA Claude / conseil IA PME | ok | frontière cadrage vs déploiement (integration-claude) + FAQ | P2 |
| `/services/applications-internes` | application métier sur mesure / outil interne | ok | + FAQ | P2 |
| `/services/donnees-reporting` | reporting automatisé / centraliser ses données | ok | + FAQ | P2 |
| `/services/wordpress` | création/refonte site WordPress / headless | fort | + FAQ | P2 |
| `/services/webflow` | site Webflow PME | ok | + FAQ | P3 |
| `/services/sur-mesure-headless` | site sur mesure headless | ok | + FAQ | P3 |
| `/services/publicite-en-ligne` | publicité en ligne PME (Google Ads / Meta Ads PME · publicité IA) | ok | index · cartographiée F1 2026-07-17 (créée 2026-07-16) · frontière : régie budget payant ≠ landing-pages-tunnels (post-clic) ≠ systeme-acquisition (parent) | P3 |
| `/tarifs` | prix création site web PME / tarif site IA 2026 | **terne** | **refondre** : title/H1 zéro kw, H2 jargon banni, prix désync (grilles canoniques = tarifs.json + pages services) | P1 |

### 1bis. Pages enfants de modules (déclinaisons kw-first, créées 2026-07-16)

Validé Simon (sélectif kw-first · modèle SWI 20 sections · pages outils sur outils réels · mise en
ligne « tout maintenant »). Chaque enfant reprend le pricing de SON parent (0 nouveau prix) et une
frontière kw explicite (formalisée en FAQ). Exclusions assumées : « Claude Code équipes »
(cannibalisation du cluster Claude fusionné) · « dashboard sur mesure » (kw faible vs parent).

| Page | Parent | kw primaire | Frontière avec le parent |
|---|---|---|---|
| `/services/seo-local` | seo-geo-contenu | référencement local PME | local (GBP, pages villes, NAP) vs production SEO+GEO globale |
| `/services/referencement-ia` | seo-geo-contenu | référencement IA / être cité par ChatGPT | offre GEO pure (citabilité) vs production complète ; blog = guide, comparatif = définition |
| `/services/landing-page-google-ads` | landing-pages-tunnels | landing page Google Ads | page dédiée trafic payant vs tunnel complet |
| `/services/automatisation-n8n` | automatisations | automatisation n8n / agence n8n | LE cas n8n (Zapier secondaire) vs parent tool-agnostique |
| `/services/agent-support-client` | agents-ia | chatbot IA service client | LE cas support vs agents en général |
| `/services/mvp-saas` | applications-internes | développement MVP SaaS | produit vendable (marché) vs outil interne (équipe) |
| `/services/cold-email-b2b` | prospection-automatisee | cold email B2B | LE canal email (délivrabilité, Lemlist/Instantly/Apollo/Pharow) vs système multicanal en abonnement |
| `/services/integration-crm` | crm-scoring-routing | intégration HubSpot / Pipedrive PME | mise en place/assainissement CRM vs scoring+routing |
| `/services/relance-devis` | sequences-de-suivi | relance devis automatique | LE cas relance devis vs toutes les séquences |

Trous transverses money : **aucune FAQ sur les 12 pages système** (levier GEO n°1) ·
ossature identique des 12 pages (8 mêmes H2, risque templated content, varier en P2) ·
les pages info doivent nourrir les 5 piliers (site-web-ia, seo-geo-contenu, agents-ia,
prospection-automatisee, integration-claude) par maillage, pas ranker à leur place.

## 2. Contenus (/ressources · /blog · audits)

| Page | kw primaire | Note | Action | Prio |
|---|---|---|---|---|
| `/ressources` | ressources IA PME | ok | garder | P3 |
| `/ressources/{comparatifs,guides,diagnostics}` (hubs) | — | — | noindex déjà, RAS | — |
| `/ressources/outils` (hub) | outils IA gratuits PME | terne | **noindex FAIT (F1 2026-07-17)** : hub thin (122 mots, 2 items) ; filles calculateur-roi-ia + score-maturite-ia restent indexées · réversible si enrichi 3-4 outils | ✅ |
| `/ressources/outils/calculateur-roi-ia` | calculateur ROI IA | ok | title qualifié (pas « · Outils Waimia ») | P3 |
| `/ressources/outils/score-maturite-ia` | test de maturité IA | ok | title qualifié · ~~reçoit le canonical du cluster maturité~~ **cross-canonical ABANDONNÉ (F1 2026-07-17, cf §6 addendum)** : canonical auto-référent conservé (intention outil ≠ contenu) | P3 |
| `/ressources/diagnostics/maturite-ia` | niveaux de maturité IA | ok | intro contenu qui pointe l'outil (dédup « maturité IA » par **angle + lien interne**, PAS par canonical croisé, cf §6 addendum 2026-07-17) | P3 |
| `/ressources/diagnostics/claude-pme` | PME prête à déployer Claude (readiness) | ok | garder · dé-commercialiser title (cluster Claude) | P1 |
| `/ressources/diagnostics/referent-ia` | référent IA entreprise | ok | garder | P3 |
| `/ressources/diagnostics/site-web-intelligent` | diagnostic site web | ok | angle unique (jamais « site web intelligent » nu, réservé à site-web-ia) | P2 |
| `/ressources/academy` | diagnostic IA gratuit entreprise (email) | ok | garder (repositionné 2026-07-14) | — |
| `/ressources/guides/claude-pme` | déployer Claude PME (how-to 90 j) | fort | **pilier how-to : absorbe la checklist** | P1 |
| `/ressources/guides/checklist-deploiement-claude` | — | — | **fusionner dans guides/claude-pme + 301** | P1 |
| `/ressources/comparatifs/*` (4) | vs-intents distincts | fort | garder | P3 |
| `/blog` + 7 billets | intents info distincts | fort/ok | garder · pillar `essai-pillar-ia-pme-2026` : H3→H2 + titre dupliqué à retirer | P2 |
| `/audit-ia-pme` | audit IA gratuit PME | fort | garder (endpoint conversion, 47 critères absorbés) | — |
| `/audit-site-web-intelligent` | audit site web / conversion | fort | garder (PAS de fusion : catégories/kw distincts) | — |

**Cluster critique « déployer Claude »** (5 pages) : guide = how-to pilier, diagnostic = readiness,
checklist = fusionnée, expertise-claude = autorité, `/services/integration-claude` = SEULE page
sur le kw commercial ; les 3 contenus pointent vers elle en CTA.

## 3. Preuve · secteurs · local

| Page | kw primaire | Note | Action | Prio |
|---|---|---|---|---|
| `/cas-clients` + 5 cas réels | cas clients agence IA | fort | garder (desangles = meilleur cas SEO local ; isabelle-diaz : chiffres quand dispo) | — |
| `/cas-clients/resultats` (hub) | — | terne | **neutraliser le sous-arbre : cannibalise /cas-usages, hub à moitié vide → 301** | P1 |
| `/cas-clients/resultats/plus-de-leads` | — | terne | 301 → `/cas-usages/generer-plus-de-leads` | P1 |
| `/cas-clients/resultats/reduction-temps-marketing` | — | terne | 301 → `/cas-usages/reduire-reporting` | P1 |
| `/cas-usages` + 5 pages | outcome-intents (« générer plus de leads »…) | fort | garder · maillage cas-usage ↔ service verrouillé | P2 |
| `/secteurs` (hub) | secteurs IA par métier | ok | garder | — |
| `/secteurs/{e-commerce,liberal-independant}` | [service] pour [métier] | fort | garder index (caseRef réels) | — |
| `/secteurs/startup-logiciel` | site pour startup/éditeur | ok | **noindex temporaire FAIT (F1 2026-07-17)** : amploi = RH/santé ≠ SaaS (hors ICP) · réindexable dès un vrai cas éditeur/SaaS · hors sitemap | ✅ |
| 9 autres secteurs | — | — | noindex déjà (règle caseRef) · diversifier metricsHero cloné avant toute réindexation | P3 |
| `/implantations/montpellier` | agence web / agence IA Montpellier | ok mais bridé | **+ JSON-LD LocalBusiness/ProfessionalService + NAP + GBP** (inputs Simon : téléphone, lien GBP) | P1 |
| `/implantations/bordeaux` | — | — | noindex fait (2026-07-14), réversible sur NAP réel | — |

## 4. Périphérie — index/noindex tranchés

**Restent indexées (14)** : `/agence`, `/agence/methode`, `/manifesto`, `/equipe`,
`/equipe/simon-beros` (pilier E-E-A-T), `/expertise-claude` (pilier), `/sources-methodologie`,
`/technologies`, `/contact`, `/demonstrations/avant-apres`, `/demonstrations/integration-claude`,
`/cgv`, `/mentions-legales`, `/politique-confidentialite` (légal indexable = convention, 0 effort SEO).

**Passent noindex + hors sitemap (4 nouveaux)** : `/agence/about` (quasi-dupe de /agence),
`/partenaires` (dupe de /technologies), `/plan-du-site` (nav pure), `/demonstrations/site-web-intelligent`
(concurrence frontale avec la money page site-web-ia).

**Incohérence noindex↔sitemap à corriger** : `/lab/home-d`, `/lab/home-e`, `/lab/home-e-method`,
`/demonstrations` (hub) sont noindex dans le HTML mais PRÉSENTS dans le sitemap → les ajouter
à `sitemap-noindex-exclude.ts`.

## 5. Plan de passes (vagues)

- **Vague 1 (P1, en cours 2026-07-14)** : tarifs refondu · FAQ AEO sur les 16 pages services ·
  titles hubs dé-énumérés + hub /services réaligné + frontière automatisations/ops · fusion
  checklist→guide Claude + dé-commercialisation des titles contenus Claude · 301 resultats/* ·
  hygiène noindex/sitemap (4 flips + 4 exclusions lab/démos) · tab home « Système commercial » activé ·
  pillar H3→H2.
- **Vague 2 (P2)** : Montpellier LocalBusiness (inputs Simon : téléphone, GBP) · cluster maturité
  (canonical) · cluster SWI (angles uniques) · cas startup-logiciel · variation d'ossature des 12 pages
  système · frontière consultant/integration · titles outils qualifiés · maillage piliers depuis les contenus.
- **Vague 3 (P3)** : retitrages mineurs (maintenance-growth), habillage E-E-A-T ternes (equipe si
  mono-auteur), metricsHero sectoriels, enrichissements cas (chiffres isabelle-diaz).
- **Post-site (backlog)** : GA4 + Bing Webmaster Tools + autres trackers. Décision Simon 2026-07-15 :
  GA4 « pas urgent », pas d'intégration ni de boucle d'auto-amélioration IA pour le moment.
  ✅ **GSC : FAIT 2026-07-15** — propriété domaine `sc-domain:waimia.com` vérifiée (TXT DNS), sitemap
  `sitemap-index.xml` soumis (l'ancien `sitemap_index.xml` de 2024, 0 pages, supprimé). Premier fetch
  Google challengé par la mitigation DDoS Vercel (retombée depuis, curl 200) → re-vérifier sous
  24-48 h que l'état passe à « Opération effectuée » et que les ~97 pages se découvrent.

## 6. Journal

- 2026-07-14 · v1 : carte initiale (97 URLs indexables, 4 analystes) + vague 1 lancée.
- 2026-07-15 · arbitrages Simon : régie growth = 99 €/h NON dégressif partout (sweep 12 fichiers, fin
  du dégressif maintenance-growth) ; onglet SEO/GEO /tarifs = 10 h/990 € · 20 h/1 980 € · pilotage
  99 €/h ; GSC branché (sitemap) ; GA4 explicitement reporté.
- 2026-07-15 · alignement modèle SWI (commit `fc437e1e`, directive Simon « pourquoi wordpress pas sur
  le modèle exact ») : les 5 dernières pages services hors modèle passent aux 20 sections exactes de
  site-web-ia (wordpress 9→20, webflow 9→20, sur-mesure 10→20, consultant-ia-claude 18→20,
  maintenance-growth 17→20). 18/18 pages services conformes. Contenu préservé/redistribué, angles kw
  intacts, avis/cas réutilisés des sœurs, stat Afnic 61 % réinjectée en proof-bar, pricing canonique
  inchangé (sur-mesure : priceRange 3-15 k réaligné sur la grille canonique 2-10 k).
- 2026-07-16 · 9 pages enfants de modules créées (§1bis) + rangées « Déclinaisons » en col 3 du menu.
  Arbitrages Simon : sélectif kw-first, modèle 20 sections, pages outils OK sur outils réels, mise en
  ligne « tout maintenant » (assumé malgré le risque de dilution au lancement, compensé par maillage
  parent↔enfant et couverture GEO/AIO). 27 pages services + 3 hubs au total.
- 2026-07-17 · **lot F1 « hygiène d'index » (fiche décision 0015, exécuté)** :
  - **(a) Cross-canonical du cluster maturité ABANDONNÉ.** Le plan P2 initial (score-maturite-ia
    « reçoit le canonical du cluster maturité », maturite-ia « dédoublonner ») est retiré : les deux
    pages portent des intentions distinctes (test/outil interactif vs contenu « niveaux de maturité »),
    kw non identiques, 0 duplication de corps mesurée (cf audit d-transverse §2). Un rel=canonical
    croisé dé-indexerait à tort une page utile. Décision : chaque page garde son **canonical
    auto-référent** ; la dé-duplication passe par la différenciation d'angle + un lien interne
    contenu→outil, PAS par le canonical. (Lignes 80-81 du §2 annotées, passées P3.)
  - **(b) Cartographie `/services/publicite-en-ligne`** (créée 2026-07-16, absente de la carte) :
    kw primaire **« publicité en ligne PME »** (H1 réel « Publicité en ligne pour PME » ; title
    « Publicité en ligne pour PME · Google Ads, Meta et formats IA, pilotés et mesurés »), intention
    acquisition/transactionnelle, kw secondaires « Google Ads PME » / « Meta Ads PME » / « publicité IA ».
    index (seo.noindex:false). Frontière : régie et pilotage de budget payant, distincte de
    landing-pages-tunnels (conversion post-clic) et de systeme-acquisition (parent générique). Ligne
    ajoutée au tableau §1.
  - **(c) Deux pages passées noindex par F1** (règle §0.4 index-on-quality + §0.5 cohérence sitemap) :
    `/secteurs/startup-logiciel` (caseRef amploi = RH/santé, hors ICP SaaS → preuve incohérente ;
    réindexable dès qu'un vrai cas éditeur remplace le caseRef) et `/ressources/outils` (hub thin,
    122 mots, 2 items ; les filles calculateur-roi-ia + score-maturite-ia RESTENT indexées). Les deux
    ajoutées à `sitemap-noindex-exclude.ts`. En complément : 3 redirections 301-vers-404 traitées
    (`/careers` supprimée → 404 propre ; 2 slugs blog `migrated-*` re-ciblés vers `/blog`, car le
    catch-all `/ressources/blog/[...slug]` aurait sinon recréé un 301-vers-404) ; la grille du hub
    `/secteurs` ne lie plus que les secteurs indexés (filtre `!seo.noindex`) et le helper
    `internal-mesh.ts` ne maille plus aucun secteur noindex (conseil/agence/comptabilite remappés vers
    batiment/e-commerce/liberal-independant/therapeutes).
