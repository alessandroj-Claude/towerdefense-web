"use client";

import { useState } from "react";

const HEALTH_URL = "https://tower-defense-cj.onrender.com/health";
const ATTEMPTS = 5;
const ATTEMPT_TIMEOUT_MS = 8000;
const RETRY_DELAY_MS = 1500;

type HealthState = "idle" | "checking" | "ok" | "error";

async function fetchHealthOnce(): Promise<boolean> {
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

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getLabel(state: HealthState) {
  if (state === "checking") return "Checking...";
  if (state === "ok") return "DB OK";
  if (state === "error") return "DB offline";
  return "CheckDB";
}

export default function HealthCheckButton() {
  const [state, setState] = useState<HealthState>("idle");

  async function handleClick() {
    setState("checking");

    for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
      if (await fetchHealthOnce()) {
        setState("ok");
        return;
      }

      if (attempt < ATTEMPTS - 1) {
        await wait(RETRY_DELAY_MS);
      }
    }

    setState("error");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === "checking"}
      aria-live="polite"
      aria-busy={state === "checking"}
      className="inline-flex h-11 min-w-32 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 disabled:cursor-wait disabled:opacity-70 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
    >
      {getLabel(state)}
    </button>
  );
}
