"use client";

import { useSyncExternalStore } from "react";

// Nothing to subscribe to — we only need a value that resolves on the client.
const subscribe = () => () => {};


export function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
