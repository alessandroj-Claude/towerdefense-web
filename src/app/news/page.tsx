"use client";
import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { STRINGS } from "@/lib/web-strings";

type NewsEntry = { date: string; version?: string; title: string; body: string };

export default function NewsPage() {
  const locale = useLocale();
  const s = STRINGS[locale].news;
  const [news, setNews] = useState<NewsEntry[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://towerdefense-cj.online";
    fetch(`${baseUrl}/news.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: unknown) => setNews(Array.isArray(data) ? (data as NewsEntry[]) : null))
      .catch(() => setError(true));
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-16 text-neutral-900 sm:px-10 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          {s.section_label}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {s.page_title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
          {s.subtitle}
        </p>

        <div className="mt-10 space-y-4">
          {news === null && !error && (
            <p className="text-neutral-600 dark:text-neutral-400">{s.loading}</p>
          )}

          {error && (
            <p className="text-neutral-600 dark:text-neutral-400">{s.error}</p>
          )}

          {news !== null &&
            news.map((entry) => (
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
