"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function BottomCTA(): ReactNode {
  return (
    <section id="download" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted/50">
        <div className="relative z-10 px-8 py-16 sm:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Download Antimatter IDE
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Free forever for local models. Start coding with AI that respects
              your privacy and runs on your hardware.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* macOS Download */}
              <Link
                href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-mac-arm64.dmg"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-foreground px-8 font-medium text-background transition-opacity hover:opacity-90"
              >
                <svg
                  className="h-5 w-5"
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
                className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-border bg-background px-8 font-medium text-foreground transition-colors hover:bg-muted"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 12V6.75l8-1.25V12H3zm0 .5h8v6.5l-8-1.25V12.5zM11.5 12V5.35l9.5-1.6V12H11.5zm0 .5H21v6.75l-9.5 1.5V12.5z" />
                </svg>
                Download for Windows
              </Link>

              {/* Linux */}
              <Link
                href="https://github.com/mattantimatter/antimatter-ide/releases/latest/download/Antimatter-IDE-linux-x64.AppImage"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-border bg-background px-8 font-medium text-foreground transition-colors hover:bg-muted"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.868.07 1.723-.26 2.456-.594.733-.333 1.364-.723 1.773-.916.422-.2.689-.135.988.2.025.023.05.049.076.07.012.012.02.025.03.036.015.014.027.031.04.044l.003.003.003.003c.453.5 1.07.6 1.64.53a2.91 2.91 0 001.163-.39 3.04 3.04 0 00.873-.667c.228-.26.394-.523.493-.747.1-.223.16-.4.16-.467l.003-.006a.036.036 0 00.003-.01.024.024 0 00.003-.01c.054-.105.076-.2.076-.297 0-.098-.022-.195-.066-.282a.59.59 0 00-.17-.227l-.003-.002a1.64 1.64 0 00-.32-.2 3.7 3.7 0 00-.488-.2 8.73 8.73 0 00-.67-.2c-.36-.1-.8-.2-1.05-.267-.39-.1-.59-.267-.59-.6 0-.067.01-.133.03-.2.02-.066.043-.133.063-.2.04-.133.09-.266.12-.4.03-.133.05-.266.05-.4 0-.133-.02-.266-.06-.4a1.5 1.5 0 00-.18-.4 1.5 1.5 0 00-.3-.333 1.5 1.5 0 00-.4-.233c.4-.5.7-1.067.9-1.667.2-.6.3-1.233.3-1.867 0-.633-.1-1.267-.3-1.867-.2-.6-.5-1.167-.9-1.667a4.5 4.5 0 00-1.4-1.233 4.5 4.5 0 00-1.8-.667c.1-.4.15-.8.15-1.2 0-.4-.05-.8-.15-1.2-.1-.4-.25-.8-.45-1.133a3.5 3.5 0 00-.7-.933 3.5 3.5 0 00-.95-.667A3.5 3.5 0 0015 2.1a3.5 3.5 0 00-1.1-.167c-.4 0-.8.05-1.15.167-.35.117-.7.283-1 .5-.3.217-.55.467-.75.75-.2.283-.35.6-.45.933-.1.333-.15.683-.15 1.033 0 .35.05.7.15 1.033-.4.133-.767.333-1.1.6z" />
                </svg>
                Linux (.AppImage)
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              macOS 12+ (Apple Silicon &amp; Intel) &middot; Windows 10+ (x64)
              &middot; Ubuntu 20.04+ &middot; No credit card required.
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-25 sm:opacity-25"
          style={{
            background: "linear-gradient(to left, #6366F1, transparent)",
            maskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
