import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact QBrix Solutions | Start Your AI Project",
  description:
    "Get in touch with QBrix Solutions. Email support@qbrixsolutions.com, call +92 339 4101341, or fill in the form to discuss your AI, ML, or automation project.",
  path: "/contact",
  image: "/images/contact-hero.png",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
