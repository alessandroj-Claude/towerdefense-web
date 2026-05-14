export type Locale = "en" | "it";

export const SUPPORTED_LOCALES: Locale[] = ["en", "it"];

export const LOCALE_META: Record<Locale, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "English" },
  it: { flag: "🇮🇹", name: "Italiano" },
};

const KEY = "td.lang";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const val = localStorage.getItem(KEY);
  return (SUPPORTED_LOCALES as string[]).includes(val ?? "")
    ? (val as Locale)
    : "en";
}

export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, locale);
}
