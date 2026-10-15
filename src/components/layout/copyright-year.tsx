"use client";

import { useSyncExternalStore } from "react";

// Nothing to subscribe to — we only need a value that resolves on the client.
const subscribe = () => () => {};

/**
 * Renders the current year in the footer.
 *
 * Constraints this navigates:
 *  - Cache Components flags `new Date()` read during render (it would otherwise
 *    be frozen at prerender time).
 *  - The React lint rules flag calling `setState` synchronously in an effect.
 *
 * `useSyncExternalStore` sidesteps both: the server snapshot is `null` (empty in
 * the prerendered HTML) and the client snapshot returns the live year, with no
 * hydration mismatch.
 */
export function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
