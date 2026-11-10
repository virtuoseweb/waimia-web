# Mesure des leads par canal

Le canal est déduit côté serveur (`deriveCanal`, `src/lib/lead-source.ts`) et figure dans l'alerte interne, l'étiquette Resend `canal` et la ligne de journal Vercel. Les UTM priment sur le référent.

## Paramètres UTM à poser dans chaque lien

| Canal | utm_source | utm_medium | Indicateur |
| --- | --- | --- | --- |
| linkedin | linkedin | social | demandes par publication (`utm_content`) |
| email-froid | nom de la liste | email | réponses et demandes par séquence (`utm_campaign`) |
| coworking | coworking-<ville> | qr ou affiche | demandes par lieu |
| annuaire | annuaire-<nom> | annuaire | demandes par fiche |
| partenaire | <partenaire> | partenaire | demandes par partenaire |
| organique | (aucun) | (aucun) | demandes dont le référent est un moteur ou un assistant IA |
| direct | (aucun) | (aucun) | demandes sans référent |
| inconnu | autre | autre | à réduire : tout lien posé doit porter ses UTM |

Exemple : `https://waimia.com/contact?utm_source=linkedin&utm_medium=social&utm_campaign=lancement&utm_content=post-1`

## Lire les résultats

- Demandes : journaux Vercel, champ `canal` des actions `contact_submitted`, `lead_magnet_delivered`, `newsletter_signup`, `devis_submitted`.
- Visites par canal : Vercel Web Analytics, filtre sur le paramètre `utm_source`.
- Conversion = demandes du canal divisées par visites du canal.
- Limite : la provenance vit en mémoire pendant la visite, une visite rouverte plus tard compte en `direct`.

## Parcours et conversions (ajout du 10 novembre 2026)

- Chaque demande porte aussi le **parcours de la visite** : pages vues dans l'ordre, 20 au plus (ligne « Parcours » de l'alerte, champs `pages` et `path` du journal, `metadata[path]` chez Cal).
- **Événements Vercel Web Analytics** émis au succès : `contact_submitted`, `newsletter_signup`, `lead_magnet_requested`, `rdv_booked` (réservation Cal confirmée), avec `page`, `landing` et `utm_source`. L'onglet UTM de Vercel demande l'option payante Plus, non retenue : les UTM se lisent dans les alertes et Resend.
- **Référent de spam** : `aocr.org` figure dans la liste Matomo des référents spammeurs (vérifié le 10/11/2026). L'exclure de toute lecture de Vercel Analytics : il gonflait les visites et la page `/404` début novembre.
- Parcours et entonnoirs de tous les visiteurs (pas seulement ceux qui convertissent) : Umami Cloud, offre gratuite (100 000 événements par mois), sans cookie, à brancher une fois le compte créé par Simon.
