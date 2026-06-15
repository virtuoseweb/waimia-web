# RECONCILIATION-REPORT — intention (plan maître) ↔ réalité (git)

> Réconciliation du `docs/state/02-plan-execution-claude-code.md` (71 tâches P0→P4) avec git.
> Méthode = rule 09 : chaque `[x]` est adossé à un commit **vérifié présent dans l'historique de HEAD**
> (`git merge-base --is-ancestor <sha> HEAD` + `git show --stat` pour le périmètre). Aucun sha inventé.
> Date : 2026-06-13. Source des hints = `night-sessions/2026-06-12.md` + `SR-2026-06-11-55-HANDOFF`.

## Bilan chiffré
- **16 tâches cochées `[x]` avec preuve commit** (dont 2 déjà `[x]` au préalable, P0.0-b + P0.2-J, à qui on a ajouté le tag machine).
- **55 tâches laissées `[ ]`** (non faites, partielles, ou différées).
- **0 case `[x]` sans tag** ; **0 sha inventé** ; **0 tiret cadratin net-nouveau** (16 `—` dans les lignes éditées = pré-existants dans les titres, préservés).

## Tâches cochées `[x]` (prouvées)

| id | statut | commit | gf1 | justification (1 ligne, vérifiée git) |
|---|---|---|---|---|
| P0.0-b | [x] | `417eff6` | n | arch/03 réécrit en config Astro statique (`git show 417eff6` touche `architecture/03`) ; résidus grep = manifestes/archive légitimes. |
| P0.0-e | [x] | `7f286ab` | n | Hygiène git (70→6 branches, 0 worktree parasite) ; travail git-only, preuve = log état dans le rapport nuit. Commit = doc qui acte la résolution. |
| P0.1-a | [x] | `0113bb1` | y | Merge P0.1 (worker `369978a`) retire href `microsoft-power-platform` de partners.ts/section-demos.ts/mega-menu.ts. Build+3 gates PASS. |
| P0.1-b | [x] | `0113bb1` | y | Même commit : champ Stripe `.optional()` → CourseDetailTemplate bascule état « bientôt dispo », 0 lien placeholder live. |
| P0.1-c | [x] | `0113bb1` | y | Même commit : diagnostic-stages + service-catalog-list + hero-team slugs fictifs résorbés ; check-content-refs/form-endpoints verts. |
| P0.2-D | [x] | `b818142` | y | Merge P0.2-D : 8 routes agence/démos supprimées + fausses certifs ISO/SOC2/RGPD retirées (risque légal). Build+gates+0 certif dist+Playwright. |
| P0.2-F | [x] | `e453831` | y | Merge P0.2-G+F : école supprimée (3 cours stub + routes + nav), sections basculées `consumers:[]`. `/ecole`→404, build Complete!. |
| P0.2-G | [x] | `e453831` | y | Même merge : blog 21→6 in-silo (15 retirés, 4 liens repointés). `/ressources/blog` rend 6 articles, gates verts. |
| P0.2-H | [x] | `2c02956` | y | Merge P0.2-H : contenu cases(4)/secteurs(3)/technologies-stubs(2) retiré, composants conservés (anti-orphelin). `/cas/caserne`→404, build cache-purgé. |
| P0.2-I | [x] | `d99d403` | y | Merge P0.2-I : 25 routes `/en/**` + switcher + claim bilingue retirés, hreflang/sitemap FR-only, infra i18n conservée. Build Complete!. |
| P0.2-J | [x] | `7f286ab` | n | No-op documenté (GF-4) : cibles déjà supprimées (R0) ou gardées exprès (`cas`/`secteurs`/`courses`). Forcer la purge = casser des assets. note=no-op. |
| P0.6-a | [x] | `c19a2b4` | y | Merge P0.6 (feat `118dbb3`, proof `65edc90`) : about → studio solo (Paris/Genève/agence-10 retirés). Playwright /agence H1 « studio solo » visible. |
| P0.6-b | [x] | `c19a2b4` | y | Même merge couvre manifesto/contact/equipe/simon-beros (chiffres+adresses+bio assainis) ; `agence/methode` déjà honnête (0 résidu ancienneté, vérifié grep). |
| P0.7-a | [x] | `b2e9a7d` | y | `feat(legal)` crée `mentions-legales.astro` (SIREN 890 426 307, éditeur/hébergeur) + lien footer. GF-1 local : H1 visible, 0 404. |
| P0.7-b | [x] | `b2e9a7d` | y | Même commit crée `politique-confidentialite.astro` (RGPD, route réelle sans « de »). GF-1 : rend 200, lien footer OK. |
| P0.8-a | [x] | `8643949` | y | Merge P0.8 (push `b1f1125`) : barème 7900/14900/35000 → 3000€ HT plancher + escalade Growth System ; métriques inventées retirées. Playwright `has3000:true, hasOldPricing:false` + screenshot. |

