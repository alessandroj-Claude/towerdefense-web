const updates = [
  {
    date: "2026-05-05",
    title: "Dominio live",
    body: "Il sito ufficiale e' online su towerdefense-cj.online con deploy automatico su Vercel.",
  },
  {
    date: "2026-05-05",
    title: "Landing minimale pubblicata",
    body: "Homepage essenziale pubblicata con struttura pronta per Play, aggiornamenti e roadmap.",
  },
  {
    date: "2026-05-05",
    title: "Prossimo step",
    body: "In arrivo pagina /play con integrazione della futura build web del gioco.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          News
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Aggiornamenti progetto
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
          Diario rapido di avanzamento del sito e della futura versione web del
          gioco.
        </p>

        <div className="mt-10 space-y-4">
          {updates.map((update) => (
            <article
              key={`${update.date}-${update.title}`}
              className="rounded-2xl border border-neutral-200 bg-white p-6"
            >
              <p className="text-sm text-neutral-500">{update.date}</p>
              <h2 className="mt-2 text-xl font-semibold">{update.title}</h2>
              <p className="mt-2 text-neutral-700">{update.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
