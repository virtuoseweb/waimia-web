# 13 — Modèle financier Waimia

> **Statut du document.** Modèle de travail, recalculable. Solo, Montpellier, phase de démarrage, runway court. Toutes les hypothèses sont marquées `[HYP]`. Les taux légaux et prix d'outils sont sourcés (juin 2026) ; tout le reste est une estimation à recaler dès que Simon a des données réelles (voir §8). On ne décide rien sur un chiffre inventé : si une valeur n'est pas mesurée, elle est notée comme telle.
>
> **Avertissement n°1 — la variable qui casse tout.** Le temps de production par site n'est **pas mesuré**. C'est le pivot de l'unit economics (§2, §3, §4, §7). Tant qu'il n'est pas chronométré sur 2-3 sites réels, le modèle est un cadre, pas une prévision.
>
> **Avertissement n°2 — charges micro réelles ≠ « 22 % ».** Pour une activité **BNC libérale non réglementée**, le taux de cotisations micro 2026 est **25,6 %**, pas 22 %. (Conservé pour la comparaison micro ci-dessous.)

---

## 0bis. ⚠️ STATUT RÉEL DE SIMON — EI au réel BNC libéral (FAIT FOI, corrige le reste du doc)

> **Confirmé Simon : entreprise individuelle au RÉGIME RÉEL, IR, BNC libéral (déclaration contrôlée 2035).**
> Ce n'est **ni micro, ni SASU**. Les sections « micro » et « SASU » plus bas sont conservées **à titre
> de comparaison seulement** — elles ne sont PAS ton régime. Ordres de grandeur ci-dessous **à valider
> avec ton comptable/AGA** (la fiscalité BNC au réel est progressive et dépend de ton foyer fiscal).

**Ce qui change vs le modèle micro :**
1. **Assiette des cotisations = le BÉNÉFICE NET** (recettes − charges déductibles), **PAS le CA**. Taux
   global TNS libéral ≈ **40-45 % du bénéfice net** `[HYP, à confirmer comptable]` (URSSAF maladie +
   alloc. familiales + retraite CIPAV ou SSI + CSG-CRDS). 1ʳᵉ année : cotisations **provisionnelles**
   forfaitaires, **régularisées en N+1/N+2** → prévoir la trésorerie de régularisation.
