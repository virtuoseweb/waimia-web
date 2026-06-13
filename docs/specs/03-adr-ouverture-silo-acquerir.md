# ADR-003 — Ouverture du silo Acquérir (Growth System IA) : pages de service réelles + landings conversion

- **Statut** : Accepté (décisions de fond tranchées par Simon le 2026-06-13 ; quelques choix d'URL à confirmer, cf §7)
- **Date** : 2026-06-13
- **Décideur** : Simon (Waimia, solo) + arbitrage expert
- **Portée** : architecture d'information, arborescence, templates de page service, stratégie SEO/GEO + CRO
- **Amende** : `ADR-002` (silo unique + 3 piliers vitrine légers). ADR-002 reste valide pour Piloter et Opérer ; ADR-003 ouvre **uniquement** le pilier Acquérir en silo développé, ce qu'ADR-002 prévoyait explicitement (« tout futur passage d'un pilier en silo = nouvel ADR »).
- **Lié à** : `strategy/06-doctrine-positionnement-architecture-seo` (SOURCE CANONIQUE du positionnement, énoncée par Simon 2026-06-13), `strategy/02-site-etat-final §0bis`, `strategy/01-silo-site-web-ia`, `docs/state/06-mapping-migration-3-piliers` (mapping d'exécution), `docs/visual-audit/AUDIT-SECTIONS-SERVICE` (design du template).

---

## Contexte

ADR-002 a posé « 1 silo SEO/GEO travaillé (Site web IA) + 3 piliers vitrine légers ». Depuis, la vision se précise : Waimia veut que Google la lise comme **l'expert du système marketing intelligent par IA**. Cela demande, côté Acquérir, plus qu'une page vitrine : un **silo de services réels**, chacun travaillé en profondeur, relié au pilier.

Tension à résoudre :
1. **Ouvrir Acquérir en silo** sans rouvrir la dispersion qu'ADR-002 a écartée (domaine neuf, autorité zéro).
2. **Recycler** le contenu et les templates des anciennes pages offres/solutions (data en partie détruite) au lieu de simplement supprimer des URLs.
3. **Réconcilier SEO et conversion** : une page de service riche (pour ranker) n'est pas une landing de conversion (pour vendre).

## Décision

Architecture **à 3 niveaux**, un seul silo ouvert (Acquérir), les deux autres piliers gelés en vitrine.

### Niveau 1 — Piliers (3 verbes de marque)

| Pilier | Verbe | Rôle | Silo développé ? |
|---|---|---|---|
| **Growth System IA** | Acquérir | Hub du silo + vision système marketing IA | **OUI (maintenant)** |
| **Business Intelligence** | Piloter | Page pilier à sections ancrées | NON (gelé, ADR-002) |
| **Opérations IA** | Opérer | Page pilier à sections ancrées + quelques pages enfant métier | NON (gelé, ADR-002) |

Piloter et Opérer restent **vitrine légère, jamais référencés offensivement** (règle ADR-002 maintenue). On ne développe pas leurs silos pour garder le focus Google sur le marketing IA.

### Niveau 2 — Pages de service du silo Acquérir (Phase B)

Trois services réels à fonder **en premier** (CRM intelligent, data/insight, SEO/GEO en page séparée, agents IA, publicité AIO = différés) :

1. **Site web intelligent** (`/services/site-web-intelligent`)
2. **Content marketing intelligent** (`/services/content-marketing-intelligent`) — fusionne le contenu « content marketing » + « contenu SEO/GEO ».
3. **Tunnel de conversion intelligent** (`/services/tunnel-conversion-intelligent`) — le quizz lead magnet de scoring arrive en Phase C.

> **Nommage (décision Simon 2026-06-13)** : on met l'accent sur « **intelligent** » (la promesse) plutôt que « IA » (le moyen) dans les slugs ET le copy vedette. « IA » reste mentionné comme le « comment » technique, en appui, pas dans les titres. Slugs résolus : `site-web-intelligent`, `content-marketing-intelligent`, `tunnel-conversion-intelligent`.

Chaque page de service utilise le **template de page service refondu** (cf §3).

### Niveau 3 — Deux surfaces par service

Pour chaque service, **deux pages distinctes** aux objectifs opposés :

| Surface | URL | Objectif | Caractéristiques |
|---|---|---|---|
| **Page service** | `/services/<slug>` | Ranker (SEO/GEO) | Riche, longue, maillée au cluster, liens sortants, indexable |
| **Landing conversion** | `/lp/<slug>` | Convertir (CRO) | Focus, tunnel, peu/pas de liens sortants, `noindex` possible |

La page service alimente le SEO/GEO ; la landing capte la conversion (campagnes, ads, quizz). Elles ne se cannibalisent pas : `canonical` sur la page service, `noindex` sur la landing si besoin.

### Escalonné — Site web IA d'abord

On **fonde les 3 pages service en Phase B** (structure + template + contenu recyclé), mais l'**effort SEO/GEO de profondeur** (cluster d'articles, maillage, schema/GEO) est **escalonné** : on muscle d'abord **Site web intelligent** jusqu'à la masse critique, puis Content marketing, puis le reste du système marketing IA. Un domaine neuf émerge mieux avec un cluster fort qu'avec trois clusters faibles.

