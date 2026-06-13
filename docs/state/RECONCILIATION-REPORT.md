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
