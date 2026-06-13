# Doctrine de positionnement, architecture & SEO — Waimia (source canonique)

> **Statut** : LIVE · source de vérité du positionnement. Énoncée par Simon le 2026-06-13.
> Les docs `strategy/01-02-03`, `specs/02-ADR-002`, `specs/03-ADR-003`, `state/06` en dérivent
> et ont été vérifiés cohérents (cf §Cohérence). En cas de divergence, CE doc + les ADR font foi.

---

## 1. Contexte de positionnement

Waimia **n'est pas une agence généraliste** qui vend 15 services indépendants. L'objectif est de
**construire progressivement l'autorité du site autour de son expertise principale actuelle** :
acquisition et croissance par l'IA (site web intelligent, SEO/GEO, content marketing, funnels,
agents marketing/commerciaux).

Les sujets **Business Intelligence** et **Operations IA** existent dans l'offre mais ne sont **pas
encore** le principal moteur commercial ni la spécialisation que l'entreprise cherche à faire
reconnaître par Google.

## 2. Architecture — 3 piliers métier

| Pilier (navigation) | Nom d'offre (marque) | Promesse | Regroupe |
|---|---|---|---|
| **Acquérir** → `/acquerir` | **Growth System IA** | Trouver plus de clients | Site web intelligent · SEO & GEO IA · Content marketing · Publicité en ligne · Tunnel de vente · Agent marketing & commercial |
| **Piloter** → `/piloter` | **Business Intelligence** | Voir et décider | RevOps · Tableaux de bord & analytics · Reporting IA · Données centralisées · Prévisionnel IA · Agent analytique |
| **Opérer** → `/operer` | **Operations IA** | Gagner du temps | CRM & relances · Automatisation & workflows · Service client IA · Administration & RH · Légal IA · Agents métiers |

**Navigation = verbes** (Acquérir / Piloter / Opérer) : catégories métier que la PME comprend
immédiatement. **Offres = noms de marque** (Growth System IA / Business Intelligence / Operations IA) :
ce que l'on vend réellement. On ne met PAS « RevOps », « agentique », « automatisation avancée » en
navigation : la PME ne les comprend pas. La navigation reste simple.

## 3. Décision SEO principale — ne pas disperser l'autorité

Le site est **neuf** (autorité zéro). Erreur à éviter : créer immédiatement des pages optimisées pour
RevOps, forecasting, reporting IA, RH IA, service client IA, légal IA, CRM, automatisation… Cette
dispersion dilue le positionnement : Google verrait un nouveau site prétendant être expert dans trop
de domaines à la fois.

### Stratégie retenue

- **Growth System IA = pilier principal**, c'est ici que **tout l'effort SEO se concentre** : page
  pilier `/acquerir` + **pages de destination dédiées** (`/services/*`) + **contenu éditorial / cluster**
  + maillage interne + cas clients. Sujets travaillés en profondeur : site web intelligent, SEO & GEO,
  content marketing, tunnel de vente, agent marketing & commercial.
- **Business Intelligence = une seule page pilier** `/piloter`, puis **sections / ancres / blocs** pour
  couvrir RevOps, reporting IA, analytics, forecasting, agent analytique. Présenter l'offre **sans**
  construire un silo SEO complet.
- **Operations IA = une seule page pilier** `/operer`, même logique (CRM, automatisation, service
  client, RH, légal, agents métiers en sections). Montrer les capacités **sans disperser l'autorité**.

> Élargir un silo (Piloter ou Opérer) plus tard = **nouvel ADR** (cf ADR-002/003), jamais une dérive
> silencieuse, et seulement quand l'autorité du domaine le permet.

## 4. Positionnement « Site web intelligent » (pas « Site web IA »)

« Site web IA » est utile pour le SEO mais **insuffisant pour le positionnement** : le marché associe
souvent « site web IA » à la génération automatique, la faible intervention humaine, les outils type
Wix AI. Ce positionnement **réduit la valeur perçue**.

Or le produit Waimia ne vend pas « un site » : il comprend site web + CMS intelligent + système de
contenu + dashboard + reporting + intégrations + automatisations + agents IA + **supervision humaine**.
Mais la PME comprend immédiatement « site web », pas « plateforme agentique » / « système autonome ».

**Décision** : utiliser le **site web comme porte d'entrée** (« Site web intelligent »), puis expliquer
progressivement le contenu automatisé, les intégrations, les tableaux de bord, les agents, les
automatisations. Le site web devient la porte d'entrée vers un système beaucoup plus large.

