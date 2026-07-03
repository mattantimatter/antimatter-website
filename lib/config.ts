/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * Customize your landing page by editing the values below.
 * All text, links, and settings are centralized here for easy editing.
 */

export const siteConfig = {
  name: "Antimatter AI",
  tagline: "Intelligence at the edge of what's possible",
  description:
    "AI products, agentic systems, and intelligent infrastructure. Built for teams who want to move fast and own their stack.",
  url: "https://antimatterai.com",
  twitter: "@antimaboratory",

  nav: {
    cta: {
      text: "Download IDE",
      href: "#download",
    },
    signIn: {
      text: "Sign in",
      href: "#",
    },
  },
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 *
 * Toggle features on/off without touching component code.
 */
export const features = {
  smoothScroll: true,
  darkMode: true,
} as const;

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 *
 * Colors are defined in globals.css using CSS custom properties.
 * This config controls which theme features are enabled.
 */
export const themeConfig = {
  defaultTheme: "dark" as "light" | "dark" | "system",
  enableSystemTheme: true,
} as const;
