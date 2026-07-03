"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface SavingsMetric {
  label: string;
  traditional: string;
  antimatter: string;
  savings: string;
}

const metrics: SavingsMetric[] = [
  {
    label: "Tokens per task",
    traditional: "~12,400",
    antimatter: "~360",
    savings: "97.1%",
  },
  {
    label: "Cost per 1M requests",
    traditional: "$18,600",
    antimatter: "$540",
    savings: "97.1%",
  },
  {
    label: "Energy (kWh / 1M requests)",
    traditional: "4,200 kWh",
    antimatter: "122 kWh",
    savings: "97.1%",
  },
  {
    label: "Water cooling (liters / 1M)",
    traditional: "2,100 L",
    antimatter: "61 L",
    savings: "97.1%",
  },
];

interface TeamSaving {
  teamSize: string;
  monthlySavings: string;
  annualSavings: string;
  tokensRecovered: string;
  description: string;
}

const teamSavings: TeamSaving[] = [
  {
    teamSize: "5-person startup",
    monthlySavings: "$2,400/mo",
    annualSavings: "$28,800/yr",
    tokensRecovered: "42M tokens",
    description:
      "Typical seed-stage team running 50K+ AI requests/month across coding, planning, and deployment.",
  },
  {
    teamSize: "20-person engineering org",
    monthlySavings: "$14,200/mo",
    annualSavings: "$170,400/yr",
    tokensRecovered: "186M tokens",
    description:
      "Mid-size team with heavy agent usage, multi-repo orchestration, and CI/CD AI integration.",
  },
  {
    teamSize: "100+ enterprise",
    monthlySavings: "$89,000/mo",
    annualSavings: "$1.07M/yr",
    tokensRecovered: "1.2B tokens",
    description:
      "Large org with thousands of daily AI tasks across development, infrastructure, and operations.",
  },
];

function SavingsRing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      <div className="relative h-56 w-56">
        {/* Background ring */}
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 42}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={
              isInView
                ? { strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.971) }
                : { strokeDashoffset: 2 * Math.PI * 42 }
            }
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            97.1%
          </motion.span>
          <span className="text-sm text-muted-foreground">Token Savings</span>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        At frontier-equivalent capability
      </p>
    </div>
  );
}

function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-xl border border-border/50"
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-muted/20">
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Metric
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Traditional AI
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Antimatter
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Savings
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr
              key={metric.label}
              className={
                index < metrics.length - 1 ? "border-b border-border/30" : ""
              }
            >
              <td className="px-6 py-4 font-medium text-foreground">
                {metric.label}
              </td>
              <td className="px-6 py-4 text-muted-foreground line-through decoration-muted-foreground/40">
                {metric.traditional}
              </td>
              <td className="px-6 py-4 font-semibold text-[#10B981]">
                {metric.antimatter}
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-[#10B981]/10 px-2.5 py-1 text-xs font-semibold text-[#10B981]">
                  {metric.savings}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function TeamSavingsCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-3">
      {teamSavings.map((team, index) => (
        <motion.div
          key={team.teamSize}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="rounded-2xl border border-border/50 bg-card p-8"
        >
          <p className="text-sm font-medium text-muted-foreground">
            {team.teamSize}
          </p>
          <p className="mt-3 text-3xl font-bold text-foreground">
            {team.monthlySavings}
          </p>
          <p className="text-sm text-muted-foreground">saved monthly</p>

          <div className="mt-6 space-y-3 border-t border-border/50 pt-6">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Annual</span>
              <span className="text-sm font-semibold text-foreground">
                {team.annualSavings}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Tokens recovered
              </span>
              <span className="text-sm font-semibold text-[#10B981]">
                {team.tokensRecovered}
              </span>
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            {team.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export function EnergySavings(): ReactNode {
  return (
    <section id="savings" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#10B981]/10 px-4 py-1.5 text-sm font-medium text-[#10B981]">
            Energy &amp; Water Efficiency
          </span>
        </div>
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            97.1% token savings.
            <br />
            <span className="text-muted-foreground">
              Frontier capability preserved.
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Antimatter&apos;s orchestration eliminates redundant computation.
            The same quality output with 97% fewer tokens means dramatically
            lower costs, energy consumption, and water usage for cooling.
          </p>
        </div>

        {/* Ring + Table */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <SavingsRing />
          <ComparisonTable />
        </div>

        {/* Team Savings */}
        <div className="mt-20">
          <h3 className="mb-8 text-2xl font-semibold text-foreground">
            What this means for your team
          </h3>
          <TeamSavingsCards />
        </div>
      </div>
    </section>
  );
}
