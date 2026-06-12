# 25 — Refonte éditoriale : cas client (anti-pavé) + template légal standard

> Initiative 2026-06-09. Trigger Simon (verbatim) : « visualise certain template avec playwright problématique pour déceler les problèmes d'affichage d'ui/ux et se qui est incohérent déduis ce qu'on devrait créer en plus dans le catalogue, créer de la variance dans les composants pour proposer des mises en page un peu différente et éviter de la fatigue puis ensuite fait la migration avec la refonte visuelle les nouvelles sections etc.. pour avoir un exemple complet + template standard avec nos variables pour les pages légales. Il faut aussi améliorer la partie content des pages cas client / étude de cas pour éviter que le content s'affiche dans un bloc effet pavé sans être travaillé / design afin que cela soit plus esthéthique »

## 1. Diagnostic empirique (GF-1 sur le diagnostic — Playwright 1440×900, `getComputedStyle`)

### 1.1 Cas client `/cas/plateau` — « effet pavé » + husk vide (CONFIRMÉ)
| Symptôme | Mesure DOM | Cause racine |
|---|---|---|
| **Pavé** | `.case-context` = **5 `<h2>` + 4011 chars** déversés dans une colonne 1fr étroite | `src/pages/cas/[...slug].astro:122-126` : tout `<Content />` (MDX long-form) dumpé brut dans le slot `context`, zéro rythme éditorial |
| **Husk vide 572px** | `.case-approach` = 572px de haut, **36 chars**, `MethodTimeline` 1 item vide | `cas/[...slug].astro:113` passe **`steps={[]}`** → timeline vide |
| Bloc noir « vide » | `.case-key-metrics` 426px, valeurs €2.4M/22h/10wk **présentes** | Artefact reveal (opacity 0 en capture statique) — PAS un bug |
| Chiffres enterrés | `34%→61%`, `48h→<2min`, `4%→0,3%` noyés dans `<p>` | Aucune mise en valeur des avant→après |

### 1.2 Légal `/agence/governance` — template plat non catalogué
- Corps présent (`.trust-sections` = 1376 chars, 6 sections, TOC 6 items, opacity 1) — le « vide » screenshot = artefact reveal.
- Le masthead est **inline** dans `TrustLegalTemplate.astro` alors que `TrustLegalSection.astro` (catalogué) l'a **déjà extrait** → duplication, template hors-catalogue.

### 1.3 Inventaire (GF-4 — éviter de recréer)
- **8 composants éditoriaux** existent (`editorial/` : Callout, Dingbat, DropCap, EditorialTable, KeyMetric, PullQuote, Sidenote, Timeline) — **non utilisés** par le MDX.
- **64 sections cataloguées**, dont `problems-grid`, `stat-block`, `deliverables-grid`, `method-timeline`, `tech-stack-band`, `related-cards-band`, `pull-quote-block`, `problem-statement`, `comparison-table`, `TrustLegalSection`, `WelcomeSection`, `ListIndexSection`.
- **Conclusion** : le pavé n'est pas un manque d'outils mais un **défaut de composition** (contenu brut au lieu de sections cataloguées) + le bug `steps=[]`.

## 2. Design (Phase 1) — verrouillé

| Besoin | Décision |
|---|---|
| 3 goulots → cards | **composer** `problems-grid` |
| 4 agents livrés | **composer** `deliverables-grid` |
| Approche → étapes | **alimenter** `method-timeline` (fixe le husk) |
| Stack / cas connexes / CTA | **composer** `tech-stack-band` / `related-cards-band` / `cta-final` |
| Énoncé contexte | **composer** `problem-statement` (statement + stats) |
| **Avant→après magnifié** | **CRÉER `metric-shift`** ← seule section genuinely manquante (la variance) |
| Légal | **migrer** `TrustLegalTemplate` → `TrustLegalSection` catalogué |

Principe : **0 nouveau token CSS** (contrat `docs/24`), gate `check-token-purity` actif. « Exemple complet » = Plateau recomposé en **séquence de sections cataloguées** (cible composable du repo) au lieu du dump MDX.

## 3. `metric-shift` (W1 — section neuve)
Schéma `type:'metric-shift'` : `kicker?/h2?/lede?` + `shifts[2..6]{label_fr/en, before, after, delta_fr/en?, trend?}` + `background: paper|paper-2|ink`. Layout : rangées hairline, lecture horizontale `before`(muted) → `after`(display italic magnifié) + delta mono accent. 4 touchpoints synchronisés. Détail = brief worker W1.

## 4. Cas client (W2) — composition cible Plateau

