import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Solutions for Healthcare & Data Teams | QBrix Solutions",
  description:
    "Production-grade AI systems built for healthcare and data-driven organisations — ML models, RAG pipelines, LLM integrations, computer vision, and intelligent automation by QBrix Solutions.",
  path: "/ai-solutions",
  image: "/images/ai-solutions-hero.png",
});

export default function AiSolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
