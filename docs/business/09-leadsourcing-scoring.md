# Lead sourcing Firecrawl + outil de scoring maison — chantier outil

> Chantier OUTIL à construire (pas un plan stratégique). Spec d'exécution pour Claude Code : code dans `waimia-web`, MCP/API à connecter, critères et formats figés.
> Articule, ne duplique pas : `business/03-plan-prospection` reste la source de vérité du ciblage (ICP/BANT, vagues, séquence, RGPD, KPIs). Cet outil **industrialise les étapes « enrichir → prioriser → exporter »** du §3 de `03` en y ajoutant les signaux web profonds (Firecrawl) et un scoring déterministe versionné.
> Skills/MCP aval inchangés : `export-to-csv` (Vibe) → `sales:draft-outreach` → `marketing:email-sequence`. Garde-fous GF-1..GF-6 + RGPD applicables.

## 1. Vision de l'outil

### 1.1 Pipeline cible
```
[1 SOURCING]      Vibe Prospecting (base entreprises+contacts) ──┐
                  Firecrawl (listings annuaires/maps locaux)  ───┤→ leads.raw.jsonl
                                                                 │
[2 ENRICHISSEMENT] Firecrawl scrape/extract du SITE de chaque lead
                  (techno, perf, GEO/schema, https, ads, recrutement) → leads.enriched.jsonl
                                                                 │
[3 SCORING]       scorer maison (modèle pondéré ICP + opportunité)
                  → score 0-100 + tier A/B/C + raisons → leads.scored.jsonl
                                                                 │
[4 EXPORT]        CSV panier A (+ B nurture) au format séquence ─┘
                                                                 │
[5 SÉQUENCE]      sales:draft-outreach + marketing:email-sequence (déjà en place)
```

Cycle hebdo identique à `03` §3 (cibler → enrichir → prioriser → exporter) ; l'outil automatise 2→4. Sourcing humain-dans-la-boucle (GF-1 : on relit le panier A avant tout envoi).

### 1.2 Où vit l'outil
Dans le repo `waimia-web`, **hors build Astro** (aucun impact site, aucun token CSS, hors catalogue DS) :
- **Scripts Node** (`.mjs`, alignés sur la convention `scripts/*.mjs` existante : `gen-*`, `check-*`). Pas de Python (toolchain pnpm/Node déjà là, zéro dép nouvelle hors `@mendable/firecrawl-js`).
- **Données** en local non versionné (`data/leads/` gitignored — RGPD, voir §4.4). Seuls le **code**, la **config de scoring** et les **schémas** sont commités.
- **Mini-dashboard optionnel (P2)** : page Astro `/agence/leadsourcing` (statique, derrière nav agence) lisant un export anonymisé, OU plus simple : ouverture du CSV dans un Sheet. Ne pas construire le dashboard avant que le CLI tourne et ait prouvé sa valeur (GF-2/GF-6).
- **Agents** = Claude Code / Cowork pilotant les scripts ; config repo (ce doc + `scoring.config.json`).

## 2. Rôle de Firecrawl

Firecrawl = scraping/crawl orienté IA (API + MCP, rend du markdown propre + extraction structurée). Il **complète** Vibe Prospecting, il ne le remplace pas.

| Brique | Outil | Apporte |
|---|---|---|
| Base entreprises + contacts (NAF, taille, dirigeant, email, tech déclarée, events) | **Vibe Prospecting** (déjà connecté) | Le **socle identité/contact** + premiers signaux (ads/recrutement/events). Reste la source primaire des coordonnées. |
| Signaux web **profonds depuis le site réel** du prospect | **Firecrawl** | Ce que Vibe ne voit pas finement : techno réelle, perf perçue, présence/absence GEO-schema, https, fraîcheur, CTA, balises — la matière du score « opportunité ». |
| Gisements **sans base** (annuaires/listes locales) | **Firecrawl** | Sourcer là où Vibe est pauvre : annuaires CCI/fédérations, listings sectoriels Montpellier/Occitanie. |

