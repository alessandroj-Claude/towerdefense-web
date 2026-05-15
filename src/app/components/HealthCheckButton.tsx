"use client";

import { useState } from "react";
import { fetchHealthOnce, wait } from "@/lib/health";

const ATTEMPTS = 5;
const RETRY_DELAY_MS = 1500;

type HealthState = "idle" | "checking" | "ok" | "error";

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
