import type { Dictionary } from "./dictionaries/en";
import { LOCALES, type Locale } from "../components/i18n";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  sq: () => import("./dictionaries/sq").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  (LOCALES as readonly string[]).includes(locale);

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