→ Conséquence opérationnelle (ADR-003) : on met l'accent sur « **intelligent** » (la promesse) plutôt
que « IA » (le moyen) dans les **slugs ET le copy vedette**. « IA » reste le « comment » technique, en
appui, jamais le mot vedette des titres. Slugs : `site-web-intelligent`, `content-marketing-intelligent`,
`tunnel-conversion-intelligent`.

## 5. Principe directeur

> Ne pas construire un site qui présente 15 services indépendants. Construire un **système cohérent**
> **Acquérir → Piloter → Opérer**, avec une **priorité SEO forte sur Growth System IA** et une
> couverture plus légère mais crédible sur Business Intelligence et Operations IA, jusqu'à ce que
> l'autorité du domaine permette d'élargir progressivement les silos.

---

## §Cohérence — vérifiée le 2026-06-13 (pont avec les docs existants)

Récolte read-only sur `strategy/01-05`, `specs/02-ADR-002`, `specs/03-ADR-003`, `state/06`,
`audits/01-02`, `visual-audit/AUDIT-SECTIONS-SERVICE`. Résultat : **doctrine entièrement alignée,
aucune contradiction majeure.**

| Point | Source canonique | Statut |
|---|---|---|
| 3 piliers, navigation = verbes, offres = noms IA | `strategy/02:37-68`, `ADR-002:27-43`, `ADR-003:25-31` | ✅ aligné |
| Un seul silo SEO offensif (Acquérir / Site web intelligent) + cluster | `strategy/02:51-54`, `ADR-002 Règle d'or`, `strategy/03:74-101` | ✅ aligné |
| Piloter + Opérer = 1 page pilier à ancres, jamais offensif | `ADR-002:27-43`, `ADR-003:33` | ✅ aligné |
| SEO/GEO **fusionné** dans Content marketing intelligent (pas de page séparée) | `ADR-003:35-45`, `state/06:95-102`, `strategy/03:74-101` | ✅ aligné |
| Accent « intelligent » plutôt que « IA » | `ADR-003:43-44` (résout `strategy/01-05` antérieurs) | ✅ aligné |
| Agents marketing/commercial + Publicité = **différés** (Phase C+) | `state/06:63,70,75` | ✅ aligné |
| Template page service (séquence 13 sections) | `visual-audit/AUDIT-SECTIONS-SERVICE:33-49`, `state/07` | ✅ aligné |

### Nuances tranchées par la seconde passe (à respecter en exécution)

1. **SEO & GEO IA n'est PAS une page de service séparée.** La doctrine §2 le liste comme sous-sujet
   d'Acquérir, mais pour respecter §3 (ne pas disperser), il reste **fusionné** dans
   `/services/content-marketing-intelligent` + **ancre `#seo-geo`** sur le hub `/acquerir`. Créer une
   4ᵉ page SEO/GEO indexée contredirait le principe directeur.
2. **Agent marketing & commercial + Publicité en ligne** : présents dans l'offre Growth System IA mais
   **différés**. Pas de page `/services/*` maintenant. Au mieux : sections/ancres sur le hub `/acquerir`
   (« à venir » crédible), jamais des pages enfant indexées tant que l'autorité n'est pas construite.
3. **Nommage à 3 couches** (cohérent, à appliquer partout) : navigation = **verbe** (Acquérir) · offre
   sur le hub = **marque** (Growth System IA, garde « IA ») · pages de service = **promesse**
   (« intelligent »). Les trois coexistent sans contradiction.
4. **Méga-menu** (P0.5-a) : la colonne Acquérir liste les sous-sujets, mais **seuls** site web /
   content marketing / tunnel pointent vers de vraies pages `/services/*`. SEO/GEO → ancre. Publicité +
   agents → hub/ancre « à venir ». **Zéro lien de nav vers une page inexistante** (anti-orphelin nav).

### Implication d'exécution (état au 2026-06-13)

- ✅ Fondation routing `/services` + `/lp` (P0.3-j), 3 pages service fondées (P0.3-c/d/e) avec le
  nommage « intelligent », indexables, build vert.
- ⏭️ Reste Phase B : hub `/acquerir` (P0.3-a, présente Growth System IA + 3 services + ancres
  `#seo-geo`/`#publicite`/`#agent-marketing`) · piliers `/piloter` (P0.3-f) + `/operer` (P0.3-g) à
  ancres · méga-menu 3 colonnes (P0.5-a) respectant la nuance n°4.
- ⏭️ Phase C : landings `/lp/*` (CRO) + quizz lead magnet de scoring (cf tunnel : nurturing
  conditionnel aux interactions email + réponses scoring) + agents/publicité si l'autorité le permet.
