import type { MetadataRoute } from "next";
import { getAllPortfolioSlugs } from "@/data/portfolioProjects";
import { getAllTeamSlugs } from "@/data/teamMembers";

const BASE = "https://www.qbrixsolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                         changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/services`,           changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai-solutions`,       changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`,          changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,               changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/team`,               changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/career`,             changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/contact`,            changeFrequency: "yearly",  priority: 0.6 },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  const portfolioRoutes: MetadataRoute.Sitemap = getAllPortfolioSlugs().map((slug) => ({
    url: `${BASE}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const teamRoutes: MetadataRoute.Sitemap = getAllTeamSlugs().map((slug) => ({
    url: `${BASE}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...teamRoutes];
}
