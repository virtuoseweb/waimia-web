# 05 — Waimia : le socle produit (service → boilerplate → système modulaire)

> ⚠️ Framing antérieur au positionnement V8 (2026-07-12). La mécanique (funnel/canaux/éditorial) reste valable ; le récit de marque canonique = `strategy/10 §0bis` + `docs/synthese-v1/SYNTHESE.md`.

> **Vision produit.** Waimia n'est pas un site vitrine : c'est le **socle marketing IA augmenté**
> — un système modulaire (quasi-OS) avec agents IA, CMS lite, dashboard et automations.
> On le **vend « site web IA »** pour la simplicité de compréhension ; la démo + les pages
> service/offres révèlent les fonctionnalités réelles. `waimia.com` est la **première
> implémentation de référence** : on se l'applique à soi-même, puis on le **forke** par client.
> Aligné `marketing/01-positionnement`, `02-go-to-market`, `strategy/site-final`.

## 1. De service à produit
1. **Service (début)** : on livre le système sur mesure au client (audit → site IA → modules).
2. **Produit (ensuite)** : le client **paie**, on **forke** le boilerplate, on **remplace les
   connexions** (Google Search Console, Google Analytics, CRM, réseaux sociaux) par **ses comptes
   à lui**, on **active les modules choisis**. Facturation **à l'usage** (actions/résultats).
3. **Reproduction industrielle** : le **DS Studio** + le **catalogue de sections** (déjà dans
   `waimia-web`) permettent de **dupliquer et personnaliser** rapidement d'autres sites sur le
   même socle. Coût marginal faible, qualité constante.

## 2. Architecture modulaire (modules activables par client)
Le système se vend « site IA » mais c'est une **application** ; chaque module s'active à la carte.

| Module | Rôle | Statut |
|---|---|---|
| **Site IA-native** (Astro + Vercel) | base : perf maximale, GEO-ready, éditable par IA | ✅ existe (`waimia-web`) |
| **CMS lite** (à construire, git-based + **TinaCMS visual editing**) | édition de contenu sans code, source de vérité git | 🔜 chantier |
| **Dashboard / cockpit client** | monitoring agents, réglages, runs, **facturation à l'usage** | 🔜 chantier |
| **Agents IA** = **Claude Code / Claude Cowork + le repo** | sourcing/scoring/contenu/email/social, configurés par le `.claude/` du repo (plugins, skills, sous-agents, commandes, MCP) | 🔜 chantier (incrémental) |
| **Automations script/Node** | automations simples maison (glue entre modules) | 🔜 chantier |
| **Intégrations** | **HubSpot** ou autre CRM, GSC, GA, Stripe (e-commerce), API sociales | partiel / à câbler |
| **Pipeline contenu interconnecté** | article publié → script → **podcast / vidéo YouTube** → distribution → notif au marketeur | 🔜 chantier (cf `03`) |

**Modes de fonctionnement** : **autonome** (le système tourne seul — sourcing, scoring, contenu,
relances) **ou interactif** (l'humain valide/pilote depuis le dashboard). Le client choisit le
curseur d'autonomie par module.

### 2.1 Le modèle d'agent réel (KISS — pas de runtime à réinventer)
Les « agents IA » de Waimia **ne sont pas** un moteur d'agents custom bâti de zéro. Ce sont
**Claude Code / Claude Cowork pointés sur le folder du repo** (forké par client). En donnant
l'accès au dossier, **tout se configure depuis le repo** :
- **`.claude/`** : plugins, **skills** (production contenu, sourcing, scoring…), **identités
  d'agents / sous-agents**, **commandes** (slash commands), **hooks**, déclaration des **MCP**.
- C'est **exactement le pattern `vw-guardrails`** déjà en place (marketplace + plugin chargés au
  boot de session). On industrialise ce qui existe, on ne réinvente pas.
