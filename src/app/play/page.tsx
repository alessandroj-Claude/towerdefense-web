"use client";

import { useMemo, useState } from "react";

export default function PlayPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const gameUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_GAME_EMBED_URL?.trim() || "/game/index.html",
    [],
  );

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900 sm:px-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
            Play
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tower Defense CJ - Web
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600">
            Questa pagina e&apos; pronta per ospitare la build browser del
            gioco. Appena disponibile, verra&apos; caricata nel riquadro qui
            sotto.
          </p>
        </div>

        <section
          aria-label="Game container"
          className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6"
        >
          <div className="mb-3 flex items-center justify-between text-sm text-neutral-500">
            <span>Game Runtime</span>
            <span>
              status:{" "}
              {hasError
                  ? "error"
                  : isLoaded
                    ? "ready"
                    : "loading"}
            </span>
          </div>
          <div
            id="game-root"
            className="relative min-h-[420px] overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-neutral-100 sm:min-h-[560px]"
          >
            <>
              {!isLoaded && !hasError && (
                <div className="absolute inset-0 z-10 grid place-items-center p-6">
                  <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 text-center">
                    <p className="text-sm font-medium text-neutral-500">
                      Loading
                    </p>
                    <p className="mt-2 text-base font-semibold">
                      Avvio runtime web in corso
                    </p>
                  </div>
                </div>
              )}
              <iframe
                title="Tower Defense CJ Web Build"
                src={gameUrl}
                className="h-[560px] w-full border-0"
                loading="lazy"
                allow="fullscreen; autoplay"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white transition hover:bg-neutral-700"
            >
              Apri Gioco a Schermo Pieno
            </a>
            <p className="text-xs text-neutral-500">
              Consigliato se resti bloccato su "Ready to start / Loading".
            </p>
          </div>
          <div
            id="game-error"
            className={`mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 ${
              hasError ? "block" : "hidden"
            }`}
          >
            Errore runtime: impossibile caricare la build web.
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Controlli previsti</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Mouse per interazioni UI, tastiera per shortcut di gioco. La lista
            completa verra&apos; aggiornata insieme al primo rilascio playable.
          </p>
        </section>
      </div>
    </main>
  );
}
