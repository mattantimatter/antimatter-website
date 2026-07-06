"use client";

import { motion, AnimatePresence } from "motion/react";
import { Download, Apple, Monitor } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, type ReactNode } from "react";

/* ─── Types ─── */
type IDEMode = "agent" | "plan" | "debug" | "ask";

interface AgentStep {
  type: "thought" | "read" | "search" | "created" | "updated" | "done" | "text";
  content: string;
  file?: string;
  additions?: number;
}

/* ─── Data ─── */

const agentSteps: AgentStep[] = [
  { type: "thought", content: "I'll normalize the interaction labels and add session tagging so product can filter specific cohorts." },
  { type: "created", content: "", file: "summary.py", additions: 150 },
  { type: "text", content: "Next I'll normalize the interaction labels and add session tagging so product can filter specific cohorts:" },
  { type: "created", content: "", file: "segmentation.py", additions: 94 },
  { type: "text", content: "Time to stitch everything together with a report helper that combines the key metrics:" },
  { type: "created", content: "", file: "report.py", additions: 40 },
  { type: "text", content: "I'll add tests to lock in the behaviour using a representative sample from last week's export:" },
  { type: "created", content: "", file: "test_usage.py", additions: 90 },
  { type: "done", content: "All set! We now track focus share, switching rates, and rolling engagement so PMs can compare tab-first and agent-first workflows in seconds." },
];

const sidebarTasks = [
  { name: "Build Landing Page", detail: "Done. Fonts preload in the he...", time: "now", done: true },
  { name: "Analyze Tab vs Agent ...", detail: "All set! We now track focus sh...", time: "now", done: true },
  { name: "Plan Mission Control", detail: "+20 -3 · Drafted implementati...", time: "now", done: true },
  { name: "PyTorch MNIST Experi...", detail: "PyTorch MNIST Experiments", time: "10m", done: false },
  { name: "Set up Rules fo...", detail: "Set up Rules for Dashb...", time: "30m", done: false },
  { name: "Bioinformatics Tools", detail: "+135 -21 · Bioinformatics Tools", time: "45m", done: false },
];

const planSteps: AgentStep[] = [
  { type: "thought", content: "4s" },
  { type: "read", content: "AppManager.tsx" },
  { type: "search", content: "expose patterns" },
  { type: "created", content: "", file: "feature-prd.md", additions: 68 },
  { type: "text", content: "Drafted implementation steps in feature-prd.md.\nA few quick questions before I start building:" },
];

const planQuestions = [
  "Gesture (swipe up with 3 fingers)",
  "Keyboard shortcut (e.g., F3 or Cmd+F3)",
  "Both keyboard and button",
];

const planRightPanel = {
  title: "Mission Control Interface",
  description: "A grid view of all open windows as scaled previews, allowing quick selection to bring any window to front.",
  trigger: "Menu item in MenuBar.tsx (View > Mission Control), hotkey F3, or double-tap desktop.",
  viewBehavior: "Overlay existing windows into a grid of live previews with spring-based layout animations and shared element transitions.",
  tasks: [
    "Add multiplayer mode to useAppStore.ts",
    "Create a new MissionControlView.tsx component",
    "Update AppManager.tsx to apply expose modes.",
  ],
};

const codeLines = [
  { text: "import logging", color: "#c1c1ff" },
  { text: "from typing import Dict", color: "#c1c1ff" },
  { text: "", color: "" },
  { text: "import pandas as pd", color: "#c1c1ff" },
  { text: "", color: "" },
  { text: "logger = logging.getLogger(__name__)", color: "#e2e2e4" },
  { text: "", color: "" },
  { text: "", color: "" },
  { text: "def focus_share(", color: "#e2e2e4" },
  { text: "    events: pd.DataFrame,", color: "#a2a3e9" },
  { text: '    feature_col: str = "interaction_type",', color: "#a2a3e9" },
  { text: '    user_col: str = "user_id",', color: "#a2a3e9" },
  { text: ") -> pd.DataFrame:", color: "#e2e2e4" },
  { text: "    if events.empty:", color: "#c1c1ff" },
  { text: "        return pd.DataFrame(", color: "#e2e2e4" },
  { text: '            columns=[feature_col, "events", "unique_users"]', color: "#89b4fa" },
  { text: "        )", color: "#e2e2e4" },
  { text: "", color: "" },
  { text: "    missing = {feature_col, user_col} - set(events.columns)", color: "#e2e2e4" },
  { text: "    if missing:", color: "#c1c1ff" },
  { text: '        raise ValueError(f"Missing required columns: {sorted(missing)}")', color: "#f38ba8" },
];

