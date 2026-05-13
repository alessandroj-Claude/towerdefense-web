"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuthState } from "@/lib/auth";

const BASE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/news", label: "News" },
  { href: "/account", label: "Account" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [accountLabel, setAccountLabel] = useState("Account");

  useEffect(() => {
    const auth = getAuthState();
    if (auth?.username) setAccountLabel(auth.username);
  }, []);

  const links = BASE_LINKS.map((l) =>
    l.href === "/account" ? { ...l, label: accountLabel } : l
  );

  return (
    <div className="flex items-center gap-2 text-sm">
      {links.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-3 py-1.5 transition ${
              isActive
                ? "bg-neutral-100 font-medium text-neutral-900"
                : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
