"use client";

import { useEffect, useState } from "react";
import {
  login,
  register,
  getSavesMeta,
  getAuthMe,
  getProfileStats,
  getUserRuns,
  getAchievements,
  activateKey,
  shopPurchase,
  getCreditsBalance,
  type LeaderboardEntry,
  type ProfileStatsData,
  type KeyActivateResult,
} from "@/lib/api";
import {
  getAuthState,
  setAuthState,
  clearAuthState,
  getGameAutoLoginEnabled,
  setGameAutoLoginEnabled,
  type AuthState,
} from "@/lib/auth";

const ACHIEVEMENT_CATALOG = [
  { id: "first_blood", name: "First Blood", icon: "⚔️", hidden: false, description: "Completa la tua prima wave" },
  { id: "survivor_10", name: "Survivor", icon: "🛡️", hidden: false, description: "Raggiungi wave 10" },
  { id: "survivor_25", name: "Veteran", icon: "🏅", hidden: false, description: "Raggiungi wave 25" },
  { id: "survivor_50", name: "Elite", icon: "🏆", hidden: false, description: "Raggiungi wave 50" },
  { id: "endless_start", name: "Into the Void", icon: "∞", hidden: false, description: "Completa una run Endless" },
  { id: "endless_wave_20", name: "Endless Runner", icon: "🌀", hidden: false, description: "Sopravvivi a wave 20 in Endless" },
  { id: "endless_wave_50", name: "Infinity Walker", icon: "💫", hidden: true, description: "Sopravvivi a wave 50 in Endless" },
  { id: "score_10k", name: "High Scorer", icon: "💰", hidden: false, description: "Raggiungi score 10.000" },
  { id: "score_50k", name: "Score Master", icon: "💎", hidden: true, description: "Raggiungi score 50.000" },
  { id: "no_lives_lost", name: "Flawless", icon: "✨", hidden: false, description: "Vinci una wave senza perdere vite" },
  { id: "full_lives_win", name: "Perfect Run", icon: "👑", hidden: false, description: "Completa run con vite al massimo" },
  { id: "hard_mode", name: "Hardcore", icon: "🔥", hidden: false, description: "Completa una run in Hard" },
  { id: "synergy_active", name: "Synergist", icon: "🔗", hidden: false, description: "Attiva una synergy tra torri" },
  { id: "all_synergies", name: "Grand Synergist", icon: "🌟", hidden: true, description: "Attiva tutte e 6 le synergy in una run" },
  { id: "sell_tower", name: "Trader", icon: "💱", hidden: false, description: "Vendi una torre" },
  { id: "max_upgrade", name: "Maxed Out", icon: "⬆️", hidden: false, description: "Porta una torre al livello massimo" },
  { id: "boss_kill", name: "Boss Slayer", icon: "🗡️", hidden: false, description: "Sconfiggi un boss" },
  { id: "boss_no_lives_lost", name: "Untouchable", icon: "🛡", hidden: true, description: "Sconfiggi un boss senza perdere vite in quella wave" },
  { id: "daily_complete", name: "Daily Grind", icon: "📅", hidden: false, description: "Completa una Daily Challenge" },
  { id: "weekly_complete", name: "Weekly Warrior", icon: "📆", hidden: false, description: "Completa una Weekly Challenge" },
  { id: "repair_tower", name: "Field Engineer", icon: "🔧", hidden: false, description: "Ripara una torre" },
  { id: "use_powerup", name: "Power User", icon: "⚡", hidden: false, description: "Usa un powerup" },
  { id: "place_10_towers", name: "Builder", icon: "🏗️", hidden: false, description: "Piazza 10 torri in una run" },
  { id: "mutator_run", name: "Mutator", icon: "🎲", hidden: false, description: "Completa una run con almeno un mutator attivo" },
  { id: "comeback", name: "Comeback Kid", icon: "❤️", hidden: false, description: "Vinci una wave con una sola vita rimasta" },
];

const BADGE_LABELS: Record<string, string> = {
  first_run: "Prima run",
  wave_10: "Wave 10",
  hard_survivor: "Hard",
  mutator_trial: "Mutator",
};

const SHOP_CATALOG = [
  { id: "storm_pack", name: "Storm Pack", desc: "Sblocca la Storm Tower.", price: 50 },
  { id: "inferno_pack", name: "Inferno Pack", desc: "Sblocca la Inferno Tower.", price: 50 },
] as const;

