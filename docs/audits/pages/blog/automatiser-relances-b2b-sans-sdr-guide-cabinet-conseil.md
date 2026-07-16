---
route: /blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil
verdict: AMÉLIORER
title_actuel: "Automatiser les relances B2B sans SDR : le guide cabinet conseil"
kw_cible: "automatiser relances B2B / relances commerciales sans SDR → soutient /services/sequences-de-suivi + /services/relance-devis"
date: 2026-07-16
---

# /blog/automatiser-relances-b2b-sans-sdr : guide vertical (cabinet conseil)

## 1. Identité
- Fichier `src/content/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil.mdx`.
- `editorialType: Essay`, `author: simon-beros`, `readingTime: 9`, `publishedAt: 2026-05-10`, `category: crm`, `cluster: pilier-crm-relances-pme-2026`.
- kw : « automatiser les relances B2B », « relances sans SDR », vertical « cabinet conseil ». Intent how-to commercial fort.
- Rôle silo : top/mid-funnel des money pages `/services/sequences-de-suivi` (kw « relance automatisée / lead nurturing »), `/services/relance-devis`, et `/services/crm-scoring-routing`.

## 2. Contenu
- Structure FAQ-first solide (7 Q&A), workflow en 4 étapes, sections en questions (bon pour AEO). Voix cash (« Le mardi on câble. Le vendredi on mesure »). Bilingue.
- **Sur-promesse chiffrée (risque anti-théâtre + E-E-A-T)** : plusieurs chiffres théâtraux et invérifiables :
  - « le gain annuel peut dépasser 500 000 € » (faq, mdx:40) ;
  - « 720 000 € de chiffre d'affaires additionnel » (mdx:103) ;
  - « +2,6× conversion » attribué à HubSpot mais aussi « 9 à 14 % selon notre expérience terrain » (mdx:97) ;
  - « perd en moyenne 60 % de ses opportunités chaudes » (mdx:65) non sourcé.
  Ces montants extrapolés (« pour un cabinet traitant 50 leads… ») sonnent comme le théâtre commercial que le positionnement Waimia rejette (contraste net avec `cabler-son-crm` qui dit « nous ne promettons aucun chiffre »). À dégonfler.
- Coquille : « le protocole que Nous déployons » (mdx:83, majuscule parasite).
- **Chevauchement fort avec `cabler-son-crm-en-10-jours`** : scoring comportemental, séquences A/B/C, seuil 65 points, alerte senior, « câbler → mesurer → arbitrer ». Risque de cannibalisation intra-blog (cf point à trancher §7).

## 3. SEO on-page
- Title kw-first + vertical (« cabinet conseil ») = bon angle de niche. H1 = title. H2 en questions (bon AEO).
- Sources citées en note de bas de page (`[^2]`, `[^4]`) et dans `sources` frontmatter (HubSpot, HBR) : mieux que les autres billets. Bon.

## 4. Maillage interne
- **Aucun lien inline vers les money pages.** Les seuls liens du corps sont génériques : `[Prenez rendez-vous →](/contact)` et `[nos offres →](/services)` (mdx:127). Le billet ne pointe PAS vers `/services/sequences-de-suivi`, `/services/relance-devis` ni `/services/crm-scoring-routing` : pourtant ce sont exactement ses money pages.
- `relatedSolutions: [crm-relances-ia]` et `relatedOffres: [growth-system-ia]` = **références mortes** (aucune collection `solutions`, collection `offres` retirée en v7 cf `[...slug].astro:74` ; de plus `relatedSolutions` n'est même pas passé au template → donnée jamais rendue). `relatedPosts` vide → `relatedCards` vide.
- `cluster: pilier-crm-relances-pme-2026` : pointe vers un pilier qui n'existe pas (aucune page ne porte ce cluster comme hub). Cluster orphelin.

## 5. Balisage
- JSON-LD servi : `Article` + `Person` + `BreadcrumbList` + `Organization`. Correct.
- **FAQ 100 % morte (bug template, priorité)** : les 7 `faq_fr` ne produisent AUCUN rendu visible (curl : le texte « Combien de temps faut-il pour câbler » est absent de la page) NI de JSON-LD `FAQPage` (curl : 0 occurrence). Cause : `[...slug].astro` ne passe pas `faq_*` à `EssayTemplate`, et `EssayTemplate` n'a aucun rendu FAQ (grep « faq » = 0 hit hors import schema). Donc le meilleur levier GEO du billet est inerte. Vaut pour tout le blog.

## 6. Conversion
- CTA présent mais générique (`/contact`, `/services`). Non aligné au CTA canonique (Cal `simonberos/audit`, memory `cal-booking-canonical`). Pas de lien vers la money page précise.

## 7. Verdict + actions
**AMÉLIORER** : bon squelette AEO, mais chiffres théâtraux, FAQ morte, maillage générique, refs mortes, et chevauchement à arbitrer avec `cabler-son-crm`.

1. **Dégonfler les chiffres** : retirer les montants extrapolés (500 000 € / 720 000 €), garder uniquement le ratio sourcé HubSpot (2,6×) et formuler les gains en fourchettes prudentes (« selon volume et cycle »), à l'image de `cabler-son-crm`. Aligner sur la voix « on ne promet pas de chiffre magique ».
2. **Trancher le chevauchement avec `cabler-son-crm-en-10-jours`** (anti-cannibalisation) : différencier explicitement les angles : CE billet = angle vertical « relances sans SDR / cabinet conseil » (intent : supprimer le travail de relance) ; `cabler-son-crm` = angle méthode « structurer le CRM en 10 jours » (intent : mettre en place). Ajouter un renvoi croisé (`relatedPosts`) plutôt que laisser deux guides se recouvrir sur scoring/séquences. Pas de fusion (intents distincts), mais frontière à formaliser.
3. **Câbler le maillage money inline** : remplacer les liens génériques par → « séquences de suivi » = `/services/sequences-de-suivi`, « relance de devis » = `/services/relance-devis`, « scoring et routing » = `/services/crm-scoring-routing`.
4. **Nettoyer le frontmatter mort** : supprimer `relatedSolutions` (jamais rendu + collection inexistante) et `relatedOffres: growth-system-ia` (collection retirée). Retirer ou re-cibler `cluster: pilier-crm-relances-pme-2026` (pilier inexistant).
5. **Réparer la FAQ (transverse, cf synthèse)** : faire rendre `faq_fr` par `EssayTemplate` (section cataloguée `faq-accordion`) + émettre le JSON-LD `FAQPage`. Sans cette correction template, la FAQ de ce billet reste morte.
6. Corriger la coquille « Nous » (mdx:83). Ajouter `updatedAt` et le CTA canonique Cal `simonberos/audit`.
