import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "www.tbelectrical.co.uk";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: { default: "TB Electrical | Electrical Contractors", template: "%s | TB Electrical" },
    description: "Local, NAPIT registered electricians for homes, businesses and industrial sites across Hertfordshire and nearby counties.",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: "TB Electrical | Electrical work, done properly.",
      description: "Local electricians for homes, businesses and industrial sites across Hertfordshire and nearby counties.",
      type: "website",
      locale: "en_GB",
      siteName: "TB Electrical",
      images: [{ url: `${origin}/og.png`, width: 1731, height: 909, alt: "TB Electrical | Electrical work, done properly." }],
    },
    twitter: { card: "summary_large_image", title: "TB Electrical", description: "Electrical work, done properly.", images: [`${origin}/og.png`] },
  };
}

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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              name: "TB Electrical Herts Ltd",
              alternateName: "TB Electrical",
              url: "https://www.tbelectrical.co.uk",
              telephone: "+44 7484 605599",
              email: "tyler@tbelectrical.co.uk",
              address: { "@type": "PostalAddress", addressLocality: "Hitchin", addressRegion: "Hertfordshire", postalCode: "SG5 4SN", addressCountry: "GB" },
              areaServed: ["Hertfordshire", "Bedfordshire", "Buckinghamshire"],
              priceRange: "££",
              sameAs: ["https://www.facebook.com/tbelectricalherts/", "https://www.instagram.com/tbelectricalhertsltd"],
            }),
          }}
        />
      </body>
    </html>
  );
}
