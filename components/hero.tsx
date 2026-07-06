"use client";

import { motion, AnimatePresence } from "motion/react";
import { Download, Apple, Monitor } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

/* ─── IDE Mockup Data ─── */

type IDEMode = "agent" | "plan" | "preview";

interface AgentStep {
  action: string;
  detail: string;
  delay: number;
}

const agentSteps: AgentStep[] = [
  { action: "Thought", detail: "I'll scaffold a Next.js app with the Antimatter design system.", delay: 800 },
  { action: "Read", detail: "package.json", delay: 1200 },
  { action: "Read", detail: "tailwind.config.ts", delay: 1800 },
  { action: "Searched", detail: "component patterns", delay: 2400 },
  { action: "Created", detail: "app/page.tsx  +84 -0", delay: 3200 },
  { action: "Created", detail: "components/hero.tsx  +52 -0", delay: 4000 },
  { action: "Updated", detail: "app/globals.css  +12 -3", delay: 4800 },
  { action: "Done", detail: "Build successful. 280ms first paint.", delay: 5600 },
];

const sidebarItems = [
  { name: "Build Landing Page", status: "now", detail: "Done. Fonts preload in the he..." },
  { name: "Refactor Auth Flow", status: "now", detail: "Migrated to OAuth 2.1 with..." },
  { name: "Plan Mission Control", status: "now", detail: "+20 -3 · Drafted implementati..." },
  { name: "PyTorch Experiments", status: "10m", detail: "PyTorch MNIST Experiments" },
  { name: "Set up Cursor Rules", status: "30m", detail: "Set up Cursor Rules for Dashb..." },
  { name: "Deploy to Vercel", status: "45m", detail: "+135 -21 · Production deploy" },
];

const planContent = {
  title: "Mission Control Interface",
  description: "A grid view of all open windows as scaled previews, allowing quick selection to bring any window to front.",
  tasks: [
    "Add multiplayer mode to useAppStore.ts",
    "Create a new MissionControlView.tsx component",
    "Update AppManager.tsx to apply expose modes",
  ],
};

const previewContent = {
  url: "http://localhost:3000",
  title: "Antimatter AI",
  sections: [
    { year: "2026", name: "Secure codebase indexing", status: "Published" },
    { year: "2026", name: "Semantic search", status: "Published" },
    { year: "2025", name: "Reinforcement learning", status: "Published" },
    { year: "2024", name: "Shadow workspaces", status: "Published" },
    { year: "2024", name: "Multi-agent collaboration", status: "Published" },
  ],
};

/* ─── IDE Component ─── */

