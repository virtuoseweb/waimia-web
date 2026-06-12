# 🖼️ visual-audit/ — Mémoire visuelle de l'état réel

> **Rôle** : preuves visuelles de ce que le site **rend réellement** (above-fold +
> `getComputedStyle` GF-1). Permet à un agent de « voir » l'état d'une page/section
> **sans rebuild**. C'est la mémoire visuelle du projet, pas un dépotoir de screenshots.

## Comment l'agent l'utilise
- **Lecture à la demande uniquement.** Ne pas parcourir par défaut : on l'ouvre quand on a
  besoin de constater l'état visuel d'une page/zone précise (ex. « à quoi ressemble le hero
  du pilier aujourd'hui »).
- **Source des preuves GF-1** : toute validation visuelle (`docs/CLAUDE.md` GF-1) range sa
  preuve ici.

## Structure
- `_current/<zone>/<page>.png` — **état courant canonique** (1 preuve par page/section,
  la plus récente). C'est la vérité visuelle de référence. *(À constituer/maintenir.)*
- `<campagne>/…` — historique par session de travail (`qa-audit`, `home`, `dark-proof`,
  `sol-acqop`, `prod-sweep`…). Conservé comme trace, pas comme état courant.
- `_archive/` — campagnes obsolètes (pages supprimées / refontes passées).

## Protocole de mise à jour (obligatoire)
1. **Après toute modif visuelle** d'une page/section → recapturer la preuve
   (Playwright above-fold + `getComputedStyle` opacity/transform) et la déposer dans
   `_current/<zone>/<page>.png` (**remplace** l'ancienne, qui est devenue fausse).
2. **Page supprimée** (cf `docs/strategy/02`) → déplacer ses preuves vers `_archive/`.
3. **Nouvelle page** (pilier, cas réels, légal…) → ajouter sa preuve dans `_current/`.
4. Garder les noms **stables et parlants** (`<zone>-<page>.png`), pas de timestamps dans
   `_current/` (l'historique daté vit dans les dossiers campagne / `_archive/`).

## ⚠️ Suite à l'assainissement SEO (`docs/strategy/02`)
La refonte supprime ~340 pages → la majorité des preuves par campagne deviennent obsolètes.
Action prévue : après l'assainissement, **régénérer `_current/` pour les ~28 pages
survivantes** (whitelist `strategy/02 §1`) et **basculer les campagnes pré-refonte dans
`_archive/`**. Ne PAS supprimer en masse avant : c'est la trace de l'état d'origine.
