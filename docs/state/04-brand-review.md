# 04 — Revue de voix de marque (brand-review)

> Audit de cohérence et de crédibilité du corpus commercial Waimia, mené selon la méthodologie
> brand-review (voix → terminologie → piliers → conformité → claims → légal). Périmètre :
> `marketing/01-05`, `business/01-10`, `strategy/01-03`. Référentiel = voix Waimia (praticien,
> anti-théâtre, **preuve avant affirmation**, pas de flatterie, tranchant mais honnête, concret
> > conceptuel, sobriété typo, zéro emoji, « je » du praticien / « nous » de la marque, on vend
> un résultat jamais « de l'IA », zone blanche Limova↔ClaudIn, anthropic-first, Montpellier, solo
> assumé comme atout). Sévérité : **Haute** = danger commercial/légal ou contradiction frontale
> de la voix ; **Moyenne** = écart sans danger ; **Basse** = préférence/style.

---

## Synthèse exécutive

Le corpus est **globalement très aligné** : la doctrine « preuve avant affirmation » est citée
explicitement et tenue dans la majorité des docs (sales-enablement, pitch, fiches offres,
business plan). Les chiffres financiers sont presque toujours signalés « hypothèse » — discipline
rare et à préserver.

Deux fragilités systémiques dominent. **(1) Un décalage entre la doctrine et certaines pièces
orientées prospect** : plusieurs claims chiffrés (perf « 90-100 vs 30-60 », « 99 % des
concurrents », « 95 % de vos concurrents », « 2× plus rapide ») sont posés comme des faits
généraux alors qu'ils ne sont démontrables au cas par cas qu'en démo — exactement le piège que la
marque dit éviter. **(2) Une redondance DRY massive** : la liste clients, le positionnement zone
blanche, l'offer ladder et le bloc preuve sont recopiés mot pour mot dans 8-10 docs → risque de
désynchronisation au premier changement (un client qui se retire, un prix qui bouge).

Aucun risque légal grave, mais trois points de vigilance : la liste clients utilisée comme
référence commerciale **sans mention d'accord formalisé**, le statut juridique/RGPD du
« forfait » audit (mentions vendeur), et des comparatifs concurrents nominatifs (Limova, ClaudIn)
à fonder sur des faits vérifiables.

---

## 1. Claims non étayés (chiffres / promesses sans preuve ni source)

> Règle violée : « preuve avant affirmation », « chiffre/source datée/cas réel »
> (`marketing/03 §2`). Un chiffre posé comme fait général sans source ni « mesuré le [date] » est
> hors voix, même s'il est plausible.

