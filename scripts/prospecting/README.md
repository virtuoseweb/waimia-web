# Outil de scoring prospection ICP + BANT (maison)

> Chantier P3.1-a. Partie **scoring** de l'outil décrit dans `docs/business/09-leadsourcing-scoring.md` (source de vérité) et `docs/business/03-plan-prospection.md` (§1.2 ICP/BANT). Travaille sur des **données locales** (export Explorium / Vibe Prospecting). **Aucun appel réseau, aucune dépendance** (Node stdlib). Le sourcing/enrichissement Firecrawl + Explorium (qui consomme des crédits) est géré en amont, hors de ce script.

## Ce que fait le scorer

Lit un CSV ou JSON de prospects, calcule le score **ICP + BANT 4 axes** (Fit / Budget / Authority / Need-Timing, `03` §1.2, seuil 3/4), et sort un CSV + JSONL scorés triés :

- **Panier A** (attaque) : 3-4 axes /4 satisfaits.
- **Panier B** (nurture) : 2 axes /4.
- **Panier C** (rejet) : moins de 2 axes, **ou** un disqualifiant dur (`03` §1.1 : opt-out, agence IA déjà installée, secteur réglementé, aucune intention digitale ni contact, micro-budget). La raison du rejet est portée dans `tier_reason` / `blocking_flags`.

Chaque axe est composé de sous-critères pondérés (repris de la grille ICP de `09` §3.2). Les **poids et seuils** sont dans l'objet `SCORING_CONFIG` en tête de `score-icp-bant.mjs`, ajustables sans toucher la logique. Bump `scorer_version` à chaque changement de poids (comparabilité historique, GF-3).

> Les **signaux d'opportunité profonds** de `09` §3.2 (perf, schema.org, HTTPS, CMS daté) exigent un enrichissement Firecrawl et ne sont **pas** évalués ici. Quand l'enrichissement sera branché, ajouter un axe/bloc « opportunité » dans la config sans casser le modèle BANT.

## Usage

```bash
# Scorer un export, écrit <input>.scored.csv + .scored.jsonl
node scripts/prospecting/score-icp-bant.mjs data/leads/mon-export.csv

# Sortie personnalisée
node scripts/prospecting/score-icp-bant.mjs export.json --out data/leads/semaine-30

# Imprimer le CSV scoré sur stdout, sans écrire de fichiers
node scripts/prospecting/score-icp-bant.mjs export.csv --no-files > scored.csv

# Aide
node scripts/prospecting/score-icp-bant.mjs --help
```

Raccourci npm : `npm run prospect:score -- <input.csv>`.

## Colonnes d'entrée (tolérantes)

Le scorer résout des **alias** (voir `COLUMN_ALIASES`), insensibles à la casse. Aucune colonne n'est obligatoire : une colonne absente rend le critère **non évaluable** (`unknown`), jamais un crash. Colonnes reconnues (style Explorium) : `company/name`, `website`, `city`, `region/country`, `sector/industry/naics`, `naf`, `employees/company_size`, `revenue`, `contact_name`, `contact_role/job_title`, `job_level`, `contact_email`, `contact_linkedin`, `has_website`, `ads_active`, `hiring_marketing`, `events`, `existing_ai_agency`, `optout`.

## Sortie

CSV colonnes (alignées sur ce qu'attendent `sales:draft-outreach` / `marketing:email-sequence`, `09` §3.5) : `company, website, city, region, sector, size_band, contact_name, contact_role, contact_email, score_total, axes_met, score_fit, score_budget, score_authority, score_need, tier, tier_reason, top_signals→top_reasons, blocking_flags, source, scorer_version, status`. Le JSONL ajoute `_axes_detail` (raison par sous-critère → traçabilité complète).

## Test (GF-1)

```bash
node scripts/prospecting/test-score.mjs   # 47 assertions : paniers attendus + cas limites
```

Fixtures dans `fixtures/` : `sample-prospects.csv` (**FICTIF** : 13 prospects inventés couvrant A/B/C, 5 disqualifiants durs, colonnes manquantes ; colonne `expected_tier` = panier attendu, ignorée par le scorer) et `edge-empty.csv` (fichier vide).

## RGPD

Ce script ne fait que scorer un fichier fourni. Les garde-fous de `09` §4.4 s'appliquent au pipeline complet : données locales non versionnées (`data/leads/` gitignored), pas de PII dans git, opt-out respecté (colonne `optout` → override tier C, déjà branché).
