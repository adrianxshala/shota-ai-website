"use client";

import { useEffect } from "react";

/**
 * SVG filter used as a backdrop lens by the Liquid Glass cards: it bends the
 * moving light behind the glass. Only Chromium can apply an SVG filter via
 * `backdrop-filter`, so we opt in there (html[data-liquid-lens]); other
 * browsers keep the same liquid material without refraction.
 */
export default function LiquidLens() {
  useEffect(() => {
    const brands =
      (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } })
        .userAgentData?.brands ?? [];
    if (brands.some((b) => b.brand === "Chromium")) {
      document.documentElement.setAttribute("data-liquid-lens", "");
    }
  }, []);

  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <filter id="liquid-lens" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        {/* low-frequency noise = soft, liquid-looking lens distortion */}
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="46" xChannelSelector="R" yChannelSelector="G" result="bent" />
        <feGaussianBlur in="bent" stdDeviation="7" />
      </filter>
      <filter id="liquid-lens-sm" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="1" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" result="bent" />
        <feGaussianBlur in="bent" stdDeviation="5" />
      </filter>
    </svg>
  );
}
