export type AuthState = {
  token: string;
  userId: number;
  username: string;
  dlcs: string[];
};

const STORAGE_KEY = "td.auth";
const GAME_AUTO_LOGIN_KEY = "td.gameAutoLogin";

export function getAuthState(): AuthState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setAuthState(state: AuthState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearAuthState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getGameAutoLoginEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(GAME_AUTO_LOGIN_KEY) !== "false";
}

export function setGameAutoLoginEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAME_AUTO_LOGIN_KEY, enabled ? "true" : "false");
}
