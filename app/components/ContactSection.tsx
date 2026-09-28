"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { SplitChars, SplitWords, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./ContactSection.module.css";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "./contact";
import { fill } from "./i18n";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { t: Dictionary["contact"]; common: Dictionary["common"] };

type Errors = { name?: string; message?: string };

export default function ContactSection({ t, common }: Props) {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const ids = {
    name: `${uid}-name`,
    business: `${uid}-business`,
    interest: `${uid}-interest`,
    message: `${uid}-message`,
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = t.errorName;
    if (!message) next.message = t.errorMessage;
    setErrors(next);
    if (next.name || next.message) {
      setStatus("");
      (next.name ? nameRef : messageRef).current?.focus();
      return;
    }

    const lines = [
      business ? fill(t.greetingBusiness, { name, business }) : fill(t.greeting, { name }),
      fill(t.interestLine, { interest }),
      "",
      message,
    ];
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setStatus(t.sent);
  }

  return (
    <section id="contact" className={s.section} aria-labelledby="contact-title">
      <div className={`${s.inner} ${styles.layout}`}>
        <div className={styles.intro}>
          <header className={`${s.head} ${s.headStart} ${styles.head}`} data-anim="head">
            <p className={s.eyebrow} data-part="eyebrow">
              {t.eyebrow}
            </p>
            <h2 id="contact-title" className={s.title}>
              <SplitChars text={t.title} />
            </h2>
            <p className={s.lead}>
              <SplitWords text={t.lead} />
            </p>
            <p className={styles.description}>{t.description}</p>
            <p className={styles.statement}>{t.statement}</p>
            <div className={styles.invitation}>
              <p>{t.invitation}</p>
              <a
                className={s.btnPrimary}
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{t.talk}</span>
                <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                  <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
                </svg>
                <span className={s.srOnly}>{common.newTab}</span>
              </a>
            </div>
          </header>

          <ul className={styles.channels}>
            <li data-anim="item" style={stagger(0)}>
              <a
                className={`${s.glass} ${s.lift} ${styles.channel}`}
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={`${styles.channelIcon} ${styles.channelIconAccent}`}>
                  <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 19.5 L5.6 15.9 A8 8 0 1 1 8.4 18.5 Z" />
                    <path d="M9.2 8.6 C9.2 11.6 12 14.6 15.2 14.8 L16 13.4 L14.4 12.6 L13.6 13.4 C12.4 12.9 11.4 11.9 10.9 10.7 L11.7 9.9 L10.9 8.2 Z" />
                  </svg>
                </span>
                <span className={styles.channelBody}>
                  <span className={styles.channelLabel}>WhatsApp</span>
                  <span className={styles.channelValue}>{PHONE_DISPLAY}</span>
                </span>
                <svg className={`${s.arrow} ${styles.channelArrow}`} viewBox="0 0 16 11" aria-hidden="true">
                  <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
                </svg>
                <span className={s.srOnly}>{common.newTab}</span>
              </a>
            </li>
            <li data-anim="item" style={stagger(1)}>
              <a className={`${s.glass} ${s.lift} ${styles.channel}`} href={PHONE_HREF}>
                <span className={styles.channelIcon}>
                  <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 3.8 L9.2 3.5 L10.6 7.6 L8.7 9 C9.6 11.2 11.3 13 13.6 14 L15 12.1 L19.1 13.5 L18.8 16.1 C18.6 17.6 17.3 18.7 15.8 18.6 C9.7 18.1 4.9 13.3 4.4 7.2 C4.3 5.7 5.2 4 6.6 3.8 Z" />
                  </svg>
                </span>
                <span className={styles.channelBody}>
                  <span className={styles.channelLabel}>{t.callUs}</span>
                  <span className={styles.channelValue}>{PHONE_DISPLAY}</span>
                </span>
                <svg className={`${s.arrow} ${styles.channelArrow}`} viewBox="0 0 16 11" aria-hidden="true">
                  <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
                </svg>
              </a>
            </li>
            <li data-anim="item" style={stagger(2)}>
              <div className={`${s.glass} ${styles.channel}`}>
                <span className={styles.channelIcon}>
                  <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21 C12 21 5 14.6 5 9.6 A7 7 0 0 1 19 9.6 C19 14.6 12 21 12 21 Z" />
                    <circle cx="12" cy="9.6" r="2.6" />
                  </svg>
                </span>
                <span className={styles.channelBody}>
                  <span className={styles.channelLabel}>{t.basedIn}</span>
                  <span className={styles.channelValue}>{common.locations.join(" · ")}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <form
          className={`${s.glass} ${styles.form}`}
          data-anim="card"
          style={stagger(1)}
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={`${uid}-form-title`}
        >
          <p id={`${uid}-form-title`} className={styles.formTitle}>
            {t.formTitle}
          </p>
          <p className={styles.formNote}>
            {t.formNote}{" "}
            <span aria-hidden="true">*</span>
            <span className={s.srOnly}>{t.formNoteSr}</span> {t.formNoteEnd}
          </p>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor={ids.name} className={styles.label}>
                {t.name} <span aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id={ids.name}
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                className={styles.input}
                onBlur={(e) =>
                  errors.name && e.target.value.trim() && setErrors((x) => ({ ...x, name: undefined }))
                }
              />
              {errors.name && (
                <p id={`${ids.name}-error`} className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor={ids.business} className={styles.label}>
                {t.business} <span className={styles.optional}>{t.optional}</span>
              </label>
              <input
                id={ids.business}
                name="business"
                type="text"
                autoComplete="organization"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor={ids.interest} className={styles.label}>
              {t.interest}
            </label>
            <div className={styles.selectWrap}>
              <select id={ids.interest} name="interest" className={styles.input} defaultValue={t.interests[0]}>
                {t.interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <svg className={styles.selectCaret} viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1.5 1.8 L6 6.2 L10.5 1.8" />
              </svg>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor={ids.message} className={styles.label}>
              {t.message} <span aria-hidden="true">*</span>
            </label>
            <textarea
              ref={messageRef}
              id={ids.message}
              name="message"
              rows={5}
              required
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? `${ids.message}-error` : undefined}
              className={`${styles.input} ${styles.textarea}`}
              onBlur={(e) =>
                errors.message &&
                e.target.value.trim() &&
                setErrors((x) => ({ ...x, message: undefined }))
              }
            />
            {errors.message && (
              <p id={`${ids.message}-error`} className={styles.error}>
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className={`${s.btnPrimary} ${styles.submit}`}>
            <span>{t.submit}</span>
            <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
              <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
            </svg>
          </button>

          <p className={styles.status} role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
