"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Logo {
  name: string;
  src: string;
  href: string;
}

const logosSetA: Logo[] = [
  { name: "Ollama", src: "/mock-logos/acmecorp.svg", href: "#ollama" },
  { name: "HuggingFace", src: "/mock-logos/boltshift.svg", href: "#huggingface" },
  { name: "OpenAI", src: "/mock-logos/capsule.svg", href: "#openai" },
  { name: "Anthropic", src: "/mock-logos/catalog.svg", href: "#anthropic" },
  { name: "Vercel", src: "/mock-logos/cloudwatch.svg", href: "#vercel" },
  { name: "Supabase", src: "/mock-logos/featherdev.svg", href: "#supabase" },
];

const logosSetB: Logo[] = [
  { name: "DeepSeek", src: "/mock-logos/altshift.svg", href: "#deepseek" },
  { name: "Google Gemini", src: "/mock-logos/biosynthesis.svg", href: "#gemini" },
  { name: "GitHub", src: "/mock-logos/commandr.svg", href: "#github" },
  { name: "Linear", src: "/mock-logos/epicurious.svg", href: "#linear" },
  { name: "Docker", src: "/mock-logos/focalpoint.svg", href: "#docker" },
  { name: "VS Code", src: "/mock-logos/galileo.svg", href: "#vscode" },
];

function LogoCell({ logoA, logoB, index }: { logoA: Logo; logoB: Logo; index: number }): ReactNode {
  const [showSecond, setShowSecond] = useState(false);
  const activeLogo = showSecond ? logoB : logoA;

  const scheduleSwap = useCallback(() => {
    const baseDelay = 3000 + Math.random() * 4000;
    const staggerDelay = index * 300;
    return setTimeout(() => {
      setShowSecond((prev) => !prev);
    }, baseDelay + staggerDelay);
  }, [index]);

  useEffect(() => {
    let timeout = scheduleSwap();
    const interval = setInterval(() => {
      clearTimeout(timeout);
      timeout = scheduleSwap();
    }, 7000 + Math.random() * 3000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [scheduleSwap]);

  return (
    <Link
      href={activeLogo.href}
      className="relative flex h-24 items-center justify-center rounded-xl bg-muted/50 px-6 transition-colors hover:bg-muted focus-ring overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={showSecond ? "b" : "a"}
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Image
            src={activeLogo.src}
            alt={activeLogo.name}
            width={120}
            height={40}
            className="h-8 w-auto object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert"
          />
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}

export function TrustedBy(): ReactNode {
  return (
    <section className="py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-85rem)/2+2rem))]">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Trusted by teams who ship faster with Antimatter
          </h2>
          <Link
            href="#"
            className="group flex shrink-0 items-center leading-0 gap-2 text-xl font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
          {logosSetA.map((logoA, index) => (
            <LogoCell
              key={logoA.name}
              logoA={logoA}
              logoB={logosSetB[index] ?? logoA}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
