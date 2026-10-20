import type { Metadata } from "next";

// Switch this single origin when the custom-domain migration is complete.
export const siteUrl = "https://tb-electrical-herts.tybaker691.chatgpt.site";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path },
    openGraph: { title: `${title} | TB Electrical`, description, url: path, type: "website", locale: "en_GB", siteName: "TB Electrical", images: [{ url: `${siteUrl}/og.png`, width: 1731, height: 909, alt: "TB Electrical — electrical work, done properly" }] },
    twitter: { card: "summary_large_image", title: `${title} | TB Electrical`, description, images: [`${siteUrl}/og.png`] } };
}
export function breadcrumbs(items: {name:string; path:string}[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) };
}
