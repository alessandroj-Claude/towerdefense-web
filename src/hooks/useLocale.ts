"use client";
import { useEffect, useState } from "react";
import { getLocale, type Locale } from "@/lib/i18n";

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") return getLocale();
    return "en";
  });

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "td.lang") setLocale(getLocale());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return locale;
}
