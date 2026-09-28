import FeatureListSync from "./FeatureListSync";
import { SplitChars, SplitWords, idx, stagger } from "./Split";
import s from "./shared.module.css";
import styles from "./PricingSection.module.css";
import { fill } from "./i18n";
import type { Dictionary } from "../[lang]/dictionaries";

const WHATSAPP = "https://wa.me/38343599558";

type Plan = {
  id: keyof Dictionary["packages"]["plans"];
  name: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  { id: "start", name: "START" },
  { id: "business", name: "BUSINESS", featured: true },
  { id: "premium", name: "PREMIUM BUSINESS" },
];

function whatsappHref(template: string, plan: Plan) {
  const text = fill(template, { name: plan.name });
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.4 L6.6 11.3 L12.5 4.9" />
    </svg>
  );
}

export default function PricingSection({ t }: { t: Dictionary["packages"] }) {
  return (
    <section id="packages" className={styles.section} aria-labelledby="packages-title">
      <FeatureListSync rootId="packages" />

      <header className={styles.head} data-anim="head">
        <p className={styles.eyebrow} data-part="eyebrow">
          {t.eyebrow}
        </p>
        <h2 id="packages-title" className={styles.title}>
          <SplitChars text={t.title} />
        </h2>
        <p className={styles.lead}>
          <SplitWords text={t.lead} />
        </p>
      </header>

      <div className={styles.grid}>
        {PLANS.map((plan, i) => {
          const copy = t.plans[plan.id];
          return (
          <article
            key={plan.id}
            className={`${s.glass} ${s.lift} ${styles.card} ${plan.featured ? `${s.glassAccent} ${styles.featured}` : ""}`}
            aria-labelledby={`plan-${plan.id}`}
            data-anim="card"
            style={stagger(i)}
          >
            {/* row 1 — name + description */}
            <div className={styles.intro}>
              <div className={styles.nameRow}>
                <h3 id={`plan-${plan.id}`} className={styles.name}>
                  {plan.name}
                </h3>
                {plan.featured && <span className={styles.badge}>{t.popular}</span>}
              </div>
              <p className={styles.tagline}>{copy.tagline}</p>
            </div>

            {/* row 2 — key benefits */}
            <ul className={styles.highlights} aria-label={`${plan.name} ${t.keyBenefits}`} data-stagger>
              {copy.highlights.map((f, j) => (
                <li key={f} style={idx(j)}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* row 3 — complete list behind a disclosure */}
            <details className={styles.more}>
              <summary className={styles.summary}>
                <span className={styles.showLabel}>{t.viewAll}</span>
                <span className={styles.hideLabel}>{t.hide}</span>
                <span className={styles.count}>{copy.features.length}</span>
                <svg className={styles.caret} viewBox="0 0 12 8" aria-hidden="true">
                  <path d="M1.5 1.8 L6 6.2 L10.5 1.8" />
                </svg>
              </summary>
              <ul className={styles.all}>
                {copy.features.map((f) => (
                  <li key={f}>
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </details>

            {/* row 4 — CTA, aligned across cards */}
            <a
              className={`${plan.featured ? s.btnPrimary : s.btn} ${styles.button}`}
              href={whatsappHref(t.whatsappMessage, plan)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{copy.button}</span>
              <svg className={styles.arrow} viewBox="0 0 16 11" aria-hidden="true">
                <path d="M0 5.5 H14.6 M10.3 1.2 L14.9 5.5 L10.3 9.8" />
              </svg>
              <span className={styles.srOnly}>{t.opensWhatsapp}</span>
            </a>
          </article>
          );
        })}
      </div>
    </section>
  );
}
