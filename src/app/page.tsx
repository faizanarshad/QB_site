"use client";

import React from "react";
import Header from "@/components/Header";
import AnimatedHero from "@/components/AnimatedHero";
import About from "@/components/About";
import Features from "@/components/Features";
import ImageExample from "@/components/ImageExample";
import Footer from "@/components/Footer";

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