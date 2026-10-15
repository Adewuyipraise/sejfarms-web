"use client";

import { useEffect } from "react";

/**
 * Opens the `<details>` element whose `id` matches the current URL hash and
 * scrolls it into view. This makes deep links like `/services#training-development`
 * land on an expanded group instead of a collapsed one.
 *
 * Renders nothing; it only bolts behaviour onto server-rendered markup.
 */
export function HashDetailsOpener() {
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return null;
}
