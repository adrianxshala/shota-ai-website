import type { ReactNode } from "react";
import { SplitChars, SplitWords, idx, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./ServicesSection.module.css";

type Service = {
  title: string;
  text: string;
  tags: string[];
  icon: ReactNode;
  accent?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Business websites",
    text: "One-page and multi-page websites that present your services, pricing, photos and contact details clearly.",
    tags: ["One-page", "Multi-page", "Gallery"],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2.5" />
        <path d="M3 8.5 H21 M7 20.5 H17" />
      </>
    ),
  },
  {
    title: "AI applications",
    text: "AI-powered applications designed and built around the way your business works.",
    tags: ["Design", "Development"],
    accent: true,
    icon: (
      <>
        <path d="M12 3.5 L13.6 8.4 L18.5 10 L13.6 11.6 L12 16.5 L10.4 11.6 L5.5 10 L10.4 8.4 Z" />
        <path d="M18 16 L18.7 18.3 L21 19 L18.7 19.7 L18 22 L17.3 19.7 L15 19 L17.3 18.3 Z" />
      </>
    ),
  },
  {
    title: "Custom design",
    text: "A design made for your brand, with a professional site structure — included in BUSINESS and PREMIUM BUSINESS.",
    tags: ["Custom design", "Site structure"],
    icon: (
      <>
        <path d="M4 20 L8.5 19 L19.2 8.3 A2.1 2.1 0 0 0 16.2 5.3 L5.5 16 Z" />
        <path d="M14.5 7 L17.5 10" />
      </>
    ),
  },
  {
    title: "Get found on Google",
    text: "Basic Google SEO and Google Maps integration help customers find your business and reach you.",
    tags: ["Basic SEO", "Google Maps"],
    icon: (
      <>
        <path d="M12 21 C12 21 5 14.6 5 9.6 A7 7 0 0 1 19 9.6 C19 14.6 12 21 12 21 Z" />
        <circle cx="12" cy="9.6" r="2.6" />
      </>
    ),
  },
  {
    title: "Domain, hosting & SSL",
    text: "Your domain, hosting and SSL are set up for you, with WhatsApp integration built into the site.",
    tags: ["Domain", "Hosting", "SSL", "WhatsApp"],
    icon: (
      <>
        <path d="M12 3 L19.5 6 V11.5 C19.5 16 16.3 19.6 12 21 C7.7 19.6 4.5 16 4.5 11.5 V6 Z" />
        <path d="M8.8 12 L11 14.2 L15.4 9.8" />
      </>
    ),
  },
  {
    title: "Photo & video",
    text: "Professional photography and video, with a visit to your business and visual materials made for your website.",
    tags: ["Photography", "Video", "On-site visit"],
    icon: (
      <>
        <rect x="3" y="7" width="13" height="11" rx="2.5" />
        <path d="M16 11 L21 8 V17 L16 14" />
      </>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className={s.section} aria-labelledby="services-title">
      <div className={s.inner}>
        <header className={s.head} data-anim="head">
          <p className={s.eyebrow} data-part="eyebrow">
            What we do
          </p>
          <h2 id="services-title" className={s.title}>
            <SplitChars text="Websites and AI, built for your business." />
          </h2>
          <p className={s.lead}>
            <SplitWords text="From a clean one-page site to a complete premium presence with photo and video — plus AI-powered applications when you need more." />
          </p>
        </header>

        <ul className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <li
              key={svc.title}
              className={`${s.glass} ${s.lift} ${styles.card}`}
              data-anim="card"
              style={stagger(i % 3)}
            >
              <span className={`${styles.iconWrap} ${svc.accent ? styles.iconAccent : ""}`} data-pop>
                <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
                  {svc.icon}
                </svg>
              </span>
              <h3 className={styles.name}>{svc.title}</h3>
              <p className={styles.text}>{svc.text}</p>
              <ul className={styles.tags} aria-label={`${svc.title} includes`} data-stagger>
                {svc.tags.map((t, j) => (
                  <li key={t} style={idx(j)}>
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
