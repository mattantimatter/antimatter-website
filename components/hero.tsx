"use client";

import { motion, AnimatePresence } from "motion/react";
import { Download, Apple, Monitor } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

/* ─── IDE Mockup Data ─── */

type IDEMode = "idle" | "agent" | "plan";

interface AgentStep {
  action: string;
  detail: string;
  delay: number;
}

const agentSteps: AgentStep[] = [
  { action: "Thought", detail: "I'll scaffold a Next.js app with the Antimatter design system.", delay: 1200 },
  { action: "Read", detail: "package.json", delay: 2000 },
  { action: "Read", detail: "tailwind.config.ts", delay: 2800 },
  { action: "Searched", detail: "component patterns", delay: 3600 },
  { action: "Created", detail: "app/page.tsx  +84 -0", delay: 4600 },
  { action: "Created", detail: "components/hero.tsx  +52 -0", delay: 5400 },
  { action: "Updated", detail: "app/globals.css  +12 -3", delay: 6200 },
  { action: "Done", detail: "Build successful. 280ms first paint, zero layout shift.", delay: 7200 },
];

const sidebarRepos = [
  { name: "akamai-chat-2", desc: "Development en...", time: "2h", active: false },
  { name: "antimatter-ide", desc: "Antimatter open agent", time: "1d", active: true },
  { name: "mclaren-alteryx", desc: "McLaren Alteryx Nex...", time: "6d", active: false },
];

const planTasks = [
  "Scaffold component architecture with atomic design",
  "Integrate Antimatter Giga for code generation",
  "Set up CI/CD pipeline with preview deployments",
  "Add multiplayer collaboration via CRDTs",
];

/* ─── IDE Component ─── */

