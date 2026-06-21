import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers at QBrix Solutions | Join Our AI Team",
  description:
    "Join QBrix Solutions and build production AI systems. We're hiring AI/ML engineers, computer vision specialists, and full-stack developers. Remote-friendly, Islamabad-based.",
  path: "/career",
  image: "/images/join_our_team.jpg",
});

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
