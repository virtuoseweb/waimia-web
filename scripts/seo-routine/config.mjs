/**
 * Configuration de la routine SEO/GEO hebdomadaire (voir docs/seo/ROUTINE.md).
 * Aucune valeur secrète ici : le seul secret est GSC_SERVICE_ACCOUNT_JSON (variable d'environnement).
 */
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

export const ROOT = join(HERE, '..', '..');
export const SEO_DIR = join(ROOT, 'docs', 'seo');
/** SEO_DATA_DIR permet d'écrire ailleurs (essai local) sans toucher aux données versionnées. */
export const DATA_DIR = process.env.SEO_DATA_DIR ? resolve(process.env.SEO_DATA_DIR) : join(SEO_DIR, 'data');
export const STATE_DIR = join(DATA_DIR, 'state');

export const SITE_ORIGIN = 'https://waimia.com';
export const SITE_HOST = 'waimia.com';
export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap-index.xml`;

/** Propriété Search Console (propriété de domaine). */
export const GSC_SITE_URL = 'sc-domain:waimia.com';
export const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters';

/**
 * Clé IndexNow : ce n'est PAS un secret. Le protocole exige qu'elle soit publiée dans un
 * fichier texte à la racine du site (public/<clé>.txt), c'est la preuve de propriété.
 */
export const INDEXNOW_KEY = '34c4e7bcd4aa2c942247305687c341d9';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Indexing API de Google (urlNotifications). Même compte de service que Search Console, autre
 * portée OAuth. Quota par défaut : 200 requêtes « publish » par jour et par projet Google Cloud
 * (le projet est partagé avec virtuoseweb.fr, d'où INDEXING_DAILY_CAP pour baisser le plafond).
 */
export const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';
export const INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3';
export const INDEXING_DAILY_LIMIT = 200;
export const INDEXING_DAILY_CAP = Math.min(INDEXING_DAILY_LIMIT, Math.max(0, Number(process.env.INDEXING_DAILY_CAP ?? INDEXING_DAILY_LIMIT) || 0));
export const INDEXING_DELAY_MS = 500;

export const USER_AGENT = 'Mozilla/5.0 (compatible; WaimiaSeoRoutine/1.0; +https://waimia.com)';

/** Quotas URL Inspection API (par propriété) : 2 000 par jour, 600 par minute. On reste en dessous. */
export const INSPECTION_DAILY_CAP = 1800;
export const INSPECTION_PER_MINUTE = 300;

/** Search Console publie ses données avec deux à trois jours de retard : on s'arrête à J-3. */
export const GSC_DATA_LAG_DAYS = 3;

/** Seuils d'analyse (heuristiques, ajustables). */
export const THRESHOLDS = {
  strikingMin: 8,
  strikingMax: 20,
  strikingMinImpressions: 5,
  lowCtrMinImpressions: 30,
  lowCtrRatio: 0.5,
  feedWindowDays: 8,
  feedMaxPerSource: 15,
  competitorMaxPageFetch: 10,
};
