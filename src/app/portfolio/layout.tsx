import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio | QBrix Solutions",
  description:
    "Explore QBrix Solutions project work across healthcare BI, voice AI, RAG, analytics, and automation — with measurable outcomes.",
  path: "/portfolio",
  image: "/images/data_visualization.webp",
});

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
