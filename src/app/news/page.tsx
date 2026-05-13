type NewsEntry = {
  date: string;
  version?: string;
  title: string;
  body: string;
};

const FALLBACK_NEWS: NewsEntry[] = [
  {
    date: "2026-05-13",
    title: "Aggiornamenti in caricamento",
    body: "Impossibile caricare le news. Riprova più tardi.",
  },
];

async function getNews(): Promise<NewsEntry[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "https://towerdefense-cj.online";
    const res = await fetch(`${baseUrl}/news.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_NEWS;
    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as NewsEntry[]) : FALLBACK_NEWS;
  } catch {
    return FALLBACK_NEWS;
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900 sm:px-10 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          News
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Aggiornamenti progetto
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
          Diario di avanzamento del gioco e del sito.
        </p>

        <div className="mt-10 space-y-4">
          {news.map((entry) => (
            <article
              key={`${entry.date}-${entry.title}`}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-center gap-2">
                <p className="text-sm text-neutral-500">
                  {new Date(entry.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                {entry.version && (
                  <span className="rounded bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
                    {entry.version}
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{entry.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