- **Connecteurs** = MCP (HubSpot, GSC/GA, API sociales, Stripe) déclarés dans le repo + clés du client.
- **Leverage** = écosystème Anthropic (Claude Code/Cowork) + repo bien configuré, **pas** une
  infra d'agents propriétaire. Cohérent avec la règle anti-complexité : le plus simple qui marche.

→ Conséquence produit : **livrer un client = forker le repo + brancher ses comptes (MCP/clés) +
activer les skills/commandes/sous-agents voulus**. Le « système d'agents » est surtout une
**configuration de repo** + l'accès Claude Code/Cowork, pas un logiciel à maintenir séparément.

## 3. Le pipeline contenu interconnecté (différenciateur clé — DIFFÉRÉ jusqu'à ≥3 clients récurrents)
> **Statut T1 :** vision produit, **non activée au démarrage** (`state/03 §C5` : T1 = 2 canaux —
> LinkedIn + 1 article/sem in‑silo ; YouTube/podcast/TikTok/X/Reddit gelés jusqu'à ≥3 clients
> récurrents). Décrit ci‑dessous l'**état cible** du module, pas l'exécution immédiate.

Quand un article sort, le système **enchaînera automatiquement** : génération d'un **script** →
production d'un **podcast / vidéo YouTube** → préparation des dérivés sociaux → **transmission à
Simon ou au responsable marketing** pour validation/publication. Tout est **interconnecté via le
site IA augmenté** : le contenu n'est pas un livrable isolé, c'est un **flux** qui alimente SEO,
GEO, social et email depuis une seule source (le MDX du site). Détail éditorial : `marketing/03`.

## 4. Ce que le client achète (et comment c'est divulgué)
- **Vendu comme** : « site web IA » (simple, tangible, compris par un département marketing).
- **Révélé par** : la **démo** + les **pages de service/offres** qui détaillent les fonctionnalités
  (agents visibles, scoring, automation contenu, dashboard) et les **modules activables**.
- **Logique** : porte d'entrée simple → révélation de la puissance → activation progressive des
  modules → facturation à la valeur (cf funnel `marketing/02`).

## 5. Roadmap des chantiers (incrémental, « petit à petit »)
> Ordre indicatif ; chaque chantier = base propre, preuve empirique, pas de big bang.
1. **Chantier site** (en cours/spec) : assainissement + base propre (`strategy/site-final`) =
   la fondation réutilisable du boilerplate.
2. **CMS lite + TinaCMS visual editing** : édition visuelle 100 % Astro, **suivre les derniers
   releases TinaCMS GitHub** (méthode officielle Astro à jour) — cf `architecture/tina-astro`.
3. **Dashboard / cockpit** : monitoring + réglages + runs + **facturation à l'usage** (modèle
   « salarié virtuel »). MVP = cockpit centré sur quelques comptes pilotes.
4. **Agents IA (routines Claude Code)** : par capacité, incrémental — sourcing → scoring →
   contenu → social → email. Connecteurs API ajoutés au fur et à mesure.
5. **Automations Node/scripts** : glue entre modules (les automations simples maison).
6. **Industrialisation fork** : procédure de duplication par client (swap connecteurs + activation
   modules) + DS Studio/catalogue pour la personnalisation.

## 6. Implications stratégiques
- **`waimia-web` est le produit, pas juste le site de l'agence.** Chaque amélioration du repo
  est une amélioration du **boilerplate vendable** → exigence de qualité et de réutilisabilité.
- **Modularité = pricing** : on facture les modules activés + l'usage des agents, pas un forfait plat.
- **Le DS Studio + le catalogue** (déjà présents) sont des **actifs produit** (reproduction), pas
  seulement des outils internes — à ne pas négliger même si le SEO est prioritaire à court terme.
- **Cohérence avec le pivot** : on ne reconstruit pas un « OS » abstrait ; on industrialise **le
  système marketing concret qui se vend**, module par module, en partant de la base saine du site.
