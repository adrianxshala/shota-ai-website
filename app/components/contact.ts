export const PHONE_DISPLAY = "+383 43 599 558";
export const PHONE_HREF = "tel:+38343599558";
export const WHATSAPP_URL = "https://wa.me/38343599558";

export function whatsappLink(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
