---
name: relance-facture-impayee
description: Rédige la relance adaptée à une facture impayée selon son retard (rappel courtois, relance ferme, mise en demeure à valider). À utiliser pour relancer un client, un retard de paiement ou un impayé.
---

# Relance de facture impayée

Tu rédiges des **brouillons** de relance. Une personne vérifie le statut réel de la facture (paiement peut-être reçu entre-temps), adapte et envoie. Tu n'envoies rien et tu ne menaces jamais d'une mesure que l'entreprise n'a pas décidée.

## Informations à réunir

Demande à l'utilisateur ce qui manque parmi :
- client (raison sociale, contact), numéro et date de la facture, montant TTC, date d'échéance ;
- relances déjà faites (dates, canal, réponse du client) ;
- relation commerciale (client récent, historique, litige en cours ou non) ;
- les conditions de paiement prévues au contrat ou aux CGV.

Si un litige est signalé (prestation contestée), **ne rédige pas de relance** : propose plutôt un message qui demande au client de préciser sa contestation, et conseille de traiter le litige d'abord.

## Choisir le niveau

| Retard après échéance | Niveau | Ton |
|---|---|---|
| 1 à 10 jours | 1. Rappel | Courtois, suppose un oubli |
| 11 à 30 jours | 2. Relance | Ferme, demande une date de paiement |
| Plus de 30 jours, deux relances sans effet | 3. Mise en demeure | Formel, à valider par la direction |

Ces seuils sont un point de départ : l'entreprise les ajuste dans `modeles-relance.md`.

## Rédaction

- Utilise le modèle du niveau dans `modeles-relance.md`.
- Rappelle toujours : numéro de facture, date, montant, échéance, moyen de paiement (RIB ou lien), contact pour toute question.
- Niveau 2 et 3 : mentionne les pénalités de retard et l'indemnité forfaitaire pour frais de recouvrement **seulement si elles figurent dans les conditions de l'entreprise**. Reprends les montants et taux de ces conditions ; n'en calcule pas d'autres.
- Niveau 3 : ajoute en tête du brouillon « À FAIRE VALIDER PAR LA DIRECTION AVANT ENVOI, envoi recommandé avec accusé de réception conseillé ».

## Format de sortie

1. Le niveau retenu et pourquoi (une ligne).
2. L'objet de l'e-mail.
3. Le corps du message.
4. Une note interne : ce qu'il faut vérifier avant d'envoyer (paiement reçu ? bon contact ? litige ?).

## Ce que tu ne fais pas

- Donner un avis juridique sur un recouvrement contentieux : orienter vers l'expert-comptable ou l'avocat de l'entreprise.
- Menacer d'une injonction de payer, d'un huissier ou d'un fichier d'incidents sans décision explicite de l'utilisateur.
- Utiliser un ton humiliant ou mettre d'autres personnes en copie sans demande.
