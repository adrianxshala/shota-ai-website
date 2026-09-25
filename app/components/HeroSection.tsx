"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4";
const POSTER_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/130837c4-0244-4f37-9c61-8d801d93fd29.jpg";

export default function HeroSection() {
  const shellRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const foot2Ref = useRef<HTMLSpanElement>(null);
  const navId = useId();

  // (a) The artwork is a video, so reduced motion is honoured by pausing it —
  //     the CSS reset only reaches animations/transitions. Paused, it holds its
  //     first frame, which is the still the loop was built from.
  useEffect(() => {
    const v = videoRef.current;
    if (typeof window === "undefined" || !window.matchMedia || !v) return;
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (q.matches) {
        v.pause();
      } else {
        const p = v.play();
        if (p) p.catch(() => {});
      }
    };
    sync();
    if (q.addEventListener) {
      q.addEventListener("change", sync);
      return () => q.removeEventListener("change", sync);
    }
    // legacy fallback
    q.addListener(sync);
    return () => q.removeListener(sync);
  }, []);

  // (b) The entrance is pure CSS; this only RETIRES it once the last tween has
  //     ended, so a later breakpoint change (which reveals the burger) can never
  //     replay it. One self-removing listener + a 4000ms safety net.
  useEffect(() => {
    const shell = shellRef.current;
    const foot2 = foot2Ref.current;
    if (!shell) return;

    const done = () => {
      window.clearTimeout(timer);
      foot2?.removeEventListener("animationend", done);
      shell.setAttribute("data-entered", "");
    };
    const timer = window.setTimeout(done, 4000);
    foot2?.addEventListener("animationend", done, { once: true });

    return () => {
      window.clearTimeout(timer);
      foot2?.removeEventListener("animationend", done);
    };
  }, []);

  return (
    <section className={styles.shell} ref={shellRef} aria-label="Shota AI hero">
      <video
        className={styles.art}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        poster={POSTER_SRC}
        src={VIDEO_SRC}
        ref={videoRef}
      />
      <div className={styles.veil} />

      <header className={styles.bar}>
        <a className={styles.brand} href="#" aria-label="Shota AI">
          <Image src="/logo%202.png" alt="Shota AI" width={96} height={96} priority />
        </a>

        <input className={styles.navtoggle} type="checkbox" id={navId} />
        <label className={styles.scrim} htmlFor={navId} aria-hidden="true" />
        <label className={styles.burger} htmlFor={navId} aria-label="Menu">
          <svg viewBox="0 0 22 14" aria-hidden="true">
            <path className={styles.b1} d="M1 1 H21" />
            <path className={styles.b2} d="M1 7 H21" />
            <path className={styles.b3} d="M1 13 H21" />
          </svg>
        </label>

        <div className={styles.navpanel}>
          <nav className={styles.menu}>
            <a href="#">
              <span className={styles.about}>About</span>
            </a>
            <a href="#">
              <span className={styles.product}>Product</span>
            </a>
            <a href="#">
              <span className={styles.solutions}>Solutions</span>
              <svg className={styles.caret} viewBox="0 0 9 6" aria-hidden="true">
                <path d="M0.7 1.1 L4.5 4.6 L8.3 1.1" />
              </svg>
            </a>
          </nav>
          <a className={styles.login} href="tel:+38343599558">
            <span className={styles.loginLabel}>+383 43 599 558</span>
            <svg className={styles.navarrow} viewBox="0 0 10 9" aria-hidden="true">
              <path d="M0 4.5 H9.1 M5.4 0.9 L9.2 4.5 L5.4 8.1" />
            </svg>
          </a>
          <a className={styles.pill} href="tel:+38343599558">
            <span className={styles.contact}>Contact us</span>
          </a>
        </div>
      </header>

      <main className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.h1a}>Websites & AI Solutions,</span>
          <span className={styles.h1b}>Built for Business.</span>
        </h1>
        <p className={styles.sub}>
          <span className={styles.sub1}>We design and build websites</span>
          <span className={styles.sub2}>and AI-powered applications.</span>
        </p>
        <a className={styles.cta} href="tel:+38343599558">
          <span className={styles.ctaLabel}>Get started today</span>
          <svg className={styles.arrow} viewBox="0 0 16 11" aria-hidden="true">
            <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
          </svg>
        </a>
        <ul className={styles.feats}>
          <li>
            <svg className={styles.chev} viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span className={styles.f1}>Web development</span>
          </li>
          <li>
            <svg className={styles.chev} viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span className={styles.f2}>AI applications</span>
          </li>
          <li>
            <svg className={styles.chev} viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span className={styles.f3}>Prishtina · Stuttgart</span>
          </li>
          <li>
            <svg className={styles.chev} viewBox="0 0 11 20" aria-hidden="true">
              <path d="M1.15 1.15 L9.6 10 L1.15 18.85" />
            </svg>
            <span className={styles.f4}>+383 43 599 558</span>
          </li>
        </ul>
        <span className={styles.rule} aria-hidden="true" />
      </main>

      <footer className={styles.foot}>
        <Image
          className={styles.footLogo}
          src="/logo%202.png"
          alt="Shota AI"
          width={64}
          height={64}
        />
        <span className={styles.foot1}>Prishtina · Stuttgart — +383 43 599 558</span>
        <span className={styles.foot2} ref={foot2Ref}>
          2024
        </span>
      </footer>
    </section>
  );
}