### 2.1 Ce que Firecrawl scrape, et comment
- **Sourcing listes (mode `crawl` / `map` puis `scrape`)** : annuaires PME locaux (CCI Hérault, fédérations métiers, annuaires sectoriels Occitanie), pages « membres/adhérents », listings type Pages Jaunes / Google Maps **dans le respect des CGU** (volume bas, pas d'automation agressive — cf §4.4). `map` pour découvrir les URLs, `crawl` borné (profondeur 1-2, `limit` strict) pour collecter, `scrape` ciblé pour une page. Sortie markdown → parse → `{nom, url, ville, secteur, tel?}`.
- **Enrichissement site prospect (mode `scrape` + `extract`)** : pour chaque lead avec une URL, un `scrape` (`formats: ['markdown','html','links']`, `onlyMainContent: false` car on a besoin du `<head>`) + un `extract` structuré (schéma JSON, voir §3.3) qui renvoie directement les signaux normalisés. On scrape **home + 1-2 pages clés** (`/contact`, page service), pas tout le site (coût, §4.5).
- **Signaux dérivés du retour Firecrawl** : présence `https`, générateur (`<meta name="generator">`, motifs `/wp-content/`, `wp-json` → WordPress), JSON-LD `schema.org` (LocalBusiness/Organization présent ou non), balises hreflang/OG, dernière modif visible, poids/lourdeur (proxy via taille HTML + nombre de scripts), mentions « ads »/tracking (gtag, fbq), page recrutement marketing.

### 2.2 Connexion du MCP / API Firecrawl
Deux voies, **API privilégiée pour le batch** (déterministe, scriptable, quotas mesurables) ; MCP pour l'exploration interactive depuis Claude Code.
- **API (scripts)** : clé `FIRECRAWL_API_KEY` en variable d'env (jamais commitée), lue via `.env` local. SDK `@mendable/firecrawl-js`. Endpoints `scrape`, `crawl`, `map`, `extract`.
- **MCP (interactif)** : ajouter le serveur Firecrawl à la config MCP de Claude Code (clé via env). Sert au prototypage/QA d'un site donné, pas au batch hebdo.
- Vérifier la doc officielle avant câblage (GF-6) : SDK Node, format de réponse `extract`, limites de plan/rate. Ne pas coder sur supposition d'API.

## 3. Outil de scoring maison

Score déterministe, **versionné**, explicable (chaque lead porte ses raisons). Deux blocs : **ICP fit** (mérite-t-on de le contacter) et **signaux d'opportunité** (a-t-il un problème qu'on résout). Un lead à fort ICP mais site déjà parfait = peu d'accroche ; un site catastrophique hors ICP = hors cible. Le tier croise les deux.

### 3.1 Modèle
`score_total = w_icp * score_icp + w_opp * score_opp` avec `w_icp = 0.5`, `w_opp = 0.5`. Chaque sous-score normalisé 0-100. Pondérations dans `scoring.config.json` (ajustables sans toucher le code, GF-3).

### 3.2 Grille de critères (poids, source)
ICP fit (rappel : aligné sur `03` §1.2, ne pas diverger) :

| Critère | Poids | Règle | Source |
|---|---|---|---|
| Secteur dans verticales cibles | 25 | match liste verticales (vague active) | Vibe (NAF) |
| Zone Occitanie / Montpellier d'abord | 20 | Montpellier 20, Occitanie 15, France 8, hors 0 | Vibe |
| Taille 5-250 sal. | 20 | dans bornes 20, proche 10, hors 0 | Vibe |
| Proxy budget (ads payantes / recrutement) | 20 | ads actives OU recrutement mkg = 20 | Vibe + Firecrawl |
| Décideur joignable identifié | 15 | email fonction + rôle décideur | Vibe |

Signaux d'opportunité (matière Firecrawl) :

