# 03 — Critique & améliorations des stratégies (phase démarrage, cash-first)

> Revue adversariale des docs `strategy/`, `marketing/`, `business/`. Objectif : rendre la
> stratégie **plus efficace en démarrage** (runway court, cash-first). On critique pour corriger.

## Diagnostic en une ligne
Stratégie **sur-documentée et sous-instrumentée**. Le verrou n'est ni le marché ni le
positionnement (solides) : c'est **le délai entre aujourd'hui et le premier euro encaissé**, et
rien ne le compresse vraiment.

## Top 10 améliorations (impact × effort)
1. **Découpler « générer du cash » de « refondre le site »** — le 1er deal n'a pas besoin du site
   refait, juste de Simon qui appelle 25 prospects et démontre sur waimia.com tel quel. Deux pistes
   parallèles non bloquantes : (A) Cash now = outbound + réseau + réactivation anciens clients ;
   (B) Asset = refonte SEO/GEO en fond. « Aucun deal du T1 n'attend la fin du chantier site. »
2. **Mesurer le temps de prod réel d'un site forké AVANT de promettre 2 sem / 3 000 €** — tout
   l'édifice financier repose sur un temps de prod jamais mesuré. Forker waimia-web une fois en
   réel, chronométrer, recaler panier/volume. Si > 3 j → monter le prix ou réduire le scope « Essentiel ».
3. **Réconcilier l'architecture site** — voir §0bis de `strategy/02` (1 silo SEO + 3 piliers
   vitrine légers). Propager partout (whitelist §1, carte KW `strategy/03 §3`, H1 §4, `marketing/03`)
   pour qu'un agent ne crée pas 5 pages enfants alors qu'on veut des ancres.
4. **La démo GEO « live » est un piège** — au lancement ni Waimia ni ses clients ne sont cités
   (3-6 mois). Reformuler : (1) « l'IA répond ça aujourd'hui, vous n'y êtes pas, vos concurrents non
   plus → **la place est libre** » ; (2) preuve de **méthode** (Schema, llms.txt, cohérence d'entité),
   pas de résultat. Captures de secours pré-enregistrées.
5. **Outbound + réseau = canal n°1 du T1, pas LinkedIn** — LinkedIn donne un RDV à 4-8 sem ;
   réseau chaud convertit en jours. Ordre T1 : réactivation anciens clients → outbound local → LinkedIn
   (investissement de fond). Aligner `marketing/04` sur `business/08 §5`.
6. **Définir prix + livrable exact de l'audit** — incohérent (gratuit `business/08` vs payant
   `business/06`). Trancher : **gratuit en froid** (remplir le pipe), **payant léger imputable en
   chaud** (filtre). Livrable = 3 quick wins chiffrés + 1 capture GEO + 1 reco palier (pas 5-8 pages
   non facturées × dizaines d'audits).
7. **Couper le pipeline contenu podcast/vidéo/YouTube/TikTok/X/Reddit du démarrage** — T1 = 2
   canaux max (LinkedIn + 1 article/sem in-silo). Geler le reste jusqu'à ≥3 clients récurrents.
8. **Remplacer les hypothèses de taux par des paris falsifiables datés** — un plan dont l'output
   varie de ×2,4 ne pilote rien. « Si après 20 contacts, contact→audit < 15 % → problème de
   ciblage, pas de volume. » Promouvoir les 3 KPI hebdo en tête, archiver les projections 6/12/24 mois.
9. **Régler le légal/conformité AVANT toute prospection** — `/mentions-legales` + RGPD n'existent
   pas, le trust-center affiche de **fausses certifs ISO/SOC2** : prérequis bloquant S1 avant le 1er
   email outbound. Démarcher depuis un site qui ment = pire scénario pour une marque « preuve, pas promesse ».
10. **Offre de lancement chiffrée et datée, tout de suite** — « 3 sites IA ce trimestre à 3 000 €
    HT, agent offert 1 mois » : la meilleure idée cash, à promouvoir en offre officielle (home,
    one-pager, CTA, emails). Rareté vraie (capacité solo) = accélérateur de décision honnête, coût zéro.

## Contradictions à résoudre
- **C1 enfants = pages OU ancres** (`strategy/02 §0bis` ancres vs `01/§1/03/marketing03` pages) → ancres (tranché §0bis).
- **C2 cas fictifs gardés OU supprimés** (`strategy/01` gardés vs `02` supprimés) → supprimés (`02` gouverne).
- **C3 audit gratuit OU payant** → gratuit froid / payant chaud.
- **C4 canal n°1 LinkedIn OU outbound** → réseau→outbound→LinkedIn pour T1.
- **C5 contenu 2 canaux OU 7** → 2 canaux T1.
- **C6 pricing site 3 000 vs 7 900 € en prod** → corriger le code (le site ment pendant qu'on prospecte).
- **C7 cadence LinkedIn 2 vs 3/sem** → 3/sem.

## Trop ambitieux vs runway (reporter/couper)
Pipeline multimédia ; dashboard/cockpit + CMS lite TinaCMS + facturation usage ; agents facturés à
l'usage (runtime inexistant — vendre « 1 mois offert » oui, un MRR facturé non) ; projections
12-24 mois ; « 3 piliers + silo + cluster + local + cas + légal tout en Mois 1 ».

## Quick wins absents pour le cash
Démo de vente packagée réutilisable (asset figé S1) ; **1 cas client réel chiffré** (débloque pitch +
emails + LinkedIn + one-pager — à avancer en S1-S2, pas Mois 3) ; réactivation anciens clients
VirtuoseWeb (sa propre section) ; offre de lancement incarnée ; page locale Montpellier publiée
**seule** en S1-S2 (1 page, pas la refonte entière).

## Risques non couverts
Site en prod qui ment (prix/certifs/cas) pendant la prospection ; capacité de prod = mur invisible ;
dépendance à la démo live ; no-show post-audit gratuit ; **saturation solo** (vendre + livrer +
produire) ; « anthropic-first » = argument incompris du resp. marketing PME (garder comme territoire
de marque, jamais comme argument de vente) ; accord écrit des clients réels à sécuriser (sinon pas de cas).

## Verdict — 3 priorités cash 90 jours
1. **Vendre depuis l'existant, maintenant** (réseau + outbound local + offre de lancement, démo sur
   waimia.com tel quel). Cash en jours/semaines.
2. **Lever 2 verrous en S1** : mesurer le temps de prod réel ; rendre le site honnête (prix
   7 900→3 000 €, supprimer certifs/cas fictifs, publier légal) AVANT d'y envoyer un prospect.
3. **Figer 1 cas client réel chiffré + 1 démo packagée** (onglets + captures de secours + recadrage
   GEO « place libre »).

> Tout le reste (3 piliers, cluster, dashboard, podcast, projections) = **asset différé** : à mener
> en fond, jamais en bloquant du cash.

## La 1 chose à figer pour le long terme
**La forkabilité du socle = la seule douve réelle.** Coût marginal décroissant → un solo qui vend du
sur-mesure au prix d'un produit. À industrialiser (procédure de fork documentée, temps mesuré, qualité
constante) dès 3 clients. Tout le reste est commoditisable.
