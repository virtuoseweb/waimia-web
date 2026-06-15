# 52 — État final du site (spec définitive : whitelist + suppressions)

> **Pour Claude Code. Doc maître de l'état cible du site.** Remplace l'approche
> « noindex massif » par une **base minimale saine** : on garde une whitelist de pages
> excellentes, **on supprime tout le reste** (fictif / thin / vide / interne sans valeur),
> régénérable plus tard. Aucune redirection (domaine neuf, zéro autorité à préserver).
> Complète `docs/strategy/01-silo-site-web-ia` (stratégie silo) + `docs/state/01-chantiers` (état projet). Pour le détail du
> maillage silo : `docs/archive/50-SILO-RUNBOOK-EXECUTION`. Branche `feat/*`, preuve GF-1, jamais sur `main`.

---

## 0. Doctrine (best practices, domaine neuf)

- **Chaque URL est un vote de pertinence.** 25 pages excellentes > 375 dont 90 % vides.
  Google attribue l'autorité à un domaine cohérent et resserré, pas à un généraliste dilué.
- **Supprimer > noindexer** pour le fictif/thin : une page noindex reste de la dette
  (build, nav, maintenance, risque de découverte). Le noindex n'est gardé **que** pour les
  outils internes du design system.
- **Pas de redirection** : site neuf, aucune équité de lien à transférer. On supprime net.
- **Vérité E-E-A-T** : zéro chiffre/client/certif inventé. La preuve réelle = `waimia.com`,
  `virtuoseweb.fr` (sites IA-native de Simon) + vrais cas (Inbound Value, Amploi, Balzeo,
  Carnets de Montpellier, Desangles Peinture, naturopathe, import-export).
- **GEO by default** : pages statiques, JSON-LD, `llms.txt`, sitemap propre, < 5 cookies.
- **UX/conversion** : 1 CTA primaire par page, ordre de section douleur→preuve→offre→action
  (§5), preuve sociale réelle uniquement.
- **Lancement monolingue FR** (cf §1) : le bilingue double la surface thin et fractionne le
  budget de crawl sur un domaine sans autorité. EN archivé jusqu'à traction.

> 🔴 **P0 BLOQUANT AVANT PROSPECTION — pricing en prod.** Le pilier `/offres/site-web-ia` affiche
> aujourd'hui **7 900 €** (et jusqu'à 50 k€ ailleurs) : **hors-marché et faux** vs la grille réelle
> **3 000 € HT**. Démarcher depuis un site qui ment sur son prix = pire scénario pour une marque
> « preuve, pas promesse ». **Correction 7 900 € → 3 000 € HT à exécuter AVANT le 1er email outbound**
> (chantier déjà cadré, cf `strategy/01 Batch 4`, `strategy/03 §2`, `state/03 §C6`, §6 step 8 ci‑dessous).

---

## 0bis. ARCHITECTURE : 1 silo SEO + 3 piliers vitrine légers (2026-06-12 — ⚠️ AMENDÉ par ADR-003, cf §0ter)

> ⚠️ **AMENDÉ le 2026-06-13 par `specs/03-ADR-003` + `strategy/06` (canoniques).** Ce §0bis décrit l'état
> ADR-002 (« Acquérir = vitrine légère »). **ADR-003 a depuis OUVERT Acquérir en silo développé** (hub
> `/acquerir` + pages `/services/*` + `/lp/*`). Lire **§0ter** (consolidation à jour). Piloter + Opérer
> restent vitrine gelée comme décrit ici. En cas de divergence : ADR-003 + §0ter gouvernent.

