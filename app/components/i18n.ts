/* Shared by the proxy, server and client components — no server-only imports. */

export const LOCALES = ["sq", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "sq";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** "Hello {name}" + { name: "Ana" } → "Hello Ana" */
export function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}
