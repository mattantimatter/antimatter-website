"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function BottomCTA(): ReactNode {
  return (
    <section id="download" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted/50 border border-border/50">
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-20 sm:px-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Download Antimatter IDE
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Free forever for local models. Start coding with AI that respects
            your privacy and runs on your hardware.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {/* macOS Download */}
            <Link
              href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-mac-arm64.dmg"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download for macOS
            </Link>

            {/* Windows Download */}
            <Link
              href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-win-x64.exe"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-border bg-background/80 px-6 text-sm font-medium text-foreground transition-all hover:bg-muted hover:scale-[1.02]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 12V6.75l8-1.25V12H3zm0 .5h8v6.5l-8-1.25V12.5zM11.5 12V5.35l9.5-1.6V12H11.5zm0 .5H21v6.75l-9.5 1.5V12.5z" />
              </svg>
              Download for Windows
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted-foreground/70">
            macOS 12+ (Apple Silicon &amp; Intel) &middot; Windows 10+ (x64)
            &middot; No credit card required.
          </p>
        </div>

        {/* Background gradient accent */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, #6366F1 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