/* ─── IDE Component ─── */

function IDEMockup() {
  const [mode, setMode] = useState<IDEMode>("agent");
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animate agent steps on mount
  useEffect(() => {
    if (mode !== "agent") return;
    setVisibleSteps(0);
    const timers: NodeJS.Timeout[] = [];
    agentSteps.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleSteps(idx + 1);
      }, 800 + idx * 700);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, [mode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleModeSelect = (m: IDEMode) => {
    setMode(m);
    setShowDropdown(false);
  };

  const modeIcon = (m: IDEMode) => {
    switch (m) {
      case "agent": return "∞";
      case "plan": return "⊞";
      case "debug": return "⊙";
      case "ask": return "◻";
    }
  };

  const modeLabel = (m: IDEMode) => {
    switch (m) {
      case "agent": return "Agent";
      case "plan": return "Plan";
      case "debug": return "Debug";
      case "ask": return "Ask";
    }
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-neutral-200 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] dark:border-[#464650]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 py-2 dark:border-[#464650] dark:bg-[#111415]">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/antimatter-logo.png"
            alt="Antimatter"
            width={120}
            height={16}
            className="h-3.5 w-auto dark:invert"
          />
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Three-panel layout */}
      <div className="flex min-h-[480px] sm:min-h-[540px]">
        {/* Left sidebar — task list */}
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-neutral-100 bg-white dark:border-[#464650] dark:bg-[#1a1c1d] lg:flex">
          {/* In Progress */}
          <div className="border-b border-neutral-100 px-4 py-3 dark:border-[#464650]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-[#918f9b]">
              {mode === "plan" ? "IN PROGRESS 1" : "READY FOR REVIEW " + sidebarTasks.filter(t => t.done).length}
            </span>
            {mode === "plan" && (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 w-3 animate-spin rounded-full border border-neutral-300 border-t-transparent dark:border-[#a2a3e9] dark:border-t-transparent" />
                <span className="text-xs text-neutral-600 dark:text-[#c7c5d1]">Plan Mission Control</span>
                <span className="ml-auto text-[10px] text-neutral-400 dark:text-[#918f9b]">Generating plan</span>
              </div>
            )}
          </div>
          {/* Task list */}
          <div className="flex-1 overflow-hidden">
            {!( mode === "plan") && (
              <div className="px-2 py-2">
                <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-[#918f9b]">
                  READY FOR REVIEW {sidebarTasks.filter(t => t.done).length}
                </span>
              </div>
            )}
            <div className="space-y-0.5 px-2">
              {sidebarTasks.map((task, idx) => (
                <div
                  key={idx}
                  className={`flex cursor-pointer items-start gap-2.5 rounded-lg px-3 py-2.5 transition-colors ${
                    idx === (mode === "agent" ? 1 : 2)
                      ? "bg-neutral-100 dark:bg-[#333537]"
                      : "hover:bg-neutral-50 dark:hover:bg-[#282a2c]"
                  }`}
                >
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    {task.done ? (
                      <svg className="h-4 w-4 text-neutral-400 dark:text-[#918f9b]" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-neutral-300 dark:text-[#464650]" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-xs font-medium text-neutral-700 dark:text-[#e2e2e4]">{task.name}</span>
                      <span className="ml-2 shrink-0 text-[10px] text-neutral-400 dark:text-[#918f9b]">{task.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] text-neutral-400 dark:text-[#918f9b]">{task.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center panel — agent chat */}
        <div className="flex flex-1 flex-col border-r border-neutral-100 dark:border-[#464650]">
          {/* Task title */}
          <div className="border-b border-neutral-100 px-5 py-3 dark:border-[#464650]">
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-[#e2e2e4]">
              {mode === "agent" ? "Analyze Tab vs Agent Usage Patterns" : "Plan Mission Control"}
            </h3>
          </div>

          {/* Chat content */}
          <div className="flex-1 overflow-hidden px-5 py-4">
            <AnimatePresence mode="wait">
              {mode === "agent" && (
                <motion.div
                  key="agent-chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* User prompt */}
                  <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3 dark:border-[#464650] dark:bg-[#1e2021]">
                    <p className="text-xs text-neutral-700 dark:text-[#e2e2e4]">
                      Help me understand how teams split their focus between the tab view and the agents panel across our workspaces.
                    </p>
                  </div>
                  {/* Steps */}
                  <div className="space-y-2.5">
                    {agentSteps.slice(0, visibleSteps).map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.type === "created" && step.file && (
                          <div className="flex items-center gap-2 rounded-lg border border-neutral-100 px-3 py-2 dark:border-[#464650]">
                            <span className="text-neutral-400 dark:text-[#918f9b]">📄</span>
                            <span className="text-xs text-neutral-600 dark:text-[#c7c5d1]">{step.file}</span>
                            <span className="text-xs font-medium text-green-500">+{step.additions}-0</span>
                          </div>
                        )}
                        {step.type === "text" && (
                          <p className="text-xs leading-relaxed text-neutral-600 dark:text-[#c7c5d1]">{step.content}</p>
                        )}
                        {step.type === "done" && (
                          <p className="text-xs leading-relaxed text-neutral-600 dark:text-[#c7c5d1]">{step.content}</p>
                        )}
                      </motion.div>
                    ))}
                    {visibleSteps < agentSteps.length && (
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#a2a3e9]" />
                        <span className="text-[10px] text-neutral-400 dark:text-[#918f9b]">Working...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {mode === "plan" && (
                <motion.div
                  key="plan-chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3 dark:border-[#464650] dark:bg-[#1e2021]">
                    <p className="text-xs text-neutral-700 dark:text-[#e2e2e4]">
                      let&apos;s build a mission control interface, similar to the expose-style window manager on macOS
                    </p>
                  </div>
                  <div className="space-y-2">
                    {planSteps.map((step, idx) => (
                      <div key={idx}>
                        {step.type === "thought" && (
                          <p className="text-[11px] text-neutral-400 dark:text-[#918f9b]">Thought {step.content}</p>
                        )}
                        {step.type === "read" && (
                          <p className="text-[11px] text-neutral-400 dark:text-[#918f9b]">Read {step.content}</p>
                        )}
                        {step.type === "search" && (
                          <p className="text-[11px] text-neutral-400 dark:text-[#918f9b]">Searched {step.content}</p>
                        )}
                        {step.type === "created" && step.file && (
                          <div className="flex items-center gap-2 rounded-lg border border-neutral-100 px-3 py-2 dark:border-[#464650]">
                            <span className="text-neutral-400 dark:text-[#918f9b]">📄</span>
                            <span className="text-xs text-neutral-600 dark:text-[#c7c5d1]">{step.file}</span>
                            <span className="text-xs font-medium text-green-500">+{step.additions}</span>
                          </div>
                        )}
                        {step.type === "text" && (
                          <p className="whitespace-pre-line text-xs leading-relaxed text-neutral-600 dark:text-[#c7c5d1]">{step.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Questions card */}
                  <div className="mt-4 rounded-lg border border-neutral-100 p-4 dark:border-[#464650]">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 dark:text-[#918f9b]">Questions</span>
                      <div className="flex gap-1">
                        <span className="text-neutral-300 dark:text-[#464650]">‹</span>
                        <span className="text-neutral-300 dark:text-[#464650]">›</span>
                      </div>
                    </div>
                    <p className="mb-3 text-xs font-medium text-neutral-700 dark:text-[#e2e2e4]">How should Mission Control be triggered?</p>
                    <div className="space-y-2">
                      {planQuestions.map((q, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded border border-neutral-200 text-[10px] text-neutral-500 dark:border-[#464650] dark:text-[#918f9b]">{idx + 1}</span>
                          <span className="text-xs text-neutral-600 dark:text-[#c7c5d1]">{q}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button type="button" className="text-xs text-neutral-400 dark:text-[#918f9b]">Skip</button>
                      <button type="button" className="rounded bg-green-500 px-3 py-1 text-xs font-medium text-white">Continue</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {(mode === "debug" || mode === "ask") && (
                <motion.div
                  key="other"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-sm text-neutral-400 dark:text-[#918f9b]">
                      {mode === "debug" ? "Debug mode — set breakpoints and inspect variables" : "Ask mode — get quick answers without executing code"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom input bar */}
          <div className="border-t border-neutral-100 px-5 py-3 dark:border-[#464650]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2 dark:border-[#464650] dark:bg-[#1e2021]">
                <span className="text-xs text-neutral-400 dark:text-[#918f9b]">
                  {mode === "plan" ? "Add follow-up..." : "Plan, search, build anything..."}
                </span>
              </div>
              <div className="flex items-center gap-3" ref={dropdownRef}>
                {/* Mode dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-[#333537]"
                    style={{ color: mode === "plan" ? "#f59e0b" : "#918f9b" }}
                  >
                    <span>{modeIcon(mode)}</span>
                    <span>{modeLabel(mode)}</span>
                    <span className="text-[10px]">▾</span>
                  </button>
                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 z-50 mb-2 w-40 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-[#464650] dark:bg-[#1e2021]"
                      >
                        {(["agent", "plan", "debug", "ask"] as IDEMode[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => handleModeSelect(m)}
                            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors ${
                              mode === m
                                ? "bg-neutral-100 dark:bg-[#333537]"
                                : "hover:bg-neutral-50 dark:hover:bg-[#282a2c]"
                            }`}
                          >
                            <span className="text-sm">{modeIcon(m)}</span>
                            <span className="text-neutral-700 dark:text-[#e2e2e4]">{modeLabel(m)}</span>
                            {mode === m && <span className="ml-auto text-green-500">✓</span>}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-[11px] text-neutral-400 dark:text-[#918f9b]">Galileo ▾</span>
                <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 dark:border-[#464650] dark:text-[#918f9b]">
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — code editor / plan document */}
        <div className="hidden flex-1 flex-col bg-white dark:bg-[#111415] xl:flex">
          <AnimatePresence mode="wait">
            {mode === "agent" && (
              <motion.div
                key="code-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col"
              >
                {/* File tabs */}
                <div className="flex items-center gap-0 border-b border-neutral-100 dark:border-[#464650]">
                  <div className="flex items-center gap-2 border-r border-neutral-100 bg-neutral-50 px-4 py-2.5 dark:border-[#464650] dark:bg-[#1e2021]">
                    <span className="text-xs text-neutral-700 dark:text-[#e2e2e4]">summary.py</span>
                    <span className="text-[10px] text-neutral-400 dark:text-[#918f9b]">×</span>
                  </div>
                  <div className="px-4 py-2.5">
                    <span className="text-xs text-neutral-400 dark:text-[#918f9b]">report.py</span>
                  </div>
                  <div className="px-4 py-2.5">
                    <span className="text-xs text-neutral-400 dark:text-[#918f9b]">test_usage.py</span>
                  </div>
                </div>
                {/* Code content */}
                <div className="flex-1 overflow-hidden p-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <div className="space-y-0">
                    {codeLines.map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 shrink-0 select-none text-right text-[11px] text-neutral-300 dark:text-[#464650]">{idx + 1}</span>
                        <pre className="ml-4 text-[11px] leading-5" style={{ color: line.color || "#918f9b" }}>
                          {line.text || " "}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {mode === "plan" && (
              <motion.div
                key="plan-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col"
              >
                {/* File tabs */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2.5 dark:border-[#464650]">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-neutral-700 dark:text-[#e2e2e4]">feature-prd.md</span>
                    <span className="text-xs text-neutral-400 dark:text-[#918f9b]">presence.ts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 dark:text-[#918f9b]">Plans › feature-prd.md</span>
                    <span className="rounded bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">Build</span>
                  </div>
                </div>
                {/* Document content */}
                <div className="flex-1 overflow-hidden p-6">
                  <h2 className="text-lg font-bold text-neutral-800 dark:text-[#e2e2e4]">{planRightPanel.title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-[#c7c5d1]">{planRightPanel.description}</p>
                  <h4 className="mt-5 text-sm font-semibold text-neutral-700 dark:text-[#e2e2e4]">Trigger</h4>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-[#c7c5d1]">{planRightPanel.trigger}</p>
                  <h4 className="mt-5 text-sm font-semibold text-neutral-700 dark:text-[#e2e2e4]">View Behavior</h4>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-[#c7c5d1]">{planRightPanel.viewBehavior}</p>
                  <div className="mt-5">
                    <span className="text-xs text-neutral-400 dark:text-[#918f9b]">{planRightPanel.tasks.length} Tasks</span>
                    <div className="mt-2 space-y-2">
                      {planRightPanel.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border border-neutral-300 dark:border-[#464650]" />
                          <span className="text-xs text-neutral-600 dark:text-[#c7c5d1]">{task}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="h-4 w-4 rounded-full border border-neutral-200 dark:border-[#464650]" />
                        <span className="text-xs text-neutral-400 dark:text-[#918f9b]">Add a task, ⌘K to generate...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {(mode === "debug" || mode === "ask") && (
              <motion.div
                key="empty-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 items-center justify-center"
              >
                <p className="text-xs text-neutral-400 dark:text-[#918f9b]">Select a file to view</p>
              </motion.div>
            )}
          </AnimatePresence>
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
      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-48">
        <motion.h1
          className="text-foreground text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
        className="mx-auto mt-16 max-w-7xl px-4 pb-20 sm:mt-20 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <IDEMockup />
      </motion.div>
    </section>
  );
}
