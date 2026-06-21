import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI & ML Services | QBrix Solutions",
  description:
    "Explore QBrix Solutions' full service catalog: AI development, RAG & LLM integration, computer vision, NLP, business automation, robotics, and data analytics for healthcare and enterprise.",
  path: "/services",
  image: "/images/ai-solutions-hero.png",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
