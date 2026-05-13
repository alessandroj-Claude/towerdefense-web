import WakeupPing from "./components/WakeupPing";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <WakeupPing />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:px-10">
        <section className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
            towerdefense-cj.online
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Tower Defense CJ
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Gioca direttamente nel browser, sfida la classifica globale, sblocca achievement e salva i tuoi progressi nel cloud.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
              href="/play"
            >
              Play
            </a>{" "}
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              href="/news"
            >
              News
            </a>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">Web Client</p>
            <p className="mt-2 text-base font-semibold">Online</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Build v8.10 live su Vercel.</p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">Backend</p>
            <p className="mt-2 text-base font-semibold">Online</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              FastAPI su Render, Neon PostgreSQL.
            </p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">Next Milestone</p>
            <p className="mt-2 text-base font-semibold">v9.x Web</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Navbar, stats, dark mode e news aggiornate.
            </p>
          </article>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Wave Defense", desc: "Difendi la base da ondate crescenti di nemici" },
            { title: "Boss Fights", desc: "Ogni milestone porta un boss con abilità uniche" },
            { title: "Daily Challenges", desc: "Sfide quotidiane con mappe e modificatori dedicati" },
            { title: "Classifica Globale", desc: "Confronta il tuo score con tutti i giocatori" },
            { title: "25 Achievement", desc: "Sblocca traguardi durante le run" },
            { title: "Cloud Save", desc: "Progressi sincronizzati sul tuo account" },
          ].map(({ title, desc }) => (
            <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800">
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
