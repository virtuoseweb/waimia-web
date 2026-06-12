# Business plan — Waimia

**Agence IA « anthropic-first » · Montpellier · fondateur solo (Simon Beros)**
*Version de travail — 12 juin 2026. Document interne, honnête sur l'incertitude. Les chiffres marqués « hypothèse » ne sont pas sourcés : ce sont des paris explicites, à réviser dès les premières données réelles.*

---

## 1. Résumé exécutif

Waimia conçoit des sites web et des systèmes marketing pilotés par IA pour les départements marketing de PME et ETI. Le socle technique est un **système marketing IA modulaire et forkable** : un même cœur de produit (site Astro + connexion IA + skills + automation de contenu) est dupliqué et reconfiguré par client (swap des connecteurs GSC, GA, CRM). Ce socle transforme une prestation de service en quasi-produit reproductible, ce qui est le levier de marge clé pour un fondateur solo.

Le positionnement vise une **zone blanche** entre deux extrêmes du marché : les agents IA préfabriqués bas prix (type Limova, 70-120 €/mois, peu personnalisés) et le consulting IA premium grands comptes (type ClaudIn, ex-McKinsey, hors de portée d'une PME). Waimia propose du sur-mesure industrialisé à un prix PME.

L'échelle d'offres va de l'audit quick win (appel, gratuit ou faible coût, en haut de funnel) au site web IA dès **3 000 € HT**, puis au Growth System IA (sur devis), jusqu'aux agents facturés à l'usage (« salarié virtuel »). La preuve commerciale existe déjà : waimia.com, virtuoseweb.fr et un portefeuille de clients réels (Inbound Value, Amploi, Balzeo, Carnets de Montpellier, Desangles Peinture, un naturopathe, un acteur import-export).

**Contraintes structurantes :** fondateur seul, runway à gérer, budget marketing quasi nul. La stratégie de lancement repose donc sur l'acquisition à coût quasi nul (réseau, local Montpellier, GEO, contenu produit par les propres agents de Waimia) plutôt que sur de la publicité payante.

---

## 2. Problème / Solution

### Le problème

Les départements marketing de PME et ETI subissent trois pressions simultanées :

1. **L'injonction à « faire de l'IA »** sans savoir par où commencer, ni distinguer le réel du hype.
2. **Une offre de marché polarisée** : soit des outils préfabriqués génériques qui ne s'intègrent pas à leur stack ni à leur marque, soit du conseil premium inaccessible budgétairement.
3. **Un site web et une production de contenu** qui restent lents, coûteux et déconnectés de leurs données (GSC, GA, CRM), au moment même où la recherche se déplace vers les moteurs génératifs (ChatGPT, Claude, Perplexity, AI Overviews).

### La solution

Un **socle marketing IA modulaire** livré comme un actif, pas comme un livrable jetable :

- **Site web IA** (Astro, rapide, optimisé SEO et GEO) connecté aux données du client.
- **Skills et automations** de production de contenu, branchés sur la marque et le ton du client.
- **Agents** (sur base Claude Code / Cowork + configuration en repo) qui exécutent des tâches marketing récurrentes — facturés à l'usage, comme un « salarié virtuel ».

La différenciation n'est pas le prix, ni la sophistication brute : c'est le **rapport sur-mesure / prix** rendu possible par l'industrialisation du socle. Chaque client paie du spécifique, Waimia livre du reproductible.

---

## 3. Vision & mission

**Mission.** Donner aux équipes marketing de PME et ETI un système IA qui produit des résultats mesurables (visibilité, leads, contenu), sans les obliger à choisir entre un gadget générique et un cabinet de conseil.

**Vision 24-36 mois.** Faire de Waimia une référence régionale (Occitanie / Montpellier) puis nationale sur le créneau « site et marketing IA pour PME », avec un socle produit suffisamment robuste pour être déployé par un petit collectif et par des agents, et non plus uniquement par le fondateur.

**Principe directeur.** *Preuve avant affirmation.* Waimia vend ce qu'elle s'applique à elle-même (waimia.com comme vitrine vivante du GEO et de l'automation).

---

## 4. Marché (TAM / SAM / SOM)

> **Avertissement méthodo.** Les bornes ci-dessous sont des estimations raisonnées à partir des fourchettes de prix réelles du marché (site vitrine PME France : 1 500-8 000 €, moyenne agence ~5 500 € ; Montpellier 3 000-6 000 €). Le dénombrement précis des entreprises (INSEE : ~150 000 PME et ~5 800 ETI en France) n'a pas été revérifié ici : traiter ces ordres de grandeur comme des **hypothèses de cadrage**, pas comme des données comptables.

**TAM — marché total adressable (France).** Hypothèse : dépense annuelle des PME/ETI en site web + marketing digital externalisé incluant une brique IA. L'ordre de grandeur se situe en **centaines de millions d'euros par an**. Cette borne haute n'est pas opérationnelle pour un solo : elle sert seulement à confirmer qu'il n'y a pas de plafond de marché.

**SAM — marché serviable.** Restriction aux PME/ETI dont le département marketing existe, qui externalisent leur site et leur contenu, et sont sensibilisées à l'IA. Restriction géo réaliste au lancement : Occitanie + acquisition nationale opportuniste via GEO et contenu. Ordre de grandeur : **dizaines de millions d'euros par an**.

**SOM — part réellement capturable (12-24 mois, solo).** Seule borne qui pilote la décision. Avec un fondateur seul, un cycle de vente artisanal et un budget marketing quasi nul, **la capacité de production est le facteur limitant, pas la demande**. À raison de quelques projets site (3-8 k€) par mois plus du récurrent, le SOM réaliste se compte en **dizaines de milliers à ~150-250 k€ de CA annuel** (voir §9). Conclusion structurante : **le marché n'est pas la contrainte, la bande passante du fondateur l'est.** La stratégie produit (socle forkable, agents) vise à desserrer cette contrainte.

---

## 5. Modèle économique

Trois sources de revenus empilées, du ponctuel vers le récurrent.

### a. L'offer ladder
| Palier | Offre | Prix | Rôle économique |
|---|---|---|---|
| 0 | Audit quick win (appel) | Gratuit / faible | Top of funnel, qualification, preuve |
| 1 | Site web IA (landing → 1-5 pages + connexion IA + skills + automation contenu) | **dès 3 000 € HT**, paliers | Cœur du CA au lancement, cash rapide |
| 2 | Growth System IA | Sur devis (typiquement 5 chiffres) | Montée en valeur, récurrent partiel |
| 3 | Agents « salarié virtuel » | Facturation à l'usage | Récurrent scalable, marge produit |

### b. Facturation à l'usage des agents
Agents (Claude Code / Cowork + config repo) facturés à la consommation — aligne le prix sur la valeur livrée, crée un revenu récurrent à coût marginal faible. Pari de marge long terme.

### c. Le produit forkable (service → produit)
Le socle est conçu pour être **forké** par client (même cœur, connecteurs GSC/GA/CRM échangés). Chaque projet réutilise l'actif au lieu de repartir de zéro → **coût de production marginal décroissant**, l'économie se rapproche de celle d'un produit.

---

## 6. Go-to-market (résumé — détail `marketing/02`)
- **Local Montpellier** comme quick win (cycle court, références de proximité).
- **GEO** comme pari d'acquisition différenciant (citations IA à 3-6 mois → amorcer **immédiatement**).
- **Dogfooding** : waimia.com produit par les propres agents/skills → preuve + contenu à coût ~0.
- **Réseau et bouche-à-oreille** (base VirtuoseWeb) pour les premiers contrats, budget pub ≈ 0.
- **Partenariats agences web** (sous-traitance de la brique IA) comme canal B2B2C.

---

## 7. Organisation
**Aujourd'hui — solo augmenté.** Simon Beros couvre dev web, SEO/ads, content, agents IA. Polyvalence rare = atout ; bande passante = risque.
**Trajectoire 0-24 mois :** (1) solo + agents (0-6 mois, les agents absorbent la production répétable) ; (2) solo + freelances à la mission (6-12 mois) ; (3) petit collectif + partenaires (12-24 mois). **Principe : ne pas embaucher avant que le socle produit ne rende la délégation sûre.**

---

## 8. Roadmap & jalons (0-24 mois)
| Horizon | Jalon | Critère de réussite (preuve) |
|---|---|---|
| 0-3 mois | Socle waimia.com en prod + offer ladder publiée + amorçage GEO | Site live, premiers contenus indexés, 1-2 contrats site |
| 3-6 mois | Forkabilité éprouvée sur ≥ 3 clients ; premières citations IA | Temps de prod/site en baisse mesurable ; mentions génératives |
| 6-12 mois | Récurrent agents chez ≥ 3 clients ; 1er partenariat agence | Part de CA récurrent > 0 et croissante |
| 12-18 mois | Pipeline national via GEO/contenu ; délégation freelance rodée | Leads entrants non-réseau ; marge stable |
| 18-24 mois | Petit collectif ; socle produit documenté et déléguable | CA non plus plafonné par la seule bande passante |

---

## 9. Finances (hypothèses prudentes)
> Tout ce qui suit est **hypothétique**, dérivé de l'offer ladder + fourchettes marché. Aucune projection n'est une promesse. À recaler au 1er trimestre de données réelles.
> 💶 **Modèle financier détaillé et recalculable : `business/13-modele-financier`** (coûts fixes
> micro ~180 €/mois ou SASU ~300 € ; charges micro-BNC réelles **25,6 %** ; point mort ~**1,7 site/mois** ;
> reco coussin **6-9 mois** ; unit economics + MRR par scénario). Le §9 ci-dessous = synthèse ; `13` = le modèle.

**Hypothèses :** prix moyen projet site ~3,5-5 k€ HT ; volume soutenable solo 1-3 projets/mois ; récurrent négligeable au départ, significatif après 9-12 mois.

| Scénario | Projets/mois | CA projets 12 mois | + Récurrent fin | Lecture |
|---|---|---|---|---|
| Prudent | ~1 | ~40-50 k€ | faible | Survie, runway tendu |
| Médian | ~1,5-2 | ~75-110 k€ | en amorçage | Trajectoire viable solo |
| Haut | ~2,5-3 | ~130-180 k€ | récurrent réel | Sature la bande passante → déclenche délégation |

**24 mois (médian, hypothèse) :** ~150-250 k€ de CA annualisé, part récurrente croissante.
**Point mort / runway :** structure solo très légère → point mort bas (quelques projets couvrent l'année de coûts fixes). Le risque n'est pas la rentabilité unitaire mais le **délai d'amorçage du pipeline** → sécuriser **6-9 mois de coûts fixes**. Variable de sensibilité n°1 = **nombre de projets/mois** (piloté par acquisition gratuite + bande passante) ; n°2 = **vitesse de forkabilité** (réduit le temps/projet).

---

## 10. Risques & mitigations
| Risque | Gravité | Mitigation |
|---|---|---|
| Bus factor / dépendance fondateur | Élevée | Agents + socle forkable + doc déléguable ; freelances avant embauche |
| Pipeline lent à s'amorcer (pub ≈ 0, GEO 3-6 mois) | Élevée | Amorcer GEO + contenu dès J0 ; réseau + local pour le cash court terme |
| Runway insuffisant | Élevée | Palier 1 (cash rapide) comme moteur ; coûts fixes minimaux ; 6-9 mois sécurisés |
| Commoditisation par agences IA low-cost | Moyenne | Tenir la zone blanche (sur-mesure + données + GEO + preuve), pas le prix |
| Dépendance Anthropic/OpenAI | Moyenne | Architecture multi-modèle ; socle propriétaire Waimia |
| Hype IA → défiance | Moyenne | Preuve avant affirmation ; vendre des résultats, pas « de l'IA » |
| Concentration client | Moyenne | Élargir via local + partenariats ; viser le récurrent multi-clients |

**Honnêteté finale.** Modèle crédible mais non prouvé à l'échelle : la rentabilité unitaire est acquise, la **répétabilité de l'acquisition à coût nul** et la **vitesse de forkabilité** restent les deux inconnues majeures. Les 6 premiers mois servent à les lever, pas à maximiser le CA.
