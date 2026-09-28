This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Privacy controls

The English and Albanian pages include a consent banner and a native modal preferences dialog, reopened from the footer. Choices are stored in the first-party `shota_consent` cookie for 180 days, shared across locale paths, with `SameSite=Lax` and `Secure` on HTTPS. Invalid, expired, or unsupported records require a new choice. If cookies are blocked, choices apply only to the current page session and the visitor is informed.

The existing `NEXT_LOCALE` cookie remembers the visitor's language. No analytics or advertising scripts are currently installed. Before adding any, use `useCookieConsent()` inside the provider and load them only when the corresponding `consent.analytics` or `consent.marketing` flag is true. Integrations must also stop tracking and clean up their own cookies when that flag is revoked. Update the category descriptions in `app/components/privacy-copy.ts` when tools are added, and bump the consent schema version if the purposes change.

Run consent validation tests with `node --test tests/consent.test.mjs` (Node 22.18+). Manually verify first visit, accept/reject, granular save, reload, footer reopening, Escape/focus return, and narrow or short viewports in both locales.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
