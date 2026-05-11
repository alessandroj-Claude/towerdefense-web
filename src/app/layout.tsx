import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://towerdefense-cj.online"),
  title: "Tower Defense CJ",
  description:
    "Sito ufficiale di Tower Defense CJ. Aggiornamenti progetto, devlog e futura versione web giocabile.",
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  openGraph: {
    title: "Tower Defense CJ",
    description:
      "Aggiornamenti progetto, devlog e futura versione web giocabile.",
    url: "https://towerdefense-cj.online",
    siteName: "Tower Defense CJ",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tower Defense CJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tower Defense CJ",
    description:
      "Aggiornamenti progetto, devlog e futura versione web giocabile.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
        <header className="border-b border-neutral-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              Tower Defense CJ
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                Home
              </Link>
              <Link
                href="/play"
                className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                Play
              </Link>
              <Link
                href="/leaderboard"
                className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                Leaderboard
              </Link>
              <Link
                href="/news"
                className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                News
              </Link>
              <Link
                href="/account"
                className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                Account
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
