"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/api";
import { useLocale } from "@/hooks/useLocale";
import { STRINGS } from "@/lib/web-strings";

export default function LeaderboardPage() {
  const locale = useLocale();
  const s = STRINGS[locale].leaderboard;

  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [difficulty, setDifficulty] = useState("normal");

  const loading = entries === null;

  useEffect(() => {
    let isMounted = true;
    getLeaderboard(difficulty, 20).then((data) => {
      if (isMounted) {
        setEntries(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [difficulty]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">{s.title}</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setDifficulty("normal")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            difficulty === "normal"
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
          }`}
        >
          {s.normal}
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            difficulty === "hard"
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
          }`}
        >
          {s.hard}
        </button>
      </div>

      {loading && <p className="text-neutral-600 dark:text-neutral-400">{s.loading}</p>}

      {!loading && !entries && (
        <p className="text-neutral-600 dark:text-neutral-400">{s.unavailable}</p>
      )}

      {!loading && entries && entries.length === 0 && (
        <p className="text-neutral-600 dark:text-neutral-400">{s.empty}</p>
      )}

      {!loading && entries && entries.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                  {s.col_rank}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                  {s.col_username}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                  {s.col_score}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                  {s.col_wave}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={`${entry.username}-${index}`}
                  className="border-b border-neutral-100 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                >
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{index + 1}</td>
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{entry.username}</td>
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{entry.score}</td>
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{entry.wave}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                    {entry.created_at
                      ? new Date(entry.created_at).toLocaleDateString(locale === "it" ? "it-IT" : "en-US")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
