# 11 — Plan opérationnel cash 90 jours

> Phase démarrage, fondateur solo, runway court. Ce que Simon fait pour **encaisser vite**, en parallèle (jamais bloqué par) le chantier site. Actions datées, preuve/critère sur chacune. Source amont : `docs/state/03-critique-ameliorations.md`.

## 0. Règle d'or

**Aucun deal du T1 n'attend la fin de la refonte.** Le premier euro n'a pas besoin du site refait — juste de Simon qui appelle, démontre sur `waimia.com` tel quel et signe. Deux pistes courent en parallèle, **non bloquantes** :

- **Piste A — Cash now** : réactivation anciens clients → outbound local Montpellier → LinkedIn. Démo sur l'existant. Cash en jours/semaines. **C'est la priorité absolue de chaque journée.**
- **Piste B — Asset** : refonte SEO/GEO, 3 piliers, cluster, forkabilité du socle. Menée **en fond**, jamais en travers du cash.

Si un arbitrage temps se pose un matin : **A gagne toujours**. B n'avance que sur le temps résiduel.

Un seul verrou autorisé à bloquer A : les **prérequis S1** ci-dessous (le site ne doit pas mentir au prospect qu'on lui envoie). Une fois levés, plus rien n'attend B.

---

## 1. Semaine 1 — prérequis bloquants AVANT toute prospection

Trois chantiers courts. Tant qu'ils ne sont pas faits, **on n'envoie aucun email outbound** : démarcher depuis un site qui ment est le pire scénario pour une marque « preuve, pas promesse ».

### 1.1 Rendre le site honnête (code, en prod)
- **Prix** : corriger le `7 900 €` du site live vers la grille canonique 2/4/7/10k (palier Essentiel à **2 000 € HT**) partout où le tarif site apparaît. Le site en prod contredit aujourd'hui l'offre qu'on va vendre.
- **Trust-center fictif** : supprimer les fausses certifications ISO / SOC 2. On ne les a pas. Les afficher est un risque juridique et réputationnel direct en phase de démarchage.
- **Cas clients fictifs** : supprimer tout cas inventé. On les remplace par **un vrai** (cf. §7).
- **Légal** : publier `/mentions-legales` + politique RGPD. Prérequis légal absolu avant le 1er email.
- **Preuve** : capture above-fold de chaque page corrigée sur la prod déployée (`waimia.com`), prix à jour visible, pages légales accessibles (HTTP 200 + contenu réel). Pas de « ça build » : on regarde la page rendue.
- **Critère de sortie S1** : zéro tarif faux, zéro certif fictive, zéro cas fictif, `/mentions-legales` + RGPD en ligne. Tant que ce n'est pas vrai, l'outbound reste à l'arrêt.

### 1.2 Mesurer le temps de prod réel d'un site forké
Tout l'édifice financier (2 sem / palier d'entrée 2 000 €) repose sur un temps de prod **jamais mesuré**.
- **Action** : forker `waimia-web` une fois pour de bon, livrer un site client-type complet, **chronométrer** de bout en bout (contenu, intégration, mise en ligne).
- **Critère** : temps en heures/jours réels noté dans `docs/state/`. Si le fork dépasse **3 jours** de travail effectif → **monter le prix** ou **réduire le scope « Essentiel »** avant de promettre quoi que ce soit. On ne vend pas un délai qu'on n'a pas vérifié.

### 1.3 Sécuriser l'accord écrit de 2-3 clients réels
Sans accord écrit, pas de cas, pas de preuve, pas de logo.
- **Action** : contacter 2-3 clients réels (Inbound Value, Amploi, Balzeo, Carnets de Montpellier, Desangles, naturopathe, import-export) et obtenir un **« oui » écrit** (email suffit) pour citer leur nom, leur logo et un chiffre.
- **Critère** : ≥ 2 accords écrits archivés. Priorité à ceux qui ont un **résultat chiffrable** (cf. §7).

---

## 2. Offre de lancement officielle, datée

**« 3 sites web intelligents ce trimestre — dès 2 000 € HT (Essentiel) + 1 mois d'agent IA offert. »**

- **Rareté vraie** : la limite à 3 n'est pas un artifice marketing, c'est la **capacité réelle d'un solo** ce trimestre. Honnête, donc crédible, donc accélérateur de décision. Coût zéro.
- **Date** : annoncée S1 (dès que les prérequis §1 sont levés), close au 30/09 (fin T1 de démarrage).
- **Où la poser** (même offre, partout, mot pour mot) :
  - **Home** `waimia.com` : bandeau/section au-dessus de la ligne de flottaison.
  - **One-pager** PDF : l'asset qu'on envoie en pièce jointe après un audit.
  - **CTA LinkedIn** : épingler un post + l'inscrire dans la bio/bouton de profil.
  - **Emails** : signature + P.S. de chaque email outbound et de relance.
