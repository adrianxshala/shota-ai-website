import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "../globals.css";
import "../animations.css";
import { LOCALES } from "../components/i18n";
import { getDictionary, hasLocale } from "./dictionaries";
import CookieConsentProvider from "../components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Variable axis build — the hero drives fractional weights via
// font-variation-settings, so a static weight would not reproduce it.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "block",
});

const logo = "/logo%202.png";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { title, description } = (await getDictionary(lang)).meta;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { sq: "/sq", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      images: [logo],
      locale: lang === "sq" ? "sq_AL" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [logo],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CookieConsentProvider lang={lang}>{children}</CookieConsentProvider>
      </body>
    </html>
  );
}
