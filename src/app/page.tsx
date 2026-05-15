"use client";
import WakeupPing from "./components/WakeupPing";
import HealthCheckButton from "./components/HealthCheckButton";
import { PlayButton } from "./components/PlayButton";
import { useLocale } from "@/hooks/useLocale";
import { STRINGS } from "@/lib/web-strings";

export default function Home() {
  const locale = useLocale();
  const s = STRINGS[locale].home;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <WakeupPing />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16 sm:px-10">
        <section className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
            {s.tagline}
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {s.hero_title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {s.hero_desc}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PlayButton label={s.play} />{" "}
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              href="/news"
            >
              {s.news_link}
            </a>
            <HealthCheckButton />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">{s.status_web_client}</p>
            <p className="mt-2 text-base font-semibold">Online</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{s.status_web_client_desc}</p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">{s.status_backend}</p>
            <p className="mt-2 text-base font-semibold">Online</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {s.status_backend_desc}
            </p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm text-neutral-500">{s.status_next}</p>
            <p className="mt-2 text-base font-semibold">v10.4</p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {s.status_next_desc}
            </p>
          </article>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.features.map(({ title, desc }) => (
            <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800">
          <p>{s.footer}</p>
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
