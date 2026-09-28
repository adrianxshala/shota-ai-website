"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { CONSENT_COOKIE, CONSENT_MAX_AGE, ESSENTIAL_ONLY, parseConsent, serializeConsent, type Consent } from "./consent";
import { privacyCopy } from "./privacy-copy";
import type { Locale } from "./i18n";
import styles from "./CookieConsent.module.css";

const CHANGE_EVENT = "shota:consent-change";
let visitChoice: string | undefined;

function readCookie() {
  try {
    return document.cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`))?.slice(CONSENT_COOKIE.length + 1) ?? "";
  } catch { return ""; }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("focus", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("focus", callback);
  };
}

const PrivacyContext = createContext<{ consent: Consent; open: () => void; label: string } | null>(null);

/** Future optional integrations must check this consent before loading their scripts. */
export function useCookieConsent() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("useCookieConsent requires CookieConsentProvider");
  return context;
}

export function PrivacyPreferencesButton() {
  const { open, label } = useCookieConsent();
  return <button type="button" data-privacy-preferences className={styles.footerLink} onClick={open}>{label}</button>;
}

export default function CookieConsentProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = privacyCopy[lang];
  const raw = useSyncExternalStore(subscribe, () => visitChoice ?? readCookie(), () => undefined);
  const saved = useMemo(() => raw ? parseConsent(raw) : null, [raw]);
  const [draft, setDraft] = useState<Consent>(ESSENTIAL_ONLY);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), 7000);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (element?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function open() {
    if (!dialog.current || dialog.current.open) return;
    setDraft(saved ?? ESSENTIAL_ONLY);
    setStatus("");
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
  }

  function onClose() {
    document.body.style.overflow = previousOverflow.current;
    if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    else document.querySelector<HTMLButtonElement>("[data-privacy-preferences]")?.focus({ preventScroll: true });
  }

  function save(choice: Consent) {
    const value = serializeConsent(choice);
    try {
      document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    } catch { /* Keep a visit-only choice when browser storage is unavailable. */ }
    const persisted = readCookie() === value;
    visitChoice = persisted ? undefined : value;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    dialog.current?.close();
    setStatus(persisted ? t.saved : t.sessionOnly);
  }

  return (
    <PrivacyContext.Provider value={{ consent: saved ?? ESSENTIAL_ONLY, open, label: t.preferences }}>
      {children}
      {raw !== undefined && !saved && (
        <section className={styles.banner} aria-labelledby="cookie-heading" aria-describedby="cookie-intro">
          <div className={styles.eyebrow}><span aria-hidden="true">✳</span> {t.eyebrow}</div>
          <h2 id="cookie-heading">{t.title}</h2>
          <p id="cookie-intro">{t.intro}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => save(ESSENTIAL_ONLY)}>{t.reject}</button>
            <button type="button" className={styles.button} onClick={() => save({ necessary: true, analytics: true, marketing: true })}>{t.accept}</button>
          </div>
          <button type="button" className={styles.manage} onClick={open}>{t.manage}<span aria-hidden="true">↗</span></button>
        </section>
      )}
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="privacy-heading" aria-describedby="privacy-description" onClose={onClose}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <button type="button" className={styles.close} aria-label={t.close} onClick={() => dialog.current?.close()}>×</button>
        </div>
        <h2 id="privacy-heading">{t.preferences}</h2>
        <p id="privacy-description">{t.description}</p>
        <div className={styles.categories}>
          <div className={styles.category}>
            <div className={styles.categoryHeading}><h3>{t.necessary}</h3><span className={styles.always}>{t.always}</span></div>
            <p>{t.necessaryDescription}</p>
          </div>
          {(["analytics", "marketing"] as const).map((key) => (
            <div className={styles.category} key={key}>
              <div className={styles.categoryHeading}>
                <label htmlFor={`consent-${key}`}>{t[key]}</label>
                <input id={`consent-${key}`} className={styles.toggle} type="checkbox" role="switch" checked={draft[key]} aria-describedby={`consent-${key}-description`} onChange={(event) => setDraft({ ...draft, [key]: event.target.checked })} />
              </div>
              <p id={`consent-${key}-description`}>{t[`${key}Description`]}</p>
            </div>
          ))}
        </div>
        <p className={styles.note}>{t.note}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => save(ESSENTIAL_ONLY)}>{t.reject}</button>
          <button type="button" className={`${styles.button} ${styles.primary}`} onClick={() => save(draft)}>{t.save}</button>
        </div>
      </dialog>
      <div role="status" className={styles.status}>{status && <span>{status}</span>}</div>
    </PrivacyContext.Provider>
  );
}
