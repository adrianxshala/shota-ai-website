import { SplitChars, SplitWords, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./WhySection.module.css";
import { whatsappLink } from "./contact";

const REASONS = [
  {
    title: "Clear, one-time pricing",
    text: "Every package has a fixed one-time price. Monthly hosting is shown separately, so you know exactly what you pay.",
  },
  {
    title: "The essentials, included",
    text: "Domain, hosting, SSL, WhatsApp integration, Google Maps and basic SEO come with every package.",
  },
  {
    title: "Mobile-friendly by default",
    text: "Every package includes a website that works well on phones as well as on desktop.",
  },
  {
    title: "Websites and AI in one place",
    text: "We build both websites and AI-powered applications, so you can grow with one team.",
  },
  {
    title: "Direct contact",
    text: "Message us on WhatsApp or call us. You can talk through your project before choosing a package.",
  },
  {
    title: "Prishtina & Stuttgart",
    text: "Based in two cities, working with businesses that want a professional presence online.",
  },
];

export default function WhySection() {
  return (
    <section id="why" className={s.section} aria-labelledby="why-title">
      <div className={`${s.inner} ${styles.layout}`}>
        <header className={`${s.head} ${s.headStart} ${styles.intro}`} data-anim="head">
          <p className={s.eyebrow} data-part="eyebrow">
            Why Shota AI
          </p>
          <h2 id="why-title" className={s.title}>
            <SplitChars text="A professional presence, without the guesswork." />
          </h2>
          <p className={s.lead}>
            <SplitWords text="Transparent packages, the essentials included, and a team you can reach directly." />
          </p>
          <div className={styles.actions} data-part="after">
            <a
              className={s.btnPrimary}
              href={whatsappLink("Hello! I'd like to talk about a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Talk to us on WhatsApp</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}> — opens in a new tab</span>
            </a>
            <a className={s.btn} href="#packages">
              See packages
            </a>
          </div>
        </header>

        <ol className={styles.list}>
          {REASONS.map((r, i) => (
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
