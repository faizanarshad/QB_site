import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import AnimatedHero from "@/components/AnimatedHero";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "QBrix Solutions | Production-Grade AI Systems",
  description:
    "QBrix Solutions is an Upwork Top Rated AI engineering team delivering RAG pipelines, LLM integrations, computer vision, and enterprise AI systems for healthcare, e-commerce, and data-driven organisations.",
  path: "/",
  image: "/images/ai-solutions-hero.png",
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="py-20" />,
});
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="py-20" />,
});
const ImageExample = dynamic(() => import("@/components/ImageExample"), {
  loading: () => <div className="py-20" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="py-12" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AnimatedHero
        headline="Production-Grade AI Systems"
        subheadline="RAG pipelines, LLM integrations, computer vision & healthcare analytics"
        description="QBrix Solutions is an Upwork Top Rated AI engineering team delivering enterprise-ready AI systems that power business transformation."
        showBrand={false}
        primaryAction={{
          text: "Explore Our Services",
          href: "/services"
        }}
        secondaryAction={{
          text: "Get In Touch",
          href: "/contact"
        }}
      />
      <About />
      <Features />
      <ImageExample />
      <Footer />
    </main>
  );
} 