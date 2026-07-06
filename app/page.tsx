import { BottomCTA } from "@/components/bottom-cta";
import { EnergySavings } from "@/components/energy-savings";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { ThemeSwitch } from "@/components/theme-switch";
import { ToolsCarousel } from "@/components/tools-carousel";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Antimatter AI — The Agentic Coding Company",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <main id="main-content" className="flex-1">
        <Hero />

        {/* Energy & Water Savings (97.1%) + Team Cost Savings */}
        <EnergySavings />

        {/* Tools Carousel — Setup Steps */}
        <ToolsCarousel />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />

        {/* Download CTA */}
        <BottomCTA />
      </main>

      <Footer />
    </>
  );
}