function IDEMockup() {
  const [mode, setMode] = useState<IDEMode>("idle");
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  // Auto-start agent mode after mount
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setMode("agent");
    }, 1500);
    return () => clearTimeout(startTimer);
  }, []);

  // Animate agent steps
  useEffect(() => {
    if (mode !== "agent") return;
    setVisibleSteps(0);
    const timers: NodeJS.Timeout[] = [];
    agentSteps.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setVisibleSteps(idx + 1);
      }, step.delay);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, [mode]);

  return (
    <div className="overflow-hidden rounded-xl border border-[#464650] shadow-2xl" style={{ background: "#111415" }}>
      {/* Sidebar + Main layout */}
      <div className="flex min-h-[460px] sm:min-h-[520px]">
        {/* Sidebar */}
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[#464650] sm:flex" style={{ background: "#1a1c1d" }}>
          {/* Window dots */}
          <div className="flex gap-2 px-4 pb-2 pt-4 opacity-50">
            <div className="h-2.5 w-2.5 rounded-full bg-[#464650]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#464650]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#464650]" />
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-0.5 px-3 py-3">
            <button type="button" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#b7b5b4]" style={{ background: "#474746" }}>
              <span className="text-sm">⊕</span> New Agent
            </button>
            <button type="button" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-[#c7c5d1] hover:bg-[#333537]">
              <span className="text-sm">⌕</span> Search
            </button>
            <button type="button" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-[#c7c5d1] hover:bg-[#333537]">
              <span className="text-sm">⚙</span> Automations
            </button>
            <button type="button" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-[#c7c5d1] hover:bg-[#333537]">
              <span className="text-sm">≡</span> Customize
            </button>
          </nav>

          {/* Repositories */}
          <div className="mt-2 flex-1 overflow-hidden px-3">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c7c5d1]">Repositories</span>
              <div className="flex gap-1">
                <span className="text-[12px] text-[#918f9b]">⊟</span>
                <span className="text-[12px] text-[#918f9b]">⊞</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              {sidebarRepos.map((repo) => (
                <div
                  key={repo.name}
                  className={`relative rounded-lg px-3 py-2 ${
                    repo.active ? "bg-[#333537]" : "hover:bg-[#282a2c]"
                  } cursor-pointer`}
                >
                  {repo.active && (
                    <div className="absolute bottom-0 left-0 top-0 w-[2px] rounded-r bg-[#a2a3e9]" />
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#918f9b]">📁</span>
                    <span className={`text-xs ${repo.active ? "font-medium text-[#a2a3e9]" : "text-[#e2e2e4]"}`}>
                      {repo.name}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between pl-5">
                    <span className="truncate text-[10px] text-[#918f9b]">{repo.desc}</span>
                    <span className="text-[10px] text-[#918f9b]">{repo.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#464650]/30 px-3 py-3">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-[#333537]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[#e2e2e4]">Matthew Bravo</span>
                <span className="text-[10px] text-[#918f9b]">Pro Plan</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex flex-1 flex-col" style={{ background: "#111415" }}>
          {/* Top bar */}
          <header className="flex items-center justify-between border-b border-[#464650] px-5 py-2.5" style={{ background: "#111415" }}>
            <span className="text-sm font-bold tracking-tight text-[#c1c1ff]">Antimatter AI</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c7c5d1]">Share</span>
              <button type="button" className="rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#282967]" style={{ background: "#a2a3e9" }}>
                Deploy
              </button>
            </div>
          </header>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center p-6 relative">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[80px]" style={{ background: "#a2a3e9" }} />

            <AnimatePresence mode="wait">
              {/* Idle state — prompt area */}
              {mode === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="z-10 flex w-full max-w-[560px] flex-col gap-3"
                >
                  {/* Breadcrumbs */}
                  <div className="ml-1 flex items-center gap-1.5 text-[11px] text-[#918f9b]" style={{ fontFamily: "monospace" }}>
                    <span className="text-[#c7c5d1]">antimatter-ide</span>
                    <span>›</span>
                    <span>main</span>
                    <span>›</span>
                    <span>Local</span>
                  </div>
                  {/* Input box */}
                  <div className="rounded-xl border border-[#464650] p-4" style={{ background: "rgba(30, 32, 33, 0.7)", backdropFilter: "blur(20px)" }}>
                    <div className="min-h-[48px] text-sm text-[#918f9b]">
                      Plan, Build, / for skills, @ for context
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#333537] text-[12px] text-[#c7c5d1]">+</div>
                        <span className="text-xs text-[#918f9b]">Antimatter Giga ▾</span>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#464650] bg-[#333537] text-[12px] text-[#c7c5d1]">
                        🎤
                      </div>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex items-center gap-2.5">
                    <button type="button" className="rounded-full border border-[#464650] px-3.5 py-1.5 text-xs text-[#e2e2e4] hover:bg-[#333537]">
                      Plan New Idea <span className="ml-1 text-[10px] text-[#918f9b]">⇧ Tab</span>
                    </button>
                    <button type="button" className="rounded-full border border-[#464650] px-3.5 py-1.5 text-xs text-[#e2e2e4] hover:bg-[#333537]">
                      Multitask
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Agent mode — animated build steps */}
              {mode === "agent" && (
                <motion.div
                  key="agent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="z-10 flex w-full max-w-[560px] flex-col gap-3"
                >
                  {/* Task header */}
                  <div className="rounded-lg border border-[#464650] px-4 py-3" style={{ background: "rgba(30, 32, 33, 0.7)" }}>
                    <p className="text-xs text-[#e2e2e4]">build a landing page based on our brand docs and design system</p>
                  </div>
                  {/* Steps */}
                  <div className="space-y-2.5 px-1">
                    {agentSteps.slice(0, visibleSteps).map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-3"
                      >
                        <span className={`mt-0.5 text-[11px] font-semibold ${
                          step.action === "Done" ? "text-green-400" :
                          step.action === "Created" ? "text-emerald-400" :
                          step.action === "Updated" ? "text-amber-400" :
                          step.action === "Thought" ? "text-[#c1c1ff]" :
                          "text-blue-400"
                        }`}>
                          {step.action}
                        </span>
                        <span className="text-xs text-[#c7c5d1]">{step.detail}</span>
                      </motion.div>
                    ))}
                    {visibleSteps < agentSteps.length && (
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="flex items-center gap-2 pl-0.5"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#a2a3e9]" />
                        <span className="text-[10px] text-[#918f9b]">Working...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Plan mode */}
              {mode === "plan" && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="z-10 flex w-full max-w-[560px] flex-col gap-4"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#e2e2e4]">Mission Control Interface</h4>
                    <p className="mt-1 text-xs text-[#918f9b]">A grid view of all open windows as scaled previews, allowing quick selection to bring any window to front.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#918f9b]">{planTasks.length} Tasks</span>
                    {planTasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 rounded-lg border border-[#464650] px-3 py-2" style={{ background: "rgba(30, 32, 33, 0.7)" }}>
                        <div className="h-3.5 w-3.5 rounded-full border border-[#918f9b]" />
                        <span className="text-xs text-[#c7c5d1]">{task}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded px-2 py-0.5 text-[10px] font-semibold text-[#282967]" style={{ background: "#a2a3e9" }}>Plan</span>
                    <span className="text-[10px] text-[#918f9b]">Antimatter Giga</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom mode switcher */}
          <div className="border-t border-[#464650] px-5 py-3">
            <div className="flex items-center justify-center gap-2">
              {(["idle", "agent", "plan"] as IDEMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-medium capitalize transition-all ${
                    mode === m
                      ? "border border-[#a2a3e9]/40 text-[#c1c1ff]"
                      : "border border-[#464650] text-[#918f9b] hover:border-[#918f9b] hover:text-[#c7c5d1]"
                  }`}
                  style={mode === m ? { background: "rgba(162, 163, 233, 0.1)" } : {}}
                >
                  {m === "idle" ? "Home" : m === "agent" ? "Agent" : "Plan"}
                </button>
              ))}
            </div>
          </div>
        </main>
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
