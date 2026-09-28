import Image from "next/image";
import { stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./SiteFooter.module.css";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "./contact";
import type { Dictionary } from "../[lang]/dictionaries";
import { PrivacyPreferencesButton } from "./CookieConsent";

/** Same order as the dictionary's `footer.nav` labels. */
const NAV = ["#services", "#packages", "#why", "#faq", "#contact"];

const PACKAGES = ["START", "BUSINESS", "PREMIUM BUSINESS"];

type Props = { t: Dictionary["footer"]; common: Dictionary["common"] };

export default function SiteFooter({ t, common }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.rule} aria-hidden="true" data-anim="line" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand} data-anim="item" style={stagger(0)}>
            <a href="#" className={styles.logo} aria-label={t.backToTopLabel}>
              <Image src="/logo%202.png" alt="" width={48} height={48} />
              <span className={styles.wordmark}>SHOTA AI</span>
            </a>
            <p className={styles.tagline}>
              {t.tagline}
            </p>
            <a
              className={s.btnPrimary}
              href={whatsappLink(t.startMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.start}</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}>{t.startSr}</span>
            </a>
          </div>

          <nav className={styles.col} aria-labelledby="footer-nav" data-anim="item" style={stagger(1)}>
            <h2 id="footer-nav" className={styles.colTitle}>
              {t.explore}
            </h2>
            <ul>
              {NAV.map((href, i) => (
                <li key={href}>
                  <a className={styles.navLink} href={href}>
                    {t.nav[i]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col} data-anim="item" style={stagger(2)}>
            <h2 className={styles.colTitle}>{t.packages}</h2>
            <ul>
              {PACKAGES.map((p) => (
                <li key={p}>
                  <a className={styles.navLink} href="#packages">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col} data-anim="item" style={stagger(3)}>
            <h2 className={styles.colTitle}>{t.contact}</h2>
            <ul>
              <li>
                <a className={styles.navLink} href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  className={styles.navLink}
                  href={whatsappLink(t.hello)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp<span className={s.srOnly}>{common.newTab}</span>
                </a>
              </li>
              <li className={styles.plain}>{common.locations.join(" · ")}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <PrivacyPreferencesButton />
          <p>© {year} Shota AI. {t.rights}</p>
          <a className={styles.toTop} href="#">
            {t.backToTop}
            <svg viewBox="0 0 11 14" aria-hidden="true">
              <path d="M5.5 13 V1.4 M1.2 5.6 L5.5 1.2 L9.8 5.6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
