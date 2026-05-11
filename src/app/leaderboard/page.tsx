"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/api";

export default function LeaderboardPage() {
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
      <h1 className="mb-8 text-3xl font-bold">Classifica Globale</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setDifficulty("normal")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            difficulty === "normal"
              ? "bg-neutral-900 text-white"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          Normale
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            difficulty === "hard"
              ? "bg-neutral-900 text-white"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          }`}
        >
          Difficile
        </button>
      </div>

      {loading && <p className="text-neutral-600">Caricamento...</p>}

      {!loading && !entries && (
        <p className="text-neutral-600">Classifica non disponibile al momento</p>
      )}

      {!loading && entries && entries.length === 0 && (
        <p className="text-neutral-600">Nessuna partita registrata</p>
      )}

      {!loading && entries && entries.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                  Giocatore
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                  Punti
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                  Onda
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={`${entry.username}-${index}`}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="px-4 py-3 text-neutral-900">{index + 1}</td>
                  <td className="px-4 py-3 text-neutral-900">{entry.username}</td>
                  <td className="px-4 py-3 text-neutral-900">{entry.score}</td>
                  <td className="px-4 py-3 text-neutral-900">{entry.wave}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {entry.created_at
                      ? new Date(entry.created_at).toLocaleDateString("it-IT")
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
