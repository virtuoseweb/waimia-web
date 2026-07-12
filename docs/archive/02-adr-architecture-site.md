# ADR-002 — Architecture du site : un silo SEO/GEO + trois piliers vitrine légers

> ⚠️ **Amendé par `ADR-003` (2026-06-13)** : le pilier **Acquérir (Growth System IA)** est ouvert en silo développé (pages de service réelles + landings). Piloter et Opérer restent régis par CET ADR (vitrine légère, jamais référencés offensivement). Lire `specs/03-adr-ouverture-silo-acquerir.md` pour l'état courant du pilier Acquérir.

- **Statut** : Accepté (partiellement amendé par ADR-003 pour le seul pilier Acquérir)
- **Date** : 2026-06-12
- **Décideur** : Simon (Waimia, solo) + arbitrage expert
- **Portée** : architecture d'information, arborescence, stratégie SEO/GEO, structure du funnel consulting
- **Lié à** : `strategy/02-site-etat-final §0bis` (fait foi)

---

## Contexte
Waimia = agence IA anthropic-first solo à Montpellier, zone blanche entre SaaS d'agents préfabriqués
(Limova) et conseil premium grands comptes (ClaudIn). `waimia.com` est un **domaine neuf, autorité
zéro**. Trois contraintes :
1. **SEO/GEO sur domaine neuf** : la concentration prime sur la dispersion. Il faut **un seul point
   indexable travaillé en profondeur** (cluster), pas une nappe de pages thin.
2. **Offre visible** : l'activité (consulting + build) impose que l'offre soit dans la navigation —
   sinon le funnel consulting n'a pas de point d'entrée.
3. **Funnel consulting** : les pages d'offre doivent exister et être atteignables même si elles ne
   sont pas des cibles SEO offensives.

Tension : **concentrer le SEO (1 silo) tout en gardant l'offre visible (3 piliers)** sans recréer la
dispersion qui tuerait l'émergence.

## Décision
Architecture **1 silo SEO/GEO travaillé + 3 piliers vitrine légers**.

**1. Un seul silo SEO/GEO : « Site web IA »** — page silo dédiée + **cluster d'articles**. Seul
ensemble travaillé en profondeur ; toute l'autorité du domaine converge ici. Méga-menu : « Site web
IA » → page silo (destination réelle).

**2. Trois piliers vitrine — LÉGERS**, une page à sections ancrées chacun, sans cluster, sans ciblage
SEO offensif. Rôle : rendre l'offre visible + nourrir le funnel consulting.

| Pilier | Verbe | URL |
|---|---|---|
| Growth System IA | Acquérir | `/offres/growth-system-ia` |
| Data & Analytics | Piloter | `/solutions/data-analytics` |
| Automatisation & Agents IA | Opérer | `/solutions/automatisation-agents-ia` |

Méga-menu : les 3 piliers → **ancres** de leur page respective. Seul « Site web IA » a une page silo + cluster.

## Alternatives rejetées
- **A — 1 silo seul, Piloter/Opérer supprimés** : l'offre disparaît du menu → casse le funnel
  consulting (Piloter/Opérer = portes d'entrée à plus forte valeur). Rejetée.
- **B — 19 pages séparées (une par sous-offre)** : dilution fatale du jus SEO sur domaine neuf,
  aucune page n'atteint la masse critique, effort de prod explosé pour un solo. Rejetée.

## Conséquences
**Positives :** offre visible (3 verbes dans le menu) ; page count minimal (1 silo + cluster + 3
pages) ; concentration SEO préservée ; cohérence GEO (un point de fond unique émerge mieux qu'une
nappe thin).
**Négatives / risques :** 4 clusters indexés au lieu d'1 → **ne JAMAIS référencer offensivement les 3
piliers** (pas de ciblage, pas de cluster, pas de course au mot-clé) ; piliers « thin-ish » → les
soigner (UX, preuve, conversion) sans les SEO-miner (leur KPI = le funnel, pas le ranking) ;
discipline requise → tout futur passage d'un pilier en silo = **nouvel ADR**, pas une dérive silencieuse.

## Règle d'or
> **Un seul silo offensif (« Site web IA »).** Les trois piliers sont **visibles mais jamais
> référencés offensivement**. Concentration SEO d'abord ; offre visible toujours ; surface minimale
> pour un solo.
