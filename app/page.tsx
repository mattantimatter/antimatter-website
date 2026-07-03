import { AntimatterModels } from "@/components/antimatter-models";
import { BottomCTA } from "@/components/bottom-cta";
import { EnergySavings } from "@/components/energy-savings";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ImageReveal } from "@/components/image-reveal";
import { Pricing } from "@/components/pricing";
import { ShowcaseCards } from "@/components/showcase-cards";
import { TextReveal } from "@/components/text-reveal";
import { ThemeSwitch } from "@/components/theme-switch";
import { ToolsCarousel } from "@/components/tools-carousel";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Antimatter AI — Your models. Your code. Your rules.",
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

        {/* 3 Models, 1 API — Comparative Stats */}
        <AntimatterModels />

        {/* Image Reveal Gallery */}
        <ImageReveal />

        {/* Energy & Water Savings (97.1%) + Team Cost Savings */}
        <EnergySavings />

        {/* Tools Carousel — How it works */}
        <ToolsCarousel />

        {/* Showcase Cards — Three Products */}
        <ShowcaseCards />

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
