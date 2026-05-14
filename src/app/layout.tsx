import type { Metadata, Viewport } from "next";
import Link from "next/link";
import NavLinks from "@/app/components/NavLinks";
import { ThemeProvider } from "@/app/components/ThemeProvider";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("td.theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(!s&&d))document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <header className="border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
            <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
              <Link href="/" className="text-sm font-semibold tracking-tight dark:text-neutral-100">
                Tower Defense CJ
              </Link>
              <NavLinks />
            </nav>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