| Signal | Poids | Détection | Lecture |
|---|---|---|---|
| Site lent / lourd | 18 | taille HTML élevée, nb scripts, (option PSI) | douleur perf vendable |
| Site daté / WordPress générique | 16 | `generator` WP, thème ancien, design daté | refonte = offre site IA 3 000 € |
| Absence GEO / schema.org | 16 | pas de JSON-LD LocalBusiness/Org | accroche GEO/SEO directe |
| Pas de HTTPS / certif KO | 12 | scheme http, mixed content | argument confiance immédiat |
| Ads actives sans bon site | 12 | tracking gtag/fbq présent + site faible | dépense déjà, mal convertie |
| Recrutement marketing en cours | 10 | page emploi mkg (Vibe events + scrape) | budget + besoin actif |
| Site absent / page unique / réseaux only | 10 | pas d'URL ou 1 page | greenfield, ticket d'entrée |
| Pas de mobile/responsive ou pas de CTA | 6 | viewport absent, 0 CTA détecté | quick win évident |

Critères **bloquants** (override → tier C, score ignoré, cohérent avec disqualifiants `03` §1.1) : aucune intention digitale ET aucun contact ; secteur réglementé hors compétence ; agence IA déjà installée (si détectable) ; opt-out déjà enregistré.

### 3.3 Schéma d'extraction Firecrawl (`extract`)
Schéma JSON passé à `extract` pour normaliser le retour (réduit le parsing maison) :
```json
{
  "has_https": "boolean",
  "cms_generator": "string|null",
  "is_wordpress": "boolean",
  "has_schema_localbusiness": "boolean",
  "has_viewport_meta": "boolean",
  "script_count": "number",
  "html_size_kb": "number",
  "tracking_pixels": "array",
  "primary_cta_present": "boolean",
  "last_updated_hint": "string|null",
  "careers_marketing_page": "boolean"
}
```

### 3.4 Seuils tiers
- **A (attaque)** : `score_total >= 70` ET `score_icp >= 50` ET >= 1 signal opportunité fort (poids >= 16). → panier A, séquence prioritaire, appel autorisé si local.
- **B (nurture)** : `45 <= score_total < 70`. → nurture, pas d'appel.
- **C (rejet/parking)** : `< 45` OU critère bloquant. → exclu des envois, conservé minimal le temps de la purge.

(Calibrer ces seuils après le test 20 leads §5, GF-3 — les chiffres ici sont un point de départ, pas une vérité.)

