import s from "./shared.module.css";
import styles from "./FaqSection.module.css";
import { PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "./contact";

const FAQS = [
  {
    q: "Is the package price a one-time payment?",
    a: "Yes. The package price — €149 for START, €349 for BUSINESS or €699 for PREMIUM BUSINESS — is a one-time payment for your website. Hosting is billed separately each month after the initial period.",
  },
  {
    q: "How much does hosting cost?",
    a: "Hosting is €5.99/month for START, €13.99/month for BUSINESS and €29.99/month for PREMIUM BUSINESS, after the initial period. Message us on WhatsApp for details about the initial period.",
  },
  {
    q: "What is included in every package?",
    a: "Every package includes a domain, hosting, SSL, WhatsApp integration, Google Maps, basic SEO and a website that works well on mobile.",
  },
  {
    q: "Which package is right for my business?",
    a: "START is a one-page website with your business information, services, photos and contact details. BUSINESS is a multi-page website with custom design, a gallery, social media links and support. PREMIUM BUSINESS adds professional photography and video, with a visit to your business.",
  },
  {
    q: "Will my business show up on Google?",
    a: "Every package includes basic Google SEO and Google Maps integration, which help customers find your business online.",
  },
  {
    q: "Do you also build AI applications?",
    a: "Yes. Alongside websites, we design and build AI-powered applications. Tell us what you have in mind and we will talk it through with you.",
  },
  {
    q: "How do I get started?",
    a: "Choose a package and tap its button — WhatsApp opens with your package already mentioned. You can also call us or use the contact form below.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className={s.section} aria-labelledby="faq-title">
      <div className={`${s.inner} ${styles.layout}`}>
        <header className={`${s.head} ${s.headStart} ${styles.intro} ${s.reveal}`}>
          <p className={s.eyebrow}>FAQ</p>
          <h2 id="faq-title" className={s.title}>
            Questions, answered.
          </h2>
          <p className={s.lead}>Everything you need to know before choosing a package.</p>
        </header>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <details key={f.q} className={styles.item} name="faq" open={i === 0}>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>

        <aside className={`${s.glass} ${styles.help}`} aria-label="More questions">
            <p className={styles.helpTitle}>Still have a question?</p>
            <p className={styles.helpText}>
              Message us on WhatsApp or call{" "}
              <a className={s.link} href={PHONE_HREF}>
                {PHONE_DISPLAY}
              </a>
              .
            </p>
            <a
              className={s.btn}
              href={whatsappLink("Hello! I have a question about your packages.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Ask on WhatsApp</span>
              <svg className={s.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={s.srOnly}> — opens in a new tab</span>
            </a>
        </aside>
      </div>
    </section>
  );
}
