import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.tbelectrical.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "TB Electrical",
  title: { default: "Electrician in Hitchin & Hertfordshire | TB Electrical", template: "%s | TB Electrical" },
  description: "NAPIT registered electricians for domestic, commercial and industrial work across Hitchin, Hertfordshire and nearby Bedfordshire.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
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
  ["City", "Letchworth Garden City"],
  ["City", "Bedford"],
  ["City", "Welwyn Garden City"],
  ["City", "Hatfield"],
  ["City", "Harpenden"],
  ["AdministrativeArea", "Hertfordshire"],
  ["AdministrativeArea", "Bedfordshire"],
  ["AdministrativeArea", "Buckinghamshire"],
].map(([type, name]) => ({ "@type": type, name }));

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
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(electricianSchema) }}
        />
      </body>
    </html>
  );
}
