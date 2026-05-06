export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:px-10">
        <section className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
            towerdefense-cj.online
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Tower Defense CJ
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600">
            Sito ufficiale del progetto. La versione web giocabile e&apos; in
            arrivo: qui troverai aggiornamenti, changelog e accesso rapido al
            gioco.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition hover:bg-neutral-700"
              href="/play"
            >
              Play
            </a>{" "}
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-800 transition hover:border-neutral-400"
              href="/news"
            >
              News
            </a>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">Web Client</p>
            <p className="mt-2 text-base font-semibold">Online</p>
            <p className="mt-1 text-sm text-neutral-600">Base landing attiva.</p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">Backend</p>
            <p className="mt-2 text-base font-semibold">In evoluzione</p>
            <p className="mt-1 text-sm text-neutral-600">
              API e servizi in aggiornamento.
            </p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">Next Milestone</p>
            <p className="mt-2 text-base font-semibold">Play page</p>
            <p className="mt-1 text-sm text-neutral-600">
              Integrazione build web del gioco.
            </p>
          </article>
        </section>

        <footer className="border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <p>© 2026 Tower Defense CJ</p>
          <p className="mt-1">towerdefense-cj.online</p>
          <p className="mt-1">
            GitHub:{" "}
            <a
              href="https://github.com/alessandroj-Claude/towerdefense-web"
              className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              alessandroj-Claude/towerdefense-web
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
