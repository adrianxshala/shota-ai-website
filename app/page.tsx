import HeroSection from "./components/HeroSection";
import AmbientStage from "./components/AmbientStage";
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import WhySection from "./components/WhySection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#02060f] text-white font-[family-name:var(--font-sora)]">
      {/* Hero + navbar — one self-contained full-viewport section */}
      <HeroSection />

      {/* Every section after the hero shares one continuous, animated background */}
      <AmbientStage>
        <ServicesSection />
        <WhySection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
        <SiteFooter />
      </AmbientStage>
    </div>
  );
}
