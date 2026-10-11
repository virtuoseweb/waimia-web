// Liens absolus partagés par le rapport PDF et les e-mails des outils.
import { SITE } from '../../site.config';
import { AUDIT_BOOKING_HREF } from '../../data/conversion';

/** Prise de rendez-vous de l'audit, ancrée sur le bloc agenda de /contact (#rdv). */
export const AUDIT_RDV_URL = `${SITE.url}${AUDIT_BOOKING_HREF}#rdv`;