## Tâches laissées `[ ]` (non prouvées / partielles / différées) — pourquoi

### Partiel (la case du plan couvre PLUS que ce qui est livré → ne pas cocher)
- **P0.2-A — Lot A (collections auto-contenu)** : SEULE la sous-partie **testimonials** est livrée (`a9fd90b`, merge `6db81d2`). Le hint mappait P0.2-A→`6db81d2`, MAIS l'objectif complet de la ligne couvre 6 collections (`comparisons`+`/comparer`, `glossary`+`/glossaire`, `commerce`+`/commerce`, `testimonials`, `personas`, `tunnels`) + recâblages. **Vérifié git/fs : `src/content/{comparisons,glossary,commerce,tunnels}` existent toujours** → Lot A NON terminé. Le rapport nuit lui-même étiquette « P0.2-A **partiel** ». Cocher serait une présomption (rule 09). **Anomalie : hint→commit partiel sur une case de lot complet.**
- **P0.6-c — Réécrire la home focalisée silo** : seul le **recâblage honnêteté** de `index.astro` est fait (testimonials→demo neutre `a9fd90b` ; CASE_FEED→domaines `a668ced`). L'objectif « réécrire la home **focalisée silo Site web IA** + preuves réelles » dépend de P0.3-d (pilier silo, non créé). La home reste structurellement la home générale (CaseCardGrid « domaines », pas un recentrage silo). Le rapport nuit classe ce volet dans le **DIFFÉRÉ**.

### Non commencé (phases entières)
- **P0.0-a, P0.0-c, P0.0-d** : manifestes de finalisation doc / slim CLAUDE.md / nettoyage racine — non exécutés (pas de commit prouvant).
- **P0.2-B, P0.2-C, P0.2-E** : offres secondaires / solutions secondaires / ressources hors silo — **explicitement DIFFÉRÉS** (rapport nuit §⏸️ : destructif, supprime des URLs indexées, demande redirects + arbitrage Simon). P0.2-E dépend aussi de P0.2-A (non fini).
- **P0.3-a/b/c/d** (piliers + money page composable) : non créés. **DIFFÉRÉ** (session coordonnée Simon). Seule l'**infra ancres** a été posée (cf anomalie P0.3-pre ci-dessous), pas les pages piliers.
- **P0.4-a/b** (cannibalisation + maillage silo) : dépend de P0.3-d (absent).
- **P0.5-a/b/c** (méga-menu ancres / footer whitelist / sitemap ~28 URLs) : **DIFFÉRÉ** (dépend des piliers P0.3).
- **P0.9-a..d** (fondations acquisition hors-repo : lead magnet, fiches, GBP, LinkedIn) : non livrés ; b/c/d sont `[?]` action Simon.
- **P0.10-a** (gate de phase finale P0) : impossible tant que P0.2-C/P0.3/P0.4/P0.5 ouverts.
- **P1.* (SEO/GEO), P3.* (acquisition), P4.* (long terme)** : non commencés (le plan les annonce quasi tous `[ ]`). Aucun commit dédié trouvé.

### Design P2 (cas par cas, rien de prouvé sur les déliverables du plan)
- **P2.0 → P2.10** : laissés `[ ]`. Le travail design réel des sessions (SR-55 it.6→12, vagues dark, score 4,5/5) est de la **polish awwwards itérative sur l'état pré-purge**, PAS les déliverables tels que cadrés par le plan P2 (qui sont des tâches d'**investigation/mesure/couverture** : P2.0 triangulation, P2.1 inventaire captures, P2.2 mesure tokens 115→92, P2.3 `@theme inline`, etc.). Aucun commit ne prouve l'objectif spécifique d'une tâche P2.x du plan (ex. P2.2 « tokens 115→~92 » : le rapport nuit mesure 107/121, objectif non atteint ; P2.3 `@theme inline` : explicitement noté « dette, à faire » = non fait). Conforme à la consigne « ne coche que le prouvé ».

