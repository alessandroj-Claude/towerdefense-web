"use client";

import { useEffect } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
  "https://tower-defense-cj.onrender.com";

export default function WakeupPing() {
  useEffect(() => {
    fetch(`${BACKEND_URL}/health`, { method: "GET" }).catch(() => {});
  }, []);

  return null;
}
