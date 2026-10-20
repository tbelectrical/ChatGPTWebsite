import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/seo";
import { locations, servicePages } from "./lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
 return ["", "/services", "/ev-chargers", "/projects", "/about", "/contact", "/areas", "/privacy", "/cookies", ...locations.map(a=>`/areas/${a.slug}`), ...servicePages.map(s=>`/services/${s.slug}`)].map(path=>({ url:`${siteUrl}${path}` }));
}
