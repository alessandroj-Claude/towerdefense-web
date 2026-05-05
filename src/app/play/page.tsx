export default function PlayPage() {
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
            <span>status: waiting build</span>
          </div>
          <div
            id="game-root"
            className="relative min-h-[420px] overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-neutral-100 sm:min-h-[560px]"
          >
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-5 text-center">
                <p className="text-sm font-medium text-neutral-500">Loading</p>
                <p className="mt-2 text-base font-semibold">
                  Web build non ancora disponibile
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Qui verra&apos; agganciato il runtime del gioco (canvas/WebAssembly).
                </p>
              </div>
            </div>
          </div>
          <div
            id="game-error"
            className="mt-3 hidden rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            Errore runtime: impossibile avviare la build web.
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