2. **Tes frais pro sont DÉDUCTIBLES** (≠ micro qui ne déduit rien, juste un abattement forfaitaire 34 %).
   Déductibles : **abonnements IA (Claude/GPT), Vercel, domaine, Cal.com, Resend, Vibe Prospecting,
   comptable, AGA, matériel amorti, part loyer/internet/téléphone, formation, CFE, déplacements**.
   → **Conséquence clé : au réel, plus tes charges réelles sont élevées (ta stack IA l'est), plus tu
   réduis ton bénéfice imposable ET ton assiette sociale.** C'est l'avantage du réel pour un solo bien
   outillé : tout ce que tu modélises en « coûts fixes » (§1) sort de l'assiette.
3. **IR au barème progressif** sur le bénéfice net (intégré au foyer fiscal) — **pas** de versement
   libératoire 2,2 %, **pas** d'IS. Le taux IR réel dépend de ta tranche/foyer `[HYP]`.
4. **Coût fixe à AJOUTER** : comptable (~**600-1 500 €/an** `[HYP]`) + éventuelle AGA (~150-300 €/an).
   Tous deux **déductibles**.
5. **TVA** : indépendante du régime BNC. Si recettes services < **37 500 €** → franchise (tu ne factures
   ni ne récupères la TVA). Au-delà ou sur option → TVA facturée **et récupérable** sur tes achats pro.

**Point mort recalculé (ordre de grandeur, à affiner comptable) — grille canonique 2/4/7/10k, panier moyen ~4 000 € :** cotisations ~43 % du bénéfice → pour
un net en poche ≈ **3 500 €/mois** (avant IR), il faut un **bénéfice ≈ 6 000-6 500 €/mois**, soit, après
déduction de tes coûts fixes (~quelques centaines €/mois), un **CA ≈ 6 500-7 000 €/mois**. Avec un **panier
moyen pondéré ≈ 4 000 € HT** (mix paliers Essentiel 2k / Croissance 4k / Complet 7k / Intelligence 10k, hyp.
`business/08`) au lieu de 3 000 €, cela tombe à **~1,6-1,7 site/mois** (vs ~2 sites quand l'entrée était à
3 000 €) : **le panier moyen plus élevé fait BAISSER le nombre de sites nécessaires au point mort**. Le
plancher de la grille reste **2 000 €** (palier Essentiel) — c'est la porte d'entrée cash-first, pas le panier
moyen. **Mais** le taux social plus élevé sur le bénéfice (vs micro) reste partiellement compensé par la
déductibilité de toute ta stack. **Reco runway/coussin inchangée : 6-9 mois**, + une réserve pour la
**régularisation de cotisations N+1**. *(Tout ceci `[HYP, à confirmer comptable/AGA]`.)*

> Pour passer d'ordre de grandeur à chiffre : ton comptable/AGA te sortira le taux de cotisation exact
> (CIPAV vs SSI selon code activité) et ta tranche IR. Variable n°1 du modèle reste **le temps de prod/site**.

---

## 0. Sources des taux et prix (juin 2026)

| Donnée | Valeur 2026 | Source |
|---|---|---|
| Cotisations micro-BNC (libéral non réglementé) | **25,6 %** du CA encaissé | [economie.gouv.fr](https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprises-quel-est-le-montant-de-vos-cotisations-sociales), [shine.fr](https://www.shine.fr/blog/hausse-cotisations-sociales-micro-entreprise-2026/) |
| Plafond micro-BNC (recettes) | **83 600 €/an** | [autoentrepreneur.urssaf.fr](https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/toutes-les-actualites/2026--modification-des-seuils-de.html), [legifiscal.fr](https://www.legifiscal.fr/actualites-fiscales/4436-nouveaux-seuils-micro-entreprises-annee-2026.html) |
| Franchise TVA (services) | seuil **37 500 €**, tolérance **41 250 €** | [lamicrobyflo.fr](https://lamicrobyflo.fr/franchise-tva-seuils/), [indy.fr](https://www.indy.fr/blog/unification-seuils-tva-2026/) |
| ACRE | exonération ramenée à **25 %** des cotisations (au lieu de 50 %) à partir du **1ᵉʳ juillet 2026** | [shine.fr](https://www.shine.fr/blog/hausse-cotisations-sociales-micro-entreprise-2026/) |
| Versement libératoire IR (option micro-BNC) | **2,2 %** du CA (si éligible RFR) | [legalplace.fr](https://www.legalplace.fr/guides/taxes-auto-entrepreneur/) |
| IS — taux réduit | **15 %** jusqu'à 42 500 € de bénéfice | [compta-online.com](https://www.compta-online.com/taux-is-impot-sur-les-societes-ao2921) |
| IS — taux normal | **25 %** au-delà | [compta-online.com](https://www.compta-online.com/taux-is-impot-sur-les-societes-ao2921) |
| Charges sociales SASU (président assimilé salarié) | ≈ **65 à 75 %** du net (≈ 0,82 × net pour le brut→net, ~54-55 % du brut en cotisations) | [legalstart.fr](https://www.legalstart.fr/fiches-pratiques/sasu/charges-sociales-sasu/), [legalplace.fr](https://www.legalplace.fr/guides/sasu-charges/) |
| Vercel Pro | **20 $/mois** par siège (~19 €), 20 $ de crédit usage inclus | [vercel.com/pricing](https://vercel.com/pricing), [costbench.com](https://costbench.com/software/developer-tools/vercel/) |
| Claude Max 5× / 20× | **100 $ / 200 $ par mois** | [support.claude.com](https://support.claude.com/en/articles/11049741-what-is-the-max-plan) |
| Claude API (Opus 4.8) | **5 $/M tokens in, 25 $/M out** ; Sonnet 4.6 3 $/15 $ ; Haiku 4.5 1 $/5 $ | [platform.claude.com/pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| Cal.com | **Free** suffisant en solo ; Teams ~15 $/mois si besoin | [cal.com/pricing](https://cal.com/pricing) |
| Resend | **Free** 3 000 emails/mois ; Pro 20 $/mois (50 k) | [resend.com/pricing](https://resend.com/pricing) |

> Taux de change retenu : **1 $ ≈ 0,93 €** `[HYP]` (à figer selon le mois). Les prix outils sont arrondis en € TTC/HT selon facturation US (souvent HT, TVA auto-liquidée).

---

## 1. Structure de coûts mensuels fixes

Deux paniers : **socle minimal** (ce qu'il faut pour produire et facturer) et **outils croissance** (prospection, scale). En micro, la TVA sur ces achats n'est **pas récupérable** (franchise) → on raisonne en coût « tout compris » sorti de poche.

### 1a. Socle minimal (obligatoire dès le jour 1)

| Poste | Fourchette €/mois | Hypothèse / note |
|---|---|---|
| Claude Max (IA de production principale) | 93 – 186 € | Max 5× (100 $) suffit a priori en solo ; 20× si gros volume `[HYP]` |
| Vercel Pro | 0 – 19 € | Hobby (0 €) tant que low-traffic ; Pro dès qu'un client en prod / besoin SLA |
| Nom(s) de domaine | 1 – 3 € | ~15-35 €/an amorti (waimia.com + éventuels clients) |
| Cal.com | 0 € | Free suffit en solo |
| Email transactionnel (Resend) | 0 € | Free 3 000 emails/mois largement suffisant au début |
| Email pro (boîte Google/Proton) | 0 – 7 € | 1 boîte pro `[HYP]` |
| Comptable / expert-comptable | 0 – 70 € | **0 € en micro** (déclaration URSSAF seule) ; ~50-70 €/mois si SASU (voir §1c) |
| Assurance RC Pro | 12 – 25 € | ~150-300 €/an `[HYP]`, quasi-obligatoire en presta web |
| Banque pro | 0 – 15 € | obligatoire si CA > 10 k€/an 2 ans de suite ; néobanque ~0-12 € |
| **Sous-total socle** | **≈ 110 – 320 €/mois** | médiane de travail **~180 €/mois** `[HYP]` |

### 1b. Outils croissance (activables, pas dès J1)

| Poste | Fourchette €/mois | Déclencheur |
|---|---|---|
| GPT/OpenAI (modèle secondaire) | 0 – 19 € | Plus Plan si besoin d'un 2ᵉ moteur ; sinon API à l'usage |
| Vibe Prospecting (enrichissement leads) | ? – ? € | **à chiffrer** `[HYP]` — voir leurs plans avant de budgéter |
| Firecrawl (scraping/veille) | 0 – 16 € | optionnel ; Free puis ~16 $/mois si volume |
| API IA à l'usage (agents clients, voir §6) | variable | refacturé au client → coût direct, pas fixe |
| Pubs / acquisition payante | 0 – ? € | hors scope tant que l'inbound/prospection manuelle suffit |
| **Sous-total croissance** | **≈ 0 – 90 €/mois** | n'engager qu'au moment où le levier est activé |

### 1c. Surcoût structure si SASU (vs micro)

| Poste | €/mois | Note |
|---|---|---|
| Expert-comptable (obligatoire en pratique) | 50 – 100 € | bilan + liasse |
| Frais de tenue / dépôt des comptes | 5 – 15 € | amorti annuel |
| CFE (cotisation foncière) | ~10 – 40 € | aussi en micro après la 1ʳᵉ année, selon commune Montpellier `[HYP]` |
| **Surcoût SASU** | **≈ +65 – 155 €/mois** | à intégrer au point mort §4 |

> **Coûts fixes de référence pour la suite** : **micro = ~180 €/mois** `[HYP]` (socle médian) ; **SASU = ~300 €/mois** `[HYP]` (socle + structure). On garde ces deux nombres comme base du point mort et du runway.

---

## 2. Coût variable par site

Le coût variable d'un site = **temps de production × coût horaire** + **coûts directs**. Le poste dominant, et de loin, est le temps.

### 2a. Coût d'opportunité horaire `[HYP — À RECALER]`

On valorise le temps de Simon à son coût d'opportunité (ce qu'une heure « rapporterait » si vendue). Trois ancrages :

| Méthode | Calcul | Taux horaire |
|---|---|---|
| Objectif de revenu net visé | 3 500 €/mois net souhaité ÷ ~120 h facturables/mois | **~29 €/h** `[HYP]` |
| TJM cible implicite | 350 €/jour ÷ 7 h | **50 €/h** `[HYP]` |
| TJM ambition | 500 €/jour ÷ 7 h | **71 €/h** `[HYP]` |

> On retient **50 €/h** comme valeur centrale de travail `[HYP]`. À remplacer par le coût horaire réel dès que le TJM cible est arbitré.

### 2b. Temps de production par site `[HYP — À CHRONOMÉTRER, variable n°1]`

Hypothèse de travail : **2 à 5 jours** de production effective par site, selon le palier. **Non mesuré** — à chronométrer sur les 3 premiers sites (temps total porte-à-porte : découverte, contenu, build, allers-retours, mise en ligne).

| Palier site (grille canonique) | Jours `[HYP]` | Heures (7 h/j) | Coût @50 €/h |
|---|---|---|---|
| Essentiel / landing — 2 000 € | 1,5 – 2,5 j | 10 – 18 h | **525 – 875 €** |
| Croissance — 4 000 € | 3 – 4 j | 21 – 28 h | **1 050 – 1 400 €** |
| Complet — 7 000 € | 4 – 6 j | 28 – 42 h | **1 400 – 2 100 €** |
| Intelligence (système) — 10 000 € | 6 – 9 j | 42 – 63 h | **2 100 – 3 150 €** |

### 2c. Coûts directs par site

| Poste | €/site | Note |
|---|---|---|
| Conso IA de prod imputable | 3 – 30 € | déjà couverte par l'abo Max forfaitaire pour l'essentiel ; surplus API marginal `[HYP]` |
| Hébergement client (1ʳᵉ période) | 0 – 19 € | sur Vercel ; idéalement **refacturé** en maintenance (voir §6) |
| Domaine client | 0 – 15 € | refacturé ou à charge client |
| Assets (banque d'images, polices, icônes) | 0 – 20 € | souvent libres ; `[HYP]` |
| **Total coûts directs** | **≈ 5 – 50 €/site** | négligeable devant le temps |

> **Conclusion §2.** Le coût variable d'un site est **à 95 % du temps**. Tout l'enjeu de marge est là : faire baisser les heures (templates, DS, automatisation IA) fait bien plus que rogner sur les 30 € d'outils.

---

## 3. Unit economics par offre

Prix **HT** (en franchise TVA, le prix facturé = prix encaissé). Coût = §2 (centre de fourchette). Marge brute = prix − coût variable, **avant** cotisations et coûts fixes.

| Offre (grille canonique) | Prix HT | Coût variable `[HYP]` | Marge brute € | Marge % |
|---|---|---|---|---|
| **Audit quick win — froid** | 0 € | 0,5 – 1 j → 175 – 350 € | **−175 à −350 €** | n/a (coût d'acquisition) |
| **Audit quick win — payant léger** | 150 – 300 € `[HYP]` | 0,5 – 1 j → 175 – 350 € | **−50 à +125 €** | ~0-40 % |
| **Site Essentiel — 2 000 €** | 2 000 € | ~700 € (2 j) + 30 € direct | **~1 270 €** | **~64 %** |
| **Site Croissance — 4 000 €** | 4 000 € | ~1 225 € (3,5 j) + 30 € | **~2 745 €** | **~69 %** |
| **Site Complet — 7 000 €** | 7 000 € | ~1 750 € (5 j) + 40 € | **~5 210 €** | **~74 %** |
| **Site Intelligence — 10 000 €** | 10 000 € | ~2 625 € (7,5 j) + 50 € | **~7 325 €** | **~73 %** |
| **Growth System IA** (sur devis, moy. 8 000 €) | sur devis | 8 – 12 j → ~3 500 € `[HYP]` | **~4 500 €** | **~56 %** |
| **Agent à l'usage** (moy. 500 €/mois) | 300 – 800 €/mois | infra+API ~30-120 €/mois + ~1 h support | **~330 €/mois** | **~66 %** |

> **Lecture.** Les marges brutes affichées (~70 %) sont flatteuses **parce que** le temps est valorisé à 50 €/h, pas payé en cash. La vraie contrainte n'est pas la marge € mais le **débit** : combien de jours-homme Simon a dans le mois (§7). L'audit gratuit est un **coût d'acquisition** : à traiter comme du marketing, à plafonner en nombre/mois.

### Effet « cotisations » sur le net réellement encaissé (comparaison micro-BNC, 25,6 % — RAPPEL : statut réel de Simon = EI au réel, cf §0bis)

> ⚠️ Ce tableau micro est **comparatif seulement** (le régime réel de Simon est en §0bis : cotisations ~40-45 % du **bénéfice net**, frais déductibles). Conservé pour l'ordre de grandeur. Exemple recalé sur le **panier moyen ~4 000 €** de la grille canonique.

Sur un site au panier moyen 4 000 € encaissés, après cotisations micro 25,6 % :

| | Micro-BNC (comparatif) | SASU (illustratif `[HYP]`) |
|---|---|---|
| Encaissé | 4 000 € | 4 000 € |
| Prélèvement social | −1 024 € (25,6 %) | dépend de la rémunération que Simon se verse (≈ 54-55 % du brut salarié) |
| IR / versement libératoire | −88 € (2,2 % si option) | IS 15 % sur le bénéfice société |
| **Net avant coûts fixes** | **≈ 2 888 €** | variable selon arbitrage salaire/dividende |

---

## 4. Point mort (combien de sites/mois)

Point mort = nombre de sites nécessaires pour couvrir **coûts fixes + cotisations** sur le CA. On raisonne sur une marge nette par site après prélèvements sociaux.

**Hypothèses centrales (grille canonique)** : **plancher de grille = 2 000 €** (palier Essentiel), **panier moyen pondéré ≈ 4 000 €** `[HYP, mix `business/08`]`, cotisations micro **25,6 %**, versement libératoire **2,2 %** (option), coûts fixes **micro = 180 €/mois**, **SASU = 300 €/mois**.

### Micro-BNC (comparatif — régime réel de Simon = EI au réel §0bis)

- Net par site au panier moyen 4 000 € après social+IR libératoire = **~2 888 €** (cf §3).
- Le point mort de **survie** dépend du revenu que Simon veut se verser. Trois cibles, calculées au **panier moyen 4 000 €** :

| Cible de net mensuel pour Simon `[HYP]` | Besoin de marge nette/mois | + coûts fixes 180 € | Sites @ panier moyen 4 000 €/mois nécessaires |
|---|---|---|---|
| Break-even « activité » (couvrir SEULEMENT les coûts fixes) | 0 € | 180 € | **0,06 site** (≈ 1 site / 16 mois) |
| Survie perso 2 000 €/mois | 2 000 € | 2 180 € | **~0,75 site/mois** |
| Confort 3 500 €/mois | 3 500 € | 3 680 € | **~1,3 site/mois** |
| Objectif 5 000 €/mois | 5 000 € | 5 180 € | **~1,8 site/mois** |

> **Lecture.** Le seuil « entreprise » (couvrir les outils) est trivial : **moins d'1 site couvre des mois de coûts fixes**. Le vrai point mort est **personnel** : pour vivre correctement (≈ 3 500 € net/mois), il faut **~1,3 site au panier moyen 4 000 €/mois** (vs ~1,7 site quand l'entrée était à 3 000 €) — **le panier moyen plus élevé de la grille canonique abaisse le nombre de sites au point mort**. Si tu ne vendais QUE des Essentiel à 2 000 € (plancher), il faudrait ~2,6 sites/mois pour le confort : d'où l'intérêt de tirer le mix vers Croissance/Complet. Tout MRR (§6) abaisse encore ce nombre.

### SASU

Surcoût structure (~+120 €/mois) + cotisations salariales lourdes sur la rémunération → pour un **même net en poche**, la SASU exige **plus de CA** tant que le volume est faible. Ordre de grandeur : **~+0,1 à +0,2 site/mois** vs micro pour les mêmes cibles, et un point mort « structure » autour de **300-400 € de coûts fixes**.

> **Arbitrage statut (synthèse).** Tant que le CA reste **sous ~50-60 k€/an** et que Simon veut sortir l'essentiel en revenu : **micro-BNC** est plus simple et plus léger (pas de comptable obligatoire, cotisations sur encaissé). La **SASU** devient pertinente quand (a) le CA dépasse le plafond micro (83 600 €), (b) on veut piloter salaire/dividende pour optimiser, (c) on a de gros achats à déduire/TVA à récupérer, ou (d) on veut une image « société » et protéger le patrimoine. **Recommandation phase démarrage : micro-BNC** (avec option versement libératoire si RFR éligible), bascule SASU à étudier dès que le CA dépasse ~50 k€/an de façon stable.

---

## 5. Runway (combien de mois avant de manquer de cash)

Runway = trésorerie de départ ÷ brûlage mensuel (burn), tant qu'aucun cash client n'entre. Le burn ici = **coûts fixes + coût de vie de Simon** (puisqu'il ne se verse rien d'autre tant qu'il n'y a pas de CA).

**Hypothèses** `[HYP]` : coûts fixes micro **180 €/mois**, coût de vie perso **1 800 €/mois** (Montpellier, solo, à recaler), trésorerie de départ variable.

| Trésorerie départ | Burn mensuel (fixes 180 € + vie 1 800 €) = 1 980 € | Runway sans aucun cash |
|---|---|---|
| 5 000 € | 1 980 € | **~2,5 mois** |
| 10 000 € | 1 980 € | **~5 mois** |
| 15 000 € | 1 980 € | **~7,5 mois** |
| 20 000 € | 1 980 € | **~10 mois** |

### Délai avant le 1ᵉʳ cash

Cycle de vente B2B site web `[HYP]` : **prospection → audit → devis → signature → acompte** ≈ **4 à 8 semaines** depuis le premier contact, encaissement acompte (souvent 30-50 %) à la signature, solde à la livraison. Donc **premier vrai cash réaliste : mois 2 à 3**, montée en charge mois 4-6.

### Recommandation coussin

Avec un cycle de vente de 1-2 mois **et** une rampe d'acquisition à construire (pas de portefeuille client au départ), un runway de **2,5-5 mois est dangereux** : un seul deal qui glisse et la trésorerie casse avant le premier encaissement récurrent.

> **Reco : viser 6 à 9 mois de coussin**, soit **~12 000 à 18 000 €** de trésorerie de départ `[HYP]` (burn 1 980 €/mois). En dessous de **~10 000 €** (5 mois), garder un revenu d'appoint / ne pas couper le filet de sécurité tant que le 1ᵉʳ MRR n'est pas installé. Ce coussin se réduit mécaniquement si (a) le coût de vie baisse, (b) un revenu parallèle subsiste les 3 premiers mois, (c) on encaisse des acomptes tôt.

---

## 6. Construction du MRR (agents + maintenance)

Le MRR est le **deuxième moteur** : il transforme une activité de projets ponctuels (revenu en dents de scie) en base récurrente qui abaisse le point mort. Deux briques :
- **Maintenance/hébergement** : ~30-80 €/mois par site livré `[HYP]` (héberg. + petites évolutions). Taux d'attache visé : **~60 % des clients site** `[HYP]`.
- **Agents à l'usage** : 300-800 €/mois, moyenne **500 €** `[HYP]`. Taux d'attache : **~20-30 %** des clients (vente plus difficile) `[HYP]`.

**Hypothèse de débit** : sites livrés/mois selon scénario ; chaque cohorte alimente le MRR ; churn **3 %/mois** `[HYP]`.

### Scénario A — prudent (1 site/mois, attache modérée)

| | M3 | M6 | M12 | M18 | M24 |
|---|---|---|---|---|---|
| Sites livrés cumulés | 2 | 5 | 11 | 17 | 23 |
| Contrats maintenance actifs (60 %, churn 3 %) | 1 | 3 | 6 | 9 | 12 |
| MRR maintenance @55 €/mois `[HYP]` | 55 € | 165 € | 330 € | 495 € | 660 € |
| Agents actifs (~25 %) | 0-1 | 1 | 2-3 | 4 | 5 |
| MRR agents @500 €/mois | 0 € | 500 € | 1 250 € | 2 000 € | 2 500 € |
| **MRR total** | **~55 €** | **~665 €** | **~1 580 €** | **~2 495 €** | **~3 160 €** |

### Scénario B — volontariste (2 sites/mois, meilleure attache, prix qui montent)

| | M3 | M6 | M12 | M18 | M24 |
|---|---|---|---|---|---|
| Sites livrés cumulés | 4 | 10 | 22 | 34 | 46 |
| Contrats maintenance actifs (70 %) | 2-3 | 6 | 14 | 21 | 28 |
| MRR maintenance @70 €/mois `[HYP]` | 175 € | 420 € | 980 € | 1 470 € | 1 960 € |
| Agents actifs (~30 %) | 1 | 3 | 6-7 | 10 | 14 |
| MRR agents @600 €/mois `[HYP]` | 600 € | 1 800 € | 3 900 € | 6 000 € | 8 400 € |
| **MRR total** | **~775 €** | **~2 220 €** | **~4 880 €** | **~7 470 €** | **~10 360 €** |

> **Lecture.** À 24 mois, le MRR **scénario A (~3 160 €/mois)** couvre déjà presque le point mort « confort » personnel **à lui seul** — c'est-à-dire que Simon pourrait vivre du récurrent et traiter chaque nouveau site comme du surplus. En **scénario B (~10 k€/mois de MRR)**, le modèle change de nature : c'est une agence-produit, pas un freelance. **Le MRR-agents est le vrai levier de valeur** (un agent = ~10× le MRR d'une maintenance) ; c'est aussi le plus dur à vendre → en faire un objectif commercial explicite.

---

## 7. Seuils de décision (la bande passante solo plafonne)

Plafond physique : **~16-18 jours-homme facturables/mois** `[HYP]` (le reste = vente, admin, R&D, vie). À 2,5-5 j/site, cela borne le débit.

| Sites livrés/mois | Jours-homme consommés (prod seule) | Signal | Décision |
|---|---|---|---|
| 0-1 | 3-5 j | rampe | Tout faire soi-même. Investir le temps libre en **prospection + templating** (baisser le coût/site). |
| 2 | 5-10 j | rythme sain solo | Zone optimale. Commencer à **tirer le mix vers le haut** (pousser Croissance 4k / Complet 7k plutôt que l'Essentiel 2k) dès qu'il y a une file d'attente. |
| 3 | 8-15 j | proche du plafond | **Déclencheur sous-traitance** : externaliser le contenu/intégration répétitif, OU **monter les prix** pour réguler la demande. Plus de gratuit. |
| 4+ | >15 j + vente + support | saturation | Soit **sous-traiter** (un intégrateur/rédacteur à la tâche, marge transférée), soit **arrêter de vendre des sites au prix d'entrée** et basculer la demande vers Growth/agents (plus de marge/jour). |

> **Règles de seuil chiffrées :**
> - **Monter le prix** dès qu'il y a **2 deals en file d'attente** non servis dans le mois (la demande dépasse la capacité → le prix est trop bas).
> - **Sous-traiter** dès que le **3ᵉ site/mois** est récurrent : la marge d'un site (~2 000 €) finance largement 1 à 1,5 j d'intégrateur externe (~250-400 €/j) `[HYP]` tout en gardant ~1 500 € de marge nette.
> - **Arbitrer le mix** : une journée passée sur un site Croissance à 4 000 € rapporte ~780 €/j de marge (2 745 € / 3,5 j) ; un Essentiel à 2 000 € ~635 €/j (1 270 € / 2 j) ; un Complet à 7 000 € ~1 040 €/j (5 210 € / 5 j) ; un Growth à 8 000 € ~560 €/j **mais** débloque du MRR-agents derrière. À capacité saturée, prioriser ce qui maximise marge/jour **+ MRR généré** (→ pousser le haut de gamme et le récurrent).

---

## 8. Ce que Simon doit renseigner (passer d'hypothèse à réel)

Variables d'entrée à mesurer/arbitrer, par ordre d'impact sur le modèle :

| # | Variable | Aujourd'hui | Comment l'obtenir |
|---|---|---|---|
| 1 | **Temps de prod réel/site** (par palier) | `[HYP]` 2-5 j | **Chronométrer** les 3 premiers sites, porte-à-porte, par phase |
| 2 | **Coût horaire / TJM cible** | `[HYP]` 50 €/h | Arbitrer le TJM (350 ? 500 ?) → fige le coût variable |
| 3 | **Coût de vie perso mensuel** | `[HYP]` 1 800 € | Relevé budget réel Montpellier (loyer, charges, etc.) |
| 4 | **Trésorerie de départ disponible** | inconnu | Solde réellement mobilisable + filet |
| 5 | **Statut juridique retenu** | micro probable | Décision micro-BNC vs SASU (cf §4) + option versement libératoire |
| 6 | **Prix outils croissance** (Vibe Prospecting, Firecrawl, GPT) | partiellement `[HYP]` | Relever les plans réels avant de budgéter §1b |
| 7 | **Prix de l'audit payant** | `[HYP]` 150-300 € | Tester le marché (gratuit froid vs payant) |
| 8 | **Taux d'attache maintenance & agents** | `[HYP]` 60 % / 25 % | Mesurer sur les premiers clients |
| 9 | **Cycle de vente réel** (contact → cash) | `[HYP]` 4-8 sem | Tracer les premiers deals dans un CRM léger |
| 10 | **Conso API IA imputable/site et/agent** | `[HYP]` | Relever la conso Anthropic réelle par projet |
| 11 | **Churn MRR** | `[HYP]` 3 % | Mesurer sur 6-12 mois |
| 12 | **Plafond jours facturables/mois** | `[HYP]` 16-18 j | Constater sur 2-3 mois pleins |

> Tant que **#1 et #2** ne sont pas mesurés, tous les chiffres de marge, point mort et seuils sont des **fourchettes indicatives**, pas des engagements.

---

## 9. Trois leviers de marge prioritaires

1. **Faire fondre le temps de production par site (levier n°1, de loin).** Le coût variable est à ~95 % du temps (§2). Chaque jour économisé par site via le Design System (sections cataloguées, registry), des templates de contenu et l'automatisation IA vaut **~350-500 € de marge** par site et **augmente le débit** (donc le CA total à capacité constante). C'est le seul levier qui améliore **simultanément** marge unitaire ET capacité. Objectif chiffrable : passer de ~3 j à ~2 j sur le palier d'entrée = **+25 % de débit** + **~+350 €/site**.

2. **Construire le MRR-agents, pas seulement la maintenance.** Un agent à ~500 €/mois pèse ~10× une maintenance et transforme un revenu de projets (volatil, dépendant de la prospection) en base récurrente qui **abaisse le point mort personnel** (§4, §6). En faire un objectif commercial dédié : un agent vendu vaut, en valeur actualisée, autant qu'un site. C'est le levier qui change la **nature** du business (freelance → agence-produit).

3. **Tirer le mix vers le haut et supprimer le gratuit dès que la demande sature (régulation par le prix).** À ~2 deals en file d'attente non servis (§7), basculer la demande de l'Essentiel 2k vers Croissance 4k / Complet 7k **ne change presque rien au coût/jour** mais ajoute ~1 500-3 000 € de marge nette par site (cf §3). Le panier moyen plus élevé est le levier direct sur le point mort (§4). Le gratuit (audit froid) est un coût d'acquisition à **plafonner en nombre/mois** et à couper dès que l'inbound suffit — sinon il consomme la capacité (jours-homme) qui devrait produire du CA.

---

*Document recalculable : modifier une hypothèse `[HYP]` et propager dans les tableaux liés (§2 → §3 → §4/§7 ; §6 indépendant). Prochaine itération attendue : après chronométrage des 3 premiers sites (#1, #2).*
