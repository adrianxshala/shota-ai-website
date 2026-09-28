import type { Locale } from "./i18n";

const en = {
  eyebrow: "YOUR PRIVACY",
  title: "A little cookie housekeeping.",
  intro: "We use essential cookies to remember your language and privacy choices. You decide whether to allow optional cookies.",
  accept: "Accept all",
  reject: "Reject optional",
  manage: "Manage preferences",
  preferences: "Privacy preferences",
  description: "Choose what you’re comfortable with. Essential cookies stay on; everything else is up to you.",
  necessary: "Essential",
  necessaryDescription: "Remembers your selected language (NEXT_LOCALE, up to 1 year) and privacy choices (shota_consent, 180 days). These cookies are not used for tracking.",
  always: "Always on",
  analytics: "Analytics",
  analyticsDescription: "Helps measure visits and understand how the site is used. No analytics tools are currently installed.",
  marketing: "Marketing",
  marketingDescription: "Allows advertising measurement and personalization. No advertising tools are currently installed.",
  note: "Your choice is saved for 180 days on this browser. Change it anytime using Privacy preferences in the footer.",
  save: "Save preferences",
  close: "Close preferences",
  saved: "Privacy preferences saved.",
  sessionOnly: "Your choice applies for this visit. Your browser blocked saving it for future visits.",
};

const sq: typeof en = {
  eyebrow: "PRIVATËSIA JUAJ",
  title: "Pak kujdes për cookies.",
  intro: "Përdorim cookies të domosdoshme për të ruajtur gjuhën dhe zgjedhjet tuaja të privatësisë. Ju vendosni nëse lejoni cookies opsionale.",
  accept: "Prano të gjitha",
  reject: "Refuzo opsionalet",
  manage: "Menaxho preferencat",
  preferences: "Preferencat e privatësisë",
  description: "Zgjidhni çfarë dëshironi të lejoni. Cookies të domosdoshme mbeten aktive; të tjerat i vendosni ju.",
  necessary: "Të domosdoshme",
  necessaryDescription: "Ruajnë gjuhën e zgjedhur (NEXT_LOCALE, deri në 1 vit) dhe preferencat e privatësisë (shota_consent, 180 ditë). Nuk përdoren për gjurmim.",
  always: "Gjithmonë aktive",
  analytics: "Analitika",
  analyticsDescription: "Ndihmon në matjen e vizitave dhe kuptimin e përdorimit të faqes. Aktualisht nuk ka mjete analitike të instaluara.",
  marketing: "Marketingu",
  marketingDescription: "Lejon matjen dhe personalizimin e reklamave. Aktualisht nuk ka mjete reklamimi të instaluara.",
  note: "Zgjedhja ruhet për 180 ditë në këtë shfletues. Mund ta ndryshoni kurdo te Preferencat e privatësisë në fund të faqes.",
  save: "Ruaj preferencat",
  close: "Mbyll preferencat",
  saved: "Preferencat e privatësisë u ruajtën.",
  sessionOnly: "Zgjedhja vlen për këtë vizitë. Shfletuesi bllokoi ruajtjen e saj për vizitat e ardhshme.",
};

export const privacyCopy: Record<Locale, typeof en> = { en, sq };
