import Image from "next/image";
import { stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./SiteFooter.module.css";
import { LOCATIONS, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "./contact";

const NAV = [
  { href: "#services", label: "What we do" },
  { href: "#packages", label: "Packages" },
  { href: "#why", label: "Why Shota AI" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const PACKAGES = ["START — €149", "BUSINESS — €349", "PREMIUM BUSINESS — €699"];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.rule} aria-hidden="true" data-anim="line" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand} data-anim="item" style={stagger(0)}>
            <a href="#" className={styles.logo} aria-label="Shota AI — back to top">
              <Image src="/logo%202.png" alt="" width={48} height={48} />
              <span className={styles.wordmark}>SHOTA AI</span>
            </a>
            <p className={styles.tagline}>
              Websites and AI-powered applications for businesses. Based in Prishtina and
              Stuttgart.
            </p>
            <a
              className={s.btnPrimary}
              href={whatsappLink("Hello! I'd like to start a project with Shota AI.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Start a project</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}> on WhatsApp — opens in a new tab</span>
            </a>
          </div>

          <nav className={styles.col} aria-labelledby="footer-nav" data-anim="item" style={stagger(1)}>
            <h2 id="footer-nav" className={styles.colTitle}>
              Explore
            </h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a className={styles.navLink} href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col} data-anim="item" style={stagger(2)}>
            <h2 className={styles.colTitle}>Packages</h2>
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
            <h2 className={styles.colTitle}>Contact</h2>
            <ul>
              <li>
                <a className={styles.navLink} href={PHONE_HREF}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  className={styles.navLink}
                  href={whatsappLink("Hello!")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp<span className={s.srOnly}> — opens in a new tab</span>
                </a>
              </li>
              <li className={styles.plain}>{LOCATIONS.join(" · ")}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Shota AI. All rights reserved.</p>
          <a className={styles.toTop} href="#">
            Back to top
            <svg viewBox="0 0 11 14" aria-hidden="true">
              <path d="M5.5 13 V1.4 M1.2 5.6 L5.5 1.2 L9.8 5.6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
