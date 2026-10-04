type Json = Record<string, any>;

export interface SiteIdentity {
  url: string;
  name: string;
  organizationId: string;
  founderId: string;
  founderName: string;
  founderUrl: string;
  /** Profils du fondateur ailleurs sur le web (LinkedIn). */
  founderSameAs?: string[];
  logoUrl: string;
  areaServed: Json[];
}

export interface PageContext {
  canonicalUrl: string;
  ogImage?: string;
  lastmod?: string | null;
  lang?: string;
}

export function typesOf(node: Json): string[];
export function normalizeNode(node: Json, ctx: PageContext, site: SiteIdentity): Json;
export function repairBreadcrumb(
  block: Json,
  resolveUrl: (name: string, index: number) => string | null,
  currentUrl?: string,
): Json | null;
