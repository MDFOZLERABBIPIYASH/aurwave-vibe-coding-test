import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyMotion, domAnimation } from "motion/react";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/motion/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // siteConfig.url is already validated (empty-string guarded) in
  // `src/lib/site.ts`, so this URL parse never throws even when
  // NEXT_PUBLIC_SITE_URL is unset or blank.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Aurwave — Web Design & Development Agency",
    template: "%s · Aurwave",
  },
  description:
    "Aurwave is a modern web design and development agency creating thoughtful, high-performing digital experiences.",
  applicationName: "Aurwave",
  authors: [{ name: "Aurwave" }],
  keywords: ["web design", "web development", "agency", "Next.js", "UI/UX"],
  openGraph: {
    type: "website",
    siteName: "Aurwave",
    title: "Aurwave — Web Design & Development Agency",
    description:
      "A modern digital agency focused on creating thoughtful, high-performing digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurwave — Web Design & Development Agency",
    description:
      "A modern digital agency focused on creating thoughtful, high-performing digital experiences.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/*
          LazyMotion with `domAnimation` features: tree-shakes
          motion's full bundle (gestures, layout, drag) down to the
          ~21 KiB of features we actually use (initial, animate,
          whileInView, variants, AnimatePresence). The savings show
          up as reduced mobile TBT in Lighthouse.
        */}
        <LazyMotion features={domAnimation} strict>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-small focus:text-background focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        {/*
          Vercel Analytics + Speed Insights.
          Both auto-detect the deployment environment and ship zero
          runtime cost when not on Vercel. No env vars required —
          the project ID is derived from the deploy context.
        */}
        <Analytics />
        <SpeedInsights />
        </LazyMotion>
      </body>
    </html>
  );
}
