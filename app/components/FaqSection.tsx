import { SplitChars, SplitWords, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./FaqSection.module.css";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "./contact";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { t: Dictionary["faq"]; common: Dictionary["common"] };

export default function FaqSection({ t, common }: Props) {
  return (
    <section id="faq" className={s.section} aria-labelledby="faq-title">
      <div className={`${s.inner} ${styles.layout}`}>
        <header className={`${s.head} ${s.headStart} ${styles.intro}`} data-anim="head">
          <p className={s.eyebrow} data-part="eyebrow">
            {t.eyebrow}
          </p>
          <h2 id="faq-title" className={s.title}>
            <SplitChars text={t.title} />
          </h2>
          <p className={s.lead}>
            <SplitWords text={t.lead} />
          </p>
        </header>

        <div className={styles.list}>
          {t.items.map((f, i) => (
            <details
              key={f.q}
              className={styles.item}
              name="faq"
              open={i === 0}
              data-anim="item"
              style={stagger(i)}
            >
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>

        <aside className={`${s.glass} ${styles.help}`} aria-label={t.helpLabel} data-anim="card" style={stagger(2)}>
            <p className={styles.helpTitle}>{t.helpTitle}</p>
            <p className={styles.helpText}>
              {t.helpText}{" "}
              <a className={s.link} href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </a>
              .
            </p>
            <a
              className={s.btn}
              href={whatsappLink(t.helpMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.helpButton}</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}>{common.newTab}</span>
            </a>
        </aside>
      </div>
    </section>
  );
}
