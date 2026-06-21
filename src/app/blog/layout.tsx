import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI & Tech Blog | QBrix Solutions",
  description:
    "Insights, tutorials, and expert perspectives on AI, machine learning, computer vision, RAG systems, and enterprise automation from the QBrix Solutions engineering team.",
  path: "/blog",
  image: "/images/ai.jpg",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
