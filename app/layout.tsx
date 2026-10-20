import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "./components/CookieConsent";

import { siteUrl } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "TB Electrical",
  title: { default: "Electrician in Hitchin & Hertfordshire | TB Electrical", template: "%s | TB Electrical" },
  description: "NAPIT registered electrician for Hitchin, Baldock, Letchworth, Stevenage, Langford and Biggleswade. Rewires, EICRs, consumer units and commercial work.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-tb-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-tb.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon-tb-32.png",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Electrician in Hitchin & Hertfordshire | TB Electrical",
    description: "Domestic, commercial and industrial electricians serving Hitchin and the surrounding towns.",
    url: "/",
    type: "website",
    locale: "en_GB",
    siteName: "TB Electrical",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "TB Electrical | Electrical work, done properly." }],
  },
  twitter: { card: "summary_large_image", title: "TB Electrical", description: "Electrical work, done properly.", images: ["/og.png"] },
};

const areaServed = [
  ["City", "Hitchin"],
  ["City", "Stevenage"],
  ["City", "Baldock"],
  ["City", "Biggleswade"],
  ["Place", "Langford"],
  ["Place", "Arlesey"],
  ["Place", "Stotfold"],
  ["Place", "Shefford"],
  ["City", "Letchworth Garden City"],
  ["City", "Bedford"],
  ["City", "Welwyn Garden City"],
  ["City", "Hatfield"],
  ["City", "Harpenden"],
  ["AdministrativeArea", "Hertfordshire"],
  ["AdministrativeArea", "Bedfordshire"],
  ["AdministrativeArea", "Buckinghamshire"],
].map(([type, name]) => ({ "@type": type, name }));

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "TB Electrical", alternateName: "TB Electrical Herts Ltd", inLanguage: "en-GB", publisher: { "@id": `${siteUrl}/#business` } };

const electricianSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${siteUrl}/#business`,
  name: "TB Electrical Herts Ltd",
  legalName: "TB Electrical Herts Ltd",
  alternateName: "TB Electrical",
  description: "NAPIT registered electrical contractor for domestic, commercial, industrial and EV chargepoint work.",
  url: siteUrl,
  logo: `${siteUrl}/media/tb-logo.webp`,
  image: `${siteUrl}/og.png`,
  telephone: "+44 7484 605599",
  email: "tyler@tbelectrical.co.uk",
  address: { "@type": "PostalAddress", addressLocality: "Hitchin", addressRegion: "Hertfordshire", postalCode: "SG5 4SN", addressCountry: "GB" },
  areaServed,
  priceRange: "££",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Electrical services",
    itemListElement: [
      "Domestic electrical work",
      "Commercial electrical work",
      "Industrial electrical work",
      "EV chargepoint installation",
      "Rewires and alterations",
      "Consumer unit upgrades",
      "Electrical inspection and testing",
      "Lighting and power installation",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
  sameAs: ["https://www.facebook.com/tbelectricalherts/", "https://www.instagram.com/tbelectricalhertsltd"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <CookieConsent>{children}</CookieConsent>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([electricianSchema, websiteSchema]) }}
        />
      </body>
    </html>
  );
}
