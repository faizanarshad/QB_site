import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Team | QBrix Solutions",
  description:
    "Meet the QBrix Solutions team — AI/ML engineers, computer vision specialists, robotics engineers, and full-stack developers building production AI systems for global clients.",
  path: "/team",
  image: "/images/team-hero.png",
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
