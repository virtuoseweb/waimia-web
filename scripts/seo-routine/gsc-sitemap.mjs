/**
 * Search Console · API Sitemaps : resoumission du sitemap (sitemaps.submit) puis lecture de
 * son état (sitemaps.get). C'est, avec l'inspection, le socle de l'indexation : la voie que
 * Google documente pour des pages ordinaires. Les notifications de indexing-api.mjs s'y ajoutent,
 * sans garantie (voir docs/seo/SETUP.md).
 *
 * Usage direct : `node scripts/seo-routine/gsc-sitemap.mjs [--dry-run]`.
 */
import { SITEMAP_URL } from './config.mjs';
import { gscFetch, siteParam, NotConfiguredError, isConfigured } from './gsc-auth.mjs';
import { isMain } from './lib/util.mjs';

export async function submitSitemap({ dryRun = false } = {}) {
  if (!isConfigured()) throw new NotConfiguredError();
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${siteParam()}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  let submitted = false;
  let submitError = null;
  if (!dryRun) {
    try {
      await gscFetch(endpoint, { method: 'PUT' });
      submitted = true;
    } catch (err) {
      submitError = err.message;
    }
  }
  const s = await gscFetch(endpoint);
  return {
    generatedAt: new Date().toISOString(),
    sitemap: SITEMAP_URL,
    submitted,
    submitError,
    dryRun,
    status: {
      lastSubmitted: s.lastSubmitted ?? null,
      lastDownloaded: s.lastDownloaded ?? null,
      isPending: s.isPending ?? null,
      isSitemapsIndex: s.isSitemapsIndex ?? null,
      errors: Number(s.errors ?? 0),
      warnings: Number(s.warnings ?? 0),
      contents: (s.contents ?? []).map((c) => ({ type: c.type, submitted: Number(c.submitted ?? 0) })),
    },
  };
}

if (isMain(import.meta.url)) {
  try {
    console.log(JSON.stringify(await submitSitemap({ dryRun: process.argv.includes('--dry-run') }), null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(err.notConfigured ? 2 : 1);
  }
}
