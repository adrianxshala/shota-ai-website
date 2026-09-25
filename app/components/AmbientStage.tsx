"use client";

import { useEffect, useRef, type ReactNode } from "react";
import LiquidLens from "./LiquidLens";
import s from "./shared.module.css";
import styles from "./AmbientStage.module.css";

/**
 * One continuous, living background for every section after the hero.
 *
 * A sticky full-viewport stage sits behind all the sections. On it, blue and
 * gold light (the hero's palette) drifts nonstop, two light-trail arcs turn
 * slowly, and — on pointer devices — a soft spotlight follows the cursor while
 * the whole light field shifts a little with the pointer and with scroll.
 * Glass cards pick up a cursor-tracked highlight on their rim.
 *
 * Reduced motion: everything holds a composed, static state.
 */
export default function AmbientStage({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const field = fieldRef.current;
    const spot = spotRef.current;
    if (!wrap || !field || !spot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // pause everything while the stage is fully off-screen (e.g. on the hero)
    const io = new IntersectionObserver(([e]) => {
      wrap.toggleAttribute("data-live", e.isIntersecting);
    });
    io.observe(wrap);

    if (reduce.matches) return () => io.disconnect();

    // --- pointer + scroll, eased in one rAF loop that only runs while moving
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.4, sp: 0 };
    const cur = { ...target };
    let raf = 0;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.sp += (target.sp - cur.sp) * 0.1;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = cur.x / w - 0.5; // -0.5 … 0.5
      const ny = cur.y / h - 0.5;

      spot.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      field.style.transform = `translate3d(${nx * -36}px, ${ny * -28 - cur.sp * 90}px, 0)`;

      const settled =
        Math.abs(target.x - cur.x) < 0.3 &&
        Math.abs(target.y - cur.y) < 0.3 &&
        Math.abs(target.sp - cur.sp) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      target.sp = Math.min(1, Math.max(0, -r.top / total));
      kick();
    };

    // cursor-tracked rim highlight on the glass card under the pointer
    let lastCard: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (!finePointer.matches) return;
      target.x = e.clientX;
      target.y = e.clientY;
      wrap.setAttribute("data-pointer", "");
      kick();

      const card = (e.target as Element | null)?.closest?.(`.${s.glass}`) as HTMLElement | null;
      if (lastCard && lastCard !== card) lastCard.removeAttribute("data-lit");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
        card.setAttribute("data-lit", "");
      }
      lastCard = card;
    };
    const onLeave = () => {
      wrap.removeAttribute("data-pointer");
      lastCard?.removeAttribute("data-lit");
      lastCard = null;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <LiquidLens />
      <div className={styles.track} aria-hidden="true">
        <div className={styles.stage}>
          <div ref={fieldRef} className={styles.field}>
            <span className={`${styles.orb} ${styles.orbBlue}`} />
            <span className={`${styles.orb} ${styles.orbGold}`} />
            <span className={`${styles.orb} ${styles.orbDeep}`} />
            <span className={`${styles.orb} ${styles.orbCyan}`} />
            <span className={`${styles.orb} ${styles.orbAmber}`} />
            <span className={`${styles.arc} ${styles.arcA}`} />
            <span className={`${styles.arc} ${styles.arcB}`} />
          </div>
          <span ref={spotRef} className={styles.spot} />
          <span className={styles.vignette} />
          <span className={styles.grain} />
        </div>
        {/* soft hand-off from the hero's bottom edge */}
        <span className={styles.seam} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
