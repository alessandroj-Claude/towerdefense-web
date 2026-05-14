"use client";
import { useEffect, useRef, useState } from "react";
import {
  getLocale,
  setLocale,
  SUPPORTED_LOCALES,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n";

interface Props {
  compact?: boolean;
}

export function LanguageToggle({ compact = false }: Props) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocaleState(getLocale());
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function select(l: Locale) {
    setLocale(l);
    setLocaleState(l);
    setOpen(false);
  }

  const meta = LOCALE_META[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full px-2 py-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        aria-label="Change language"
        title="Change language"
      >
        {compact
          ? `${meta.flag} ▾`
          : `${meta.flag} ${locale.toUpperCase()} ▾`}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[130px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
          {SUPPORTED_LOCALES.map((l) => {
            const m = LOCALE_META[l];
            return (
              <button
                key={l}
                onClick={() => select(l)}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                  l === locale
                    ? "font-semibold text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <span>
                  {m.flag} {m.name}
                </span>
                {l === locale && (
                  <span className="text-emerald-500 dark:text-emerald-400">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
