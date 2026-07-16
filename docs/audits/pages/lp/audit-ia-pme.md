---
route: /lp/audit-ia-pme
verdict: SUPPRIMER
title_actuel: "Audit IA PME · 45 min pour cartographier vos gains de temps"
kw_cible: audit IA PME
date: 2026-07-16
---

# /lp/audit-ia-pme

## 1. Identité
- Route `/lp/audit-ia-pme` servie par `src/pages/lp/[...slug].astro` depuis `src/content/lp/audit-ia-pme.json`.
- Title servi : `Audit IA PME · 45 min pour cartographier vos gains de temps` ; noindex, follow (`<meta name="robots" content="noindex, follow">`), canonical self `https://waimia.com/lp/audit-ia-pme`, hors sitemap et robots-disallow `/lp/` (`astro.config.mjs:234-235,250`).
- Rôle réel : destination trafic payant (ADR-003, commentaire route L4-6 « landing page composable terminale · noindex »). N'entre dans aucun parcours organique.
- Intention : transactionnelle « audit IA / audit automatisation PME ».

## 2. Contenu
- Squelette 7 sections `hero-conversion-funnel, problem-statement, problems-grid, proof-bar, pricing-cards, faq-accordion, footer-cta-band` : STRICTEMENT le même que les 8 autres LP du silo (clone de template, copy permutée).
- La section `pricing-cards` n'affiche pas de prix mais 4 axes d'audit ; son CTA interne pointe vers la page canonique `/audit-ia-pme` (`src/content/lp/audit-ia-pme.json`, tiers[].cta.href `/audit-ia-pme`). La LP se renvoie donc elle-même vers sa jumelle.
- Voix conforme au standard anti-théâtre (phrases cash), rien à redire sur le ton.

## 3. SEO on-page
- Sans objet : page noindex, hors sitemap, robots-disallowed. Aucune valeur ni risque organique. La question SEO n'est pas « ranke-t-elle » mais « existe-t-elle pour une campagne ».
- Duplication frontale avec la page canonique indexée `/audit-ia-pme` (`src/pages/audit-ia-pme.astro`, HTTP 200) : même offre, même kw, même CTA. La LP n'apporte aucun angle de campagne distinct.

## 4. Maillage interne
- Inbound réels = 0. Les seules occurrences `/lp/audit-ia-pme` sont dans `src/lib/section-usage.generated.ts` (manifest généré, pas un lien). Page atteignable uniquement par URL directe / Ads.

## 5. Balisage
- noindex/follow + canonical self : cohérent pour une LP campagne. Pas de schema Service (inutile sur page noindex).

## 6. Conversion
- CTA hero `/contact?offer=audit-ia-pme&intent=audit`. Route `/contact` existante. Cohérent, mais l'offer id `audit-ia-pme` fige un slug déjà porté par la page canonique.

## 7. Verdict + actions
Verdict : **SUPPRIMER** (silo redondant, noindex, 0 inbound, jumelle canonique indexée existante).

1. **Vérifier d'abord une campagne Ads active** pointant `/lp/audit-ia-pme` (donnée hors repo). Si campagne live : re-pointer l'annonce vers `/audit-ia-pme` (jumelle indexée, même offre) avant suppression.
2. Ajouter la 301 `'/lp/audit-ia-pme': '/audit-ia-pme'` dans le bloc redirects `astro.config.mjs`.
3. Supprimer `src/content/lp/audit-ia-pme.json`.
4. Rebuild : le loader `lp` (`src/content.config.ts:285`) régénère `getStaticPaths` sans cette entrée ; vérifier build `Complete!`.
