"use client";

import { useEffect } from "react";

/**
 * Plays each [data-anim] element's entrance once, when it scrolls into view,
 * by setting data-in. The hidden "before" state only applies once this has
 * mounted (html[data-anim-ready]), so without JS — or with reduced motion —
 * all content is simply visible.
 */
export default function ScrollAnimator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const root = document.documentElement;
    root.setAttribute("data-anim-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
