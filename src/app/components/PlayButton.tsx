"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchHealthOnce } from "@/lib/health";

type CheckState = "idle" | "checking" | "ok" | "error";

interface Props {
  label?: string;
}

export function PlayButton({ label = "Play" }: Props) {
  const [state, setState] = useState<CheckState>("idle");
  const router = useRouter();

  async function handleClick() {
    if (state === "checking") return;
    setState("checking");
    const ok = await fetchHealthOnce();
    if (ok) {
      setState("ok");
      window.setTimeout(() => router.push("/play"), 600);
    } else {
      setState("error");
    }
  }

  function getLabel(): string {
    if (state === "checking") return `${label} (checking...)`;
    if (state === "ok") return `${label} (check OK)`;
    if (state === "error") return `${label} (server offline)`;
    return label;
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={state === "checking" || state === "ok"}
        aria-live="polite"
        aria-busy={state === "checking"}
        className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-wait disabled:opacity-80 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {getLabel()}
      </button>
      {state === "error" && (
        <a
          href="/play"
          className="text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          Gioca comunque →
        </a>
      )}
    </div>
  );
}
