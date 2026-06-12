# Plan de prospection outbound — Waimia

> Praticien solo, budget quasi nul, levier local Montpellier/Occitanie. Outbound = canal d'amorçage du pipeline tant que l'organique (cf `marketing/03-content-editorial`, `strategy/03-recherche-seo-geo`) n'a pas atteint sa masse critique. Scripts détaillés : `business/05-sales-enablement` (plugins `sales:draft-outreach`, `marketing:email-sequence`) — non dupliqués ici.

## 1. ICP & qualification

### 1.1 Cibles primaires (par chaleur)
| Segment | Pourquoi eux | Déclencheur | Offre d'entrée |
|---|---|---|---|
| **Dépt. marketing PME/ETI** (20-250 sal.) | Budget existant, douleur volume/coût contenu + reporting | Sous-staffé, pression ROI, refonte en vue | Audit → Growth System |
| **TPE services** (artisans premium, cabinets, conseil, santé, immo) | Cycle court, décideur = dirigeant, site obsolète | Site qui ne convertit pas | Site web IA dès 3 000 € HT |
| **Agences web partenaires** (saturées, sans IA) | Revente/sous-traitance, récurrent | Carnet plein, demandes IA non livrables | Partenariat marque blanche / agents |

### 1.2 Qualification (ICP + BANT) — seuil 3/4
- **Fit** : verticale ciblée + taille 5-250 sal. + zone Occitanie d'abord + signal digital (site, posts LinkedIn, ads).
- **Budget** : capacité 3 000 € HT. Proxy : effectif, ads payantes, recrutement marketing.
- **Authority** : dirigeant (TPE) ou DirMkg/responsable digital (PME/ETI). Pas d'entrée par un stagiaire.
- **Need/Timing** : déclencheur observable (refonte annoncée, offre d'emploi marketing, site daté, levée, nouveau dirigeant).

**Disqualifiants durs :** pas de site ni d'intention digitale ; micro-budget ; secteur réglementé hors compétence ; déjà équipé d'une agence IA installée.

## 2. Ciblage : verticales × zone (concentrer, ne pas disperser)
1. **Vague 1 — Montpellier/Occitanie, services premium** : conseil, avocats/experts-comptables, architectes/immobilier, santé bien-être, import-export, artisanat haut de gamme. Levier : preuve locale + RDV physique → closing supérieur.
2. **Vague 2 — PME/ETI marketing, France** : industrie, SaaS/tech, e-commerce, formation. 100 % distance, cycle plus long, ticket plus élevé.
3. **Vague 3 — agences web partenaires** : 1 partenaire = N deals.

Ne pas ouvrir la vague N+1 tant que la vague N ne tourne pas.

## 3. Workflow de sourcing — MCP Vibe Prospecting
Cycle hebdo **cibler → enrichir → prioriser → exporter**.
- **Cibler** : `fetch-entities` (verticale NAF + zone + taille). `autocomplete` pour caler secteurs/localités, `estimate-cost` avant tout pull volumineux, `fetch-entities-statistics` pour dimensionner le gisement. Lot brut 40-60 entreprises.
- **Enrichir** : `enrich-business` (site, tech, signaux ads/recrutement) + `enrich-prospects` (décideur + canal) + `fetch-businesses-events`/`fetch-prospects-events` (déclencheurs).
- **Prioriser** : score ICP+BANT → paniers **A** (3-4/4, attaque), **B** (2/4, nurture), **C** (rejet).
- **Exporter** : `export-to-csv` du panier A → tableau de suivi. Le CSV alimente `sales:draft-outreach` (perso) + `marketing:email-sequence` (cadence).

## 4. Séquence multicanal (~12 j ouvrés, 5-7 touches)
| Jour | Canal | Action | Intention |
|---|---|---|---|
| J0 | LinkedIn | Visite + connexion sans pitch (note contextualisée déclencheur) | Réchauffer |
| J1 | LinkedIn | Si accepté : message valeur (1 quick win spécifique), zéro vente | Crédibilité |
| J2 | Email | Email 1 : accroche déclencheur + 1 preuve locale + micro-CTA audit | Ouvrir |
| J5 | Email | Email 2 : relance valeur (ressource/cas), pas « je relance » | Apporter |
| J7 | Appel | Appel court (TPE locale) ou note vocale LinkedIn | Humaniser |
| J9 | LinkedIn | Engagement sur son contenu | Présence latérale |
| J12 | Email | Email 3 « break-up » | Déclencher ou clore |

Règles : 1 idée/message ; partir du **déclencheur** + d'une **preuve réelle** ; LinkedIn pour le warm, email pour la trace, appel réservé au panier A local ; personnalisation IA toujours relue (GF-1).

## 5. Lots hebdomadaires réalistes (solo)
- Sourcing : 1 session/sem → 25 prospects panier A (≈ 50/2 sem).
- Nouvelles séquences : 12-15/sem. Touches actives/jour : 15-25 (~1h-1h30). File active max : 40-50.
- Bloc : ½ journée sourcing (lundi) + 30-45 min/jour d'exécution.

## 6. Pipeline & suivi
Étapes : `Sourcé → Contacté → Répondu → RDV → Audit/proposition → Gagné/Perdu`. CRM lite (Sheet/Notion ou `sales:pipeline-review`), 1 ligne/prospect. Revue hebdo pour purger le stale.
**Taux attendus (cold B2B, à recalibrer) :** Contacté→Répondu 8-15 % ; Répondu→RDV 25-40 % ; RDV→Proposition 50-70 % ; Proposition→Gagné 20-35 %. Implication : ~50 contacts/2 sem → ~5-7 réponses → ~2 RDV → ~1 proposition → ~1 client sur ~2 cycles. **Objectif réaliste : 1-2 deals d'entrée/mois** au départ, l'organique prenant le relais.

## 7. Garde-fous RGPD (prospection B2B France)
- **Email B2B** : démarchage admis si lié à la fonction (`prenom.nom@entreprise`) ET objet en rapport métier. Mais : identité claire, objet honnête, **opt-out simple et fonctionnel** respecté immédiatement, pas d'adresses perso.
- **Mentions** : finalité (prospection), base légale (intérêt légitime), droit d'opposition. Registre de traitement léger.
- **Données** : ne conserver que l'utile, sourcer via Vibe Prospecting, purger paniers C et opt-out.
- **LinkedIn** : respecter les CGU (pas de scraping massif/automation agressive). Invitations/messages manuels ou semi-assistés.
- En cas de doute sur un envoi de masse : volume bas + haute personnalisation (réduit le risque ET améliore les taux).

## 8. KPIs
Activité (hebdo) : sourcés, séquences lancées, touches. Efficacité : taux de réponse, RDV/contacté, no-show. Résultat : RDV tenus, propositions, deals, CA d'entrée, coût d'acquisition (≈ temps, budget ≈ 0). Toute chute d'un taux → diagnostiquer en amont (ciblage ? déclencheur ? message ? canal ?) avant d'augmenter le volume.

## 9. Rituels hebdo
- **Lundi (½ j)** : sourcing + enrichissement Vibe Prospecting, scoring, export panier A, rédaction séquences, planif.
- **Mar-jeu (30-45 min/j)** : exécution, réponses, RDV, appels panier A local.
- **Vendredi (45 min)** : `sales:pipeline-review` → purge, relances, KPIs, décision d'ouvrir la vague suivante.
- **Mensuel** : recalibrage taux réels vs attendus, ajustement verticales/zones, capitalisation des messages qui convertissent (GF-3).