export default function AccountPage() {
  const [authState, setAuthStateLocal] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saveMeta, setSaveMeta] = useState<{ exists: boolean; updated_at?: string } | null>(null);
  const [meData, setMeData] = useState<{ user_id: number; username: string; is_admin: boolean; dlcs: string[] } | null>(null);
  const [statsData, setStatsData] = useState<ProfileStatsData | null>(null);
  const [userRuns, setUserRuns] = useState<LeaderboardEntry[] | null>(null);
  const [achievements, setAchievements] = useState<string[] | null>(null);
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [shopBusy, setShopBusy] = useState<string | null>(null);
  const [shopKey, setShopKey] = useState("");
  const [shopKeyBusy, setShopKeyBusy] = useState(false);
  const [shopMessage, setShopMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [gameAutoLogin, setGameAutoLogin] = useState(true);

  const refreshData = async (auth: AuthState) => {
    setBackendUnavailable(false);
    const [meta, me, stats, runs, achs, bal] = await Promise.all([
      getSavesMeta(auth.userId, auth.token),
      getAuthMe(auth.token),
      getProfileStats(auth.token),
      getUserRuns(auth.userId, auth.token, 10),
      getAchievements(auth.userId, auth.token),
      getCreditsBalance(auth.token),
    ]);

    if (meta === null && me === null) {
      setBackendUnavailable(true);
    } else {
      setSaveMeta(meta);
      setMeData(me);
      setStatsData(stats);
      setUserRuns(runs);
      setAchievements(achs);
      if (bal !== null) setCredits(bal.credits);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const auth = getAuthState();
      setGameAutoLogin(getGameAutoLoginEnabled());
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
    setAchievements(null);
    setCredits(null);
    setShopBusy(null);
    setShopKey("");
    setShopKeyBusy(false);
    setShopMessage(null);
    setError("");
  }

  function handleGameAutoLoginChange(enabled: boolean) {
    setGameAutoLogin(enabled);
    setGameAutoLoginEnabled(enabled);
  }

  async function handlePurchase(dlcId: string) {
    if (!authState) return;
    setShopBusy(dlcId);
    setShopMessage(null);

    const { data, status } = await shopPurchase(authState.token, dlcId);
    setShopBusy(null);

    if (status === 402) {
      setShopMessage({ kind: "error", text: "Crediti insufficienti." });
      return;
    }
    if (status === 409) {
      setShopMessage({ kind: "error", text: "DLC già attivato." });
      return;
    }
    if (!data?.ok) {
      setShopMessage({ kind: "error", text: "Acquisto fallito. Riprova." });
      return;
    }

    const item = SHOP_CATALOG.find((c) => c.id === dlcId);
    const me = await getAuthMe(authState.token);
    const nextDlcs = me?.dlcs ?? Array.from(new Set([...authState.dlcs, dlcId]));
    const nextAuth: AuthState = { ...authState, dlcs: nextDlcs };
    setAuthState(nextAuth);
    setAuthStateLocal(nextAuth);
    setMeData(me);
    setCredits(data.credits);
    setShopMessage({
      kind: "ok",
      text: `${item?.name ?? dlcId} sbloccato! Rientra nel gioco per usarlo.`,
    });
  }

  async function handleActivateKey() {
    if (!authState) return;
    const key = shopKey.trim();
    if (!key) {
      setShopMessage({ kind: "error", text: "Inserisci una chiave." });
      return;
    }

    setShopKeyBusy(true);
    setShopMessage(null);
    const result: KeyActivateResult | null = await activateKey(authState.token, key);
    setShopKeyBusy(false);

    if (!result?.ok) {
      setShopMessage({ kind: "error", text: "Chiave non valida." });
      return;
    }

    setShopKey("");

    if (result.type === "credits") {
      const bal = await getCreditsBalance(authState.token);
      if (bal !== null) setCredits(bal.credits);
      const match = result.effect.match(/credits\+(\d+)/);
      const amount = match ? match[1] : "?";
      setShopMessage({ kind: "ok", text: `✦${amount} crediti aggiunti al tuo account!` });
      return;
    }

    if (result.type === "dlc") {
      const me = await getAuthMe(authState.token);
      const nextDlcs = me?.dlcs ?? authState.dlcs;
      const nextAuth: AuthState = { ...authState, dlcs: nextDlcs };
      setAuthState(nextAuth);
      setAuthStateLocal(nextAuth);
      setMeData(me);
      setShopMessage({ kind: "ok", text: "DLC sbloccato! Rientra nel gioco per usarlo." });
      return;
    }

    setShopMessage({ kind: "ok", text: "Chiave attivata." });
  }

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
      </main>
    );
  }

  if (!authState) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-semibold">Account</h1>

        <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex gap-2 border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setMode("login")}
              className={`pb-3 text-sm font-medium transition ${
                mode === "login"
                  ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`pb-3 text-sm font-medium transition ${
                mode === "register"
                  ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                  : "text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 outline-none transition hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 dark:hover:border-neutral-600 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
                placeholder="Your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 outline-none transition hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 dark:hover:border-neutral-600 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
                placeholder="Your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-10">
      <h1 className="text-3xl font-semibold">Account</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">Profile</p>
          <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {authState.username}
            {meData?.is_admin && (
              <span className="ml-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                [Admin]
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            ID: {authState.userId}
          </p>
        </div>

        {/* Game Auto Login */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={gameAutoLogin}
              onChange={(e) => handleGameAutoLoginChange(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900"
            />
            <span>
              <span className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Auto-login nel gioco
              </span>
              <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                Apri direttamente il gioco con questo account quando entri in Play.
              </span>
            </span>
          </label>
        </div>

        {/* Cloud Save Status */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">Cloud Save</p>
          {backendUnavailable ? (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Backend unavailable — try again later
            </p>
          ) : saveMeta ? (
            <>
              <p className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {saveMeta.exists ? "Available" : "Not found"}
              </p>
              {saveMeta.updated_at && (
                <p className="mt-1 text-xs text-neutral-500">
                  {new Date(saveMeta.updated_at).toLocaleDateString()}
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
          )}
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500">Profile Stats</p>
          {backendUnavailable ? (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Backend non raggiungibile</p>
          ) : statsData ? (
            <div className="mt-3 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Lv. {statsData.level}</span>
                <span className="text-sm text-neutral-500">{statsData.total_xp.toLocaleString()} XP</span>
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-800" />
              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-neutral-500">Partite</span>
                <span className="font-medium text-neutral-900 text-right dark:text-neutral-100">{statsData.runs_played}</span>
                <span className="text-neutral-500">Best score</span>
                <span className="font-medium text-neutral-900 text-right dark:text-neutral-100">{statsData.best_score.toLocaleString()}</span>
                <span className="text-neutral-500">Best wave</span>
                <span className="font-medium text-neutral-900 text-right dark:text-neutral-100">{statsData.best_wave}</span>
              </div>
              {statsData.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {statsData.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {BADGE_LABELS[badge] ?? badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Caricamento...</p>
          )}
        </div>
      </div>

      {/* Shop */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Shop</p>
          {credits !== null && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
              ✦ {credits}
            </span>
          )}
        </div>

        {/* DLC catalog */}
        <div className="space-y-2">
          {SHOP_CATALOG.map((item) => {
            const owned =
              authState.dlcs.includes(item.id) ||
              Boolean(meData?.dlcs.includes(item.id));
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
                {owned ? (
                  <span className="shrink-0 text-xs font-medium text-green-600">Attivo</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePurchase(item.id)}
                    disabled={shopBusy === item.id}
                    className="shrink-0 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    {shopBusy === item.id ? "…" : `✦ ${item.price}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Key activation */}
        <div className="mt-5 border-t border-neutral-100 pt-5 dark:border-neutral-800">
          <p className="mb-2 text-xs text-neutral-500">Hai una chiave di attivazione?</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shopKey}
              onChange={(e) => setShopKey(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleActivateKey(); }}
              placeholder="Chiave di attivazione"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 outline-none transition hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:hover:border-neutral-600 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
            />
            <button
              type="button"
              onClick={handleActivateKey}
              disabled={shopKeyBusy}
              className="shrink-0 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {shopKeyBusy ? "…" : "Attiva"}
            </button>
          </div>
        </div>

        {shopMessage && (
          <p
            className={`mt-3 text-xs ${
              shopMessage.kind === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {shopMessage.text}
          </p>
        )}
      </div>

      {/* Run History */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-700 mb-3 dark:text-neutral-300">Partite recenti</p>
        {userRuns === null ? (
          <p className="text-sm text-neutral-500">Storico non disponibile</p>
        ) : userRuns.length === 0 ? (
          <p className="text-sm text-neutral-500">Nessuna partita registrata</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-left text-xs text-neutral-500 dark:border-neutral-800">
                  <th className="pb-2 pr-4 font-medium">Punti</th>
                  <th className="pb-2 pr-4 font-medium">Onda</th>
                  <th className="pb-2 pr-4 font-medium">Difficoltà</th>
                  <th className="pb-2 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {userRuns.map((run, i) => (
                  <tr key={i} className="border-b border-neutral-50 last:border-0 dark:border-neutral-800">
                    <td className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-100">{run.score.toLocaleString()}</td>
                    <td className="py-2 pr-4 text-neutral-700 dark:text-neutral-300">{run.wave}</td>
                    <td className="py-2 pr-4 text-neutral-700 capitalize dark:text-neutral-300">{run.difficulty}</td>
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

      {/* Achievements */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-700 mb-4 dark:text-neutral-300">Obiettivi</p>
        {achievements === null ? (
          <p className="text-sm text-neutral-500">Caricamento...</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {ACHIEVEMENT_CATALOG.map((ach) => {
              const unlocked = achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`group relative flex flex-col items-center justify-center rounded-lg p-3 transition ${
                    unlocked
                      ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  }`}
                  title={unlocked ? ach.description : ""}
                >
                  <div
                    className={`flex items-center justify-center rounded-md w-12 h-12 text-2xl transition ${
                      unlocked ? "bg-white shadow-sm dark:bg-neutral-800" : "bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
                    }`}
                  >
                    {unlocked ? ach.icon : "?"}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium text-center transition line-clamp-2 ${
                      unlocked ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500"
                    }`}
                  >
                    {ach.name}
                  </p>
                  {unlocked && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-neutral-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                      {ach.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => {
            if (authState) refreshData(authState);
          }}
          className="rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600"
        >
          Refresh
        </button>
        <button
          onClick={handleLogout}
          className="rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