- **Compteur** : afficher l'état réel (« 2 places restantes ») et le tenir à jour. La rareté ne marche que si elle est vraie.
- **Critère** : offre identique et cohérente sur les 4 surfaces. Aucune mention de l'agent « facturé à l'usage » (le runtime n'existe pas) — on vend **1 mois offert**, pas un MRR.

---

## 3. Réactivation réseau & anciens clients VirtuoseWeb

**Canal au meilleur closing du T1.** Le réseau chaud convertit en jours ; LinkedIn met 4-8 semaines. On commence par là.

**Playbook :**
1. **Liste** (J1-J2) : tableau de tous les anciens clients et contacts VirtuoseWeb + clients Waimia réels. Colonnes : nom, dernier contact, relation (chaud/tiède), intro possible vers qui.
2. **Script court** (message, pas pavé) :
   > « Salut [Prénom], je lance Waimia — sites web intelligents + visibilité dans les réponses IA (ChatGPT, Google AI). Je prends **3 projets ce trimestre, site dès 2 000 € (Essentiel), 1 mois d'agent offert**. Je t'offre un **audit quick win gratuit** de ta visibilité IA, que tu bosses avec moi ou pas. 20 min cette semaine ? »
3. **Objectif chiffré** : contacter **100 % de la liste en S1-S2**. Cible : **5 audits** issus du réseau d'ici fin S2.
4. **Demande d'intro systématique** : clore chaque échange (signé ou non) par « tu connais quelqu'un à qui ça rendrait service ? ». Le réseau se ramifie ou il s'éteint.
- **Critère** : liste complète J2, 100 % contactés fin S2, ≥ 5 audits réseau, ≥ 3 demandes d'intro formulées.

---

## 4. Outbound local Montpellier

**Canal n°2.** Détail du ciblage, des messages et des séquences : `docs/business/03` et `docs/business/09` — ne pas dupliquer ici, s'y référer.

- **Volume** : **25 prospects sur 2 semaines** (S2-S3), local Montpellier.
- **Audit gratuit en froid** (remplir le pipe), audit payant léger imputable en chaud (filtre) — cf. arbitrage `docs/state/03 §6`.
- **Objectif** : décrocher des **RDV** (audits réalisés), pas accumuler des envois.
- **Critère** : 25 prospects qualifiés contactés fin S3, suivi du taux contact→audit (cf. §9). On ne démarre l'outbound qu'après le feu vert §1.

---

## 5. Page locale Montpellier publiée SEULE

- **Action** : publier **une seule page** « Agence IA Montpellier » en S1-S2. **Pas la refonte entière** — une page, indexable, qui sert d'ancrage local et de point d'atterrissage pour l'outbound.
- **Critère** : page en ligne fin S2, indexée, H1 local clair, CTA vers l'offre de lancement (§2). Découplée totalement du chantier piliers/cluster (piste B).

---

## 6. Un cas client réel chiffré

**À faire S1-S2, pas Mois 3.** Un cas réel chiffré débloque d'un coup : pitch, emails, posts LinkedIn, one-pager, home. C'est l'asset à plus fort levier du trimestre.

**Trame (1 page) :**
- **Contexte** : qui, secteur, problème de départ.
- **Ce qu'on a fait** : site IA / quick wins, en 2-3 phrases.
- **Résultat chiffré** : le chiffre qui compte (trafic, leads, position, temps gagné, CA). **Un chiffre vrai, vérifiable, validé par le client.**
- **Verbatim** : 1 phrase du client, citée avec son accord.

**Checklist :**
- [ ] Client cible choisi parmi ceux qui ont accordé l'écrit (§1.3) et qui ont **un chiffre**.
- [ ] Chiffre récupéré et vérifié (source datée).
- [ ] Accord écrit sur le chiffre + le verbatim + le logo.
- [ ] Page cas rédigée (trame ci-dessus) et publiée sur `waimia.com`.
- [ ] Réinjecté dans : one-pager, signature email, post LinkedIn épinglé, pitch d'audit.
- **Critère** : 1 cas réel chiffré en ligne fin S2, réutilisé sur ≥ 3 surfaces.

---

## 7. Démo de vente packagée réutilisable

**Asset figé** (piste B mais prioritaire car il sert le cash) — construit une fois, rejoué à chaque RDV. Objectif : ne jamais improviser une démo, ne jamais dépendre du live.

- **Onglets pré-chargés**, prêts avant le RDV :
  - **Perf** : `waimia.com` / `virtuoseweb.fr` (Lighthouse, vitesse) — preuve de qualité d'exécution.
  - **Édition IA** : démo concrète d'un contenu/section produit ou modifié par l'IA.
  - **GEO** : la requête tapée dans ChatGPT / Google AI sur le secteur du prospect.
- **Captures de secours pré-enregistrées** : chaque onglet doit avoir sa **capture figée** si le live tombe ou si la réponse IA varie. La démo ne doit jamais dépendre du réseau ou de l'humeur d'un modèle.
- **Recadrage GEO « la place est libre »** : au lancement, ni Waimia ni ses clients ne sont encore cités par les IA (3-6 mois de latence). On ne promet pas un résultat — on montre que **« l'IA répond ça aujourd'hui, vous n'y êtes pas, vos concurrents non plus → la place est libre »** + preuve de **méthode** (Schema, llms.txt, cohérence d'entité). Jamais « regardez, je suis premier » (faux et piégeux).
- **Critère** : un dossier `/démo-vente` figé (onglets + captures de secours + script de recadrage), rejouable en 10 min sans préparation. Construit fin S2.