function IDEMockup() {
  const [mode, setMode] = useState<IDEMode>("agent");
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const timers: NodeJS.Timeout[] = [];
    agentSteps.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setVisibleSteps(idx + 1);
      }, step.delay);
      timers.push(timer);
    });
    const doneTimer = setTimeout(() => setIsAnimating(false), 6200);
    timers.push(doneTimer);
    return () => timers.forEach(clearTimeout);
  }, [isAnimating]);

  const handleModeChange = (newMode: IDEMode) => {
    setMode(newMode);
    if (newMode === "agent") {
      setVisibleSteps(0);
      setIsAnimating(true);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 shadow-2xl dark:border-neutral-700">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-neutral-600" />
          <div className="h-3 w-3 rounded-full bg-neutral-600" />
          <div className="h-3 w-3 rounded-full bg-neutral-600" />
        </div>
        <span className="text-xs text-neutral-400">Antimatter Desktop</span>
        <div className="w-14" />
      </div>

      {/* Main content */}
      <div className="flex min-h-[420px] sm:min-h-[480px]">
        {/* Sidebar */}
        <div className="hidden w-56 shrink-0 border-r border-neutral-700 bg-neutral-850 sm:block">
          <div className="border-b border-neutral-700 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Ready for Review {sidebarItems.length}
            </span>
          </div>
          <div className="space-y-0.5 p-2">
            {sidebarItems.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-lg px-3 py-2.5 ${idx === 0 ? "bg-violet-500/10" : "hover:bg-neutral-800"} cursor-pointer transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${idx === 0 ? "text-violet-300" : "text-neutral-300"}`}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-neutral-500">{item.status}</span>
                </div>
                <p className="mt-0.5 truncate text-[10px] text-neutral-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center panel */}
        <div className="flex flex-1 flex-col">
          {/* Mode tabs */}
          <div className="flex items-center gap-1 border-b border-neutral-700 px-4 py-2">
            {(["agent", "plan", "preview"] as IDEMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModeChange(m)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  mode === m
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                }`}
              >
                {m === "agent" ? "⚡ Agent" : m === "plan" ? "📋 Plan" : "🌐 Preview"}
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-hidden p-4">
            <AnimatePresence mode="wait">
              {mode === "agent" && (
                <motion.div
                  key="agent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="mb-4 rounded-lg bg-neutral-800 p-3">
                    <p className="text-xs text-neutral-300">
                      build a landing page based on our brand docs and design system
                    </p>
                  </div>
                  {agentSteps.slice(0, visibleSteps).map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`mt-0.5 text-[10px] font-medium ${
                        step.action === "Done" ? "text-green-400" :
                        step.action === "Created" ? "text-emerald-400" :
                        step.action === "Updated" ? "text-amber-400" :
                        step.action === "Thought" ? "text-violet-400" :
                        "text-blue-400"
                      }`}>
                        {step.action}
                      </span>
                      <span className="text-xs text-neutral-300">{step.detail}</span>
                    </motion.div>
                  ))}
                  {isAnimating && visibleSteps < agentSteps.length && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span className="text-[10px] text-neutral-500">Working...</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {mode === "plan" && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">{planContent.title}</h4>
                    <p className="mt-1 text-xs text-neutral-400">{planContent.description}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-medium text-neutral-500">{planContent.tasks.length} Tasks</span>
                    {planContent.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2 rounded-md bg-neutral-800 px-3 py-2">
                        <div className="h-3.5 w-3.5 rounded-full border border-neutral-600" />
                        <span className="text-xs text-neutral-300">{task}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300">Plan</span>
                    <span className="text-[10px] text-neutral-500">Composer 2.5</span>
                  </div>
                </motion.div>
              )}

              {mode === "preview" && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-neutral-600" />
                      <div className="h-2 w-2 rounded-full bg-neutral-600" />
                    </div>
                    <span className="text-[10px] text-neutral-400">{previewContent.url}</span>
                  </div>
                  <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-4">
                    <h4 className="text-lg font-bold italic text-white">{previewContent.title}</h4>
                    <p className="mt-2 text-xs text-neutral-400">
                      Software creation is changing. We are a group of researchers, engineers, and technologists building at the edge of what&apos;s possible.
                    </p>
                    <div className="mt-4 space-y-0">
                      {previewContent.sections.map((section, idx) => (
                        <div key={idx} className="flex items-center justify-between border-t border-neutral-700 py-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-neutral-500">{section.year}</span>
                            <span className="text-xs text-neutral-300">{section.name}</span>
                          </div>
                          <span className="text-[10px] text-neutral-500">{section.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom input */}
          <div className="border-t border-neutral-700 px-4 py-3">
            <div className="flex items-center justify-between rounded-lg bg-neutral-800 px-3 py-2">
              <span className="text-xs text-neutral-500">Plan, search, build anything...</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-500">Antimatter Giga</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */

export function Hero(): ReactNode {
  return (
    <section className="relative w-full bg-background">
      {/* Top section with headline and buttons */}
      <div className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-48">
        <motion.h1
          className="text-foreground text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Antimatter is your coding agent for{" "}
          <br className="hidden sm:block" />
          building ambitious software.
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Apple className="h-4 w-4" />
            Download for macOS
            <Download className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href="#download"
            className="inline-flex items-center gap-2.5 rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <Monitor className="h-4 w-4" />
            Download for Windows
            <Download className="h-3.5 w-3.5 opacity-60" />
          </a>
        </motion.div>
      </div>

      {/* IDE Mockup */}
      <motion.div
        className="mx-auto mt-16 max-w-6xl px-4 pb-20 sm:mt-20 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <IDEMockup />
      </motion.div>
    </section>
  );
}
