import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

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

const title = "Shota AI — Websites & AI Applications";
const description =
  "Shota AI builds websites and AI-powered applications. Based in Prishtina & Stuttgart.";
const logo = "/logo%202.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [logo],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [logo],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
