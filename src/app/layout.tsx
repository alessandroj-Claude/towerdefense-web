import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://towerdefense-cj.online"),
  title: "Tower Defense CJ",
  description:
    "Sito ufficiale di Tower Defense CJ. Aggiornamenti progetto, devlog e futura versione web giocabile.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
