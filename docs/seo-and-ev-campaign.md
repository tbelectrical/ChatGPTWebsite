# Local SEO and EV campaign destination

The public site has page-specific titles, descriptions, canonical URLs, social metadata, local service wording, business and WebSite structured data, breadcrumbs and a sitemap. Core service areas are Hitchin, Baldock, Letchworth Garden City, Stevenage, Langford and Biggleswade.

## Advertising destination

Use `/ev-charger-quote` as the EV campaign destination. It is a public, direct-link page with `noindex, follow`, deliberately omitted from navigation and the sitemap. It is not password protected. Keep it crawlable so search engines can read its noindex instruction and ad systems can inspect the destination.

The page includes an EV-specific contact form (`source: ev-ads-quote`), phone links, customer feedback, service benefits, installation process and FAQs. The public `/ev-chargers` page remains indexable for organic search.

## Before buying advertising

1. Configure and verify email delivery on the actual advertising destination host: Resend API key, verified sender and recipient variables. Without these, the current form opens the visitor's email app and explicitly tells them they still need to send the message.
2. Test an actual enquiry on the intended host and confirm receipt. Automated tests mock the email provider; they do not prove real email delivery.
3. If moving to the business domain, update the origin in `app/lib/seo.ts`, redirects and sitemap, then recheck canonical URLs.
4. Configure conversion tracking in the selected advertising/analytics account. The consent-gated `generate_lead` dataLayer event is emitted only after a successful API response. No analytics or advertising tag is installed by this change.
5. Complete a mobile/browser check before launch. The Sites preview runtime could not start in the current environment because its Cloudflare compatibility support predates the existing project's configured date.

Do not promise a fixed installation price, grant entitlement, charger-brand accreditation or guaranteed availability without confirming the offer and eligibility.