### Backlog technique T-1..T-8
- Laissés `[ ]` : aucun commit ne prouve T-1 (migration `SolutionsDetailTemplate`), T-2 (sweep 58 previews), T-4..T-7 ; T-3/T-8 sont `[?]` Simon.

## Anomalies détectées

1. **P0.3-pre (`38d290b`, worker `886916e`) = travail RÉEL sans id dans le plan.** L'infra « ancre optionnelle par section » (`SectionsRenderer` émet un `id` scrollable) a été livrée et mergée (prouvée : build Complete! + page test = 1 span + pages sans `anchor:` identiques + gates verts). **Aucune ligne `P0.3-pre` n'existe dans le plan** → conformément à la consigne, AUCUNE ligne n'a été créée. C'est un pré-requis de P0.3-a/P0.5-a. À intégrer comme sous-tâche P0.3 quand Simon rouvrira le chantier piliers.

2. **P0.2-K et P0.2-L = lots du rapport nuit SANS id dans le plan.** Les « sweeps honnêteté vague 1/2 » (`66ec505`/`dbdf7b8`/`8335d9f`/`db73f77`/`4fdd6a4` + `a668ced`) sont du travail réel et prouvé (~1900 lignes de fabrication retirées, data-roots `proof-points.ts`/`sitemap.ts`/`mega-menu.ts` assainis, GF-1 Playwright home/cas). **Mais le plan ne contient pas de lot P0.2-K/L** (les lots du plan vont A→J). Ce travail d'honnêteté **recoupe partiellement** P0.2-A (testimonials), P0.2-H (résidus chiffrés) et la home P0.6-c, sans cocher aucune case complète. AUCUNE ligne créée (consigne). À tracer si Simon veut formaliser un lot « honnêteté data-roots ».

3. **Hint P0.2-A→`6db81d2` = mapping partiel.** Voir section « Partiel » : le commit ne couvre que les testimonials, pas le lot A complet. Laissé `[ ]`. Ce n'est pas un sha introuvable, c'est un sha qui sous-couvre la case.

4. **P0.7-b — route réelle = `/politique-confidentialite`** (sans « de »), alors que le plan nomme `/politique-de-confidentialite`. Le fichier `src/pages/politique-confidentialite.astro` existe et rend 200 ; coché avec `note=route-/politique-confidentialite`. Le titre de la ligne du plan n'a pas été modifié (hors scope édition format).

5. **Tags `gf1=n` justifiés** : P0.0-b (correction doc, pas de rendu visuel — preuve = grep doc), P0.0-e (git-only), P0.2-J (no-op). Tout le reste des `[x]` = `gf1=y` (build Complete! + Playwright/getComputedStyle ou grep dist documentés dans les rapports).

## Garde-fous respectés
- **0 commande git de mutation** (uniquement `git log`/`show`/`merge-base --is-ancestor` de lecture).
- **0 re-délégation.**
- Édité **uniquement** `docs/state/02-plan-execution-claude-code.md` ; créé **uniquement** ce fichier. README/ORCH-STATE/src/scripts/.claude non touchés.
- Format `<!-- sb commit=<sha7> gf1=<y|n> [note=...] -->` conforme à l'invariant déclaré dans `CLAUDE.md` (board-sync) ; commentaire HTML en fin de ligne, n'altère pas le rendu Markdown.

---

## ADDENDUM 2026-06-15 — réconciliation P0.0 (consolidation + décisions tranchées)

> Registre des décisions de la session de consolidation. Source de vérité unique (rule 59) : ces
> verdicts priment sur toute valeur croisée ailleurs dans les docs. Propagés dans `README.md`
> (compteurs + positionnement) et `state/02` (en-tête business).

### Compteurs canoniques figés (mesurés, GF-4)
| Métrique | Valeur | Mesure | Périme |
|---|---|---|---|
| Types registry catalogués | **156** (45 site, 111 library) | `node scripts/gen-section-manifest.mjs` | 58 / 67 / 87 / 123 / 147 / 151 |
| `src/components/sections/*.astro` | **128** | `ls sections/*.astro \| wc -l` | « ~68 » / « 123 » (CLAUDE.md daté) |
| Templates `src/components/templates/*.astro` | **13** | `ls templates/*.astro \| wc -l` | « 17 » / « 18 » |
| `src/styles/tokens.css` | **278 lignes** | `wc -l` | « 110 » / « 115 » / « 121 » |

