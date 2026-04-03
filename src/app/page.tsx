"use client";

import React from "react";
import Header from "@/components/Header";
import AnimatedHero from "@/components/AnimatedHero";
import dynamic from "next/dynamic";

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
        headline="Innovative AI Solutions"
        subheadline="Transforming Business Through Technology"
        description="We deliver cutting-edge AI and machine learning solutions that drive growth, efficiency, and competitive advantage for forward-thinking businesses."
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