| # | Claim | Doc:section | Problème | Correction (after) |
|---|---|---|---|---|
| C1 | « perf Astro typiquement **Lighthouse 90-100 vs WordPress 30-60** » | `business/06` Fiche 1 ; `business/10` Deck 2 §7 ; `business/05 §2` | Fourchette présentée comme fait universel, aucune source ni mesure datée. Un WordPress bien fait dépasse 60 ; un Astro mal configuré descend sous 90. | « Sur nos sites, Lighthouse mesuré 90-100 (waimia.com, [date]) ; un WordPress chargé tombe souvent sous 60. Je mesure le vôtre en direct. » |
| C2 | « un canal que **99 % des concurrents locaux ignorent** » (GEO) | `business/06` Fiche 1 ; `business/10` Deck 1 §6, Deck 2 §6 | « 99 % » est un chiffre inventé, non sourçable. Superlatif implicite. | « un canal que la plupart des concurrents locaux n'ont pas encore travaillé » (sans chiffre) — ou sourcer (« 65-71 % des pages citées par les IA ont du Schema.org », déjà dans `strategy/03 §2`). |
| C3 | « Plus rapide que **95 % de vos concurrents** » | `business/06` Fiche 1 ; `business/10` Deck 2 §1 (sous-titre) | Pourcentage non mesurable a priori, posé avant toute démo. | « Plus rapide que la quasi-totalité des sites WordPress que vous comparerez — on le vérifie ensemble. » |
| C4 | « Un site **2× plus rapide** qui convertit mieux » | `business/05 §1.2` (Bénéfice SPIN) | « 2× » et « convertit mieux » non étayés ; le lien perf→conversion est asséné. | « Un site nettement plus rapide — et la vitesse, c'est moins d'abandons avant l'affichage. » (corrélation prudente, pas promesse chiffrée) |
| C5 | « à 3 000 €, **un client de plus par trimestre et c'est remboursé** » | `business/05 §3` (objection prix) ; `business/07 §C` ; `business/06` Fiche 0 | Calcul de ROI présenté comme fait alors qu'il dépend de la valeur client (inconnue à ce stade). | « À 3 000 €, faisons le calcul ensemble : combien vous rapporte un client, combien il en faut pour rembourser ? » (laisser le prospect chiffrer — déjà la bonne méthode SPIN du §1.2) |
| C6 | « contenu GEO qui **compose** » / « coût marginal d'un lead **proche de zéro** » | `business/06` Fiche 2 ; `business/10` Deck 3 §4, §6 | Promesse de résultat (effet cumulatif, coût ~0) non démontrable au lancement, pour une offre encore en chantier. | « L'objectif : un coût marginal de lead qui baisse à mesure que le contenu s'accumule. » (objectif annoncé, pas résultat acquis) |
| C7 | « citations IA **3-6 mois** » répété comme une donnée Waimia | `marketing/02 §5` ; `business/01 §6` ; `business/06` ; `business/10` (×3) ; `strategy/03 §2` | Le chiffre vient de sources tierces (Effinity, pretacloser, newp — `strategy/03`). Présenté ailleurs sans rappel de source, il devient un engagement implicite. | Conserver « 3-6 mois selon les retours publics (sources `strategy/03`) ; à confirmer sur nos propres mesures GSC/tests IA ». Ne jamais le formuler comme une garantie de délai. |
| C8 | « **65-71 %** des pages citées par les IA ont du Schema.org » | `strategy/03 §2` | Bien : c'est sourcé. À conserver tel quel — modèle de la bonne pratique pour C1-C2. | (aucune — référence de ce qu'il faut faire ailleurs) |

---

## 2. Violations « preuve avant affirmation » (résultats non démontrables au lancement)

> Cas spécifique : le doc promet au prospect un résultat que Waimia **ne peut pas encore prouver
> en juin 2026** (offre en chantier, aucune mesure interne, dépendance externe).

