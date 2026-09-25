"use client";

import { useEffect } from "react";

/**
 * On desktop the pricing cards share rows (subgrid), so opening one card's
 * "View all features" would leave empty space in its neighbours. Mirroring the
 * state across all cards turns it into a side-by-side comparison instead.
 * Mobile (stacked cards) keeps each disclosure independent.
 */
export default function FeatureListSync({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const desktop = window.matchMedia("(min-width: 960px)");

    const onToggle = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLDetailsElement) || !desktop.matches) return;
      root.querySelectorAll("details").forEach((d) => {
        // only write when different, so the mirrored toggles don't loop
        if (d !== target && d.open !== target.open) d.open = target.open;
      });
    };

    // `toggle` does not bubble — listen in the capture phase
    root.addEventListener("toggle", onToggle, true);
    return () => root.removeEventListener("toggle", onToggle, true);
  }, [rootId]);

  return null;
}
