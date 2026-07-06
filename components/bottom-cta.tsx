"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Download, Apple, Monitor } from "lucide-react";

export function BottomCTA(): ReactNode {
  return (
    <section id="download" className="px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Download Antimatter IDE
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Free forever for local models. Start coding with AI that respects your
          privacy and runs on your hardware.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* macOS Download */}
          <Link
            href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-mac-arm64.dmg"
            className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Apple className="h-4 w-4" />
            Download for macOS
            <Download className="h-3.5 w-3.5 opacity-60" />
          </Link>

          {/* Windows Download */}
          <Link
            href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-win-x64.exe"
            className="inline-flex items-center gap-2.5 rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <Monitor className="h-4 w-4" />
            Download for Windows
            <Download className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">
          macOS 12+ (Apple Silicon &amp; Intel) &middot; Windows 10+ (x64)
          &middot; No credit card required.
        </p>
      </div>
    </section>
  );
}