- **V1 — ROI agents « salarié virtuel » présenté avec démo.** `business/05 §2` (« Cas chiffré :
  heures économisées vs coût, démo agent réel ») et `business/06` Fiche 3 (« Waimia opère ses
  propres agents »). Or `marketing/05 §2` et `business/01 §8` classent les agents en **🔜 chantier**
  / jalon 3-12 mois. **Promettre une démo d'agent réel et un ROI chiffré quand l'agent n'est pas
  encore en prod = anti-GF-1 frontal.** → Tant que l'agent n'est pas opérable : présenter l'offre
  agents comme **roadmap assumée** (« voici ce qu'on est en train de câbler »), pas comme preuve
  existante. Ne montrer en démo que ce qui tourne réellement.

- **V2 — « Waimia applique son propre growth system » (dogfooding).** `business/06` Fiche 2 ;
  `business/10` Deck 3 §7 (« la prospection et le contenu de l'agence tournent sur ce système »).
  Le pipeline contenu interconnecté (article→script→podcast→vidéo) est listé **🔜 chantier** dans
  `marketing/05 §2` et `marketing/03 §6`. → Le claim dogfooding n'est vrai que **partiellement**
  (site oui ; pipeline agents non). Préciser : « le site et le contenu tournent sur cette méthode ;
  le pipeline d'automation complet est en déploiement. » Sinon le prospect qui demande à voir le
  système complet constate un écart = perte de crédibilité, le contraire du but.

- **V3 — Citations IA présentées comme acquises côté preuve.** `business/05 §1.4` (« Si un client
  est déjà cité → preuve béton ») et `business/07 §B`. Au lancement, **aucune citation IA n'est
  encore acquise** (`marketing/02 §5` : « 1res citations IA amorcées (3-6 mois) »). → Garder le
  conditionnel partout (« si un client est déjà cité ») et ne jamais basculer ce « si » en
  affirmation dans un deck. Le Deck 1 §6 et Deck 2 §6 frôlent l'affirmation.

- **V4 — « hébergement européen » / « RGPD cadré ».** `business/05 §3` (objection sécurité). Posé
  comme acquis ; à vérifier que Vercel sert bien en région UE pour les sites livrés, et que les
  mentions/registre RGPD existent réellement (cf §5 ci-dessous). Ne pas affirmer avant d'avoir la
  config réelle.

---

## 3. Incohérences de voix / ton

| # | Élément | Doc:section | Type | Correction |
|---|---|---|---|---|
| T1 | « anthropic-first » utilisé comme **argument de vente au prospect** | `business/07 §A.5` (« Agence IA anthropic-first à Montpellier »), one-pager §53, Deck 1/2/3 couvertures, `business/05 §1.1` froid | Territoire de marque transformé en pitch. Un resp. marketing PME ne sait pas ce qu'« anthropic-first » veut dire et s'en moque ; la voix dit « concret > conceptuel » et « vendre un résultat ». | En façade prospect : « agence IA à Montpellier » + bénéfice. Garder « anthropic-first » pour le positionnement interne / l'investisseur / le pair, pas pour le one-pager laissé au dirigeant. `business/04 §1` le formule mieux (« maîtrise bout-en-bout »). |
| T2 | « machine à leads », « remplir votre agenda » | `business/05 §1.1`, §6.1 ; `business/07 §A.4` | Frôle la sur-promesse / le registre « gourou » que la marque dénonce. | « transformer votre site en source de contacts mesurable » — plus sobre, plus tenable. |
| T3 | Emoji ✅ 🔜 🔁 ⚠️ 🧭 🛑 ☁️ dans les docs | `marketing/05 §2` (✅🔜), `strategy/01` (🔁⚠️), `CLAUDE.md`, README | La voix impose **zéro emoji**. Tolérable en doc interne de pilotage, mais incohérent avec la règle affichée ; à proscrire absolument dès qu'un fragment peut fuiter vers un livrable. | Remplacer par libellés texte (« FAIT », « À FAIRE », « SUPERSEDED », « ATTENTION ») dans tout doc susceptible d'alimenter un contenu public ou un deck. |
| T4 | « ROII » (coquille) | `marketing/02 §6` | Typo dans un doc de référence. | « ROI ». |
| T5 | Jargon non explicité côté prospect : « GEO », « E-E-A-T », « Core Web Vitals », « IA-native », « forkable » | omniprésent ; decks `business/10` | « GEO » est défini une fois mais réutilisé brut dans des slides prospect. La voix vise un resp. marketing, pas un SEO. | Au premier usage prospect : « le GEO (être cité par ChatGPT, Claude, Perplexity) ». « E-E-A-T » et « forkable » : bannir des supports prospect, réserver aux docs internes. |
| T6 | « 95 % » / « 99 % » / « la plupart » mélangés pour le même fait | `business/06`, `business/10` (cf C2/C3) | Incohérence interne : le même différenciateur GEO est chiffré « 99 % » à un endroit, « 95 % » plus rapide ailleurs, « la plupart » dans `strategy/03`. Désaccord = signal d'invention. | Aligner sur une seule formulation sobre sans pourcentage (« que la plupart des concurrents locaux ignorent encore »). |
| T7 | Sous-titre publicitaire « Sites & systèmes IA qui font trouver, convertir, exécuter » | `business/07` one-pager | Bon rythme, mais vérifier qu'« exécuter » (= agents) ne sur-promet pas une capacité non encore livrée (cf V1). | OK si les agents sont présentés en roadmap ; sinon « …trouver et convertir » au lancement. |

> Note positive : aucune flatterie résiduelle détectée, aucun « révolutionnaire / disruptif /
> innovant » (la liste noire de `marketing/03 §2` est respectée). Le ton praticien tient bien dans
> `business/05`, `07`, `08` et `01`.

---

## 4. Problème DRY / redondance (risque de désynchronisation)

> Symptôme : le même bloc factuel est **recopié à l'identique** sur N docs. Au premier changement
> (un client se retire, un prix bouge, une offre se renomme), il faut éditer N fichiers → garantie
> de divergence. Recommandation transverse : **un doc source par concept ; les autres citent**.

| # | Concept dupliqué | Docs où il apparaît (recopié) | Doc source recommandé | Action |
|---|---|---|---|---|
| D1 | **Liste clients réels** (Inbound Value, Amploi, Balzeo, Carnets de Montpellier, Desangles, naturopathe, import-export) | `marketing/01 §7`, `04 §0`, `business/01 §1`, `02 §2`, `05`, `06`, `07`, `10` (×2), `strategy/01 §6`, `03 §6` — **11 occurrences** | **`business/02` (étude de marché) ou une fiche `business/00-references.md` dédiée** | Centraliser la liste + le **statut d'accord** par client dans UN fichier ; partout ailleurs : « clients réels (cf `references`) ». Si un client se retire, une seule édition. |
| D2 | **Positionnement zone blanche** (tableau Limova / Waimia / ClaudIn + prix 70-120 € / 50 k€) | `marketing/01 §1`, `04 §0`, `business/01 §1`, `02 §4`, `05` (intro), `07` (implicite) — **6 occurrences** | **`marketing/01 §1`** (déjà désigné « socle de marque ») | Garder le tableau complet uniquement dans `marketing/01` ; ailleurs une phrase + renvoi. Évite que « 70-120 € » et « 50 k€ » divergent si un concurrent change de prix. |
| D3 | **Offer ladder + prix** (Audit / Site 3 000 € / Growth / Agents) | `marketing/01 §5`, `02 §6`, `business/01 §5a`, `06` (vue d'ensemble), `07 §3`, `08` (offer ladder), `10` (×3), `strategy/01 §3` — **9+ occurrences** | **`marketing/01 §5`** (référencé partout déjà) | Le tableau prix maître dans `marketing/01 §5` seul ; les decks et fiches citent. **Risque concret déjà présent** : `business/08` retient « Audit 0 € » alors que `business/06`/`marketing/01` disent « forfait léger payant, imputable ». **Divergence active à arbitrer (voir L-prix ci-dessous).** |
| D4 | **Bloc preuve dogfooding** (« waimia.com + virtuoseweb.fr construits avec la méthode vendue ») | `marketing/01 §7`, `business/01 §3`, `05 §intro`, `06 §intro`, `07 §6`, `10 §intro` (×3), `strategy/01 §6` — **8 occurrences** | **`business/01 §3` (principe directeur) ou `marketing/01 §7`** | Formuler une fois la nuance « site oui / agents en chantier » (cf V2) et la réutiliser, pour ne pas avoir 8 versions dont certaines sur-promettent. |
| D5 | **Méthode SEO/GEO gratuite** (Autocomplete / Trends / Keyword Planner / GSC / Bing) | `strategy/01 §7` ET `strategy/03 §1` — quasi mot pour mot | **`strategy/03 §1`** | `strategy/01 §7` doit citer `strategy/03 §1`, pas le recopier (déjà l'intention, mais le texte est dupliqué). |
| D6 | **Garde-fous RGPD prospection** | `business/03 §7` ET `business/09 §4.4` (qui dit « reprennent `03 §7` » mais re-développe) | **`business/03 §7`** | OK car `09` se déclare dérivé ; veiller à ne pas faire diverger les deux listes. |

---

## 5. Risques légaux / claims sensibles

| # | Risque | Doc:section | Gravité | Action |
|---|---|---|---|---|
| L1 | **Clients nommés comme références sans accord formalisé visible** | `marketing/01 §7`, `business/05`, `06`, `07`, `10`, `strategy/01 §6` | Haute | Le corpus dit « cas à formaliser » (`marketing/01 §7`) et « avec accord » (`marketing/04 §1` angle 4), mais les decks `business/10` et le one-pager `07` **nomment déjà** Carnets de Montpellier, Balzeo, Amploi, Desangles, Inbound Value comme références publiques. **Obtenir un accord écrit nominatif avant tout usage dans un support diffusé** (deck envoyé, one-pager, site). D1 (fichier références centralisé) doit porter le statut d'accord par client. |
| L2 | **Chiffres de ROI / perf comme arguments commerciaux** (cf C1-C5) | `business/05`, `06`, `10` | Moyenne | En publicité comparative FR, un chiffre de performance avancé doit être vérifiable et loyal (art. L121 C. conso). « 90-100 vs 30-60 », « 2× », « 95 % » sont attaquables s'ils figurent sur un support diffusé sans preuve. → Reformuler en mesure-en-direct (cf §1) sur tout support écrit. |
| L3 | **Comparatif concurrents nominatif** (Limova 70-120 €/mois, ClaudIn « ex-McKinsey ») | `marketing/01 §1`, `business/02 §4`, `05 §4` battlecards | Moyenne | Les battlecards (`business/05 §4`) sont **internes** → OK. Mais « ex-McKinsey » accolé à ClaudIn et les prix concurrents, **s'ils passent dans un support prospect**, exposent à un risque dénigrement/comparatif déloyal. Garder strictement internes ; ne jamais nommer un concurrent dans un livrable prospect. |
| L4 | **Statut juridique du « forfait » audit + mentions** | `business/06` Fiche 0, `business/07`, `10` Deck 1 | Moyenne | « payé d'avance », « imputable sur l'offre 1 » = engagement commercial. Vérifier CGV (acompte, imputation, droit de rétractation pro/non-pro), facturation, et que « gratuit » (`business/08` QW3 : « Audit IA gratuit ») ne contredit pas « payant » (`06`/`10`). **Incohérence gratuit/payant à trancher** (cf D3). |
| L5 | **RGPD prospection** — bien traité, à exécuter | `business/03 §7`, `09 §4.4` | Basse (si exécuté) | La doctrine est correcte (intérêt légitime B2B, opt-out, registre, pas de scraping LinkedIn). Risque = **non-exécution** : s'assurer que le registre de traitement, la liste opt-out et les mentions existent réellement avant le premier envoi. Claim « RGPD cadré » (`business/05 §3`) ne doit pas précéder la mise en conformité réelle. |
| L6 | **Données chiffrées marché présentées comme cadrage** | `business/01 §4`, `02 §1` | Basse | Bien géré : « hypothèses de cadrage », INSEE « non revérifié », fourchettes sourcées `strategy/03`. Modèle à conserver. Veiller à ne pas durcir ces ordres de grandeur en « le marché fait X M€ » dans un pitch. |

---

## 6. Top 10 corrections before/after (par danger commercial décroissant)

> Priorité = ce qui peut faire perdre un deal, exposer juridiquement, ou faire mentir la marque
> en RDV. On corrige d'abord ce qui se voit côté prospect.

**1. ROI agents / dogfooding sur une offre en chantier (V1, V2) — danger : démo qui n'existe pas.**
- *Before* (`business/06` Fiche 2/3, `10` Deck 3 §7) : « Waimia opère ses propres agents » ; « démo agent réel ».
- *After* : « Le site et le contenu tournent déjà sur cette méthode. L'automation agents complète est en déploiement — je vous montre ce qui tourne aujourd'hui, et la feuille de route pour le reste. »

**2. Accord client avant usage public des noms (L1) — danger : juridique + réputation.**
- *Before* : decks et one-pager nomment Carnets de Montpellier, Balzeo, Amploi, Desangles, Inbound Value.
- *After* : ne nommer dans un support diffusé que les clients ayant donné un **accord écrit** ; les autres → « plusieurs PME locales (références sur demande) ». Statut centralisé dans `business/00-references.md`.

**3. Perf « 90-100 vs 30-60 » comme fait universel (C1, L2) — danger : claim attaquable + anti-voix.**
- *Before* : « perf Astro typiquement Lighthouse 90-100 vs WordPress 30-60 ».
- *After* : « Sur nos sites, Lighthouse 90-100 (mesuré waimia.com, [date]). Je mesure le vôtre et un WordPress comparable en direct — vous voyez l'écart réel, pas un chiffre de brochure. »

**4. Incohérence audit gratuit vs payant (L4, D3) — danger : contradiction visible entre supports.**
- *Before* : `business/08` « Audit IA gratuit 30 min » vs `business/06`/`10` « forfait léger, payé d'avance, imputable ».
- *After* : trancher UNE position (recommandé : « audit forfait léger, imputable à 100 % sur le site » — c'est le levier de closing) et la propager partout depuis `marketing/01 §5`.

**5. « 99 % / 95 % des concurrents » (C2, C3, T6) — danger : chiffre inventé décrédibilise tout le reste.**
- *Before* : « un canal que 99 % des concurrents locaux ignorent » / « plus rapide que 95 % de vos concurrents ».
- *After* : « un canal que la plupart des concurrents locaux n'ont pas encore travaillé » (sans pourcentage). Pour la perf : « plus rapide que la quasi-totalité des WordPress — on le vérifie ensemble ».

**6. « anthropic-first » en pitch prospect (T1) — danger : jargon qui perd le décideur.**
- *Before* (one-pager `07`, decks couvertures) : « Agence IA anthropic-first, Montpellier ».
- *After* (façade prospect) : « Agence IA à Montpellier — j'installe l'IA Claude/GPT dans le marketing des PME ». Garder « anthropic-first » comme territoire de marque interne (`marketing/01`, investisseur, pairs).

**7. ROI « un client de plus rembourse » asséné (C5) — danger : promesse non tenable.**
- *Before* : « à 3 000 €, un client de plus par trimestre et c'est remboursé ».
- *After* : « Faisons le calcul : combien vous rapporte un client ? Combien il en faut pour que les 3 000 € soient remboursés ? » (le prospect chiffre — c'est déjà la méthode SPIN du `business/05 §1.2`, à généraliser).

**8. Citations IA « 3-6 mois » sans rappel de source (C7, V3) — danger : engagement de délai implicite.**
- *Before* : « citations IA en 3-6 mois » (posé comme donnée Waimia dans les decks).
- *After* : « Selon les retours publics du secteur, premières citations en 3-6 mois ; à confirmer sur nos mesures. C'est une fenêtre d'avance, pas une garantie de calendrier. »

**9. DRY liste clients + offer ladder + zone blanche (D1, D2, D3) — danger : désynchro silencieuse.**
- *Before* : recopiés à l'identique sur 6-11 docs.
- *After* : 1 doc source par concept (`business/00-references.md` pour clients ; `marketing/01 §1` pour zone blanche ; `marketing/01 §5` pour offer ladder/prix) ; partout ailleurs, une phrase + renvoi.

**10. « machine à leads / remplir votre agenda » (T2) — danger : registre gourou que la marque rejette.**
- *Before* : « transformer leur site en machine à leads » ; « qui à terme remplit votre agenda ».
- *After* : « transformer votre site en source de contacts mesurable » ; « qui alimente votre pipeline de façon prévisible ».

---

## Ce qui est déjà exemplaire (à ne pas casser en corrigeant)

- **Discipline « hypothèse » sur tous les chiffres financiers** (`business/01 §9`, `02`, `08`,
  `03 §6`) : chaque projection est marquée pari explicite, à recaler sur données réelles. Modèle.
- **`business/05` (sales-enablement)** : la doctrine « on ne dit jamais "plus rapide", on l'ouvre
  et on le montre » est la voix Waimia parfaitement incarnée. Les corrections §1 visent à aligner
  les **decks** sur ce niveau, pas l'inverse.
- **Assumer ses angles morts** (`business/05 §4` : « ce n'est pas mon client ») et le solo comme
  atout (`business/07`) : pleinement « tranchant mais honnête ».
- **Sources datées et liens réels** dans `strategy/03` : exactement le standard à généraliser aux
  claims de perf et de marché.
- **RGPD et caveats méthodo** (biais US de la recherche, INSEE non revérifié) : honnêteté
  intellectuelle conforme à la marque.

> Prochaine étape recommandée : (1) trancher l'audit gratuit/payant et le propager ; (2) créer
> `business/00-references.md` (clients + statut d'accord) ; (3) passer les 3 decks `business/10` au
> filtre « mesure-en-direct, pas chiffre-de-brochure » avant tout envoi prospect.
