---
route: /cas-clients/isabelle-diaz-naturopathe
verdict: AMÉLIORER
title_actuel: "Isabelle Diaz, naturopathe : une présence en ligne pensée pour la prise de rendez-vous · Waimia"
kw_cible: "site naturopathe / présence en ligne praticien santé (long tail)"
date: 2026-07-16
---

# /cas-clients/isabelle-diaz-naturopathe — AMÉLIORER

Source : `src/content/cases/isabelle-diaz-naturopathe.mdx` (9 Ko, la plus courte) · rendu legacy `CaseStudyTemplate`.

## 1. Identité
- Title `:2` : « Isabelle Diaz, naturopathe : une présence en ligne pensée pour la prise de rendez-vous ». kw-first correct.
- `card.order: 5`, `duration: "En cours"`. Rôle : diversité secteur santé/bien-être.

## 2. Contenu / E-E-A-T
- **Cas le plus faible du portefeuille (avec amploi), assumé « en cours ».** Aucun `metrics`, aucun `shifts`, aucun `showcase` (site hors ligne, confirmé : 0 `sshow` en HTML), aucun `pullQuote`. `contextStats` (`:37-45`) purement qualitatifs (« Bien-être » / « En cours » / « RDV »).
- La page est **honnête** : `:229` « Nous publierons les chiffres quand ils seront vérifiés… pas de résultat annoncé avant d'être mesuré » — cohérent avec la doctrine.
- **Mais** : sans preuve chiffrée NI capture, la fiche reste au niveau « brochure d'intention ». Elle ne tient pas la comparaison avec balzeo / les-carnets / desangles, et alimente la sur-promesse « résultats mesurés » du hub (cf `_index.md` action 2).
- Question mission (« la page reste-t-elle au niveau des autres ? ») : **non**, aujourd'hui elle est nettement en dessous.

## 3. SEO on-page
- H1 = `title_fr` kw-first. Hn corrects. Contenu unique (pas de dup), mais mince en profondeur/preuve.

## 4. Maillage interne
- Entrant : nav uniquement (aucun `caseRef` secteur santé/thérapeutes ne la pointe — vérifié : seuls e-commerce/liberal/startup-logiciel ont un caseRef). Le secteur `/secteurs/therapeutes` existe (référencé depuis les cas-usages) mais ne référence pas ce cas.
- Sortants in-body : néant vers services/secteurs (dette mesh commune).

## 5. Balisage
- `Article` + `BreadcrumbList` (miroir template). Canonical `.../isabelle-diaz-naturopathe`. Conforme.

## 6. Conversion
- CTA chrome cohérents (`/contact`, `/audit-*`). Pas de pricing.

## 7. Verdict + actions
**AMÉLIORER** (ne pas supprimer : client first-party réel, apporte la diversité secteur santé).
1. **Lever la sur-promesse au niveau hub** : soit sortir isabelle du décompte « résultats mesurés » (reformuler le lede hub, cf `_index.md` action 2), soit ajouter le premier signal disponible dès qu'il existe (nb de RDV pris, mise en ligne effective, capture du site une fois publié).
2. Ajouter un `caseRef: "isabelle-diaz-naturopathe"` sur `/secteurs/therapeutes` (ou secteur santé) pour créer l'entrant et justifier la page dans un silo.
3. Dès que le site est en ligne : ajouter un `showcase` avec capture réelle (aligner sur balzeo/amploi/desangles), et remplacer les `contextStats` qualitatifs par des mesures.
4. Si la mission reste « en cours » > 3 mois sans livrable public mesurable, envisager `noindex` temporaire (`seo.noindex`) jusqu'à disponibilité des chiffres, plutôt que de laisser une fiche sans preuve indexée.
