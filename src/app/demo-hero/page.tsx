"use client";

import React from "react";
import AnimatedHero from "@/components/AnimatedHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DemoHeroPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <AnimatedHero
        headline="Unleash the Power of AI"
        subheadline="Next-Gen Solutions for Modern Businesses"
        description="Experience the future of technology with QBrik Solutions. Our AI-driven platforms, automation, and digital expertise help you innovate, scale, and lead your industry."
        primaryAction={{
          text: "Get Started",
          onClick: () => alert("Let's get started!")
        }}
        secondaryAction={{
          text: "See Our Work",
          onClick: () => alert("Portfolio coming soon!")
        }}
        illustrationUrl="/images/hero/home.webp"
        showBrand={true}
      />
      <Footer />
    </div>
  );
};

export default DemoHeroPage; 