### 7 décisions tranchées (graver, propager)
1. **Marque = « studio IA » (build-forward), PAS « cabinet »** (révisé 2026-06-15 après challenge Simon « est-ce le meilleur choix SEO/GEO + on fait pas que du conseil, on intègre/connecte/développe » + recherche marché exa). Raisonnement d'expert tranché :
   - **Le marché 2026 segmente en profils opposés** (sources exa : adevweb, youfeel, developr, agence-ia.com, flowlab) : **cabinet conseil IA** = conseil PUR (audit, stratégie, gouvernance, AI Act, **explicitement pas de build/dev**) · **agence IA** = build + conseil mais **catégorie saturée/générique** · **intégrateur IA** = connecte les modèles aux outils métier (CRM/ERP), automatise, déploie · **studio IA** = conçoit sur mesure + **intègre nativement l'IA dans ses livrables** (« en 2026 les meilleurs studios font les deux »).
   - **Pourquoi « cabinet » est écarté** : (a) **GEO/AEO** : un LLM classe « cabinet » dans le segment conseil → Waimia **non citée** quand une PME demande « qui peut intégrer/connecter/développer l'IA dans mes outils » (mauvais segment) ; (b) **justesse** : Waimia conçoit le site (Astro), connecte les données (GSC/GA/CRM), développe, opère (`business/01`) → « cabinet » (conseil-only) sous-représente ; (c) **cohérence voix** : `agence/methode.astro` + `agence/index.astro` disent DÉJÀ « on ne vend pas un cabinet / pas un secret de cabinet » → le worker P0.A avait introduit « Cabinet d'orchestration IA » en **contradiction** avec la voix existante.
   - **Décision** : marque = **studio IA** (build-forward, différencié de « agence IA » saturée, premium, colle à l'actif possédé + site Astro). H1 = « Le studio qui fait tourner votre PME à l'IA. » (« fait tourner » = on opère, remplace « câbler »). Lede restaure la chaîne complète : **« On conseille, on intègre et on connecte l'IA… puis on la met en production »** (re-exprime « câbler » = build/connect positivement, sans l'AI-tell). « orchestration IA » reste l'umbrella full-chain dans la copy.
   - **SEO/GEO en couches** : keywords support = « agence IA », « intégrateur IA », « intégration IA PME », « studio IA » (intent build) ; « cabinet conseil IA » / « audit maturité IA » réservés à la page diagnostic (intent advisory). Appliqué : home title « Studio IA & intégration IA pour PME · Site web intelligent · Montpellier » (commit suit).
