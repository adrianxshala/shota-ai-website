import { SplitChars, SplitWords, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./WhySection.module.css";
import { whatsappLink } from "./contact";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { t: Dictionary["why"]; common: Dictionary["common"] };

export default function WhySection({ t, common }: Props) {
  return (
    <section id="why" className={s.section} aria-labelledby="why-title">
      <div className={`${s.inner} ${styles.layout}`}>
        <header className={`${s.head} ${s.headStart} ${styles.intro}`} data-anim="head">
          <p className={s.eyebrow} data-part="eyebrow">
            {t.eyebrow}
          </p>
          <h2 id="why-title" className={s.title}>
            <SplitChars text={t.title} />
          </h2>
          <p className={s.lead}>
            <SplitWords text={t.lead} />
          </p>
          <div className={styles.actions} data-part="after">
            <a
              className={s.btnPrimary}
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.whatsapp}</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}>{common.newTab}</span>
            </a>
            <a className={s.btn} href="#packages">
              {t.seePackages}
            </a>
          </div>
        </header>

        <ol className={styles.list}>
          {t.reasons.map((r, i) => (
            <li key={r.title} className={styles.item} data-anim="item" style={stagger(i % 2)}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.name}>{r.title}</h3>
              <p className={styles.text}>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
