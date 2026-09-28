import { notFound } from "next/navigation";
import HeroSection from "../components/HeroSection";
import AmbientStage from "../components/AmbientStage";
import ServicesSection from "../components/ServicesSection";
import PricingSection from "../components/PricingSection";
import WhySection from "../components/WhySection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import SiteFooter from "../components/SiteFooter";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <div className="flex flex-1 flex-col bg-[#02060f] text-white font-[family-name:var(--font-sora)]">
      {/* Hero + navbar — one self-contained full-viewport section */}
      <HeroSection lang={lang} t={t.hero} common={t.common} />

      {/* Every section after the hero shares one continuous, animated background */}
      <AmbientStage>
        <ServicesSection t={t.services} />
        <WhySection t={t.why} common={t.common} />
        <PricingSection t={t.packages} />
        <FaqSection t={t.faq} common={t.common} />
        <ContactSection t={t.contact} common={t.common} />
        <SiteFooter t={t.footer} common={t.common} />
      </AmbientStage>
    </div>
  );
}
