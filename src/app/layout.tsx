import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
        {children}
      </body>
    </html>
  );
}
