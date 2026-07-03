"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const cards = [
  {
    number: 1,
    title: "Antimatter IDE",
    link: "Download now",
    linkHref: "#download",
    items: [
      "Local-first AI coding",
      "Run any model on-device",
      "VS Code extension support",
      "Multi-repo workspaces",
    ],
    image: "/images/screens/settings.png",
  },
  {
    number: 2,
    title: "Agent Orchestration",
    link: "Learn more",
    linkHref: "#models",
    items: [
      "Multi-agent task planning",
      "Parallel repo operations",
      "Autonomous deployments",
      "Real-time collaboration",
    ],
    image: "/images/screens/agent-deploy.png",
  },
  {
    number: 3,
    title: "Antimatter Models",
    link: "View benchmarks",
    linkHref: "#models",
    items: [
      "Single API, three models",
      "Giga — deep reasoning",
      "Nano — fast completions",
      "Router — intelligent routing",
    ],
    image: "/images/screens/setup-step3.png",
  },
];

export function HowItWorks2() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="products"
      className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background"
      aria-label="Products"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-10 sm:mb-12 lg:mb-16"
        >
          Three products. One platform.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 sm:mb-12 lg:mb-16">
          {cards.map((card, idx) => (
            <motion.article
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-muted/50 border border-foreground/10 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] flex flex-col cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.number)}
              onMouseLeave={() => setHoveredCard(null)}
              aria-label={`${card.title}`}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: hoveredCard === card.number ? 1 : 0,
                  scale: hoveredCard === card.number ? 1 : 1.1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === card.number ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              <div className="relative z-10 flex flex-col h-full pt-6 sm:pt-8 px-6 sm:px-8">
                <div className="flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 transition-colors duration-300 ${
                      hoveredCard === card.number
                        ? "bg-white text-neutral-900"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {card.number}
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-tight mb-2 transition-colors duration-300 ${
                      hoveredCard === card.number
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {card.title}
                  </h3>

                  <a
                    href={card.linkHref}
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 group ${
                      hoveredCard === card.number
                        ? "text-white/90 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {card.link}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>

                <div className="mt-auto -mx-6 sm:-mx-8">
                  {card.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`py-3 px-6 border-t transition-colors duration-300 ${
                        hoveredCard === card.number
                          ? "border-white/20 text-white/90"
                          : "border-foreground/10 text-muted-foreground"
                      }`}
                    >
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <span className="text-sm sm:text-base">
              Start building today. Download the IDE and ship in under 5 minutes.
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