> Validée Simon + arbitrage expert. **Ce n'est PAS un revirement de l'anti-dilution** : on
> tuait les ~19 pages séparées (Piloter/Opérer/Acquérir) ; on les **consolide** ici en 3 pages
> au lieu de les supprimer sèchement — même objectif (zéro page thin), mais l'offre reste
> **visible** (menu complet, crédibilité, funnel consulting). Supersede §1-§3 partout où ils
> traitent les enfants « Acquérir » en pages séparées indexées.
>
> **Règle d'expert non négociable (domaine neuf) :** le **pari SEO/GEO reste concentré sur UN
> seul silo = Site web IA**. Les 3 piliers sont des **pages vitrine légères de conversion**, PAS
> des silos SEO : 1 page chacune, sections ancrées, **aucun cluster d'articles**, **aucun ciblage
> keyword offensif** (surtout Data/Opérer où l'expertise/les cas manquent). Référencer les 4 de
> front = la dilution qu'on évite. Résultat : **~4 pages cœur** au lieu de 19, 1 seul vrai silo.

**Le silo profond (SEO/GEO) — où l'on mise :**
- **Site web IA** — `/offres/site-web-ia` = pilier + **cluster d'articles blog** in-silo. C'est
  LE silo où Simon est légitime ; sa profondeur vient du **contenu** (articles), pas de sous-pages
  services. Produit d'appel.

**Les 3 piliers d'offre (vitrine globale, sections ancrées, anti-dilution) :**
1. **Growth System IA** — `/offres/growth-system-ia` = pilier **Acquérir** (« trouver des
   clients »). Sections ancrées : `#site-web-ia` (résumé + lien vers le silo dédié), `#seo-geo`,
   `#content-marketing`, `#publicite`, `#tunnel-de-vente`, `#agent-marketing`. Le système complet
   d'acquisition/conversion. C'est l'offre vedette et le pilier qui contient tout « Acquérir ».
2. **Data & Analytics** — `/solutions/data-analytics` = pilier **Piloter** (« voir & décider »).
   Sections ancrées : `#revops`, `#tableaux-de-bord`, `#reporting-ia`, `#donnees-centralisees`,
   `#previsionnel-ia`, `#agent-analytique`. *(Terrain du partenaire : on garde le pilier mais on
   ne mise pas le SEO dessus — pas de cluster d'articles.)*
3. **Automatisation & Agents IA** — `/solutions/automatisation-agents-ia` = pilier **Opérer**
   (« gagner du temps »). *(Nom retenu = optimal SEO pour « automatisation IA » + « agents IA » +
   configuration IA ; à confirmer Simon.)* Sections ancrées : `#crm-relances`, `#automatisation`,
   `#service-client`, `#admin-rh`, `#legal`, `#agents-metiers`.

**Méga-menu** (les 3 colonnes Acquérir/Piloter/Opérer, cf maquette) : chaque lien pointe vers
l'**ancre** de section du pilier correspondant — **sauf « Site web IA »** qui pointe vers sa page
silo dédiée. Plus **aucune** page `/solutions/<sous-service>` séparée.

**Conséquence vs §2-§3 (suppressions) :** les 13 solutions Piloter/Opérer + les 5 enfants
Acquérir séparés ne deviennent **pas** des pages indexées séparées ; leur **contenu est fusionné
en sections ancrées** des 3 piliers. On supprime les **routes/pages séparées** (anti-dilution),
on **garde et réorganise le contenu**. Le fictif/thin hors de ces familles reste supprimé comme prévu.

**Indexation cible :** 4 piliers (`site-web-ia`, `growth-system-ia`, `data-analytics`,
`automatisation-agents-ia`) + `audit-maturite-ia` + home + pages de confiance + cas/secteurs +
légal. Le silo Site web IA porte le **cluster d'articles**. Data & Analytics et Automatisation
indexés mais **sans cluster** (pas de mise SEO offensive : expertise partenaire / pas de cas réels).

**À construire (chantier Claude Code, cf `state/02-plan-execution`) :** créer les 3 pages piliers
en **sections composables ancrées** (réutiliser les sections cataloguées — anti-orphelin), câbler
le méga-menu sur les ancres, fusionner le contenu existant des solutions dans les sections.

---

## 0ter. ARCHITECTURE FINALE DE LANCEMENT — URLs + nav (site NEUF, 0 redirection) — TRANCHÉ 2026-06-14

> **Site neuf = aucune autorité à préserver → AUCUN 301 / canonical / redirection.** On ne migre
> pas, on **part propre** : on crée directement les bonnes URLs et on **ne crée jamais les
> doublons** (la « cannibalisation site web IA » se règle en n'ayant qu'**UNE** page, pas en
> redirigeant). Cette section **fige les slugs définitifs** et **supersede** les chemins cités en
> §0bis/§1 (qui gardent la logique, pas l'URL exacte).
>
> **Validé par SERP réelle (2026-06-14)** : « agence IA France » = SERP 100 % classements/comparatifs
> → **imprenable**, on n'y va pas. AI Overview Google **toujours inactif en FR** (droits voisins +
> AI Act) → GEO = **assistants directs** (ChatGPT/Perplexity/Claude), mais on reste *AI-Overview-ready*
> via schema. SERP « site web IA » = comparatifs « outils IA vs agence » + constat « sites pondus par
> IA mal optimisés SEO/RGPD » → **coin de Waimia : IA-native AVEC la rigueur d'agence**.

### Nom de catégorie : « site web intelligent » (TRANCHÉ — brand) vs « IA » (keyword secondaire)
**La catégorie/marque = « site web intelligent »**, PAS « site web IA » (se démarque du flot d'outils
« site IA » cheap, plus durable, moins buzzword). **Mais** « site web IA » / « site IA » / « IA-native »
restent des **mots-clés de recherche secondaires** à garder dans le H1-sous-titre, le corps et les
articles (capture SEO). Règle : **titre/marque/URL = « intelligent » ; copy de support = « IA » en
appui.** *(Tradeoff assumé : « intelligent » a probablement moins de volume que « IA » ; on compense en
gardant « IA » dans le contenu et en s'appuyant sur l'intention volumique « création site web » + le local.)*

**Positionnement CADRE (TRANCHÉ 2026-06-14, détail + keywords `strategy/03 §7`)** : Waimia = **cabinet
d'orchestration IA / conseil en transformation IA** qui fusionne conseil + technique d'agence + ingénieurs
qui construisent agents/automatisations/workflows + dev site/app. **PAS une agence web** (catégorie
commoditisée + menacée par l'IA). Le **site web intelligent = porte d'entrée tangible** (preuve, pas
produit) ; la marque mène par le **système/résultat** (« votre PME qui tourne à l'IA »). SEO en **2 couches** :
(A) **capture/conversion** = site web intelligent + local Montpellier ; (B) **autorité/GEO** = transformation
IA PME, automatisation, agents, diagnostic IA (angle aides « Osez l'IA »), cabinet conseil IA. Échelle
**low→high ticket** (audit/2k → 4k → 7k → 10k → sur-mesure). Ton = praticien + ingénieur + conseil, jamais « agence web ».

### Architecture canonique (ADR-003) — le silo Acquérir est OUVERT, pas une vitrine
> ⚠️ **Source canonique = `strategy/06` + `specs/02-ADR-002` + `specs/03-ADR-003` + `state/06`/`07`/`08`**
> (validés Simon 2026-06-13). Cette section les **consolide** en map livrable ; en cas de divergence,
> EUX font foi. Évolution clé : ADR-003 **ouvre le pilier Acquérir en silo SEO développé** (pas une
> vitrine légère comme le disait §0bis sous ADR-002).

**Nommage 3 couches** : nav = **verbe** · hub = **marque** (garde « IA ») · page service = **promesse** (« intelligent ») :
- **Acquérir** → hub `/acquerir` (offre **Growth System IA**) = **LE silo SEO développé** : hub + vraies
  pages `/services/*` + landings `/lp/*` + cluster d'articles. 100 % de l'effort SEO ici.
- **Piloter** → `/piloter` (offre **Business Intelligence**) = **1 page pilier à ancres, gelée**, jamais offensif.
- **Opérer** → `/operer` (offre **Operations IA**) = **1 page pilier à ancres** (+ 0-2 pages enfant tolérées), gelée.

### Carte d'URL V1 (~26-28 indexées)
**Silo Acquérir (où l'on mise) :**
| URL | Rôle |
|---|---|
| `/` | Home (marque + preuve réelle) |
| `/acquerir` | **HUB silo** Growth System IA (+ ancres `#seo-geo`, `#publicite` « à venir », `#agent-marketing` « à venir ») |
| `/services/site-web-intelligent` | Page service SEO riche (flagship, porte d'entrée) |
| `/lp/site-web-intelligent` | Landing conversion (CRO) |
| `/services/content-marketing-intelligent` | Service — **fusionne content marketing + SEO/GEO** (pas de page SEO séparée, ADR-003 nuance #1) |
| `/lp/content-marketing-intelligent` | Landing |
| `/services/tunnel-conversion-intelligent` | Service tunnel de conversion |
| `/lp/tunnel-conversion-intelligent` | Landing |
| `/ressources/blog/*` (6 articles in-silo) | profondeur éditoriale du silo |

> **Différés (ADR-003 #2)** : Publicité + Agent marketing/commercial = **pas de page** maintenant → ancres
> « à venir » sur `/acquerir`. SEO & GEO = **pas de page séparée** (fusionné dans content-marketing-intelligent).

**Piliers vitrine gelés (jamais SEO offensif — ADR-002 maintenu) :**
| URL | Offre | Ancres (même page) |
|---|---|---|
| `/piloter` | Business Intelligence | `#revops` `#tableaux-de-bord` `#reporting-ia` `#donnees-centralisees` `#previsionnel-ia` `#agent-analytique` |
| `/operer` | Operations IA | `#crm-relances` `#automatisation` `#service-client` `#admin-rh` `#legal` `#agents-metiers` |

**Appel :** `/offres/audit-maturite-ia` (audit quick win — gardé tel quel, hors périmètre refonte, `state/06`).
**Confiance/E-E-A-T :** `/agence` (studio solo, about+méthode), `/manifeste`, `/equipe/simon-beros`, `/cas-clients` (vrais cas), `/contact`.
**Ressources :** `/ressources` (hub), `/ressources/outils/calculateur-roi-ia`, `/ressources/academy`, cluster blog.
**Autorité :** `/expertise-claude` (ex-`/technologies/claude-models`).
**Légal :** `/mentions-legales`, `/politique-de-confidentialite`, `/cgv`, `/plan-du-site`, `/404`.
**Internes DS (noindex `robots disallow`) :** `/agence/{design-system,ds-studio,hero-lab}`, `/preview/*`, `/components/*`, `/categories/*`.

> ✅ **2 décisions TRANCHÉES (Simon, 2026-06-14) :**
> 1. **Page locale `/agence-web-montpellier` = OUI en V1.** Cible « agence web / création site internet
>    Montpellier », cash local rapide (E-E-A-T + GBP authentique). Rattachée au silo Acquérir (même thème,
>    maillage vertical, **zéro porosité**). Indexée. Reachable home (CTA local) + `/agence` + footer ; **hors
>    top-nav** (nav épurée). Schema `LocalBusiness`. = front local du silo, en plus du national `/services/site-web-intelligent`.
> 2. **Pricing = grille 4 paliers (TRANCHÉ Simon 2026-06-14 — remplace 3k/9k/12k ET le 7 900 € du site live)** :
>    | Palier | Prix HT | Inclus |
>    |---|---|---|
>    | **Essentiel / landing** (porte d'entrée cash-first) | **2 000 €** | landing-site 1-3 pages + SEO/GEO + mise en ligne |
>    | **Croissance** | **4 000 €** | site 3-5 pages + connexion IA (Claude/GPT) + skills + automation contenu de base |
>    | **Complet** | **7 000 €** | site complet + CMS intelligent + système de contenu + intégrations |
>    | **Intelligence** (système) | **10 000 €** | + dashboard + agents + automations → pont vers Growth System IA |
>    | **Sur mesure** | **sur devis** | ETI / besoins spécifiques : app dédiée, multi-sites, intégrations lourdes → bascule Growth System IA |
>    → rendu sur `pricing-cards` (`state/07` #11). ⚠️ schéma `tiers` = **max 4** : afficher les **4 paliers chiffrés** + « Sur mesure » en **5ᵉ carte/aside CTA** (ou bumper le schéma à 5 — décision d'exécution). **Plancher du modèle financier = 2 000 €.**
>    **À PROPAGER** (réf canonique = cette grille) : `business/06` (fiches), `08` (quick wins/CA), `13` (modèle financier — **recalculer le point mort**, panier moyen ↑), `state/08` (brief v6), `marketing/01`, + corriger le **7 900 €** du site live (P0).

### Méga-menu V1 — réorganisation (l'actuel `src/data/mega-menu.ts` = doublons + liens morts)
L'actuel mappe depuis `sitemap.ts` et pointe vers des pages **supprimées** (`/solutions/acquisition-ia`,
`/offres/growth-intelligence`, `/offres/revops`, `veille-ia`, `cookbooks`, `VirtuoseOS`…) + **mélange**
« Site web IA » et `/services/site-web-intelligent`. **Cible = 3 colonnes verbes, 1 lien = 1 page réelle :**

| Colonne (verbe) | Liens RÉELS (pages) | Ancres (même page) | À supprimer (doublon/mort) |
|---|---|---|---|
| **Acquérir** (`/acquerir`) | Site web intelligent `/services/site-web-intelligent` · Content marketing intelligent `/services/content-marketing-intelligent` · Tunnel de conversion `/services/tunnel-conversion-intelligent` | SEO & GEO `#seo-geo` · Publicité `#publicite` *(à venir)* · Agent marketing `#agent-marketing` *(à venir)* | acquisition-ia, contenu-seo-geo-ia (→ fusionnés), site-web-ia (ancien label) |
| **Piloter** (`/piloter`) | *(aucune page enfant)* | RevOps `#revops` · Tableaux de bord `#tableaux-de-bord` · Reporting IA `#reporting-ia` · Données `#donnees-centralisees` · Prévisionnel `#previsionnel-ia` · Agent analytique `#agent-analytique` | growth-intelligence, productivite-ia (mal classé) |
| **Opérer** (`/operer`) | *(0-2 pages enfant tolérées)* | CRM & relances `#crm-relances` · Automatisation `#automatisation` · Service client `#service-client` · Admin & RH `#admin-rh` · Légal `#legal` · Agents métiers `#agents-metiers` | productivite-operationnelle-ia, support-client-ia (doublon) |

**Autres colonnes :** **Ressources** = Blog · Outils (calculateur ROI) · Academy *(supprimer livres-blancs,
veille-ia, cookbooks, cas VirtuoseOS)*. **Agence** = À propos `/agence` · Méthode · Manifeste · Simon Beros
`/equipe/simon-beros` *(supprimer docs, governance, trust-center, careers)*. **CTA** = Audit gratuit. **Footer**
= + Agence web Montpellier (si validée) · légal · plan du site.

> Règles méga-menu (ADR-003 nuance #4) : **zéro lien vers une page inexistante** (anti-orphelin nav) ; un
> sous-sujet sans page réelle = **ancre** sur le pilier, jamais un lien mort ; « à venir » crédible pour
> Publicité/Agents. Édition = `src/data/mega-menu.ts` (+ délier de `sitemap.ts` les entrées supprimées).

### Mapping du sitemap RÉEL (206 URLs → ~26)
| Dossier (live) | URLs | Décision |
|---|---|---|
| Racines / statiques | 13 | **GARDER** `/` (home), `/acquerir` · `/piloter` · `/operer` (3 piliers = verbes, gardés), `/contact`, `/manifeste`, légal ×2, `/plan-du-site`, `/cgv` · `/cas`→`/cas-clients` · **SUPPRIMER** `/commerce` (GARDER `/secteurs` : hub peuplé data-driven) |
| `/agence` | 6 | GARDER `/agence` (+about+méthode fusionnés) · NOINDEX `ds-studio`, `hero-lab` · **SUPPRIMER** `/agence/prompts` (fuite interne) |
| `/comparer` | 11 | **SUPPRIMER** (doorway) |
| `/equipe` | 2 | GARDER `/equipe/simon-beros` |
| `/glossaire` | 31 | **SUPPRIMER** (thin, off-silo) |
| `/integrations` | 21 | **SUPPRIMER** (doorway ; garder le composant section sur sa demo) |
| `/offres` | 34 | GARDER `audit-maturite-ia`, `growth-system-ia`→ devient hub `/acquerir` · **RECYCLER** `site-web-ia`(.astro)→`/services/site-web-intelligent` + `/lp/` · **SUPPRIMER** 6 offres secondaires + 20 tunnels |
| `/ressources` | 62 | GARDER hub, `outils/calculateur-roi-ia`, `academy`, **6 articles in-silo** · **SUPPRIMER** categorie/tag/silo/cookbooks/livres-blancs/veille-ia/personas |
| `/services` | 3 | **base des 3 pages service Acquérir** : fonder `site-web-intelligent`, `content-marketing-intelligent`, `tunnel-conversion-intelligent` (supprimer les stubs actuels) |
| `/solutions` | 21 | **SUPPRIMER les 20 métiers** (contenu → ancres des piliers `/piloter`/`/operer` ou fusion Acquérir) ; **aucune** page `/solutions/*` séparée |
| `/technologies` | 2 | GARDER `claude-models`→`/expertise-claude` |

**Résultat : 206 → ~26 indexées.** Supprimé = **404 net** (0 redirection, domaine neuf), régénérable
(collections gardées en infra). Sitemap + `/plan-du-site` = whitelist only.

### Sections par page V1 (templates retenus)
- **3 pages service Acquérir** (`/services/*`) : séquence **canonique 13 sections déjà spécifiée + template
  buildé** → `state/07-template-page-service` (hero-conversion-funnel → proof-bar → problems-grid →
  diagnostic-stages → method-timeline → workflow-table → feature-split-media → deliverables-grid →
  stats-bento → comparison-duo → pricing-cards → faq-two-column → footer-cta-band). **Réutiliser tel quel**,
  adapter le contenu par service. *(SEO/GEO = section dédiée dans content-marketing-intelligent.)*
- **Landings `/lp/*`** : variante CRO allégée (hero + problème + preuve + offre + FAQ + CTA), Phase C (`state/08`, `specs/03 §Phase C` + quizz lead-magnet de scoring).
- **Piliers `/piloter` `/operer`** : hero pilier + 1 bloc par sous-sujet ancré (`#…`) + preuve + CTA — **séquence à figer** (pas encore spécifiée comme les services). Sections cataloguées, anti-orphelin.
- **Home, `/agence`, `/cas-clients`, `/manifeste`** : **audit des sections existantes** (garder/retirer/ajouter) à la passe assainissement — viser « suffisant », **0 section creuse**, 0 doublon.

---

## 1. ÉTAT FINAL — whitelist des pages qui SURVIVENT (~28 URLs)

Tout ce qui n'est pas listé ici est **supprimé** (§2).

### Conversion : 1 silo SEO + 3 piliers vitrine (indexées — cf §0bis FAIT FOI)
- `/` — home réécrite, focalisée silo + preuve réelle
- `/offres/site-web-ia` — **PILIER SILO SEO/GEO** (money page, palier d'appel 3 000 € HT) + **cluster d'articles blog**
- `/offres/audit-maturite-ia` — produit d'appel « audit quick win »
- `/offres/growth-system-ia` — **PILIER VITRINE « Acquérir »** (1 page, sections ancrées `#site-web-ia`/`#seo-geo`/`#content-marketing`/`#publicite`/`#tunnel-de-vente`/`#agent-marketing` — AUCUN cluster, AUCUN ciblage KW offensif)
- `/solutions/data-analytics` — **PILIER VITRINE « Piloter »** (1 page, sections ancrées — sans cluster)
- `/solutions/automatisation-agents-ia` — **PILIER VITRINE « Opérer »** (1 page, sections ancrées — sans cluster)
- `/offres` — hub (offres réelles only)
- `/solutions` — hub resserré (renvoie aux piliers vitrine)

> **Les 5 « enfants Acquérir »** (contenu-seo-geo, content-marketing, tunnel-de-vente, publicité, agent-marketing) **ne sont PLUS des pages indexées séparées** : ce sont des **sections ancrées** du pilier Growth System IA (§0bis). Idem pour les 13 services Piloter/Opérer → sections des deux autres piliers. **AUCUNE** page `/solutions/<sous-service>` séparée. Le **cluster d'articles** reste sur le **seul** silo Site web IA.

### Agence / confiance (indexées, assainies véridiques)
- `/agence/about` — **réécrite** : Simon Beros / studio solo, pas d'agence à 10 ni bureaux Genève
- `/agence/methode` — méthode réelle (corriger l'ancienneté)
- `/agence` — index slim (ou fusionné dans about)
- `/manifesto` — pièce de marque (chiffres inventés retirés)
- `/equipe` + `/equipe/simon-beros` — page auteur (E-E-A-T fondateur, bio véridique)
- `/contact` — form + cal.com réel (fausses adresses retirées)

### Ressources (silo only)
- `/ressources` — hub slim
- `/ressources/blog` + **6 articles in-silo** (§2 liste)
- `/ressources/outils` + `/ressources/outils/calculateur-roi-ia` — outil réel
- `/ressources/academy` — diagnostic lead-gen réel (`/api/academy`)

### Autorité / GEO
- `/technologies` + `/technologies/claude-models` — positionnement écosystème Claude/Anthropic

### Cas clients RÉELS (à recréer, cf §3)
- `/cas` + cas **réels** (remplacent les fictifs supprimés)

### Légal / utilitaire (à créer, cf §3)
- `/mentions-legales` — **obligatoire (à créer)**
- `/politique-de-confidentialite` — **RGPD, obligatoire (à créer)**
- `/plan-du-site`, `/404`

### Internes DS — seul cas de NOINDEX conservé (outils de travail, `robots disallow`)
- `/agence/{design-system, ds-studio, hero-lab}`, `/preview/*`, `/components/*`,
  `/categories/*`, `/compare/organisms` — gardés noindex (déjà), utiles au workflow DS.

---

## 2. À SUPPRIMER — tout le reste (manifeste flat)

> Procédure sûre par cible : (1) `grep -rn "<slug|collection|route>" src` → recenser les
> réfs (nav, demos, sitemap, registry, i18n) ; (2) supprimer fichiers collection + routes
> `.astro` ; (3) nettoyer nav (`mega-menu.ts`, `Footer.astro`, `sitemap.ts`) + manifest/tags ;
> (4) si une **section cataloguée** consommait la collection → la basculer sur
> `section-demos.ts` (NE PAS supprimer le composant section = casse `check-touchpoints`) ;
> (5) `build` vert + `astro check` 0 erreur + gates `check-*` = preuve GF-1.

### A — Collections + routes (suppression franche)
| Cible | Note blast |
|---|---|
| `comparisons` (10) + `/comparer/*` (fr+en) | auto-contenu. Clean. |
| `glossary` (30) + `/glossaire/*` | auto-contenu. **Décision : supprimé** (vocabulaire IA général, thin, off-silo ; un glossaire GEO focalisé pourra être régénéré plus tard). |
| `integrations` (40) + `/integrations/*` | **garder** la section `IntegrationsGrid` (demo). Nettoyer `mega-menu.ts`, `sitemap.ts`, `tags.ts`, `library-manifest.ts`, réf `offres/site-web-ia-landing`. |
| `commerce` (15, faux Stripe) + `/commerce/*` | recâbler `bienvenue/commande`, `secteurs/index`, `integrations/index`, `schema-builder.ts`. |
| `testimonials` (5 fictifs) + `/ressources/testimonials/*` | **garder** `TestimonialBlock` ; **recâbler `index.astro` (home, ligne 229) + `cas/index` sur la demo**. |
| `personas` (3) + `/ressources/personas/*` | garder `PersonaSwitcher`/`PersonaAttributesGrid` (vérifier qu'ils lisent la demo, sinon basculer). |
| `tunnels` (20) + `/offres/[offre]/tunnel/[step]` | funnels internes ; vérifier usage `index.astro` avant suppression. |

### B — Offres secondaires (collection `offres`, 8 + 1 page)
`activation-ia`, `application-ia-pme`, `claude-cowork`, `conseil`, `growth-intelligence`,
`infrastructure-ia`, `productivite-operationnelle-ia`, `composable-pilot` (stub 439 mots),
`/offres/revops`, `/offres/site-web-ia-landing`. → **supprimés** (on garde 3 offres réelles).

### C — Solutions secondaires (collection `solutions`, 15)
Piloter : `tableaux-de-bord-analytics`, `reporting-ia`, `donnees-centralisees`,
`previsionnel-ia`, `agent-analytique`, `finance`. Opérer : `crm-relances-ia`,
`productivite-ia`, `support-client-ia`, `administration-rh-ia`, `legal-ia`,
`agents-metiers`, `fintech`. + `acquisition-ia` (fusionner l'utile dans le pilier) +
`site-web-ia-pme` (remonter les `pains` dans le pilier puis supprimer). → **supprimés**
(pas d'expertise/case study réel ; régénérables quand un silo est réellement étendu).

### D — Agence / démos fictives
`/agence/{careers, docs, governance, trust-center}` (dont **risque légal** trust-center :
fausses certifs ISO/SOC2/RGPD — la suppression règle le risque), `/console`, `/atlas`
(démos produit fantôme). Retirer leurs liens dans `mega-menu.ts` (Agence).

### E — Ressources hors silo
`changelog` (fictif), `veille-ia` (1 entrée vide), `field-notes` (+ collection),
`livres-blancs` (`ai-act-readiness` + collection), **cookbooks** (index 6 fictifs + 3
standalone off-silo + collection), `personas`, `testimonials`. + taxonomies
`/ressources/{categorie,tag,silo}/*`.

### F — École
`ecole` (3 cours stub, Stripe PLACEHOLDER) + `/ecole/*`. Régénérer au vrai go-live produit.

### G — Blog hors silo (15 articles → supprimer ; garder les 6 in-silo)
**GARDER (6)** : `seo-geo-etre-cite-par-les-ia-generatives`,
`automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil`, `cabler-son-crm-en-10-jours`,
`avis-n8n-vs-zapier-2026`, `agent-ia-vs-automatisation-classique-2026`, `essai-pillar-ia-pme-2026`.
**SUPPRIMER (15)** : `adoption-composable-v2`, `composable-adoption` (doublon),
`anti-hallucination-design-system`, `design-system-ferme`, `parallelisation-sonnet`,
`pas-une-stack-un-systeme-architectes`, `avis-claude-3-7-sonnet`, `avis-rag-vs-fine-tuning-pme`,
`gpt-4o-vision-update`, `ce-qu-un-audit-de-flux-revele-vraiment`,
`le-syndrome-du-dashboard-isole`, `pourquoi-vos-tableaux-de-bord-mentent`,
`note-3-erreurs-prompt-engineering`, `note-pourquoi-claude-pas-gpt`, `note-rgpd-vs-anthropic-api`.

### H — Technologies & secteurs & cas fictifs
- `technologies/virtuoseos` (projet relégué) + stubs `claude-code/claude-surfaces/frameworks`
  + `microsoft-power-platform` (404, lié en nav → retirer les liens `partners.ts`,
  `section-demos.ts`, `mega-menu.ts`). Garder `claude-models`.
- **`secteurs` (3) + `cases` (4 fictifs)** : supprimer le contenu fictif. **Garder les
  composants/templates** (CaseStudy, secteur) pour reconstruire `/cas` avec les **vrais cas**
  (§3). `/cas` et `/secteurs` indexés seulement une fois peuplés de réel.

### I — Versions `/en/` (toutes)
Supprimer le miroir `/en/*` (lancement monolingue FR). Garder l'infra i18n pour réactiver
plus tard. *(Réversible ; décision best-practice domaine neuf FR.)*

---

## 3. À CRÉER (combler les vrais manques)

- `/mentions-legales` + `/politique-de-confidentialite` — **obligatoires** (n'existent pas,
  juste référencées dans `sitemap.ts`). Bloquant conformité.
- **Cas clients réels** : 2-3 pour le lancement (Inbound Value, Amploi, Balzeo, Carnets de
  Montpellier, Desangles Peinture, naturopathe, import-export) — priorité contenu Mois 1.
- **2 pages Hub** Piloter/Opérer **NON** retenues : supprimées, pas créées (le menu se
  resserre au silo). *(Révision vs `docs/archive/50-SILO-RUNBOOK-EXECUTION` : avec suppression des 13 solutions, plus
  besoin de Hub.)*
- **Pilier enrichi** `/offres/site-web-ia` (cf §5) — H1 figés via passe keyword **gratuite**
  (`strategy/01 §7` + `strategy/03` recherche SEO).
- Cluster éditorial : 4-6 articles in-silo supplémentaires (Mois 2).

---

## 4. À RÉPARER avant suppression du reste
- `/technologies/microsoft-power-platform` : 404 lié en nav → retirer les liens (la page est
  supprimée de toute façon, §2H).
- Liens demo → 404 résiduels (`docs/state/01-chantiers §d`) disparaissent avec les suppressions ; vérifier
  `check-content-refs` au build.

---

## 5. Ordre des sections — pilier `/offres/site-web-ia` (canonique conversion)
1. **Hero** : H1 prestation, sous-titre bénéfice, 1 CTA primaire (audit), 3-4 stats réelles.
2. **Douleur** (pains) : 3-4 douleurs concrètes du prospect.
3. **Promesse / transformation** : avant→après mesurable.
4. **Preuve** : `waimia.com`/`virtuoseweb.fr` + vrais cas (quand prêts).
5. **Mécanisme** : Audit → Génération Astro → Édition par IA → GEO.
6. **Différenciation** : IA-native vs WordPress/Webflow (perf, maintenance, coût, IA-friendly).
7. **Offre / pricing** : 3 000 € HT → escalade Growth System IA.
8. **Maillage silo** : liens vers les 5 enfants.
9. **FAQ** (schema.org) : longue-traîne + objections.
10. **CTA final** : audit quick win / RDV.

> Anti-orphelin : composer via sections cataloguées (`SectionsRenderer` + `sections:`),
> jamais de markup inline. Enfants silo : même squelette, allégé.

---

## 6. Séquence d'exécution (Claude Code)

1. **Réparations de liens** (§4) pour éviter les casses pendant la purge.
2. **Suppression A→I** (§2) par lots cohérents (1 commit/lot, `git add` ciblé). Recâbler les
   sections consommées (home/cas/secteurs → demo). Build vert + gates à chaque lot.
3. **Méga-menu + Footer** resserrés sur la whitelist (§1) : nav = Offres (Site web IA / Audit
   / Growth System) · Expertises silo · Cas · Ressources · Agence · Contact.
4. **Assainissement véridique** des pages gardées (about, manifesto, methode, contact, equipe).
5. **Création légal** (§3) + **cannibalisation** : remonter `site-web-ia-pme` → pilier,
   supprimer `site-web-ia-landing`.
6. **Cas réels** (§3) — `/cas` + `/secteurs` repeuplés.
7. **Pilier enrichi + ordre sections** (§5) — H1 via passe keyword gratuite (`01 §7` / `53`).
8. **Pricing 3 000 €** + **cluster éditorial** (Mois 2).
9. **Vérif finale** : `build` + `astro check` + sitemap = ~28 URLs FR, 0 orphelin, 0 lien
   mort (`check-content-refs`), 0 page fictive indexée.

---

## 7. Décisions tranchées (arbitrages résolus — position d'expert)
- **Glossaire** → **supprimé** (thin, off-silo ; régénérer focalisé GEO plus tard si besoin).
- **13 solutions Piloter/Opérer + 8 offres secondaires** → **supprimées** (pas d'expertise/
  preuve réelle ; régénérables à l'extension réelle d'un silo).
- **Cas + secteurs + testimonials fictifs** → **supprimés** ; templates gardés ; reconstruits
  avec du **réel**. Un cas fictif indexé est un passif E-E-A-T, pas un actif.
- **Identité fictive** (agence 10 / Paris-Genève / certifs) → **véridicisée partout**
  (studio solo). *Croyance limitante nommée : « il me faut une légitimité externe avant que
  ça compte » → le décor d'agence. La preuve = un client qui paie, pas un faux bureau.*
- **EN** → **archivé** (lancement FR monolingue, réactivable).
- **Outils DS internes** → gardés en noindex (seule exception au « supprimer > noindexer »).
