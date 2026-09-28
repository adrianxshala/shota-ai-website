export const CONSENT_COOKIE = "shota_consent";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60;
export type Consent = { necessary: true; analytics: boolean; marketing: boolean };
export const ESSENTIAL_ONLY: Consent = { necessary: true, analytics: false, marketing: false };

/** Invalid, expired and older-version choices never authorize optional scripts. */
export function parseConsent(value: string, now = Date.now()): Consent | null {
  try {
    const data = JSON.parse(decodeURIComponent(value));
    if (
      data.version !== 1 || data.necessary !== true ||
      typeof data.analytics !== "boolean" || typeof data.marketing !== "boolean" ||
      typeof data.savedAt !== "number" || !Number.isFinite(data.savedAt) ||
      data.savedAt > now || now - data.savedAt >= CONSENT_MAX_AGE * 1000
    ) return null;
    return { necessary: true, analytics: data.analytics, marketing: data.marketing };
  } catch {
    return null;
  }
}

export function serializeConsent(consent: Consent, now = Date.now()): string {
  return encodeURIComponent(JSON.stringify({ ...consent, necessary: true, version: 1, savedAt: now }));
}
