const HEALTH_URL = "https://tower-defense-cj.onrender.com/health";
const ATTEMPT_TIMEOUT_MS = 8000;

export async function fetchHealthOnce(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);

  try {
    const response = await fetch(HEALTH_URL, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as { status?: unknown };
    return data?.status === "ok";
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