2. **Offre cœur = « site web intelligent »** (nom, slug, H1) ; « site web IA » = keyword corps / parenthèse / FAQ.
3. **Titre pilier `/services/site-web-intelligent`** : H1 conservé (`strategy/03 §7:193`) ; `<title>` = `Création de site web intelligent (IA) pour PME | Waimia` ; meta « dès 2 000 € HT, audit gratuit ». Le title reste une **hypothèse jusqu'à GSC** (boucle de validation 4 à 8 semaines).
4. **Pricing = grille 2 000 / 4 000 / 7 000 / 10 000 € + sur-mesure** (plancher 2 000 € HT). Périme 3 000 € / 7 900 € / « dès 1 500 € » / 9k à 12k partout (en-tête `state/02:13` inclus, désormais corrigé).
5. **Cas fictifs ET certifs fictives (ISO / SOC2) SUPPRIMÉS** (validé Simon). Cas réels gardés ou ajoutés : Balzeo, Amploi (sans métrique inventée), Desangles Peinture, Isabelle Diaz (naturopathe).
6. **Cartographie concurrentielle sur DEUX axes** (corrigé 2026-06-15 après 2 clarifs Simon : « on a aussi digidop.com/fr » puis « on a aussi claudin.tech, et là où il est mentionné y'en avait d'autres »). La formulation initiale « concurrent frontal = Vydera, pas Limova/ClaudIn » était **fausse sur les deux bouts** : elle sous-formulait Digidop ET écartait à tort ClaudIn/Limova qui sont les ancres de `business/12`. Réalité :
   - **Axe terrain (site / web-agency)** — cf `strategy/07-benchmark-digidop.md` (benchmark dédié, tableau Waimia vs DigiDop §l.62-70, attaque §l.98) :
     - **Digidop** (`digidop.com/fr`) = frontal sur la création de site : agence Webflow premium primée (Webflow Partner of the Year 2023, Global Leader 2024, +150 clients), autorité forte, mais page `ai-automation` superficielle (IA = service annexe) = **notre attaque frontale** (profondeur IA/agents/MCP vs leur surface).
     - **Vydera** = marque sœur spin-off de Digidop, dédiée GEO/AEO (le 7ᵉ item nav Digidop « SEO & GEO » pointe hors-site vers `vydera.com`).
   - **Axe positionnement-prix** — cf `business/12-competitive-brief.md` (déjà rédigé, riche ; NON un gap comme indiqué par erreur d'abord) :
     - **ClaudIn** (`claudin.tech`) = « par le haut » : « 1er intégrateur Claude Cowork en Europe », équipe ex-McKinsey/Deloitte, grands comptes (juridique/finance/asset management). Gap à prendre : « anthropic-first **mais pour la PME** » (ClaudIn a verrouillé l'angle grand compte → PME orpheline).
     - **Limova** (`limova.ai`, le `.fr` redirige) = « par le bas » : SaaS d'agents IA préfab TPE/PME, 8 agents packagés, 70 à 120 €/mois, self-service.
     - + **ia.agency, Juwa, e-declic, web-ia** (généralistes / locaux, dans le brief).
   - **Zone blanche Waimia** = le quadrant **sur-mesure accessible × spécialisé anthropic-first × PME/local** (vide) : actif possédé (vs location d'agents Limova, vs Webflow verrouillé Digidop, vs facture cabinet ClaudIn), prix d'agence locale, référent Montpellier.
   - À propager en P1 : croiser l'axe terrain (Digidop/Vydera, `strategy/07` untracked à committer) DANS `business/12` (qui ne couvre aujourd'hui que l'axe prix) → une carte concurrentielle unifiée 2 axes.
7. **Compteurs réels figés** (table ci-dessus) : stoppe la divergence 58/67/87/123/151/156.

### Hygiène repo exécutée
- `git mv docs/cartography/*` (23 fichiers) → `docs/archive/cartography/` (périmé 2026-06-04 : 123 tokens, 162 composants ; le README le déclarait déjà « vidé → archive », désormais vrai).
- `git mv docs/audit-refonte/*` (5 fichiers) → `docs/archive/audit-refonte/` (read-only 2026-06-10, supersédés par `audits/03-audit-consolidé-2026-06-15`).
- `node scripts/gen-section-manifest.mjs` régénéré : `src/data/ds-section-manifest.json` + `docs/DS-SECTION-CATALOG.md` re-synchronisés sur les sections fraîchement cataloguées (`agentic-terminal`, `product-reel`, `challenges-grid`, `journey-steps`).
- `README.md` réconcilié : compteurs canoniques, positionnement de marque, carte des dossiers (cartography / audit-refonte marqués archivés), pricing P0.

### Travail committé depuis le 2026-06-13 (à tracer ; non encore coché ligne par ligne dans `state/02`)
> Vérifié présent dans l'historique de `feat/seo-etat-final` (`git log`). Le tagging `[x] + sb commit`
> par id de tâche reste à faire après preuve GF-1 build de chaque chantier (rule 09 : pas de coche sans preuve).

| commit | objet | id `state/02` probable |
|---|---|---|
| `4b9a134` → `dcfc9f1` | récolte DS (product-reel, agentic-terminal, challenges-grid, journey-steps) depuis virtuoseOS | anomalie (récolte catalogue, hors lot P2.x figé) |
| `90b4f9a`, `1faea42` | variantes reveal répondent à `.in`/`.is-visible` + fusion des 2 observers | P1-2 (audit 03) probable |
| `59b6c46` | rename `/realisations` → `/cas-clients` (align URL↔label) | hygiène nav |
| `7a21f8f` | 2 étiquettes provenance relabelées (réutilise champ `provenance`) | cas-clients |
| `96ab645` | refonte hub secteur en page data-driven composable | hub secteur |
| `0243ffd` | hygiène refs `/realisations` → `/cas-clients` | hygiène |
| `64ea51a` | conformité WCAG 2.2 AA (formulaires, contraste ink, landmarks) | P1-3 (audit 03) partiel/complet |
| `08125b0` | rapport audit consolidé 2026-06-15 (5 axes, P0→P3) | `audits/03` |
