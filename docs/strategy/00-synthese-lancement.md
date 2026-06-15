# 00 — Synthèse de lancement Waimia (menu + stratégie) — SOURCE RAPIDE

> **À lire en premier pour le lancement V1.** Synthèse triée et à jour (2026-06-14) des décisions de
> lancement. C'est un **point d'entrée** : le détail vit dans les docs canoniques cités en bas. En cas
> de divergence, les sources canoniques (`specs/03-ADR-003`, `strategy/06`, `strategy/02 §0ter`,
> `strategy/03 §7`) font foi.

---

## 1. Positionnement (le fil rouge)

**Waimia = cabinet d'orchestration IA / conseil en transformation IA.** PAS une agence web.
Fusionne : conseil (méthode/audit/process) + technique d'agence + ingénieurs qui construisent
agents IA / automatisations / workflows + dev site/app.

- Le **« site web intelligent » = porte d'entrée tangible** (preuve visible, **pas** le produit).
- On mène par le **système / résultat** (« votre PME qui tourne à l'IA »), jamais par « un site ».
- Positionnement **AI-proof** : on est celui qui **orchestre** l'IA, au-dessus de la commodité
  (≠ créateur de sites menacé par Wix/Lovable/Framer).
- **Accessible PME** : échelle low → high ticket.
- Ton : praticien + ingénieur + conseil. Signature manifeste (« X. Pas Y. », « vous » + douleur
  chiffrée, fragments secs). Bannir en accroche : « agence web », « création de sites ».
- Validé marché 2026 : « revanche des cabinets conseil IA » ; aides « Osez l'IA » (≤ 50 % financé),
  diagnostic IA 40 % État ; ROI médian PME **159 % à 12 mois**.

---

## 2. Architecture du site (ADR-003 — canonique)

**1 seul silo SEO développé = Acquérir.** Les deux autres piliers restent vitrine gelée (domaine
neuf → on ne disperse pas l'autorité). Nommage **3 couches** : nav = verbe · hub = marque (garde
« IA ») · page service = promesse (« intelligent »).

| Pilier (nav = verbe) | Offre (marque) | URL | Statut SEO |
|---|---|---|---|
| **Acquérir** | Growth System IA | `/acquerir` (hub) | **SILO développé** (pages service + landings + cluster) |
| **Piloter** | Business Intelligence | `/piloter` | vitrine gelée, ancres, **jamais offensif** |
| **Opérer** | Operations IA | `/operer` | vitrine gelée, ancres (+ 0-2 pages enfant tolérées) |

**Pages du silo Acquérir :**
- `/acquerir` — hub (+ ancres `#seo-geo`, `#publicite` *à venir*, `#agent-marketing` *à venir*)
- `/services/site-web-intelligent` (+ landing `/lp/site-web-intelligent`) — flagship
- `/services/content-marketing-intelligent` (fusionne **SEO/GEO** ici, pas de page séparée) (+ `/lp/...`)
- `/services/tunnel-conversion-intelligent` (+ `/lp/...`)
- Cluster d'articles in-silo (blog)

**Différés (pas de page maintenant)** : Publicité + Agent marketing → ancres « à venir » sur `/acquerir`.

---

## 3. Le méga-menu V1 (conclusion)

**3 colonnes par verbe** (Acquérir / Piloter / Opérer), **1 lien = 1 page réelle, le reste en ancres**.
On nettoie les ~15 liens morts / doublons de l'actuel `src/data/mega-menu.ts`.

| Colonne | Liens RÉELS (pages) | Ancres (même page) | Supprimer |
|---|---|---|---|
| **Acquérir** `/acquerir` | Site web intelligent · Content marketing intelligent · Tunnel de conversion | SEO & GEO `#seo-geo` · Publicité `#publicite` *(à venir)* · Agent marketing `#agent-marketing` *(à venir)* | acquisition-ia, contenu-seo-geo-ia, ancien « site web IA » |
| **Piloter** `/piloter` | *(aucune)* | RevOps · Tableaux de bord · Reporting IA · Données · Prévisionnel · Agent analytique | growth-intelligence, productivite-ia |
| **Opérer** `/operer` | *(0-2 enfant)* | CRM & relances · Automatisation · Service client · Admin & RH · Légal · Agents métiers | productivite-operationnelle-ia, support-client-ia |

- **Autres entrées header** : Réalisations (`/cas-clients`) · Ressources (`/ressources`) · Agence
  (`/agence`) · **CTA bouton « Audit gratuit »** (`/offres/audit-maturite-ia`).
- **Ressources** = Blog · Outils (calculateur ROI) · Academy *(supprimer livres-blancs, veille-ia, cookbooks, VirtuoseOS)*.
- **Agence** = À propos · Méthode · Manifeste · Simon Beros *(supprimer docs, governance, trust-center, careers)*.
- **Footer** : *Agence web à Montpellier* (`/agence-web-montpellier`, ancrage local — **pas** en top-nav) · Contact · légal · Plan du site.
- **Règle d'or** : zéro lien vers une page inexistante (anti-orphelin nav). Un sous-sujet sans page = **ancre**, pas un lien mort.

---

## 4. Base propre (suppressions — site neuf)

**206 URLs → ~26 indexées.** Suppression **nette = 404** (aucune redirection / 301 : domaine neuf, rien
à préserver). Sitemap + `/plan-du-site` = whitelist uniquement.

| Dossier (sitemap réel) | Décision |
|---|---|
| Racines/statiques (13) | GARDER `/`, `/acquerir`, `/piloter`, `/operer`, contact, manifeste, légal ×2, plan-du-site, cgv · `/cas`→`/cas-clients` · SUPPRIMER commerce (GARDER secteurs : hub peuplé data-driven) |
| /agence (6) | GARDER agence (+about+méthode) · NOINDEX ds-studio, hero-lab · SUPPRIMER /prompts |
| /comparer (11) · /glossaire (31) · /integrations (21) | **SUPPRIMER** (doorway / thin) |
| /equipe (2) | GARDER /equipe/simon-beros |
| /offres (34) | GARDER audit-maturite-ia, growth-system-ia→hub /acquerir · RECYCLER site-web-ia→/services/site-web-intelligent (+ /lp) · SUPPRIMER 6 offres + 20 tunnels |
| /ressources (62) | GARDER hub, outils/calculateur, academy, 6 articles in-silo · SUPPRIMER categorie/tag/silo/cookbooks/livres-blancs/veille/personas |
| /services (3) | base des 3 pages service Acquérir (fonder ; supprimer les stubs) |
| /solutions (21) | SUPPRIMER les 20 métiers (→ ancres des piliers) ; aucune page /solutions/* séparée |
| /technologies (2) | GARDER claude-models→/expertise-claude |

Identité **véridique** : studio/cabinet solo (pas d'agence Genève ni certifs inventées). Cas **réels** only. EN archivé (FR monolingue).

---

## 5. SEO / GEO (domaine neuf, autorité zéro) — 2 couches

- **Couche A — capture / conversion** (ranking court terme) : « site web intelligent », « création site
  web intelligent », local « site web intelligent Montpellier » *(« agence IA Montpellier » est SATURÉ →
  ne pas s'y enfermer)*. « site web IA » = keyword **secondaire** dans le copy, jamais le H1.
- **Couche B — autorité / GEO** (moat AI-proof, montée en ticket) : « transformation IA PME »,
  « automatisation IA PME », « agents IA entreprise », « diagnostic / audit IA PME » (angle aides
  « Osez l'IA »), « cabinet conseil IA », « orchestration IA ».

**H1 affinés :**
- Home : « **Le cabinet qui fait tourner votre PME à l'IA** »
- `/services/site-web-intelligent` : « **Site web intelligent : la porte d'entrée d'un système qui acquiert, convertit et tourne seul** »
- `/acquerir` : « **Système d'acquisition IA — des clients en continu** »
- `/agence-web-montpellier` : « **Site web intelligent & IA à Montpellier** »
- `/offres/audit-maturite-ia` : « **Diagnostic IA PME — 3 actions chiffrées (aides Osez l'IA mobilisables)** »

**GEO** = pari asymétrique (AI Overview **inactif en France** → viser **ChatGPT / Perplexity / Claude**
en direct ; rester *AI-Overview-ready* via schema). Leviers gratuits : cohérence d'entité (« cabinet IA
Montpellier ») site + LinkedIn + Google Business Profile ; LinkedIn = canal n°1 B2B ; contenu chiffré ;
Schema.org ; llms.txt ; boucle Google Search Console post-lancement.

**Content gaps prioritaires** : (1) Diagnostic IA PME + aides Osez l'IA ; (2) Agent IA vs automatisation ;
(3) Site intelligent vs Wix/Lovable ; (4) coût projet IA 3-7k + ROI 159 % ; (5) GEO « être cité par ChatGPT/Perplexity ».

---

## 6. Pricing (4 paliers + sur-mesure)

| Palier | Prix HT | Inclus |
|---|---|---|
| **Essentiel / landing** (porte d'entrée) | **2 000 €** | landing-site 1-3 pages + SEO/GEO + mise en ligne |
| **Croissance** | **4 000 €** | site 3-5 pages + connexion IA + skills + automation contenu de base |
| **Complet** | **7 000 €** | site complet + CMS intelligent + système de contenu + intégrations |
| **Intelligence** (système) | **10 000 €** | + dashboard + agents + automatisations → pont Growth System IA |
| **Sur mesure** | **devis** | ETI / app dédiée / multi-sites / intégrations lourdes |

Plancher modèle financier = **2 000 €** ; panier moyen visé ~4 000 € [HYP] ; point mort recalculé
~1,3-1,7 site/mois (`business/13`). Échelle accessible PME, montée par **révélation** (audit → site →
système → agents à l'usage / MRR). *(Corriger le 7 900 € encore affiché sur le site live = chantier P0.)*

---

## 7. Sections par page V1 (templates)

- **Pages `/services/*`** : séquence **canonique 13 sections déjà figée + template buildé** (`state/07`) :
  hero-conversion-funnel → proof-bar → problems-grid → diagnostic-stages → method-timeline →
  workflow-table → feature-split-media → deliverables-grid → stats-bento → comparison-duo →
  pricing-cards → faq-two-column → footer-cta-band. **Réutiliser, adapter le contenu.**
- **Landings `/lp/*`** : variante CRO allégée + quizz lead-magnet de scoring (`state/08`, `specs/03 §Phase C`).
- **Piliers `/piloter` `/operer`** : séquence **à figer** (hero + 1 bloc par ancre + preuve + CTA), sections cataloguées, anti-orphelin.
- **Home, `/agence`, `/cas-clients`, `/manifeste`** : **audit** des sections existantes (garder/retirer/ajouter), 0 section creuse, 0 doublon.

---

## 8. Décisions tranchées (Simon, 2026-06-14)

- **Page locale `/agence-web-montpellier` = OUI en V1** (indexée, schema LocalBusiness, rattachée au silo, footer).
- **Pricing = grille 4 paliers + sur-mesure** ci-dessus (remplace 3k/9k/12k et le 7 900 € live).
- **0 redirection** (site neuf, 404 net).
- **Positionnement cabinet IA** (pas agence web) = fil rouge de tout le copy.

---

## 9. Carte des docs (où est le détail)

| Sujet | Doc canonique |
|---|---|
| Positionnement (source) | `strategy/06-doctrine-positionnement-architecture-seo.md` |
| Architecture (ADR) | `specs/02-adr-architecture-site.md` + `specs/03-adr-ouverture-silo-acquerir.md` |
| URLs + nav + méga-menu + mapping 206→26 + pricing | `strategy/02-site-etat-final.md §0ter` |
| SEO/GEO 2 couches + keywords + H1 + content gaps | `strategy/03-recherche-seo-geo.md §7` |
| Benchmark concurrent DigiDop (conclusions, GEO d'entité, roadmap) | `strategy/07-benchmark-digidop.md` |
| Mapping migration des pages (fichier par fichier) | `state/06-mapping-migration-3-piliers.md` |
| Template page service (13 sections) | `state/07-template-page-service.md` |
| Plan refonte page service (brief v6) | `state/08-plan-refonte-site-web-intelligent-v6.md` |
| Backlog d'exécution (P0→P4) | `state/02-plan-execution-claude-code.md` |
| Cash-first 90 j | `business/11-cash-first-90-jours.md` |
| Modèle financier (point mort) | `business/13-modele-financier.md` |