## Conséquences

**Positives :**
- Arbo saine et lisible par Google : pilier → services → (page SEO + landing), signal clair « système marketing intelligent ».
- Templates et contenus recyclés au lieu de jetés (offres/solutions → pages service).
- SEO et conversion réconciliés par séparation des surfaces.
- Concentration préservée : un seul silo ouvert, escalonné.

**Négatives / risques :**
- Surface de pages en hausse (3 services × 2 surfaces = 6 pages + 1 pilier hub) → discipline de prod requise (solo).
- Duplication de message page/landing → gérer `canonical` + `noindex` rigoureusement (sinon cannibalisation).
- Tentation d'ouvrir Piloter/Opérer trop tôt → **interdit sans ADR-004**.

## Règle d'or (mise à jour)

> **Un seul silo ouvert : Acquérir (Growth System IA).** Trois services réels (Site web, Content marketing, Tunnel), chacun en page SEO `/services/` + landing `/lp/`. SEO escalonné, Site web IA d'abord. Piloter et Opérer restent vitrine légère, jamais référencés offensivement. Ouvrir un autre silo = ADR-004.

---

## §3 — Template de page service (refonte content + design)

La refonte du template de page service est pilotée par l'**audit visuel** (`docs/visual-audit/AUDIT-SECTIONS-SERVICE.md`) : pour chaque slot fonctionnel, on choisit/améliore/décline la meilleure section de la bibliothèque (DS figé, 0 nouveau token). Séquence de slots cible (à confirmer par l'audit) :

`hero service → problème/tension → méthode → capacités/livrables → preuve/ROI → pricing/offre → FAQ → CTA`

Le rendu est **composable** (frontmatter MDX `sections: [...]` → `SectionsRenderer`), jamais du markup inliné (règle anti-orphelin du CLAUDE.md). Le template legacy `OffresDetailTemplate` (orphelin) est retiré au profit de la séquence composable.

---

## §4 — Plan d'exécution phasé

> Le détail tâche-par-tâche (avec ids board `P<n>.<n>-<lettre>` trackés dans `state/02`) est consolidé après retour des workers mapping + audit. Vue d'ensemble :

### Phase A — Fondations / base propre
- Mega-menu reconstruit sur le modèle 3-piliers (remplace le modèle 19-pages actuel).
- Collections rangées : recyclage offres/solutions vers pages service (cf `state/06`).
- Anciennes URLs supprimées → **404 net** (pas de 301, choix Simon).
- Templates : retrait `OffresDetailTemplate` orphelin, séquence composable adoptée.

### Phase B — Silo Acquérir (Growth System IA)
- Page pilier hub Acquérir (présente les 3 services + vision système).
- 3 pages service `/services/site-web-ia`, `/content-marketing-ia`, `/tunnel-conversion-ia` (template refondu, contenu recyclé/fusionné).
- Pages pilier Piloter + Opérer (sections ancrées, silos non développés).
- SEO/GEO escalonné : cluster Site web IA d'abord.

### Phase C — Conversion
- Landings `/lp/<slug>` par service (CRO, `noindex` possible).
- **Quizz lead magnet** (interactif, Q/R conditionnelles ; triple fonction : étude de marché + lead gen + routage vers l'offre la plus susceptible de vendre selon le profil). S'appuie sur les collections `tunnels` + `outils` existantes.

---

## §7 — Schéma d'URL (résolu, 2026-06-13)

Principe : les piliers portent la navigation et la marque, les pages service portent le SEO offensif (les keywords vivent dans les services + le cluster, pas dans le slug du hub). Le silo se construit par maillage interne (hub vers services vers cluster), pas par la profondeur du path.

| Élément | URL | Statut |
|---|---|---|
| Pilier Acquérir (hub) | `/acquerir` | retenu (verbe de marque) |
| Pilier Piloter | `/piloter` | retenu |
| Pilier Opérer | `/operer` | retenu |
| Service Site web intelligent | `/services/site-web-intelligent` (+ `/lp/site-web-intelligent`) | retenu (accent « intelligent », 2026-06-13) |
| Service Content marketing intelligent | `/services/content-marketing-intelligent` (+ `/lp/...`) | retenu |
| Service Tunnel de conversion intelligent | `/services/tunnel-conversion-intelligent` (+ `/lp/...`) | retenu |
| Ancienne `/offres/growth-system-ia` | **301 vers `/acquerir`** | exception assumée à la règle 404-net |

**Exception 301 justifiée** : `/offres/growth-system-ia` ne disparaît pas, elle se renomme en hub Acquérir. Un 301 sur une page qui se renomme est l'usage canonique d'une redirection permanente, pas une entorse à la règle 404-net (qui vise les pages supprimées : contenu fictif ou thin). C'est la seule URL du lot potentiellement déjà indexée ; on en préserve l'autorité éventuelle. Toutes les autres anciennes URLs (cf `state/06`) restent en **404 net**.
