/**
 * Avoid stale CDN/HTML caching on the team section so updated member data
 * is less likely to sit behind an old document shell after deploys.
 */
export const dynamic = "force-dynamic";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
