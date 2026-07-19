# Outillage prospection (maison) : scoring + séquences + CRM lite

> Chantiers P3.1-a (scoring) et P3.1-b (séquences + CRM). Outil local décrit dans `docs/business/09-leadsourcing-scoring.md` (source de vérité data), `docs/business/03-plan-prospection.md` (§1.2 ICP/BANT, §4 séquence, §6 pipeline) et `docs/business/05-sales-enablement.md` (voix + scripts, source canonique NON dupliquée). **Aucun appel réseau, aucune dépendance** (Node stdlib), **aucun envoi** : ces scripts produisent des assets locaux à relire (GF-1) et à envoyer à la main. Le sourcing/enrichissement (crédits) est géré en amont.

## Workflow complet
```
1. sourcing/enrichissement (MCP Vibe Prospecting, en amont) → export CSV local
2. score      : node score-icp-bant.mjs export.csv --out data/leads/sem-30   → .scored.csv + .scored.jsonl
3. render     : node render-sequence.mjs data/leads/sem-30.scored.csv --all --out out/   → 1 .md/prospect panier A
4. relecture  : relire chaque séquence (GF-1), personnaliser, ENVOYER À LA MAIN
5. crm add    : node crm-lite.mjs add --from data/leads/sem-30.scored.csv --tier A
6. crm move   : au fil des réponses/RDV → move <id> <étape> ; crm stale chaque vendredi (purge §6)
```

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

## Séquences d'outreach (`render-sequence.mjs` + `sequences/`) · P3.1-b

Génère la séquence multicanal §4 (`03` : J0/J1 LinkedIn, J2/J5/J12 emails, J7 appel, J9 engagement) personnalisée pour un prospect scoré. Les **templates** vivent dans `sequences/` (1 fichier par touche) ; ils sont la **forme opérable** des scripts de `05` §6 (voix canonique, NON dupliquée). Voix anti-théâtre : phrases courtes, cash, expert honnête, 0 em-dash.

```bash
# 1er prospect panier A du CSV scoré (auto-charge le sibling .jsonl pour des déclencheurs plus riches)
node scripts/prospecting/render-sequence.mjs data/leads/sem-30.scored.csv

# tous les paniers A → 1 fichier .md par prospect dans out/ (gitignoré)
node scripts/prospecting/render-sequence.mjs data/leads/sem-30.scored.csv --all --out out/

# cibler un prospect + une seule touche + forcer le segment
node scripts/prospecting/render-sequence.mjs sem-30.scored.jsonl --company "Studio Archipel" --touch j2 --segment tpe-locale
```
Raccourci npm : `npm run prospect:render -- <input> [options]`. Aide : `--help`.

**Placeholders** : prospect (`{{prenom}}`, `{{entreprise}}`, `{{secteur}}`, `{{ville}}`, `{{declencheur}}`) résolus depuis le scoré (le déclencheur vient de `_axes_detail.need` du JSONL, sinon de `top_reasons`). Vendeur (`{{preuve_locale}}`, `{{quick_win}}`, `{{lien_audit}}`, `{{signature}}`, `{{optout}}`) ont des **défauts** conformes aux docs (audit gratuit `cal.com/simonberos/audit`, preuve = propre infra `05` §2/§5), surchargeables (`--preuve`, `--quick-win`). **Un placeholder prospect manquant sort en `⟦MANQUANT:champ⟧`** (jamais vide en silence) et est listé en fin de séquence + averti sur stderr.

**Segment** (auto, surcharge `--segment`) : `tpe-locale` (petite structure ancrée Occitanie, dirigeant, levier RDV physique) vs `pme-marketing` (taille ≥ 25 / hors zone / verticale marketing, cycle distance/ROI). J2/J5/J7 ont des variantes par segment (`03` §2) ; J0/J1/J9/J12 sont communs. Les emails portent l'**opt-out RGPD** (`03` §7 : identité claire, objet honnête, opposition immédiate). Chaque séquence rappelle « relire avant envoi (GF-1) ».

## CRM lite (`crm-lite.mjs`) · P3.1-b

Tracker du pipeline §6 (`Sourcé → Contacté → Répondu → RDV → Audit/proposition → Gagné/Perdu`) sur un `crm.jsonl` local (1 ligne = 1 prospect, état + historique). Stdlib, 0 réseau. **Contient de la PII → gitignoré.**

```bash
node scripts/prospecting/crm-lite.mjs add --from data/leads/sem-30.scored.csv --tier A   # import panier A
node scripts/prospecting/crm-lite.mjs add --company "X" --contact "Nom" --email a@b.fr --note "..."
node scripts/prospecting/crm-lite.mjs move barreau-nimes-conseil rdv                       # alias tolérés
node scripts/prospecting/crm-lite.mjs list [--stage rdv] [--json]
node scripts/prospecting/crm-lite.mjs stale [--days 14]                                    # purge hebdo §6/§9
node scripts/prospecting/crm-lite.mjs show <id>
```
Raccourci npm : `npm run prospect:crm -- <cmd> ...`. Aide : `--help`. Dédoublonnage par email (sinon company). Étape invalide → erreur + liste des étapes valides (exit 1). `stale` exclut les issues terminales (Gagné/Perdu). Store surchargeable : `--file`.

## RGPD

Ces scripts scorent/rendent/suivent des fichiers locaux ; **aucun envoi**. Garde-fous `09` §4.4 + `03` §7 sur le pipeline complet : données locales non versionnées (`data/leads/`, `crm.jsonl`, `out/`, `*.scored.*` gitignored), pas de PII dans git, opt-out respecté (colonne `optout` → tier C côté scorer ; bloc opt-out dans chaque email côté render). Envoi réel = décision Simon (hors de ces outils).