### 3.5 Format de sortie (CSV)
`leads.scored.csv`, 1 ligne/lead, colonnes (alignées avec ce qu'attendent `draft-outreach`/`email-sequence`) :
```
company, website, city, region, sector, naf, size_band,
contact_name, contact_role, contact_email, contact_linkedin,
score_total, score_icp, score_opp, tier,
top_signals, blocking_flags,
trigger, suggested_hook,
source (vibe|firecrawl_dir|both), enriched_at, scorer_version, status
```
- `top_signals` = 2-3 signaux dominants en clair (ex. `wordpress_date;no_schema;http`) → alimente la perso du hook.
- `suggested_hook` = phrase d'accroche dérivée du signal dominant (générée, relue GF-1).
- `status` initial `sourced` ; reprend le pipeline `03` §6.
- Export aussi en `leads.scored.jsonl` (traçabilité complète, raisons par critère).

## 4. Architecture technique

### 4.1 Fichiers à créer
```
scripts/leadsourcing/
  config/
    scoring.config.json        # poids, seuils, verticales/vague active, bloquants
    sources.directories.json   # annuaires/listings à crawler (url, type, parseur)
  lib/
    firecrawl.mjs              # client API (scrape/crawl/map/extract) + retry + quota guard
    schema.mjs                 # schémas zod lead.raw / lead.enriched / lead.scored
    signals.mjs               # dérivation des signaux depuis retour Firecrawl
  source-directories.mjs       # [1] crawl annuaires → leads.raw.jsonl
  enrich.mjs                   # [2] scrape+extract sites → leads.enriched.jsonl
  score.mjs                    # [3] applique scoring.config → leads.scored.jsonl
  export-csv.mjs               # [4] jsonl scoré → leads.scored.csv (panier A/B)
  run.mjs                      # orchestrateur: 1→4 enchaînés, flags --vague --limit --dry
  README.md                    # usage CLI + RGPD + quotas
data/leads/                    # GITIGNORED — sorties .jsonl/.csv (RGPD)
.env.example                   # FIRECRAWL_API_KEY= (clé réelle hors repo)
```
`data/leads/` ajouté au `.gitignore`. Réutiliser les contacts Vibe via son `export-to-csv` en **entrée** d'`enrich.mjs` (option `--from-vibe path.csv`) pour ne pas re-sourcer ce que Vibe fait déjà mieux.

### 4.2 Schéma de données (zod, `lib/schema.mjs`)
- `LeadRaw` : company, website?, city, region, sector?, naf?, source, sourced_at.
- `LeadEnriched` : LeadRaw + bloc signaux §3.3 + contact (depuis Vibe) + size_band + ads/recrutement.
- `LeadScored` : LeadEnriched + score_icp, score_opp, score_total, tier, reasons[] (critère→points), blocking_flags[], scorer_version.
Valider à chaque étape (fail fast). `scorer_version` = champ figé dans `scoring.config.json` (incrémenter à chaque changement de poids → comparabilité historique, GF-3).

### 4.3 Étapes d'implémentation (pour Claude Code)
1. Lire la doc officielle Firecrawl (SDK Node `@mendable/firecrawl-js`, `extract`, rate limits) — GF-6, ne pas coder sur mémoire.
2. Installer le SDK (dép isolée), créer `.env.example`, gitignore `data/leads/` et `.env`.
3. `lib/firecrawl.mjs` : wrapper `scrape/map/crawl/extract` avec **quota guard** (§4.5) + retry/backoff + timeout.
4. `lib/schema.mjs` (zod) + `lib/signals.mjs` (dérivation signaux) + `scoring.config.json` (poids §3.2, seuils §3.4).
5. `enrich.mjs` d'abord (le coeur de valeur), testé sur **3 sites connus** (un WordPress daté, un site propre, un sans site) → prouver les signaux (GF-1 : assertion sur la sortie, pas « 200 OK »).
6. `score.mjs` : applique config, produit reasons. Test unitaire sur 3 fixtures (un attendu A, un B, un C).
7. `export-csv.mjs` (format §3.5) puis `source-directories.mjs` (sourcing annuaires) et `run.mjs`.
8. Test bout-en-bout §5 (20 leads réels Montpellier), calibrage seuils, doc README.

### 4.4 Garde-fous RGPD (reprennent `03` §7, applicables au code)
- **Données minimales** : ne stocker que l'utile prospection B2B (fonction, email pro `prenom.nom@`, signaux site). **Jamais** d'email perso, jamais de données sensibles.
- **Stockage local non versionné** (`data/leads/` gitignored) ; pas de PII dans git, pas dans le build Astro, pas dans le dashboard public.
- **Finalité/base légale** : prospection B2B, intérêt légitime. Champ `optout` respecté immédiatement et **persisté** (liste d'exclusion `data/leads/optout.jsonl` consultée par `score.mjs` → override tier C).
- **Registre léger** : `data/leads/registre.md` (finalité, source, durée de conservation, purge paniers C/opt-out).
- **Firecrawl/CGU sites tiers** : scraping de listings public à **volume bas + ciblé**, respecter `robots.txt`, pas d'automation agressive (cohérent CGU LinkedIn `03` §7 — pour LinkedIn rester manuel/semi-assisté, ne pas scraper). Privilégier annuaires/fédérations dont la liste de membres est publique et destinée à être consultée.
- **Purge** : `run.mjs --purge` supprime paniers C de plus de N jours et tout opt-out.

### 4.5 Garde-fous coût (quotas Firecrawl)
- **Budget quasi nul** : Firecrawl facture au crédit/page. Plafonner dur.
- **Quota guard** dans `lib/firecrawl.mjs` : compteur de pages/crédits par run, plafond configurable (`maxPagesPerRun`), **arrêt + log** au plafond (pas de dépassement silencieux).
- `estimate` avant tout `crawl` (compter URLs via `map` d'abord, n'appeler `crawl` que sur ce qui passe un pré-filtre). Pré-filtrer les leads **avant** scrape : ne scraper que ceux qui passent déjà le seuil ICP minimal (inutile de payer un scrape pour un hors-cible).
- **Cap par site** : 1-3 pages max (home + contact + 1 service), `onlyMainContent` quand le `<head>` n'est pas requis.
- Mode `--dry` (compte les appels sans les exécuter) + `--limit N` obligatoire en dev.
- Cache disque des `scrape` (clé = URL+date) → pas de re-scrape dans la fenêtre hebdo.

## 5. Checklist d'implémentation

- [ ] Lire la doc officielle Firecrawl (SDK Node, `extract`, `map`/`crawl`, rate limits & pricing) — GF-6.
- [ ] Obtenir/poser `FIRECRAWL_API_KEY` en env, créer `.env.example`, gitignore `.env` + `data/leads/`.
- [ ] Connecter Firecrawl : SDK `@mendable/firecrawl-js` (batch) + serveur MCP Firecrawl dans la config Claude Code (interactif).
- [ ] `lib/firecrawl.mjs` : wrapper scrape/map/crawl/extract + retry/backoff + quota guard + cache disque.
- [ ] `lib/schema.mjs` (zod LeadRaw/Enriched/Scored) + `lib/signals.mjs` (dérivation signaux §3.3).
- [ ] `scoring.config.json` : poids (§3.2), seuils A/B/C (§3.4), verticales vague active, bloquants, `scorer_version`.
- [ ] Écrire `enrich.mjs` ; **prouver les signaux sur 3 sites témoins** (WP daté / site propre / sans site) — GF-1.
- [ ] Écrire `score.mjs` ; tests sur 3 fixtures (A/B/C attendus) ; vérifier `reasons[]` explicites.
- [ ] Brancher `export-csv.mjs` (format §3.5) + `source-directories.mjs` + `run.mjs` (flags `--vague --limit --dry --purge`).
- [ ] Brancher la sortie : CSV panier A → `sales:draft-outreach` + `marketing:email-sequence` (vérifier que les colonnes mappent).
- [ ] **Test réel : 20 leads Montpellier/Occitanie** (vague 1, services premium) bout-en-bout sourcing→scoring→export.
- [ ] **Mesurer & calibrer** : distribution des scores, % en A/B/C, vérifier à la main 5 A et 5 C (le scoring colle-t-il au jugement humain ?), ajuster poids/seuils, bump `scorer_version` (GF-3).
- [ ] RGPD : registre + liste opt-out branchée dans `score.mjs` + purge testée.
- [ ] Coût : relever crédits Firecrawl consommés sur le run 20 leads → extrapoler le coût hebdo, valider la soutenabilité (budget ≈ 0).
- [ ] (P2, seulement si le CLI a prouvé sa valeur) mini-dashboard `/agence/leadsourcing` sur export anonymisé.

## 6. Critères de succès du chantier
- `run.mjs --limit 20` produit `leads.scored.csv` exploitable, panier A non vide, raisons lisibles.
- Sur 5 leads A revus à la main : >= 4 jugés réellement prioritaires (précision du scoring).
- Coût Firecrawl du run < seuil défini (budget quasi nul tenu).
- Zéro PII dans git, opt-out respecté, RGPD documenté.
- Sortie directement consommable par `draft-outreach`/`email-sequence` sans retraitement manuel.
- Articulation propre avec `03-plan-prospection` (l'outil sert le §3, ne le remplace pas).
