"use client";

import { useEffect, useState } from "react";
import { login, register, getSavesMeta, getAuthMe, getProfileStats, getUserRuns, type LeaderboardEntry } from "@/lib/api";
import { getAuthState, setAuthState, clearAuthState, type AuthState } from "@/lib/auth";

export default function AccountPage() {
  const [authState, setAuthStateLocal] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saveMeta, setSaveMeta] = useState<{ exists: boolean; updated_at?: string } | null>(null);
  const [meData, setMeData] = useState<{ user_id: number; username: string; is_admin: boolean; dlcs: string[] } | null>(null);
  const [statsData, setStatsData] = useState<unknown>(null);
  const [userRuns, setUserRuns] = useState<LeaderboardEntry[] | null>(null);
  const [backendUnavailable, setBackendUnavailable] = useState(false);

  const refreshData = async (auth: AuthState) => {
    setBackendUnavailable(false);
    const [meta, me, stats, runs] = await Promise.all([
      getSavesMeta(auth.userId, auth.token),
      getAuthMe(auth.token),
      getProfileStats(auth.token),
      getUserRuns(auth.userId, auth.token, 10),
    ]);

    if (meta === null && me === null) {
      setBackendUnavailable(true);
    } else {
      setSaveMeta(meta);
      setMeData(me);
      setStatsData(stats);
      setUserRuns(runs);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const auth = getAuthState();
      setAuthStateLocal(auth);

      if (auth) {
        await refreshData(auth);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const fn = mode === "login" ? login : register;
    const result = await fn(username, password);

    if (!result) {
      setError(mode === "login" ? "Login failed. Check credentials or try again." : "Registration failed. Username may exist.");
      return;
    }

    const newAuth: AuthState = {
      token: result.access_token,
      userId: result.user_id,
      username: result.username,
      dlcs: result.dlcs,
    };
    setAuthState(newAuth);
    setAuthStateLocal(newAuth);
    setUsername("");
    setPassword("");
    setError("");
    refreshData(newAuth);
  }

  function handleLogout() {
    clearAuthState();
    setAuthStateLocal(null);
    setSaveMeta(null);
    setMeData(null);
    setStatsData(null);
    setUserRuns(null);
    setError("");
  }

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="text-neutral-600">Loading...</p>
      </main>
    );
  }

  if (!authState) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-semibold">Account</h1>

        <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="mb-6 flex gap-2 border-b border-neutral-200">
            <button
              onClick={() => setMode("login")}
              className={`pb-3 text-sm font-medium transition ${
                mode === "login"
                  ? "border-b-2 border-neutral-900 text-neutral-900"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`pb-3 text-sm font-medium transition ${
                mode === "register"
                  ? "border-b-2 border-neutral-900 text-neutral-900"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 outline-none transition hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                placeholder="Your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 outline-none transition hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                placeholder="Your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const dlcStormActive = authState.dlcs.includes("storm");
  const dlcInfernoActive = authState.dlcs.includes("inferno");

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
      <h1 className="text-3xl font-semibold">Account</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-500">Profile</p>
          <p className="mt-2 text-lg font-semibold text-neutral-900">
            {authState.username}
            {meData?.is_admin && (
              <span className="ml-2 text-xs font-medium text-neutral-600">
                [Admin]
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            ID: {authState.userId}
          </p>
        </div>

        {/* Cloud Save Status */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-500">Cloud Save</p>
          {backendUnavailable ? (
            <p className="mt-2 text-sm text-neutral-600">
              Backend unavailable — try again later
            </p>
          ) : saveMeta ? (
            <>
              <p className="mt-2 text-base font-semibold text-neutral-900">
                {saveMeta.exists ? "Available" : "Not found"}
              </p>
              {saveMeta.updated_at && (
                <p className="mt-1 text-xs text-neutral-500">
                  {new Date(saveMeta.updated_at).toLocaleDateString()}
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-neutral-600">Loading...</p>
          )}
        </div>

        {/* DLC Status */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-500">DLC</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">Storm Pack</span>
              <span
                className={`text-xs font-medium ${
                  dlcStormActive ? "text-green-600" : "text-neutral-500"
                }`}
              >
                {dlcStormActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">Inferno Pack</span>
              <span
                className={`text-xs font-medium ${
                  dlcInfernoActive ? "text-green-600" : "text-neutral-500"
                }`}
              >
                {dlcInfernoActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-500">Profile Stats</p>
          {backendUnavailable ? (
            <p className="mt-2 text-sm text-neutral-600">
              Backend unavailable — try again later
            </p>
          ) : statsData ? (
            <p className="mt-2 text-sm text-neutral-900">
              {JSON.stringify(statsData).slice(0, 60)}...
            </p>
          ) : (
            <p className="mt-2 text-sm text-neutral-600">
              Profile stats unavailable
            </p>
          )}
        </div>
      </div>

      {/* Run History */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-700 mb-3">Partite recenti</p>
        {userRuns === null ? (
          <p className="text-sm text-neutral-500">Storico non disponibile</p>
        ) : userRuns.length === 0 ? (
          <p className="text-sm text-neutral-500">Nessuna partita registrata</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-left text-xs text-neutral-500">
                  <th className="pb-2 pr-4 font-medium">Punti</th>
                  <th className="pb-2 pr-4 font-medium">Onda</th>
                  <th className="pb-2 pr-4 font-medium">Difficoltà</th>
                  <th className="pb-2 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {userRuns.map((run, i) => (
                  <tr key={i} className="border-b border-neutral-50 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-neutral-900">{run.score.toLocaleString()}</td>
                    <td className="py-2 pr-4 text-neutral-700">{run.wave}</td>
                    <td className="py-2 pr-4 text-neutral-700 capitalize">{run.difficulty}</td>
                    <td className="py-2 text-neutral-500">
                      {run.created_at ? new Date(run.created_at).toLocaleDateString("it-IT") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => {
            if (authState) refreshData(authState);
          }}
          className="rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-400"
        >
          Refresh
        </button>
        <button
          onClick={handleLogout}
          className="rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
