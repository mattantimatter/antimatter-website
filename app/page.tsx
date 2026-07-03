import { AntimatterModels } from "@/components/antimatter-models";
import { BottomCTA } from "@/components/bottom-cta";
import { EnergySavings } from "@/components/energy-savings";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks2 } from "@/components/blocks/how-it-works-2";
import { Pricing } from "@/components/pricing";
import { TextReveal } from "@/components/text-reveal";
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

        {/* Text Reveal Section */}
        <section className="relative py-32 md:py-48">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <TextReveal
              text="Run any model. Own your data. Ship faster than you thought possible."
              className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            />
          </div>
        </section>

        {/* Three Products — How It Works */}
        <HowItWorks2 />

        {/* 3 Models, 1 API — Comparative Stats */}
        <AntimatterModels />

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
