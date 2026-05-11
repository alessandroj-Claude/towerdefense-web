"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAuthState, type AuthState } from "@/lib/auth";

export default function PlayPage() {
  const [hasError, setHasError] = useState(false);
  const [authState] = useState<AuthState | null>(getAuthState());
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

          {/* Overlay container: transparent, non-interactive by default */}
          <div className="pointer-events-none fixed inset-0 flex flex-col gap-3 p-3">
            {/* Auth state bar */}
            <div className="pointer-events-auto flex items-center justify-between rounded-full bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
              {authState ? (
                <>
                  <span>Playing as {authState.username}</span>
                  <Link
                    href="/account"
                    className="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs transition hover:bg-white/30"
                  >
                    Account
                  </Link>
                </>
              ) : (
                <Link
                  href="/account"
                  className="rounded-full bg-white/20 px-2 py-1 text-xs transition hover:bg-white/30"
                >
                  Account
                </Link>
              )}
            </div>

            {/* Home button */}
            <Link
              href="/"
              className="pointer-events-auto inline-flex h-8 items-center justify-center rounded-full bg-black/60 px-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              ← Home
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
