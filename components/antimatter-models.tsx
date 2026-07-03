"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface Model {
  name: string;
  description: string;
  score: number;
  context: string;
  speed: string;
  specialty: string;
  badge?: string;
}

const antimatterModels: Model[] = [
  {
    name: "Antimatter Router",
    description:
      "Automatically routes to the highest-performing model for each task. One API, always the best result.",
    score: 94.1,
    context: "200K tokens",
    speed: "92 tok/s",
    specialty: "Adaptive routing",
    badge: "Flagship",
  },
  {
    name: "Antimatter Coder",
    description:
      "Purpose-built for code generation, refactoring, and multi-file edits. Outperforms GPT-4o on SWE-bench.",
    score: 91.7,
    context: "128K tokens",
    speed: "118 tok/s",
    specialty: "Code generation",
  },
  {
    name: "Antimatter Reason",
    description:
      "Deep reasoning and planning model for complex multi-step tasks, architecture decisions, and agent orchestration.",
    score: 89.4,
    context: "256K tokens",
    speed: "64 tok/s",
    specialty: "Chain-of-thought",
  },
];

interface Competitor {
  name: string;
  score: number;
  isAntimatter?: boolean;
}

const comparisons: Competitor[] = [
  { name: "Antimatter Router", score: 94.1, isAntimatter: true },
  { name: "GPT-4o", score: 80.5 },
  { name: "Claude 3.5 Sonnet", score: 82.3 },
  { name: "Meta Llama 3.1 405B", score: 80.4 },
  { name: "DeepSeek V3", score: 78.9 },
];

function ModelCard({ model, index }: { model: Model; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8"
    >
      {model.badge && (
        <span className="absolute right-4 top-4 rounded-full bg-[#6366F1]/10 px-3 py-1 text-xs font-medium text-[#6366F1]">
          {model.badge}
        </span>
      )}
      <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {model.description}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border/50 pt-6">
        <div>
          <p className="text-xs text-muted-foreground">Benchmark</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {model.score}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Context</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {model.context}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Speed</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {model.speed}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const maxScore = Math.max(...comparisons.map((c) => c.score));

  return (
    <div ref={ref} className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">
        Composite Benchmark (HumanEval + SWE-bench + MMLU)
      </h3>
      <div className="space-y-3">
        {comparisons.map((competitor, index) => {
          const percentage = (competitor.score / maxScore) * 100;
          return (
            <div key={competitor.name} className="flex items-center gap-4">
              <div className="w-44 shrink-0">
                <span
                  className={`text-sm ${
                    competitor.isAntimatter
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {competitor.name}
                </span>
              </div>
              <div className="flex flex-1 items-center gap-0">
                <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-muted/30">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-md ${
                      competitor.isAntimatter
                        ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                        : "bg-muted/60"
                    }`}
                    initial={{ width: 0 }}
                    animate={
                      isInView ? { width: `${percentage}%` } : { width: 0 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
                <div className="w-14 shrink-0 pl-3 text-right">
                  <motion.span
                    className={`text-sm font-mono tabular-nums ${
                      competitor.isAntimatter
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    {competitor.score}
                  </motion.span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AntimatterModels(): ReactNode {
  return (
    <section id="models" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#6366F1]/10 px-4 py-1.5 text-sm font-medium text-[#6366F1]">
            3 Models &middot; 1 API &middot; Antimatter Orchestration
          </span>
        </div>
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Three models. One unified API.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Antimatter Orchestration automatically routes every request to the
            optimal model — no configuration, no switching, no wasted tokens.
            Frontier capability at a fraction of the cost.
          </p>
        </div>

        {/* Model Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {antimatterModels.map((model, index) => (
            <ModelCard key={model.name} model={model} index={index} />
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="mt-16 rounded-2xl border border-border/50 bg-card p-8">
          <ComparisonChart />
        </div>
      </div>
    </section>
  );
}
