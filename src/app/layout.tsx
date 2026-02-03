import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "../components/Providers";
import "../lib/analytics"; // Import analytics to initialize performance monitoring

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QBrix Solutions - AI, ML, Computer Vision & Robotics Experts",
  description: "Leading software house specializing in AI, Machine Learning, Computer Vision, E-commerce, and Robotics & Automation solutions.",
  keywords: ["AI", "Machine Learning", "Computer Vision", "E-commerce", "Robotics", "Automation", "Software Development", "QBrix Solutions"],
  authors: [{ name: "QBrix Solutions" }],
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
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Chatbot />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
} 