---

## 8. Les 3 KPI hebdo + le pari falsifiable

On pilote sur **3 chiffres**, relevés chaque vendredi. Les projections 6/12/24 mois sont archivées — elles ne pilotent rien.

| KPI | Cible | Mesure |
|---|---|---|
| **Audits réalisés** | **≥ 3 / semaine** | nombre d'audits livrés dans la semaine |
| **Taux audit → signature** | glissant, suivi | signés ÷ audits réalisés (fenêtre glissante) |
| **MRR** | en hausse | revenu récurrent encaissé |

**Pari falsifiable daté :**
> « Si après **20 contacts**, le taux **contact → audit < 15 %**, le problème est le **ciblage**, pas le volume. On corrige le ciblage **avant** d'ajouter du volume. »

On ne « met pas plus de pression sur le tuyau » tant que le tuyau fuit. Ce test tranche tôt, sur données réelles, sans attendre un trimestre.

---

## 9. Objectif cash T1 (prudent) + ce qu'on ne fait PAS

### Objectif chiffré — hypothèses explicites
- **Capacité solo** : 3 sites livrables max sur le trimestre (offre de lancement §2).
- **Hypothèse de conversion** : sur ~25 outbound + réseau, viser **8-12 audits réalisés** au T1 ; à un taux audit→signature prudent de **25-30 %**, on signe **2 à 3 sites**.
- **Objectif cash prudent T1** : **8 000 à 12 000 € HT encaissés** (2 à 3 deals au panier moyen pondéré ~4 000 € HT [HYP]), agent offert (0 € MRR ce trimestre, assumé). L'entrée se fait dès 2 000 € (Essentiel) ; le panier moyen monte avec le mix Croissance/Complet.
- **Borne basse non négociable** : **1 site signé et encaissé** d'ici fin Mois 2. Si on n'y est pas → déclencher le pari falsifiable §8 et recaler le ciblage, pas le discours.
- Ces chiffres sont des **bornes de pilotage**, pas une promesse. On les recale dès que le temps de prod réel (§1.2) et le premier taux contact→audit (§8) tombent.

### Ce qu'on ne fait PAS ce trimestre
- **Dashboard / cockpit** de pilotage produit.
- **CMS lite** (TinaCMS) et facturation à l'usage.
- **Agents facturés au runtime** (le runtime n'existe pas — on vend « 1 mois offert », pas un MRR).
- **Pipeline multimédia** : podcast, vidéo, YouTube, TikTok, X, Reddit. T1 = 2 canaux max (LinkedIn + 1 article/sem in-silo).
- **Projections 12-24 mois** et plans dont l'output varie de ×2. On pilote sur les 3 KPI hebdo.
- **Refonte site complète en bloquant du cash** : elle avance en fond (piste B), jamais en travers d'un deal.

---

## Checklist d'exécution

### Semaine 1 (prérequis bloquants)
- [ ] Site honnête : prix 7 900 € → grille canonique 2/4/7/10k (Essentiel 2 000 €), certifs ISO/SOC2 fictives supprimées, cas fictifs supprimés — capture prod à l'appui.
- [ ] `/mentions-legales` + RGPD publiés et accessibles.
- [ ] Fork de `waimia-web` chronométré, temps réel noté ; prix/scope recalés si > 3 j.
- [ ] ≥ 2 accords écrits de clients réels (nom + logo + chiffre).
- [ ] Liste complète anciens clients VirtuoseWeb + clients Waimia montée (§3).
- [ ] Offre de lancement annoncée (home + signature email) (§2).

### Semaines 2-4
- [ ] 100 % du réseau contacté (script §3), ≥ 5 audits réseau visés.
- [ ] 25 prospects outbound Montpellier contactés (renvoi `business/03` + `09`).
- [ ] Page locale Montpellier publiée **seule**, indexée.
- [ ] 1 cas client réel chiffré rédigé et publié.
- [ ] Démo de vente packagée figée (onglets + captures de secours + recadrage GEO).
- [ ] Offre de lancement posée sur les 4 surfaces (home, one-pager, LinkedIn, emails).
- [ ] Relevé hebdo des 3 KPI démarré.

### Mois 2
- [ ] ≥ 3 audits réalisés / semaine tenus.
- [ ] Pari falsifiable évalué à 20 contacts ; ciblage corrigé si contact→audit < 15 %.
- [ ] Borne basse : **1 site signé et encaissé**.
- [ ] Cas client + offre réinjectés dans chaque relance.

### Mois 3
- [ ] Objectif cash T1 : **2 à 3 sites encaissés** (8 000-12 000 € HT, panier moyen ~4 000 € [HYP]).
- [ ] Procédure de fork documentée (temps mesuré, qualité constante) — amorce de la douve.
- [ ] Bilan des 3 KPI sur le trimestre ; recalage de l'offre et du ciblage pour T2.
- [ ] Tout asset différé (dashboard, CMS, multimédia, projections) **resté gelé** — vérifié.
