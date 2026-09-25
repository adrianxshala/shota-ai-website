import FeatureListSync from "./FeatureListSync";
import s from "./shared.module.css";
import styles from "./PricingSection.module.css";

const WHATSAPP = "https://wa.me/38343599558";

type Plan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  /** 4–6 distinguishing benefits, all taken from `features` */
  highlights: string[];
  /** complete feature list, unchanged */
  features: string[];
  hosting: string;
  button: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "start",
    name: "START",
    price: "149",
    tagline: "For businesses that want a professional online presence.",
    highlights: [
      "One-page website",
      "Services and pricing",
      "WhatsApp integration",
      "Google Maps",
      "Basic Google SEO",
    ],
    features: [
      "One-page website",
      "Business information",
      "Services and pricing",
      "Photos",
      "Contact information",
      "WhatsApp integration",
      "Google Maps",
      "Domain",
      "Hosting",
      "SSL",
      "Basic Google SEO",
      "Mobile-friendly version",
    ],
    hosting: "5.99",
    button: "Choose START",
  },
  {
    id: "business",
    name: "BUSINESS",
    price: "349",
    tagline: "The complete package for businesses that want a strong online presence.",
    highlights: [
      "Multi-page website",
      "Custom design",
      "Gallery",
      "Social media links",
      "Support",
    ],
    features: [
      "Multi-page website",
      "Home page",
      "About page",
      "Services page",
      "Gallery",
      "Contact page",
      "WhatsApp integration",
      "Google Maps",
      "Social media links",
      "Domain",
      "Hosting",
      "SSL",
      "Basic Google SEO",
      "Mobile optimization",
      "Custom design",
      "Support",
    ],
    hosting: "13.99",
    button: "Choose BUSINESS",
    featured: true,
  },
  {
    id: "premium",
    name: "PREMIUM BUSINESS",
    price: "699",
    tagline: "A complete solution for a premium business presence.",
    highlights: [
      "Premium custom website",
      "Professional photography",
      "Professional video",
      "Photographer/videographer visit to the business",
      "Creation of visual materials for the website",
    ],
    features: [
      "Premium custom website",
      "Custom design",
      "Professional site structure",
      "Basic SEO",
      "Domain",
      "Hosting",
      "SSL",
      "Mobile optimization",
      "WhatsApp integration",
      "Google Maps",
      "Social media links",
      "Support",
      "Professional photography",
      "Professional video",
      "Photographer/videographer visit to the business",
      "Creation of visual materials for the website",
    ],
    hosting: "29.99",
    button: "Choose PREMIUM",
  },
];

function whatsappHref(plan: Plan) {
  const text = `Hello! I'm interested in the ${plan.name} package (€${plan.price}). Can you tell me more?`;
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.4 L6.6 11.3 L12.5 4.9" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="packages" className={styles.section} aria-labelledby="packages-title">
      <FeatureListSync rootId="packages" />

      <header className={styles.head}>
        <p className={styles.eyebrow}>Packages</p>
        <h2 id="packages-title" className={styles.title}>
          Find the right fit for your business.
        </h2>
        <p className={styles.lead}>
          Pay once for your website. Hosting is billed monthly after the initial period.
        </p>
      </header>

      <div className={styles.grid}>
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`${s.glass} ${s.lift} ${styles.card} ${plan.featured ? `${s.glassAccent} ${styles.featured}` : ""}`}
            aria-labelledby={`plan-${plan.id}`}
          >
            {/* row 1 — name + description */}
            <div className={styles.intro}>
              <div className={styles.nameRow}>
                <h3 id={`plan-${plan.id}`} className={styles.name}>
                  {plan.name}
                </h3>
                {plan.featured && <span className={styles.badge}>Most popular</span>}
              </div>
              <p className={styles.tagline}>{plan.tagline}</p>
            </div>

            {/* row 2 — one-time price */}
            <div className={styles.price}>
              <p className={styles.amount}>
                <span className={styles.currency}>€</span>
                {plan.price}
              </p>
              <p className={styles.once}>One-time website price</p>
            </div>

            {/* row 3 — recurring hosting, visually separate */}
            <p className={styles.hosting}>
              <svg className={styles.hostingIcon} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.2 6.2 A5.4 5.4 0 0 0 3.1 5.4 M2.8 9.8 A5.4 5.4 0 0 0 12.9 10.6" />
                <path d="M3 2.6 V5.6 H6 M13 13.4 V10.4 H10" />
              </svg>
              <span>
                <strong className={styles.hostingValue}>€{plan.hosting}/month</strong>{" "}
                <span className={styles.hostingLabel}>hosting</span>
                <span className={styles.hostingNote}>after the initial period</span>
              </span>
            </p>

            {/* row 4 — key benefits */}
            <ul className={styles.highlights} aria-label={`${plan.name} key benefits`}>
              {plan.highlights.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* row 5 — complete list behind a disclosure */}
            <details className={styles.more}>
              <summary className={styles.summary}>
                <span className={styles.showLabel}>View all features</span>
                <span className={styles.hideLabel}>Hide features</span>
                <span className={styles.count}>{plan.features.length}</span>
                <svg className={styles.caret} viewBox="0 0 12 8" aria-hidden="true">
                  <path d="M1.5 1.8 L6 6.2 L10.5 1.8" />
                </svg>
              </summary>
              <ul className={styles.all}>
                {plan.features.map((f) => (
                  <li key={f}>
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </details>

            {/* row 6 — CTA, aligned across cards */}
            <a
              className={`${plan.featured ? s.btnPrimary : s.btn} ${styles.button}`}
              href={whatsappHref(plan)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{plan.button}</span>
              <svg className={styles.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={styles.srOnly}> — opens WhatsApp in a new tab</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
