"use client";

import { useEffect, useState } from "react";

export function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Server render + first client render show nothing (or a stable fallback).
  // The year appears after hydration, avoiding any SSR/client mismatch.
  return <>{year ?? "2026"}</>;
}