Refonte `src/components/templates/CaseStudyTemplate.astro` + `src/pages/cas/[...slug].astro` (+ `en/`) + frontmatter `src/content/cases/plateau.mdx` + schéma collection `cases`. Le `<Content/>` MDX brut cesse d'être déversé dans `context` ; les sections structurées sont **pilotées par frontmatter** (champs optionnels → dégradation gracieuse pour les autres cas).

**Séquence cible Plateau** (mapping depuis le contenu MDX actuel) :
1. `HeroCaseStudy` (inchangé) — h1 + specs.
2. `problem-statement` — framing : statement « Six mois de croissance avaient exposé trois goulots structurels » + stats [`18 M€ ARR`, `47 employés`, `4 RevOps`].
3. `problems-grid` — 3 goulots :
   - 01 Réconciliation paiements — « 6 h/sem de matching Stripe↔HubSpot, 4 % d'erreur → relances erronées à des clients à jour ».
   - 02 Triage leads — « 127 inbound/mois, 3 h/jour/AE, 48 h de délai 1er contact (concurrents < 4 h) ».
   - 03 Dunning — « séquence 100 % manuelle, aucune personnalisation, 34 % de récupération < 30 j ».
4. `method-timeline` — phases réelles (fixe le husk) :
   - Audit (S1) — cartographie flux HubSpot↔Stripe↔Salesforce ; 28 h/sem automatisables (22 sur les 3 goulots) ; audit données (3 200 contacts, 9 % doublons, 14 champs vides) ; nettoyage J3 avant tout code.
   - Sprint MVP (S2-5) — build des 3 agents.
   - Hardening + adoption (S6-10).
5. `deliverables-grid` — 4 livrables (tags = modèle) :
   - Agent réconciliation finance — Sonnet 4.6 + MCP Stripe + dbt, toutes les 4 h, 97 % auto.
   - Agent triage — Opus 4.7, score ICP, route N1/N2/escalade en 8 s, 1er contact < 1 min.
   - Agent dunning — Sonnet 4.6 + MCP HubSpot, séquences 4 étapes personnalisées.
   - Trace auditable — décisions loguées/signées, export CSV/JSON, AI Act Art. 12.
6. `metric-shift` (NEW) — 3 avant→après :
   - Récupération dunning `34 %` → `61 %` (+27 pts, up).
   - Délai 1er contact `48 h` → `< 2 min` (−99 %, down).
   - Erreur réconciliation `4 %` → `0,3 %` (−93 %, down).
7. `stat-block` (rows-hairlines ou grid-3) — `€2,4 M` pipeline · `22 h`/sem (0,55 ETP) · `10 sem` time-to-prod.
8. `pull-quote-block` (centered) — « L'équipe finance a arrêté de recevoir des appels de clients relancés à tort. ».
9. `tech-stack-band` — stack (depuis frontmatter `stack`).
10. `related-cards-band` — cas connexes.
11. `cta-final` (inchangé).

Champs frontmatter `cases` à ajouter (tous optionnels, schéma collection) : `bottlenecks[]`, `phases[]` (ou `steps[]`), `deliverables[]`, `shifts[]`, `pullQuote{fr,en}`, `contextStatement{fr,en}` + `contextStats[]`. Parité **FR + EN** (route `en/cas/[...slug].astro`). Build vert + `astro check` 0 err + GF-1.

## 5. Légal (W3) — template standard
Migrer `TrustLegalTemplate.astro` pour **consommer** `TrustLegalSection.astro` (déjà extrait : masthead + TOC + slot `sections`) au lieu de sa copie inline (lignes 77-121). Pattern identique aux 14 migrations précédentes (`docs/22`). Props mappées : `kickerFr/En`, `revisedAt`, `version`, `sections[]` + slots `headline`/`lede`/`sections`. Vérifier GF-1 parité byte sur `/agence/governance`, `/agence/trust-center`, `/agence/docs` (FR + EN). « Avec nos variables » = 0 nouveau token, tokens existants seulement.

## 6. Orchestration (GF-2) + protocole GF-1
Pipeline séquentiel (zéro collision git, rule 45 §worktree-isolation) :
- **W1** `feat/metric-shift-section` → GF-1 catalogue (`/preview/metric-shift`) → merge main.
- **W2** `feat/case-study-refonte` (off main+W1) → GF-1 `/cas/plateau` (FR+EN) → merge.
- **W3** `feat/legal-template-standard` (off main) → GF-1 légal ×3 → merge.

GF-1 par page : Playwright 1440×900, screenshot above-fold + `getComputedStyle` H1/CTA (opacity≠0, transform neutre) + 0 erreur console, sur preview Vercel (ou serve-dist parité prod `node scripts/serve-dist.mjs --port 4399 --root dist/client`). Merge sur `main` seulement après GF-1 (prod `waimia.com`).
