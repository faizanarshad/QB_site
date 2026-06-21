import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DeferredChatbot from "../components/DeferredChatbot";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "../components/Providers";
import "../lib/analytics"; // Import analytics to initialize performance monitoring
import { absoluteUrl, getSiteUrl } from "../lib/siteUrl";
import { DEFAULT_OG_IMAGE } from "../lib/metadata";

const inter = Inter({ subsets: ["latin"] });

const siteTitle = "QBrix Solutions | Production-Grade AI Systems";
const siteDescription =
  "QBrix Solutions is an Upwork Top Rated AI engineering team delivering RAG pipelines, LLM integrations, computer vision, and enterprise AI systems for healthcare and data-driven organisations.";
const ogImageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.qbrixsolutions.com/#organization",
      name: "QBrix Solutions",
      url: "https://www.qbrixsolutions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.qbrixsolutions.com/images/qbrix-logo.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-339-4101341",
        email: "support@qbrixsolutions.com",
        contactType: "customer service",
        availableLanguage: "English",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "3rd Floor Gulberg Emporium, Business Square",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      description:
        "QBrix Solutions is an AI/ML engineering company specialising in RAG pipelines, LLM integrations, computer vision, and enterprise AI systems.",
      sameAs: [
        "https://www.linkedin.com/in/mfaizanarshad/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.qbrixsolutions.com/#website",
      url: "https://www.qbrixsolutions.com",
      name: "QBrix Solutions",
      publisher: { "@id": "https://www.qbrixsolutions.com/#organization" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: siteTitle,
  description: siteDescription,
  keywords: ["AI", "Machine Learning", "Computer Vision", "E-commerce", "Robotics", "Automation", "Software Development", "QBrix Solutions"],
  authors: [{ name: "QBrix Solutions" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: absoluteUrl("/"),
    siteName: "QBrix Solutions",
    type: "website",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <DeferredChatbot />
        </Providers>
        {process.env.NODE_ENV === "production" ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
