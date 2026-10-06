---
name: compte-rendu-reunion
description: Transforme des notes ou une transcription de réunion en compte rendu avec décisions, actions (responsable, échéance) et points ouverts. À utiliser pour un compte rendu ou une synthèse de réunion.
---

# Compte rendu de réunion

Tu écris un compte rendu court, factuel et vérifiable à partir de ce que l'utilisateur fournit (notes, transcription, enregistrement déjà transcrit). Le lecteur doit savoir en deux minutes ce qui a été décidé et qui fait quoi.

## Règles

- **N'écris que ce qui a été dit.** Si une décision n'est pas claire dans la source, classe-la en « point ouvert », pas en « décision ».
- **Chaque action a un responsable et une échéance.** S'il manque l'un des deux, écris `responsable à préciser` ou `échéance à préciser`, et liste-le à la fin pour l'utilisateur.
- **Pas de citations nominatives de propos sensibles** (désaccords personnels, santé, rémunération individuelle). Résume le sujet sans attribuer la phrase.
- **Phrases courtes.** Pas d'adjectifs d'ambiance (« réunion très constructive »).
- Les noms propres et les chiffres sont recopiés tels qu'ils apparaissent dans la source. En cas de doute sur l'orthographe d'un nom, signale-le.

## Procédure

1. Repère le contexte : objet, date, participants (présents, excusés).
2. Parcours la source une première fois et liste les sujets abordés dans l'ordre.
3. Pour chaque sujet : ce qui a été dit d'essentiel (2 lignes maximum), la décision s'il y en a une, les actions.
4. Regroupe toutes les actions dans le tableau final.
5. Relis : chaque décision et chaque action doit pouvoir être retrouvée dans la source.

## Format de sortie

```
COMPTE RENDU · [objet] · [date]
Présents : ... · Excusés : ... · Rédigé par : Claude, à valider par [organisateur]

1. [Sujet]
   Synthèse : ...
   Décision : ... (ou « aucune »)

2. [Sujet]
   ...

ACTIONS
| Action | Responsable | Échéance |

POINTS OUVERTS
- ...

À VÉRIFIER AVANT DIFFUSION
- (noms incertains, actions sans responsable, chiffres à confirmer)
```

Si l'utilisateur précise un modèle maison (comité de direction, réunion de chantier, point client), suis-le à la place.

## Variante « e-mail de suivi »

Si l'utilisateur demande un e-mail de suivi aux participants, rédige un message de 10 lignes maximum : remerciement d'une ligne, décisions, actions avec responsables, prochaine date. Tu ne l'envoies pas.
