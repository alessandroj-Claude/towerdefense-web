"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function PlayPage() {
  const [hasError, setHasError] = useState(false);
  const gameUrl = useMemo(
    () => process.env.NEXT_PUBLIC_GAME_EMBED_URL?.trim() || "/game/index.html",
    [],
  );

  return (
    <main className="fixed inset-0 bg-black">
      {hasError ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-sm text-red-400">
            Errore runtime: impossibile caricare la build web.
          </p>
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-full bg-neutral-800 px-4 text-xs font-semibold text-white transition hover:bg-neutral-700"
          >
            ← Torna alla home
          </Link>
        </div>
      ) : (
        <>
          <iframe
            title="Tower Defense CJ Web Build"
            src={gameUrl}
            className="h-full w-full border-0"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            onError={() => setHasError(true)}
          />
          <Link
            href="/"
            className="absolute left-3 top-3 z-10 inline-flex h-8 items-center justify-center rounded-full bg-black/60 px-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/80"
          >
            ← Home
          </Link>
        </>
      )}
    </main>
  );
}
