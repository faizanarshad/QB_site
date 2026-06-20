/** Canonical production origin for metadata, OG tags, and sitemaps. */
export const PRODUCTION_SITE_URL = "https://www.qbrixsolutions.com";

/** Public site origin; never returns a *.vercel.app host for social/meta tags. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured && !configured.includes(".vercel.app")) {
    return configured;
  }
  return PRODUCTION_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, getSiteUrl()).href;
}
