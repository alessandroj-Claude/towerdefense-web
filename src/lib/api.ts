const BACKEND_URL =
  (typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim()) ||
  "https://tower-defense-cj.onrender.com";

export type LoginResult = {
  access_token: string;
  user_id: number;
  username: string;
  dlcs: string[];
};

export type ProfileStatsData = {
  total_xp: number;
  runs_played: number;
  best_score: number;
  best_wave: number;
  badges: string[];
  level: number;
};

async function fetchJson<T>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T | null> {
  const { timeout = 8000, ...fetchOpts } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...fetchOpts,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function login(
  username: string,
  password: string
): Promise<LoginResult | null> {
  return fetchJson<LoginResult>(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function register(
  username: string,
  password: string
): Promise<LoginResult | null> {
  return fetchJson<LoginResult>(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function getSavesMeta(
  userId: number,
  token: string
): Promise<{ exists: boolean; updated_at?: string } | null> {
  return fetchJson<{ exists: boolean; updated_at?: string }>(
    `${BACKEND_URL}/saves/${userId}/meta`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function getAuthMe(
  token: string
): Promise<{ user_id: number; username: string; is_admin: boolean; dlcs: string[] } | null> {
  return fetchJson<{
    user_id: number;
    username: string;
    is_admin: boolean;
    dlcs: string[];
  }>(`${BACKEND_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getProfileStats(
  token: string
): Promise<ProfileStatsData | null> {
  return fetchJson<ProfileStatsData>(`${BACKEND_URL}/profile/stats`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export type LeaderboardEntry = {
  username: string;
  score: number;
  wave: number;
  difficulty: string;
  version?: string | null;
  mutators?: string[];
  score_mult?: number;
  created_at?: string | null;
};

export async function getLeaderboard(
  difficulty: string = "normal",
  limit: number = 20
): Promise<LeaderboardEntry[] | null> {
  return fetchJson<LeaderboardEntry[]>(
    `${BACKEND_URL}/leaderboard/global?difficulty=${encodeURIComponent(difficulty)}&limit=${limit}`
  );
}

export async function getUserRuns(
  userId: number,
  token: string,
  limit: number = 10
): Promise<LeaderboardEntry[] | null> {
  return fetchJson<LeaderboardEntry[]>(
    `${BACKEND_URL}/leaderboard/user/${userId}?limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export async function getAchievements(
  userId: number,
  token: string
): Promise<string[]> {
  const res = await fetchJson<string[]>(
    `${BACKEND_URL}/achievements/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res || [];
}

async function fetchJsonWithStatus<T>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<{ data: T | null; status: number | null }> {
  const { timeout = 8000, ...fetchOpts } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...fetchOpts, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) return { data: null, status: res.status };
    return { data: (await res.json()) as T, status: res.status };
  } catch {
    return { data: null, status: null };
  }
}

export async function getCreditsBalance(
  token: string
): Promise<{ credits: number } | null> {
  return fetchJson<{ credits: number }>(`${BACKEND_URL}/credits/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function shopPurchase(
  token: string,
  dlcId: string
): Promise<{ data: { ok: boolean; credits: number } | null; status: number | null }> {
  return fetchJsonWithStatus<{ ok: boolean; credits: number }>(
    `${BACKEND_URL}/shop/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ dlc_id: dlcId }),
    }
  );
}

export type KeyActivateResult = {
  ok: boolean;
  type: string;
  effect: string;
  credits: number;
};

export async function activateKey(
  token: string,
  key: string
): Promise<KeyActivateResult | null> {
  return fetchJson<KeyActivateResult>(`${BACKEND_URL}/key/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key }),
  });
}
